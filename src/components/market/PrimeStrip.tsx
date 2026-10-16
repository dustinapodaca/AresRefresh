import { useEffect, useRef, type CSSProperties } from 'react';

// The prime pipeline, thin (owner, 2026-10-15): Home and /teaming carry the full pipeline, so the
// Government page gets the same idea in one row: the prime, Ares, and the three posts it staffs.
// It moves like the full one (owner: "closer to the style of the other card"): the line grows
// with the scroll, its rust tip riding the end; as it reaches a tile the tile lifts into place, a
// light runs once around its edge, a shine sweeps across it, its line brightens, and its green tag
// comes up; the posts light in turn last. Nothing reverses once built. Reduced motion (and no
// JS): built and still. Every fact is one already on the panel.
//
// Three whole forms to compare, each with its desktop and phone layout (owner, 2026-10-15: the
// upright tiles looked bad on phones), at ?pstrip=ledger|card|track (ledger is the default until
// the owner picks; `row` keeps the row of tiles, upright on phones):
//   ledger  ruled columns (rows on phones) on a line that grows with the scroll, each dot lighting
//           as the line's rust tip reaches it
//   card    one pipeline card holding the flow: prime, Ares, then the posts as square chips, joined
//           by small rust arrows; side by side on desktop, stacked on phones
//   track   the stage meter's look: three stops on a line that fills with the scroll, the posts
//           as chips beneath
const POSTS = ['Restricted-Area Escort', 'Access Control', 'Relief & Surge'];
export const STRIP_FORMS = ['ledger', 'card', 'track', 'row'] as const;
export type StripForm = (typeof STRIP_FORMS)[number];

export default function PrimeStrip({ form = 'ledger' }: { form?: StripForm }) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const nodes = Array.from(el.querySelectorAll<HTMLElement>('.ds-pstrip-node'));
    const posts = Array.from(el.querySelectorAll<HTMLElement>('.ds-pstrip-posts li'));
    const list = el.querySelector<HTMLElement>('.ds-pstrip-posts');
    const built = () => {
      el.style.setProperty('--w1', '1');
      el.style.setProperty('--w2', '1');
      el.style.setProperty('--p', '1');
      el.dataset.step = '3';
      [...nodes, ...posts].forEach((n) => (n.dataset.on = 'true'));
      if (list) list.dataset.on = 'true';
    };
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      built();
      return;
    }
    el.dataset.live = 'true';
    let raf = 0;
    let best = 0;
    const clamp = (v: number) => Math.min(1, Math.max(0, v));
    const update = () => {
      raf = 0;
      // The line runs as the strip rises from 80% of the window, over its own height or 40% of the
      // window, whichever is more (the phone forms are taller).
      const r = el.getBoundingClientRect();
      const p = clamp((window.innerHeight * 0.8 - r.top) / Math.max(r.height, window.innerHeight * 0.4));
      // The line only grows: it never draws back on the way up.
      best = Math.max(best, p);
      const w1 = clamp((best - 0.08) / 0.36);
      const w2 = clamp((best - 0.52) / 0.36);
      el.style.setProperty('--p', best.toFixed(4));
      el.style.setProperty('--w1', w1.toFixed(4));
      el.style.setProperty('--w2', w2.toFixed(4));
      const step = w2 >= 1 ? 3 : w1 >= 1 ? 2 : best > 0 ? 1 : 0;
      if (step > Number(el.dataset.step ?? 0)) el.dataset.step = String(step);
      if (step >= 1) nodes.forEach((n) => n.dataset.i === '0' && (n.dataset.on = 'true'));
      if (step >= 2) nodes.forEach((n) => n.dataset.i === '1' && (n.dataset.on = 'true'));
      if (step >= 3) {
        if (list) list.dataset.on = 'true';
        posts.forEach((n) => (n.dataset.on = 'true'));
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
  }, [form]);

  return (
    <figure
      ref={ref}
      className="ds-pstrip"
      data-form={form}
      aria-label="The prime holds the contract; Ares, a woman-owned subcontractor (WOSB, WBENC), staffs restricted-area escort, access control, and relief posts under it"
    >
      {/* The row of tiles (?pstrip=row): upright on phones. */}
      {form === 'row' && (
      <div className="ds-pstrip-row" aria-hidden="true">
        <div className="ds-pstrip-node" data-i="0">
          <span className="ds-pipe-tag ds-data">Teaming</span>
          <i className="ds-pstrip-dot" />
          <span className="ds-pstrip-text">
            <b>Prime contractor</b>
            <small className="ds-data">Holds the contract</small>
          </span>
        </div>
        <span className="ds-pstrip-wire" style={{ '--w': 'var(--w1, 0)' } as CSSProperties}>
          <span />
          <i className="ds-pstrip-tip" />
        </span>
        <div className="ds-pstrip-node" data-i="1" data-ares="true">
          <span className="ds-pipe-tag ds-data">Subcontracting credit</span>
          <i className="ds-pstrip-dot" />
          <span className="ds-pstrip-text">
            <b>Ares Security</b>
            <small className="ds-data">WOSB · WBENC</small>
          </span>
        </div>
        <span className="ds-pstrip-wire" style={{ '--w': 'var(--w2, 0)' } as CSSProperties}>
          <span />
          <i className="ds-pstrip-tip" />
        </span>
        <ul className="ds-pstrip-posts">
          {POSTS.map((p, i) => (
            <li key={p} style={{ '--i': i } as CSSProperties}>
              <i className="ds-pstrip-dot" />
              {p}
            </li>
          ))}
        </ul>
      </div>
      )}

      {form === 'ledger' && (
        <div className="ds-pph ds-pph-ledger" aria-hidden="true">
          <span className="ds-pph-rail">
            <span />
            <i />
          </span>
          <div className="ds-pph-row" data-at="1">
            <i className="ds-pph-dot" />
            <div>
              <b>Prime contractor</b>
              <small className="ds-data">Holds the contract</small>
            </div>
            <span className="ds-pph-tag ds-data">Teaming</span>
          </div>
          <div className="ds-pph-row" data-at="2" data-ares="true">
            <i className="ds-pph-dot" />
            <div>
              <b>Ares Security</b>
              <small className="ds-data">WOSB · WBENC</small>
            </div>
            <span className="ds-pph-tag ds-data">Subcontracting credit</span>
          </div>
          <div className="ds-pph-row" data-at="3">
            <i className="ds-pph-dot" />
            <ul>
              {POSTS.map((p, i) => (
                <li key={p} style={{ '--i': i } as CSSProperties}>{p}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
      {form === 'card' && (
        <div className="ds-pph ds-pph-card" aria-hidden="true">
          <div className="ds-pph-sec" data-at="1">
            <span className="ds-pph-tag ds-data">Teaming</span>
            <b>Prime contractor</b>
            <small className="ds-data">Holds the contract</small>
          </div>
          <span className="ds-pph-arrow" data-at="2" />
          <div className="ds-pph-sec" data-at="2" data-ares="true">
            <span className="ds-pph-tag ds-data">Subcontracting credit</span>
            <b>Ares Security</b>
            <small className="ds-data">WOSB · WBENC</small>
          </div>
          <span className="ds-pph-arrow" data-at="3" />
          <ul className="ds-pph-chips" data-at="3">
            {POSTS.map((p, i) => (
              <li key={p} style={{ '--i': i } as CSSProperties}>{p}</li>
            ))}
          </ul>
        </div>
      )}
      {form === 'track' && (
        <div className="ds-pph ds-pph-track" aria-hidden="true">
          <div className="ds-pph-line">
            <span />
          </div>
          <ol className="ds-pph-stops">
            <li data-at="1">
              <i />
              <b>Prime contractor</b>
              <small className="ds-data">Holds the contract</small>
            </li>
            <li data-at="2" data-ares="true">
              <i />
              <b>Ares Security</b>
              <small className="ds-data">WOSB · WBENC</small>
            </li>
            <li data-at="3">
              <i />
              <b>Posts</b>
              <small className="ds-data">Under the contract</small>
            </li>
          </ol>
          <ul className="ds-pph-chips" data-at="3">
            {POSTS.map((p, i) => (
              <li key={p} style={{ '--i': i } as CSSProperties}>{p}</li>
            ))}
          </ul>
        </div>
      )}
    </figure>
  );
}
