import { Link } from 'react-router-dom';
import Arrow from '../Arrow';
import { responsive } from '../../lib/responsive';

const CITIES = [
  { to: '/locations/colorado-springs', name: 'Colorado Springs', note: 'Headquarters' },
  { to: '/locations/denver', name: 'Denver', note: 'Service area' },
  { to: '/locations/pueblo', name: 'Pueblo', note: 'Service area' },
];

// 03 Areas: the Denver skyline as a wide plate (a real Colorado place, so it carries a
// caption), with the three cities as a strip beneath it.
export default function Areas() {
  return (
    <section id="areas" className="ds-svc-areas" aria-labelledby="areas-title">
      <h2 id="areas-title" className="ds-display-md">
        Where we post officers.
      </h2>
      <figure className="ds-svc-pano">
        <div className="ds-svc-pano-frame">
          <img {...responsive('/images/about-banner.jpg', '(min-width: 1280px) 1216px, 100vw')} alt="The Denver skyline in front of the Front Range" loading="lazy" decoding="async" />
        </div>
        <figcaption className="ds-caption">Denver and the Front Range</figcaption>
      </figure>
      <ul className="ds-svc-cities">
        {CITIES.map((c) => (
          <li key={c.to}>
            <Link to={c.to}>
              <span className="ds-svc-city">{c.name}</span>
              <span className="ds-small">{c.note}</span>
              <Arrow size={20} />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
