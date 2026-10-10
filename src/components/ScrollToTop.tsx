import { useLayoutEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { sectionY } from '../lib/scrollToSection';

// New page: start at the top, or at the anchor when the link names one (the location
// pages link each site type to its Services division, e.g. /services#industrial). The
// target lands where in-page links land (src/lib/scrollToSection.ts).
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();
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

  useLayoutEffect(() => {
    const id = hash ? decodeURIComponent(hash.slice(1)) : '';
    const target = id ? document.getElementById(id) : null;
    if (target) {
      // Same landing as the in-page links: the section's content just under the bars. One
      // moment later too, once the page's own setup (Services' scroll hold) has run.
      window.scrollTo({ top: sectionY(target), behavior: 'instant' as ScrollBehavior });
      const t = window.setTimeout(() => window.scrollTo({ top: sectionY(target), behavior: 'instant' as ScrollBehavior }), 0);
      return () => window.clearTimeout(t);
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [pathname, hash]);

  return null;
}
