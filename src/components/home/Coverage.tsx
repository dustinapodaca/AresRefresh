import { Link } from 'react-router-dom';
import Arrow from '../Arrow';
import { useRef, useState } from 'react';
import CoverageMap, { cityAlongRoute } from './CoverageMap';
import { useScene } from './motion';
import { responsive } from '../../lib/responsive';
import { RevealHeading, RevealLead } from './Reveal';

const CITIES = [
  { to: '/locations/colorado-springs', name: 'Colorado Springs', note: 'Headquarters' },
  { to: '/locations/denver', name: 'Denver', note: 'Service area' },
  { to: '/locations/pueblo', name: 'Pueblo', note: 'Service area' },
];

// One scroll (owner, 2026-10-19): I-25 draws from north to south with the scroll, each city's pin
// popping in as the line reaches it (a small overshoot, not a bounce), and COLORADO, I-25, and PIKES
// PEAK come in last; the HQ pulse stays. Pointing at or tabbing to a city in the list lights its pin
// (larger, a rust ring, the others dimmed), and pointing at a pin lights its row.
export default function Coverage() {
  const ref = useRef<HTMLElement>(null);
  const [lit, setLit] = useState<string | null>(null);
  useScene(ref, ({ gsap }, root) => {
    const map = root.querySelector('.ds-map svg')!;
    const route = map.querySelector<SVGPathElement>('.ds-map-route')!;
    const tl = gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: { trigger: map, start: 'top 85%', end: 'bottom 55%', scrub: true },
    });
    tl.fromTo(route, { strokeDasharray: 1, strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1 }, 0);
    map.querySelectorAll<SVGGElement>('.ds-map-city').forEach((city) => {
      const at = cityAlongRoute(city.dataset.city ?? '') * 0.92;
      const pin = city.querySelector('.ds-map-pin');
      const label = city.querySelector('.ds-map-city-label');
      tl.fromTo(pin, { scale: 0, transformOrigin: '50% 50%' }, { scale: 1.15, duration: 0.08, ease: 'power2.out' }, at)
        .to(pin, { scale: 1, duration: 0.06, ease: 'power1.inOut' }, at + 0.08)
        .fromTo(label, { opacity: 0, x: -6 }, { opacity: 1, x: 0, duration: 0.1 }, at + 0.02);
    });
    tl.fromTo(map.querySelectorAll('.ds-map-note'), { opacity: 0 }, { opacity: 1, duration: 0.12, stagger: 0.03 }, 0.86);

    // The bleed photo opens from a 7% inset at each side to the full width, the photo inside moving
    // slower than its frame (in every browser; it was a CSS scroll timeline).
    const bleed = root.querySelector('.ds-bleed');
    const photo = root.querySelector('.ds-bleed img');
    gsap.fromTo(bleed, { clipPath: 'inset(0% 7%)' }, { clipPath: 'inset(0% 0%)', ease: 'none', scrollTrigger: { trigger: bleed, start: 'top bottom', end: 'top 25%', scrub: true } });
    gsap.fromTo(photo, { yPercent: -6, scale: 1.14 }, { yPercent: 6, scale: 1.14, ease: 'none', scrollTrigger: { trigger: bleed, start: 'top bottom', end: 'bottom top', scrub: true } });
  });

  return (
    <section ref={ref} id="coverage" className="ds-coverage" aria-labelledby="coverage-title">
      <div className="ds-coverage-head">
        <RevealHeading id="coverage-title" className="ds-display-lg">
          Where we work.
        </RevealHeading>
        <RevealLead className="ds-lead">
          {'Armed and unarmed officers for federal, commercial, industrial, and institutional sites, from our base in Colorado Springs.'}
        </RevealLead>
        <CoverageMap landmarks lit={lit} onLight={setLit} />
        {/* In the head so desktop can set it under the lead, left of the map (owner, 2026-10-16);
            phones and tablets keep it below the map. */}
        <ul className="ds-cities">
          {CITIES.map((c) => (
            <li key={c.to}>
              <Link
                to={c.to}
                className="ds-city"
                data-lit={lit === c.name ? 'true' : undefined}
                onPointerEnter={(e) => e.pointerType === 'mouse' && setLit(c.name)}
                onPointerLeave={(e) => e.pointerType === 'mouse' && setLit(null)}
                onFocus={() => setLit(c.name)}
                onBlur={() => setLit(null)}
              >
                <span className="ds-city-name">{c.name}</span>
                <span className="ds-small">{c.note}</span>
                <Arrow size={24} />
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Full bleed. Starts here and ends under the opening of 04 Careers. */}
      <div className="ds-bleed" aria-hidden="true">
        <img {...responsive('/images/about-security.jpg')} alt="" loading="lazy" decoding="async" />
      </div>
    </section>
  );
}
