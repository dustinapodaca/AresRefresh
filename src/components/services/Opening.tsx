import { useEffect, useRef } from 'react';

// The opening photograph (owner, 2026-10-08): downtown Denver at sunset with the Front Range
// (a real place, swapped with the Request a Quote page, which now has the generated towers).
// The 2400px original of contact-hero.jpg (hero1.jpg), as WebP, graded down to match.
const HERO = { src: '/images/services-hero/denver-sunset.webp', width: 2400, height: 1380 };

export default function Opening() {
  const ref = useRef<HTMLElement>(null);

  // Owner, 2026-10-08: on scroll, only the glass slides up at first; the photo and the page
  // below hold still until the glass's foot has cleared the nav, then everything scrolls as
  // usual. Where scroll-driven animations exist, the hold is a compositor transform tied to
  // the scroll (smooth: dossier.css, `html.svc-hold`); this effect only measures the distance
  // (--svc-cap). Elsewhere a spacer under the glass grows with the scroll (--svc-hold).
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const root = document.documentElement;
    const glass = el.querySelector<HTMLElement>('.ds-svc-open-glass');
    const header = document.querySelector<HTMLElement>('.ds-header');
    const smooth = CSS.supports('animation-timeline: scroll()');
    const anchor = root.style.overflowAnchor;
    root.style.overflowAnchor = 'none';
    root.classList.add(smooth ? 'svc-hold' : 'svc-hold-js');
    let cap = 0;
    let frame = 0;
    const measure = () => {
      cap = Math.max(0, (glass?.offsetHeight ?? 0) - (header?.offsetHeight ?? 0));
      root.style.setProperty('--svc-cap', `${cap}px`);
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
      if (!smooth) onScroll();
    };
    measure();
    if (!smooth) {
      update();
      window.addEventListener('scroll', onScroll, { passive: true });
    }
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      if (frame) cancelAnimationFrame(frame);
      root.classList.remove('svc-hold', 'svc-hold-js');
      root.style.removeProperty('--svc-cap');
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

      {/* The place, like the other photo heroes (owner, 2026-10-08). It sits with the photo,
          under the glass at first: the glass slides off it, then it leaves with the photo. */}
      <p className="ds-caption ds-svc-open-cap">Downtown Denver, Colorado</p>

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
