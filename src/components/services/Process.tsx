import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { useSearchParams } from 'react-router-dom';
import Arrow from '../Arrow';
import { STAGES } from './data';
import SystemTags from './Systems';

// The section's head on desktop (owner, 2026-10-16: too much black to the right of the lead), for
// the owner to compare at /services?stagehead=current|head|column|wide. `head` chosen (owner,
// 2026-10-16). Phones and tablets are the same in all four.
//   current  the headline across, the lead under it in five columns
//   head     the site's section head: headline in 7 columns, the lead in the last 5 at its foot
//   column   the lead starts at column 5, over the stage bodies and the axis
//   wide     the lead across about 8 columns, three lines instead of five
const HEADS = ['current', 'head', 'column', 'wide'] as const;

// 02 Process, set as a schedule chart: one axis from pre-contract to operational, and
// each stage's bar one step further along it. Below 1024px the stages become a swipe
// row under a process meter that fills as the row is swiped.
export default function Process() {
  const [params] = useSearchParams();
  const asked = params.get('stagehead');
  const head = HEADS.includes(asked as (typeof HEADS)[number]) ? asked : 'head';
  const rowRef = useRef<HTMLOListElement>(null);
  const [active, setActive] = useState(0);

  const offsetOf = (row: HTMLElement, i: number) => {
    const slide = row.children[i] as HTMLElement | undefined;
    return slide ? slide.offsetLeft - row.offsetLeft - parseFloat(getComputedStyle(row).paddingLeft) : 0;
  };
  const goTo = (i: number) => {
    const row = rowRef.current;
    if (!row) return;
    row.scrollTo({ left: offsetOf(row, i), behavior: reducedMotion() ? 'auto' : 'smooth' });
  };

  useEffect(() => {
    const row = rowRef.current;
    if (!row) return;

    // Which stage is in front: the last one whose start the row has reached.
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const max = row.scrollWidth - row.clientWidth;
        let i = 0;
        for (let k = 1; k < STAGES.length; k++) if (row.scrollLeft >= Math.min(offsetOf(row, k), max) - 8) i = k;
        setActive(i);
      });
    };
    row.addEventListener('scroll', onScroll, { passive: true });

    // A one-time nudge when the row first comes into view, so it reads as swipeable:
    // it slides a little toward the next stage and settles back. Swipe row only, never
    // under reduced motion, and not once the reader has touched it.
    let touched = false;
    const markTouched = () => (touched = true);
    row.addEventListener('pointerdown', markTouched, { once: true });
    let timer = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        if (touched || reducedMotion() || row.scrollWidth <= row.clientWidth || row.scrollLeft > 0) return;
        // The row snaps, so the slides move instead of the scroll position.
        timer = window.setTimeout(() => {
          if (touched) return;
          Array.from(row.children).forEach((slide) =>
            slide.animate(
              [
                { transform: 'translateX(0)', easing: 'cubic-bezier(0.23, 1, 0.32, 1)' },
                { transform: 'translateX(-44px)', offset: 0.4, easing: 'cubic-bezier(0.77, 0, 0.175, 1)' },
                { transform: 'translateX(0)' },
              ],
              { duration: 900 },
            ),
          );
        }, 250);
      },
      { threshold: 0.6 },
    );
    io.observe(row);

    return () => {
      row.removeEventListener('scroll', onScroll);
      row.removeEventListener('pointerdown', markTouched);
      io.disconnect();
      window.clearTimeout(timer);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  const last = active >= STAGES.length - 1;

  return (
    <section id="process" className="ds-svc-process" aria-labelledby="process-title">
      <div className="ds-svc-process-head" data-head={head}>
        <h2 id="process-title" className="ds-display-lg">
          Four stages, from site walk to first shift.
        </h2>
        <p className="ds-lead ds-svc-intro">
          Every site has its own shift pattern, threat profile, and compliance requirements.
          The four stages exist because protection that holds up under scrutiny can&rsquo;t be
          rushed, copied from another contract, or trusted to a stranger on day one.
        </p>
      </div>

      <div className="ds-svc-gantt">
        {/* Phones and tablets: the meter. Four quarters on a hairline, the ink fill tied to
            the swipe position. Each number sits at the end of its quarter, over where the fill
            stops for that stage; the current one is rust, the ones passed ink (owner, 2026-10-15). */}
        <div className="ds-svc-meter">
          <ol className="ds-svc-meter-nums">
            {STAGES.map((s, i) => (
              <li key={s.n} style={{ '--i': i } as CSSProperties} data-on={i <= active ? 'true' : undefined} data-active={i === active ? 'true' : undefined}>
                <button type="button" className="ds-data" onClick={() => goTo(i)} aria-label={`Stage ${i + 1}: ${s.title}`}>
                  {s.n}
                </button>
              </li>
            ))}
          </ol>
          <span className="ds-svc-meter-track" aria-hidden="true">
            <span />
          </span>
        </div>
        <p className="ds-data ds-svc-axis" aria-hidden="true">
          <span>Pre-contract</span>
          <span>Contract execution</span>
          <span>Operational</span>
        </p>
        <ol className="ds-svc-stages" ref={rowRef}>
          {STAGES.map((s, i) => (
            <li key={s.n} className="ds-svc-stage" style={{ '--i': i } as CSSProperties}>
              <div className="ds-svc-stage-name">
                <div className="ds-svc-title-row">
                  <span className="ds-data ds-svc-n" aria-hidden="true">{s.n}</span>
                  <h3 className="ds-svc-stage-title">{s.title}</h3>
                </div>
                <p className="ds-svc-stage-tags">{s.covers}</p>
              </div>
              <div className="ds-svc-stage-body">
                <span className="ds-svc-bar" aria-hidden="true">
                  <span />
                  <i className="ds-svc-bar-end" />
                </span>
                <p className="ds-body">{s.body}</p>
                {s.systems && <SystemTags />}
              </div>
            </li>
          ))}
        </ol>
        {/* Swipe row only: says the row moves, and moves it. */}
        <button type="button" className="ds-link ds-svc-next" onClick={() => goTo(last ? 0 : active + 1)}>
          {last ? 'Back to the first stage' : 'Next stage'}
          <Arrow />
        </button>
      </div>

      <p className="ds-lead ds-handoff">The same four stages run at every post, in every city we cover.</p>
    </section>
  );
}

function reducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
