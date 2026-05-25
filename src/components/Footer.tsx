import { Link, useLocation } from 'react-router-dom';
import Socials from './Socials';

export default function Footer() {
  const { pathname } = useLocation();
  // Pages whose last section "docks" a CTA card halfway into the footer
  // use the `is-extended` modifier — see .site_footer.is-extended in
  // index.css. The page's bottom section uses a matching negative
  // margin so the card's lower half slides over the footer's extended
  // top padding. Listed explicitly so we don't unintentionally extend
  // the footer on routes that don't dock a card.
  const extended = pathname === '/services' || pathname === '/careers';

  return (
    <footer className={`site_footer is-dark has-bg-image${extended ? ' is-extended' : ''}`}>
      <div className="image_bg" aria-hidden="true" />
      <div className="container-ares">
        <div className="footer_row grid gap-12 pt-20 pb-12 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr]">
          {/* Brand block */}
          <div className="footer_brand flex max-w-[520px] flex-col gap-6">
            <Link to="/" className="footer_brand_top flex items-center gap-[18px]" aria-label="Ares Security home">
              <span className="glyph" aria-hidden="true" />
              <img className="wordmark" src="/images/ares-text.svg" alt="Ares Security" />
              <span className="sep" />
              <span className="est flex flex-col">
                <span>EST.</span>
                <span>2022</span>
              </span>
            </Link>
            <p>Public-sector compliance. Commercial reliability. A woman-owned, employee-focused firm delivering consistent results across every environment.</p>
          </div>

          {/* Navigate */}
          <FooterCol title="Navigate">
            <FooterLink to="/about">About</FooterLink>
            <FooterLink to="/services">Services</FooterLink>
            <FooterLink to="/careers">Careers</FooterLink>
          </FooterCol>

          {/* Contracting */}
          <FooterCol title="Contracting">
            <FooterLink href="https://www.gsaelibrary.gsa.gov/ElibMain/contractorInfo.do?contractNumber=47QSMS25D009Q&contractorName=ARES+SECURITY+LLC&executeQuery=YES">GSA #47QSMS25D009Q</FooterLink>
            <FooterLink to="/capability-statement">Capability Statement</FooterLink>
            <FooterLink to="/contact">Request a Quote</FooterLink>
          </FooterCol>

          {/* Contact */}
          <FooterCol title="Contact">
            <li>
              <a href="tel:+17196963966" className="text-[13px] uppercase tracking-[0.06em]">719-696-3966</a>
            </li>
            <li>
              <a href="mailto:contact@aressecurity.co" className="text-[13px] tracking-[0.02em] normal-case">contact@aressecurity.co</a>
            </li>
            <li className="mt-4 pt-0">
              <Socials variant="dark" />
            </li>
          </FooterCol>
        </div>

        {/* Creds pill — at <=460px the grid is 2x2; explicit order swaps GSA and
            Women Owned so the visual layout becomes:
                Row 1: Women Owned | SBA
                Row 2: GSA         | WBENC */}
        <ul className="footer_creds" role="list" aria-label="Certifications and contract vehicles">
          <li className="footer_creds_item max-[460px]:order-3">
            <img src="/images/cert-gsa-footer.png" alt="GSA Contract Holder" />
          </li>
          <li className="footer_creds_sep" aria-hidden="true" />
          <li className="footer_creds_item max-[460px]:order-2">
            <img src="/images/cert-sba-footer.png" alt="U.S. Small Business Administration" />
          </li>
          <li className="footer_creds_sep" aria-hidden="true" />
          <li className="footer_creds_item max-[460px]:order-1">
            <img src="/images/cert-women-owned.png" alt="Women Owned" />
          </li>
          <li className="footer_creds_sep" aria-hidden="true" />
          <li className="footer_creds_item max-[460px]:order-4">
            <img src="/images/cert-wbenc.png" alt="Certified WBENC Women's Business Enterprise" />
          </li>
        </ul>

        {/* Bottom bar — at <=460px stacks centered and breaks "All Rights Reserved."
            onto its own line. Above 460px keeps the side-by-side layout. */}
        <div className="footer_bottom flex flex-wrap items-center justify-between gap-3 py-6 text-[12px] uppercase tracking-[0.14em] max-[460px]:flex-col max-[460px]:items-center max-[460px]:justify-center max-[460px]:gap-4 max-[460px]:text-center">
          <span>
            © 2026 Ares Security LLC.
            <span className="ml-1 max-[460px]:ml-0 max-[460px]:block">All Rights Reserved.</span>
          </span>
          <ul className="flex gap-8 list-none m-0 p-0 max-[460px]:justify-center">
            <li><a href="#">Privacy</a></li>
            <li><a href="#">Terms</a></li>
            <li><a href="#">Accessibility</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="footer_col">
      <h5 className="m-0 mb-6 pb-1.5 border-b border-white/15 text-[13px] font-semibold uppercase tracking-[0.18em]">
        {title}
      </h5>
      <ul className="footer_menu list-none m-0 p-0 flex flex-col gap-3">
        {children}
      </ul>
    </div>
  );
}

function FooterLink({ to, href, children }: { to?: string; href?: string; children: React.ReactNode }) {
  const cls = 'text-[13px] uppercase tracking-[0.06em] transition-colors';
  if (to) return <li><Link to={to} className={cls}>{children}</Link></li>;
  const external = !!href && /^https?:\/\//.test(href);
  return (
    <li>
      <a
        href={href}
        className={cls}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {children}
      </a>
    </li>
  );
}
