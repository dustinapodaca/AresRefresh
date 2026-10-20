import { useRef, useState, type CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import Arrow from '../Arrow';
import { useMotion, useScene } from '../home/motion';
import { useMediaQuery } from '../home/useMediaQuery';
import { Statement } from './objects';

// 4.6 Where we work (owner, 2026-10-19; /home-next): the ground becomes the map, the payoff of the
// camera. As the camera reaches straight overhead (Ground.tsx), the contours give way to Colorado
// drawn to scale (37 to 41°N, 102.05 to 109.05°W, the coverage map's projection) in the same rust;
// the page's line draws I-25 from north to south, and the three cities pop onto it as Nodes as it
// passes (Colorado Springs, HQ, with the rust dot), Pikes Peak beside them as an open triangle. The
// three city names on the right, very large, are links to their pages; pointing at one flies the
// view toward that city (900ms) and lights its Node while the others dim. Phones: the map with I-25
// drawing on the scroll, then the three cities as large links; no fly.

const W = 544;
const H = 400;
const px = (lon: number) => ((lon + 109.05) / 7) * W;
const py = (lat: number) => ((41 - lat) / 4) * H;

const CITIES = [
  { key: 'denver', name: 'Denver', note: 'Service area', to: '/locations/denver', lat: 39.7392, lon: -104.9903, hq: false },
  { key: 'springs', name: 'Colorado Springs', note: 'HQ', to: '/locations/colorado-springs', lat: 38.8339, lon: -104.8214, hq: true },
  { key: 'pueblo', name: 'Pueblo', note: 'Service area', to: '/locations/pueblo', lat: 38.2544, lon: -104.6091, hq: false },
];
const I25: [number, number][] = [
  [41, -105.0],
  [40.585, -105.08],
  [39.7392, -104.9903],
  [38.8339, -104.8214],
  [38.2544, -104.6091],
  [37.1695, -104.5005],
  [37, -104.47],
];
const ROUTE = I25.map(([lat, lon], i) => `${i ? 'L' : 'M'}${px(lon).toFixed(1)} ${py(lat).toFixed(1)}`).join(' ');
// How far along I-25 each city sits (north to south), so its Node pops as the line reaches it.
const ALONG = (() => {
  const pts = I25.map(([lat, lon]) => [px(lon), py(lat)]);
  const seg = pts.slice(1).map((p, i) => Math.hypot(p[0] - pts[i][0], p[1] - pts[i][1]));
  const total = seg.reduce((a, b) => a + b, 0);
  return Object.fromEntries(CITIES.map((c) => [c.key, seg.slice(0, I25.findIndex(([a, o]) => a === c.lat && o === c.lon)).reduce((a, b) => a + b, 0) / total]));
})();
const PIKES = { lat: 38.8409, lon: -105.0442 };
const STEP = 16;
const DOTS: [number, number][] = [];
for (let cy = STEP / 2; cy < H; cy += STEP) for (let cx = STEP / 2; cx < W; cx += STEP) DOTS.push([cx, cy]);

export default function WhereNext() {
  const engine = useMotion();
  const wide = useMediaQuery('(min-width: 1024px) and (min-height: 640px)', false);
  const scene = !!engine && wide;
  const [lit, setLit] = useState<string | null>(null);
  const ref = useRef<HTMLElement>(null);
  const fly = useRef<((key: string | null) => void) | null>(null);

  useScene(
    ref,
    ({ gsap, ScrollTrigger }, root) => {
      const route = root.querySelector<SVGPathElement>('.hn-map-route')!;
      const map = root.querySelector<HTMLElement>('.hn-map')!;
      const nodes = Array.from(root.querySelectorAll<HTMLElement>('.hn-city-node'));
      const notes = root.querySelectorAll('.hn-map-note');
      const tl = gsap.timeline({ defaults: { ease: 'none' } });
      tl.fromTo(map, { opacity: 0, scale: 1.08 }, { opacity: 1, scale: 1, duration: 0.5 }, 0)
        .fromTo(route, { strokeDasharray: 1, strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1.4 }, 0.4);
      nodes.forEach((n) => {
        const at = 0.4 + Number(n.dataset.along) * 1.4 * 0.92;
        tl.fromTo(n, { autoAlpha: 0, scale: 0.6 }, { autoAlpha: 1, scale: 1.08, duration: 0.12 }, at).to(n, { scale: 1, duration: 0.1 }, at + 0.12);
      });
      tl.fromTo(notes, { opacity: 0 }, { opacity: 1, duration: 0.2, stagger: 0.05 }, 1.7).to({}, { duration: 0.6 }, 2);
      if (scene) {
        ScrollTrigger.create({
          trigger: root.querySelector('.hn-where-scene'),
          start: 'top top',
          end: () => `+=${window.innerHeight * 1.4}`,
          pin: true,
          scrub: true,
          animation: tl,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        });
        // Pointing at a city flies the view toward it.
        const pan = root.querySelector<HTMLElement>('.hn-map-pan')!;
        fly.current = (key) => {
          const c = CITIES.find((x) => x.key === key);
          if (!c) {
            gsap.to(pan, { scale: 1, '--z': 1, x: 0, y: 0, duration: 0.9, ease: 'power3.inOut', overwrite: true });
            return;
          }
          // Scale about the middle, then move the city most of the way to the middle. The labels
          // keep their size (--z counter-scales them).
          const fx = px(c.lon) / W;
          const fy = py(c.lat) / H;
          const z = 1.8;
          gsap.to(pan, { scale: z, '--z': z, x: (0.5 - fx) * pan.offsetWidth * z * 0.75, y: (0.5 - fy) * pan.offsetHeight * z * 0.75, transformOrigin: '50% 50%', duration: 0.9, ease: 'power3.inOut', overwrite: true });
        };
        requestAnimationFrame(() => ScrollTrigger.refresh());
      } else {
        ScrollTrigger.create({ trigger: map, start: 'top 80%', end: 'bottom 45%', scrub: true, animation: tl });
      }
      return () => {
        fly.current = null;
      };
    },
    [scene],
  );

  const point = (key: string | null) => {
    setLit(key);
    fly.current?.(key);
  };

  return (
    <section ref={ref} id="coverage" className="hn-where" data-scene={scene ? 'on' : undefined} aria-labelledby="where-title">
      <div className="hn-where-scene">
        <div className="ds-container hn-where-grid">
          <div className="hn-where-copy">
            <Statement id="where-title" className="hn-where-title">
              Where we work.
            </Statement>
            <p className="ds-lead hn-where-lead">Armed and unarmed officers for federal, commercial, industrial, and institutional sites, from our base in Colorado Springs.</p>
          </div>

          <figure className="hn-map" data-lit={lit ?? undefined}>
            <div className="hn-map-pan">
              <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Map of Colorado showing Ares service areas along Interstate 25: Denver, Colorado Springs (headquarters), and Pueblo, with Pikes Peak.">
                <rect x="0.5" y="0.5" width={W - 1} height={H - 1} fill="rgb(0 0 0 / 0.55)" stroke="rgb(188 111 64 / 0.45)" />
                <g fill="rgb(188 111 64 / 0.22)">
                  {DOTS.map(([cx, cy], i) => (
                    <circle key={i} cx={cx} cy={cy} r="1.1" />
                  ))}
                </g>
                <path className="hn-map-route" d={ROUTE} pathLength={1} fill="none" />
                <text className="hn-map-note hn-map-faint" x={px(-104.9) + 10} y={py(40.3)}>I-25</text>
                <text className="hn-map-note hn-map-faint" x="14" y="24">COLORADO</text>
                <g className="hn-map-note">
                  <path d={`M${px(PIKES.lon)} ${py(PIKES.lat) - 6} L${px(PIKES.lon) + 5.5} ${py(PIKES.lat) + 4} L${px(PIKES.lon) - 5.5} ${py(PIKES.lat) + 4} Z`} fill="none" stroke="#7d838c" strokeWidth="1.25" strokeLinejoin="round" />
                  <text className="hn-map-faint" x={px(PIKES.lon) - 12} y={py(PIKES.lat) + 4} textAnchor="end">PIKES PEAK</text>
                </g>
                {CITIES.map((c) => (
                  <rect key={c.key} className="hn-map-pin" data-hq={c.hq ? 'true' : undefined} x={px(c.lon) - 3.5} y={py(c.lat) - 3.5} width="7" height="7" rx="1.5" />
                ))}
              </svg>
              {/* The cities as Nodes on the map. */}
              {CITIES.map((c) => (
                <span
                  key={c.key}
                  className="hn-city-node"
                  data-on={lit === c.key ? 'true' : undefined}
                  data-along={ALONG[c.key]}
                  style={{ left: `${(px(c.lon) / W) * 100}%`, top: `${(py(c.lat) / H) * 100}%` } as CSSProperties}
                  aria-hidden="true"
                >
                  <span className="hn-node-bar" data-hq={c.hq ? 'true' : undefined}>
                    <span className="hn-node-dot" />
                    <span className="hn-node-label">{c.name}</span>
                    <span className="hn-node-meta">{c.note}</span>
                  </span>
                </span>
              ))}
            </div>
          </figure>

          <ul className="hn-where-cities">
            {CITIES.map((c) => (
              <li key={c.key}>
                <Link
                  to={c.to}
                  data-cursor="OPEN PAGE"
                  data-lit={lit === c.key ? 'true' : undefined}
                  onPointerEnter={(e) => e.pointerType === 'mouse' && point(c.key)}
                  onPointerLeave={(e) => e.pointerType === 'mouse' && point(null)}
                  onFocus={() => point(c.key)}
                  onBlur={() => point(null)}
                >
                  <span>{c.name}</span>
                  <span className="ds-data">{c.hq ? 'Headquarters' : c.note}</span>
                  <Arrow size={22} />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
