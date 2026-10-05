// A slow strip of certification marks and plain facts between the hero and 01 Verify.
// The second copy exists only to make the loop seamless, so it is hidden from
// assistive tech.
const ITEMS: ({ img: string; alt: string } | { text: string })[] = [
  { img: '/images/cert-gsa-footer.png', alt: 'GSA Contract Holder' },
  { text: 'Minority woman-owned' },
  { img: '/images/cert-sba-footer.png', alt: 'U.S. Small Business Administration' },
  { text: 'Armed, unarmed, and cleared officers' },
  { img: '/images/cert-women-owned.png', alt: 'Women Owned' },
  { text: 'Founded 2021 in Colorado Springs' },
  { img: '/images/cert-wbenc.png', alt: "Certified WBENC Women's Business Enterprise" },
  { text: 'Colorado Springs, Denver, Pueblo' },
];

function Track({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul className="ds-strip-track" aria-hidden={hidden || undefined}>
      {ITEMS.map((item, i) => (
        <li key={i}>
          {'img' in item ? (
            <img src={item.img} alt={hidden ? '' : item.alt} loading="lazy" decoding="async" />
          ) : (
            <span>{item.text}</span>
          )}
        </li>
      ))}
    </ul>
  );
}

export default function CredentialStrip() {
  return (
    <div className="ds-strip" role="region" aria-label="Certifications and company facts">
      <div className="ds-strip-belt">
        <Track />
        <Track hidden />
      </div>
    </div>
  );
}
