import { Link } from 'react-router-dom';
import Arrow from './Arrow';
import { GSA_ELIBRARY } from './home/links';
import { SAM_ACTIVE_THROUGH, SAM_VERIFY } from './capability/data';

// The footer (owner, 2026-10-08, after Ada's on Mobbin): link columns across the top; a
// hairline; then a lower half split by a vertical rule. Left: who we are, and the Ares
// lockup (mark, rule, ARES / SECURITY text logo) set large on the footer's foot. Right:
// follow us, get in touch, the certification marks, and the legal links at the foot. No
// quote button: the nav and each page carry it. No newsletter (Ares has none).

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
        <div className="ds-footer-cols">
          <div>
            <h2>Company</h2>
            <ul>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/careers">Careers</Link></li>
              <li><Link to="/capability-statement">Capability Statement</Link></li>
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
            <h2>Contracting</h2>
            <ul className="ds-ft-ids">
              <li>
                <span>GSA MAS</span>
                <a href={GSA_ELIBRARY} target="_blank" rel="noopener noreferrer" className="ds-data">47QSMS25D009Q</a>
              </li>
              <li>
                <span>UEI</span>
                <span className="ds-data">XQXDN6E33SF4</span>
              </li>
              <li>
                <span>CAGE</span>
                <span className="ds-data">9KL18</span>
              </li>
            </ul>
          </div>

          <div>
            <h2>Registration</h2>
            <p className="ds-ft-status">
              <span className="ds-ft-light" aria-hidden="true" />
              Active on SAM.gov
            </p>
            <p className="ds-ft-status-note">Through {SAM_ACTIVE_THROUGH}</p>
            <a href={SAM_VERIFY} target="_blank" rel="noopener noreferrer" className="ds-ft-verify">
              Verify
              <Arrow external size={12} />
            </a>
          </div>
        </div>

        <div className="ds-ft-lower">
          <div className="ds-ft-left">
            <div className="ds-ft-row">
              <h2 className="ds-ft-label">Who we are</h2>
              <p className="ds-ft-statement">
                A minority woman-owned, employee-focused security firm, founded in Colorado
                Springs in 2021 and licensed in Colorado Springs, Denver, and Pueblo.
              </p>
            </div>
            <Link to="/" className="ds-ft-lockup" aria-label="Ares Security home">
              <span className="ds-ft-lockup-mark" aria-hidden="true" />
              <span className="ds-ft-lockup-rule" aria-hidden="true" />
              <span className="ds-ft-lockup-text" aria-hidden="true" />
            </Link>
          </div>

          <div className="ds-ft-right">
            <div className="ds-ft-row">
              <h2 className="ds-ft-label">Follow us</h2>
              <ul className="ds-ft-list">
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
            <div className="ds-ft-row">
              <h2 className="ds-ft-label">Get in touch</h2>
              <ul className="ds-ft-list">
                <li><a href="tel:+17196963966" className="ds-data">719-696-3966</a></li>
                <li><a href="mailto:contact@aressecurity.co" className="ds-data">contact@aressecurity.co</a></li>
              </ul>
            </div>
            <ul className="ds-certs" aria-label="Certifications and contract vehicles">
              <li><img src="/images/cert-gsa-footer.png" alt="GSA Contract Holder" loading="lazy" /></li>
              <li><img src="/images/cert-sba-footer.png" alt="U.S. Small Business Administration" loading="lazy" /></li>
              <li><img src="/images/cert-women-owned.png" alt="Women Owned" loading="lazy" /></li>
              <li><img src="/images/cert-wbenc.png" alt="Certified WBENC Women's Business Enterprise" loading="lazy" /></li>
            </ul>
            <div className="ds-legal">
              <span>© {YEAR} Ares Security LLC</span>
              <ul>
                <li><Link to="/privacy">Privacy</Link></li>
                <li><Link to="/terms">Terms</Link></li>
                <li><Link to="/accessibility">Accessibility</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
