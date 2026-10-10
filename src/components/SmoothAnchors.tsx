import { useEffect } from 'react';
import { flushSync } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { scrollToSection } from '../lib/scrollToSection';

// How clicks move around the site (owner, 2026-10-09).
// - Same-page "#" links glide to their section (src/lib/scrollToSection.ts).
// - A link to the page already open scrolls back to the top instead of doing nothing.
// - With the phone menu open, the menu closes with its own animation first and then the
//   page changes; the menu closing is the transition.
// - Otherwise the page changes inside a View Transition (dossier.css, ::view-transition):
//   the browser crossfades a snapshot of the old page into the new one on the compositor,
//   so it stays smooth while a phone renders the new page. Without View Transitions the new
//   page fades in with CSS instead (html[data-nav]), as it does for back and forward.
//   None of it under reduced motion.
// Capture phase, so this runs before React Router's own Link handler (which then sees the
// click already handled and stands down).

const MENU_CLOSE_MS = 170; // the sheet's close transition (dossier.css, 160ms) plus a frame

const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export default function SmoothAnchors() {
  const navigate = useNavigate();

  useEffect(() => {
    // Older browsers lack View Transitions even where the type says otherwise.
    const canTransition = typeof (document as Partial<Document>).startViewTransition === 'function';

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.('a[href]') as HTMLAnchorElement | null;
      if (!a || (a.target && a.target !== '_self') || a.hasAttribute('download')) return;
      const url = new URL(a.href, location.href);
      if (url.origin !== location.origin || !/^https?:$/.test(url.protocol)) return;

      const samePage = url.pathname === location.pathname && url.search === location.search;
      const menuOpen = document.querySelector('.ds-header[data-open="true"]') !== null;

      // Same page with a section: glide to it.
      if (samePage && url.hash) {
        const id = decodeURIComponent(url.hash.slice(1));
        if (menuOpen) window.dispatchEvent(new Event('ares:close-menu'));
        if (!scrollToSection(id, { focus: true })) return;
        e.preventDefault();
        if (location.hash !== url.hash) history.pushState(history.state, '', url.hash);
        return;
      }

      // Same page, no section: close the menu if it is open, and go back to the top.
      if (samePage) {
        e.preventDefault();
        if (menuOpen) window.dispatchEvent(new Event('ares:close-menu'));
        window.scrollTo({ top: 0, behavior: reduceMotion() ? 'auto' : 'smooth' });
        return;
      }

      const to = url.pathname + url.search + url.hash;
      e.preventDefault();

      // The phone menu: let it close, then change the page with no other transition.
      if (menuOpen) {
        window.dispatchEvent(new Event('ares:close-menu'));
        document.documentElement.setAttribute('data-nav-quiet', '');
        window.setTimeout(() => {
          navigate(to);
          // Let the quiet flag outlive the new page's first frames.
          window.setTimeout(() => document.documentElement.removeAttribute('data-nav-quiet'), 400);
        }, reduceMotion() ? 0 : MENU_CLOSE_MS);
        return;
      }

      if (canTransition && !reduceMotion()) {
        // While it runs, the CSS fade stands down (it still covers back and forward).
        const root = document.documentElement;
        root.setAttribute('data-vt-running', '');
        const t = document.startViewTransition(() => {
          flushSync(() => navigate(to));
        });
        t.finished.finally(() => root.removeAttribute('data-vt-running'));
        return;
      }
      navigate(to);
    };

    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, [navigate]);

  return null;
}
