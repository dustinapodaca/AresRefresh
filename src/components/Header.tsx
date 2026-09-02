import { useEffect, useRef, useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';

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
  // Picks the chrome's transition mode:
  //   true  → clip-path slide (drawer open/close at top, route change)
  //   false → opacity fade (scroll engagement, default)
  // Set by triggerSlide() and reset by scroll-driven changes.
  const [useSlide, setUseSlide] = useState(false);
  const { pathname } = useLocation();

  // Lock window — when set, swallows any scroll-driven attempt to flip
  // useSlide back to false. Needed because ScrollToTop on route change
  // fires a synthetic scroll right after triggerSlide() — without this
  // guard, that scroll would pre-empt the slide we just queued.
  const slideLockedUntilRef = useRef(0);
  const triggerSlide = () => {
    // Desktop (lg+) doesn't have a drawer and doesn't dock content
    // into the chrome the way mobile does, so a slide motion on route
    // change reads as too dramatic for a hover-driven nav. Skip the
    // slide entirely on lg+ — useSlide stays false, the chrome
    // continues to fade in/out with scroll only. Mobile keeps the
    // slide behavior we landed on (drawer open/close + route change).
    if (typeof window !== 'undefined'
      && window.matchMedia('(min-width: 1024px)').matches) return;
    slideLockedUntilRef.current = Date.now() + 500;
    setUseSlide(true);
  };

  // Route change → next chrome change uses slide. Skip the first render
  // so landing directly on a deep route doesn't queue an animation
  // against an already-correct initial state.
  const isFirstMount = useRef(true);
  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }
    triggerSlide();
  }, [pathname]);

  useEffect(() => {
    const SCROLL_THRESHOLD = 20;
    const onScroll = () => {
      const next = window.scrollY > SCROLL_THRESHOLD;
      setScrolled((prev) => {
        if (prev !== next && Date.now() > slideLockedUntilRef.current) {
          setUseSlide(false);
        }
        return next;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock background scrolling while the mobile drawer is open. Need to
  // pin BOTH html and body — setting overflow:hidden on body alone isn't
  // enough because our global CSS already puts overflow-x: hidden on html,
  // which leaves vertical scrolling owned by the html element. Saving and
  // restoring the previous inline values so we don't stomp anyone else's.
  useEffect(() => {
    if (!open) return;
    const html = document.documentElement;
    const body = document.body;
    const prevHtml = html.style.overflow;
    const prevBody = body.style.overflow;
    html.style.overflow = 'hidden';
    body.style.overflow = 'hidden';
    return () => {
      html.style.overflow = prevHtml;
      body.style.overflow = prevBody;
    };
  }, [open]);

  // Glass is engaged whenever the user has scrolled OR the mobile drawer
  // is open. The transition between hidden ↔ visible switches based on
  // useSlide:
  //   - useSlide=true  → clip-path slide (rises from / retracts to the
  //     bottom edge). Used for drawer toggles and route changes.
  //   - useSlide=false → opacity fade. Used for scroll engagement.
  // Opacity follows along in slide mode: snap-on when becoming visible
  // (so the slide-up reveal reads) and snap-off only after the slide
  // completes (so the slide-down reads through to the end).
  const glassActive = scrolled || open;

  return (
    <header className="fixed inset-x-0 top-0 z-50 text-paper">
      <div
        aria-hidden
        style={{
          opacity: glassActive ? 1 : 0,
          clipPath: glassActive ? 'inset(0 0 0 0)' : 'inset(100% 0 0 0)',
          WebkitClipPath: glassActive ? 'inset(0 0 0 0)' : 'inset(100% 0 0 0)',
          transition: useSlide
            ? `clip-path 400ms cubic-bezier(0.22, 1, 0.36, 1), -webkit-clip-path 400ms cubic-bezier(0.22, 1, 0.36, 1), opacity 0ms ${glassActive ? '0ms' : '400ms'}`
            : `opacity 300ms ease-out, clip-path 0ms ${glassActive ? '0ms' : '300ms'}, -webkit-clip-path 0ms ${glassActive ? '0ms' : '300ms'}`,
        }}
        className="pointer-events-none absolute inset-0 -z-10 border-b border-white/10 bg-ink/55 backdrop-blur-2xl backdrop-saturate-150"
      />
      <div className="container-ares">
        <div className="flex items-center justify-between gap-6 py-5 lg:grid lg:grid-cols-[1fr_auto_1fr]">
          {/* Brand — logo mark only, larger, white. Closes the mobile drawer
              when tapped (parity with the nav links' onClick handlers). If
              we're already on the home route, scroll to the top — otherwise
              React Router treats the click as a no-op and nothing happens
              visually. */}
          <Link
            to="/"
            onClick={() => {
              triggerSlide();
              setOpen(false);
              if (pathname === '/') {
                window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
              }
            }}
            aria-label="Ares Security home"
            className="flex items-center text-paper"
          >
            <span
              className="block"
              style={{
                width: 52,
                height: 52,
                backgroundColor: '#fafaf9',
                WebkitMask: 'url(/ares-logo.svg) no-repeat center / 100% 100%',
                mask: 'url(/ares-logo.svg) no-repeat center / 100% 100%',
              }}
            />
          </Link>

          <nav className="hidden lg:block">
            <ul className="flex justify-center gap-9">
              {NAV.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.end}
                    className={({ isActive }) =>
                      `relative inline-block py-1.5 text-[13px] font-semibold uppercase tracking-[0.14em] text-paper ` +
                      `after:absolute after:bottom-0 after:left-0 after:h-[1.5px] after:bg-paper after:transition-[right] after:duration-300 ` +
                      (isActive ? 'after:right-0' : 'after:right-full hover:after:right-0')
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center justify-end gap-4">
            {/* Request a Quote — solid white with dark text (desktop only) */}
            <Link
              to="/contact"
              className="hidden items-center rounded-full border-[1.5px] border-paper bg-paper px-5 py-3 text-[12px] font-semibold uppercase tracking-[0.06em] text-ink transition-colors hover:bg-transparent hover:text-paper lg:inline-flex"
            >
              Request a Quote
            </Link>

            {/* Hamburger — just three lines, no circle, morphs into X. */}
            <button
              type="button"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              className="relative ml-1 flex h-11 w-11 items-center justify-center text-paper transition-opacity hover:opacity-75 lg:hidden"
              onClick={() => {
                triggerSlide();
                setOpen((o) => !o);
              }}
            >
              {/* The top/bottom lines change BOTH a position (top/bottom) AND
                  a transform on toggle. Using `transition-all` so position
                  and rotate tween together — `transition-transform` alone
                  left the position change as an instant jump, which made
                  the close animation look broken. Defined `rotate-0` /
                  `translate-y-0` on the closed branch so each transition
                  has explicit endpoints in both directions. */}
              <span className="relative block h-4 w-6">
                <span className={`absolute left-0 right-0 h-[2px] bg-current transition-all duration-300 ease-[cubic-bezier(0.45,0,0.55,1)] ${open ? 'top-1/2 -translate-y-1/2 rotate-45' : 'top-0 translate-y-0 rotate-0'}`} />
                <span className={`absolute left-0 right-0 top-1/2 h-[2px] -translate-y-1/2 bg-current transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.45,0,0.55,1)] ${open ? 'scale-x-0 opacity-0' : 'scale-x-100 opacity-100'}`} />
                <span className={`absolute left-0 right-0 h-[2px] bg-current transition-all duration-300 ease-[cubic-bezier(0.45,0,0.55,1)] ${open ? 'top-1/2 -translate-y-1/2 -rotate-45' : 'bottom-0 translate-y-0 rotate-0'}`} />
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer — UNFOLDS from inside the nav bar.
          The panel sits in its final spot just below the header and uses
          clip-path to mask itself. Closed = clipped flat into the nav;
          open = clip retracts to reveal the menu emerging from the bar.
          Background matches the scrolled nav fog-glass so it reads as
          the same continuous surface. */}
      <nav
        aria-hidden={!open}
        style={{
          clipPath: open ? 'inset(0 0 0 0)' : 'inset(0 0 100% 0)',
          WebkitClipPath: open ? 'inset(0 0 0 0)' : 'inset(0 0 100% 0)',
          transition: 'clip-path 450ms cubic-bezier(0.22, 1, 0.36, 1), -webkit-clip-path 450ms cubic-bezier(0.22, 1, 0.36, 1)',
          willChange: 'clip-path',
        }}
        className={[
          'absolute left-0 right-0 top-full flex flex-col px-8 pt-9 pb-10 lg:hidden',
          'bg-ink/55 backdrop-blur-2xl backdrop-saturate-150 border-b border-white/[0.08]',
          open ? 'pointer-events-auto' : 'pointer-events-none',
        ].join(' ')}
      >
        {/* Inner content wrapper — on open, fades up from below while the
            drawer panel unfolds top→down (small delay so the fade lags the
            clip-path reveal slightly). On close, opacity fades out over the
            same duration as the panel retract, but the transform jumps back
            to its starting offset only AFTER the panel has fully clipped
            closed — so the user never sees the content "drop" mid-close. */}
        <div
          style={{
            opacity: open ? 1 : 0,
            transform: open ? 'translateY(0)' : 'translateY(16px)',
            transition: open
              ? 'opacity 450ms ease-out 150ms, transform 450ms ease-out 150ms'
              : 'opacity 450ms ease-out 0ms, transform 0s ease-out 450ms',
          }}
        >
          <ul className="m-0 flex w-full list-none flex-col gap-0 p-0">
            {NAV.map((item) => (
              <li key={item.to} className="border-b border-white/[0.12]">
                <NavLink
                  to={item.to}
                  end={item.end}
                  onClick={() => {
                    triggerSlide();
                    setOpen(false);
                  }}
                  className="block py-4 text-[26px] font-normal leading-none tracking-[-0.04em] text-paper"
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
          {/* Bumped mt from mt-7 → mt-14 + added mb-6 so the button
              sits roughly where the socials row used to begin, and
              the drawer keeps most of the vertical space it had
              before the socials were removed. */}
          <div className="mt-14 mb-6 flex justify-center">
            <Link
              to="/contact"
              onClick={() => {
                triggerSlide();
                setOpen(false);
              }}
              className="inline-flex items-center rounded-full border-[1.5px] border-paper bg-paper px-7 py-3 text-[12px] font-semibold uppercase tracking-[0.14em] text-ink transition-colors hover:bg-transparent hover:text-paper"
            >
              Request a Quote
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
