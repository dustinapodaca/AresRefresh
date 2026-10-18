import { Link } from 'react-router-dom';
import Seo from '../seo/Seo';
import Arrow from '../components/Arrow';
import CoverageMap from '../components/home/CoverageMap';
import { COLORADO_SPRINGS, DENVER, PUEBLO } from '../components/locations/data';

// The service-area hub (web audit, 2026-10-18): /locations returned 404 though every city
// page's breadcrumb pointed there. Home's headline and lead, the three cities as ruled rows
// with each city's license, and the Colorado map.
const CITIES = [
  { file: COLORADO_SPRINGS, note: 'Headquarters' },
  { file: DENVER, note: 'Service area' },
  { file: PUEBLO, note: 'Service area' },
];

export default function LocationsHub() {
  return (
    <main id="main" tabIndex={-1} className="ds ds-page ds-mk">
      <Seo path="/locations" />
      <section className="ds-container ds-mk-open ds-mk-open-solo" aria-labelledby="mk-title">
        <div className="ds-mk-open-copy">
          <h1 id="mk-title" className="ds-display-xl">Where we work</h1>
          <p className="ds-lead">
            Armed and unarmed officers for federal, commercial, industrial, and institutional
            sites, from our base in Colorado Springs.
          </p>
        </div>
      </section>
      <div className="ds-container">
        <ul className="ds-mk-posts">
          {CITIES.map(({ file, note }) => (
            <li key={file.path}>
              <Link to={file.path}>
                <span className="ds-mk-post-title">{file.city.name}</span>
                <span className="ds-mk-post-sum">{file.lead}</span>
                <span className="ds-mk-post-meta">
                  <span>{note}</span>
                  <span className="ds-data">License {file.license[0].value}</span>
                </span>
                <Arrow size={18} />
              </Link>
            </li>
          ))}
        </ul>
        <div className="ds-loc-hub-map">
          <CoverageMap landmarks />
        </div>
      </div>
    </main>
  );
}
