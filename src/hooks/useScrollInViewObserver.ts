import { useEffect } from 'react';

/**
 * Watches every element tagged with `data-scroll-active` and toggles a
 * `data-in-view="true|false"` attribute as it crosses the middle 10% slice
 * of the viewport. The matching Tailwind `data-[in-view=true]:` classes
 * then mirror whatever the element's `hover:` styles would do — letting
 * touch-only devices see the same animations.
 *
 * If an element also carries `data-scroll-once`, the observer flips its
 * `data-in-view` to `"true"` on its first intersection and then stops
 * watching it — useful for one-way reveal animations (e.g. staggered
 * cascades) that shouldn't replay when the user scrolls back.
 *
 * One-shot setup on mount; observer is cleaned up on unmount. Targets are
 * collected once via `querySelectorAll`, so this is intended for pages
 * with statically-rendered card grids (no dynamic insertion).
 */
export function useScrollInViewObserver() {
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;
    const targets = document.querySelectorAll<HTMLElement>('[data-scroll-active]');
    if (!targets.length) return;

    // Hover-mirror observer (center detection): fires only when the element
    // is inside the middle 10% of the viewport, so hover-equivalent styles
    // turn on/off as the card passes the optical center.
    const centerIo = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.setAttribute('data-in-view', entry.isIntersecting ? 'true' : 'false');
        });
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 },
    );

    // Reveal observer (early trigger): fires when the element's top enters
    // the bottom ~70% of the viewport — used for one-way reveals so the
    // animation starts as the section is becoming visible rather than
    // waiting until the user has already scrolled halfway through it.
    const revealIo = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.setAttribute('data-in-view', 'true');
            revealIo.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -25% 0px', threshold: 0 },
    );

    targets.forEach((el) => {
      if (el.hasAttribute('data-scroll-once')) revealIo.observe(el);
      else centerIo.observe(el);
    });

    return () => {
      centerIo.disconnect();
      revealIo.disconnect();
    };
  }, []);
}
