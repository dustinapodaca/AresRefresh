import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

// New page: start at the top, or at the anchor when the link names one (the location
// pages link each site type to its Services division, e.g. /services#industrial). The
// target's scroll-margin keeps it clear of the nav and running head.
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useLayoutEffect(() => {
    const id = hash ? decodeURIComponent(hash.slice(1)) : '';
    const target = id ? document.getElementById(id) : null;
    if (target) {
      target.scrollIntoView({ block: 'start', behavior: 'instant' as ScrollBehavior });
      return;
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [pathname, hash]);

  return null;
}
