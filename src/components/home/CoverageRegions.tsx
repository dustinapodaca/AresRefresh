/// <reference types="gsap" />
import { useLayoutEffect, useRef, type ReactNode } from 'react';
import { ALS, CS, DEN, DOTS, DRO, FTC, GJT, GWS, H, MTJ, PUB, TRD, W, WALSENBURG, path, px, py, type LatLon } from './coverageGeo';

// 04 Coverage, the `regions` form (owner, 2026-11-22: "more like entire region highlight", to compare
// with the route at /?coverage=regions; the default since 2026-11-22). No city names, and only I-25
// and I-70 as thin lines: the three regions Ares staffs come up one after another with the scroll,
// the Front Range, then the Western Slope, then the San Luis Valley. In each, the map's dot grid
// lights rust in rings rippling out from the region's city (Colorado Springs, Grand Junction, Alamosa), a thin rust outline draws round it over a faint wash,
// its name comes up in the data face, and its cities show as plain dots as the light reaches them.
// Resolved: all three lit.

type Region = {
  id: string;
  /** The outline, lat/lon, clockwise. */
  shape: LatLon[];
  /** Where the light starts. */
  from: LatLon;
  /** The name, two lines, and where it sits. */
  name: [string, string];
  at: LatLon;
  anchor: 'start' | 'middle' | 'end';
  cities: { slug: string; name: string; c: LatLon; hq?: boolean }[];
};

// The three regions tile the whole state (owner, 2026-11-22): the Western Slope west of the
// Continental Divide; the Front Range east of it out to Kansas, down to a line from Poncha Pass
// round the south of Pueblo to Kansas; the San Luis Valley everything south of that, from the Divide
// to Kansas, so it takes in Walsenburg, Trinidad, and the southern end of the state. Approximate on
// purpose.
const DIVIDE: LatLon[] = [
  [41, -106.85],
  [40.4, -106.6],
  [40.0, -105.75],
  [39.7, -105.85],
  [39.36, -106.06],
  [38.9, -106.35],
  [38.5, -106.33],
  [38.16, -106.6],
  [37.48, -106.8],
  [37, -106.6],
];
const PONCHA = DIVIDE.findIndex(([lat]) => lat === 38.5);
// Front Range / San Luis Valley, from the Divide at Poncha Pass to the Kansas line.
const SPLIT: LatLon[] = [
  [38.5, -106.33],
  [38.2, -105.55],
  [37.85, -104.95],
  [37.72, -104.4],
  [37.65, -103.5],
  [37.6, -102.05],
];

export const REGIONS: Region[] = [
  {
    id: 'front-range',
    shape: [...DIVIDE.slice(0, PONCHA), ...SPLIT, [41, -102.05]],
    from: CS,
    name: ['FRONT', 'RANGE'],
    at: [40.3, -103.9],
    anchor: 'start',
    cities: [
      { slug: 'colorado-springs', name: 'Colorado Springs', c: CS, hq: true },
      { slug: 'denver', name: 'Denver', c: DEN },
      { slug: 'fort-collins', name: 'Fort Collins', c: FTC },
      { slug: 'pueblo', name: 'Pueblo', c: PUB },
    ],
  },
  {
    id: 'western-slope',
    shape: [[41, -109.05], ...DIVIDE, [37, -109.05]],
    from: GJT,
    name: ['WESTERN', 'SLOPE'],
    at: [40.42, -108.05],
    anchor: 'middle',
    cities: [
      { slug: 'grand-junction', name: 'Grand Junction', c: GJT },
      { slug: 'glenwood-springs', name: 'Glenwood Springs', c: GWS },
      { slug: 'montrose', name: 'Montrose', c: MTJ },
      { slug: 'durango', name: 'Durango', c: DRO },
    ],
  },
  {
    id: 'san-luis-valley',
    shape: [...SPLIT, [37, -102.05], ...DIVIDE.slice(PONCHA + 1).reverse()],
    from: ALS,
    name: ['SAN LUIS', 'VALLEY'],
    // Above Alamosa, clear of Trinidad's dot at the right.
    at: [37.86, -105.85],
    anchor: 'middle',
    cities: [
      { slug: 'alamosa', name: 'Alamosa', c: ALS },
      { slug: 'trinidad', name: 'Trinidad', c: TRD },
    ],
  },
];

// I-25 and I-70 as thin, quiet lines under the regions (owner, 2026-11-22), there from the start and
// unlabeled: the two roads a reader finds Colorado by. Wyoming to New Mexico, and Utah to Kansas.
const I25 = path([[41, -104.98], FTC, DEN, CS, PUB, WALSENBURG, TRD, [37, -104.47]]);
const I70 = path([
  [39.17, -109.05],
  [39.159, -108.73],
  GJT,
  [39.45, -108.05],
  [39.535, -107.783],
  GWS,
  [39.655, -106.83],
  [39.63, -106.07],
  [39.7, -105.7],
  [39.74, -105.2],
  DEN,
  [39.7, -104.4],
  [39.26, -103.69],
  [39.27, -102.05],
]);

const BANDS = 6;
/** The lit dots' opacity once the light has passed (and in the resolved page: `.nx-rg-band`). */
const SETTLED = 0.28;
const xy = ([lat, lon]: LatLon): [number, number] => [px(lon), py(lat)];

function inside([x, y]: [number, number], poly: [number, number][]) {
  let hit = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i];
    const [xj, yj] = poly[j];
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) hit = !hit;
  }
  return hit;
}

// Each region's dots, in rings by distance from where its light starts, and which ring each city
// falls in, so a city's dot comes up with the light around it.
const BUILT = REGIONS.map((r) => {
  const poly = r.shape.map(xy);
  const [fx, fy] = xy(r.from);
  const dots = DOTS.filter((d) => inside(d, poly))
    .map((d) => ({ d, dist: Math.hypot(d[0] - fx, d[1] - fy) }))
    .sort((a, b) => a.dist - b.dist);
  const max = dots.length ? dots[dots.length - 1].dist : 1;
  const bands: [number, number][][] = Array.from({ length: BANDS }, () => []);
  for (const { d, dist } of dots) bands[Math.min(BANDS - 1, Math.floor((dist / (max + 0.01)) * BANDS))].push(d);
  const outline = `M${poly.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join(' L')} Z`;
  const cityBand = r.cities.map((c) => {
    const [cx, cy] = xy(c.c);
    return Math.min(BANDS - 1, Math.floor((Math.hypot(cx - fx, cy - fy) / (max + 0.01)) * BANDS));
  });
  return { r, bands, outline, cityBand };
});

/** The regions' part of the scrubbed timeline: each region a third of the draw, one after another. */
export function buildRegions(tl: gsap.core.Timeline, map: SVGSVGElement) {
  BUILT.forEach(({ r, cityBand }, i) => {
    const g = map.querySelector(`[data-region="${r.id}"]`)!;
    const s = i * 0.29;
    tl.fromTo(g.querySelector('.nx-rg-wash'), { opacity: 0 }, { opacity: 1, duration: 0.12 }, s)
      .fromTo(g.querySelector('.nx-rg-edge'), { strokeDashoffset: 1000 }, { strokeDashoffset: 0, duration: 0.22 }, s)
      // Each ring flashes full rust as the light passes, then settles to the quieter lit tone
      // (owner, 2026-11-22: all of it at full rust read too orange once the state was lit).
      .fromTo(g.querySelectorAll('.nx-rg-band'), { opacity: 0 }, { opacity: 1, duration: 0.04, stagger: 0.03 }, s)
      .to(g.querySelectorAll('.nx-rg-band'), { opacity: SETTLED, duration: 0.06, stagger: 0.03 }, s + 0.04)
      .fromTo(g.querySelectorAll('.nx-rg-name'), { opacity: 0, y: 6 }, { opacity: 1, y: 0, ease: 'power2.out', duration: 0.08 }, s + 0.08);
    r.cities.forEach((c, k) => {
      const at = s + cityBand[k] * 0.03;
      const pin = g.querySelector(`[data-city="${c.slug}"]`)!;
      const dotR = c.hq ? 5.5 : 3.6;
      tl.fromTo(pin.querySelector('.nx-cv-dot'), { attr: { r: 0 }, opacity: 0 }, { attr: { r: dotR }, opacity: 1, ease: 'power2.out', duration: 0.04 }, at)
        .set(pin.querySelector('.nx-cv-ping'), { attr: { r: dotR }, opacity: 0.7 }, at + 0.01)
        .to(pin.querySelector('.nx-cv-ping'), { attr: { r: (c.hq ? 15 : 10) * 2.6 }, opacity: 0, ease: 'power1.out', duration: 0.12 }, at + 0.01);
      if (c.hq) {
        tl.fromTo(pin.querySelectorAll('.nx-cv-ring, .nx-cv-halo'), { attr: { r: dotR }, opacity: 0 }, { attr: { r: 15 }, opacity: 1, ease: 'power2.out', duration: 0.08 }, at + 0.02)
          .fromTo(pin.querySelector('.nx-rg-hq'), { opacity: 0, y: 6 }, { opacity: 1, y: 0, ease: 'power2.out', duration: 0.07 }, at + 0.03);
      }
    });
  });
  tl.to({}, { duration: 0.1 }, 0.9);
}

/** `active` lights one region (the figure dims the rest). `onPoint` reports a region the mouse has
 *  really moved over (pointermove, never touch, never a page scrolling under a resting pointer), and
 *  null when it leaves the map, so pointing at the map works like pointing at the rows. */
// A solid black plate behind a label, sized to its text (owner, 2026-11-22: a strip, like the Service
// Areas map, not an outline round the letters), so the roads and lit dots never cut it. The group carries
// the label's class, so the timeline and the pointed-at state move and fade plate and text together.
const PLATE_X = 6;
const PLATE_Y = 3;
function Plated({ className, children }: { className: string; children: ReactNode }) {
  const ref = useRef<SVGRectElement>(null);
  useLayoutEffect(() => {
    const rect = ref.current;
    const text = rect?.nextElementSibling as SVGGraphicsElement | null;
    if (!rect || !text) return;
    const fit = () => {
      const b = text.getBBox();
      if (!b.width) return;
      rect.setAttribute('x', String(b.x - PLATE_X));
      rect.setAttribute('y', String(b.y - PLATE_Y));
      rect.setAttribute('width', String(b.width + PLATE_X * 2));
      rect.setAttribute('height', String(b.height + PLATE_Y * 2));
    };
    fit();
    let live = true;
    document.fonts?.ready.then(() => live && fit());
    return () => {
      live = false;
    };
  }, []);
  return (
    <g className={className}>
      <rect ref={ref} className="nx-rg-plate" rx="2" fill="#000" width="0" height="0" />
      {children}
    </g>
  );
}

export function RegionsMap({ active, onPoint }: { active: string | null; onPoint: (id: string | null) => void }) {
  return (
    <svg
      onPointerLeave={() => onPoint(null)}
      className="nx-cv-svg nx-rg"
      viewBox={`0 0 ${W} ${H}`}
      role="img"
      aria-label="Map of Colorado showing the three regions Ares staffs: the Front Range (Colorado Springs, headquarters, Denver, Fort Collins, and Pueblo), the Western Slope (Grand Junction, Glenwood Springs, Montrose, and Durango), and the San Luis Valley and the south (Alamosa and Trinidad)."
    >
      <defs>
        <radialGradient id="nx-rg-glow">
          <stop offset="0%" stopColor="#e8965f" stopOpacity="0.4" />
          <stop offset="45%" stopColor="#bc6f40" stopOpacity="0.14" />
          <stop offset="100%" stopColor="#8b4920" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect x="0.5" y="0.5" width={W - 1} height={H - 1} fill="none" stroke="#2c3037" />
      <g fill="#22262c">
        {DOTS.map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="1.2" />
        ))}
      </g>
      <circle cx={px(CS[1])} cy={py(CS[0])} r="150" fill="url(#nx-rg-glow)" />
      <g className="nx-rg-roads">
        <path d={I25} />
        <path d={I70} />
      </g>
      {/* Top right (top left is the Western Slope here), left of the Scroll cue in the corner. */}
      <text className="nx-cv-mono" x={W - 34} y="26" textAnchor="end">
        COLORADO
      </text>
      {BUILT.map(({ r, bands, outline }) => {
        const [lx, ly] = xy(r.at);
        return (
          <g
            key={r.id}
            className="nx-rg-region"
            data-region={r.id}
            data-on={active === r.id || undefined}
            onPointerMove={(ev) => ev.pointerType !== 'touch' && onPoint(r.id)}
          >
            <path className="nx-rg-wash" d={outline} />
            <path className="nx-rg-edge" d={outline} pathLength={1000} />
            {bands.map((band, k) => (
              <g key={k} className="nx-rg-band">
                {band.map(([cx, cy], j) => (
                  <circle key={j} cx={cx} cy={cy} r="1.5" />
                ))}
              </g>
            ))}
            <Plated className="nx-cv-mono nx-rg-name">
              <text x={lx} y={ly} textAnchor={r.anchor}>
                <tspan x={lx}>{r.name[0]}</tspan>
                <tspan x={lx} dy="1.25em">
                  {r.name[1]}
                </tspan>
              </text>
            </Plated>
            {r.cities.map((c) => {
              const [cx, cy] = xy(c.c);
              return (
                <g key={c.slug} className="nx-cv-pin nx-rg-pin" data-city={c.slug} data-hq={c.hq || undefined}>
                  <circle className="nx-cv-ping" cx={cx} cy={cy} r={c.hq ? 5.5 : 3.6} />
                  {c.hq && <circle className="nx-cv-halo" cx={cx} cy={cy} r={15} />}
                  {c.hq && <circle className="nx-cv-ring" cx={cx} cy={cy} r={15} />}
                  <circle className="nx-cv-dot" cx={cx} cy={cy} r={c.hq ? 5.5 : 3.6} />
                  {c.hq && (
                    <Plated className="nx-cv-mono nx-rg-hq">
                      <text x={cx + 22} y={cy + 5}>
                        HQ
                      </text>
                    </Plated>
                  )}
                </g>
              );
            })}
          </g>
        );
      })}
    </svg>
  );
}
