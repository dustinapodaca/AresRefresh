import { Link } from 'react-router-dom';
import Arrow from './Arrow';
import { GSA_ELIBRARY } from './home/links';
import { SAM_ACTIVE_THROUGH, SAM_VERIFY } from './capability/data';
import { ROLE_PAGES } from './market/roles';

// The footer (owner, 2026-10-08, after Pally's footer on Mobbin). Top: the Ares lockup, the
// company line, and the phone and email left; Explore, Service areas, and Follow us right.
// A hairline row: the copyright, the federal identifiers with the SAM.gov status, and the
// legal links. Then the closing band: the ARES letters set huge and ghosted, over a rust
// light rising from the foot of the page in rippled horizontal bands. No quote button (the
// nav and each page carry it).

// LinkedIn and Indeed match the sameAs links in index.html. The Google Business profile
// link is not on file yet, so this opens the Maps search for the business.
const PROFILES = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/aressecurity' },
  { label: 'Google', href: 'https://www.google.com/maps/search/?api=1&query=Ares+Security+LLC+Colorado+Springs' },
  { label: 'Indeed', href: 'https://www.indeed.com/cmp/Ares-Security-1' },
];

// The copyright year is the year the site is built, so it rolls over with the first build
// of each new year.
const YEAR = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="ds ds-footer">
      <div className="ds-container">
        <div className="ds-ft-top">
          <div className="ds-ft-intro">
            <Link to="/" className="ds-ft-lockup" aria-label="Ares Security home">
              <span className="ds-ft-lockup-mark" aria-hidden="true" />
              <span className="ds-ft-lockup-rule" aria-hidden="true" />
              <span className="ds-ft-lockup-text" aria-hidden="true" />
            </Link>
            <p className="ds-ft-statement">
              A minority <span className="ds-nobr">woman-owned</span>, employee-focused security firm. Founded 2021 in
              Colorado Springs.
            </p>
            <p className="ds-ft-reach">
              <a href="tel:+17196963966" className="ds-ft-chip">
                <PhoneIcon />
                <span className="ds-data">719-696-3966</span>
              </a>
              <a href="mailto:contact@aressecurity.co" className="ds-ft-chip">
                <MailIcon />
                <span className="ds-data">contact@aressecurity.co</span>
              </a>
            </p>
          </div>

          <nav className="ds-footer-cols" aria-label="Footer">
            <div>
              <h2>Explore</h2>
              <ul>
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/services">Services</Link></li>
                <li><Link to="/careers">Careers</Link></li>
                <li><Link to="/capability-statement">Capability Statement</Link></li>
                <li><Link to="/insights">Insights</Link></li>
              </ul>
            </div>
            <div>
              <h2>Services</h2>
              <ul>
                {ROLE_PAGES.map((r) => (
                  <li key={r.slug}><Link to={`/services/${r.slug}`}>{r.name}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <h2>Service areas</h2>
              <ul>
                <li><Link to="/locations/colorado-springs">Colorado Springs</Link></li>
                <li><Link to="/locations/denver">Denver</Link></li>
                <li><Link to="/locations/pueblo">Pueblo</Link></li>
              </ul>
            </div>
            <div>
              <h2>Follow us</h2>
              <ul>
                {PROFILES.map((p) => (
                  <li key={p.label}>
                    <a href={p.href} target="_blank" rel="noopener noreferrer">
                      {p.label}
                      <Arrow external size={12} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </div>

        <div className="ds-legal">
          <span>© {YEAR} Ares Security LLC</span>
          <p className="ds-ft-ids">
            <a href={SAM_VERIFY} target="_blank" rel="noopener noreferrer" className="ds-ft-sam">
              <span className="ds-ft-light" aria-hidden="true" />
              Active on SAM.gov through {SAM_ACTIVE_THROUGH}
            </a>
            <a href={GSA_ELIBRARY} target="_blank" rel="noopener noreferrer" className="ds-data">GSA 47QSMS25D009Q</a>
            <span className="ds-data">UEI XQXDN6E33SF4</span>
            <span className="ds-data">CAGE 9KL18</span>
          </p>
          <ul>
            <li><Link to="/privacy">Privacy</Link></li>
            <li><Link to="/terms">Terms</Link></li>
            <li><Link to="/accessibility">Accessibility</Link></li>
            <li><a href={`mailto:contact@aressecurity.co?subject=${encodeURIComponent('Safety concern')}`}>Report a concern</a></li>
          </ul>
        </div>
      </div>

      {/* The closing band: the ARES letters, huge and ghosted, in rippled rust light. */}
      <div className="ds-ft-band" aria-hidden="true">
        <svg className="ds-ft-band-defs" width="0" height="0" focusable="false">
          <filter id="ds-ft-ripple" x="0" y="0" width="100%" height="100%" colorInterpolationFilters="sRGB">
            <feTurbulence type="fractalNoise" baseFrequency="0.0018 0.035" numOctaves="2" seed="7" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="12" xChannelSelector="R" yChannelSelector="G" result="bent" />
            <feGaussianBlur in="bent" stdDeviation="3 0.6" />
          </filter>
        </svg>
        <div className="ds-ft-band-art">
          <div className="ds-ft-band-light" />
          <div className="ds-ft-band-letters" />
        </div>
      </div>
    </footer>
  );
}

function PhoneIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3.5 2.5h2.2l1.1 2.8-1.4 1a7.5 7.5 0 0 0 4.3 4.3l1-1.4 2.8 1.1v2.2a1 1 0 0 1-1 1A10.5 10.5 0 0 1 2.5 3.5a1 1 0 0 1 1-1Z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="3.5" width="12" height="9" rx="1.5" />
      <path d="M2.5 4.5 8 8.5l5.5-4" />
    </svg>
  );
}
