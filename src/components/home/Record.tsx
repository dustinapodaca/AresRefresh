// 01 Record (owner, 2026-10-06): Home opens on proof every buyer can use, federal or not:
// the missed-shift figure and a client's words. The federal ledger that opened Home before
// lives on the Capability Statement; GSA buyers get a short block near the close.
export default function Record() {
  return (
    <section id="record" className="ds-record" aria-labelledby="record-title">
      <div className="ds-record-head">
        <h2 id="record-title" className="ds-display-lg">
          The record so far.
        </h2>
        <p className="ds-lead">
          Federal agencies and commercial clients hire us for the same thing: a prepared officer
          on post, every shift.
        </p>
      </div>

      <div className="ds-proof-close">
        <p className="ds-figure-num" aria-describedby="figure-note">
          &lt;1%
        </p>
        <div className="ds-figure-note" id="figure-note">
          <p className="ds-title">Missed shifts since 2021.</p>
          <p className="ds-body">
            On-call scheduling is standard in every contract. That reliability supports clean
            audits and consistent performance on every engagement.
          </p>
        </div>
        <figure className="ds-quote">
          <blockquote>
            <p className="ds-display-md">
              “Ares arrived prepared. Their documentation was cleaner than the incumbent’s from
              day one.”
            </p>
          </blockquote>
          <figcaption className="ds-small">
            <span>Contracting Officer</span>
            <span>USAF · Buckley Space Force Base</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
