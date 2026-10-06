import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import Arrow from './Arrow';

// Modeled on the v08 nav (tag home-v08-framer-flow-final): transparent over the page at the
// top, a solid canvas bar with a hairline once scrolled, links centered, white pill CTA.
const NAV = [
  { to: '/', label: 'Home', end: true },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/careers', label: 'Careers' },
  { to: '/capability-statement', label: 'Capability Statement' },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  // Close the menu on any route change.
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // While the menu is open: lock page scroll and close on Escape.
  useEffect(() => {
    if (!open) return;
    const html = document.documentElement;
    const prev = html.style.overflow;
    html.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      html.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const onBrand = () => {
    setOpen(false);
    if (pathname === '/') window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="ds ds-header" data-solid={scrolled || open} data-open={open}>
      <div className="ds-container ds-header-row">
        <Link to="/" onClick={onBrand} className="ds-brand" aria-label="Ares Security home">
          <span className="ds-mark" aria-hidden="true" />
        </Link>

        <nav className="ds-nav" aria-label="Primary">
          <ul>
            {NAV.map((item) => (
              <li key={item.to}>
                <NavLink to={item.to} end={item.end} className="ds-nav-link">
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ds-header-actions">
          <Link to="/contact" className="ds-btn ds-btn-primary ds-header-cta">
            Request a Quote
            <Arrow size={14} />
          </Link>
          <button
            type="button"
            className="ds-menu-btn"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="site-menu"
            onClick={() => setOpen((o) => !o)}
          >
            <span className="ds-menu-icon" aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
          </button>
        </div>
      </div>

      <div id="site-menu" className="ds-sheet" aria-hidden={!open} {...(open ? {} : { inert: '' })}>
        <div className="ds-container" style={{ paddingTop: 12, paddingBottom: 48 }}>
          <nav aria-label="Menu">
            <ul>
              {NAV.map((item) => (
                <li key={item.to}>
                  <NavLink to={item.to} end={item.end} className="ds-sheet-link">
                    {item.label}
                    <Arrow size={18} />
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
          <div className="ds-sheet-contact">
            <a href="tel:+17196963966" className="ds-data">719-696-3966</a>
            <a href="mailto:contact@aressecurity.co" className="ds-data">contact@aressecurity.co</a>
          </div>
          <div className="ds-actions" style={{ marginTop: 32 }}>
            <Link to="/contact" className="ds-btn ds-btn-primary">
              Request a Quote
              <Arrow />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
