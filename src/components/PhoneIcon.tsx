// The one icon besides the arrows (owner, 2026-10-10): a handset for the phone header's call
// link, drawn like the arrows (1.5px stroke, round caps and joins, no fill).
export default function PhoneIcon({ size = 22 }: { size?: number }) {
  return (
    <svg
      className="ds-phone-icon"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5.2 3.5h3.1l1.6 4.1-2.1 1.3a10.4 10.4 0 0 0 5.3 5.3l1.3-2.1 4.1 1.6v3.1a2 2 0 0 1-2 2A15.6 15.6 0 0 1 3.2 5.5a2 2 0 0 1 2-2z" />
    </svg>
  );
}
