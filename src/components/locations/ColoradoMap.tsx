import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { CITIES, REGIONS } from './data';

// Colorado to scale for the Service Areas hub (owner, 2026-11-22: Colorado-wide). The state is a
// box, 41°N to 37°N and 109.05°W to 102.05°W, about 605 by 442 km, so the plate is 700 by 512. The
// dot grid fills it; the main roads draw as the map comes into view (I-25 and I-70 in the route grey,
// the highways to the Western Slope and the San Luis Valley a step fainter); every city Ares staffs
// is a dot with its name beside it, a link to its page. Colorado Springs, the headquarters, is lit in
// rust with a small "HQ, since 2021" callout (after Cloudflare's "Where we work" map on Mobbin).
// `active` lights one city from the hub's list. The words are HTML over the drawing, in CSS pixels.
const W = 700;
const H = 512;
const LON0 = -109.05;
const LON1 = -102.05;
const LAT0 = 41;
const LAT1 = 37;
const x = (lon: number) => ((lon - LON0) / (LON1 - LON0)) * W;
const y = (lat: number) => ((LAT0 - lat) / (LAT0 - LAT1)) * H;
const line = (pts: [number, number][]) => pts.map(([lat, lon], i) => `${i ? 'L' : 'M'}${x(lon).toFixed(1)} ${y(lat).toFixed(1)}`).join(' ');

const STEP = 14;
const DOTS: [number, number][] = [];
for (let cy = STEP / 2; cy < H; cy += STEP) {
  for (let cx = STEP / 2; cx < W; cx += STEP) DOTS.push([cx, cy]);
}

// I-25 from Wyoming to New Mexico; I-70 from Utah to Kansas, through Grand Junction, Glenwood
// Springs, the mountains, and Denver.
const MAIN: { name: string; pts: [number, number][]; at: [number, number] }[] = [
  {
    name: 'I-25',
    pts: [
      [41.0, -104.86],
      [40.585, -105.08],
      [39.7392, -104.9903],
      [38.8339, -104.8214],
      [38.2544, -104.6091],
      [37.6247, -104.7803],
      [37.0, -104.5],
    ],
    at: [40.25, -104.95],
  },
  {
    name: 'I-70',
    pts: [
      [39.17, -109.05],
      [39.159, -108.73],
      [39.0639, -108.5506],
      [39.45, -108.05],
      [39.535, -107.783],
      [39.5505, -107.3248],
      [39.655, -106.83],
      [39.63, -106.06],
      [39.7, -105.7],
      [39.74, -105.2],
      [39.7392, -104.9903],
      [39.7, -104.4],
      [39.26, -103.69],
      [39.27, -102.05],
    ],
    at: [39.36, -103.2],
  },
];

// The highways that reach the other cities: US-50 and US-550 (Grand Junction, Montrose, Durango) and
// US-160 (Durango, Alamosa, Walsenburg).
const SIDE: [number, number][][] = [
  [
    [39.0639, -108.5506],
    [38.742, -108.069],
    [38.4783, -107.8762],
    [38.153, -107.756],
    [38.023, -107.671],
    [37.812, -107.664],
    [37.2753, -107.8801],
  ],
  [
    [37.2753, -107.8801],
    [37.27, -107.25],
    [37.44, -106.8],
    [37.678, -106.353],
    [37.5794, -106.148],
    [37.4695, -105.87],
    [37.43, -105.433],
    [37.59, -105.2],
    [37.6247, -104.7803],
  ],
];

// Where each region's name sits on the plate (faint, mono, uppercase).
const REGION_AT: Record<string, { at: [number, number]; end?: boolean }> = {
  'front-range': { at: [40.62, -104.15] },
  'western-slope': { at: [40.05, -108.95] },
  // Between Durango's name and Trinidad's (none of the region names show on a phone, areas.css) at the right keeps clear of it on a phone (2026-11-22).
  'san-luis-valley': { at: [37.2, -106.62] },
};

const HQ = CITIES.find((c) => c.slug === 'colorado-springs')!;

export default function ColoradoMap({ active }: { active?: string | null }) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        el.setAttribute('data-play', '');
        io.disconnect();
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const hx = x(HQ.coord.lon);
  const hy = y(HQ.coord.lat);

  return (
    <figure
      ref={ref}
      className="ds-loc-map ds-sa-map"
      data-active={active || undefined}
      aria-label={`Map of Colorado with the ${CITIES.length} cities Ares staffs: ${CITIES.map((c) => c.name).join(', ')}. Headquarters in Colorado Springs.`}
      role="img"
    >
      <svg viewBox={`0 0 ${W} ${H}`} aria-hidden="true">
        <defs>
          <radialGradient id="ds-sa-glow">
            <stop offset="0%" stopColor="#bc6f40" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#8b4920" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect x="0.5" y="0.5" width={W - 1} height={H - 1} fill="none" stroke="#2c3037" />
        <g fill="#1f2328">
          {DOTS.map(([cx, cy], i) => (
            <circle key={i} cx={cx} cy={cy} r="1.2" />
          ))}
        </g>
        <circle cx={hx} cy={hy} r="110" fill="url(#ds-sa-glow)" />
        {SIDE.map((pts, i) => (
          <path key={i} className="ds-loc-route ds-sa-side" d={line(pts)} pathLength={1} fill="none" stroke="#3a3f47" strokeWidth="1" />
        ))}
        {MAIN.map((r) => (
          <path key={r.name} className="ds-loc-route" d={line(r.pts)} pathLength={1} fill="none" stroke="#5a6069" strokeWidth="1.25" />
        ))}
        {CITIES.filter((c) => c.slug !== HQ.slug).map((c) => (
          <g key={c.slug} className="ds-sa-dot" data-city={c.slug}>
            <circle className="ds-sa-dot-ring" cx={x(c.coord.lon)} cy={y(c.coord.lat)} r="11" fill="none" stroke="#eef0f2" />
            <circle cx={x(c.coord.lon)} cy={y(c.coord.lat)} r="4" />
          </g>
        ))}
        <g className="ds-sa-dot ds-sa-hq" data-city={HQ.slug}>
          <circle className="ds-loc-ring" cx={hx} cy={hy} r="13" fill="none" stroke="#bc6f40" />
          <circle className="ds-loc-pulse" cx={hx} cy={hy} r="13" fill="none" stroke="#bc6f40" />
          <circle cx={hx} cy={hy} r="5.5" fill="#bc6f40" />
        </g>
      </svg>

      <div className="ds-loc-pins">
        {REGIONS.map((r) => {
          const p = REGION_AT[r.id];
          return (
            <span
              key={r.id}
              className="ds-loc-pin ds-loc-faint"
              data-region={r.id}
              aria-hidden="true"
              style={{ left: `${(x(p.at[1]) / W) * 100}%`, top: `${(y(p.at[0]) / H) * 100}%` }}
            >
              {r.name.toUpperCase()}
            </span>
          );
        })}
        {MAIN.map((r) => (
          <span
            key={r.name}
            className="ds-loc-pin ds-loc-faint"
            aria-hidden="true"
            style={{ left: `calc(${(x(r.at[1]) / W) * 100}% + 8px)`, top: `${(y(r.at[0]) / H) * 100}%` }}
          >
            {r.name}
          </span>
        ))}
        {/* Each city's name is a link to its page, so the map works as an index too. */}
        {CITIES.map((c) => {
          // Every name to the right of its dot here (the region maps set their own sides).
          const left = false;
          const isHq = c.slug === HQ.slug;
          return (
            <Link
              key={c.slug}
              to={c.path}
              tabIndex={-1}
              aria-hidden="true"
              className={`ds-loc-pin ds-sa-pin${isHq ? ' ds-sa-pin-hq' : ''}`}
              data-city={c.slug}
              data-end={left || undefined}
              style={{
                left: `calc(${(x(c.coord.lon) / W) * 100}% + ${left ? -14 : isHq ? 20 : 14}px)`,
                top: `${(y(c.coord.lat) / H) * 100}%`,
              }}
            >
              {c.name}
              {isHq && <span className="ds-sa-hq-note ds-loc-faint">HQ, since 2021</span>}
            </Link>
          );
        })}
      </div>
    </figure>
  );
}
