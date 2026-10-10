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
    // The veterans clause was cut (copy audit, 2026-10-10: Home and Careers carry it).
    line: 'A member of leadership works the first shift on every new post.',
  },
];

// Each system with a small authored icon (owner, 2026-10-09): 16px, 1.5px strokes with round
// caps, like the site's arrows. Decorative; the words carry the meaning.
const SYSTEMS: { name: string; icon: JSX.Element }[] = [
  {
    name: 'Card readers and access panels',
    icon: (
      <>
        <rect x="4.5" y="1.75" width="7" height="12.5" rx="1.5" />
        <circle cx="8" cy="5.5" r="1.25" />
        <path d="M6.5 10h3M6.5 12h3" />
      </>
    ),
  },
  {
    name: 'Visitor management software',
    icon: (
      <>
        <rect x="1.75" y="2.75" width="12.5" height="10.5" rx="1.5" />
        <circle cx="6" cy="7" r="1.5" />
        <path d="M3.75 11c.4-1.2 1.2-1.8 2.25-1.8s1.85.6 2.25 1.8M10 6.5h2.25M10 9h2.25" />
      </>
    ),
  },
  {
    name: 'CCTV monitors',
    icon: (
      <>
        <path d="M2 4.6 11.2 2.4l1.1 4.3-9.2 2.2Z" />
        <path d="M12.6 4.2 14.5 3.8M5.5 8.4l.6 2.6H2.5M2.5 9.5v3" />
      </>
    ),
  },
  {
    name: 'Intercoms and radios',
    icon: (
      <>
        <rect x="4.75" y="4.5" width="6.5" height="10" rx="1.5" />
        <path d="M6.5 4.5V1.5M7 7.5h2M7 9.5h2M7 11.5h2" />
      </>
    ),
  },
  {
    name: 'Gate and dock controls',
    icon: (
      <>
        <path d="M3 14.25V4M1.5 14.25h3" />
        <rect x="3" y="5.25" width="11.25" height="2.75" rx="0.5" />
        <path d="M6.75 5.25 5.5 8M9.75 5.25 8.5 8M12.75 5.25 11.5 8" />
      </>
    ),
  },
  {
    name: 'Alarm panels',
    icon: (
      <>
        <path d="M8 2.25A3.5 3.5 0 0 0 4.5 5.75v3L3 11.25h10l-1.5-2.5v-3A3.5 3.5 0 0 0 8 2.25Z" />
        <path d="M6.75 13.25a1.25 1.25 0 0 0 2.5 0" />
      </>
    ),
  },
];

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
            how we staff surge work: inspections, transitions, construction phases, outages and
            storm events, and dates that outgrow your normal staffing.
          </p>
        </div>
        <p className="ds-data ds-svc-relief-proof">Fewer than 1% of shifts missed since 2021</p>
      </div>
      <div className="ds-svc-systems">
        <h3>Trained on your systems.</h3>
        <p>Before their first shift, officers learn the systems already at your site, such as:</p>
        <ul>
          {SYSTEMS.map((s) => (
            <li key={s.name}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                {s.icon}
              </svg>
              {s.name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
