import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation, useSearchParams } from 'react-router-dom';
import Arrow from './Arrow';
import PhoneIcon from './PhoneIcon';
import { ROLE_PAGES } from './market/roles';
import { INDUSTRY_PAGES } from './market/industries';
import { PDF_URL } from './capability/data';
import { responsive } from '../lib/responsive';

// The panel nav (owner, 2026-10-13; from a 21st.dev "navbar2" the owner picked, rebuilt for this
// site: Vite and React Router instead of Next.js, CSS instead of motion, the site's own thin
// icons instead of icon sets, 2px and 4px corners instead of pills, and our pages instead of the
// demo's). A floating dark-glass card at the top of every page. Services, Industries, and Company
// open a menu inside the card (it grows downward): columns of large links, a short row of
// footer links, and a real photo with a caption. Phones: the card opens into a list with the same
// three menus as accordions, then the phone, email, and button.
// The previous nav stays at ?nav=classic for comparison (the choice sticks for the session).

type MenuLink = { label: string; to: string; external?: boolean };
type Menu = {
  columns: { label?: string; links: MenuLink[] }[];
  footer?: MenuLink[];
  profiles?: boolean;
  /** `position` and `zoom` frame the photo in its slot (default 50% 75%, no zoom). */
  image: { src: string; caption: string; position?: string; zoom?: number; origin?: string };
  /** Footer links are the menu's overview links: drawn with more weight (owner, 2026-10-13). */
  strongFoot?: boolean;
  /** Phones: overview links above a divider at the top of the accordion. */
  phoneTop?: MenuLink[];
};

const roles = ROLE_PAGES.map((r) => ({ label: r.name, to: `/services/${r.slug}` }));
const industries = INDUSTRY_PAGES.map((i) => ({ label: i.name, to: `/industries/${i.slug}` }));

const MENUS: Record<string, Menu> = {
  Services: {
    columns: [
      { label: 'By role', links: roles.slice(0, 3) },
      { links: roles.slice(3) },
    ],
    footer: [
      { label: 'All services and how a post starts', to: '/services' },
      { label: 'Teaming and subcontracting', to: '/teaming' },
    ],
    // The cars just below center (owner, 2026-10-13).
    image: { src: '/images/mission-vehicle.jpg', caption: 'Ares patrol vehicles', position: '50% 90%' },
    strongFoot: true,
    phoneTop: [
      { label: 'All services and how a post starts', to: '/services' },
      { label: 'Teaming and subcontracting', to: '/teaming' },
    ],
  },
  Industries: {
    columns: [
      { label: 'Who we protect', links: industries.slice(0, 3) },
      { links: industries.slice(3) },
    ],
    // The overview link, as on phones (owner, 2026-10-13; was the city pages).
    footer: [{ label: 'All industries and how a post starts', to: '/services' }],
    // Closer, toward the radomes on the left (owner, 2026-10-13: 1.6x, was 1.25x).
    image: { src: '/images/market/government-military.webp', caption: 'A Space Force base in Colorado', position: '18% 60%', zoom: 1.6, origin: '18% 60%' },
    strongFoot: true,
    // The industries live on the Services page too (owner, 2026-10-13).
    phoneTop: [{ label: 'All industries and how a post starts', to: '/services' }],
  },
  Company: {
    columns: [
      {
        label: 'Ares',
        links: [
          { label: 'About', to: '/about' },
          { label: 'Careers', to: '/careers' },
          { label: 'Insights', to: '/insights' },
        ],
      },
      {
        label: 'Contracting',
        links: [
          { label: 'Capability Statement', to: '/capability-statement' },
          { label: 'Teaming', to: '/teaming' },
          { label: 'Request a Quote', to: '/contact' },
        ],
      },
    ],
    footer: [
      { label: 'Colorado Springs', to: '/locations/colorado-springs' },
      { label: 'Denver', to: '/locations/denver' },
      { label: 'Pueblo', to: '/locations/pueblo' },
    ],
    profiles: true,
    image: { src: '/images/about-hero.jpg', caption: 'Pikes Peak, Colorado Springs' },
  },
};

const PROFILES = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/aressecurity' },
  { label: 'Google', href: 'https://www.google.com/maps/search/?api=1&query=Ares+Security+LLC+Colorado+Springs' },
  { label: 'Indeed', href: 'https://www.indeed.com/cmp/Ares-Security-1' },
];

const ITEMS: { label: string; menu?: string; to?: string }[] = [
  { label: 'Services', menu: 'Services' },
  { label: 'Industries', menu: 'Industries' },
  { label: 'Company', menu: 'Company' },
  { label: 'Capability Statement', to: '/capability-statement' },
];

/** Which nav shows: the panel stretched edge to edge (default since 2026-10-13, owner), the
 *  floating card (?nav=float), or the previous bar (?nav=classic). Sticks for the session. */
export type NavLayout = 'full' | 'float' | 'classic';
export function useNavLayout(): NavLayout {
  const [params] = useSearchParams();
  const asked = params.get('nav');
  let form: string | null = asked;
  try {
    if (asked) sessionStorage.setItem('ares-nav', asked);
    else form = sessionStorage.getItem('ares-nav');
  } catch {
    // Storage blocked: the URL alone decides.
  }
  return form === 'classic' || form === 'float' ? form : 'full';
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg className="ds-np-chev" data-open={open || undefined} width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
      <path d="M2 3.5 5 6.5 8 3.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MenuBody({ menu }: { menu: Menu }) {
  return (
    <div className="ds-np-menu">
      {menu.columns.map((col, i) => (
        <div key={i} className="ds-np-col">
          <p className="ds-np-label" aria-hidden={!col.label}>{col.label ?? ' '}</p>
          <ul>
            {col.links.map((l) => (
              <li key={l.to + l.label}>
                <NavLink to={l.to} className="ds-np-big" end>
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      ))}
      <figure className="ds-np-photo">
        <span className="ds-np-photo-frame">
          <img
            {...responsive(menu.image.src, '288px')}
            alt=""
            decoding="async"
            style={{ objectPosition: menu.image.position, scale: menu.image.zoom ? String(menu.image.zoom) : undefined, transformOrigin: menu.image.origin }}
          />
        </span>
        <figcaption className="ds-caption">{menu.image.caption}</figcaption>
      </figure>
      {(menu.footer || menu.profiles) && (
        <div className="ds-np-foot" data-strong={menu.strongFoot || undefined}>
          {menu.footer?.map((l) => (
            <Link key={l.to + l.label} to={l.to} className="ds-link">
              {l.label}
              <Arrow size={12} />
            </Link>
          ))}
          {menu.profiles && (
            <span className="ds-np-profiles">
              {PROFILES.map((p) => (
                <a key={p.label} href={p.href} target="_blank" rel="noopener noreferrer" className="ds-link">
                  {p.label}
                  <Arrow external size={11} />
                </a>
              ))}
            </span>
          )}
        </div>
      )}
    </div>
  );
}

export default function NavPanel({ layout = 'full' }: { layout?: 'full' | 'float' }) {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileMenu, setMobileMenu] = useState<string | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  // Desktop (owner, 2026-10-13): the menus open on hover. A short delay before opening keeps a
  // pointer crossing the bar from flashing a menu; moving between items swaps at once; leaving
  // the card closes almost at once (the panel is part of the card, so no travel gap to bridge). Click still
  // toggles, for keyboards and touch.
  const hoverTimer = useRef(0);
  const canHover = () => window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const hoverTo = (menu: string | null, delay: number) => {
    if (!canHover()) return;
    window.clearTimeout(hoverTimer.current);
    hoverTimer.current = window.setTimeout(() => setOpenMenu(menu), delay);
  };
  useEffect(() => () => window.clearTimeout(hoverTimer.current), []);
  const { pathname } = useLocation();
  // The button names the next step for the page (design review, owner 2026-10-13).
  const cta =
    pathname === '/teaming' || pathname === '/capability-statement'
      ? { label: 'Talk teaming', to: '/contact?service=teaming' }
      : pathname === '/careers' || pathname.startsWith('/careers/')
        ? { label: 'Apply', to: '/careers#apply' }
        : { label: 'Request a Quote', to: '/contact' };

  // Everything closes on a page change, on Escape, and on a click outside the card.
  useEffect(() => {
    setOpenMenu(null);
    setMobileOpen(false);
    setMobileMenu(null);
  }, [pathname]);
  useEffect(() => {
    const close = () => {
      setOpenMenu(null);
      setMobileOpen(false);
    };
    window.addEventListener('ares:close-menu', close);
    return () => window.removeEventListener('ares:close-menu', close);
  }, []);
  useEffect(() => {
    if (!openMenu && !mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      setOpenMenu(null);
      setMobileOpen(false);
    };
    const onDown = (e: PointerEvent) => {
      if (cardRef.current && !cardRef.current.contains(e.target as Node)) {
        setOpenMenu(null);
        setMobileOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    window.addEventListener('pointerdown', onDown);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('pointerdown', onDown);
    };
  }, [openMenu, mobileOpen]);
  // Phones (owner, 2026-10-13): closing the list resets it, so it always opens with every
  // section folded. The reset waits for the close to finish so nothing jumps while it folds.
  useEffect(() => {
    if (mobileOpen) return;
    const t = window.setTimeout(() => setMobileMenu(null), 320);
    return () => window.clearTimeout(t);
  }, [mobileOpen]);
  // Phones: the page holds still while the list is open.
  useEffect(() => {
    if (!mobileOpen) return;
    const html = document.documentElement;
    const prev = html.style.overflow;
    html.style.overflow = 'hidden';
    return () => {
      html.style.overflow = prev;
    };
  }, [mobileOpen]);

  // Once the reader reaches the page's sections (the running head's signal, also kept up to date
  // on desktop where the rail shows instead; owner, 2026-10-13), the
  // divider and the ARES SECURITY wordmark are drawn into the mark, leaving the mark alone; they
  // slide back out when it leaves. Pages without a running head use a scroll depth instead.
  const [compact, setCompact] = useState(false);
  useEffect(() => {
    setCompact(false);
    let mo: MutationObserver | null = null;
    let onScroll: (() => void) | null = null;
    const frame = requestAnimationFrame(() => {
      const head = document.querySelector<HTMLElement>('.ds-runhead');
      if (head) {
        const sync = () => setCompact(head.dataset.visible === 'true');
        sync();
        mo = new MutationObserver(sync);
        mo.observe(head, { attributes: true, attributeFilter: ['data-visible'] });
      } else {
        onScroll = () => setCompact(window.scrollY > window.innerHeight * 0.8);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
      }
    });
    return () => {
      cancelAnimationFrame(frame);
      mo?.disconnect();
      if (onScroll) window.removeEventListener('scroll', onScroll);
    };
  }, [pathname]);

  // Fetch the three menu photos once the page has settled, so a menu never opens on a blank
  // frame (they are small: the 288px-wide file of each).
  useEffect(() => {
    const t = window.setTimeout(() => {
      for (const m of Object.values(MENUS)) {
        const r = responsive(m.image.src, '288px');
        const img = new Image();
        if (r.srcSet) img.srcset = r.srcSet;
        img.sizes = '288px';
        img.src = r.src;
      }
    }, 1200);
    return () => window.clearTimeout(t);
  }, []);

  // The menu that was last open stays rendered while the card closes, so it shrinks with content.
  const [shownMenu, setShownMenu] = useState<string | null>(null);
  useEffect(() => {
    if (openMenu) setShownMenu(openMenu);
  }, [openMenu]);

  const isOpen = Boolean(openMenu) || mobileOpen;

  return (
    <>
      <a href="#main" className="ds ds-skip">Skip to content</a>
      <header className="ds ds-np" data-site-header data-open={isOpen} data-layout={layout} data-compact={(compact && !isOpen) || undefined}>
        <div
          ref={cardRef}
          className="ds-np-card"
          onMouseLeave={() => hoverTo(null, 40)}
          onMouseEnter={() => window.clearTimeout(hoverTimer.current)}
        >
          <div className="ds-np-row">
            <Link to="/" className="ds-np-brand" aria-label="Ares Security home">
              <span className="ds-mark" aria-hidden="true" />
              <span className="ds-np-divider" aria-hidden="true" />
              <span className="ds-np-wordmark" aria-hidden="true" />
            </Link>

            <nav className="ds-np-nav" aria-label="Primary">
              {ITEMS.map((item) =>
                item.menu ? (
                  <button
                    key={item.label}
                    type="button"
                    className="ds-np-item"
                    aria-expanded={openMenu === item.menu}
                    aria-controls="np-menu"
                    data-active={openMenu === item.menu || undefined}
                    onClick={() => {
                      window.clearTimeout(hoverTimer.current);
                      // With a mouse the hover already opened it, so a click keeps it open;
                      // keyboards and touch toggle.
                      setOpenMenu((m) => (m === item.menu && !canHover() ? null : item.menu!));
                    }}
                    onMouseEnter={() => hoverTo(item.menu!, openMenu ? 0 : 90)}
                  >
                    {item.label}
                    <Chevron open={openMenu === item.menu} />
                  </button>
                ) : (
                  <NavLink
                    key={item.label}
                    to={item.to!}
                    className="ds-np-item"
                    onClick={() => setOpenMenu(null)}
                    onMouseEnter={() => hoverTo(null, 120)}
                  >
                    {item.label}
                  </NavLink>
                ),
              )}
            </nav>

            <div className="ds-np-actions">
              <Link to={cta.to} className="ds-btn ds-btn-primary ds-np-cta">
                {cta.label}
                <Arrow size={14} />
              </Link>
              <a href="tel:+17196963966" className="ds-np-phone" aria-label="Call 719-696-3966">
                <PhoneIcon />
              </a>
              <button
                type="button"
                className="ds-np-burger"
                aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={mobileOpen}
                aria-controls="np-mobile"
                onClick={() => setMobileOpen((o) => !o)}
                data-open={mobileOpen || undefined}
              >
                <span aria-hidden="true" />
                <span aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* Desktop: the open menu grows the card downward (grid rows 0fr to 1fr). */}
          <div id="np-menu" className="ds-np-drop" data-open={Boolean(openMenu) || undefined} {...(openMenu ? {} : { inert: '' })}>
            <div className="ds-np-drop-inner">
              {shownMenu && <MenuBody key={shownMenu} menu={MENUS[shownMenu]} />}
            </div>
          </div>

          {/* Phones: the list, with the three menus as accordions. */}
          <div id="np-mobile" className="ds-np-mobile" data-open={mobileOpen || undefined} {...(mobileOpen ? {} : { inert: '' })}>
            <div className="ds-np-drop-inner">
              <ul className="ds-np-mlist">
                {ITEMS.map((item) =>
                  item.menu ? (
                    <li key={item.label}>
                      <button
                        type="button"
                        className="ds-np-mitem"
                        aria-expanded={mobileMenu === item.menu}
                        onClick={() => setMobileMenu((m) => (m === item.menu ? null : item.menu!))}
                      >
                        {item.label}
                        <Chevron open={mobileMenu === item.menu} />
                      </button>
                      <div className="ds-np-acc" data-open={mobileMenu === item.menu || undefined}>
                        <div className="ds-np-drop-inner">
                          {/* Phones (owner, 2026-10-13): Services and Industries open on their
                              overview links, then a divider, then the six; Company shows its links
                              only (no city links). */}
                          <ul className="ds-np-sub">
                            {MENUS[item.menu].phoneTop && (
                              <>
                                {MENUS[item.menu].phoneTop!.map((l) => (
                                  <li key={'f' + l.to}>
                                    <Link to={l.to} className="ds-np-sub-more">
                                      {l.label}
                                      <Arrow size={12} />
                                    </Link>
                                  </li>
                                ))}
                                <li className="ds-np-sub-rule" aria-hidden="true" />
                              </>
                            )}
                            {MENUS[item.menu].columns.flatMap((c) => c.links).map((l) => (
                              <li key={l.to + l.label}>
                                <Link to={l.to}>{l.label}</Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </li>
                  ) : (
                    <li key={item.label}>
                      <Link to={item.to!} className="ds-np-mitem">
                        {item.label}
                        <Arrow size={14} />
                      </Link>
                    </li>
                  ),
                )}
              </ul>
              <div className="ds-np-mcontact">
                <a href="tel:+17196963966" className="ds-data">719-696-3966</a>
                <a href="mailto:contact@aressecurity.co" className="ds-data">contact@aressecurity.co</a>
              </div>
              <div className="ds-np-mbtns">
                <Link to={cta.to} className="ds-btn ds-btn-primary">
                  {cta.label}
                  <Arrow />
                </Link>
                <a href={PDF_URL} className="ds-np-secondary" target="_blank" rel="noopener noreferrer">
                  Capability Statement (PDF)
                  <Arrow external size={12} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
