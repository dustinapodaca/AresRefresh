import { FACTS, STAFFING_STEPS } from './data';

// 01 Company (owner, 2026-10-06: swapped with Home's "Quality over quantity"): how we staff
// a post, as four steps on hairlines, then the facts as a ledger beside the patrol vehicles
// (real Ares). No pinned photo here: 03 People already pins the officer portrait.
export default function Company() {
  return (
    <section id="company" className="ds-ab-company" aria-labelledby="company-title">
      <div className="ds-ab-company-copy">
        <h2 id="company-title" className="ds-display-lg">
          How we staff a post.
        </h2>
        <p className="ds-lead">
          Every post we take on is staffed the same way, from the first look at the site to the
          first shift.
        </p>
      </div>

      <ol className="ds-ab-steps" aria-label="Four steps">
        {STAFFING_STEPS.map((s, i) => (
          <li key={s.title}>
            <span className="ds-data ds-ab-step-n" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
            <h3>{s.title}</h3>
            <p>{s.body}</p>
          </li>
        ))}
      </ol>

      <dl className="ds-ab-facts">
        {FACTS.map((f) => (
          <div key={f.label}>
            <dt>{f.label}</dt>
            <dd className={f.mono ? 'ds-data' : undefined}>{f.value}</dd>
          </div>
        ))}
      </dl>
      <figure className="ds-plate ds-ab-vehicles">
        <img
          src="/images/mission-vehicle.jpg"
          alt="Two marked Ares Security patrol vehicles parked outside a residential building"
          width={750}
          height={842}
          loading="lazy"
          decoding="async"
        />
        <figcaption className="ds-caption">Ares patrol vehicles</figcaption>
      </figure>
    </section>
  );
}
