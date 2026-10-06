import { Link } from 'react-router-dom';
import Arrow from '../Arrow';
import { GSA_ELIBRARY } from './links';

export default function Hero() {
  return (
    <section className="ds-hero" aria-labelledby="hero-title">
      {/* A glass fold in amber and white light (owner-supplied, hero-fold.webp).
          Full bleed from 900px; runs down under 01 Verify. */}
      <div className="ds-hero-photo" aria-hidden="true">
        <img src="/images/hero-fold.webp" width={2880} height={1620} alt="" decoding="async" {...{ fetchpriority: 'high' }} />
      </div>

      <div className="ds-container">
        <div className="ds-hero-copy">
          <h1 id="hero-title" className="ds-display-xl">
            Security guards for federal and commercial sites.
          </h1>
          <p className="ds-lead">
            Ares is a minority woman-owned, employee-focused security firm in Colorado Springs,
            serving Denver and Pueblo. We bridge public-sector compliance and commercial
            reliability, and every number on this page can be checked.
          </p>
          {/* Below 1024px only: from there up the nav carries the quote button. */}
          <div className="ds-actions ds-hero-actions">
            <Link to="/contact" className="ds-btn ds-btn-primary">
              Request a quote
              <Arrow />
            </Link>
            <a href="tel:+17196963966" className="ds-link">
              Call <span className="ds-data">719-696-3966</span>
            </a>
          </div>
          <div className="ds-hero-gsa">
            <img src="/images/gsa-contract-holder.png" alt="GSA Contract Holder" width={125} height={30} />
            <div>
              <span className="ds-small">GSA Multiple Award Schedule</span>
              <a href={GSA_ELIBRARY} target="_blank" rel="noopener noreferrer" className="ds-link ds-data">
                47QSMS25D009Q
                <Arrow external size={14} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
