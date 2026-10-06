import { FACTS } from './data';

// 01 Company: the principle in one paragraph, the facts as a ledger, and the patrol
// vehicles as a captioned plate (real Ares).
export default function Company() {
  return (
    <section id="company" className="ds-ab-company" aria-labelledby="company-title">
      <div className="ds-ab-company-copy">
        <h2 id="company-title" className="ds-display-lg">
          Quality over quantity.
        </h2>
        <p className="ds-lead">
          We would rather staff fewer posts well than many posts thinly. That choice shapes
          everyone we hire, the training they get, and the standards they carry onto every site.
        </p>
        <dl className="ds-ab-facts">
          {FACTS.map((f) => (
            <div key={f.label}>
              <dt>{f.label}</dt>
              <dd className={f.mono ? 'ds-data' : undefined}>{f.value}</dd>
            </div>
          ))}
        </dl>
      </div>
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
