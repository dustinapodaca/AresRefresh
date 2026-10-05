import { Link } from 'react-router-dom';
import Arrow from '../Arrow';

export default function Contact() {
  return (
    <section id="contact" className="ds-contact" aria-labelledby="contact-title">
      <h2 id="contact-title" className="ds-display-lg">
        Request a quote, or call us.
      </h2>
      <a href="tel:+17196963966" className="ds-phone">
        719-696-3966
      </a>
      <dl className="ds-pairs">
        <div>
          <dt>Email</dt>
          <dd>
            <a href="mailto:contact@aressecurity.co" className="ds-link ds-data">
              contact@aressecurity.co
            </a>
          </dd>
        </div>
        <div>
          <dt>Based in</dt>
          <dd className="ds-data">Colorado Springs, CO</dd>
        </div>
      </dl>
      <div className="ds-actions">
        <Link to="/contact" className="ds-btn ds-btn-primary">
          Request a quote
          <Arrow />
        </Link>
        <Link to="/capability-statement" className="ds-link">
          Download the capability statement
        </Link>
      </div>
    </section>
  );
}
