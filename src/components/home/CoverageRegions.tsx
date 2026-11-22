/// <reference types="gsap" />
import { ALS, CS, DEN, DOTS, DRO, GJT, GWS, H, MTJ, PUB, W, px, py, type LatLon } from './coverageGeo';

// 04 Coverage, the `regions` form (owner, 2026-11-22: "more like entire region highlight", to compare
// with the route at /?coverage=regions). No roads and no city names: the three regions Ares staffs
// come up one after another with the scroll, the Front Range, then the Western Slope, then the San
// Luis Valley. In each, the map's dot grid lights rust in rings rippling out from the region's city
// (Colorado Springs, Grand Junction, Alamosa), a thin rust outline draws round it over a faint wash,
// its name comes up in the data face, and its cities show as plain dots as the light reaches them.
// The outlines are approximate on purpose: the Front Range along the foot of the mountains, the
// Western Slope west of the Continental Divide, the San Luis Valley between the San Juans and the
// Sangre de Cristos. Resolved: all three lit.

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
  cities: { slug: string; c: LatLon; hq?: boolean }[];
};

export const REGIONS: Region[] = [
  {
    id: 'front-range',
    shape: [
      [41, -105.28],
      [40.4, -105.25],
      [39.9, -105.3],
      [39.55, -105.22],
      [39.1, -105.1],
      [38.75, -105.05],
      [38.4, -105.15],
      [37.9, -105.0],
      [37.4, -104.95],
      [37, -104.85],
      [37, -104.1],
      [37.7, -104.2],
      [38.4, -104.1],
      [39.0, -104.1],
      [39.7, -104.2],
      [40.3, -104.3],
      [41, -104.4],
    ],
    from: CS,
    name: ['FRONT', 'RANGE'],
    at: [40.42, -104.05],
    anchor: 'start',
    cities: [
      { slug: 'colorado-springs', c: CS, hq: true },
      { slug: 'denver', c: DEN },
      { slug: 'pueblo', c: PUB },
    ],
  },
  {
    id: 'western-slope',
    shape: [
      [41, -109.05],
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
      [37, -109.05],
    ],
    from: GJT,
    name: ['WESTERN', 'SLOPE'],
    at: [40.42, -108.05],
    anchor: 'middle',
    cities: [
      { slug: 'grand-junction', c: GJT },
      { slug: 'glenwood-springs', c: GWS },
      { slug: 'montrose', c: MTJ },
      { slug: 'durango', c: DRO },
    ],
  },
  {
    id: 'san-luis-valley',
    shape: [
      [38.42, -106.08],
      [38.1, -105.75],
      [37.75, -105.5],
      [37.35, -105.45],
      [37, -105.55],
      [37, -106.15],
      [37.2, -106.3],
      [37.6, -106.45],
      [38.1, -106.35],
    ],
    from: ALS,
    name: ['SAN LUIS', 'VALLEY'],
    at: [38.78, -105.95],
    anchor: 'middle',
    cities: [{ slug: 'alamosa', c: ALS }],
  },
];

const BANDS = 6;
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
      .fromTo(g.querySelectorAll('.nx-rg-band'), { opacity: 0 }, { opacity: 1, duration: 0.06, stagger: 0.03 }, s)
      .fromTo(g.querySelectorAll('.nx-rg-name'), { opacity: 0, y: 6 }, { opacity: 1, y: 0, ease: 'power2.out', duration: 0.08 }, s + 0.08);
    r.cities.forEach((c, k) => {
      const at = s + cityBand[k] * 0.03;
      const pin = g.querySelector(`[data-city="${c.slug}"]`)!;
      const dotR = c.hq ? 5.5 : 3.6;
      tl.fromTo(pin.querySelector('.nx-cv-dot'), { attr: { r: 0 }, opacity: 0 }, { attr: { r: dotR }, opacity: 1, ease: 'power2.out', duration: 0.04 }, at)
        .set(pin.querySelector('.nx-cv-ping'), { attr: { r: dotR }, opacity: 0.7 }, at + 0.01)
        .to(pin.querySelector('.nx-cv-ping'), { attr: { r: (c.hq ? 15 : 10) * 2.6 }, opacity: 0, ease: 'power1.out', duration: 0.12 }, at + 0.01);
      if (c.hq) tl.fromTo(pin.querySelectorAll('.nx-cv-ring, .nx-cv-halo'), { attr: { r: dotR }, opacity: 0 }, { attr: { r: 15 }, opacity: 1, ease: 'power2.out', duration: 0.08 }, at + 0.02);
    });
  });
  tl.to({}, { duration: 0.1 }, 0.9);
}

export function RegionsMap({ active }: { active: string | null }) {
  // `active` lights one region (from the rows beside the map); the figure dims the rest.
  return (
    <svg
      className="nx-cv-svg nx-rg"
      viewBox={`0 0 ${W} ${H}`}
      role="img"
      aria-label="Map of Colorado showing the three regions Ares staffs: the Front Range (Colorado Springs, headquarters, Denver, and Pueblo), the Western Slope (Grand Junction, Glenwood Springs, Montrose, and Durango), and the San Luis Valley (Alamosa)."
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
      {/* Bottom right, on the empty plains: top left is the Western Slope here. */}
      <text className="nx-cv-mono" x={W - 14} y={H - 16} textAnchor="end">
        COLORADO
      </text>
      {BUILT.map(({ r, bands, outline }) => {
        const [lx, ly] = xy(r.at);
        return (
          <g key={r.id} className="nx-rg-region" data-region={r.id} data-on={active === r.id || undefined}>
            <path className="nx-rg-wash" d={outline} />
            <path className="nx-rg-edge" d={outline} pathLength={1000} />
            {bands.map((band, k) => (
              <g key={k} className="nx-rg-band">
                {band.map(([cx, cy], j) => (
                  <circle key={j} cx={cx} cy={cy} r="1.5" />
                ))}
              </g>
            ))}
            <text className="nx-cv-mono nx-rg-name" x={lx} y={ly} textAnchor={r.anchor}>
              <tspan x={lx}>{r.name[0]}</tspan>
              <tspan x={lx} dy="1.25em">
                {r.name[1]}
              </tspan>
            </text>
            {r.cities.map((c) => {
              const [cx, cy] = xy(c.c);
              return (
                <g key={c.slug} className="nx-cv-pin nx-rg-pin" data-city={c.slug} data-hq={c.hq || undefined}>
                  <circle className="nx-cv-ping" cx={cx} cy={cy} r={c.hq ? 5.5 : 3.6} />
                  {c.hq && <circle className="nx-cv-halo" cx={cx} cy={cy} r={15} />}
                  {c.hq && <circle className="nx-cv-ring" cx={cx} cy={cy} r={15} />}
                  <circle className="nx-cv-dot" cx={cx} cy={cy} r={c.hq ? 5.5 : 3.6} />
                </g>
              );
            })}
          </g>
        );
      })}
    </svg>
  );
}
