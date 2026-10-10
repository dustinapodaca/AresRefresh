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
          Six industries, from restricted areas on military construction to offices and
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

      <div className="ds-primes">
        <h3 className="ds-display-md">For prime contractors.</h3>
        <div>
          <p className="ds-lead">
            Woman-owned subcontracting credit, restricted-area escorts, and relief, overflow,
            and surge coverage on Front Range work.
          </p>
          <Link to="/teaming" className="ds-link">
            Teaming and subcontracting
            <Arrow />
          </Link>
        </div>
      </div>
    </section>
  );
}
