import { useEffect, useState, type RefObject } from 'react';
import Arrow from './Arrow';

// The phone swipe controls under a row of cards, the same as Home's industry deck and the Capability
// Statement's reasons (owner, 2026-10-25): a meter with one step per card (passed steps white, the
// current one rust; tap a step to go there), two arrows, and a hint in the data face. Phones only;
// the row itself scrolls natively with snap.

// Which card is showing (the one nearest the row's middle), and a way to bring a card into place.
export function useSwipeRow(rowRef: RefObject<HTMLElement>, count: number) {
  const [at, setAt] = useState(0);

  useEffect(() => {
    const row = rowRef.current;
    if (!row) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const box = row.getBoundingClientRect();
      const mid = box.left + box.width / 2;
      let best = 0;
      let bestD = Infinity;
      Array.from(row.children).forEach((c, i) => {
        const r = c.getBoundingClientRect();
        const d = Math.abs(r.left + r.width / 2 - mid);
        if (d < bestD) {
          bestD = d;
          best = i;
        }
      });
      // At the row's far end the last card can't reach the middle; count it as showing.
      if (row.scrollLeft >= row.scrollWidth - row.clientWidth - 4) best = row.children.length - 1;
      setAt(best);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    row.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      row.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
    };
  }, [rowRef]);

  const go = (i: number) => {
    const row = rowRef.current;
    const card = row?.children[Math.max(0, Math.min(count - 1, i))] as HTMLElement | undefined;
    if (!row || !card) return;
    const left = row.scrollLeft + card.getBoundingClientRect().left - row.getBoundingClientRect().left - parseFloat(getComputedStyle(row).paddingLeft);
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    row.scrollTo({ left, behavior: still ? 'auto' : 'smooth' });
  };

  return { at, go };
}

type Props = {
  count: number;
  at: number;
  go: (i: number) => void;
  /** What one card is, for the arrows and the announcement ("service", "industry"). */
  noun: string;
  hint: string;
  names?: string[];
};

export default function SwipeControls({ count, at, go, noun, hint, names }: Props) {
  return (
    <div className="ds-sw nx-edge">
      <div className="ds-sw-ctl">
        <p className="sr-only" aria-live="polite">
          {names?.[at] ? `${names[at]}, ` : ''}
          {at + 1} of {count}
        </p>
        <div className="ds-sw-meter" aria-hidden="true">
          {Array.from({ length: count }, (_, i) => (
            <button key={i} type="button" tabIndex={-1} className="ds-sw-seg" data-on={i === at} data-past={i < at} onClick={() => go(i)}>
              <i />
            </button>
          ))}
        </div>
        <div className="ds-sw-arrows">
          <button type="button" className="ds-sw-arrow" aria-label={`Previous ${noun}`} disabled={at === 0} onClick={() => go(at - 1)}>
            <Arrow size={18} />
          </button>
          <button type="button" className="ds-sw-arrow" aria-label={`Next ${noun}`} disabled={at === count - 1} onClick={() => go(at + 1)}>
            <Arrow size={18} />
          </button>
        </div>
      </div>
      <p className="ds-sw-hint ds-data" aria-hidden="true">
        {hint}
      </p>
    </div>
  );
}
