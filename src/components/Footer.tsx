import { Link, useLocation } from 'react-router-dom';
import { GSA_ELIBRARY } from './home/links';

export default function Footer() {
  const { pathname } = useLocation();
  // /careers docks a CTA card ~290px into the footer's top edge.
  const extended = pathname === '/careers';

  return (
    <footer className="ds ds-footer" data-extended={extended}>
      <div className="ds-container">
        <div className="ds-footer-cols">
          <div>
            <Link to="/" className="ds-brand" aria-label="Ares Security home" style={{ marginRight: 0 }}>
              <span className="ds-mark" aria-hidden="true" />
              <span className="ds-wordmark" aria-hidden="true" />
            </Link>
            <p className="ds-small" style={{ marginTop: 18, maxWidth: '34ch' }}>
              A minority woman-owned, employee-focused security firm. Founded 2021 in Colorado
              Springs.
            </p>
          </div>

          <div>
            <h2>Company</h2>
            <ul>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/careers">Careers</Link></li>
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
            <ul>
              <li>
                <a href={GSA_ELIBRARY} target="_blank" rel="noopener noreferrer" className="ds-data">
                  GSA 47QSMS25D009Q
                </a>
              </li>
              <li><Link to="/capability-statement">Capability Statement</Link></li>
              <li><Link to="/contact">Request a quote</Link></li>
            </ul>
          </div>

          <div>
            <h2>Contact</h2>
            <ul>
              <li><a href="tel:+17196963966" className="ds-data">719-696-3966</a></li>
              <li><a href="mailto:contact@aressecurity.co" className="ds-data">contact@aressecurity.co</a></li>
            </ul>
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
