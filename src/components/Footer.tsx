import { Link, useLocation } from 'react-router-dom';
import Arrow from './Arrow';
import { GSA_ELIBRARY } from './home/links';
import { SAM_VERIFY } from './capability/data';

// The footer (Mobbin board, 2026-10-05: Attio's action column, Resend's status light,
// Cosmos's statement beside the mark). The company line set large with the mark, the
// quote, phone, and email beside it; then the columns, with the SAM.gov registration as
// a live status; then the certification marks and the legal row.
export default function Footer() {
  const { pathname } = useLocation();
  // /careers docks a CTA card ~290px into the footer's top edge.
  const extended = pathname === '/careers';

  return (
    <footer className="ds ds-footer" data-extended={extended}>
      <div className="ds-container">
        <div className="ds-ft-top">
          <div className="ds-ft-intro">
            <Link to="/" className="ds-brand" aria-label="Ares Security home" style={{ marginRight: 0 }}>
              <span className="ds-mark" aria-hidden="true" />
            </Link>
            <p className="ds-ft-statement">
              A minority woman-owned, employee-focused security firm. Founded 2021 in Colorado
              Springs.
            </p>
          </div>

          <div className="ds-ft-act">
            <p className="ds-small">Have a site to cover?</p>
            <Link to="/contact" className="ds-btn ds-btn-primary">
              Request a quote
              <Arrow />
            </Link>
            <ul>
              <li><a href="tel:+17196963966" className="ds-data">719-696-3966</a></li>
              <li><a href="mailto:contact@aressecurity.co" className="ds-data">contact@aressecurity.co</a></li>
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
            <p className="ds-ft-status-note">Through March 26, 2027</p>
            <a href={SAM_VERIFY} target="_blank" rel="noopener noreferrer" className="ds-ft-verify">
              Verify
              <Arrow external size={12} />
            </a>
          </div>
        </div>

        <ul className="ds-certs" aria-label="Certifications and contract vehicles">
          <li><img src="/images/cert-gsa-footer.png" alt="GSA Contract Holder" loading="lazy" /></li>
          <li><img src="/images/cert-sba-footer.png" alt="U.S. Small Business Administration" loading="lazy" /></li>
          <li><img src="/images/cert-women-owned.png" alt="Women Owned" loading="lazy" /></li>
          <li><img src="/images/cert-wbenc.png" alt="Certified WBENC Women's Business Enterprise" loading="lazy" /></li>
        </ul>

        <div className="ds-legal">
          <span>© 2026 Ares Security LLC. All rights reserved.</span>
          <span>Colorado Springs, Colorado</span>
          <ul>
            <li><a href="#">Privacy</a></li>
            <li><a href="#">Terms</a></li>
            <li><a href="#">Accessibility</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
