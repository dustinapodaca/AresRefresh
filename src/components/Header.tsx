import { useEffect, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import Socials from './Socials';

const NAV = [
  { to: '/', label: 'Home', end: true },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/capability-statement', label: 'Capability Statement' },
  { to: '/careers', label: 'Careers' },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const SCROLL_THRESHOLD = 20;
    const onScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll while drawer is open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  // Glass is engaged whenever the user has scrolled OR the mobile drawer is
  // open. Instead of cross-fading the colors, we animate a clip-path inset
  // so the fog-glass surface RISES from the bottom edge of the header up,
  // matching how the drawer panel drops down — two opposing motions that
  // meet in the middle.
  const glassActive = scrolled || open;

  return (
    <header className="fixed inset-x-0 top-0 z-50 text-paper">
      <div
        aria-hidden
        style={{
          clipPath: glassActive ? 'inset(0 0 0 0)' : 'inset(100% 0 0 0)',
          WebkitClipPath: glassActive ? 'inset(0 0 0 0)' : 'inset(100% 0 0 0)',
          transition: 'clip-path 400ms cubic-bezier(0.22, 1, 0.36, 1), -webkit-clip-path 400ms cubic-bezier(0.22, 1, 0.36, 1)',
        }}
        className="pointer-events-none absolute inset-0 -z-10 border-b border-white/10 bg-ink/55 backdrop-blur-2xl backdrop-saturate-150"
      />
      <div className="container-ares">
        <div className="flex items-center justify-between gap-6 py-5 lg:grid lg:grid-cols-[1fr_auto_1fr]">
          {/* Brand — logo mark only, larger, white */}
          <Link to="/" aria-label="Ares Security home" className="flex items-center text-paper">
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
              onClick={() => setOpen((o) => !o)}
            >
              <span className="relative block h-4 w-6">
                <span className={`absolute left-0 right-0 h-[1.5px] bg-current transition-transform duration-300 ease-[cubic-bezier(0.45,0,0.55,1)] ${open ? 'top-1/2 -translate-y-1/2 rotate-45' : 'top-0'}`} />
                <span className={`absolute left-0 right-0 top-1/2 h-[1.5px] -translate-y-1/2 bg-current transition-[opacity,transform] duration-200 ${open ? 'scale-x-0 opacity-0' : 'opacity-100'}`} />
                <span className={`absolute left-0 right-0 h-[1.5px] bg-current transition-transform duration-300 ease-[cubic-bezier(0.45,0,0.55,1)] ${open ? 'top-1/2 -translate-y-1/2 -rotate-45' : 'bottom-0'}`} />
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
        {/* Inner content wrapper — fades up from below while the drawer panel
            unfolds top→down. Small delay so the fade lags slightly behind the
            clip-path reveal, creating a layered "drop then settle" feel. */}
        <div
          className={`transition-[opacity,transform] duration-[450ms] ease-out ${
            open
              ? 'translate-y-0 opacity-100 delay-150'
              : 'translate-y-4 opacity-0 delay-0'
          }`}
        >
          <ul className="m-0 flex w-full list-none flex-col gap-0 p-0">
            {NAV.map((item) => (
              <li key={item.to} className="border-b border-white/[0.12]">
                <NavLink
                  to={item.to}
                  end={item.end}
                  onClick={() => setOpen(false)}
                  className="block py-4 text-[26px] font-normal leading-none tracking-[-0.04em] text-paper"
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="mt-7 flex justify-center">
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="inline-flex items-center rounded-full border-[1.5px] border-paper bg-paper px-7 py-3 text-[12px] font-semibold uppercase tracking-[0.14em] text-ink transition-colors hover:bg-transparent hover:text-paper"
            >
              Request a Quote
            </Link>
          </div>
          <Socials variant="dark" className="mt-7 justify-center" />
        </div>
      </nav>
    </header>
  );
}
