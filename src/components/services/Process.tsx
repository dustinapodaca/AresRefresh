import type { CSSProperties } from 'react';
import { STAGES } from './data';

// 02 Process, set as a schedule chart: one axis from pre-contract to operational, and
// each stage's bar one step further along it.
export default function Process() {
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
        <p className="ds-data ds-svc-axis" aria-hidden="true">
          <span>Pre-contract</span>
          <span>Contract execution</span>
          <span>Operational</span>
        </p>
        <ol className="ds-svc-stages">
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
