import { useEffect, useLayoutEffect, useRef } from 'react';
import { CITIES, regionOf, type City, type Landmark, type Region } from './data';

// A city's region, drawn to scale (Region.bounds in data.ts; each plate's bounds keep its 480 by
// 500 shape in kilometres). The Front Range runs 37.95°N to 40.05°N, 106.2°W to 103.6°W; the
// Western Slope and San Luis Valley plates are set the same way (owner, 2026-11-22). The page's
// city is lit in rust; the region's other cities sit faint on its roads. A 25-mile scale bar
// keeps it honest. The drawing is SVG; the words are HTML laid over it, placed from the same
// projection, so they keep their CSS pixel sizes at every plate width (faint text never under 12px).
const W = 480;
const H = 500;

const STEP = 16;
const DOTS: [number, number][] = [];
for (let cy = STEP / 2; cy < H; cy += STEP) {
  for (let cx = STEP / 2; cx < W; cx += STEP) DOTS.push([cx, cy]);
}

const fmt = (v: number, pos: string, neg: string) => `${Math.abs(v).toFixed(2)}° ${v >= 0 ? pos : neg}`;

type Label = { text: string; cls: string; px: number; py: number; dx?: number; dy?: number; end?: boolean; center?: boolean; note?: string };

// A label pinned to a point of the drawing: `dx` and `dy` are CSS-pixel offsets from the
// point, `end` sets the text to finish at the point instead of starting there, and `note`
// follows the text on the same line in the faint mono.
function Pin({ text, cls, px, py, dx = 0, dy = 0, end, center, note }: Label) {
  return (
    <span
      className={`ds-loc-pin ${cls}`}
      data-end={end || undefined}
      data-center={center || undefined}
      style={{ left: `calc(${(px / W) * 100}% + ${dx}px)`, top: `calc(${(py / H) * 100}% + ${dy}px)`, ['--dx' as string]: `${dx}px` }}
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
  bounds,
}: {
  focus: City;
  landmarks?: Landmark[];
  focusSide?: 'left' | 'right';
  /** The city's own window on its region (LocationFile.bounds), else the region's plate. */
  bounds?: Region['bounds'];
}) {
  const region = regionOf(focus.region);
  const { lon0, lon1, lat0, lat1 } = bounds ?? region.bounds;
  const x = (lon: number) => ((lon - lon0) / (lon1 - lon0)) * W;
  const y = (lat: number) => ((lat0 - lat) / (lat0 - lat1)) * H;
  const line = (pts: [number, number][]) => pts.map(([lat, lon], i) => `${i ? 'L' : 'M'}${x(lon).toFixed(1)} ${y(lat).toFixed(1)}`).join(' ');
  // 25 miles at the plate's middle latitude: 40.23 km / (111.32 km × cos lat) degrees of longitude.
  const midLat = ((lat0 + lat1) / 2) * (Math.PI / 180);
  const miles25 = (40.23 / (111.32 * Math.cos(midLat)) / (lon1 - lon0)) * W;
  // The region's other cities that fall on this plate.
  const onPlate = (c: City) => c.coord.lon >= lon0 && c.coord.lon <= lon1 && c.coord.lat <= lat0 && c.coord.lat >= lat1;
  const others = CITIES.filter((c) => c.slug !== focus.slug && c.region === focus.region && onPlate(c));
  const fx = x(focus.coord.lon);
  const fy = y(focus.coord.lat);

  // A name set to the right of its dot that would run past the map's right edge (on a phone, Glenwood
  // Springs on the Western Slope plate, Trinidad on the San Luis Valley's) moves to the dot's left,
  // when it fits there (owner, 2026-11-22). Measured on load and whenever the map's width changes.
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fit = () => {
      const box = el.getBoundingClientRect();
      el.querySelectorAll<HTMLElement>('.ds-loc-pin:not([data-end]):not([data-center])').forEach((pin) => {
        pin.removeAttribute('data-flip');
        const r = pin.getBoundingClientRect();
        if (r.right <= box.right - 4) return;
        pin.setAttribute('data-flip', '');
        if (pin.getBoundingClientRect().left < box.left + 4) pin.removeAttribute('data-flip');
      });
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    document.fonts?.ready.then(fit);
    return () => ro.disconnect();
  }, [focus.slug]);

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
      aria-label={`Map of Colorado's ${region.name}, with ${focus.name} marked${others.length ? `, and ${others.map((c) => c.name).join(', ')} nearby` : ''}.`}
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
        {region.borders?.map((b) => (
          <path key={b.label} d={line(b.points)} fill="none" stroke="#2c3037" strokeWidth="1" strokeDasharray="4 5" />
        ))}
        {region.roads.map((r) => (
          <path key={r.name} className="ds-loc-route" d={line(r.points)} pathLength={1} fill="none" stroke="#5a6069" strokeWidth="1.25" />
        ))}

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

        <g transform={`translate(${W - 16 - miles25} ${H - 22})`}>
          <path d={`M0 0 V8 H${miles25} V0`} fill="none" stroke="#7d838c" strokeWidth="1" />
        </g>
      </svg>

      <div className="ds-loc-pins" aria-hidden="true">
        <Pin text={region.name.toUpperCase()} cls="ds-loc-faint" px={16} py={28} />
        {region.roads.map((r) => (
          <Pin key={r.name} text={r.name} cls="ds-loc-faint" px={x(r.label[1])} py={y(r.label[0])} dx={10} />
        ))}
        {region.borders?.map((b) => (
          <Pin key={b.label} text={b.label} cls="ds-loc-faint" px={x(b.at[1])} py={y(b.at[0])} dx={b.end ? -8 : 8} dy={b.below ? 12 : -12} end={b.end} />
        ))}
        {landmarks.map((l) => (
          <span key={l.label}>
            {l.above ? (
              // On one line, centered above its triangle, where a road runs beside it (Blanca Peak).
              <Pin text={l.label} note={l.note} cls="ds-loc-landmark" px={x(l.lon)} py={y(l.lat)} dy={-22} center />
            ) : l.inline ? (
              // One line, lifted 6px so it clears the city's name below (owner, 2026-10-08).
              <Pin text={l.label} note={l.note} cls="ds-loc-landmark" px={x(l.lon)} py={y(l.lat)} dx={l.side === 'left' ? -14 : 14} dy={-6} end={l.side === 'left'} />
            ) : (
              <Pin text={l.label} cls="ds-loc-landmark" px={x(l.lon)} py={y(l.lat) - 4} dx={l.side === 'left' ? -14 : 14} end={l.side === 'left'} />
            )}
            {l.note && !l.inline && !l.above && (
              <Pin text={l.note} cls="ds-loc-faint" px={x(l.lon)} py={y(l.lat) + 14} dx={l.side === 'left' ? -14 : 14} end={l.side === 'left'} />
            )}
          </span>
        ))}
        {others.map((c) => (
          <Pin key={c.slug} text={c.name} cls="ds-loc-other" px={x(c.coord.lon)} py={y(c.coord.lat)} dx={c.side === 'left' ? -12 : 12} end={c.side === 'left'} />
        ))}
        <Pin text={focus.name} cls="ds-loc-focus" px={fx} py={fy} dx={focusSide === 'left' ? -22 : 22} end={focusSide === 'left'} />
        <Pin text={`${fmt(focus.coord.lat, 'N', 'S')}  ${fmt(focus.coord.lon, 'E', 'W')}`} cls="ds-loc-faint" px={16} py={H - 22} />
        <Pin text="25 MI" cls="ds-loc-faint" px={W - 16} py={H - 36} end />
      </div>
    </figure>
  );
}
