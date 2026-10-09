import { useEffect, useRef } from 'react';

// The opening photograph (owner, 2026-10-08): downtown Denver at sunset with the Front Range
// (a real place, swapped with the Request a Quote page, which now has the generated towers).
// The 2400px original of contact-hero.jpg (hero1.jpg), as WebP, graded down to match.
const HERO = { src: '/images/services-hero/denver-sunset.webp', width: 2400, height: 1380 };

export default function Opening() {
  const ref = useRef<HTMLElement>(null);

  // Owner, 2026-10-08: on scroll, only the glass slides up at first; the photo and the page
  // below hold still until the glass's foot has cleared the nav, then everything scrolls as
  // usual. A spacer under the glass grows with the scroll (as --svc-hold), which keeps what
  // follows in place; without JS it stays 0 and the page scrolls normally.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const root = document.documentElement;
    const anchor = root.style.overflowAnchor;
    root.style.overflowAnchor = 'none';
    const glass = el.querySelector<HTMLElement>('.ds-svc-open-glass');
    const header = document.querySelector<HTMLElement>('.ds-header');
    let cap = 0;
    let frame = 0;
    const measure = () => {
      cap = Math.max(0, (glass?.offsetHeight ?? 0) - (header?.offsetHeight ?? 0));
    };
    const update = () => {
      frame = 0;
      el.style.setProperty('--svc-hold', `${Math.min(Math.max(window.scrollY, 0), cap)}px`);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const onResize = () => {
      measure();
      onScroll();
    };
    measure();
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      if (frame) cancelAnimationFrame(frame);
      root.style.overflowAnchor = anchor;
    };
  }, []);

  return (
    <section ref={ref} className="ds-svc-open" aria-labelledby="services-title">
      {/* The photo sits 164px lower, with a mirror of it (flipped vertically) above so the
          glass frosts real image to the top. It holds still while the glass slides away. */}
      <div className="ds-svc-open-photo" aria-hidden="true">
        <div className="ds-svc-open-stack">
          <div className="ds-svc-open-mirror">
            <img src={HERO.src} alt="" width={HERO.width} height={HERO.height} decoding="async" />
          </div>
          <img src={HERO.src} alt="" width={HERO.width} height={HERO.height} decoding="async" {...{ fetchpriority: 'high' }} />
        </div>
      </div>

      <div className="ds-svc-open-glass">
        <div className="ds-container ds-svc-open-head">
          <h1 id="services-title" className="ds-display-xl">
            Security officers for six kinds of sites.
          </h1>
          <div className="ds-svc-open-side">
            <p className="ds-lead">
              Armed and unarmed officers for federal, commercial, industrial, and
              institutional sites in Colorado Springs, Denver, and Pueblo. Find the division
              closest to your site.
            </p>
          </div>
        </div>
      </div>

      {/* Grows with the first scroll (--svc-hold) so the photo and the page below hold still. */}
      <div className="ds-svc-open-spacer" aria-hidden="true" />
      {/* The open, crisp part of the photograph below the glass. */}
      <div className="ds-svc-band" aria-hidden="true" />
    </section>
  );
}
