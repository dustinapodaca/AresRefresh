// Authored arrow icon (1.5px stroke, round caps) shared by Home and the
// header. `diag` is the up-right "opens elsewhere" variant. The flow-arrow
// classes drive the hover nudge defined in index.css.
export default function FlowArrow({ diag = false, className = '' }: { diag?: boolean; className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`flow-arrow ${diag ? 'flow-arrow-diag' : ''} shrink-0 ${className}`}
    >
      {diag ? <path d="M5 11 11 5M6.5 5H11v4.5" /> : <path d="M3 8h10M9 4l4 4-4 4" />}
    </svg>
  );
}
