import { Link } from 'react-router-dom';
import Arrow from '../Arrow';
import CoverageMap from './CoverageMap';
import { responsive } from '../../lib/responsive';

const CITIES = [
  { to: '/locations/colorado-springs', name: 'Colorado Springs', note: 'Headquarters' },
  { to: '/locations/denver', name: 'Denver', note: 'Service area' },
  { to: '/locations/pueblo', name: 'Pueblo', note: 'Service area' },
];

const DIVISIONS = [
  'Government Security Personnel',
  'Airport & Transportation Security',
  'Commercial & High\u2011Traffic Security', // non-breaking hyphen keeps "High-Traffic" together
  'Industrial, Logistics & Construction',
  'Specialized & Armed Protection',
  'Institutional & Community Security',
];

export default function Coverage() {
  return (
    <section id="coverage" className="ds-coverage" aria-labelledby="coverage-title">
      <div className="ds-coverage-head">
        <h2 id="coverage-title" className="ds-display-lg">
          Where we work.
        </h2>
        <p className="ds-lead">
          Armed and unarmed officers for federal, commercial, industrial, and
          institutional sites, from our base in Colorado Springs.
        </p>
        <CoverageMap />
      </div>

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

      <div className="ds-divisions">
        <h3 className="ds-title">Six service divisions</h3>
        <div>
          <ul>
            {DIVISIONS.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>
          <Link to="/services" className="ds-link">
            See all services
            <Arrow />
          </Link>
        </div>
      </div>

      <p className="ds-lead ds-handoff">
        Every one of those posts is staffed by officers we trained on site.
      </p>

      {/* Full bleed. Starts here and ends under the opening of 04 Careers. */}
      <div className="ds-bleed" aria-hidden="true">
        <img {...responsive('/images/about-security.jpg')} alt="" loading="lazy" decoding="async" />
      </div>
    </section>
  );
}
