import { useEffect, useRef, useState } from 'react';

// The fork from Ares to the three posts, drawn at its real pixel width (measured) so nothing is
// stretched: a stretched SVG throws off the curves' length, and their draw-in and light then
// stopped short of the posts (2026-10-12). Each wire lands on the center of its post (three
// columns, 8px gaps, as .ds-flow-posts).
function FlowFork() {
  const ref = useRef<SVGSVGElement>(null);
  const [w, setW] = useState(300);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setW(Math.round(e.contentRect.width) || 300));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  const H = 48;
  const col = (w - 16) / 3;
  const mid = w / 2;
  const ends = [col / 2, col + 8 + col / 2, 2 * col + 16 + col / 2];
  return (
    <svg ref={ref} className="ds-flow-wire ds-flow-wire-fork" viewBox={`0 0 ${w} ${H}`} aria-hidden="true">
      {ends.map((x) => {
        const d = Math.abs(x - mid) < 1 ? `M${mid} 0V${H}` : `M${mid} 0C${mid} 26 ${x} 22 ${x} ${H}`;
        return (
          <g key={Math.round(x)}>
            <path className="ds-wire-base" d={d} pathLength="100" />
            <path className="ds-wire-pulse" d={d} pathLength="100" />
          </g>
        );
      })}
    </svg>
  );
}

// The prime contractor diagram (owner, 2026-10-10; Framer-style rework 2026-10-12), shared by
// the Home prime panel and the Teaming page: hairline wires that draw in on scroll, and a rust
// light that runs from the prime through Ares to each post, which lights as it arrives. The
// light waits until the diagram rises above the bottom quarter of the window, then loops
// (data-live switches the CSS loop on, once); it is ambient and stops under reduced motion.
export default function PrimeFlow({ className = '' }: { className?: string }) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        el.dataset.live = 'true';
        io.disconnect();
      },
      // The bottom quarter of the viewport doesn't count.
      { rootMargin: '0px 0px -25% 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <figure
      ref={ref}
      className={`ds-primes-flow ${className}`.trim()}
      aria-label="The prime holds the contract; Ares staffs restricted-area escort, access control, and relief posts under it"
    >
      <div className="ds-flow-node ds-flow-prime" aria-hidden="true">
        <span className="ds-data">Prime contractor</span>
        <span>Holds the contract</span>
      </div>
      <svg className="ds-flow-wire ds-flow-wire-down" viewBox="0 0 2 40" preserveAspectRatio="none" aria-hidden="true">
        <path className="ds-wire-base" d="M1 0V40" pathLength="100" />
        <path className="ds-wire-pulse" d="M1 0V40" pathLength="100" />
      </svg>
      <div className="ds-flow-node ds-flow-ares" aria-hidden="true">
        <span className="ds-data">
          <i className="ds-flow-dot" />
          Ares Security
        </span>
        <span>WOSB subcontractor · post orders, training, relief</span>
      </div>
      <FlowFork />
      <div className="ds-flow-posts" aria-hidden="true">
        {['Restricted-Area Escort', 'Access Control', 'Relief & Surge'].map((t) => (
          <span key={t}>
            <i className="ds-flow-dot" />
            {t}
          </span>
        ))}
      </div>
    </figure>
  );
}
