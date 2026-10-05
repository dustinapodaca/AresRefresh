import { Link, useLocation } from 'react-router-dom';
import Arrow from './Arrow';
import { GSA_ELIBRARY } from './home/links';

// "Get to know Ares": order and wording set by the owner (About Us, Services, Careers).
const INDEX = [
  {
    to: '/about',
    title: 'About Us',
    body: 'Our journey, our principles, the capability statement that backs us, and the people who bring reliable security to every environment we serve.',
  },
  {
    to: '/services',
    title: 'Services',
    body: 'Six service divisions across federal, commercial, industrial, and specialized sectors. Documented, audit-ready, and ready for procurement.',
  },
  {
    to: '/careers',
    title: 'Careers',
    body: 'Join the team. Armed, unarmed, cleared, and office roles, with paid training and real growth paths.',
  },
];

export default function Footer() {
  const { pathname } = useLocation();
  // /services and /careers dock a CTA card ~290px into the footer's top edge.
  const extended = pathname === '/services' || pathname === '/careers';

  return (
    <footer className="ds ds-footer" data-extended={extended}>
      <div className="ds-container">
        <nav aria-labelledby="footer-index-title">
          <h2 id="footer-index-title" className="ds-index-title">
            Get to know Ares
          </h2>
          <ul className="ds-index">
            {INDEX.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="ds-row-link">
                  <span className="ds-display-md">{item.title}</span>
                  <span className="ds-small">{item.body}</span>
                  <Arrow size={22} />
                </Link>
              </li>
            ))}
          </ul>
        </nav>

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
