import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { motionAllowed, readIn, useScene, words } from '../home/engine';
import './sv-relief.css';

// 04 The relief schedule, "Multiplayer" (home-flora, 2026-10-22), after FLORA's collaborative
// panel with named cursors. A dark canvas card holds an example week of day, swing, and night
// posts. While it is on screen it plays one moment and loops: Thursday night's officer is out
// (red), a cursor named On-call comes down to this week's on-call slot, picks the shift up, carries
// it into the empty post, and it locks in green: "Covered the same shift from this week's on-call
// schedule". A quieter Supervisor cursor drifts over the week. The card says "Example week" so it
// reads as an illustration, not a record. The finished state is the default (no JavaScript, the
// prerender, reduced motion), with the cursors hidden.

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const SHIFTS = ['Day', 'Swing', 'Night'];
const OUT = { row: 2, col: 3 }; // Thursday night

type Step = 'idle' | 'out' | 'reach' | 'grab' | 'drag' | 'done' | 'rest';
const STATUS: Record<Step, string> = {
  idle: 'A week of posts',
  out: 'Thursday night: officer out',
  reach: 'Thursday night: officer out',
  grab: 'Thursday night: officer out',
  drag: 'Thursday night: officer out',
  done: 'Covered the same shift from this week’s on-call schedule',
  rest: 'Covered the same shift from this week’s on-call schedule',
};
const STATE: Record<Step, 'idle' | 'out' | 'covered'> = {
  idle: 'idle',
  out: 'out',
  reach: 'out',
  grab: 'out',
  drag: 'out',
  done: 'covered',
  rest: 'covered',
};
// The beat, in ms from the start of each loop.
const BEATS: [Step, number][] = [
  ['idle', 0],
  ['out', 900],
  ['reach', 1900],
  ['grab', 3100],
  ['drag', 3500],
  ['done', 4650],
  ['rest', 5200],
];
const LOOP = 9400;

type Pt = { x: number; y: number };

export default function SvRelief() {
  const ref = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLElement>(null);
  const [step, setStep] = useState<Step>('done');
  const [live, setLive] = useState(false);
  const [pts, setPts] = useState<{ slot: Pt; post: Pt; rest: Pt; start: Pt; w: number; h: number } | null>(null);

  useScene(ref, (engine, root) => {
    readIn(engine, root.querySelector('.sv-rl-title'));
  });

  // Where the cursor and the carried block go: the centers of the on-call slot and the empty post.
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    const measure = () => {
      const c = card.getBoundingClientRect();
      const center = (el: Element | null): Pt => {
        const r = el!.getBoundingClientRect();
        return { x: r.left - c.left + r.width / 2, y: r.top - c.top + r.height / 2 };
      };
      const slot = center(card.querySelector('.sv-rl-slot[data-hit]'));
      const cell = card.querySelector('.sv-rl-cell[data-out]')!;
      const post = center(cell);
      const cr = cell.getBoundingClientRect();
      setPts({
        slot,
        post,
        rest: { x: post.x + cr.width * 0.9, y: post.y + 64 },
        start: { x: c.width + 40, y: c.height * 0.92 },
        w: cr.width,
        h: cr.height,
      });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(card);
    return () => ro.disconnect();
  }, []);

  // Play while on screen; stop and settle to the finished week when it leaves.
  useEffect(() => {
    const card = cardRef.current;
    // Same gate as the scroll engine: reduced motion and the prerender keep the finished week.
    if (!card || !motionAllowed()) return;
    let timers: number[] = [];
    let running = false;
    const clear = () => {
      timers.forEach(clearTimeout);
      timers = [];
    };
    const loop = () => {
      BEATS.forEach(([s, at]) => timers.push(window.setTimeout(() => setStep(s), at)));
      timers.push(window.setTimeout(loop, LOOP));
    };
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !running) {
          running = true;
          setLive(true);
          loop();
        } else if (!e.isIntersecting && running) {
          running = false;
          clear();
          setLive(false);
          setStep('done');
        }
      },
      { threshold: 0.55 },
    );
    io.observe(card);
    return () => {
      io.disconnect();
      clear();
    };
  }, []);

  // The cursor's spot for each beat.
  const cursorAt: Pt | null = pts
    ? step === 'idle' || step === 'out'
      ? pts.start
      : step === 'reach' || step === 'grab'
        ? pts.slot
        : step === 'drag' || step === 'done'
          ? pts.post
          : pts.rest
    : null;
  const ghostAt: Pt | null = pts ? (step === 'drag' || step === 'done' ? pts.post : pts.slot) : null;
  const state = STATE[step];

  return (
    <section ref={ref} id="sv-relief" className="sv-rl" aria-labelledby="sv-rl-title">
      <div className="sv-rl-wrap nx-edge">
        <div className="sv-rl-copy">
          <h2 id="sv-rl-title" className="nx-statement nx-statement-sm sv-rl-title">
            {words('The relief schedule.')}
          </h2>
          <p className="sv-rl-body">
            On-call coverage is written into every contract. When an officer cannot make a shift, the
            post is covered from our on-call schedule instead of standing empty. It is also how we
            staff surge work: inspections, transitions, construction phases, outages and storm events,
            and dates that outgrow your normal staffing.
          </p>
          <p className="sv-rl-proof">
            <i aria-hidden="true" />
            <span className="ds-data">Fewer than 1% of shifts missed since 2021</span>
          </p>
        </div>

        <figure
          ref={cardRef}
          className="sv-rl-card"
          data-step={step}
          data-state={state}
          data-live={live || undefined}
          aria-label="An example week of day, swing, and night shifts: an officer is out on Thursday night, and the shift is covered from the on-call schedule"
        >
          <div className="sv-rl-dots" aria-hidden="true" />
          <p className="sv-rl-bar" aria-hidden="true">
            <span>Example week</span>
            <span>Day · Swing · Night · On-call</span>
          </p>
          <div className="sv-rl-week" aria-hidden="true">
            <span />
            {DAYS.map((d) => (
              <span key={d} className="sv-rl-day ds-data">
                {d}
              </span>
            ))}
            {SHIFTS.map((s, row) => (
              <Row key={s} label={s} row={row} />
            ))}
            <span className="sv-rl-label sv-rl-label-oncall ds-data">On-call</span>
            {DAYS.map((d, col) => (
              <span key={d} className="sv-rl-slot" data-hit={col === OUT.col ? 'true' : undefined} />
            ))}
          </div>

          {/* The shift being carried, and the two cursors (motion only). */}
          <span
            className="sv-rl-ghost"
            aria-hidden="true"
            style={
              ghostAt && pts
                ? ({ transform: `translate(${ghostAt.x}px, ${ghostAt.y}px)`, width: pts.w, height: pts.h, marginLeft: -pts.w / 2, marginTop: -pts.h / 2 } as CSSProperties)
                : undefined
            }
          />
          <span
            className="sv-rl-cursor"
            data-who="oncall"
            aria-hidden="true"
            style={cursorAt ? ({ transform: `translate(${cursorAt.x}px, ${cursorAt.y}px)` } as CSSProperties) : undefined}
          >
            <Pointer />
            <b>On-call</b>
          </span>
          <span className="sv-rl-cursor sv-rl-cursor-sup" data-who="sup" aria-hidden="true">
            <Pointer />
            <b>Supervisor</b>
          </span>

          <figcaption className="sv-rl-status" data-state={state}>
            <i aria-hidden="true" />
            <span key={STATUS[step]} className="ds-data">
              {STATUS[step]}
            </span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

function Row({ label, row }: { label: string; row: number }) {
  return (
    <>
      <span className="sv-rl-label ds-data">{label}</span>
      {DAYS.map((d, col) => (
        <span
          key={d}
          className="sv-rl-cell"
          data-out={row === OUT.row && col === OUT.col ? 'true' : undefined}
          style={{ '--k': row * 7 + col } as CSSProperties}
        >
          <i />
        </span>
      ))}
    </>
  );
}

// A FLORA-style pointer: a small filled arrow with a dark rim.
function Pointer() {
  return (
    <svg width="16" height="18" viewBox="0 0 16 18" fill="none" aria-hidden="true">
      <path d="M1.5 1.5 14 8.2l-5.6 1.5-2.6 5.3L1.5 1.5Z" fill="currentColor" stroke="#000" strokeWidth="1.2" strokeLinejoin="round" />
    </svg>
  );
}
