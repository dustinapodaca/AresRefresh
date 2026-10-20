// Home's scroll engine (owner, 2026-10-19: Home as one continuous, choreographed scroll, like a
// Framer site or flora.ai). Lenis gives the inertial glide; GSAP's ScrollTrigger pins and scrubs
// every section on one shared clock, in every browser (the CSS scroll timelines it replaces never
// ran in Firefox). Loaded on Home only, after the first paint, through a dynamic import, so no
// other page carries it; skipped under reduced motion and for automated browsers (the prerender),
// where Home stays the resolved, static page. See src/components/home/motion.tsx.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { setSmoothScroll } from './scrollToSection';

export type Engine = {
  gsap: typeof gsap;
  ScrollTrigger: typeof ScrollTrigger;
  lenis: Lenis;
  destroy: () => void;
};

export function createEngine(): Engine {
  gsap.registerPlugin(ScrollTrigger);
  // Touch keeps the phone's own scrolling (syncTouch off); the wheel and trackpad glide.
  const lenis = new Lenis({
    lerp: 0.1,
    smoothWheel: true,
    syncTouch: false,
    autoRaf: false,
    prevent: (node: HTMLElement) => node.closest?.('[data-lenis-prevent]') != null,
  });

  // One clock: Lenis is driven by GSAP's ticker, and every scroll moves ScrollTrigger with it, so
  // there is no second animation-frame loop for scroll effects.
  lenis.on('scroll', ScrollTrigger.update);
  const tick = (time: number) => lenis.raf(time * 1000);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);

  // The phone menu holds the page still by setting overflow: hidden on <html>; Lenis would still
  // move it, so it stops while the page is held.
  const html = document.documentElement;
  const hold = () => (html.style.overflow === 'hidden' ? lenis.stop() : lenis.start());
  const mo = new MutationObserver(hold);
  mo.observe(html, { attributes: true, attributeFilter: ['style'] });

  // In-page links glide through Lenis while it runs (src/lib/scrollToSection.ts).
  setSmoothScroll((y, immediate) => lenis.scrollTo(y, immediate ? { immediate: true, force: true } : { duration: 1.1, force: true }));

  // Webfonts change line lengths and so every trigger's position.
  let alive = true;
  document.fonts?.ready.then(() => alive && ScrollTrigger.refresh());

  // Development only: a handle for checking triggers from the browser console.
  if (import.meta.env.DEV) (window as unknown as { __motion?: unknown }).__motion = { gsap, ScrollTrigger, lenis };

  return {
    gsap,
    ScrollTrigger,
    lenis,
    destroy() {
      alive = false;
      setSmoothScroll(null);
      mo.disconnect();
      gsap.ticker.remove(tick);
      gsap.ticker.lagSmoothing(500, 33);
      ScrollTrigger.getAll().forEach((t) => t.kill());
      lenis.destroy();
    },
  };
}
