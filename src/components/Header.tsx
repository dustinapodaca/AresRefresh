import { useEffect, useRef, useState } from 'react';
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
  const headerRef = useRef<HTMLElement>(null);
  const { pathname } = useLocation();

  // On a route change the menu closes after the new page has painted beneath it (the sheet is
  // solid, so the swap is hidden), and its close reveals the new page: that is the
  // transition from the menu (owner, 2026-10-09). Closing in the same frame as the swap let
  // the new page's render eat the animation.
  useEffect(() => {
    let a = 0;
    let b = 0;
    a = requestAnimationFrame(() => {
      b = requestAnimationFrame(() => setOpen(false));
    });
    return () => {
      cancelAnimationFrame(a);
      cancelAnimationFrame(b);
    };
  }, [pathname]);
  // Links ask the menu to close (with its animation) before they change the page
  // (SmoothAnchors).
  useEffect(() => {
    const close = () => setOpen(false);
    window.addEventListener('ares:close-menu', close);
    return () => window.removeEventListener('ares:close-menu', close);
  }, []);

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

  // The phone menu grows out of the hamburger as a circle and shrinks back into it (owner,
  // 2026-10-09). The circle's center and the radius that reaches the farthest corner.
  const placeMenuOrigin = (button: HTMLElement) => {
    const h = headerRef.current;
    if (!h) return;
    const r = button.getBoundingClientRect();
    const x = r.left + r.width / 2;
    const y = r.top + r.height / 2;
    const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
    h.style.setProperty('--menu-x', `${x}px`);
    h.style.setProperty('--menu-y', `${y}px`);
    h.style.setProperty('--menu-r', `${Math.ceil(radius) + 2}px`);
  };

  const onBrand = () => {
    setOpen(false);
    if (pathname === '/') window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
    <a href="#main" className="ds ds-skip">Skip to content</a>
    <header ref={headerRef} className="ds ds-header" data-solid={scrolled || open} data-open={open}>
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
            onClick={(e) => {
              placeMenuOrigin(e.currentTarget);
              setOpen((o) => !o);
            }}
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
              {NAV.map((item, i) => (
                <li key={item.to} style={{ ['--i' as string]: i }}>
                  <NavLink to={item.to} end={item.end} className="ds-sheet-link">
                    {item.label}
                    <Arrow size={18} />
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
          <div className="ds-sheet-contact" style={{ ['--i' as string]: NAV.length }}>
            <a href="tel:+17196963966" className="ds-data">719-696-3966</a>
            <a href="mailto:contact@aressecurity.co" className="ds-data">contact@aressecurity.co</a>
          </div>
          <div className="ds-actions" style={{ marginTop: 32, ['--i' as string]: NAV.length + 1 }}>
            <Link to="/contact" className="ds-btn ds-btn-primary">
              Request a Quote
              <Arrow />
            </Link>
          </div>
        </div>
      </div>
    </header>
    </>
  );
}
