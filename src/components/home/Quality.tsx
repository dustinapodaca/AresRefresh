// 02 Quality (owner, 2026-10-06: moved whole from About, photo and all, and set for Home):
// the principle as a large statement with its paragraph, then the patrol vehicles as a wide
// plate beside the company facts.
const FACTS: { label: string; value: string; mono?: boolean }[] = [
  { label: 'Established', value: 'February 2021, Colorado Springs' },
  { label: 'Ownership', value: 'Minority woman-owned' },
  { label: 'Licensed', value: 'Licensed and bonded armed and unarmed security and training provider in Denver, Colorado Springs, and Pueblo' },
  { label: 'Primary NAICS', value: '561612', mono: true },
];

export default function Quality() {
  return (
    <section id="quality" className="ds-quality" aria-labelledby="quality-title">
      <div className="ds-quality-head">
        <h2 id="quality-title" className="ds-display-xl">
          Quality over quantity.
        </h2>
        <p className="ds-lead">
          We would rather staff fewer posts well than many posts thinly. That choice shapes
          everyone we hire, the training they get, and the standards they carry onto every site.
        </p>
      </div>

      <div className="ds-quality-body">
        <figure className="ds-plate ds-quality-photo">
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
        <dl className="ds-quality-facts">
          {FACTS.map((f) => (
            <div key={f.label}>
              <dt>{f.label}</dt>
              <dd className={f.mono ? 'ds-data' : undefined}>{f.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
