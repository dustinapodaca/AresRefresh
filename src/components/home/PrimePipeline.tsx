import { useEffect, useRef, type CSSProperties } from 'react';

// The prime contractor pipeline (owner, 2026-10-15, after gladia.io's "foundation of every voice
// product"): one stack of cards on a vertical line that grows with the scroll. The line's tip
// rides at 70% of the window; as it reaches a card the card lifts into place, a light runs once
// around its edge, its values brighten in turn, and its status tag comes up. Once the last card
// is on, a rust light starts running down the line (the green reliability finish was removed,
// owner 2026-10-15). Every fact is one already on the panel. Reduced motion: built and still.
type Row = { label: string; value: string; mono?: boolean };
type Card = { title: string; sub: string; rows: Row[]; tag: string; ares?: boolean; bar?: boolean; x?: number };

const CARDS: Card[] = [
  {
    title: 'Prime contractor',
    sub: 'Holds the contract',
    rows: [{ label: 'Needs', value: 'Posts covered under its contract' }],
    tag: 'Teaming',
  },
  {
    title: 'Ares Security',
    sub: 'Subcontractor',
    rows: [
      { label: 'SBA WOSB', value: 'WOSB250470', mono: true },
      { label: 'WBENC', value: 'WBE2303571', mono: true },
    ],
    tag: 'Subcontracting credit',
    ares: true,
  },
  {
    title: 'Restricted-Area Escort',
    sub: 'Space Force base, Colorado',
    rows: [{ label: 'Term', value: '2025 to 2027', mono: true }],
    tag: 'On post',
    bar: true,
    x: 36,
  },
  {
    title: 'Access Control',
    sub: 'Restricted areas',
    rows: [{ label: 'Post orders', value: 'Written by Ares' }],
    tag: 'On post',
    x: -36,
  },
  {
    title: 'Relief & Surge',
    sub: 'Relief, overflow, and surge',
    rows: [{ label: 'Relief', value: 'On call in every contract' }],
    tag: 'Ready',
    x: 36,
  },
];

export default function PrimePipeline({ className = '' }: { className?: string }) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const cards = Array.from(el.querySelectorAll<HTMLElement>('.ds-pipe-card'));
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (still) {
      el.style.setProperty('--p', '1');
      cards.forEach((c) => (c.dataset.on = 'true'));
      el.dataset.done = 'true';
      return;
    }
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const tip = window.innerHeight * 0.7 - r.top; // the line's tip, in the figure's pixels
      const p = Math.min(1, Math.max(0, tip / r.height));
      el.style.setProperty('--p', p.toFixed(4));
      el.style.setProperty('--h', `${r.height}px`);
      // A card turns on once the tip passes its top edge, and stays on.
      cards.forEach((c) => {
        if (!c.dataset.on && tip >= c.offsetTop + 8) c.dataset.on = 'true';
      });
      // Once the last card is on, the light starts running down the line.
      if (!el.dataset.done && cards.every((c) => c.dataset.on)) el.dataset.done = 'true';
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <figure
      ref={ref}
      className={`ds-pipe ${className}`.trim()}
      aria-label="The prime holds the contract; Ares, a woman-owned subcontractor, staffs restricted-area escort, access control, and relief posts under it"
    >
      <span className="ds-pipe-line" aria-hidden="true">
        <span className="ds-pipe-fill" />
        <span className="ds-pipe-tip" />
        <span className="ds-pipe-pulse" />
      </span>
      {CARDS.map((c) => (
        <div
          key={c.title}
          className="ds-pipe-card"
          data-ares={c.ares ? 'true' : undefined}
          style={c.x ? ({ '--x': `${c.x}px` } as CSSProperties) : undefined}
          aria-hidden="true"
        >
          <span className="ds-pipe-tag ds-data">{c.tag}</span>
          <div className="ds-pipe-head">
            <i className="ds-pipe-dot" />
            <b>{c.title}</b>
          </div>
          <span className="ds-pipe-sub ds-data">{c.sub}</span>
          <dl className="ds-pipe-rows">
            {c.rows.map((row, i) => (
              <div key={row.label} style={{ '--i': i } as CSSProperties}>
                <dt>{row.label}</dt>
                <dd className={row.mono ? 'ds-data' : undefined}>{row.value}</dd>
              </div>
            ))}
          </dl>
          {c.bar && (
            <span className="ds-pipe-bar">
              <span />
            </span>
          )}
        </div>
      ))}
    </figure>
  );
}
