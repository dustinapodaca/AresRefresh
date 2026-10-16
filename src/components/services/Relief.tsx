import { useEffect, useRef, useState, type CSSProperties } from 'react';

// 04 The relief schedule (owner, 2026-10-15; was "The relief roster"): the on-call offering in its own block, after the
// program section folded into the four stages. Beside the copy, a week of shifts drawn small
// plays one quiet moment when the block comes into view: the week fills in, one night shift's
// officer is out (red), the on-call slot beneath it lights and a hairline rises into the
// shift, and it turns green, "Covered the same shift from this week's on-call schedule" (owner).
// It plays once and holds. The finished state is the default (prerendered, no JS, reduced
// motion); only a reader who will see it play gets the empty start.
const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const SHIFTS = ['Day', 'Swing', 'Night'];
const OUT = { row: 2, col: 3 }; // Thursday night
type Step = 'done' | 'armed' | 'fill' | 'out' | 'relief';
const STATUS: Record<Step, string> = {
  armed: 'A week of posts',
  fill: 'A week of posts',
  out: 'Thursday night: officer out',
  relief: 'Thursday night: officer out',
  done: 'Covered the same shift from this week\u2019s on-call schedule',
};

export default function Relief() {
  const ref = useRef<HTMLElement>(null);
  const [step, setStep] = useState<Step>('done');

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    // Already on screen (a reload mid-page): leave it finished.
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight * 0.85 && r.bottom > 0) return;
    setStep('armed');
    const timers: number[] = [];
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        setStep('fill');
        // From the call-out on, three times the first pace (owner, 2026-10-15: tried twice and four
        // times) so the call-out can be read before the shift is covered.
        timers.push(window.setTimeout(() => setStep('out'), 1100));
        timers.push(window.setTimeout(() => setStep('relief'), 3500));
        timers.push(window.setTimeout(() => setStep('done'), 5300));
      },
      { threshold: 0.55 },
    );
    io.observe(el.querySelector('.ds-relief-fig') ?? el);
    return () => {
      io.disconnect();
      timers.forEach(clearTimeout);
    };
  }, []);

  const status = step === 'done' ? 'covered' : step === 'out' || step === 'relief' ? 'out' : 'idle';
  return (
    <section id="relief" ref={ref} className="ds-svc-relief-sec" aria-labelledby="relief-title">
      <div className="ds-relief-panel">
        <div className="ds-relief-copy">
          <h2 id="relief-title" className="ds-display-md">The relief schedule.</h2>
          <p>
            On-call coverage is written into every contract. When an officer cannot make a shift, the
            post is covered from our on-call schedule instead of standing empty. It is also how we staff surge
            work: inspections, transitions, construction phases, outages and storm events, and dates
            that outgrow your normal staffing.
          </p>
          <p className="ds-relief-proof">
            <i aria-hidden="true" />
            <span className="ds-data">Fewer than 1% of shifts missed since 2021</span>
          </p>
        </div>
        <figure
          className="ds-relief-fig"
          data-step={step}
          aria-label="An example week of day, swing, and night shifts: an officer is out on Thursday night, and the shift is covered from the on-call schedule"
        >
          <div className="ds-relief-grid" aria-hidden="true">
            <span />
            {DAYS.map((d) => (
              <span key={d} className="ds-data ds-relief-day">{d}</span>
            ))}
            {SHIFTS.map((s, row) => (
              <Row key={s} label={s} row={row} />
            ))}
            <span className="ds-data ds-relief-label ds-relief-oncall">On call</span>
            {DAYS.map((d, col) => (
              <span key={d} className="ds-relief-slot" data-hit={col === OUT.col ? 'true' : undefined}>
                {col === OUT.col && <i className="ds-relief-wire" />}
              </span>
            ))}
          </div>
          <figcaption className="ds-relief-status" data-state={status}>
            <i aria-hidden="true" />
            <span key={STATUS[step]} className="ds-data">{STATUS[step]}</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

function Row({ label, row }: { label: string; row: number }) {
  return (
    <>
      <span className="ds-data ds-relief-label">{label}</span>
      {DAYS.map((d, col) => (
        <span
          key={d}
          className="ds-relief-cell"
          data-out={row === OUT.row && col === OUT.col ? 'true' : undefined}
          style={{ '--k': row * 7 + col } as CSSProperties}
        >
          <i />
        </span>
      ))}
    </>
  );
}
