// 04 Program (2026-10-08; CenCore's "program, not staffing" argument, on Ares' facts): what
// comes with every post besides the officer, the named on-call offering, and the site systems
// officers are trained on. DRAFT copy for the owner to review (docs/copy-changes.md).
const PARTS = [
  {
    name: 'Post orders and SOPs',
    line: 'We write the post orders and procedures for every post with you, and train each officer on them, on the post, before the first shift.',
  },
  {
    name: 'Records you can audit',
    line: 'Checkpoint, visitor, and incident logs, time-stamped and kept to your post orders, so the work can be checked after the fact.',
  },
  {
    name: 'Supervision',
    line: 'A member of leadership works the first shift on every new post, and our supervisors include veterans.',
  },
];

const SYSTEMS = ['Card readers and access panels', 'Visitor management software', 'CCTV monitors', 'Intercoms and radios', 'Gate and dock controls', 'Alarm panels'];

export default function Program() {
  return (
    <section id="program" className="ds-svc-program" aria-labelledby="program-title">
      <div className="ds-sec-head">
        <h2 id="program-title" className="ds-display-lg">A security program, not a headcount.</h2>
        <p className="ds-lead">
          Every post comes with the paperwork, the records, and the supervision that make the
          coverage hold up, shift after shift.
        </p>
      </div>
      <ul className="ds-svc-program-parts">
        {PARTS.map((p) => (
          <li key={p.name}>
            <h3>{p.name}</h3>
            <p>{p.line}</p>
          </li>
        ))}
      </ul>
      <div className="ds-svc-relief">
        <div>
          <h3>The relief roster.</h3>
          <p>
            On-call coverage is written into every contract. When an officer cannot make a
            shift, the post is covered from our roster instead of standing empty. It is also
            how we staff surge work: inspections, transitions, construction phases, and dates
            that outgrow your normal staffing.
          </p>
        </div>
        <p className="ds-data ds-svc-relief-proof">Fewer than 1% of shifts missed since 2021</p>
      </div>
      <div className="ds-svc-systems">
        <h3>Trained on your systems.</h3>
        <p>Before their first shift, officers learn the systems already at your site, such as:</p>
        <ul>
          {SYSTEMS.map((s) => <li key={s}>{s}</li>)}
        </ul>
      </div>
    </section>
  );
}
