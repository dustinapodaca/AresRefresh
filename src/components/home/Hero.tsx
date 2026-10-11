import { Link, useSearchParams } from 'react-router-dom';
import Arrow from '../Arrow';
import { GSA_ELIBRARY } from './links';
import { responsive } from '../../lib/responsive';

// Hero options from the copy audit (round 2, 2026-10-10), for the owner to compare at
// /?hero=current|a|b|b1|b2|b3|b4|c. A is the audit's recommendation and the default until the owner
// picks; the losing options and this switch come out then. No eyebrow above the headline
// (owner); the search phrase is carried by the title and description.
const OPTIONS = {
  current: {
    title: 'Security guards for federal and commercial sites.',
    lead: 'Ares is a minority woman-owned, employee-focused security firm in Colorado Springs, serving Denver and Pueblo. We bridge public-sector compliance and commercial reliability.',
    proof: false,
  },
  a: {
    title: 'Security for sites where every entry counts.',
    // Escorts no longer lead the line, and the sites are named broadly (owner, 2026-10-10:
    // not first, not twice, and not "military construction" up front).
    lead: 'Armed and unarmed officers, access control, and restricted-area escorts along Colorado\u2019s Front Range, for government and critical sites as well as offices, retail, and campuses.',
    proof: true,
  },
  b: {
    title: 'Security guards and escorts for Colorado\u2019s controlled sites.',
    lead: 'From restricted areas and data centers to offices and campuses: officers trained on your post before the first shift.',
    proof: true,
  },
  // Shorter headlines over B's lead (owner, 2026-10-10: B is too long, keep its line).
  b1: { title: 'Security guards for Colorado sites.', lead: 'From restricted areas and data centers to offices and campuses: officers trained on your post before the first shift.', proof: true },
  b2: { title: 'A prepared officer on every post.', lead: 'From restricted areas and data centers to offices and campuses: officers trained on your post before the first shift.', proof: true },
  b3: { title: 'Armed and unarmed, across Colorado.', lead: 'From restricted areas and data centers to offices and campuses: officers trained on your post before the first shift.', proof: true },
  b4: { title: 'Every entry counts.', lead: 'From restricted areas and data centers to offices and campuses: officers trained on your post before the first shift.', proof: true },
  c: {
    title: 'Escorts. Access control. Officers. One standard.',
    lead: 'Every Ares post runs on written post orders, on-site training, and on-call relief, whether it\u2019s a restricted area or a retail floor.',
    proof: true,
  },
} as const;
type OptionKey = keyof typeof OPTIONS;

export default function Hero() {
  const [params] = useSearchParams();
  const asked = params.get('hero');
  // Trying B as the default (owner, 2026-10-10); A is at /?hero=a.
  const hero = OPTIONS[(asked && asked in OPTIONS ? asked : 'b') as OptionKey];
  return (
    <section className="ds-hero" aria-labelledby="hero-title">
      {/* The copper-glass tower (hero6.jpg), back on Home (owner, 2026-10-08; it was the
          Services band). Full bleed from 900px; runs down under 01 Record. */}
      <div className="ds-hero-photo" aria-hidden="true">
        <img {...responsive('/images/hero6.jpg')} alt="" decoding="sync" {...{ fetchpriority: 'high' }} />
      </div>

      <div className="ds-container">
        <div className="ds-hero-copy">
          <h1 id="hero-title" className="ds-display-xl">
            {hero.title}
          </h1>
          <p className="ds-lead">{hero.lead}</p>
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
          {hero.proof ? (
            // The proof row (audit): one line each, every one checkable on the linked page.
            // The escort item came out (owner, 2026-10-10): the lead already names escorts.
            <ul className="ds-hero-proof" aria-label="Proof">
              <li>
                <span>GSA MAS</span>{' '}
                <a href={GSA_ELIBRARY} target="_blank" rel="noopener noreferrer" className="ds-data">
                  47QSMS25D009Q
                  <Arrow external size={12} />
                </a>
              </li>
              <li>
                <Link to="/capability-statement">Minority woman-owned (WOSB, WBENC)</Link>
              </li>
              <li>
                <Link to="/locations/colorado-springs">Licensed in Colorado Springs, Denver, Pueblo</Link>
              </li>
            </ul>
          ) : (
            <div className="ds-hero-gsa">
              <img {...responsive('/images/gsa-contract-holder.png')} alt="GSA Contract Holder" width={125} height={30} />
              <div>
                <span className="ds-small">GSA Multiple Award Schedule</span>
                <a href={GSA_ELIBRARY} target="_blank" rel="noopener noreferrer" className="ds-link ds-data">
                  47QSMS25D009Q
                  <Arrow external size={14} />
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
