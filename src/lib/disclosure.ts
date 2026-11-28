// Opening and closing a native <details> smoothly (owner, 2026-11-27; tried first on the quote
// form's "Add details", meant to go on every fold on the site once it reads right).
//
// - The panel's height eases open on the drawer curve the site uses for opening things (the
//   Services card FLIP, the phone menu), 320ms, and shuts a little faster, 240ms, easing in and
//   out: exits are quicker than entrances.
// - Its contents follow the opening a step behind, one group after another (35ms apart), each
//   settling 6px down from 0.62 opacity, so the panel reads as unfolding rather than snapping.
//   Closing, they dim back to 0.62 as the height folds over them.
// - It can be reversed mid-way: a click while it moves starts from the height it has reached,
//   never from 0 or full.
// - Without JS the native <details> opens and closes on its own; under reduced motion it snaps.
//
// The box that animates (`body`) must carry no padding or margin of its own (a 0px box with
// padding still shows the padding): put the padding on a child.
//
// The summary takes `onMouseDown={preventSelect}` and `user-select: none`: a quick double click
// on it otherwise selected the text of the whole panel as it opened.

const OPEN_EASE = 'cubic-bezier(0.32, 0.72, 0, 1)';
// Closing eases in and out: the standard curve dropped a third of a tall panel in the first
// frame, which read as a slam.
const CLOSE_EASE = 'cubic-bezier(0.4, 0, 0.2, 1)';
const OPEN_MS = 320;
const CLOSE_MS = 240;
const ITEM_MS = 280;
const ITEM_STEP = 35;

const running = new WeakMap<HTMLElement, Animation[]>();

type Parts = {
  /** Selector for the box whose height animates, inside the details. */
  body: string;
  /** Selector for the groups inside it that follow the opening one after another. */
  items?: string;
};

export function isOpening(details: HTMLDetailsElement) {
  return !details.open || details.hasAttribute('data-closing');
}

export function setDetailsOpen(details: HTMLDetailsElement, open: boolean, { body, items }: Parts) {
  const box = details.querySelector<HTMLElement>(body);
  if (!box) {
    details.open = open;
    return;
  }
  // Where it is now, mid-animation included, before anything is cancelled.
  const from = details.open ? box.getBoundingClientRect().height : 0;
  running.get(box)?.forEach((a) => a.cancel());
  running.delete(box);

  const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const groups = items ? Array.from(box.querySelectorAll<HTMLElement>(items)) : [];
  const done = () => {
    running.get(box)?.forEach((a) => a.cancel());
    running.delete(box);
    box.style.overflow = '';
    box.style.height = '';
  };

  if (open) {
    details.removeAttribute('data-closing');
    details.open = true;
    if (still) return;
    box.style.height = '';
    const to = box.getBoundingClientRect().height;
    // The start height also goes on the box itself: now and then the first frame painted before
    // the animation took hold and showed the panel whole for a frame.
    box.style.overflow = 'hidden';
    box.style.height = `${from}px`;
    const h = box.animate([{ height: `${from}px` }, { height: `${to}px` }], { duration: OPEN_MS, easing: OPEN_EASE });
    // The groups play their entrance only when the panel opens from shut; reversing a close
    // just grows the height back.
    const anims = [h, ...(from < 1 ? groups : []).map((g, i) =>
      g.animate(
        [{ opacity: 0.62, transform: 'translateY(-6px)' }, { opacity: 1, transform: 'none' }],
        { duration: ITEM_MS, delay: 40 + i * ITEM_STEP, easing: OPEN_EASE, fill: 'backwards' },
      ),
    )];
    running.set(box, anims);
    // The box lets go of its set height the moment the height lands (the groups may still be
    // settling); everything is cleared once the last group has.
    h.finished.then(() => {
      box.style.height = '';
      box.style.overflow = '';
    }, () => {});
    Promise.all(anims.map((a) => a.finished)).then(done, () => {});
  } else {
    if (still || from < 1) {
      details.open = false;
      return;
    }
    details.setAttribute('data-closing', '');
    box.style.overflow = 'hidden';
    box.style.height = `${from}px`;
    const h = box.animate([{ height: `${from}px` }, { height: '0px' }], { duration: CLOSE_MS, easing: CLOSE_EASE, fill: 'forwards' });
    const anims = [h, ...groups.map((g) =>
      g.animate([{ opacity: 1 }, { opacity: 0.62 }], { duration: CLOSE_MS * 0.7, easing: CLOSE_EASE, fill: 'forwards' }),
    )];
    running.set(box, anims);
    h.finished.then(() => {
      details.open = false;
      details.removeAttribute('data-closing');
      done();
    }, () => {});
  }
}

/** On the summary's mousedown: a second click in quick succession toggles, never selects. */
export function preventSelect(e: { detail: number; preventDefault: () => void }) {
  if (e.detail > 1) e.preventDefault();
}
