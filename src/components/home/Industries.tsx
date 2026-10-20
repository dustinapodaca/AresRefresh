import type { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import Arrow from '../Arrow';
import { INDUSTRY_PAGES } from '../market/industries';
import { responsive } from '../../lib/responsive';
import PrimePipeline from './PrimePipeline';
import PrimeGlow from './PrimeGlow';
import { RevealHeading, RevealLead } from './Reveal';

// 02 Industries (copy audit round 2, 2026-10-10): the six industries in the owner's fixed
// order, the first three larger (where the restricted-area and documented work lives), then
// the prime-contractor block linking to /teaming. Plates (owner, 2026-10-10): the first three as
// photographs set like the other photos in the column (4px corners, hairline edge, graded down),
// title and line beneath; the last three as a ruled strip. The type-only rows (/?industries=rows)
// were removed at launch (owner, 2026-10-19; tag options-archive-2026-10-19, docs/options-archive.md).

const FEATURED = INDUSTRY_PAGES.slice(0, 3);
const REST = INDUSTRY_PAGES.slice(3);

export default function Industries() {
  return (
    <section id="industries" className="ds-industries" aria-labelledby="industries-title">
      <div className="ds-sec-head">
        <RevealHeading id="industries-title" className="ds-display-lg">
          The sites we protect.
        </RevealHeading>
        <RevealLead className="ds-lead">
          {'Six industries, from government facilities and critical sites to offices and campuses. Each has its own page: what the post covers and what to send us.'}
        </RevealLead>
      </div>

        <ul className="ds-ind-plates">
          {FEATURED.map((ind) => (
            <li key={ind.slug}>
              <Link to={`/industries/${ind.slug}`}>
                <span className="ds-ind-photo" aria-hidden="true">
                  <img
                    {...responsive(ind.image.src)}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    // Per-image card framing (industries.ts); `scale` composes with the hover zoom.
                    style={
                      ind.image.card
                        ? ({
                            '--card-pos': ind.image.card.position,
                            '--card-pos-desktop': ind.image.card.desktopPosition ?? ind.image.card.position,
                            scale: ind.image.card.zoom ? String(ind.image.card.zoom) : undefined,
                            transformOrigin: ind.image.card.origin,
                          } as CSSProperties)
                        : undefined
                    }
                  />
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

      <PrimesPanel />
    </section>
  );
}

// "For prime contractors." (copy audit round 3; second pass 2026-10-10 after Slash, Flora, and
// Resend on Mobbin): a contained panel with three proof points and a solid button to /teaming, beside
// gladia.io's scroll pipeline (owner, 2026-10-15). The diagram, split, and vignettes forms (/?prime=)
// were removed at launch (owner, 2026-10-19; tag options-archive-2026-10-19). The one card container
// on Home besides the Record cards (owner exception).
const PRIME_PROOF = [
  { label: 'Subcontracting credit', value: 'Woman-owned small business', id: 'WOSB250470 · WBE2303571' },
  { label: 'Restricted areas', value: 'Escort and access control on a Space Force base in Colorado', id: 'Subcontractor · 2025 to 2027' },
  { label: 'Reliability', value: 'Fewer than 1% of shifts missed since 2021', id: 'On-call relief in every contract' },
];

function PrimesPanel() {
  const button = (
    <Link to="/teaming" className="ds-btn ds-btn-primary ds-primes-btn">
      Teaming & subcontracting
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
    <div className="ds-primes-panel" data-form="pipeline">
      <PrimeGlow />
      {/* The copy holds still on desktop while the line grows down the cards beside it. */}
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
      <PrimePipeline />
    </div>
  );
}
