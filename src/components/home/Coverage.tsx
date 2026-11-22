import { useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Arrow from '../Arrow';
import { readIn, useScene, words, SCRUB } from './engine';
import { type LatLon, ALS, CS, DEN, DOTS, DRO, GJT, GWS, H, MTJ, PUB, REGION_ROWS, TRD, W, WALSENBURG, path, px, py } from './coverageGeo';
import { buildRegions, RegionsMap } from './CoverageRegions';
import './nx-coverage.css';

// 04 Coverage (home-flora, 2026-10-20; Colorado-wide 2026-11-22, owner). Colorado drawn to scale
// (the Home map's projection: 37°N to 41°N, 102.05°W to 109.05°W). The line is one route that
// leaves headquarters and comes home: Colorado Springs north on I-25 to Denver, west on I-70 through
// Glenwood Springs to Grand Junction, south on US-50 and US-550 through Montrose to Durango, east on
// US-160 through Alamosa to La Veta, the Highway of Legends (CO-12) down to Trinidad, and back up
// I-25 through Walsenburg and Pueblo. It draws as the section
// scrolls past, each city's pin coming up as the line reaches it. The three regions are set large
// beside the map, each a link to its column on the Service Areas page; pointing at one (or focusing
// it) lights its cities and dims the rest. Resolved: the whole route drawn, every pin lit. (Until
// 2026-11-22 it was I-25 alone, north to south, with the three Front Range cities beside it.)

// Two forms to compare (owner, 2026-11-22) at /?coverage=route|regions: `route` (below, the default
// while the owner compares) and `regions` (CoverageRegions.tsx: the three regions light up one after
// another, no roads or city names).
const FORMS = ['route', 'regions'] as const;
type Form = (typeof FORMS)[number];

// The route, from headquarters round the state and back.
const LOOP: LatLon[] = [
  CS,
  DEN,
  [39.74, -105.2],
  [39.7, -105.7],
  [39.63, -106.06],
  [39.655, -106.83],
  GWS,
  [39.535, -107.783],
  [39.45, -108.05],
  GJT,
  [38.742, -108.069],
  MTJ,
  [38.153, -107.756],
  [38.023, -107.671],
  [37.812, -107.664],
  DRO,
  [37.27, -107.25],
  [37.44, -106.8],
  [37.678, -106.353],
  [37.5794, -106.148],
  ALS,
  [37.43, -105.433],
  [37.59, -105.2],
  // La Veta, then CO-12 by Cuchara and Stonewall to Trinidad (owner, 2026-11-22: Trinidad added).
  [37.51, -105.01],
  [37.38, -105.1],
  [37.15, -105.03],
  [37.16, -104.75],
  TRD,
  [37.4, -104.65],
  WALSENBURG,
  PUB,
  CS,
];
const ROUTE = path(LOOP);
// The roads the route runs on, whole, as the faint dashed ground under it: I-25 from Wyoming to New
// Mexico and I-70 from Utah to Kansas (the route uses only part of each).
const GROUND = [
  path([[41, -105.0], [40.585, -105.08], DEN, CS, PUB, WALSENBURG, [37.1695, -104.5005], [37, -104.47]]),
  path([[39.17, -109.05], [39.159, -108.73], GJT]),
  path([DEN, [39.7, -104.4], [39.26, -103.69], [39.27, -102.05]]),
  ROUTE,
];
// How far along the route each vertex sits (0 to 1), so a pin comes up as the line reaches it.
const LPTS = LOOP.map(([lat, lon]) => [px(lon), py(lat)] as const);
const CUM = LPTS.reduce<number[]>((acc, p, i) => {
  if (i === 0) return [0];
  const [x0, y0] = LPTS[i - 1];
  return [...acc, acc[i - 1] + Math.hypot(p[0] - x0, p[1] - y0)];
}, []);
const atOf = (c: LatLon) => CUM[LOOP.indexOf(c)] / CUM[CUM.length - 1];

type Side = 'right' | 'left' | 'above' | 'below';
type Pin = { slug: string; name: string; region: string; c: LatLon; side: Side; hq?: boolean };
// Each name sits where it clears the roads and its neighbours.
const PINS: Pin[] = [
  { slug: 'colorado-springs', name: 'Colorado Springs', region: 'front-range', c: CS, side: 'right', hq: true },
  { slug: 'denver', name: 'Denver', region: 'front-range', c: DEN, side: 'right' },
  { slug: 'glenwood-springs', name: 'Glenwood Springs', region: 'western-slope', c: GWS, side: 'above' },
  { slug: 'grand-junction', name: 'Grand Junction', region: 'western-slope', c: GJT, side: 'right' },
  { slug: 'montrose', name: 'Montrose', region: 'western-slope', c: MTJ, side: 'right' },
  { slug: 'durango', name: 'Durango', region: 'western-slope', c: DRO, side: 'left' },
  { slug: 'alamosa', name: 'Alamosa', region: 'san-luis-valley', c: ALS, side: 'below' },
  { slug: 'trinidad', name: 'Trinidad', region: 'san-luis-valley', c: TRD, side: 'right' },
  { slug: 'pueblo', name: 'Pueblo', region: 'front-range', c: PUB, side: 'right' },
];

const PIKES = { lat: 38.8409, lon: -105.0442 };

const label = (p: Pin) => {
  const cx = px(p.c[1]);
  const cy = py(p.c[0]);
  const gap = p.hq ? 24 : 15;
  if (p.side === 'left') return { x: cx - gap, y: cy + 6, anchor: 'end' as const };
  if (p.side === 'above') return { x: cx, y: cy - 16, anchor: 'middle' as const };
  if (p.side === 'below') return { x: cx, y: cy + 30, anchor: 'middle' as const };
  return { x: cx + gap, y: cy + 6, anchor: 'start' as const };
};

export default function Coverage() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState<string | null>(null);
  const [params] = useSearchParams();
  const asked = params.get('coverage');
  const form: Form = (FORMS as readonly string[]).includes(asked ?? '') ? (asked as Form) : 'route';

  useScene(ref, (e, root) => {
    const { gsap } = e;
    readIn(e, root.querySelector('.nx-cv-title'));
    const map = root.querySelector<SVGSVGElement>('.nx-cv-svg')!;
    const route = map.querySelector<SVGPathElement>('.nx-cv-route');
    const tip = map.querySelector<SVGGElement>('.nx-cv-tip');
    const body = root.querySelector<HTMLElement>('.nx-cv-body')!;

    // The route runs round the state, so it needs room (Colorado-wide, 2026-11-22). From 1024px the
    // map and the regions hold still (pinned, centered under the nav) for about a screen while it
    // draws, then a beat on the finished map. Below that, no pin: it draws while the map crosses the
    // middle of the screen, over half a screen of scrolling. (I-25 alone drew in as little as 15% of
    // a screen, from 'bottom bottom', ending as the map's top reached 25% of the screen.)
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
      if (form === 'regions') return buildRegions(tl, map);
      // pathLength 1000, not 1: GSAP rounds px values to whole numbers, so 0 to 1 only jumps.
      // The tip is a dot-sized dash on the same route, so it rides the line's end by its dash offset:
      // moving it by a transform made the browser lay the map out again on every frame of the draw,
      // and a dash offset only repaints (2026-10-26).
      if (!route || !tip) return;
      tl.fromTo(route, { strokeDashoffset: 1000 }, { strokeDashoffset: 0, duration: 0.86 }, 0)
        .fromTo(tip.querySelectorAll('path'), { strokeDashoffset: 0 }, { strokeDashoffset: -1000, duration: 0.86 }, 0)
        .fromTo(tip, { opacity: 0 }, { opacity: 1, duration: 0.03 }, 0)
        .to(tip, { opacity: 0, duration: 0.06 }, 0.88)
        .fromTo(map.querySelectorAll('.nx-cv-faint'), { opacity: 0 }, { opacity: 1, duration: 0.12, stagger: 0.04 }, 0.8)
        .to({}, { duration: 0.1 }, 0.92);
      // Each city as the line reaches it (owner, 2026-10-22: the scaled pins flew in from the map's
      // corner): the dot grows in place, one sonar ping ripples out from it, the ring opens around it,
      // and the name comes up. Radii, not transforms, so everything grows from the city itself.
      PINS.forEach((c) => {
        const g = map.querySelector(`[data-city="${c.slug}"]`)!;
        const at = atOf(c.c) * 0.86;
        const dotR = c.hq ? 5.5 : 4.2;
        const ringR = c.hq ? 15 : 11;
        tl.fromTo(g.querySelector('.nx-cv-dot'), { attr: { r: 0 }, opacity: 0 }, { attr: { r: dotR }, opacity: 1, ease: 'power2.out', duration: 0.04 }, at)
          // The ping shows only from the moment the line arrives (a set, so scrolling back above the
          // city hides it again rather than leaving a small ring waiting there).
          .set(g.querySelector('.nx-cv-ping'), { attr: { r: dotR }, opacity: 0.7 }, at + 0.01)
          .to(g.querySelector('.nx-cv-ping'), { attr: { r: ringR * 3 }, opacity: 0, ease: 'power1.out', duration: 0.12 }, at + 0.01)
          .fromTo(g.querySelectorAll('.nx-cv-ring, .nx-cv-halo'), { attr: { r: dotR }, opacity: 0 }, { attr: { r: ringR }, opacity: 1, ease: 'power2.out', duration: 0.08 }, at + 0.02)
          .fromTo(g.querySelectorAll('.nx-cv-label'), { opacity: 0, y: 6 }, { opacity: 1, y: 0, ease: 'power2.out', duration: 0.07 }, at + 0.03);
        // Pikes Peak comes in with Colorado Springs, its mountain (owner, 2026-10-22).
        if (c.hq) tl.fromTo(map.querySelector('.nx-cv-pikes'), { opacity: 0, y: 6 }, { opacity: 1, y: 0, ease: 'power2.out', duration: 0.07 }, at + 0.03);
      });
    };
    const mm = gsap.matchMedia();
    mm.add('(min-width: 1024px)', () => build(true));
    mm.add('(max-width: 1023px)', () => build(false));

    gsap.fromTo(
      root.querySelectorAll('.nx-cv-city'),
      { yPercent: 60, opacity: 0.1 },
      {
        yPercent: 0,
        opacity: 1,
        ease: 'none',
        stagger: 0.12,
        scrollTrigger: { trigger: root.querySelector('.nx-cv-cities'), start: 'top 90%', end: 'top 45%', scrub: SCRUB },
      },
    );
    e.ScrollTrigger.sort();
  });

  const on = (id: string | null) => () => setActive(id);

  return (
    <section ref={ref} id="coverage" className="nx-coverage" aria-labelledby="nx-coverage-title">
      <div className="nx-cv-head">
        <h2 id="nx-coverage-title" className="nx-statement nx-cv-title">
          {words('Where we work.')}
        </h2>
        <p className="nx-cv-lead">
          Armed and unarmed officers for federal, commercial, industrial, and institutional sites across
          Colorado, from our base in Colorado Springs.
        </p>
      </div>

      <div className="nx-cv-body">
        <ul className="nx-cv-cities">
          {REGION_ROWS.map((r) => (
            <li key={r.id}>
              <Link
                to={`/locations#${r.id}`}
                className="nx-cv-city"
                data-on={active === r.id || undefined}
                onMouseEnter={on(r.id)}
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

        <figure className="nx-cv-map" data-form={form} data-active={active || undefined}>
          <p className="nx-cv-cue ds-data" aria-hidden="true">
            Scroll
          </p>
          {form === 'regions' ? (
            <RegionsMap active={active} />
          ) : (
          <svg
            className="nx-cv-svg"
            viewBox={`0 0 ${W} ${H}`}
            role="img"
            aria-label="Map of Colorado showing the cities Ares staffs: Colorado Springs (headquarters), Denver, and Pueblo on the Front Range; Glenwood Springs, Grand Junction, Montrose, and Durango on the Western Slope; and Alamosa and Trinidad in the San Luis Valley and the south."
          >
            <defs>
              <radialGradient id="nx-cv-glow">
                <stop offset="0%" stopColor="#e8965f" stopOpacity="0.45" />
                <stop offset="45%" stopColor="#bc6f40" stopOpacity="0.16" />
                <stop offset="100%" stopColor="#8b4920" stopOpacity="0" />
              </radialGradient>
              <filter id="nx-cv-bloom" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="b" />
                <feMerge>
                  <feMergeNode in="b" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <rect x="0.5" y="0.5" width={W - 1} height={H - 1} fill="none" stroke="#2c3037" />
            <g fill="#22262c">
              {DOTS.map(([cx, cy], i) => (
                <circle key={i} cx={cx} cy={cy} r="1.2" />
              ))}
            </g>
            <circle cx={px(CS[1])} cy={py(CS[0])} r="150" fill="url(#nx-cv-glow)" />
            {GROUND.map((d, i) => (
              <path key={i} d={d} fill="none" stroke="#2c3037" strokeWidth="1" strokeDasharray="3 5" />
            ))}
            <path className="nx-cv-route" d={ROUTE} pathLength={1000} fill="none" filter="url(#nx-cv-bloom)" />
            <g className="nx-cv-tip">
              <path className="nx-cv-tip-glow" d={ROUTE} pathLength={1000} />
              <path className="nx-cv-tip-dot" d={ROUTE} pathLength={1000} />
            </g>
            <text className="nx-cv-faint nx-cv-mono" x={px(-104.9) + 12} y={py(40.3)}>
              I-25
            </text>
            <text className="nx-cv-faint nx-cv-mono" x={px(-103.3)} y={py(39.42)}>
              I-70
            </text>
            <text className="nx-cv-faint nx-cv-mono" x="14" y="26">
              COLORADO
            </text>
            <g className="nx-cv-pikes">
              <path
                d={`M${px(PIKES.lon)} ${py(PIKES.lat) - 6} L${px(PIKES.lon) + 5.5} ${py(PIKES.lat) + 4} L${px(PIKES.lon) - 5.5} ${py(PIKES.lat) + 4} Z`}
                fill="none"
                stroke="#7d838c"
                strokeWidth="1.25"
                strokeLinejoin="round"
              />
              <text className="nx-cv-mono" x={px(PIKES.lon) - 12} y={py(PIKES.lat) + 4} textAnchor="end">
                PIKES PEAK
              </text>
            </g>
            {PINS.map((c) => {
              const cx = px(c.c[1]);
              const cy = py(c.c[0]);
              const t = label(c);
              return (
                <g key={c.slug} className="nx-cv-pin" data-city={c.slug} data-hq={c.hq || undefined} data-on={active === c.region || undefined}>
                  <circle className="nx-cv-ping" cx={cx} cy={cy} r={c.hq ? 5.5 : 4.2} />
                  {c.hq && <circle className="nx-cv-halo" cx={cx} cy={cy} r={15} />}
                  <circle className="nx-cv-ring" cx={cx} cy={cy} r={c.hq ? 15 : 11} />
                  <circle className="nx-cv-dot" cx={cx} cy={cy} r={c.hq ? 5.5 : 4.2} />
                  <text className="nx-cv-label nx-cv-name" x={t.x} y={t.y} textAnchor={t.anchor}>
                    {c.name}
                  </text>
                  {c.hq && (
                    <text className="nx-cv-label nx-cv-mono" x={t.x} y={cy + 25}>
                      HQ
                    </text>
                  )}
                </g>
              );
            })}
          </svg>
          )}
        </figure>
      </div>
    </section>
  );
}
