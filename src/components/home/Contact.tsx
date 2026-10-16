import { Link, useSearchParams } from 'react-router-dom';
import Arrow from '../Arrow';

// The close, five forms for the owner to compare at /?close=current|centered|starter|routes|ledger
// (owner, 2026-10-16, from Mobbin; each is a whole version, desktop and phone). `routes` chosen
// (owner, 2026-10-16), without its primes line.
//   current   the headline, the phone large, email and base, the button and the PDF link
//   centered  one centered statement over the rust light, the button and the call link side by side
//             (Resend, Slash, Rox)
//   starter   the headline left; a glass card right where the reader picks what needs covering,
//             each a link that opens the quote form with it chosen (Claude's split close, Fiasco's chips)
//   routes    two glass cards, Request a quote and Call us (Linear, Grok); the primes line under them
//             was removed (owner, 2026-10-16)
//   ledger    the headline and the button left; the other ways in as ruled rows right (Clay)
const FORMS = ['current', 'centered', 'starter', 'routes', 'ledger'] as const;
type Form = (typeof FORMS)[number];

const PHONE = '719-696-3966';
const TEL = 'tel:+17196963966';
const EMAIL = 'contact@aressecurity.co';

// The quote form's own answers and slugs (src/pages/Contact.tsx, NEEDS), in the fixed order.
const NEEDS = [
  { slug: 'armed-security-officers', label: 'Armed Security Officers' },
  { slug: 'unarmed-security-officers', label: 'Unarmed Security Officers' },
  { slug: 'access-control', label: 'Access Control Officers' },
  { slug: 'restricted-area-escort', label: 'Restricted-Area Escort' },
  { slug: 'relief-surge-coverage', label: 'Relief & Surge Coverage' },
  { slug: 'mobile-patrol', label: 'Mobile Patrol' },
  { slug: 'teaming', label: 'Teaming or subcontract' },
];

export default function Contact() {
  const [params] = useSearchParams();
  const asked = params.get('close');
  const form: Form = FORMS.includes(asked as Form) ? (asked as Form) : 'routes';

  return (
    <section id="contact" className="ds-contact" data-form={form} aria-labelledby="contact-title">
      {form === 'current' && <Current />}
      {form === 'centered' && <Centered />}
      {form === 'starter' && <Starter />}
      {form === 'routes' && <Routes />}
      {form === 'ledger' && <Ledger />}
    </section>
  );
}

function Current() {
  return (
    <>
      <h2 id="contact-title" className="ds-display-xl">
        Request a quote, or call us.
      </h2>
      <a href={TEL} className="ds-phone">
        {PHONE}
      </a>
      <dl className="ds-pairs">
        <div>
          <dt>Email</dt>
          <dd>
            <a href={`mailto:${EMAIL}`} className="ds-link ds-data">
              {EMAIL}
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
          Request a Quote
          <Arrow />
        </Link>
        <Link to="/capability-statement" className="ds-link">
          Download the capability statement
        </Link>
      </div>
    </>
  );
}

function Centered() {
  return (
    <div className="ds-cta-center">
      <h2 id="contact-title" className="ds-display-xl">
        Tell us about the post.
      </h2>
      <p className="ds-lead">
        Leadership reads every request, and we walk your site before anything is signed.
      </p>
      <div className="ds-actions">
        <Link to="/contact" className="ds-btn ds-btn-primary">
          Request a Quote
          <Arrow />
        </Link>
        <a href={TEL} className="ds-link">
          Call <span className="ds-data">{PHONE}</span>
        </a>
      </div>
      <p className="ds-data ds-cta-meta">
        <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
        <span aria-hidden="true">·</span>
        <span>Colorado Springs, CO</span>
      </p>
    </div>
  );
}

function Starter() {
  return (
    <div className="ds-cta-split">
      <div className="ds-cta-copy">
        <h2 id="contact-title" className="ds-display-xl">
          Start with the post.
        </h2>
        <p className="ds-lead">
          Pick what needs covering and the quote form opens with it chosen. Leadership reads
          every request.
        </p>
        <p className="ds-cta-alt">
          Rather talk?{' '}
          <a href={TEL} className="ds-link ds-data">
            {PHONE}
          </a>
        </p>
      </div>
      <div className="ds-cta-card ds-cta-starter">
        <h3 className="ds-cta-card-title" id="cta-needs">What needs covering?</h3>
        <ul aria-labelledby="cta-needs">
          {NEEDS.map((n) => (
            <li key={n.slug}>
              <Link to={`/contact?service=${n.slug}`}>{n.label}</Link>
            </li>
          ))}
        </ul>
        <Link to="/contact" className="ds-btn ds-btn-primary">
          Request a Quote
          <Arrow />
        </Link>
      </div>
    </div>
  );
}

function Routes() {
  return (
    <>
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
    </>
  );
}

function Ledger() {
  const rows = [
    { label: 'Call', value: PHONE, mono: true, href: TEL },
    { label: 'Email', value: EMAIL, mono: true, href: `mailto:${EMAIL}` },
    { label: 'Capability statement', value: 'One page, PDF', to: '/capability-statement' },
    { label: 'Prime contractors', value: 'Teaming & subcontracting', to: '/teaming' },
  ];
  return (
    <div className="ds-cta-split">
      <div className="ds-cta-copy">
        <h2 id="contact-title" className="ds-display-xl">
          Request a quote, or call us.
        </h2>
        <p className="ds-lead">
          Send a site, a shift pattern, and a deadline. Leadership reads every request.
        </p>
        <div className="ds-actions">
          <Link to="/contact" className="ds-btn ds-btn-primary">
            Request a Quote
            <Arrow />
          </Link>
        </div>
      </div>
      <ul className="ds-cta-ledger">
        {rows.map((r) => {
          const inner = (
            <>
              <span className="ds-cta-ledger-label">{r.label}</span>
              <span className={r.mono ? 'ds-cta-ledger-value ds-data' : 'ds-cta-ledger-value'}>{r.value}</span>
              <Arrow />
            </>
          );
          return (
            <li key={r.label}>
              {r.to ? <Link to={r.to}>{inner}</Link> : <a href={r.href}>{inner}</a>}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
