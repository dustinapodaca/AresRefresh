import { useEffect, useRef } from 'react';
import { CITIES, type City, type Landmark } from './data';

// The Front Range, drawn to scale: 37.95°N to 40.05°N, 106.2°W to 103.6°W (about 224 by
// 233 km, so the plate is nearly square). The page's city is lit in rust; the other two
// sit faint on I-25. A 25-mile scale bar keeps it honest.
// The drawing is SVG; the words are HTML laid over it, placed from the same projection, so
// they keep their CSS pixel sizes at every plate width (faint text never under 12px).
const W = 480;
const H = 500;
const LON0 = -106.2;
const LON1 = -103.6;
const LAT0 = 40.05;
const LAT1 = 37.95;
const x = (lon: number) => ((lon - LON0) / (LON1 - LON0)) * W;
const y = (lat: number) => ((LAT0 - lat) / (LAT0 - LAT1)) * H;

// Fort Collins, Denver, Colorado Springs, Pueblo, Walsenburg: I-25 runs off both edges.
const I25: [number, number][] = [
  [40.585, -105.08],
  [39.7392, -104.9903],
  [38.8339, -104.8214],
  [38.2544, -104.6091],
  [37.6247, -104.7803],
];

// 25 miles at 39°N: 40.23 km / (111.32 km × cos 39°) degrees of longitude.
const MILES_25 = (40.23 / (111.32 * Math.cos((39 * Math.PI) / 180)) / (LON1 - LON0)) * W;

const STEP = 16;
const DOTS: [number, number][] = [];
for (let cy = STEP / 2; cy < H; cy += STEP) {
  for (let cx = STEP / 2; cx < W; cx += STEP) DOTS.push([cx, cy]);
}

const fmt = (v: number, pos: string, neg: string) => `${Math.abs(v).toFixed(2)}° ${v >= 0 ? pos : neg}`;

type Label = { text: string; cls: string; px: number; py: number; dx?: number; dy?: number; end?: boolean; note?: string };

// A label pinned to a point of the drawing: `dx` and `dy` are CSS-pixel offsets from the
// point, `end` sets the text to finish at the point instead of starting there, and `note`
// follows the text on the same line in the faint mono.
function Pin({ text, cls, px, py, dx = 0, dy = 0, end, note }: Label) {
  return (
    <span
      className={`ds-loc-pin ${cls}`}
      data-end={end || undefined}
      style={{ left: `calc(${(px / W) * 100}% + ${dx}px)`, top: `calc(${(py / H) * 100}% + ${dy}px)` }}
    >
      {text}
      {note && <span className="ds-loc-faint ds-loc-pin-note">{note}</span>}
    </span>
  );
}

export default function LocationMap({
  focus,
  landmarks = [],
  focusSide = 'right',
}: {
  focus: City;
  landmarks?: Landmark[];
  focusSide?: 'left' | 'right';
}) {
  const route = I25.map(([lat, lon], i) => `${i ? 'L' : 'M'}${x(lon).toFixed(1)} ${y(lat).toFixed(1)}`).join(' ');
  const others = CITIES.filter((c) => c.slug !== focus.slug);
  const fx = x(focus.coord.lon);
  const fy = y(focus.coord.lat);

  // I-25 draws and the ring pulses once the map is well in view (owner, 2026-10-08), not on
  // load: on phones it sits below the copy. CSS holds the moment until data-play is set.
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
      { threshold: 0.5, rootMargin: '0px 0px -15% 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <figure
      ref={ref}
      className="ds-loc-map"
      role="img"
      aria-label={`Map of the Front Range along Interstate 25, with ${focus.name} marked between ${others.map((c) => c.name).join(' and ')}.`}
    >
      <svg viewBox={`0 0 ${W} ${H}`} aria-hidden="true">
        <defs>
          <radialGradient id="ds-loc-glow">
            <stop offset="0%" stopColor="#bc6f40" stopOpacity="0.38" />
            <stop offset="100%" stopColor="#8b4920" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect x="0.5" y="0.5" width={W - 1} height={H - 1} fill="none" stroke="#2c3037" />
        <g fill="#1f2328">
          {DOTS.map(([cx, cy], i) => (
            <circle key={i} cx={cx} cy={cy} r="1.3" />
          ))}
        </g>
        <circle cx={fx} cy={fy} r="120" fill="url(#ds-loc-glow)" />
        <path className="ds-loc-route" d={route} pathLength={1} fill="none" stroke="#5a6069" strokeWidth="1.25" />

        {/* A peak is an open triangle; an airport an open square. */}
        {landmarks.map((l) =>
          l.kind === 'airport' ? (
            <rect key={l.label} x={x(l.lon) - 4.5} y={y(l.lat) - 4.5} width="9" height="9" fill="none" stroke="#7d838c" strokeWidth="1.25" />
          ) : (
            <path
              key={l.label}
              d={`M${x(l.lon)} ${y(l.lat) - 7} L${x(l.lon) + 6.5} ${y(l.lat) + 5} L${x(l.lon) - 6.5} ${y(l.lat) + 5} Z`}
              fill="none"
              stroke="#7d838c"
              strokeWidth="1.25"
              strokeLinejoin="round"
            />
          ),
        )}

        {others.map((c) => (
          <circle key={c.slug} cx={x(c.coord.lon)} cy={y(c.coord.lat)} r="4" fill="#9aa0a8" />
        ))}

        {/* The ring stays; a second one pulses out from it (as on Home's map). */}
        <circle className="ds-loc-ring" cx={fx} cy={fy} r="14" fill="none" stroke="#bc6f40" />
        <circle className="ds-loc-pulse" cx={fx} cy={fy} r="14" fill="none" stroke="#bc6f40" />
        <circle cx={fx} cy={fy} r="5.5" fill="#bc6f40" />

        <g transform={`translate(${W - 16 - MILES_25} ${H - 22})`}>
          <path d={`M0 0 V8 H${MILES_25} V0`} fill="none" stroke="#7d838c" strokeWidth="1" />
        </g>
      </svg>

      <div className="ds-loc-pins" aria-hidden="true">
        <Pin text="FRONT RANGE" cls="ds-loc-faint" px={16} py={28} />
        <Pin text="I-25" cls="ds-loc-faint" px={x(-104.93)} py={y(39.3)} dx={10} />
        {landmarks.map((l) => (
          <span key={l.label}>
            {l.inline ? (
              // One line, lifted 6px so it clears the city's name below (owner, 2026-10-08).
              <Pin text={l.label} note={l.note} cls="ds-loc-landmark" px={x(l.lon)} py={y(l.lat)} dx={l.side === 'left' ? -14 : 14} dy={-6} end={l.side === 'left'} />
            ) : (
              <Pin text={l.label} cls="ds-loc-landmark" px={x(l.lon)} py={y(l.lat) - 4} dx={l.side === 'left' ? -14 : 14} end={l.side === 'left'} />
            )}
            {l.note && !l.inline && (
              <Pin text={l.note} cls="ds-loc-faint" px={x(l.lon)} py={y(l.lat) + 14} dx={l.side === 'left' ? -14 : 14} end={l.side === 'left'} />
            )}
          </span>
        ))}
        {others.map((c) => (
          <Pin key={c.slug} text={c.name} cls="ds-loc-other" px={x(c.coord.lon)} py={y(c.coord.lat)} dx={12} />
        ))}
        <Pin text={focus.name} cls="ds-loc-focus" px={fx} py={fy} dx={focusSide === 'left' ? -22 : 22} end={focusSide === 'left'} />
        <Pin text={`${fmt(focus.coord.lat, 'N', 'S')}  ${fmt(focus.coord.lon, 'E', 'W')}`} cls="ds-loc-faint" px={16} py={H - 22} />
        <Pin text="25 MI" cls="ds-loc-faint" px={W - 16} py={H - 36} end />
      </div>
    </figure>
  );
}
