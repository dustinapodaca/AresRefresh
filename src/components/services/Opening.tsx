import { Link } from 'react-router-dom';
import Arrow from '../Arrow';
import { DIVISIONS } from './data';

// The cover page of the file: headline and lead on the left, the contents (six
// divisions) on the right. No photo; the divisions below carry the imagery.
export default function Opening() {
  return (
    <section className="ds-svc-open" aria-labelledby="services-title">
      <div className="ds-container ds-svc-open-grid">
        <div className="ds-svc-open-copy">
          <h1 id="services-title" className="ds-display-xl">
            Security officers for six kinds of sites.
          </h1>
          <p className="ds-lead">
            Armed, unarmed, and cleared officers for federal, commercial, industrial, and
            institutional sites in Colorado Springs, Denver, and Pueblo. Find the division
            closest to your site.
          </p>
          <div className="ds-actions">
            <Link to="/contact" className="ds-btn ds-btn-primary">
              Request a quote
              <Arrow />
            </Link>
            <a href="tel:+17196963966" className="ds-link">
              Call <span className="ds-data">719-696-3966</span>
            </a>
          </div>
        </div>

        <nav className="ds-svc-index" aria-label="Service divisions">
          <ol>
            {DIVISIONS.map((d) => (
              <li key={d.id}>
                <a href={`#${d.id}`}>
                  <span className="ds-data">{d.n}</span>
                  <span>{d.title}</span>
                  <Arrow size={14} />
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </section>
  );
}
