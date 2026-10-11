import { Link } from 'react-router-dom';
import Seo from '../seo/Seo';
import Arrow from '../components/Arrow';
import { AskStrip, FaqSection, Sheet } from '../components/market/parts';
import type { Faq, SheetRow } from '../components/market/roles';
import { GSA_ELIBRARY } from '../components/home/links';
import { PDF_URL, SAM_VERIFY } from '../components/capability/data';

// Teaming and subcontracting (copy audit round 2, owner 2026-10-10): the landing page for
// primes, guard companies, and builders, the page every teaming email links to. No facility
// clearance claim and no clearance wording here (clearance requirements live on Careers
// only, owner 2026-10-10). Built on the market page parts (DESIGN.md).

const QUOTE = '/contact?service=teaming';

const IDS: SheetRow[] = [
  { label: 'GSA MAS', value: '47QSMS25D009Q, SIN 561612', href: GSA_ELIBRARY, external: true },
  { label: 'UEI', value: 'XQXDN6E33SF4', href: SAM_VERIFY, external: true },
  { label: 'CAGE', value: '9KL18' },
  { label: 'NAICS', value: '561612, Security Guards and Patrol Services' },
  { label: 'SBA WOSB', value: 'WOSB250470' },
  { label: 'Denver M/WBE and SBE', value: 'B2G vendor 21353671' },
];

const PARTNERS = [
  { name: 'Prime contractors', line: 'On federal and commercial contracts that need a woman-owned security subcontractor, or more officers than the prime can staff.' },
  { name: 'Guard companies', line: 'Relief, overflow, and surge shifts on posts you already hold, staffed to your post orders.' },
  { name: 'Builders and general contractors', line: 'Escorts, gate control, and access control while a site is built, including on military construction.' },
];

const ROLES = [
  { name: 'Restricted-area escorts', line: 'Crews, visitors, and deliveries escorted and logged inside controlled areas.', to: '/services/restricted-area-escort' },
  { name: 'Access control officers', line: 'Credentials, visitors, vehicles, and deliveries checked at every entry.', to: '/services/access-control' },
  { name: 'Relief, overflow, and surge coverage', line: 'Officers for the shifts and spikes your own roster cannot cover.', to: '/services/relief-surge-coverage' },
];

const GETS: SheetRow[] = [
  { label: 'Subcontracting credit', value: 'A woman-owned small business (SBA WOSB250470), WBENC certified (WBE2303571)' },
  { label: 'Denver participation', value: 'Denver M/WBE and SBE certified', href: '/capability-statement' },
  { label: 'Licensed', value: 'Armed and unarmed, in Colorado Springs, Denver, and Pueblo', href: '/locations/denver' },
  { label: 'Reliability', value: 'Fewer than 1% of shifts missed since 2021' },
  { label: 'Past performance', value: 'Restricted-area escort and access control on a Space Force base in Colorado, as a subcontractor, 2025 to 2027', href: '/capability-statement#past' },
];

const HOW = [
  { name: 'Mutual non-solicitation', line: 'We are open to a mutual non-solicitation agreement for the people on a shared contract.' },
  { name: 'Post orders and training on your site', line: 'We write the post orders with you, and a member of our leadership trains each officer on the post before the first shift.' },
  { name: 'Relief behind every post', line: 'On-call coverage is written into every contract, so a shift is never left open.' },
  { name: 'Records you can audit', line: 'Checkpoint, visitor, and incident logs, kept to your post orders.' },
];

const FAQ: Faq[] = [
  {
    q: 'Can you cover relief or overflow on a contract we already hold?',
    a: 'Yes. We staff relief, overflow, and surge shifts under your contract, trained on your post orders before the first shift, with our own on-call relief behind them.',
  },
  {
    q: 'Will you agree to mutual non-solicitation?',
    a: 'Yes. We are open to a mutual non-solicitation agreement covering the people on a shared contract.',
  },
  {
    q: 'Do you subcontract on federal work?',
    a: 'Yes. Ares provides restricted-area escort and access control on a Space Force base in Colorado as a subcontractor on a federal construction program, and holds GSA Multiple Award Schedule contract 47QSMS25D009Q.',
  },
  {
    q: 'Where in Colorado do you work?',
    a: 'Along the Front Range: the Denver metro area, Colorado Springs, and Pueblo. Ares is licensed and bonded for armed and unarmed security in all three cities.',
  },
];

export default function Teaming() {
  return (
    <main id="main" tabIndex={-1} className="ds ds-page ds-mk">
      <Seo path="/teaming" />

      <section className="ds-container ds-mk-open" aria-labelledby="mk-title">
        <div className="ds-mk-open-copy">
          <h1 id="mk-title" className="ds-display-xl">Teaming and subcontracting</h1>
          <p className="ds-lead">
            A minority woman-owned security subcontractor for primes, guard companies, and
            builders on Colorado's Front Range: restricted-area escorts, access control officers,
            and relief, overflow, and surge coverage.
          </p>
          <div className="ds-actions">
            <Link to={QUOTE} className="ds-btn ds-btn-primary">
              Talk teaming
              <Arrow />
            </Link>
            <a href="tel:+17196963966" className="ds-link">
              Call <span className="ds-data">719-696-3966</span>
            </a>
            {/* Primes look for the capability statement (copy audit round 3). */}
            <a href={PDF_URL} className="ds-link" download>
              Capability statement (PDF)
              <Arrow size={14} />
            </a>
          </div>
        </div>
        <Sheet rows={IDS} label="Ares Security identifiers" />
      </section>

      <div className="ds-container">
        <section className="ds-mk-sec" aria-labelledby="tm-who">
          <h2 id="tm-who" className="ds-display-lg">Who we team with.</h2>
          <ol className="ds-mk-duties">
            {PARTNERS.map((p, i) => (
              <li key={p.name}>
                <span className="ds-data ds-mk-n" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                <h3>{p.name}</h3>
                <p>{p.line}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="ds-mk-sec ds-mk-sec-tight" aria-labelledby="tm-roles">
          <h2 id="tm-roles" className="ds-display-md">Roles we fill.</h2>
          <ul className="ds-mk-routes" aria-label="Roles we fill">
            {ROLES.map((r) => (
              <li key={r.name}>
                <Link to={r.to}>
                  <span className="ds-mk-route-title">{r.name}</span>
                  <span className="ds-small">{r.line}</span>
                  <Arrow size={18} />
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="ds-mk-sec ds-mk-split" aria-labelledby="tm-gets">
          <h2 id="tm-gets" className="ds-display-lg">What the prime gets.</h2>
          <Sheet rows={GETS} label="What the prime gets" />
        </section>
        {/* The Home prime panel's diagram, explaining teaming at a glance (owner, 2026-10-10). */}
        <section className="ds-mk-sec ds-mk-sec-tight" aria-label="How teaming works">
            <figure className="ds-primes-flow ds-tm-flow" aria-label="The prime holds the contract; Ares staffs restricted-area escort, access control, and relief posts under it">
              <div className="ds-flow-node ds-flow-prime" aria-hidden="true">
                <span className="ds-data">Prime contractor</span>
                <span>Holds the contract</span>
              </div>
              <span className="ds-flow-line ds-flow-down" aria-hidden="true" />
              <div className="ds-flow-node ds-flow-ares" aria-hidden="true">
                <span className="ds-data">Ares Security</span>
                <span>WOSB subcontractor · post orders, training, relief</span>
              </div>
              <span className="ds-flow-line ds-flow-fork" aria-hidden="true" />
              <div className="ds-flow-posts" aria-hidden="true">
                <span>Restricted-area escort</span>
                <span>Access control</span>
                <span>Relief and surge</span>
              </div>
            </figure>
        </section>

        <section className="ds-mk-sec" aria-labelledby="tm-how">
          <h2 id="tm-how" className="ds-display-lg">How we work.</h2>
          <ol className="ds-mk-duties">
            {HOW.map((p, i) => (
              <li key={p.name}>
                <span className="ds-data ds-mk-n" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                <h3>{p.name}</h3>
                <p>{p.line}</p>
              </li>
            ))}
          </ol>
        </section>

        <FaqSection items={FAQ} />

        <AskStrip line="Send us the contract, the posts, and the coverage you need. We will come back with who we can staff and when." quote={QUOTE} label="Talk teaming" />
      </div>
    </main>
  );
}
