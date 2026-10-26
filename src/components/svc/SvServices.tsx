import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import Arrow from '../Arrow';
import { CAPABILITIES } from '../capability/data';
import { ROLE_PAGES } from '../market/roles';
import { motionAllowed, readIn, useScene, words, SCRUB } from '../home/engine';
import './sv-services.css';

// 01 Services (home-flora, 2026-10-22), after FLORA's "01 Ideate / 02 Iterate / 03 Scale" panels:
// six tall panels, each a big number and one word at the top, a small working piece of the post
// in the middle, and the service at the foot. The pieces are examples, labeled so in their bars,
// never records: a qualification card, a patrol round, a visitor log, an escort plan, a relief
// week, and a patrol route. They run only while their panel is in view; with reduced motion, no
// JavaScript, or the prerender they sit still, fully drawn. Desktop: three across, two rows, rising
// in a stagger. Phones: one swipe row with a counter, so the section stays about a screen tall.

const n2 = (i: number) => String(i + 1).padStart(2, '0');
const slugFor = (id: string) => ROLE_PAGES.find((r) => r.capabilityId === id)?.slug;
const WORD: Record<string, string> = {
  armed: 'Armed',
  unarmed: 'Unarmed',
  access: 'Access',
  escort: 'Escort',
  relief: 'Relief',
  vehicle: 'Patrol',
};

const iv = (i: number) => ({ ['--i' as string]: i }) as CSSProperties;

function Bar({ label }: { label: string }) {
  return (
    <p className="svs-bar">
      <span>{label}</span>
    </p>
  );
}

function Check() {
  return (
    <svg viewBox="0 0 12 12" aria-hidden="true">
      <path d="M2.5 6.3 5 8.6 9.6 3.6" />
    </svg>
  );
}

// Armed: officers ticking to qualified and current.
function Qualification() {
  return (
    <>
      <Bar label="Qualification" />
      <ul className="svs-q">
        {['Officer A', 'Officer B', 'Officer C'].map((o, i) => (
          <li key={o} style={iv(i)}>
            <span className="svs-q-who">
              <i aria-hidden="true" />
              {o}
            </span>
            <span className="svs-q-state">
              <span className="svs-q-wait">Pending</span>
              <span className="svs-q-ok">
                <Check />
                Qualified · current
              </span>
            </span>
          </li>
        ))}
      </ul>
      <p className="svs-foot">Firearms · License · Post orders</p>
    </>
  );
}

// Unarmed: a round of five checkpoints, each logged.
const ROUND = [
  ['North gate', '22:00'],
  ['Loading dock', '22:12'],
  ['Lobby', '22:24'],
  ['East lot', '22:37'],
  ['Roof access', '22:50'],
];
function Round() {
  return (
    <>
      <Bar label="Patrol round" />
      <ol className="svs-r">
        {ROUND.map(([name, t], i) => (
          <li key={name} style={iv(i)}>
            <span className="svs-r-box">
              <Check />
            </span>
            <span className="svs-r-name">
              <b>{n2(i)}</b> {name}
            </span>
            <span className="svs-r-time">{t}</span>
          </li>
        ))}
      </ol>
    </>
  );
}

// Access: a visitor log filling from the top.
const LOG = [
  ['07:42', 'Visitor 0412', 'ID checked', 'ok'],
  ['07:55', 'Delivery 0413', 'Escort', 'esc'],
  ['08:03', 'Visitor 0414', 'ID checked', 'ok'],
  ['08:10', 'Visitor 0415', 'Denied', 'no'],
];
function VisitorLog() {
  return (
    <>
      <Bar label="Visitor log" />
      <ul className="svs-v">
        {LOG.map(([t, who, status, kind], i) => (
          <li key={who} style={iv(i)}>
            <span className="svs-v-time">{t}</span>
            <span className="svs-v-who">{who}</span>
            <span className="svs-v-tag" data-kind={kind}>
              {status}
            </span>
          </li>
        ))}
      </ul>
    </>
  );
}

// Escort: a plan view of a restricted area; the escort and the visitor move together.
const ESCORT_PATH = 'M18 150 L70 150 L70 104 L150 104 L150 58 L232 58';
function EscortPlan() {
  return (
    <>
      <Bar label="Escort plan" />
      <svg className="svs-svg svs-e" viewBox="0 0 260 180" aria-hidden="true">
        <rect className="svs-e-zone" x="52" y="24" width="196" height="146" rx="2" />
        <text className="svs-e-label" x="236" y="40" textAnchor="end">
          RESTRICTED
        </text>
        <rect className="svs-e-gate" x="48" y="138" width="8" height="24" rx="1" />
        <path className="svs-e-path" d={ESCORT_PATH} />
        <rect className="svs-e-dest" x="224" y="50" width="16" height="16" rx="2" />
        <g className="svs-e-pair">
          <circle className="svs-e-vis" r="4.5" cx="-9" cy="0" />
          <circle className="svs-e-esc" r="5" cx="0" cy="0" />
          <animateMotion dur="6s" repeatCount="indefinite" path={ESCORT_PATH} keyPoints="0;1;1" keyTimes="0;0.8;1" calcMode="linear" />
        </g>
      </svg>
    </>
  );
}

// Relief: a week of shifts; Thursday night goes empty, then is covered from on-call.
const DAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
const SHIFTS = ['Day', 'Swing', 'Night'];
function ReliefWeek() {
  return (
    <>
      <Bar label="Relief schedule" />
      <div className="svs-w">
        <span />
        {DAYS.map((d, i) => (
          <span key={`d${i}`} className="svs-w-day">
            {d}
          </span>
        ))}
        {SHIFTS.map((s, row) => (
          <div key={s} className="svs-w-row">
            <span className="svs-w-shift">{s}</span>
            {DAYS.map((_, col) => (
              <span key={col} className="svs-w-cell" data-hit={row === 2 && col === 3 ? 'true' : undefined} />
            ))}
          </div>
        ))}
      </div>
      <p className="svs-foot svs-w-note">
        <span className="svs-w-out">Thursday night: officer out</span>
        <span className="svs-w-in">
          <Check />
          Covered from on-call
        </span>
      </p>
    </>
  );
}

// Patrol: one route through three properties, each stamped as the vehicle passes.
const ROUTE = 'M40 132 C70 60 120 48 150 66 S230 120 214 150 S90 176 40 132 Z';
const PINS = [
  { x: 40, y: 132, t: '01:14', key: 0 },
  { x: 150, y: 66, t: '01:32', key: 0.33 },
  { x: 214, y: 150, t: '01:51', key: 0.66 },
];
function PatrolRoute() {
  return (
    <>
      <Bar label="Patrol route" />
      <svg className="svs-svg svs-p" viewBox="0 0 260 186" aria-hidden="true">
        <path className="svs-p-route" d={ROUTE} />
        {PINS.map((p, i) => (
          <g key={i} transform={`translate(${p.x} ${p.y})`}>
            <rect className="svs-p-pin" x="-6" y="-6" width="12" height="12" rx="2" />
            <text className="svs-p-name" x="0" y={i === 1 ? -14 : 24} textAnchor="middle">
              {`Property ${i + 1}`}
            </text>
            <text className="svs-p-time" x={i === 2 ? -14 : 14} y={i === 1 ? 4 : -10} textAnchor={i === 2 ? 'end' : 'start'}>
              {p.t}
              <animate
                attributeName="opacity"
                dur="6s"
                repeatCount="indefinite"
                values="0.25;0.25;1;1;0.25"
                keyTimes={`0;${Math.max(0, p.key - 0.001).toFixed(3)};${(p.key + 0.04).toFixed(3)};${Math.min(0.999, p.key + 0.3).toFixed(3)};1`}
              />
            </text>
          </g>
        ))}
        <g className="svs-p-car">
          <rect x="-5" y="-5" width="10" height="10" rx="2" />
          <animateMotion dur="6s" repeatCount="indefinite" path={ROUTE} />
        </g>
      </svg>
    </>
  );
}

const DEMOS: Record<string, () => JSX.Element> = {
  armed: Qualification,
  unarmed: Round,
  access: VisitorLog,
  escort: EscortPlan,
  relief: ReliefWeek,
  vehicle: PatrolRoute,
};

export default function SvServices() {
  const ref = useRef<HTMLElement>(null);
  const rowRef = useRef<HTMLOListElement>(null);
  const [at, setAt] = useState(0);

  // Each demo runs only while its panel is in view (and never under reduced motion). The SVG
  // demos are SMIL, paused and resumed with their panel; without JavaScript they simply run.
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const panels = Array.from(root.querySelectorAll<HTMLElement>('.svs-panel'));
    const svgs = (p: HTMLElement) => Array.from(p.querySelectorAll<SVGSVGElement>('svg.svs-svg'));
    if (!motionAllowed()) {
      // Still and fully drawn: hold the SVG demos at a readable moment.
      panels.forEach((p) =>
        svgs(p).forEach((s) => {
          s.pauseAnimations();
          s.setCurrentTime(2.4);
        }),
      );
      return;
    }
    root.dataset.arm = 'true';
    panels.forEach((p) => svgs(p).forEach((s) => s.pauseAnimations()));
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          const p = e.target as HTMLElement;
          p.dataset.play = String(e.isIntersecting);
          svgs(p).forEach((s) => (e.isIntersecting ? s.unpauseAnimations() : s.pauseAnimations()));
        }),
      { threshold: 0.35 },
    );
    panels.forEach((p) => io.observe(p));
    return () => io.disconnect();
  }, []);

  // Phones: the counter follows the panel nearest the middle of the row.
  useEffect(() => {
    const row = rowRef.current;
    if (!row) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const box = row.getBoundingClientRect();
      const mid = box.left + box.width / 2;
      let best = 0;
      let bestD = Infinity;
      Array.from(row.children).forEach((c, i) => {
        const r = c.getBoundingClientRect();
        const d = Math.abs(r.left + r.width / 2 - mid);
        if (d < bestD) {
          bestD = d;
          best = i;
        }
      });
      setAt(best);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    row.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      row.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  useScene(ref, (engine, root) => {
    readIn(engine, root.querySelector('.svs-title'));
    const mm = engine.gsap.matchMedia();
    mm.add('(min-width: 768px)', () => {
      const panels = engine.gsap.utils.toArray<HTMLElement>('.svs-panel', root);
      panels.forEach((p, i) => {
        engine.gsap.fromTo(
          p,
          { y: 90 + (i % 3) * 40, opacity: 0.25 },
          {
            y: 0,
            opacity: 1,
            ease: 'none',
            scrollTrigger: { trigger: p, start: 'top 100%', end: 'top 62%', scrub: SCRUB },
          },
        );
      });
    });
    return () => mm.revert();
  });

  return (
    <section ref={ref} id="sv-services" className="svs" aria-labelledby="svs-title">
      <header className="svs-head nx-edge">
        <h2 id="svs-title" className="nx-statement nx-statement-sm svs-title">
          {words('What we staff.')}
        </h2>
        <p className="svs-lead">
          Armed and unarmed coverage, access control, escort, relief, and patrol. Each service has its own
          page: what the post covers and what to send us.
        </p>
      </header>

      <ol ref={rowRef} className="svs-grid nx-edge" aria-label="Services">
        {CAPABILITIES.map((c, i) => {
          const Demo = DEMOS[c.id];
          const slug = slugFor(c.id);
          return (
            <li key={c.id} id={`svc-${c.id}`} className="svs-panel" data-kind={c.id} style={iv(i)}>
              <p className="svs-top" aria-hidden="true">
                <span className="svs-n">{n2(i)}</span>
                <span className="svs-word">{WORD[c.id] ?? c.title}</span>
              </p>
              <div className="svs-demo" aria-hidden="true">
                {Demo && <Demo />}
              </div>
              <div className="svs-cap">
                <h3 className="svs-name">
                  <Link to={slug ? `/services/${slug}` : '/services'} className="svs-link">
                    {c.title}
                    <Arrow size={16} />
                  </Link>
                </h3>
                <p className="svs-line">{c.line}</p>
                <p className="svs-keys">{c.keys.join(' · ')}</p>
              </div>
            </li>
          );
        })}
      </ol>
      <p className="svs-count ds-data nx-edge" aria-hidden="true">
        <span>Swipe for more</span>
      </p>
    </section>
  );
}
