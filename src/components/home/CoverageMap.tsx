// Colorado, drawn to scale: 37°N to 41°N, 102.05°W to 109.05°W (a near rectangle),
// with each city plotted from its real coordinates and Interstate 25 traced through them.
const W = 544;
const H = 400;
const x = (lon: number) => ((lon + 109.05) / 7) * W;
const y = (lat: number) => ((41 - lat) / 4) * H;

const CITIES = [
  { name: 'Denver', lat: 39.7392, lon: -104.9903, hq: false },
  { name: 'Colorado Springs', lat: 38.8339, lon: -104.8214, hq: true },
  { name: 'Pueblo', lat: 38.2544, lon: -104.6091, hq: false },
];

// Wyoming line, Fort Collins, Denver, Colorado Springs, Pueblo, Trinidad, New Mexico line.
const I25: [number, number][] = [
  [41, -105.0],
  [40.585, -105.08],
  [39.7392, -104.9903],
  [38.8339, -104.8214],
  [38.2544, -104.6091],
  [37.1695, -104.5005],
  [37, -104.47],
];

const STEP = 16;
const DOTS: [number, number][] = [];
for (let cy = STEP / 2; cy < H; cy += STEP) {
  for (let cx = STEP / 2; cx < W; cx += STEP) DOTS.push([cx, cy]);
}

export default function CoverageMap() {
  const route = I25.map(([lat, lon], i) => `${i ? 'L' : 'M'}${x(lon).toFixed(1)} ${y(lat).toFixed(1)}`).join(' ');
  const hq = CITIES.find((c) => c.hq)!;

  return (
    <figure className="ds-map">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label="Map of Colorado showing Ares service areas along Interstate 25: Denver, Colorado Springs (headquarters), and Pueblo."
      >
        <defs>
          <radialGradient id="ds-map-glow">
            <stop offset="0%" stopColor="#bc6f40" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#8b4920" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect x="0.5" y="0.5" width={W - 1} height={H - 1} fill="none" stroke="#2c3037" />
        <g fill="#1f2328">
          {DOTS.map(([cx, cy], i) => (
            <circle key={i} cx={cx} cy={cy} r="1.3" />
          ))}
        </g>
        <circle cx={x(hq.lon)} cy={y(hq.lat)} r="120" fill="url(#ds-map-glow)" />
        <path className="ds-map-route" d={route} pathLength={1} fill="none" stroke="#5a6069" strokeWidth="1.25" />
        <text className="ds-map-label-faint" x={x(-104.9) + 10} y={y(40.3)}>I-25</text>
        <text className="ds-map-label-faint" x="14" y="24">COLORADO</text>
        {CITIES.map((c) => {
          const cx = x(c.lon);
          const cy = y(c.lat);
          return (
            <g key={c.name}>
              {c.hq && (
                <>
                  <circle className="ds-map-ring" cx={cx} cy={cy} r="14" fill="none" stroke="#bc6f40" />
                  <circle cx={cx} cy={cy} r="5" fill="#bc6f40" />
                </>
              )}
              {!c.hq && <circle cx={cx} cy={cy} r="4" fill="#eef0f2" />}
              <text className="ds-map-label" x={cx + (c.hq ? 22 : 14)} y={cy + 5}>
                {c.name}
              </text>
              {c.hq && (
                <text className="ds-map-label-faint" x={cx + 22} y={cy + 24}>HQ</text>
              )}
            </g>
          );
        })}
      </svg>
    </figure>
  );
}
