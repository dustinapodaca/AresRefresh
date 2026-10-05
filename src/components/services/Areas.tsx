import { Link } from 'react-router-dom';
import Arrow from '../Arrow';

const CITIES = [
  { to: '/locations/colorado-springs', name: 'Colorado Springs', note: 'Headquarters' },
  { to: '/locations/denver', name: 'Denver', note: 'Service area' },
  { to: '/locations/pueblo', name: 'Pueblo', note: 'Service area' },
];

// 03 Areas: the three city rows (links to the location pages), then the Denver skyline
// full bleed, running under the opening of 04 Contact.
export default function Areas() {
  return (
    <section id="areas" className="ds-svc-areas" aria-labelledby="areas-title">
      <h2 id="areas-title" className="ds-display-md">
        Where we work.
      </h2>
      <ul className="ds-cities">
        {CITIES.map((c) => (
          <li key={c.to}>
            <Link to={c.to} className="ds-city">
              <span className="ds-city-name">{c.name}</span>
              <span className="ds-small">{c.note}</span>
              <Arrow size={24} />
            </Link>
          </li>
        ))}
      </ul>
      <p className="ds-lead ds-handoff">Wherever your site is, the first step is a quote request or a call.</p>

      <figure className="ds-bleed ds-svc-bleed">
        <img src="/images/about-banner.jpg" alt="The Denver skyline in front of the Front Range" width={2000} height={1391} loading="lazy" decoding="async" />
      </figure>
    </section>
  );
}
