import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Seo from '../seo/Seo';
import Arrow from '../components/Arrow';

/**
 * Real 404. Netlify serves the prerendered dist/404.html with a 404 status
 * (see public/_redirects), which replaces the old `/* -> /index.html 200`
 * rule that turned every mistyped URL into a soft 404 duplicate of Home.
 *
 * "The Search Light" (docs/notfound-concepts.md, owner 2026-10-06): a giant 404 over a
 * slow rust aurora, with a dark glass card over its foot carrying the way back.
 */
const ROUTES = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/capability-statement', label: 'Capability Statement' },
  { to: '/contact', label: 'Request a quote' },
];

export default function NotFound() {
  // The address that was not found, filled in after hydration so the prerendered HTML and
  // the first client render match. The prerender visits a sentinel URL to build 404.html;
  // that one (and /404 itself) never shows.
  const [path, setPath] = useState('');
  useEffect(() => {
    const { pathname } = window.location;
    if (pathname !== '/404' && !pathname.startsWith('/__prerender')) setPath(pathname);
  }, []);

  return (
    <main id="main" tabIndex={-1} className="ds ds-page ds-nf">
      <Seo path="/404" noindex />
      <section className="ds-nf-stage" aria-labelledby="nf-title">
        <div className="ds-nf-aurora" aria-hidden="true" />
        <div className="ds-container ds-nf-inner">
          <p className="ds-nf-code" aria-hidden="true">404</p>
          <div className="ds-nf-card">
            <h1 id="nf-title" className="ds-display-lg">Page not found</h1>
            <p className="ds-nf-lead">
              The link may be old, or the address mistyped. Everything else is where it should be.
            </p>
            <p className="ds-data ds-nf-path">
              {path ? <>No page at <span>{path}</span></> : 'No page at this address'}
            </p>
            <ul className="ds-nf-routes">
              {ROUTES.map((r) => (
                <li key={r.to}>
                  <Link to={r.to}>
                    {r.label}
                    <Arrow size={16} />
                  </Link>
                </li>
              ))}
            </ul>
            <p className="ds-nf-call">
              Or call <a href="tel:+17196963966" className="ds-link ds-data">719-696-3966</a>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
