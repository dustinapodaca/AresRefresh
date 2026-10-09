import { responsive } from '../../lib/responsive';

// A slow strip of certification marks between the hero and 01 Verify. The marks repeat
// so one track is wider than any screen, and a second copy makes the loop seamless.
// Only the first set carries alt text; every repeat is decorative.
const MARKS = [
  { src: '/images/cert-gsa-footer.png', alt: 'GSA Contract Holder' },
  { src: '/images/cert-sba-footer.png', alt: 'U.S. Small Business Administration' },
  { src: '/images/cert-women-owned.png', alt: 'Women Owned' },
  { src: '/images/cert-wbenc.png', alt: "Certified WBENC Women's Business Enterprise" },
  { src: '/images/cert-denver-edo.webp', alt: 'Denver Economic Development & Opportunity' },
  { src: '/images/cert-co-diverse.webp', alt: 'Colorado Verified Diverse Business' },
  { src: '/images/cert-co-small.webp', alt: 'Colorado Verified Small Business' },
];
const REPEAT = 3;

function Track({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul className="ds-strip-track" aria-hidden={hidden || undefined}>
      {Array.from({ length: REPEAT }).flatMap((_, r) =>
        MARKS.map((m, i) => (
          <li key={`${r}-${i}`}>
            <img {...responsive(m.src)} alt={!hidden && r === 0 ? m.alt : ''} loading="lazy" decoding="async" />
          </li>
        )),
      )}
    </ul>
  );
}

export default function CredentialStrip() {
  return (
    <div className="ds-strip" role="region" aria-label="Certifications">
      <div className="ds-strip-belt">
        <Track />
        <Track hidden />
      </div>
    </div>
  );
}
