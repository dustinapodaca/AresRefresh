import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Arrow from '../Arrow';
import { readIn, useScene, words } from './engine';
import './nx-prime.css';

// For prime contractors (home-flora, 2026-10-20): a real node canvas, after flora's workflow
// canvas, on a plain dot-grid plane with no panel around it. The prime, Ares, and the three posts
// are nodes with label bars, joined by curved wires that draw with the scroll; each node lights as
// its wire reaches it, and the three proof points sit as small notes beside the node they prove.
// Once built, a rust pulse runs prime to Ares to the posts. Every fact is one already on the live
// Home's panel. Resolved default (prerender, reduced motion): built and still. Phones: one column
// on a straight rail.

const POSTS = ['Restricted-Area Escort', 'Access Control', 'Relief & Surge'];

type Wire = { id: string; d: string; x1: number; y1: number; x2: number; y2: number };

export default function NxPrime() {
  const ref = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const [wires, setWires] = useState<Wire[]>([]);
  const [size, setSize] = useState({ w: 0, h: 0 });

  // Wires are measured from the nodes' real boxes, so they follow the layout at every width.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const measure = () => {
      const c = canvas.getBoundingClientRect();
      const box = (sel: string) => {
        const el = canvas.querySelector<HTMLElement>(sel);
        if (!el) return null;
        const r = el.getBoundingClientRect();
        return { l: r.left - c.left, t: r.top - c.top, r: r.right - c.left, b: r.bottom - c.top, cx: r.left - c.left + r.width / 2 };
      };
      const prime = box('[data-node="prime"] .nx-pn-body');
      const ares = box('[data-node="ares"] .nx-pn-body');
      const posts = POSTS.map((_, i) => box(`[data-node="post-${i}"] .nx-pn-body`));
      if (!prime || !ares || posts.some((p) => !p)) return;
      const curve = (id: string, x1: number, y1: number, x2: number, y2: number): Wire => {
        const dy = (y2 - y1) * 0.55;
        return { id, x1, y1, x2, y2, d: `M ${x1} ${y1} C ${x1} ${y1 + dy}, ${x2} ${y2 - dy}, ${x2} ${y2}` };
      };
      const next: Wire[] = [curve('w-prime', prime.cx, prime.b, ares.cx, ares.t)];
      posts.forEach((p, i) => p && next.push(curve(`w-post-${i}`, ares.cx, ares.b, p.cx, p.t)));
      setWires(next);
      setSize({ w: c.width, h: c.height });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(canvas);
    document.fonts?.ready.then(measure);
    return () => ro.disconnect();
  }, []);

  useScene(ref, (e, root) => {
    const { gsap } = e;
    readIn(e, root.querySelector('.nx-prime-copy h2'), 'top 85%', 'top 45%');
    const canvas = root.querySelector<HTMLElement>('.nx-prime-canvas')!;

    const mm = gsap.matchMedia();
    mm.add('(min-width: 1024px)', () => {
      const paths = () => gsap.utils.toArray<SVGPathElement>('.nx-pw', canvas);
      const order = ['prime', 'ares', 'post-0', 'post-1', 'post-2'];
      const nodes = order.map((k) => canvas.querySelector<HTMLElement>(`[data-node="${k}"]`)!);
      const notes = gsap.utils.toArray<HTMLElement>('.nx-pnote', canvas);
      const tags = gsap.utils.toArray<HTMLElement>('.nx-ptag', canvas);
      // Thresholds where each node lights (fractions of the build).
      const lightAt = [0.02, 0.36, 0.7, 0.76, 0.82];

      const setDash = () =>
        paths().forEach((p) => {
          const len = p.getTotalLength();
          p.style.strokeDasharray = `${len}`;
          p.dataset.len = String(len);
        });
      setDash();

      canvas.dataset.build = 'on';
      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: canvas,
          start: 'top 78%',
          end: 'bottom 62%',
          scrub: 0.6,
          invalidateOnRefresh: true,
          onRefreshInit: setDash,
          onUpdate: (self) => {
            nodes.forEach((n, k) => (n.dataset.live = self.progress >= lightAt[k] ? 'true' : 'false'));
            if (self.progress >= 0.999) canvas.dataset.pulse = 'on';
          },
        },
      });
      tl.fromTo(nodes[0], { opacity: 0.25, y: 24 }, { opacity: 1, y: 0, duration: 0.12 }, 0);
      tl.fromTo('.nx-pw[data-w="w-prime"]', { strokeDashoffset: (_: number, t: SVGPathElement) => Number(t.dataset.len) }, { strokeDashoffset: 0, duration: 0.24 }, 0.1);
      tl.fromTo(tags[0], { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.06 }, 0.2);
      tl.fromTo(nodes[1], { opacity: 0.25, y: 24 }, { opacity: 1, y: 0, duration: 0.12 }, 0.3);
      tl.fromTo(tags[1], { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.06 }, 0.4);
      tl.fromTo(notes[0], { opacity: 0, x: -16 }, { opacity: 1, x: 0, duration: 0.1 }, 0.42);
      tl.fromTo(
        '.nx-pw[data-w^="w-post"]',
        { strokeDashoffset: (_: number, t: SVGPathElement) => Number(t.dataset.len) },
        { strokeDashoffset: 0, duration: 0.24, stagger: 0.05 },
        0.48,
      );
      tl.fromTo(nodes.slice(2), { opacity: 0.25, y: 24 }, { opacity: 1, y: 0, duration: 0.1, stagger: 0.05 }, 0.68);
      tl.fromTo(notes.slice(1), { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.1, stagger: 0.06 }, 0.86);
      tl.fromTo('.nx-pend', { scale: 0 }, { scale: 1, duration: 0.04, stagger: 0.03, transformOrigin: '50% 50%' }, 0.12);
      return () => {
        delete canvas.dataset.build;
        delete canvas.dataset.pulse;
      };
    });
    return () => mm.revert();
  });

  return (
    <section ref={ref} id="nx-prime" className="nx-prime" aria-labelledby="nx-prime-title">
      <div className="nx-prime-grid nx-edge">
        <div className="nx-prime-copy">
          <h2 id="nx-prime-title" className="nx-statement nx-statement-sm">
            {words('For prime contractors.')}
          </h2>
          <p className="nx-prime-line">
            <span>A woman-owned subcontractor for Front Range work.</span> Restricted-area escorts,
            access control officers, and relief, overflow, and surge coverage under your contract.
          </p>
          <Link to="/teaming" className="ds-btn ds-btn-primary">
            Teaming & subcontracting
            <Arrow />
          </Link>
        </div>

        <div ref={canvasRef} className="nx-prime-canvas">
          <svg className="nx-prime-wires" width={size.w} height={size.h} viewBox={`0 0 ${size.w || 1} ${size.h || 1}`} aria-hidden="true">
            {wires.map((w) => (
              <g key={w.id}>
                <path className="nx-pw-base" d={w.d} />
                <path className="nx-pw" data-w={w.id} d={w.d} />
                <rect className="nx-pend" x={w.x1 - 2.5} y={w.y1 - 2.5} width={5} height={5} />
                <rect className="nx-pend" x={w.x2 - 2.5} y={w.y2 - 2.5} width={5} height={5} />
              </g>
            ))}
          </svg>
          {/* The ambient pulse: small rust lights that ride each wire once the canvas is built. */}
          {wires.map((w, i) => (
            <i key={w.id} className="nx-ppulse" aria-hidden="true" style={{ offsetPath: `path("${w.d}")`, animationDelay: `${i === 0 ? 0 : 1.1 + (i - 1) * 0.18}s` }} />
          ))}

          <div className="nx-pn nx-node" data-node="prime" data-live="true">
            <p className="nx-node-bar">
              <span>Prime contractor</span>
              <span>Holds the contract</span>
            </p>
            <div className="nx-pn-body">
              <span className="nx-pn-k">Needs</span>
              <span className="nx-pn-v">Posts covered under its contract</span>
            </div>
          </div>

          <span
            className="nx-ptag"
            data-tag="teaming"
            aria-hidden="true"
            style={wires[0] ? { left: (wires[0].x1 + wires[0].x2) / 2, top: (wires[0].y1 + wires[0].y2) / 2 } : undefined}
          >
            Teaming
          </span>

          <div className="nx-pn nx-node" data-node="ares" data-live="true">
            <p className="nx-node-bar">
              <span>Ares Security</span>
              <span>Subcontractor</span>
            </p>
            <div className="nx-pn-body">
              <span className="nx-pn-row">
                <span className="nx-pn-k">SBA WOSB</span>
                <span className="nx-pn-id">WOSB250470</span>
              </span>
              <span className="nx-pn-row">
                <span className="nx-pn-k">WBENC</span>
                <span className="nx-pn-id">WBE2303571</span>
              </span>
            </div>
            <span className="nx-ptag" data-tag="credit">
              Subcontracting credit
            </span>
          </div>

          <p className="nx-pnote" data-note="credit">
            <span className="nx-pnote-k">Subcontracting credit</span>
            Woman-owned small business
            <span className="nx-pnote-id">WOSB250470 · WBE2303571</span>
          </p>

          {POSTS.map((p, i) => (
            <div key={p} className="nx-pn nx-node nx-pn-post" data-node={`post-${i}`} data-live="true">
              <p className="nx-node-bar">
                <span>Post</span>
                <span>0{i + 1}</span>
              </p>
              <div className="nx-pn-body">
                <span className="nx-pn-v">{p}</span>
              </div>
            </div>
          ))}

          <p className="nx-pnote" data-note="restricted">
            <span className="nx-pnote-k">Restricted areas</span>
            Escort and access control on a Space Force base in Colorado
            <span className="nx-pnote-id">Subcontractor · 2025 to 2027</span>
          </p>
          <p className="nx-pnote" data-note="reliability">
            <span className="nx-pnote-k">Reliability</span>
            Fewer than 1% of shifts missed since 2021
            <span className="nx-pnote-id">On-call relief in every contract</span>
          </p>
        </div>
      </div>
    </section>
  );
}
