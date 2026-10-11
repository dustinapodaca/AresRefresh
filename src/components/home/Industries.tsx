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

// "For prime contractors." (copy audit round 3, owner 2026-10-10): a contained panel with
// three proof points and a solid button to /teaming. Three forms to compare at
// /?prime=brief|sheet|key (Mobbin: Mailchimp, Kajabi, Dropbox partner bands; Mews figures).
// The one card container on Home besides the Record cards (owner exception).
const PRIME_PROOF = [
  { label: 'Subcontracting credit', value: 'Woman-owned small business', id: 'WOSB250470 · WBE2303571', key: 'WOSB' },
  { label: 'Restricted areas', value: 'Escort and access control on a Space Force base in Colorado', id: 'Subcontractor · 2025 to 2027', key: '2025–27' },
  { label: 'Reliability', value: 'Fewer than 1% of shifts missed since 2021', id: 'On-call relief in every contract', key: '<1%' },
];

function PrimesPanel({ form }: { form: string | null }) {
  const kind = form === 'brief' || form === 'key' ? form : 'sheet';
  const head = (
    <>
      <h3 className="ds-display-md">For prime contractors.</h3>
      <p className="ds-primes-line">
        Woman-owned subcontracting credit, restricted-area escorts, and relief, overflow, and
        surge coverage on Front Range work.
      </p>
    </>
  );
  const button = (
    <Link to="/teaming" className="ds-btn ds-btn-primary ds-primes-btn">
      Teaming and subcontracting
      <Arrow />
    </Link>
  );
  return (
    <div className="ds-primes-panel" data-form={kind}>
      {kind === 'brief' && (
        <>
          <div className="ds-primes-top">
            <div>{head}</div>
            {button}
          </div>
          <ul className="ds-primes-cols">
            {PRIME_PROOF.map((p) => (
              <li key={p.label}>
                <span className="ds-primes-label">{p.label}</span>
                <span className="ds-primes-value">{p.value}</span>
                <span className="ds-data ds-primes-id">{p.id}</span>
              </li>
            ))}
          </ul>
        </>
      )}
      {kind === 'sheet' && (
        <>
          <div className="ds-primes-copy">
            {head}
            {button}
          </div>
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
        </>
      )}
      {kind === 'key' && (
        <>
          <div className="ds-primes-copy">
            {head}
            {button}
          </div>
          <ul className="ds-primes-key">
            {PRIME_PROOF.map((p) => (
              <li key={p.label}>
                <span className="ds-data ds-primes-figure">{p.key}</span>
                <span className="ds-primes-label">{p.label}</span>
                <span className="ds-primes-caption">{p.value}</span>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

