import { responsive } from '../../lib/responsive';
import { RevealHeading, RevealLead } from './Reveal';

// 02 Quality (owner, 2026-10-06: moved whole from About, photo and all, and set for Home):
// the principle as a large statement with its paragraph, then the patrol vehicles as a wide
// plate beside the company facts.
export const FACTS: { label: string; value: string; mono?: boolean }[] = [
  { label: 'Established', value: 'February 2021, Colorado Springs' },
  // The "Licensed" row was removed (owner, 2026-10-12); the proof row and city pages carry it.
  { label: 'Primary NAICS', value: '561612', mono: true },
  // Owner, 2026-10-10: true; the client is not named.
  { label: 'Longest client', value: 'On post continuously since 2022, through multiple renewals' },
  // The "Ownership" row was removed (owner, 2026-10-18); the hero's proof row carries it.
  // In its place (owner, 2026-10-18): training that covers every service, not only armed posts.
  { label: 'Post training', value: 'By our leadership, before the first shift' },
];

// The patrol vehicles across the whole column, the facts in a row beneath (design review item 28;
// wide chosen, owner 2026-10-16). The side, portrait, and glass forms (/?vehicles=) were removed at
// launch (owner, 2026-10-19; tag options-archive-2026-10-19, docs/options-archive.md).
export default function Quality() {
  return (
    <section id="quality" className="ds-quality" aria-labelledby="quality-title">
      <div className="ds-sec-head">
        <RevealHeading id="quality-title" className="ds-display-lg">
          Quality over quantity.
        </RevealHeading>
        <RevealLead className="ds-lead">
          {'We would rather staff fewer posts well than many posts thinly. That choice shapes everyone we hire, the training they get, and the standards they carry onto every site.'}
        </RevealLead>
      </div>

      <div className="ds-quality-body" data-form="wide">
        <figure className="ds-plate ds-quality-photo">
          <img
            {...responsive('/images/mission-vehicle.jpg', '(min-width: 1024px) 58vw, 100vw')}
            alt="Two marked Ares Security patrol vehicles parked outside a residential building"
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
