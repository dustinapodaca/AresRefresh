import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import Arrow from './Arrow';

const NAV = [
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
    const onScroll = () => setScrolled(window.scrollY > 8);
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
    <header className="ds ds-header" data-scrolled={scrolled} data-open={open}>
      <div className="ds-container ds-header-row">
        <Link to="/" onClick={onBrand} className="ds-brand" aria-label="Ares Security home">
          <span className="ds-mark" aria-hidden="true" />
        </Link>

        <nav className="ds-nav" aria-label="Primary">
          <ul>
            {NAV.map((item) => (
              <li key={item.to}>
                <NavLink to={item.to} className="ds-nav-link">
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <a href="tel:+17196963966" className="ds-data ds-header-phone">
          719-696-3966
        </a>
        <Link to="/contact" className="ds-btn ds-btn-primary ds-btn-sm ds-header-cta">
          Request a quote
          <Arrow size={14} />
        </Link>

        <button
          type="button"
          className="ds-menu-btn"
          aria-expanded={open}
          aria-controls="site-menu"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? 'Close' : 'Menu'}
          <span className="ds-menu-icon" aria-hidden="true">
            <span />
            <span />
          </span>
        </button>
      </div>

      <div id="site-menu" className="ds-sheet" aria-hidden={!open} {...(open ? {} : { inert: '' })}>
        <div className="ds-container" style={{ paddingTop: 12, paddingBottom: 48 }}>
          <nav aria-label="Menu">
            <ul>
              <li>
                <NavLink to="/" end className="ds-sheet-link">
                  Home
                  <Arrow size={18} />
                </NavLink>
              </li>
              {NAV.map((item) => (
                <li key={item.to}>
                  <NavLink to={item.to} className="ds-sheet-link">
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
              Request a quote
              <Arrow />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
