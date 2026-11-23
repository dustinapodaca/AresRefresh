import { useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Arrow from '../Arrow';
import { readIn, useScene, words, SCRUB } from './engine';
import { REGION_ROWS } from './coverageGeo';
import { buildRegions, RegionsMap } from './CoverageRegions';
import './nx-coverage.css';

// 04 Coverage (home-flora, 2026-10-20; Colorado-wide 2026-11-22, owner): "Where we work". The three
// regions are set large beside Colorado drawn to scale (CoverageRegions.tsx), each a link to its column on
// the Service Areas page; the map holds while the Front Range, the Western Slope, and the San Luis Valley
// light up one after another. Pointing at a region (or focusing it) lights it and dims the rest; "All
// service areas" lights all three. The route form (one line from Colorado Springs round the state and
// back, every city named) and its ?coverage= switch were removed (owner, 2026-11-22: regions is the one to
// keep); tag options-archive-2026-11-22.

export default function Coverage() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState<string | null>(null);
  // A region lights from a real move of the mouse onto its row, never from the rows scrolling under a
  // resting pointer (owner, 2026-11-22: that lit a region mid-draw and fought the scroll; it was then
  // held off until the map was whole, but the owner wants pointing to work during the draw too). So
  // the rows answer pointermove, not mouseenter, and a keyboard focus. While the light changes, the
  // map eases (`data-easing`, ~450ms) so a region coming up early or going back to where the scroll
  // has it never snaps.
  const figure = useRef<HTMLElement>(null);
  // Layout effect: the flag must be on in the same frame as the change, or the browser restyles the
  // map without it and the way back snaps.
  useLayoutEffect(() => {
    const el = figure.current;
    if (!el) return;
    el.setAttribute('data-easing', '');
    const t = window.setTimeout(() => el.removeAttribute('data-easing'), 450);
    return () => window.clearTimeout(t);
  }, [active]);

  useScene(ref, (e, root) => {
    const { gsap } = e;
    readIn(e, root.querySelector('.nx-cv-title'));
    const map = root.querySelector<SVGSVGElement>('.nx-cv-svg')!;
    const body = root.querySelector<HTMLElement>('.nx-cv-body')!;

    // From 1024px the map and the regions hold still (pinned, centered under the nav) for about a screen
    // while the three regions light up, then a beat on the finished map. Below that, no pin: they light
    // while the map crosses the middle of the screen, over half a screen of scrolling.
    const build = (wide: boolean) => {
      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: wide
          ? {
              trigger: body,
              start: () => {
                const nav = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--ds-header')) || 72;
                return `center ${Math.round((nav + window.innerHeight) / 2)}px`;
              },
              end: '+=110%',
              pin: true,
              scrub: SCRUB,
              invalidateOnRefresh: true,
            }
          : { trigger: map, start: 'center 80%', end: 'center 30%', scrub: SCRUB },
      });
      // The Scroll cue at the map's top right (owner, 2026-11-22, like the hero's), desktop only: there
      // while the section holds, gone as the map finishes.
      if (wide) tl.fromTo(root.querySelector('.nx-cv-cue'), { opacity: 1 }, { opacity: 0, duration: 0.08 }, 0.8);
      buildRegions(tl, map);
    };
    const mm = gsap.matchMedia();
    mm.add('(min-width: 1024px)', () => build(true));
    mm.add('(max-width: 1023px)', () => build(false));

    // The regions rise in as their list comes up the screen: from 90% to 45% on desktop; on phones
    // and tablets a tad sooner, from the screen's foot to 65% (owner, 2026-11-22).
    const rise = (start: string, end: string) =>
      gsap.fromTo(
        root.querySelectorAll('.nx-cv-city, .nx-cv-all'),
        { yPercent: 60, opacity: 0.1 },
        {
          yPercent: 0,
          opacity: 1,
          ease: 'none',
          stagger: 0.12,
          scrollTrigger: { trigger: root.querySelector('.nx-cv-cities'), start, end, scrub: SCRUB },
        },
      );
    mm.add('(min-width: 1024px)', () => rise('top 90%', 'top 45%'));
    mm.add('(max-width: 1023px)', () => rise('top bottom', 'top 65%'));
    e.ScrollTrigger.sort();
  });

  // 'all' (the All service areas link, owner 2026-11-22) lights every region at once.
  const on = (id: string | null) => () => setActive(id);
  // Mouse and pen only: a finger's scroll fires pointermove too.
  const moved = (id: string) => (ev: React.PointerEvent) => {
    if (ev.pointerType === 'touch' || active === id) return;
    setActive(id);
  };

  return (
    <section ref={ref} id="coverage" className="nx-coverage" aria-labelledby="nx-coverage-title">
      <div className="nx-cv-head">
        <h2 id="nx-coverage-title" className="nx-statement nx-cv-title">
          {words('Where we work')}
        </h2>
      </div>

      <div className="nx-cv-body">
        {/* In the held frame on desktop, over the regions and level with the map's top (owner,
            2026-11-22: the column above the regions was empty); under the headline on phones. */}
        <p className="nx-cv-lead">
          Armed and unarmed officers for federal, commercial, industrial, and institutional sites across
          Colorado, from our base in Colorado Springs.
        </p>
        <div className="nx-cv-list">
          <ul className="nx-cv-cities">
            {REGION_ROWS.map((r) => (
              <li key={r.id}>
                <Link
                  to={`/locations#${r.id}`}
                  className="nx-cv-city"
                  data-on={active === r.id || undefined}
                  onPointerMove={moved(r.id)}
                  onMouseLeave={on(null)}
                  onFocus={on(r.id)}
                  onBlur={on(null)}
                >
                  <span className="nx-cv-city-text">
                    <span className="nx-cv-city-name">{r.name}</span>
                    <span className="nx-cv-city-note ds-data">{r.cities}</span>
                  </span>
                  <Arrow size={28} />
                </Link>
              </li>
            ))}
          </ul>
          <Link
            to="/locations"
            className="ds-link nx-cv-all"
            onPointerMove={moved('all')}
            onMouseLeave={on(null)}
            onFocus={on('all')}
            onBlur={on(null)}
          >
            All service areas
            <Arrow />
          </Link>
        </div>

        <figure ref={figure} className="nx-cv-map" data-active={active || undefined}>
          <p className="nx-cv-cue ds-data" aria-hidden="true">
            Scroll
          </p>
          <RegionsMap active={active} onPoint={(id) => setActive((cur) => (cur === id ? cur : id))} />
        </figure>
      </div>
    </section>
  );
}
