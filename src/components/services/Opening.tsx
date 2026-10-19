import { responsive } from '../../lib/responsive';

// The Services opening: aperture (owner, 2026-10-15). The headline at the site's hero size, then the
// copper-glass tower as a plate in the column that opens to the full width on scroll, with a liquid
// glass card holding the lead across its top edge so the rim bends the photo's edge (Glide, Titan,
// Vizcom). Only the headline and the lead: the services and industries stay in the page below, and
// "Who we protect" sends the reader down to them.
// The headline is Home's former one (owner, 2026-10-19). The curtain, sink, and lens forms
// (/services?open=), the earlier glass that slid up over a held photo (?open=current, with its
// ?photo= choices), and the other headlines (?hero=) were removed at launch (owner, 2026-10-19;
// tag options-archive-2026-10-19, docs/options-archive.md).
const COPY = {
  // The H1, no closing period like every hero headline (heroTitle), set as two lines.
  lines: ['A prepared officer', 'on every post'],
  lead: 'Armed and unarmed coverage for federal, commercial, and industrial sites in Colorado Springs, Denver, and Pueblo. Pick a service, or find your industry.',
};

const SRC = '/images/hero6.jpg';

const Photo = () => (
  <div className="ds-svx-photo ds-ap-photo" aria-hidden="true">
    <img {...responsive(SRC)} alt="" decoding="sync" {...{ fetchpriority: 'high' }} />
  </div>
);

// Down to the first section of the page, the industries.
const Down = () => (
  <a href="#divisions" className="ds-link ds-svx-down">
    Who we protect
    <svg className="ds-arrow" width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M8 2.5v11M3.5 9 8 13.5 12.5 9" />
    </svg>
  </a>
);

export default function Opening() {
  return (
    <section className="ds-svx" data-form="aperture" aria-labelledby="services-title">
      <div className="ds-container ds-ap-head">
        {/* The site's hero headline size, as on every other page (owner, 2026-10-15). */}
        {/* Two lines at every width (owner, 2026-10-19): "A prepared officer" / "on every post". The
            space before the break keeps the words apart for search and screen readers. */}
        <h1 id="services-title" className="ds-display-xl">
          {COPY.lines[0]}{' '}
          <br />
          {COPY.lines[1]}
        </h1>
      </div>
      <div className="ds-ap-stage">
        <Photo />
        <div className="ds-container ds-ap-wrap">
          <div className="ds-ap-card">
            <p className="ds-lead">{COPY.lead}</p>
            <Down />
          </div>
        </div>
      </div>
    </section>
  );
}
