import { useEffect, useRef, type CSSProperties } from 'react';
import { useMotion } from './motion';

// The prime contractor pipeline (owner, 2026-10-15, after gladia.io's "foundation of every voice
// product"): the prime and Ares as cards on a vertical line that grows with the scroll. The
// line's tip rides at 70% of the window; as it reaches a card the card lifts into place, a light
// runs once around its edge, a shine sweeps across it, its values brighten in turn, and its status
// tag comes up. From the foot of Ares three separate straight lines drop to the three posts, small
// tiles that step down left to right; the lines grow with the scroll too, and each tile lights the
// same way as the tip reaches it (owner, 2026-10-15: the posts were full cards, then curved wires).
// Nothing loops once it is built (owner, 2026-10-15: the rust light running down the line was removed). Every fact is one already on the panel. Reduced
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

export default function PrimePipeline({ className = '' }: { className?: string }) {
  const ref = useRef<HTMLElement>(null);
  const postsRef = useRef<HTMLDivElement>(null);
  // On Home the scroll engine's ScrollTrigger carries the tip (owner, 2026-10-19: one shared scroll),
  // with every offset measured on refresh, not read each frame; elsewhere (/teaming) a passive scroll
  // listener does the same.
  const engine = useMotion();
  useEffect(() => {
    const el = ref.current;
    const posts = postsRef.current;
    if (!el || !posts) return;
    const cards = Array.from(el.querySelectorAll<HTMLElement>('.ds-pipe-card'));
    const tiles = Array.from(posts.querySelectorAll<HTMLElement>('.ds-pipe-post'));
    const drops = Array.from(posts.querySelectorAll<HTMLElement>('.ds-pipe-drop'));
    // Each drop runs straight down from the foot of Ares to the top of its tile.
    let lineH = 0;
    let cardTops: number[] = [];
    let tileLens: number[] = [];
    const place = () => {
      tiles.forEach((t, i) => {
        drops[i].style.left = `${t.offsetLeft + t.offsetWidth / 2}px`;
        drops[i].style.height = `${t.offsetTop}px`;
      });
      // The line runs from the top of the figure to the foot of Ares, where the wires begin.
      lineH = posts.offsetTop;
      cardTops = cards.map((c) => c.offsetTop);
      tileLens = tiles.map((t) => t.offsetTop);
      el.style.setProperty('--h', `${lineH}px`);
    };
    place();
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (still) {
      el.style.setProperty('--p', '1');
      cards.forEach((c) => (c.dataset.on = 'true'));
      tiles.forEach((t) => (t.dataset.on = 'true'));
      drops.forEach((d) => d.style.setProperty('--q', '1'));
      return;
    }
    // `tip` is the line's tip, in the figure's pixels.
    const draw = (tip: number) => {
      const p = Math.min(1, Math.max(0, tip / lineH));
      el.style.setProperty('--p', p.toFixed(4));
      // A card turns on once the tip passes its top edge, and stays on.
      cards.forEach((c, i) => {
        if (!c.dataset.on && tip >= cardTops[i] + 8) c.dataset.on = 'true';
      });
      // Past the foot of Ares the tip carries on down the three drops; each tile turns on as its
      // drop reaches it (the left one first: it sits highest).
      const below = tip - lineH;
      tiles.forEach((t, i) => {
        const len = tileLens[i];
        drops[i].style.setProperty('--q', Math.min(1, Math.max(0, below / len)).toFixed(4));
        if (!t.dataset.on && below >= len + 8) t.dataset.on = 'true';
      });
    };
    if (engine) {
      // The tip rides at 70% of the window: it is how far the scroll has carried past the moment
      // the figure's top crossed that line.
      const st = engine.ScrollTrigger.create({
        trigger: el,
        start: 'top 70%',
        end: () => `+=${lineH + Math.max(0, ...tileLens) + 40}`,
        onRefreshInit: place,
        onRefresh: (self) => draw(self.scroll() - self.start),
        onUpdate: (self) => draw(self.scroll() - self.start),
      });
      return () => st.kill();
    }
    let raf = 0;
    const update = () => {
      raf = 0;
      draw(window.innerHeight * 0.7 - el.getBoundingClientRect().top);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    const onResize = () => {
      place();
      onScroll();
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(raf);
    };
  }, [engine]);

  return (
    <figure
      ref={ref}
      className={`ds-pipe ${className}`.trim()}
      aria-label="The prime holds the contract; Ares, a woman-owned subcontractor, staffs restricted-area escort, access control, and relief posts under it"
    >
      <span className="ds-pipe-line" aria-hidden="true">
        <span className="ds-pipe-fill" />
        <span className="ds-pipe-tip" />
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
        {POSTS.map((t) => (
          <span key={t} className="ds-pipe-drop">
            <span />
          </span>
        ))}
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
