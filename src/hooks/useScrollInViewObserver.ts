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
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target as HTMLElement;
          if (entry.isIntersecting) {
            el.setAttribute('data-in-view', 'true');
            // One-way reveals: latch on, then stop observing.
            if (el.hasAttribute('data-scroll-once')) io.unobserve(el);
          } else {
            el.setAttribute('data-in-view', 'false');
          }
        });
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 },
    );
    targets.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}
