import { useEffect, useLayoutEffect, useRef } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';
import { sectionY } from '../lib/scrollToSection';

// Where a page starts (owner, 2026-11-22):
// - A new page (a link): at the top, or at the anchor when the link names one (the location pages
//   link each site type to its Services division, e.g. /services#industrial). The target lands
//   where in-page links land (src/lib/scrollToSection.ts).
// - Back and forward: where the reader left that page. Positions are kept per history entry in
//   sessionStorage, so Back still lands right after a reload.
// - The first load: left alone (an anchor still scrolls to its section). It used to force the top,
//   which yanked a reader who scrolled before the script ran back up. The browser's own restoring
//   is off, so a reload still starts at the top: Home and Services grow once their scroll engine
//   pins sections, and a position the browser restored early would land in the wrong place.

const STORE = 'ares-scroll';

if (typeof window !== 'undefined' && 'scrollRestoration' in history) history.scrollRestoration = 'manual';

function readStore(): Record<string, number> {
  try {
    return JSON.parse(sessionStorage.getItem(STORE) || '{}');
  } catch {
    return {};
  }
}

function savePosition(key: string, y: number) {
  try {
    const all = readStore();
    all[key] = Math.round(y);
    // Keep the last 50 entries; an object keeps insertion order, so drop the oldest.
    const keys = Object.keys(all);
    if (keys.length > 50) for (const k of keys.slice(0, keys.length - 50)) delete all[k];
    sessionStorage.setItem(STORE, JSON.stringify(all));
  } catch {
    /* storage blocked: Back starts at the top */
  }
}

const instant = (top: number) => window.scrollTo({ top, left: 0, behavior: 'instant' as ScrollBehavior });

/** Scroll to `y`, retrying while the page grows into it (the scroll engine adds its pins after the
 *  first paint), for up to 1.5s, and giving up the moment the reader scrolls themselves. */
function restore(y: number) {
  let raf = 0;
  let settled = 0;
  const start = performance.now();
  const stop = () => {
    cancelAnimationFrame(raf);
    for (const e of ['wheel', 'touchstart', 'keydown', 'pointerdown'] as const) window.removeEventListener(e, stop);
  };
  for (const e of ['wheel', 'touchstart', 'keydown', 'pointerdown'] as const) window.addEventListener(e, stop, { passive: true });
  const step = () => {
    if (Math.abs(window.scrollY - y) > 1) {
      settled = 0;
      instant(y);
    } else settled++;
    // Done once it has held for a few frames at the spot, or the time is up.
    if (settled > 8 || performance.now() - start > 1500) return stop();
    raf = requestAnimationFrame(step);
  };
  instant(y);
  raf = requestAnimationFrame(step);
  return stop;
}

export default function ScrollToTop() {
  const { pathname, hash, key } = useLocation();
  const navType = useNavigationType();
  // The CSS fade for a new page, as a one-shot flag set while the new page mounts and cleared
  // right after, so nothing can restart it later. Only for page changes that neither ran a
  // View Transition nor came from the phone menu (back and forward, older browsers); never
  // on the first load. (A flag that stayed on and gated on others restarted the fade after a
  // View Transition ended: the page appeared, then faded in again.)
  const firstPath = useRef(pathname);
  useLayoutEffect(() => {
    if (pathname === firstPath.current) return;
    firstPath.current = '';
    const root = document.documentElement;
    if (root.hasAttribute('data-vt-running') || root.hasAttribute('data-nav-quiet')) return;
    root.setAttribute('data-nav-fade', '');
    const t = window.setTimeout(() => root.removeAttribute('data-nav-fade'), 400);
    return () => window.clearTimeout(t);
  }, [pathname]);

  // The reader's position on the current entry, kept as they scroll (read from the last scroll
  // event, not at the moment of leaving: by then the next page may already have changed it).
  const lastY = useRef(0);
  const keyRef = useRef(key);
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        lastY.current = window.scrollY;
      });
    };
    lastY.current = window.scrollY;
    window.addEventListener('scroll', onScroll, { passive: true });
    const onHide = () => savePosition(keyRef.current, window.scrollY);
    window.addEventListener('pagehide', onHide);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('pagehide', onHide);
    };
  }, []);

  // The first load lasts until the location changes (not "the first run": React's development
  // Strict Mode runs this twice on mount, and a fresh load's history key is always "default").
  const navigated = useRef(false);
  const prev = useRef({ pathname, hash });
  useLayoutEffect(() => {
    if (keyRef.current !== key) {
      savePosition(keyRef.current, lastY.current);
      keyRef.current = key;
      navigated.current = true;
    }
    const isFirst = !navigated.current;
    const samePage = prev.current.pathname === pathname && prev.current.hash === hash;
    prev.current = { pathname, hash };

    if (!isFirst && navType === 'POP') {
      const saved = readStore()[key];
      if (saved !== undefined) return restore(saved);
    }
    // A link that changes only the query (the Insights topic filter) keeps the reader's place.
    if (!isFirst && samePage) return;

    const id = hash ? decodeURIComponent(hash.slice(1)) : '';
    const target = id ? document.getElementById(id) : null;
    if (target) {
      // Same landing as the in-page links: the section's content just under the bars. One
      // moment later too, once the page's own setup (Services' scroll hold) has run.
      instant(sectionY(target));
      const t = window.setTimeout(() => instant(sectionY(target)), 0);
      return () => window.clearTimeout(t);
    }
    if (isFirst) return;
    instant(0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [pathname, hash, key, navType]);

  return null;
}
