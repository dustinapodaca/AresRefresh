import { Link } from 'react-router-dom';
import Arrow from '../Arrow';
import { PDF_URL, QUICK_FACTS, SAM_VERIFY } from './data';

export function DownloadIcon({ size = 16 }: { size?: number }) {
  return (
    <svg className="ds-arrow" width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M8 2.5v8M4.5 7 8 10.5 11.5 7M3 13.5h10" />
    </svg>
  );
}

// The hero: the owner's glass-panels light full bleed, black from the left; the headline,
// the offer, the credential line, and the download; page 1 of the real statement floating
// in the light beside it. Under it, the four quick facts as a key row.
export default function Hero() {
  return (
    <section className="ds-cs-hero" aria-labelledby="cs-title">
      <div className="ds-cs-hero-bg" aria-hidden="true">
        <img src="/images/hero-panels.webp" alt="" width={2880} height={1580} decoding="async" {...{ fetchpriority: 'high' }} />
      </div>

      <div className="ds-container ds-cs-hero-grid">
        <div className="ds-cs-hero-copy">
          <h1 id="cs-title" className="ds-display-xl">
            Capability statement.
          </h1>
          <p className="ds-lead">
            Armed, unarmed, and cleared security officers for federal agencies, prime contractors,
            and commercial sites across Colorado. Every identifier you need to vet us is below and
            in the one-page PDF.
          </p>
          <p className="ds-cs-hero-creds">GSA Schedule holder · SAM-registered · WOSB and WBE certified</p>
          <div className="ds-actions">
            <a href={PDF_URL} className="ds-btn ds-btn-primary" download>
              <DownloadIcon />
              Download the PDF
            </a>
            <Link to="/contact" className="ds-link">
              Request a quote
              <Arrow />
            </Link>
          </div>
          <p className="ds-data ds-cs-spec">
            <span>Ares Security LLC</span>
            <span>NAICS 561612</span>
            <span>1 page · PDF · 2.1 MB</span>
            <span>2026</span>
          </p>
        </div>

        <a href={PDF_URL} className="ds-cs-doc" target="_blank" rel="noopener noreferrer" aria-label="Open the capability statement PDF (new tab)">
          <img src="/images/capability-page1.webp" alt="Page one of the Ares Security capability statement" width={1000} height={1295} decoding="async" />
        </a>
      </div>

      <ul className="ds-container ds-keyrow ds-cs-facts" aria-label="Quick facts">
        {QUICK_FACTS.map((f) => (
          <li key={f.label}>
            <span className="ds-data">{f.value}</span>
            <span className="ds-small">{f.label}</span>
            <span className="ds-cs-fact-note">{f.note}</span>
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
