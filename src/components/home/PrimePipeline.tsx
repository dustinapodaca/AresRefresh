import { useEffect, useRef, useState, type CSSProperties, type RefObject } from 'react';

// The prime contractor pipeline (owner, 2026-10-15, after gladia.io's "foundation of every voice
// product"): the prime and Ares as cards on a vertical line that grows with the scroll. The
// line's tip rides at 70% of the window; as it reaches a card the card lifts into place, a light
// runs once around its edge, its values brighten in turn, and its status tag comes up. From Ares
// three wires branch out, one after another, to the three posts: small tiles that step down left
// to right and light as their wire arrives (owner, 2026-10-15: the posts were full cards). Then a
// rust light runs down the line on a loop. Every fact is one already on the panel. Reduced
// motion: built and still.
type Row = { label: string; value: string; mono?: boolean };
type Card = { title: string; sub: string; rows: Row[]; tag: string; ares?: boolean };

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
];

const POSTS = ['Restricted-Area Escort', 'Access Control', 'Relief & Surge'];

// The three wires from Ares to the posts, drawn at the box's real size (measured), each from the
// top center down to the top center of its tile.
function PostWires({ box }: { box: RefObject<HTMLDivElement | null> }) {
  const [geo, setGeo] = useState<{ w: number; h: number; ends: { x: number; y: number }[] }>({ w: 300, h: 100, ends: [] });
  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const measure = () => {
      const tiles = Array.from(el.querySelectorAll<HTMLElement>('.ds-pipe-post'));
      setGeo({
        w: el.offsetWidth,
        h: el.offsetHeight,
        ends: tiles.map((t) => ({ x: t.offsetLeft + t.offsetWidth / 2, y: t.offsetTop })),
      });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [box]);
  const mid = geo.w / 2;
  return (
    <svg className="ds-pipe-wires" viewBox={`0 0 ${geo.w} ${geo.h}`} width={geo.w} height={geo.h} aria-hidden="true">
      {geo.ends.map(({ x, y }, i) => {
        const d = Math.abs(x - mid) < 1 ? `M${mid} 0V${y}` : `M${mid} 0C${mid} ${y * 0.55} ${x} ${y * 0.35} ${x} ${y}`;
        return (
          <g key={i} style={{ '--i': i } as CSSProperties}>
            <path className="ds-pipe-wire" d={d} pathLength="100" />
            <path className="ds-pipe-wire-lit" d={d} pathLength="100" />
          </g>
        );
      })}
    </svg>
  );
}

export default function PrimePipeline({ className = '' }: { className?: string }) {
  const ref = useRef<HTMLElement>(null);
  const postsRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    const posts = postsRef.current;
    if (!el || !posts) return;
    const cards = Array.from(el.querySelectorAll<HTMLElement>('.ds-pipe-card'));
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (still) {
      el.style.setProperty('--p', '1');
      cards.forEach((c) => (c.dataset.on = 'true'));
      posts.dataset.on = 'true';
      el.dataset.done = 'true';
      return;
    }
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      // The line runs from the top of the figure to the foot of Ares, where the wires begin.
      const lineH = posts.offsetTop;
      const tip = window.innerHeight * 0.7 - r.top; // the line's tip, in the figure's pixels
      const p = Math.min(1, Math.max(0, tip / lineH));
      el.style.setProperty('--p', p.toFixed(4));
      el.style.setProperty('--h', `${lineH}px`);
      // A card turns on once the tip passes its top edge, and stays on.
      cards.forEach((c) => {
        if (!c.dataset.on && tip >= c.offsetTop + 8) c.dataset.on = 'true';
      });
      // The wires branch out once the tip reaches the foot of Ares; the light loop follows.
      if (!posts.dataset.on && tip >= lineH) {
        posts.dataset.on = 'true';
        el.dataset.done = 'true';
      }
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
        <div key={c.title} className="ds-pipe-card" data-ares={c.ares ? 'true' : undefined} aria-hidden="true">
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
        </div>
      ))}
      <div ref={postsRef} className="ds-pipe-posts" aria-hidden="true">
        <PostWires box={postsRef} />
        {POSTS.map((t, i) => (
          <span key={t} className="ds-pipe-post" style={{ '--i': i } as CSSProperties}>
            <i className="ds-pipe-dot" />
            {t}
          </span>
        ))}
      </div>
    </figure>
  );
}
