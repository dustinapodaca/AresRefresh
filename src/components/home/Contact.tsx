import { Link } from 'react-router-dom';
import Arrow from '../Arrow';

// The close (owner, 2026-10-16, after Linear's "How can we help?" and Grok's contact cards on
// Mobbin): two glass cards, Request a quote and Call us. Its primes line was removed (owner,
// 2026-10-16). The other four forms (/?close=current|centered|starter|ledger) were removed at launch
// (owner, 2026-10-19; tag options-archive-2026-10-19, docs/options-archive.md).
const PHONE = '719-696-3966';
const TEL = 'tel:+17196963966';
const EMAIL = 'contact@aressecurity.co';

export default function Contact() {
  return (
    <section id="contact" className="ds-contact" data-form="routes" aria-labelledby="contact-title">
      <h2 id="contact-title" className="ds-display-xl ds-cta-routes-title">
        Request a quote, or call us.
      </h2>
      <div className="ds-cta-routes">
        <div className="ds-cta-card">
          <h3 className="ds-cta-card-title">Request a quote</h3>
          <p className="ds-cta-card-line">
            Send a site, a shift pattern, and a deadline. We walk your site before anything is
            signed, then send a scoped proposal.
          </p>
          <Link to="/contact" className="ds-btn ds-btn-primary">
            Request a Quote
            <Arrow />
          </Link>
        </div>
        <div className="ds-cta-card">
          <h3 className="ds-cta-card-title">Call us</h3>
          <p className="ds-cta-card-line">For urgent procurement timelines or active contracts.</p>
          <a href={TEL} className="ds-phone ds-cta-phone">
            {PHONE}
          </a>
          <p className="ds-data ds-cta-meta">
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
            <span aria-hidden="true">·</span>
            <span>Colorado Springs, CO</span>
          </p>
        </div>
      </div>
    </section>
  );
}
