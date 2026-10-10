// Where an in-page link should land (owner, 2026-10-09): the section's first line of content
// (its top plus its own padding, so the heading, not the empty space above it) a set gap below
// the nav and, below 1200px, the running head. Every rail, table of contents, and "#" link
// uses this, so every page lands the same way.

const reduceMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function px(value: string) {
  return parseFloat(value) || 0;
}

/** The scroll position that puts `el`'s content start just under the bars. */
export function sectionY(el: HTMLElement): number {
  const root = document.documentElement;
  const header = document.querySelector<HTMLElement>('.ds-header')?.offsetHeight ?? 0;
  // The running head shows below 1200px once the reader is past the opening.
  const runhead = document.querySelector('.ds-runhead') && window.innerWidth < 1200 ? px(getComputedStyle(root).getPropertyValue('--ds-runhead')) : 0;
  const gap = window.innerWidth >= 1024 ? 32 : 24;
  // Sections land on their content (inside their top padding); a card or row lands on itself.
  const pad = el.tagName === 'SECTION' ? px(getComputedStyle(el).paddingTop) : 0;
  // Services holds its page still for the first --svc-cap of scroll (transform or spacer), so
  // a target's current box sits that much higher than where it rests once the hold is spent.
  let shift = 0;
  if (root.classList.contains('svc-hold') || root.classList.contains('svc-hold-js')) {
    const cap = px(getComputedStyle(root).getPropertyValue('--svc-cap'));
    shift = cap - Math.min(Math.max(window.scrollY, 0), cap);
  }
  const top = el.getBoundingClientRect().top + window.scrollY + pad + shift;
  return Math.max(0, Math.round(top - header - runhead - gap));
}

/** Smoothly scroll to the element with this id (instantly under reduced motion or `instant`). */
export function scrollToSection(id: string, opts: { instant?: boolean; focus?: boolean } = {}) {
  const el = document.getElementById(id);
  if (!el) return false;
  window.scrollTo({ top: sectionY(el), behavior: opts.instant || reduceMotion() ? 'auto' : 'smooth' });
  if (opts.focus) {
    // Move keyboard and screen-reader focus with the view, without a second jump.
    if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', '-1');
    el.focus({ preventScroll: true });
  }
  return true;
}
