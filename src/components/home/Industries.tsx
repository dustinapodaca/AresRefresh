import { Link, useSearchParams } from 'react-router-dom';
import Arrow from '../Arrow';
import { INDUSTRY_PAGES } from '../market/industries';
import { responsive } from '../../lib/responsive';

// 02 Industries (copy audit round 2, 2026-10-10): the six industries in the owner's fixed
// order, the first three larger (where the restricted-area and documented work lives), then
// the prime-contractor block linking to /teaming. Two forms for the owner to compare at
// /?industries=plates|rows; plates is the default until the owner picks, and the other form
// and this switch come out then.
//  plates  The first three as photographs set like the other photos in the column (4px
//          corners, hairline edge, graded down; generated, so no caption), title and line
//          beneath. The last three as a ruled strip.
//  rows    Type only: the first three as large ruled rows, the last three as a ruled strip.

const FEATURED = INDUSTRY_PAGES.slice(0, 3);
const REST = INDUSTRY_PAGES.slice(3);

export default function Industries() {
  const [params] = useSearchParams();
  const form = params.get('industries') === 'rows' ? 'rows' : 'plates';

  return (
    <section id="industries" className="ds-industries" aria-labelledby="industries-title">
      <div className="ds-sec-head">
        <h2 id="industries-title" className="ds-display-lg">
          The sites we protect.
        </h2>
        <p className="ds-lead">
          Six industries, from government facilities and critical sites to offices and
          campuses. Each has its own page: what the post covers and what to send us.
        </p>
      </div>

      {form === 'plates' ? (
        <ul className="ds-ind-plates">
          {FEATURED.map((ind) => (
            <li key={ind.slug}>
              <Link to={`/industries/${ind.slug}`}>
                <span className="ds-ind-photo" aria-hidden="true">
                  <img {...responsive(ind.image.src)} alt="" loading="lazy" decoding="async" />
                </span>
                <span className="ds-ind-name">
                  {ind.name.split(' ').slice(0, -1).join(' ')}{' '}
                  {/* The last word and the arrow never part. */}
                  <span className="ds-nowrap">
                    {ind.name.split(' ').slice(-1)[0]}
                    <Arrow size={18} />
                  </span>
                </span>
                <span className="ds-ind-line">{ind.short}</span>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <ul className="ds-ind-rows">
          {FEATURED.map((ind, i) => (
            <li key={ind.slug}>
              <Link to={`/industries/${ind.slug}`}>
                <span className="ds-data ds-ind-n" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                <span className="ds-ind-name">{ind.name}</span>
                <span className="ds-ind-line">{ind.short}</span>
                <Arrow size={24} />
              </Link>
            </li>
          ))}
        </ul>
      )}

      <ul className="ds-mk-routes ds-ind-rest">
        {REST.map((ind) => (
          <li key={ind.slug}>
            <Link to={`/industries/${ind.slug}`}>
              <span className="ds-mk-route-title">{ind.name}</span>
              <span className="ds-small">{ind.short}</span>
              <Arrow size={18} />
            </Link>
          </li>
        ))}
      </ul>

      <PrimesPanel form={params.get('prime')} />
    </section>
  );
}

// "For prime contractors." (copy audit round 3; second pass 2026-10-10 after Slash, Flora,
// and Resend on Mobbin): a contained panel with three proof points and a solid button to
// /teaming. Three forms to compare at /?prime=split|diagram|vignettes (split is the default
// for now). The one card container on Home besides the Record cards (owner exception).
const PRIME_PROOF = [
  { label: 'Subcontracting credit', value: 'Woman-owned small business', id: 'WOSB250470 · WBE2303571' },
  { label: 'Restricted areas', value: 'Escort and access control on a Space Force base in Colorado', id: 'Subcontractor · 2025 to 2027' },
  { label: 'Reliability', value: 'Fewer than 1% of shifts missed since 2021', id: 'On-call relief in every contract' },
];

function PrimesPanel({ form }: { form: string | null }) {
  const kind = form === 'diagram' || form === 'vignettes' ? form : 'split';
  const button = (
    <Link to="/teaming" className="ds-btn ds-btn-primary ds-primes-btn">
      Teaming and subcontracting
      <Arrow />
    </Link>
  );
  // Flora's two-tone sentence: the claim in ink, the detail muted.
  const line = (
    <p className="ds-primes-line">
      <span>A woman-owned subcontractor for Front Range work.</span> Restricted-area escorts,
      access control officers, and relief, overflow, and surge coverage under your contract.
    </p>
  );
  return (
    <div className="ds-primes-panel" data-form={kind}>
      {kind === 'split' && (
        // Slash's stat-and-quote split: the ask on the left, the proof on the right, one
        // vertical hairline between them.
        <>
          <div className="ds-primes-ask">
            <h3 className="ds-display-md">For prime contractors.</h3>
            {button}
          </div>
          <div className="ds-primes-proof">
            {line}
            <dl className="ds-primes-sheet">
              {PRIME_PROOF.map((p) => (
                <div key={p.label}>
                  <dt>{p.label}</dt>
                  <dd>
                    <span>{p.value}</span>
                    <span className="ds-data ds-primes-id">{p.id}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </>
      )}
      {kind === 'diagram' && (
        // Slash's "Secure by design": a drawn diagram of how the work flows (the prime holds
        // the contract, Ares staffs the posts) beside the proof.
        <>
          <div className="ds-primes-copy">
            <h3 className="ds-display-md">For prime contractors.</h3>
            {line}
            <ul className="ds-primes-list">
              {PRIME_PROOF.map((p) => (
                <li key={p.label}>
                  <span className="ds-primes-label">{p.label}</span>
                  <span className="ds-primes-value">{p.value}</span>
                </li>
              ))}
            </ul>
            {button}
          </div>
          <figure className="ds-primes-flow" aria-label="The prime holds the contract; Ares staffs restricted-area escort, access control, and relief posts under it">
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
        </>
      )}
      {kind === 'vignettes' && (
        // Flora's cards: a small working picture on top, the caption beneath.
        <>
          <div className="ds-primes-top">
            <div>
              <h3 className="ds-display-md">For prime contractors.</h3>
              {line}
            </div>
            {button}
          </div>
          <ul className="ds-primes-vigs">
            <li>
              <div className="ds-vig ds-vig-ids" aria-hidden="true">
                <span><b>SBA WOSB</b><span className="ds-data">WOSB250470</span></span>
                <span><b>WBENC</b><span className="ds-data">WBE2303571</span></span>
              </div>
              <h4>{PRIME_PROOF[0].label}</h4>
              <p>{PRIME_PROOF[0].value}</p>
            </li>
            <li>
              <div className="ds-vig ds-vig-term" aria-hidden="true">
                <span className="ds-vig-bar"><span /></span>
                <span className="ds-data ds-vig-years"><span>2025</span><span>2027</span></span>
              </div>
              <h4>{PRIME_PROOF[1].label}</h4>
              <p>{PRIME_PROOF[1].value}</p>
            </li>
            <li>
              <div className="ds-vig ds-vig-figure" aria-hidden="true">
                <span className="ds-data">&lt;1%</span>
              </div>
              <h4>{PRIME_PROOF[2].label}</h4>
              <p>{PRIME_PROOF[2].value}</p>
            </li>
          </ul>
        </>
      )}
    </div>
  );
}
