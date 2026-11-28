// Opening and closing a native <details> (owner, 2026-11-27; tried first on the quote form's
// "Add details", meant to go on every fold on the site once it reads right).
//
// - The height moves on a spring tuned so it never overshoots (no bounce on this site): it
//   lands in about 360ms opening and 290ms closing, and a click
//   mid-way turns it around with the speed it already has, so a reversal never stops and starts.
// - While it moves, the panel's lower edge is feathered (a 48px fade), so the contents come out
//   of a soft edge rather than from under a hard cut.
// - The contents follow the opening a step behind, one group after another (35ms apart), each
//   settling 6px down out of a slight blur (5px) and 0.62 opacity. Closing, they dim back and
//   soften as the height folds over them. Turned around mid-way, they go back from where they are.
// - With `sweep`, the fold gets data-sweep="in" or "out" for its CSS to run a line of light
//   along its rule: left to right as it opens, right to left as it shuts.
// - With `nudge`, a fold opened from low on the screen (its row's foot below 70% of the window)
//   glides up so the row sits a third of the way down, in step with the opening, so the two
//   read as one motion. Anywhere higher it stays put; a wheel, touch, or key stops it.
// - Without JS the native <details> opens and closes on its own; under reduced motion it snaps.
//
// The box that animates (`body`) must carry no padding or margin of its own (a 0px box with
// padding still shows the padding): put the padding on a child. The summary takes
// `onMouseDown={preventSelect}` and `user-select: none`: a quick double click on it otherwise
// selected the text of the whole panel as it opened.

const OPEN_OMEGA = 19; // rad/s: lands in about 360ms
const CLOSE_OMEGA = 24; // about 290ms
// Just under critical damping: past it, the last pixels crawled for a quarter second; at 0.92
// it lands (within 1.5px, the snap below) before it would pass its target, so it never overshoots.
const ZETA = 0.92;
const ITEM_MS = 300;
const ITEM_STEP = 35;
const ITEM_EASE = 'cubic-bezier(0.32, 0.72, 0, 1)'; // the drawer curve
const NUDGE_MS = 380;
const FEATHER = 'linear-gradient(to bottom, #000 calc(100% - 48px), transparent)';

type Spring = { x: number; v: number; target: number; omega: number; raf: number; last: number; open: boolean };
const springs = new WeakMap<HTMLElement, Spring>();
const groupAnims = new WeakMap<HTMLElement, Animation[]>();

type Parts = {
  /** Selector for the box whose height animates, inside the details. */
  body: string;
  /** Selector for the groups inside it that follow the opening one after another. */
  items?: string;
  /** Bring a fold opened low on the screen up to a third of the way down. */
  nudge?: boolean;
  /** Mark the fold with data-sweep for a line of light along its rule. */
  sweep?: boolean;
};

export function isOpening(details: HTMLDetailsElement) {
  return !details.open || details.hasAttribute('data-closing');
}

/** On the summary's mousedown: a second click in quick succession toggles, never selects. */
export function preventSelect(e: { detail: number; preventDefault: () => void }) {
  if (e.detail > 1) e.preventDefault();
}

function setFeather(box: HTMLElement, on: boolean) {
  box.style.overflow = on ? 'hidden' : '';
  box.style.maskImage = on ? FEATHER : '';
  box.style.setProperty('-webkit-mask-image', on ? FEATHER : '');
}

function clearGroups(box: HTMLElement) {
  groupAnims.get(box)?.forEach((a) => a.cancel());
  groupAnims.delete(box);
}

function settle(details: HTMLDetailsElement, box: HTMLElement, s: Spring) {
  cancelAnimationFrame(s.raf);
  springs.delete(box);
  box.style.height = '';
  setFeather(box, false);
  if (!s.open) {
    details.open = false;
    details.removeAttribute('data-closing');
    clearGroups(box);
  }
}

function run(details: HTMLDetailsElement, box: HTMLElement, s: Spring) {
  const step = (now: number) => {
    // Fixed 1ms sub-steps, so the spring moves the same at any frame rate.
    let dt = Math.min(64, now - s.last);
    s.last = now;
    while (dt > 0) {
      const h = Math.min(1, dt) / 1000;
      const a = -s.omega * s.omega * (s.x - s.target) - 2 * ZETA * s.omega * s.v;
      s.v += a * h;
      s.x += s.v * h;
      dt -= 1;
    }
    // Lands once within a pixel and slow: a damped spring's last pixels otherwise crawl for a
    // quarter second, and the page below creeps with them.
    if (Math.abs(s.x - s.target) < 1.5 && Math.abs(s.v) < 40) {
      settle(details, box, s);
      return;
    }
    box.style.height = `${Math.max(0, s.x)}px`;
    s.raf = requestAnimationFrame(step);
  };
  s.raf = requestAnimationFrame(step);
}

function sweep(details: HTMLDetailsElement, dir: 'in' | 'out') {
  details.removeAttribute('data-sweep');
  void details.offsetWidth; // restart the CSS animation
  details.setAttribute('data-sweep', dir);
}

// The drawer curve, cubic-bezier(0.32, 0.72, 0, 1), for the scroll glide (scripted, since the
// browser's own smooth scroll can't be timed to the opening).
function drawer(t: number) {
  const x1 = 0.32, y1 = 0.72, x2 = 0, y2 = 1;
  const bx = (u: number) => 3 * x1 * u * (1 - u) ** 2 + 3 * x2 * u ** 2 * (1 - u) + u ** 3;
  const by = (u: number) => 3 * y1 * u * (1 - u) ** 2 + 3 * y2 * u ** 2 * (1 - u) + u ** 3;
  let lo = 0, hi = 1, u = t;
  for (let i = 0; i < 24; i++) {
    u = (lo + hi) / 2;
    if (bx(u) < t) lo = u; else hi = u;
  }
  return by(u);
}

function nudgeInto(details: HTMLDetailsElement, still: boolean) {
  const row = details.querySelector('summary');
  if (!row) return;
  const r = row.getBoundingClientRect();
  const vh = window.innerHeight;
  if (r.bottom <= vh * 0.7) return;
  const start = window.scrollY;
  const by = r.top - vh / 3;
  if (still) {
    window.scrollTo({ top: start + by, behavior: 'instant' });
    return;
  }
  const t0 = performance.now();
  let stop = false;
  const halt = () => { stop = true; };
  const events = ['wheel', 'touchstart', 'keydown', 'pointerdown'] as const;
  events.forEach((e) => window.addEventListener(e, halt, { once: true, passive: true }));
  const step = (now: number) => {
    const t = Math.min(1, (now - t0) / NUDGE_MS);
    // Instant steps: the page's smooth scrolling would restart a glide of its own each frame.
    if (!stop) window.scrollTo({ top: start + by * drawer(t), behavior: 'instant' });
    if (t < 1 && !stop) requestAnimationFrame(step);
    else events.forEach((e) => window.removeEventListener(e, halt));
  };
  requestAnimationFrame(step);
}

/** Each group's look right now, mid-animation included. */
function current(groups: HTMLElement[]) {
  return groups.map((g) => {
    const cs = getComputedStyle(g);
    return { opacity: cs.opacity, filter: cs.filter === 'none' ? 'blur(0px)' : cs.filter, transform: cs.transform === 'none' ? 'none' : cs.transform };
  });
}

export function setDetailsOpen(details: HTMLDetailsElement, open: boolean, parts: Parts) {
  const box = details.querySelector<HTMLElement>(parts.body);
  const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!box || still) {
    if (box) {
      const s = springs.get(box);
      if (s) cancelAnimationFrame(s.raf);
      springs.delete(box);
      box.style.height = '';
      setFeather(box, false);
      clearGroups(box);
    }
    details.removeAttribute('data-closing');
    details.open = open;
    if (open && parts.nudge) nudgeInto(details, true);
    return;
  }

  const groups = parts.items ? Array.from(box.querySelectorAll<HTMLElement>(parts.items)) : [];
  const fromShut = !details.open;
  let s = springs.get(box);

  if (open) {
    const was = fromShut ? null : current(groups);
    details.removeAttribute('data-closing');
    details.open = true;
    if (!s) {
      s = { x: 0, v: 0, target: 0, omega: OPEN_OMEGA, raf: 0, last: performance.now(), open: true };
      springs.set(box, s);
      box.style.height = '0px';
      setFeather(box, true);
      run(details, box, s);
    }
    s.open = true;
    s.omega = OPEN_OMEGA;
    s.target = box.scrollHeight; // the content's full height, even while clipped
    if (parts.sweep) sweep(details, 'in');
    if (parts.nudge && fromShut) nudgeInto(details, false);

    clearGroups(box);
    groupAnims.set(box, groups.map((g, i) =>
      was
        ? // Turned around mid-close: back up from where each one is.
          g.animate([was[i], { opacity: 1, filter: 'blur(0px)', transform: 'none' }], { duration: 240, easing: ITEM_EASE })
        : g.animate(
            [{ opacity: 0.62, filter: 'blur(5px)', transform: 'translateY(-6px)' }, { opacity: 1, filter: 'blur(0px)', transform: 'none' }],
            { duration: ITEM_MS, delay: 40 + i * ITEM_STEP, easing: ITEM_EASE, fill: 'backwards' },
          ),
    ));
  } else {
    if (fromShut) return;
    const was = current(groups);
    details.setAttribute('data-closing', '');
    if (!s) {
      const h = box.getBoundingClientRect().height;
      s = { x: h, v: 0, target: h, omega: CLOSE_OMEGA, raf: 0, last: performance.now(), open: false };
      springs.set(box, s);
      box.style.height = `${h}px`;
      setFeather(box, true);
      run(details, box, s);
    }
    s.open = false;
    s.omega = CLOSE_OMEGA;
    s.target = 0;
    if (parts.sweep) sweep(details, 'out');

    clearGroups(box);
    groupAnims.set(box, groups.map((g, i) =>
      g.animate([was[i], { opacity: 0.62, filter: 'blur(3px)', transform: 'none' }], { duration: 200, easing: 'cubic-bezier(0.4, 0, 0.2, 1)', fill: 'forwards' }),
    ));
  }
}
