import Arrow from '../Arrow';
import { PDF_URL, QUICK_FACTS, SAM_VERIFY } from './data';
import { responsive } from '../../lib/responsive';

export function DownloadIcon({ size = 16 }: { size?: number }) {
  return (
    <svg className="ds-arrow" width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M8 2.5v8M4.5 7 8 10.5 11.5 7M3 13.5h10" />
    </svg>
  );
}

// The hero: generated copper fins on a building at dusk (owner, 2026-10-08; s4-fins from the
// Services hero options; before it the federal facade and the glass-panels light, both kept)
// shown whole, black from the left; generated, so no place caption. The headline,
// the offer, and the download. Under it, the four quick facts on a
// full-width line over a frosted fade.
export default function Hero() {
  return (
    <section className="ds-cs-hero" aria-labelledby="cs-title">
      <div className="ds-cs-hero-bg" aria-hidden="true">
        <img {...responsive('/images/capability-hero/cs-fins.webp')} alt="" decoding="sync" {...{ fetchpriority: 'high' }} />
      </div>

      <div className="ds-container ds-cs-hero-grid">
        <div className="ds-cs-hero-copy">
          <h1 id="cs-title" className="ds-display-xl">
            Capability Statement
          </h1>
          <p className="ds-lead">
            Armed and unarmed security officers for federal agencies, prime contractors, and
            commercial sites across Colorado. Every identifier is below and in the PDF.
          </p>
          <div className="ds-actions">
            <a href={PDF_URL} className="ds-btn ds-btn-primary" download>
              <DownloadIcon />
              Download the PDF
            </a>
          </div>
          <p className="ds-data ds-cs-spec">
            <span>Ares Security LLC</span>
            <span>NAICS 561612</span>
            <span>1 page · PDF · 1.3 MB</span>
            <span>2026</span>
          </p>
        </div>
      </div>

      <ul className="ds-container ds-keyrow ds-cs-facts" aria-label="Quick facts">
        {QUICK_FACTS.map((f) => (
          <li key={f.label}>
            <span className="ds-data">{f.value}</span>
            <span className="ds-small">{f.label}</span>
            {/* Each line of a note is its own row, spaced like the label above it. */}
            {f.note.split('\n').map((line) => (
              <span key={line} className="ds-cs-fact-note">
                {line}
              </span>
            ))}
            {f.verify && (
              <a href={SAM_VERIFY} target="_blank" rel="noopener noreferrer" className="ds-link ds-cs-verify">
                Verify on SAM.gov
                <Arrow external size={12} />
              </a>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
