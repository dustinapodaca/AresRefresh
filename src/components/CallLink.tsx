import PhoneIcon from './PhoneIcon';

// The call link beside a page's Request a Quote (owner, 2026-11-22): the handset and the number in the data
// face, one underline, like the Home hero's. It was "Call" in the text face and the number in the data face,
// two pieces of an inline-flex link with two underlines at different heights and two sizes.
export default function CallLink({ className = '' }: { className?: string }) {
  return (
    <a href="tel:+17196963966" className={`ds-link ds-call ${className}`.trim()} aria-label="Call 719-696-3966">
      <PhoneIcon size={18} />
      <span className="ds-data">719-696-3966</span>
    </a>
  );
}
