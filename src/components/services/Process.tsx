import { STAGES } from './data';

// 02 Process, the page's pinned moment: on desktop the headline and the reason hold
// still while the four stages scroll past on a hairline track that fills as you read.
export default function Process() {
  return (
    <section id="process" className="ds-svc-process" aria-labelledby="process-title">
      <div className="ds-svc-process-grid">
        <div className="ds-svc-process-head">
          <div className="ds-svc-process-pin">
            <h2 id="process-title" className="ds-display-lg">
              Four stages, from site walk to first shift.
            </h2>
            <p className="ds-lead">
              Every site has its own shift pattern, threat profile, and compliance
              requirements. The four stages exist because protection that holds up under
              scrutiny can&rsquo;t be rushed, copied from another contract, or trusted to a
              stranger on day one.
            </p>
          </div>
        </div>

        <div className="ds-svc-track">
          <span className="ds-svc-track-fill" aria-hidden="true" />
          <ol className="ds-svc-stages">
            {STAGES.map((s) => (
              <li key={s.n} className="ds-svc-stage">
                <span className="ds-svc-marker" aria-hidden="true" />
                <div className="ds-svc-title-row">
                  <span className="ds-data ds-svc-n" aria-hidden="true">{s.n}</span>
                  <h3 className="ds-svc-stage-title">{s.title}</h3>
                </div>
                <p className="ds-svc-stage-tags">{s.covers}</p>
                <p className="ds-body">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <p className="ds-lead ds-handoff">The same four stages run at every post, in every city we cover.</p>
    </section>
  );
}
