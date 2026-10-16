import { useEffect, useRef, type CSSProperties } from 'react';

// The prime pipeline, thin (owner, 2026-10-15): Home and /teaming carry the full pipeline, so the
// Government page gets the same idea in one row: the prime, Ares, and the three posts it staffs.
// It moves like the full one (owner: "closer to the style of the other card"): the line grows
// with the scroll, its rust tip riding the end; as it reaches a tile the tile lifts into place, a
// light runs once around its edge, a shine sweeps across it, its line brightens, and its green tag
// comes up; the posts light in turn last. Nothing reverses once built. Reduced motion (and no
// JS): built and still. Phones: the same row turned upright. Every fact is one already on the panel.
const POSTS = ['Restricted-Area Escort', 'Access Control', 'Relief & Surge'];

export default function PrimeStrip() {
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
      [...nodes, ...posts].forEach((n) => (n.dataset.on = 'true'));
      if (list) list.dataset.on = 'true';
    };
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      built();
      return;
    }
    el.dataset.live = 'true';
    let raf = 0;
    const clamp = (v: number) => Math.min(1, Math.max(0, v));
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      // The line runs from when the strip's top reaches 80% of the window to 40% of it, like the
      // full pipeline's tip riding at 70%.
      const p = clamp((window.innerHeight * 0.8 - r.top) / (window.innerHeight * 0.4));
      const w1 = clamp((p - 0.08) / 0.36);
      const w2 = clamp((p - 0.52) / 0.36);
      // The line only grows: it never draws back on the way up.
      const prev1 = parseFloat(el.style.getPropertyValue('--w1') || '0');
      const prev2 = parseFloat(el.style.getPropertyValue('--w2') || '0');
      el.style.setProperty('--w1', Math.max(prev1, w1).toFixed(4));
      el.style.setProperty('--w2', Math.max(prev2, w2).toFixed(4));
      if (p > 0) nodes[0].dataset.on = 'true';
      if (w1 >= 1) nodes[1].dataset.on = 'true';
      if (w2 >= 1) {
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
  }, []);

  return (
    <figure
      ref={ref}
      className="ds-pstrip"
      aria-label="The prime holds the contract; Ares, a woman-owned subcontractor (WOSB, WBENC), staffs restricted-area escort, access control, and relief posts under it"
    >
      <div className="ds-pstrip-node" aria-hidden="true">
        <span className="ds-pipe-tag ds-data">Teaming</span>
        <i className="ds-pstrip-dot" />
        <span className="ds-pstrip-text">
          <b>Prime contractor</b>
          <small className="ds-data">Holds the contract</small>
        </span>
      </div>
      <span className="ds-pstrip-wire" style={{ '--w': 'var(--w1, 0)' } as CSSProperties} aria-hidden="true">
        <span />
        <i className="ds-pstrip-tip" />
      </span>
      <div className="ds-pstrip-node" data-ares="true" aria-hidden="true">
        <span className="ds-pipe-tag ds-data">Subcontracting credit</span>
        <i className="ds-pstrip-dot" />
        <span className="ds-pstrip-text">
          <b>Ares Security</b>
          <small className="ds-data">WOSB · WBENC</small>
        </span>
      </div>
      <span className="ds-pstrip-wire" style={{ '--w': 'var(--w2, 0)' } as CSSProperties} aria-hidden="true">
        <span />
        <i className="ds-pstrip-tip" />
      </span>
      <ul className="ds-pstrip-posts" aria-hidden="true">
        {POSTS.map((p, i) => (
          <li key={p} style={{ '--i': i } as CSSProperties}>
            <i className="ds-pstrip-dot" />
            {p}
          </li>
        ))}
      </ul>
    </figure>
  );
}
