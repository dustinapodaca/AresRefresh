// How every fold on the site opens and shuts (owner, 2026-11-27: tried first on the quote form's
// "Add details", then put on all of them): the questions blocks, the Insights "On this page"
// fold, the Service Areas regions on phones, the Capability Statement phone bar's index.
//
// - The height moves on a spring tuned so it never overshoots (no bounce on this site): it lands
//   in about 360ms opening and 290ms shutting, and a click mid-way turns it around with the
//   speed it already has, so a reversal never stops and starts.
// - While it moves, the panel's lower edge is feathered (a 48px fade), so the contents come out
//   of a soft edge rather than from under a hard cut.
// - The contents follow the opening a step behind, one group after another (35ms apart), each
//   settling 6px down out of a slight blur (5px) and 0.62 opacity. Shutting, they dim back and
//   soften as the height folds over them. Turned around mid-way, they go back from where they are.
// - With a line element (class `ds-fold-line`), a 1px line of rust light runs along the fold's
//   rule: left to right as it opens, right to left as it shuts (data-sweep, CSS in dossier.css).
// - With `nudge`, a fold opened from low on the screen (its row's foot below 70% of the window)
//   glides up so the row sits a third of the way down, in step with the opening. Anywhere higher
//   it stays put; a wheel, touch, or key stops it.
// - Without JS a native <details> opens and closes on its own; under reduced motion all snap.
//
// Two ways in: setDetailsOpen() for a native <details> (its summary's click calls it), and
// useFold() (src/components/Fold.tsx) for a panel whose open state lives in React.
//
// The box that animates must carry no padding or margin of its own (a 0px box with padding still
// shows the padding): put the padding on a child. A summary takes `onMouseDown={preventSelect}`
// and `user-select: none`: a quick double click on it otherwise selected the whole panel's text.

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

type Spring = { x: number; v: number; target: number; omega: number; raf: number; last: number; done: () => void };
const springs = new WeakMap<HTMLElement, Spring>();
const groupAnims = new WeakMap<HTMLElement, Animation[]>();

export const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** On a summary's mousedown: a second click in quick succession toggles, never selects. */
export function preventSelect(e: { detail: number; preventDefault: () => void }) {
  if (e.detail > 1) e.preventDefault();
}

function setFeather(box: HTMLElement, on: boolean) {
  box.style.overflow = on ? 'hidden' : '';
  box.style.maskImage = on ? FEATHER : '';
  box.style.setProperty('-webkit-mask-image', on ? FEATHER : '');
}

/** Stop a fold where it is and hand it back to its CSS (no callbacks run). */
export function stopFold(box: HTMLElement) {
  const s = springs.get(box);
  if (s) cancelAnimationFrame(s.raf);
  springs.delete(box);
  box.style.height = '';
  setFeather(box, false);
  clearGroups(box);
}

/** Move the box's height to `to` on the spring, carrying any motion it already has. */
function drive(box: HTMLElement, to: number, omega: number, from: number, done: () => void) {
  let s = springs.get(box);
  if (!s) {
    s = { x: from, v: 0, target: to, omega, raf: 0, last: performance.now(), done };
    springs.set(box, s);
    box.style.height = `${from}px`;
    setFeather(box, true);
    const spring = s;
    const step = (now: number) => {
      // Fixed 1ms sub-steps, so the spring moves the same at any frame rate.
      let dt = Math.min(64, now - spring.last);
      spring.last = now;
      while (dt > 0) {
        const h = Math.min(1, dt) / 1000;
        const a = -spring.omega * spring.omega * (spring.x - spring.target) - 2 * ZETA * spring.omega * spring.v;
        spring.v += a * h;
        spring.x += spring.v * h;
        dt -= 1;
      }
      // Lands once within a pixel and slow: the last pixels otherwise crawl, and the page below
      // creeps with them.
      if (Math.abs(spring.x - spring.target) < 1.5 && Math.abs(spring.v) < 40) {
        springs.delete(box);
        box.style.height = '';
        setFeather(box, false);
        spring.done();
        return;
      }
      box.style.height = `${Math.max(0, spring.x)}px`;
      spring.raf = requestAnimationFrame(step);
    };
    s.raf = requestAnimationFrame(step);
  }
  s.target = to;
  s.omega = omega;
  s.done = done;
}

function clearGroups(box: HTMLElement) {
  groupAnims.get(box)?.forEach((a) => a.cancel());
  groupAnims.delete(box);
}

/** Each group's look right now, mid-animation included. */
function current(groups: HTMLElement[]) {
  return groups.map((g) => {
    const cs = getComputedStyle(g);
    return { opacity: cs.opacity, filter: cs.filter === 'none' ? 'blur(0px)' : cs.filter, transform: cs.transform };
  });
}

function groupsIn(box: HTMLElement, groups: HTMLElement[], fromShut: boolean) {
  const was = fromShut ? null : current(groups);
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
}

function groupsOut(box: HTMLElement, groups: HTMLElement[]) {
  const was = current(groups);
  clearGroups(box);
  groupAnims.set(box, groups.map((g, i) =>
    g.animate([was[i], { opacity: 0.62, filter: 'blur(3px)', transform: 'none' }], { duration: 200, easing: 'cubic-bezier(0.4, 0, 0.2, 1)', fill: 'forwards' }),
  ));
}

function sweep(line: Element | null, dir: 'in' | 'out') {
  if (!(line instanceof HTMLElement)) return;
  line.removeAttribute('data-sweep');
  void line.offsetWidth; // restart the CSS animation
  line.setAttribute('data-sweep', dir);
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

function nudgeInto(row: Element | null, still: boolean) {
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

export type FoldParts = {
  /** Selector, inside the box, for the groups that follow the opening one after another. */
  items?: string;
  /** The element carrying the fold's rule (class ds-fold-line), for the line of light. */
  line?: Element | null;
  /** The row that was tapped, for the nudge; leave out for no nudge. */
  nudge?: Element | null;
};

/** Open or shut a panel that stays in the page (its closed look comes from its own CSS once
 *  `onClosed` runs). Used by useFold. */
export function moveFold(box: HTMLElement, open: boolean, { items, line, nudge }: FoldParts, onClosed: () => void) {
  const groups = items ? Array.from(box.querySelectorAll<HTMLElement>(items)) : [];
  if (open) {
    const fromShut = !springs.has(box);
    drive(box, box.scrollHeight, OPEN_OMEGA, 0, () => {});
    groupsIn(box, groups, fromShut);
    sweep(line ?? null, 'in');
    if (fromShut && nudge) nudgeInto(nudge, false);
  } else {
    drive(box, 0, CLOSE_OMEGA, box.getBoundingClientRect().height, () => {
      clearGroups(box);
      onClosed();
    });
    groupsOut(box, groups);
    sweep(line ?? null, 'out');
  }
}

export function isOpening(details: HTMLDetailsElement) {
  return !details.open || details.hasAttribute('data-closing');
}

/** Open or shut a native <details>; `body` is the selector of the box that animates. */
export function setDetailsOpen(
  details: HTMLDetailsElement,
  open: boolean,
  { body, items, nudge = false }: { body: string; items?: string; nudge?: boolean },
) {
  const box = details.querySelector<HTMLElement>(body);
  const line = details.classList.contains('ds-fold-line') ? details : null;
  const row = nudge ? details.querySelector('summary') : null;
  if (!box || reducedMotion()) {
    if (box) stopFold(box);
    details.removeAttribute('data-closing');
    details.open = open;
    if (open && row) nudgeInto(row, true);
    return;
  }
  const groups = items ? Array.from(box.querySelectorAll<HTMLElement>(items)) : [];
  if (open) {
    const fromShut = !details.open;
    details.removeAttribute('data-closing');
    details.open = true;
    drive(box, box.scrollHeight, OPEN_OMEGA, 0, () => {});
    groupsIn(box, groups, fromShut);
    sweep(line, 'in');
    if (fromShut && row) nudgeInto(row, false);
  } else {
    if (!details.open) return;
    details.setAttribute('data-closing', '');
    drive(box, 0, CLOSE_OMEGA, box.getBoundingClientRect().height, () => {
      details.open = false;
      details.removeAttribute('data-closing');
      clearGroups(box);
    });
    groupsOut(box, groups);
    sweep(line, 'out');
  }
}
