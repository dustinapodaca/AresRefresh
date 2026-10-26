// The phone pans (Home's prime row, the Services four stages) run on the browser, not on script
// (owner, 2026-10-25: they felt choppier than the rest of the page on an iPhone, where Safari runs
// page scrolling at 120fps but script at 60). The frame holds with `position: sticky` over a runway
// as tall as the pan, and every continuous move (the row's slide, the rust fill, the posts falling)
// is a CSS animation on the section's view timeline, so it moves with the scroll itself. Script only
// measures (on load and on resize, never per frame) and writes those numbers into a small style
// sheet, and flips the few on/off states (a card lit, the line done) when the scroll passes them.
// Browsers without scroll-driven animations keep the GSAP version.

export const cssPanSupported = () =>
  typeof CSS !== 'undefined' &&
  CSS.supports('animation-timeline: view()') &&
  CSS.supports('animation-range: cover calc(100% - 10px) cover calc(100% - 5px)');

/** One style sheet per pan, replaced whenever the numbers change. */
export function panSheet(id: string) {
  let el: HTMLStyleElement | null = null;
  let last = '';
  return {
    set(text: string) {
      if (text === last) return;
      last = text;
      if (!el) {
        el = document.createElement('style');
        el.dataset.pan = id;
        document.head.appendChild(el);
      }
      el.textContent = text;
    },
    remove() {
      el?.remove();
      el = null;
      last = '';
    },
  };
}

/**
 * The scroll range for a stretch [a, b] (fractions) of the hold, on the subject's `cover` range, counted
 * back from where the subject's foot leaves the top of the screen, so it doesn't depend on the screen's
 * height (Safari's bars). `end` is the scroll left from the hold's end to that point: the sticky top,
 * the frame's height, and the subject's bottom padding. `run` is the hold's length.
 */
export function panRange(end: number, run: number, a: number, b: number) {
  const at = (f: number) => (end + run * (1 - f)).toFixed(1);
  return `cover calc(100% - ${at(a)}px) cover calc(100% - ${at(b)}px)`;
}

/** Keyframe offsets as percentages for a list of [fraction, declaration] stops. */
export const frames = (stops: [number, string][]) =>
  stops.map(([f, d]) => `${(Math.max(0, Math.min(1, f)) * 100).toFixed(3)}% { ${d} }`).join(' ');
