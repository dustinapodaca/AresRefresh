import { Link } from 'react-router-dom';
import Arrow from './Arrow';
import { GSA_ELIBRARY } from './home/links';
import { SAM_ACTIVE_THROUGH, SAM_VERIFY } from './capability/data';
import { responsive } from '../lib/responsive';

// The footer (owner, 2026-10-06; Mobbin: Retool's ruled columns, Railway's wordmark under
// glass, Windsurf's and Opacity's light). No quote button: every page's close and the nav
// carry it. The mark and the company line with the phone, email, and profiles beside them;
// the columns; the certification marks; then the ARES wordmark set large over a slow rust
// light, its foot under a band of dark glass that holds the legal row.

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
            <Link to="/" className="ds-brand ds-ft-brand" aria-label="Ares Security home">
              <span className="ds-mark" aria-hidden="true" />
              <span className="ds-ft-divider" aria-hidden="true" />
              <span className="ds-ft-wordmark" aria-hidden="true" />
            </Link>
            <p className="ds-ft-statement">
              A minority woman-owned, employee-focused security firm. Founded 2021 in Colorado
              Springs.
            </p>
          </div>

          <div className="ds-ft-reach">
            <a href="tel:+17196963966" className="ds-data ds-ft-phone">719-696-3966</a>
            <a href="mailto:contact@aressecurity.co" className="ds-data ds-ft-email">contact@aressecurity.co</a>
            <ul className="ds-ft-profiles" aria-label="Ares Security elsewhere">
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
        </div>

        <div className="ds-footer-cols">
          <div>
            <h2>Company</h2>
            <ul>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/careers">Careers</Link></li>
              <li><Link to="/capability-statement">Capability Statement</Link></li>
              <li><Link to="/teaming">Teaming</Link></li>
              <li><Link to="/insights">Insights</Link></li>
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
              {/* The rest of the email signature's row (copy audit round 2, 2026-10-10). */}
              <li>
                <span>SBA WOSB</span>
                <span className="ds-data">WOSB250470</span>
              </li>
              <li>
                <span>WBENC</span>
                <span className="ds-data">WBE2303571</span>
              </li>
              <li>
                <span>Denver</span>
                <span>M/WBE and SBE</span>
              </li>
              <li>
                <span>B2G vendor</span>
                <span className="ds-data">21353671</span>
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

        <ul className="ds-certs" aria-label="Certifications and contract vehicles">
          <li><img {...responsive('/images/cert-gsa-footer.png')} alt="GSA Contract Holder" loading="lazy" /></li>
          <li><img {...responsive('/images/cert-sba-footer.png')} alt="U.S. Small Business Administration" loading="lazy" /></li>
          <li><img {...responsive('/images/cert-women-owned.png')} alt="Women Owned" loading="lazy" /></li>
          <li><img {...responsive('/images/cert-wbenc.png')} alt="Certified WBENC Women's Business Enterprise" loading="lazy" /></li>
          {/* Denver M/WBE and SBE, approved Sept 25, 2026 (copy audit round 2). */}
          <li><img {...responsive('/images/cert-denver-edo.webp')} alt="Denver Economic Development & Opportunity, M/WBE and SBE certified" loading="lazy" /></li>
        </ul>
      </div>

      <div className="ds-ft-stage">
        <div className="ds-ft-aurora" aria-hidden="true" />
        <div className="ds-container">
          <div className="ds-ft-giant" aria-hidden="true" />
        </div>
        <div className="ds-ft-glass">
          <div className="ds-container">
            <div className="ds-legal">
              <span>© {YEAR} Ares Security LLC. All rights reserved.</span>
              <span>Colorado Springs, Colorado</span>
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
