import { Link } from 'react-router-dom';
import Arrow from '../Arrow';
import { PDF_URL } from './data';

// 04 Statement, the close: page 1 of the real capability statement as a plate that
// settles flat as it scrolls in, beside the ways to get it and to reach us.
export default function Statement() {
  return (
    <section id="statement" className="ds-ab-statement" aria-labelledby="statement-title">
      <Link to="/capability-statement" className="ds-ab-doc" aria-label="View the capability statement">
        <img
          src="/images/capability-page1.webp"
          alt="Page one of the Ares Security capability statement"
          width={1000}
          height={1295}
          loading="lazy"
          decoding="async"
        />
      </Link>
      <div className="ds-ab-statement-copy">
        <h2 id="statement-title" className="ds-display-lg">
          Everything above, on one page.
        </h2>
        <p className="ds-lead">
          Our capability statement lists our identifiers, certifications, licenses, and contract
          vehicles in the format procurement teams use.
        </p>
        <div className="ds-ab-statement-links">
          <Link to="/capability-statement" className="ds-link">
            View the capability statement
            <Arrow />
          </Link>
          <a href={PDF_URL} className="ds-link ds-link-muted" download>
            Download the PDF
          </a>
        </div>
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
    </section>
  );
}
