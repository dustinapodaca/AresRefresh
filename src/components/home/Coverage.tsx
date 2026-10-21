import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Arrow from '../Arrow';
import { readIn, useScene, words } from './engine';
import './nx-coverage.css';

// 04 Coverage (home-flora, 2026-10-20): the line becomes I-25. Colorado drawn to scale (the Home
// map's projection: 37°N to 41°N, 102.05°W to 109.05°W) with the interstate drawing itself north
// to south as the section scrolls past, each city's pin coming up as the line reaches it. The
// three cities are set large beside the map; pointing at one (or focusing it) lights its pin and
// dims the others. Resolved: the whole route drawn, every pin lit.

const W = 544;
const H = 400;
const px = (lon: number) => ((lon + 109.05) / 7) * W;
const py = (lat: number) => ((41 - lat) / 4) * H;

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
const PTS = I25.map(([lat, lon]) => [px(lon), py(lat)] as const);
const ROUTE = PTS.map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(1)} ${y.toFixed(1)}`).join(' ');
// How far along the route each vertex sits (0 to 1), so a pin comes up as the line reaches it.
const CUM = PTS.reduce<number[]>((acc, p, i) => {
  if (i === 0) return [0];
  const [x0, y0] = PTS[i - 1];
  return [...acc, acc[i - 1] + Math.hypot(p[0] - x0, p[1] - y0)];
}, []);
const AT = CUM.map((d) => d / CUM[CUM.length - 1]);

const CITIES = [
  { slug: 'colorado-springs', to: '/locations/colorado-springs', name: 'Colorado Springs', note: 'Headquarters', lat: 38.8339, lon: -104.8214, hq: true, at: AT[3] },
  { slug: 'denver', to: '/locations/denver', name: 'Denver', note: 'Service area', lat: 39.7392, lon: -104.9903, hq: false, at: AT[2] },
  { slug: 'pueblo', to: '/locations/pueblo', name: 'Pueblo', note: 'Service area', lat: 38.2544, lon: -104.6091, hq: false, at: AT[4] },
];
const PIKES = { lat: 38.8409, lon: -105.0442 };

const STEP = 16;
const DOTS: [number, number][] = [];
for (let cy = STEP / 2; cy < H; cy += STEP) for (let cx = STEP / 2; cx < W; cx += STEP) DOTS.push([cx, cy]);

export default function Coverage() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState<string | null>(null);

  useScene(ref, (e, root) => {
    const { gsap } = e;
    readIn(e, root.querySelector('.nx-cv-title'));
    const map = root.querySelector<SVGSVGElement>('.nx-cv-svg')!;
    const route = map.querySelector<SVGPathElement>('.nx-cv-route')!;
    const tip = map.querySelector<SVGGElement>('.nx-cv-tip')!;
    const len = route.getTotalLength();
    const tl = gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: {
        trigger: map,
        start: 'top 78%',
        end: 'bottom 45%',
        scrub: 0.6,
        onUpdate: (self) => {
          const p = route.getPointAtLength(len * Math.min(1, self.progress / 0.86));
          tip.setAttribute('transform', `translate(${p.x} ${p.y})`);
        },
      },
    });
    // pathLength 1000, not 1: GSAP rounds px values to whole numbers, so 0 to 1 only jumps.
    tl.fromTo(route, { strokeDashoffset: 1000 }, { strokeDashoffset: 0, duration: 0.86 }, 0)
      .fromTo(tip, { opacity: 0 }, { opacity: 1, duration: 0.03 }, 0)
      .to(tip, { opacity: 0, duration: 0.06 }, 0.88)
      .fromTo(map.querySelectorAll('.nx-cv-faint'), { opacity: 0 }, { opacity: 1, duration: 0.12, stagger: 0.04 }, 0.8);
    CITIES.forEach((c) => {
      const g = map.querySelector(`[data-city="${c.slug}"]`)!;
      const at = c.at * 0.86;
      tl.fromTo(g.querySelector('.nx-cv-dot'), { scale: 0, transformOrigin: '50% 50%' }, { scale: 1, ease: 'back.out(3)', duration: 0.05 }, at)
        .fromTo(g.querySelectorAll('.nx-cv-label'), { opacity: 0, x: -10 }, { opacity: 1, x: 0, duration: 0.06 }, at + 0.02)
        .fromTo(g.querySelector('.nx-cv-ring'), { scale: 0.2, opacity: 0, transformOrigin: '50% 50%' }, { scale: 1, opacity: 1, duration: 0.08 }, at);
    });
    gsap.fromTo(
      root.querySelectorAll('.nx-cv-city'),
      { yPercent: 60, opacity: 0.1 },
      {
        yPercent: 0,
        opacity: 1,
        ease: 'none',
        stagger: 0.12,
        scrollTrigger: { trigger: root.querySelector('.nx-cv-cities'), start: 'top 90%', end: 'top 45%', scrub: 0.6 },
      },
    );
    e.ScrollTrigger.sort();
  });

  const on = (slug: string | null) => () => setActive(slug);

  return (
    <section ref={ref} id="coverage" className="nx-coverage" aria-labelledby="nx-coverage-title">
      <div className="nx-cv-head">
        <h2 id="nx-coverage-title" className="nx-statement nx-cv-title">
          {words('Where we work.')}
        </h2>
        <p className="nx-cv-lead">
          Armed and unarmed officers for federal, commercial, industrial, and institutional sites, from
          our base in Colorado Springs.
        </p>
      </div>

      <div className="nx-cv-body">
        <ul className="nx-cv-cities">
          {CITIES.map((c) => (
            <li key={c.slug}>
              <Link
                to={c.to}
                className="nx-cv-city"
                data-on={active === c.slug || undefined}
                onMouseEnter={on(c.slug)}
                onMouseLeave={on(null)}
                onFocus={on(c.slug)}
                onBlur={on(null)}
              >
                <span className="nx-cv-city-name">{c.name}</span>
                <span className="nx-cv-city-note ds-data">{c.hq ? 'HQ' : c.note}</span>
                <Arrow size={28} />
              </Link>
            </li>
          ))}
        </ul>

        <figure className="nx-cv-map" data-active={active || undefined}>
          <svg
            className="nx-cv-svg"
            viewBox={`0 0 ${W} ${H}`}
            role="img"
            aria-label="Map of Colorado showing Ares service areas along Interstate 25: Denver, Colorado Springs (headquarters), and Pueblo, with Pikes Peak."
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
            <circle cx={px(-104.8214)} cy={py(38.8339)} r="150" fill="url(#nx-cv-glow)" />
            <path d={ROUTE} fill="none" stroke="#2c3037" strokeWidth="1" strokeDasharray="3 5" />
            <path className="nx-cv-route" d={ROUTE} pathLength={1000} fill="none" filter="url(#nx-cv-bloom)" />
            <g className="nx-cv-tip">
              <circle r="9" fill="#e8965f" opacity="0.25" />
              <circle r="3.2" fill="#f2b98e" />
            </g>
            <text className="nx-cv-faint nx-cv-mono" x={px(-104.9) + 12} y={py(40.3)}>
              I-25
            </text>
            <text className="nx-cv-faint nx-cv-mono" x="14" y="26">
              COLORADO
            </text>
            <g className="nx-cv-faint">
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
            {CITIES.map((c) => {
              const cx = px(c.lon);
              const cy = py(c.lat);
              return (
                <g key={c.slug} className="nx-cv-pin" data-city={c.slug} data-hq={c.hq || undefined} data-on={active === c.slug || undefined}>
                  <circle className="nx-cv-ring" cx={cx} cy={cy} r={c.hq ? 15 : 11} />
                  <circle className="nx-cv-dot" cx={cx} cy={cy} r={c.hq ? 5.5 : 4.2} />
                  <text className="nx-cv-label nx-cv-name" x={cx + (c.hq ? 24 : 16)} y={cy + 6}>
                    {c.name}
                  </text>
                  {c.hq && (
                    <text className="nx-cv-label nx-cv-mono" x={cx + 24} y={cy + 25}>
                      HQ
                    </text>
                  )}
                </g>
              );
            })}
          </svg>
        </figure>
      </div>
    </section>
  );
}
