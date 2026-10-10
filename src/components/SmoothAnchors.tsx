import { useEffect } from 'react';
import { scrollToSection } from '../lib/scrollToSection';

// Same-page "#" links (the section rails, the policies' table of contents, "See open roles",
// the skip link) glide to their section instead of jumping (owner, 2026-10-09), and land on
// the section's content just under the nav (src/lib/scrollToSection.ts). The address bar
// still gets the hash, without a router update that would snap the page.
export default function SmoothAnchors() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.('a[href]') as HTMLAnchorElement | null;
      if (!a || a.target === '_blank') return;
      const url = new URL(a.href, location.href);
      if (!url.hash || url.origin !== location.origin || url.pathname !== location.pathname) return;
      const id = decodeURIComponent(url.hash.slice(1));
      if (!scrollToSection(id, { focus: true })) return;
      e.preventDefault();
      if (location.hash !== url.hash) history.pushState(history.state, '', url.hash);
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);
  return null;
}
