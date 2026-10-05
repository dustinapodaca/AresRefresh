// Authored arrows for the Dossier system: 1.5px stroke, round caps.
// `external` draws the up-right arrow used for verification links that leave the site.
export default function Arrow({ external = false, size = 16 }: { external?: boolean; size?: number }) {
  return (
    <svg
      className={external ? 'ds-arrow ds-arrow-ext' : 'ds-arrow'}
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {external ? (
        <path d="M5 11 11 5M6 5h5v5" />
      ) : (
        <path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" />
      )}
    </svg>
  );
}
