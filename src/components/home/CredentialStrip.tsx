// A slow strip of certification marks between the hero and 01 Verify. The marks repeat
// so one track is wider than any screen, and a second copy makes the loop seamless.
// Only the first set carries alt text; every repeat is decorative.
const MARKS = [
  { src: '/images/cert-gsa-footer.png', alt: 'GSA Contract Holder' },
  { src: '/images/cert-sba-footer.png', alt: 'U.S. Small Business Administration' },
  { src: '/images/cert-women-owned.png', alt: 'Women Owned' },
  { src: '/images/cert-wbenc.png', alt: "Certified WBENC Women's Business Enterprise" },
  { src: '/images/cert-denver-mwbe.webp', alt: 'Denver Economic Development & Opportunity M/WBE and SBE certified' },
];
const REPEAT = 3;

function Track({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul className="ds-strip-track" aria-hidden={hidden || undefined}>
      {Array.from({ length: REPEAT }).flatMap((_, r) =>
        MARKS.map((m, i) => (
          <li key={`${r}-${i}`}>
            <img src={m.src} alt={!hidden && r === 0 ? m.alt : ''} loading="lazy" decoding="async" />
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
