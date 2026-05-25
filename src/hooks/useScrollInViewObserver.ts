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
    const hoverTargets = document.querySelectorAll<HTMLElement>('[data-scroll-active]');
    const revealTargets = document.querySelectorAll<HTMLElement>('[data-reveal]');
    if (!hoverTargets.length && !revealTargets.length) return;

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

    // Directional reveal observer — sets `data-revealed="true"` once when
    // the element scrolls into view. Uses its OWN attribute so it can
    // coexist on the same element as the hover-mirror data-in-view state
    // (e.g. the four feature cards in the "We Are Reliable" section use
    // both: scroll-into-view fade-up + hover-mirror icon color flip).
    //
    // rootMargin shrinks the bottom of the root by 15% so elements
    // scrolling up from below have to be a bit inside the viewport before
    // reveal fires — otherwise reveals trigger on a one-pixel sliver and
    // are mostly done by the time the user actually looks at the section.
    // Elements already in the viewport on mount bypass this entirely via
    // the synchronous rect check below.
    const revealOnceIo = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.setAttribute('data-revealed', 'true');
            revealOnceIo.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -15% 0px', threshold: 0 },
    );

    hoverTargets.forEach((el) => {
      if (el.hasAttribute('data-scroll-once')) revealIo.observe(el);
      else centerIo.observe(el);
    });
    // Belt-and-suspenders: synchronously detect anything that's already in
    // the viewport at registration time. The IO's own initial callback is
    // async; on some browsers / first paints it can lag a frame, leaving
    // a brief flash of invisible content. A direct rect check eliminates
    // that gap. Anything OFF-screen is handed to the observer as normal.
    //
    // On-mount reveals are delayed ~400ms so they animate AFTER the hero
    // (which uses the .reveal/.reveal-d1/.reveal-d2 mount classes) has
    // started. Without this delay everything competes at t=0 and the
    // hero's stagger gets visually flattened. The delay is sync-only —
    // observer-triggered reveals (scrolling content into view later)
    // still fire immediately.
    const ON_MOUNT_REVEAL_DELAY_MS = 400;
    const viewportH = window.innerHeight;
    const timers: number[] = [];
    revealTargets.forEach((el) => {
      const rect = el.getBoundingClientRect();
      const inViewportNow = rect.top < viewportH && rect.bottom > 0;
      if (inViewportNow) {
        const t = window.setTimeout(() => {
          el.setAttribute('data-revealed', 'true');
        }, ON_MOUNT_REVEAL_DELAY_MS);
        timers.push(t);
      } else {
        revealOnceIo.observe(el);
      }
    });

    return () => {
      centerIo.disconnect();
      revealIo.disconnect();
      revealOnceIo.disconnect();
      timers.forEach((t) => clearTimeout(t));
    };
  }, []);
}
