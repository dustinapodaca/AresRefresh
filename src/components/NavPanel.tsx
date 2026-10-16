import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation, useSearchParams } from 'react-router-dom';
import Arrow from './Arrow';
import PhoneIcon from './PhoneIcon';
import { ROLE_PAGES, capabilityFor } from './market/roles';
import { INDUSTRY_PAGES } from './market/industries';
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
  /** Desktop: the menu's overview links, in a row above the columns (owner, 2026-10-15; they were
   *  the footer). Bold white, a little smaller than the menu links, with a down-right arrow. */
  top?: MenuLink[];
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
    top: [
      { label: 'All services and how a post starts', to: '/services' },
      { label: 'Teaming and subcontracting', to: '/teaming' },
    ],
    // The cars just below center (owner, 2026-10-13).
    image: { src: '/images/mission-vehicle.jpg', caption: 'Ares patrol vehicles', position: '50% 90%' },
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
    top: [{ label: 'All industries and how a post starts', to: '/services' }],
    // Closer, toward the radomes on the left (owner, 2026-10-13: 1.6x, was 1.25x).
    image: { src: '/images/market/government-military.webp', caption: 'A Space Force base in Colorado', position: '18% 60%', zoom: 1.6, origin: '18% 60%' },
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

// The three profiles as small monochrome marks for the phone menu (owner, 2026-10-13).
const PROFILE_ICONS: Record<string, JSX.Element> = {
  LinkedIn: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.95v5.66H9.36V9h3.41v1.56h.05c.47-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0Z" />
    </svg>
  ),
  Google: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M21.6 12.23c0-.74-.06-1.46-.18-2.15H12v4.07h5.39a4.6 4.6 0 0 1-2 3.02v2.5h3.23c1.89-1.74 2.98-4.3 2.98-7.44Z" />
      <path d="M12 22c2.7 0 4.96-.9 6.62-2.43l-3.23-2.5c-.9.6-2.05.95-3.39.95-2.6 0-4.81-1.76-5.6-4.12H3.06v2.58A10 10 0 0 0 12 22Z" />
      <path d="M6.4 13.9a6 6 0 0 1 0-3.8V7.52H3.06a10 10 0 0 0 0 8.96l3.34-2.58Z" />
      <path d="M12 6c1.47 0 2.78.5 3.82 1.5l2.86-2.87C16.95 3.05 14.7 2.13 12 2.13a10 10 0 0 0-8.94 5.4L6.4 10.1C7.19 7.74 9.4 6 12 6Z" />
    </svg>
  ),
  Indeed: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4.5 10.2C7.3 5.2 13.4 2.6 19.4 4" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
      <circle cx="12.6" cy="10.6" r="2.7" fill="currentColor" />
      <rect x="10.6" y="14.6" width="4" height="7.4" rx="2" fill="currentColor" />
    </svg>
  ),
};

// The menu toggle (owner, 2026-10-15; was a caret): a + whose upright stroke turns flat into a -
// when the menu opens.
function Chevron({ open }: { open: boolean }) {
  return (
    <svg className="ds-np-chev" data-open={open || undefined} width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
      <path d="M1.5 5h7" />
      <path className="ds-np-chev-v" d="M5 1.5v7" />
    </svg>
  );
}

// The overview links' arrow: the site's arrow, pointing down and to the right.
function ArrowDownRight() {
  return (
    <svg className="ds-np-over-arrow" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 5 11 11M11 6v5H6" />
    </svg>
  );
}

function MenuBody({ menu }: { menu: Menu }) {
  return (
    <div className="ds-np-menu">
      {menu.top && (
        <div className="ds-np-top">
          {menu.top.map((l) => (
            <Link key={l.to + l.label} to={l.to} className="ds-np-over">
              {l.label}
              <ArrowDownRight />
            </Link>
          ))}
        </div>
      )}
      {menu.columns.map((col, i) => (
        <div key={i} className="ds-np-col">
          <p className="ds-np-label" aria-hidden={!col.label}>{col.label ?? ' '}</p>
          <ul>
            {col.links.map((l) => (
              <li key={l.to + l.label}>
                <NavLink to={l.to} className="ds-np-big" end>
                  {/* On hover the words slide right and this arrow comes in on their left. Only
                      the inner span moves, so the link's hover area holds still under the pointer. */}
                  <span className="ds-np-big-in">
                    <span className="ds-np-big-arrow" aria-hidden="true">
                      <Arrow size={16} />
                    </span>
                    {l.label}
                  </span>
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
        <div className="ds-np-foot">
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

// The phone menu's photos (owner, 2026-10-15, after gigaenergy.com's phone menu): a real Ares
// photo beside each service, and the industry pages' own photos on the swipe cards.
const SERVICE_PHOTOS: Record<string, { src: string; position?: string }> = {
  armed: { src: '/images/careers-team.jpg', position: '55% 40%' },
  unarmed: { src: '/images/officer-portrait.jpg', position: '50% 30%' },
  access: { src: '/images/backbone-officer.jpg', position: '40% 30%' },
  escort: { src: '/images/market/government-military.webp', position: '30% 60%' },
  relief: { src: '/images/careers-philosophy.jpg', position: '50% 55%' },
  vehicle: { src: '/images/mission-vehicle.jpg', position: '55% 80%' },
};

// Phones: Services as a list with a photo beside each, Industries as a row of photo cards that
// swipes sideways (owner, 2026-10-15). The earlier plain lists stay at ?mnav=list.
function PhoneServices() {
  return (
    <ul className="ds-np-svc">
      {ROLE_PAGES.map((r) => {
        const ph = SERVICE_PHOTOS[r.capabilityId];
        return (
          <li key={r.slug}>
            <Link to={`/services/${r.slug}`}>
              <span className="ds-np-thumb">
                {ph && <img {...responsive(ph.src, '56px')} alt="" loading="lazy" decoding="async" style={{ objectPosition: ph.position }} />}
              </span>
              <span className="ds-np-svc-text">
                <b>{r.name}</b>
                <small className="ds-data">{capabilityFor(r).keys.join(' · ')}</small>
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

function PhoneIndustries() {
  return (
    <div className="ds-np-swipe" role="list" aria-label="Industries">
      {INDUSTRY_PAGES.map((i) => (
        <Link key={i.slug} to={`/industries/${i.slug}`} className="ds-np-ind" role="listitem">
          <span className="ds-np-ind-photo">
            <img {...responsive(i.image.src, '72vw')} alt="" loading="lazy" decoding="async" style={{ objectPosition: (i.image as { position?: string }).position }} />
          </span>
          <b>{i.name}</b>
          <small>{i.short}</small>
        </Link>
      ))}
    </div>
  );
}

// The phone menu's pages (owner, 2026-10-15, after yucca.co.za): the main page lists the sections,
// each with an arrow; tapping one slides the list away to the left as its page slides in from the
// right, with a back button. Services and Industries keep their photos (the photo list and the
// swipe row); Company is four photo tiles (owner, 2026-10-15). Teaming and Request a Quote aren't
// repeated there on phones: Teaming is on the Services page and the quote button is always pinned
// at the foot of the menu.
const COMPANY_TILES = [
  { label: 'About Ares', to: '/about', src: '/images/about-hero.jpg', position: '50% 62%' },
  // The two officers, backs to the camera, from the Home page's careers band (owner, 2026-10-15).
  { label: 'Careers', to: '/careers', src: '/images/about-security.jpg', position: '50% 40%' },
  { label: 'Capability Statement', to: '/capability-statement', src: '/images/services-hero/denver-sunset.webp', position: '50% 55%' },
  // The owner's LinkedIn banner (2026-10-15).
  { label: 'Insights', to: '/insights', src: '/images/nav/insights.png', position: '50% 50%' },
];

function ArrowBack() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M13.5 8h-11M7 3.5 2.5 8 7 12.5" />
    </svg>
  );
}

function Overview({ links }: { links?: MenuLink[] }) {
  if (!links) return null;
  return (
    <ul className="ds-np-overview">
      {links.map((l) => (
        <li key={l.to + l.label}>
          <Link to={l.to} className="ds-np-sub-more">
            {l.label}
            <Arrow size={12} />
          </Link>
        </li>
      ))}
    </ul>
  );
}

function CompanyPane() {
  return (
    <>
      <ul className="ds-np-tiles">
        {COMPANY_TILES.map((t) => (
          <li key={t.to}>
            <Link to={t.to} className="ds-np-tile">
              <img {...responsive(t.src, '100vw')} alt="" loading="lazy" decoding="async" style={{ objectPosition: t.position }} />
              <span>{t.label}</span>
              <Arrow size={18} />
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

function SlideMenu({
  panel,
  setPanel,
  backRef,
}: {
  panel: string | null;
  setPanel: (p: string | null) => void;
  backRef: React.RefObject<HTMLButtonElement>;
}) {
  const stageRef = useRef<HTMLDivElement>(null);
  // A page that slides in starts at its top, with the focus on its back button.
  useEffect(() => {
    const card = stageRef.current?.closest('.ds-np-card');
    if (card) card.scrollTop = 0;
    if (panel) backRef.current?.focus({ preventScroll: true });
  }, [panel, backRef]);
  const pages: { m: string; body: JSX.Element }[] = [
    { m: 'Services', body: <><Overview links={MENUS.Services.phoneTop} /><PhoneServices /></> },
    { m: 'Industries', body: <><Overview links={MENUS.Industries.phoneTop} /><PhoneIndustries /></> },
    { m: 'Company', body: <CompanyPane /> },
  ];
  return (
    <div ref={stageRef} className="ds-np-stage" data-panel={panel || undefined}>
      <div className="ds-np-pane ds-np-pane-main" {...(panel ? { inert: '' } : {})}>
        <ul className="ds-np-mlist ds-np-mlist-slide">
          {ITEMS.map((item) => (
            <li key={item.label}>
              {item.menu ? (
                <button type="button" className="ds-np-mitem" onClick={() => setPanel(item.menu!)}>
                  {item.label}
                  <Arrow size={18} />
                </button>
              ) : (
                <Link to={item.to!} className="ds-np-mitem">
                  {item.label}
                  <Arrow size={18} />
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
      {pages.map(({ m, body }) => (
        <div key={m} className="ds-np-pane ds-np-pane-sub" data-on={panel === m || undefined} {...(panel === m ? {} : { inert: '' })}>
          {/* Back on the left, the section's name on the right, in one bar (owner, 2026-10-15). */}
          <div className="ds-np-backbar">
            <button ref={panel === m ? backRef : undefined} type="button" className="ds-np-back" onClick={() => setPanel(null)}>
              <ArrowBack />
              Back
            </button>
            <p className="ds-np-pane-title">{m}</p>
          </div>
          {body}
        </div>
      ))}
    </div>
  );
}

export default function NavPanel({ layout = 'full' }: { layout?: 'full' | 'float' }) {
  const [navParams] = useSearchParams();
  // The phone menu (owner, 2026-10-15): pages that slide over (after yucca.co.za), the default;
  // the photo accordions at ?mnav=accordion; the plain lists at ?mnav=list.
  const mnav = navParams.get('mnav');
  const phoneMode: 'slide' | 'accordion' | 'list' = mnav === 'accordion' || mnav === 'list' ? mnav : 'slide';
  const richPhone = phoneMode !== 'list';
  const backRef = useRef<HTMLButtonElement>(null);
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
      {/* Desktop (owner, 2026-10-15): while a menu is open, a light glass softly mutes the whole
          page under the nav, fading in and out with the menu. Clicks pass through it. */}
      <div className="ds-np-scrim" data-open={Boolean(openMenu) || undefined} aria-hidden="true" />
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
                {/* Three bars that slide off to the right, then an X that draws in (owner,
                    2026-10-15, after yucca.co.za); the reverse on close. */}
                <span className="ds-np-bars" aria-hidden="true">
                  <i />
                  <i />
                  <i />
                </span>
                <span className="ds-np-x" aria-hidden="true">
                  <i />
                  <i />
                </span>
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
              {phoneMode === 'slide' ? (
                <SlideMenu panel={mobileMenu} setPanel={setMobileMenu} backRef={backRef} />
              ) : (
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
                            {richPhone && item.menu === 'Services' ? (
                              <li className="ds-np-sub-wide">
                                <PhoneServices />
                              </li>
                            ) : richPhone && item.menu === 'Industries' ? (
                              <li className="ds-np-sub-wide">
                                <PhoneIndustries />
                              </li>
                            ) : (
                              MENUS[item.menu].columns.flatMap((c) => c.links).map((l) => (
                                <li key={l.to + l.label}>
                                  <Link to={l.to}>{l.label}</Link>
                                </li>
                              ))
                            )}
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
              )}
              {/* Phones (owner, 2026-10-13): pinned to the bottom of the open menu, so it stays on
                  screen while the list scrolls: the phone and the profiles, the email, then the main
                  button. (The PDF button was dropped from the phone menu.) */}
              <div className="ds-np-mbtns">
                <div className="ds-np-mcontact">
                  <div className="ds-np-mcontact-row">
                    <a href="tel:+17196963966" className="ds-data">719-696-3966</a>
                    <span className="ds-np-micons">
                      {PROFILES.map((p) => (
                        <a key={p.label} href={p.href} target="_blank" rel="noopener noreferrer" aria-label={`Ares Security on ${p.label}`}>
                          {PROFILE_ICONS[p.label]}
                        </a>
                      ))}
                    </span>
                  </div>
                  <a href="mailto:contact@aressecurity.co" className="ds-data">contact@aressecurity.co</a>
                </div>
                <Link to={cta.to} className="ds-btn ds-btn-primary">
                  {cta.label}
                  <Arrow />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
