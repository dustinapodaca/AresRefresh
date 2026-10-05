import { Link } from 'react-router-dom';
import Arrow from '../Arrow';

// 04 Contact for Services: the next step is a site walk, so the close says so. The
// headline sits left; the phone, email, and actions stack on the right.
export default function Close() {
  return (
    <section id="contact" className="ds-svc-close" aria-labelledby="contact-title">
      <div className="ds-svc-close-copy">
        <h2 id="contact-title" className="ds-display-lg">
          Tell us about your site.
        </h2>
        <p className="ds-lead">We start with a walk of your site, before anything is signed.</p>
      </div>
      <div className="ds-svc-close-side">
        <a href="tel:+17196963966" className="ds-phone">
          719-696-3966
        </a>
        <a href="mailto:contact@aressecurity.co" className="ds-link ds-data">
          contact@aressecurity.co
        </a>
        <div className="ds-actions">
          <Link to="/contact" className="ds-btn ds-btn-primary">
            Request a quote
            <Arrow />
          </Link>
          <Link to="/capability-statement" className="ds-link">
            Download the capability statement
          </Link>
        </div>
      </div>
    </section>
  );
}
