import { useEffect, type RefObject } from 'react';
import type { gsap as GsapType } from 'gsap';
import type { ScrollTrigger as ScrollTriggerType } from 'gsap/ScrollTrigger';
import type Lenis from 'lenis';

// The scroll engine for Home (home-flora, 2026-10-20): GSAP ScrollTrigger for pins and
// scrubbed timelines, on the browser's own scrolling. Loaded on this page only, after first
// paint, so no other page carries it. Native scroll (owner, 2026-10-21): the Lenis glide felt
// weighted; flora.ai scrolls like any page, so the wheel and trackpad move the page directly and
// only the animations ease. `?glide` turns the Lenis glide back on to compare.
//
// The resolved page is the default: the prerender (an automated browser), no JavaScript, and
// reduced motion get every section laid out and fully visible, with nothing pinned or scrubbed.
// Once the engine loads it sets <html data-nx-motion="on">, and the sections' motion layouts
// switch on from that attribute. `?motion` forces the engine on in an automated browser (for
// Playwright checks).

export type Engine = {
  gsap: typeof GsapType;
  ScrollTrigger: typeof ScrollTriggerType;
  lenis: Lenis | null;
};

let enginePromise: Promise<Engine | null> | null = null;
let engine: Engine | null = null;

export function motionAllowed(): boolean {
  if (typeof window === 'undefined') return false;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
  const forced = new URLSearchParams(window.location.search).has('motion');
  if (navigator.webdriver && !forced) return false;
  return true;
}

export function loadEngine(): Promise<Engine | null> {
  if (enginePromise) return enginePromise;
  if (!motionAllowed()) return (enginePromise = Promise.resolve(null));
  const glide = new URLSearchParams(window.location.search).has('glide');
  enginePromise = Promise.all([
    import('gsap'),
    import('gsap/ScrollTrigger'),
    glide ? import('lenis') : Promise.resolve(null),
  ]).then(
    ([g, st, l]) => {
      const gsap = g.gsap;
      const ScrollTrigger = st.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);
      let lenis: Lenis | null = null;
      if (l) {
        lenis = new l.default({ lerp: 0.09, smoothWheel: true, wheelMultiplier: 0.9 });
        lenis.on('scroll', ScrollTrigger.update);
        const glider = lenis;
        gsap.ticker.add((t: number) => glider.raf(t * 1000));
        gsap.ticker.lagSmoothing(0);
        (window as unknown as { __lenis?: Lenis }).__lenis = lenis;
      }
      document.documentElement.dataset.nxMotion = 'on';
      engine = { gsap, ScrollTrigger, lenis };
      // Fonts change line lengths and section heights: measure again once they land.
      document.fonts?.ready.then(() => ScrollTrigger.refresh());
      return engine;
    },
  );
  return enginePromise;
}

/** Tear the engine down when the page unmounts (another route takes over the window). */
export function destroyEngine() {
  if (!engine) {
    enginePromise = null;
    return;
  }
  engine.ScrollTrigger.getAll().forEach((t) => t.kill());
  engine.lenis?.destroy();
  delete (window as unknown as { __lenis?: Lenis }).__lenis;
  delete document.documentElement.dataset.nxMotion;
  engine = null;
  enginePromise = null;
}

/** Glide to a scroll position: Lenis when it runs (`?glide`), the browser's smooth scroll otherwise. */
export function scrollToY(y: number) {
  if (engine?.lenis) engine.lenis.scrollTo(y, { duration: 1.2 });
  else window.scrollTo({ top: y, behavior: 'smooth' });
}

/** How far the animations trail the scroll: a short ease, so they settle softly without the page
 * itself feeling weighted (was 0.4 to 0.7 with the Lenis glide). */
export const SCRUB = 0.2;

/**
 * Runs `setup` inside a gsap.context scoped to `ref` once the engine is loaded. Everything the
 * setup creates (tweens, ScrollTriggers, matchMedia blocks) is reverted on unmount. With no
 * engine (reduced motion, prerender) setup never runs and the section stays resolved.
 */
export function useScene(
  ref: RefObject<HTMLElement>,
  setup: (e: Engine, root: HTMLElement) => void | (() => void),
) {
  useEffect(() => {
    let cancelled = false;
    let ctx: gsap.Context | undefined;
    let extra: void | (() => void);
    loadEngine().then((e) => {
      const root = ref.current;
      if (!e || cancelled || !root) return;
      ctx = e.gsap.context(() => {
        extra = setup(e, root);
      }, root);
      // Pins above change where everything below starts: measure in page order.
      e.ScrollTrigger.sort();
      e.ScrollTrigger.refresh();
    });
    return () => {
      cancelled = true;
      if (typeof extra === 'function') extra();
      ctx?.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

/** The scroll-read headline (flora-like): each word rises from faint to full ink as the line
 * travels up the screen, scrubbed, so scrolling back un-reads it. */
export function readIn(e: Engine, el: Element | null, start = 'top 88%', end = 'top 50%') {
  if (!el) return;
  const ws = el.querySelectorAll('.nx-w');
  if (!ws.length) return;
  e.gsap.fromTo(
    ws,
    { opacity: 0.12, yPercent: 38 },
    { opacity: 1, yPercent: 0, ease: 'none', stagger: 0.1, scrollTrigger: { trigger: el, start, end, scrub: true } },
  );
}

/** Splits a headline's words into spans for the scroll-read reveal; the h2 keeps the full text. */
export function words(text: string) {
  const parts = text.split(' ');
  return [
    <span key="sr" className="nx-sr">{text}</span>,
    ...parts.map((w, i, all) => (
    // eslint-disable-next-line react/no-array-index-key
    <span key={i} className="nx-w" aria-hidden="true">
      {w}
      {i < all.length - 1 ? ' ' : ''}
    </span>
    )),
  ];
}
