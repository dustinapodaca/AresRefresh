import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import Arrow from './Arrow';
import PhoneIcon from './PhoneIcon';
import { ROLE_PAGES } from './market/roles';
import { INDUSTRY_PAGES } from './market/industries';

// Modeled on the v08 nav (tag home-v08-framer-flow-final): transparent over the page at the
// top, a solid canvas bar with a hairline once scrolled, links centered, white pill CTA.
// Copy audit group 2 (2026-10-10): no Home link (the mark goes home), Insights added.
const NAV: { to: string; label: string; end?: boolean }[] = [
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/careers', label: 'Careers' },
  { to: '/insights', label: 'Insights' },
  { to: '/capability-statement', label: 'Capability Statement' },
];

// Copy audit group 2 (owner chose both, 2026-10-10): Services opens a panel with the six
// services and the six industries, and phones get a call link beside the menu button.
const SERVICES_MENU = {
  services: ROLE_PAGES.map((r) => ({ to: `/services/${r.slug}`, label: r.name })),
  industries: INDUSTRY_PAGES.map((i) => ({ to: `/industries/${i.slug}`, label: i.name })),
};

export default function Header() {
  const [panel, setPanel] = useState(false);
  const panelTimer = useRef(0);
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
    setPanel(false);
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

  // The Services panel closes on Escape and on a click outside it.
  useEffect(() => {
    if (!panel) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setPanel(false);
    const onDown = (e: PointerEvent) => {
      if (!(e.target as Element).closest('.ds-nav-has-menu')) setPanel(false);
    };
    window.addEventListener('keydown', onKey);
    window.addEventListener('pointerdown', onDown);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('pointerdown', onDown);
    };
  }, [panel]);
  const hoverPanel = (show: boolean) => {
    window.clearTimeout(panelTimer.current);
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    panelTimer.current = window.setTimeout(() => setPanel(show), show ? 60 : 160);
  };

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
            {NAV.map((item) =>
              item.to === '/services' ? (
                <li
                  key={item.to}
                  className="ds-nav-has-menu"
                  data-open={panel}
                  onMouseEnter={() => hoverPanel(true)}
                  onMouseLeave={() => hoverPanel(false)}
                >
                  <NavLink to={item.to} className="ds-nav-link">
                    {item.label}
                  </NavLink>
                  <button
                    type="button"
                    className="ds-nav-caret"
                    aria-label="Show services and industries"
                    aria-expanded={panel}
                    aria-controls="nav-services"
                    onClick={() => setPanel((p) => !p)}
                  >
                    <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
                      <path d="M2 3.5 5 6.5 8 3.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  <div id="nav-services" className="ds-nav-panel" hidden={!panel}>
                    {/* First, with room around it (owner, 2026-10-10). */}
                    <Link to="/services" className="ds-link ds-nav-panel-all">
                      All services and how a post starts
                      <Arrow size={14} />
                    </Link>
                    <div>
                      <p className="ds-nav-panel-h">Services</p>
                      <ul>
                        {SERVICES_MENU.services.map((l) => (
                          <li key={l.to}><Link to={l.to}>{l.label}</Link></li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="ds-nav-panel-h">Industries</p>
                      <ul>
                        {SERVICES_MENU.industries.map((l) => (
                          <li key={l.to}><Link to={l.to}>{l.label}</Link></li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </li>
              ) : (
                <li key={item.to}>
                  <NavLink to={item.to} end={item.end} className="ds-nav-link">
                    {item.label}
                  </NavLink>
                </li>
              ),
            )}
          </ul>
        </nav>

        <div className="ds-header-actions">
          <a href="tel:+17196963966" className="ds-header-call" aria-label="Call 719-696-3966">
            <PhoneIcon />
          </a>
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
