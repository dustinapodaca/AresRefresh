import { useRef, type CSSProperties } from 'react';
import { STAGES } from './data';

// 02 Process, set as a schedule chart: one axis from pre-contract to operational, and
// each stage's bar one step further along it. Below 1024px the stages become a swipe
// row under a process meter that fills as the row is swiped.
export default function Process() {
  const rowRef = useRef<HTMLOListElement>(null);

  const goTo = (i: number) => {
    const row = rowRef.current;
    const slide = row?.children[i] as HTMLElement | undefined;
    if (!row || !slide) return;
    const smooth = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    row.scrollTo({ left: slide.offsetLeft - row.offsetLeft - parseFloat(getComputedStyle(row).paddingLeft), behavior: smooth ? 'smooth' : 'auto' });
  };

  return (
    <section id="process" className="ds-svc-process" aria-labelledby="process-title">
      <h2 id="process-title" className="ds-display-lg">
        Four stages, from site walk to first shift.
      </h2>
      <p className="ds-lead ds-svc-intro">
        Every site has its own shift pattern, threat profile, and compliance requirements.
        The four stages exist because protection that holds up under scrutiny can&rsquo;t be
        rushed, copied from another contract, or trusted to a stranger on day one.
      </p>

      <div className="ds-svc-gantt">
        {/* Phones and tablets: the meter. Four quarters on a hairline, the ink fill tied to
            the swipe position, each number lighting as its stage is reached. */}
        <div className="ds-svc-meter">
          <ol className="ds-svc-meter-nums">
            {STAGES.map((s, i) => (
              <li key={s.n} style={{ '--i': i } as CSSProperties}>
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
                </span>
                <p className="ds-body">{s.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <p className="ds-lead ds-handoff">The same four stages run at every post, in every city we cover.</p>
    </section>
  );
}
