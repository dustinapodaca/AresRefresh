import { createContext, useContext, useEffect, useLayoutEffect, useState, type RefObject } from 'react';
import type { Engine } from '../../lib/motionEngine';
import { scrollToSection } from '../../lib/scrollToSection';

// Home's motion (owner, 2026-10-19): one continuous, choreographed scroll. The engine
// (src/lib/motionEngine.ts: Lenis and GSAP's ScrollTrigger) loads after the first paint, on Home
// only. Until it arrives, and wherever it never does (reduced motion, the prerender and other
// automated browsers, no JavaScript), Home is the resolved, static page: every section reads
// whole. Each section arms its own motion through useScene once the engine is here, and every
// hidden starting state is set by that code, never by the HTML or the CSS alone.

const MotionContext = createContext<Engine | null>(null);

/** Whether Home's scroll motion may run in this browser. */
export function motionAllowed() {
  if (typeof window === 'undefined') return false;
  if (navigator.webdriver) return false;
  return !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/** Loads the engine after the first paint and tears it down when Home unmounts. */
export function useMotionEngine(): Engine | null {
  const [engine, setEngine] = useState<Engine | null>(null);
  useEffect(() => {
    if (!motionAllowed()) return;
    let dead = false;
    let made: Engine | null = null;
    // A frame and a task after mount, so the first paint never waits on it.
    const raf = requestAnimationFrame(() => {
      window.setTimeout(() => {
        import('../../lib/motionEngine').then(({ createEngine }) => {
          if (dead) return;
          made = createEngine();
          setEngine(made);
        });
      }, 0);
    });
    return () => {
      dead = true;
      cancelAnimationFrame(raf);
      made?.destroy();
    };
  }, []);
  return engine;
}

/** Provides the engine to Home's sections, and refreshes every trigger once they are set up. */
export function MotionProvider({ engine, children }: { engine: Engine | null; children: React.ReactNode }) {
  // A parent's layout effect runs after its children's, so every section's triggers exist by now.
  useLayoutEffect(() => {
    if (!engine) return;
    const { ScrollTrigger } = engine;
    ScrollTrigger.sort();
    ScrollTrigger.refresh();
    // Arriving at /#section: the pins have moved it, so land on it again.
    const id = window.location.hash ? decodeURIComponent(window.location.hash.slice(1)) : '';
    if (id) scrollToSection(id, { instant: true });
  }, [engine]);
  return <MotionContext.Provider value={engine}>{children}</MotionContext.Provider>;
}

export function useMotion() {
  return useContext(MotionContext);
}

/**
 * Sets up a section's motion once the engine is here, inside a GSAP context scoped to the
 * section, so leaving Home reverts every tween, trigger, and pin before React removes the DOM.
 * `setup` may return its own cleanup.
 */
export function useScene(
  scope: RefObject<HTMLElement>,
  setup: (engine: Engine, root: HTMLElement) => void | (() => void),
  deps: unknown[] = [],
) {
  const engine = useMotion();
  useLayoutEffect(() => {
    const root = scope.current;
    if (!engine || !root) return;
    let extra: void | (() => void);
    const ctx = engine.gsap.context(() => {
      extra = setup(engine, root);
    }, root);
    return () => {
      if (typeof extra === 'function') extra();
      ctx.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [engine, ...deps]);
}
