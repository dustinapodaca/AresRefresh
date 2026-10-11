import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { startAnalytics, trackPage } from '../lib/analytics';
import { SEO } from '../seo/routes';

// Sends a page view on the first load and on every route change (src/lib/analytics.ts).
// The title comes from routes.json, since Helmet updates document.title a frame later.
export default function Analytics() {
  const { pathname } = useLocation();
  useEffect(() => {
    startAnalytics();
    trackPage(SEO[pathname]?.title);
  }, [pathname]);
  return null;
}
