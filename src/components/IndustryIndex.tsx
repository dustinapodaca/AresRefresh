import './industry-index.css';

// The six industries as one row of short names above a phone swipe row (owner, 2026-10-26), so a
// reader can jump to their industry in one tap instead of swiping five times. Phones and tablets only
// (below 1024px), three across and two down, every name the same size. A quiet index under the same rules as the rest of the site: square 2px corners, no
// counters, capitals, dots, or glow; the active name in ink with an ink edge, the rest ink muted on a
// hairline. Each tap calls the row's own go(i), the same as the meter's steps, and the active name
// follows the swipe. The visual chip is 30px; its hit area runs 7px past it above and below (44px).
type Props = {
  names: string[];
  /** The full names, for screen readers. */
  labels: string[];
  at: number;
  go: (i: number) => void;
};

export default function IndustryIndex({ names, labels, at, go }: Props) {
  return (
    <div className="ds-ind-index nx-edge" role="group" aria-label="Jump to an industry">
      {names.map((name, i) => (
        <button
          key={labels[i]}
          type="button"
          className="ds-ind-index-name"
          aria-label={labels[i]}
          aria-current={i === at ? 'true' : undefined}
          onClick={() => go(i)}
        >
          {name}
        </button>
      ))}
    </div>
  );
}
