import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Arrow from '../Arrow';
import { CAPABILITIES } from '../capability/data';
import { motionAllowed, useScene, SCRUB } from '../home/engine';

// Services hero, "The post canvas" (home-flora, 2026-10-22), after FLORA's hero: the headline in
// the middle of a dot-grid canvas, with labeled nodes around it joined by wires. Here the nodes are
// the six services, and every wire runs into one node under the headline, your post: whatever the
// site needs is wired to the same post. A rust light runs down each wire into it. On desktop the
// nodes drift a little with the cursor (each at its own depth) and the wires follow; as the hero
// leaves, the nodes spread out and fade. Phones: the headline, then the six as a compact grid,
// no wires. The default (no JavaScript, prerender, reduced motion) is the built, still canvas.

const n2 = (i: number) => String(i + 1).padStart(2, '0');

// The six nodes take the reader down to that service's card in "Pick a service." on this page
// (owner, 2026-10-23), not to its own page; the card links on to the full page. The page glides
// the "#" link down (SmoothAnchors); on phones, where the cards are a sideways swipe row, the row
// also swipes to the card.
function showPanel(id: string) {
  const panel = document.getElementById(`svc-${id}`);
  const row = panel?.parentElement;
  if (!panel || !row || row.scrollWidth <= row.clientWidth) return;
  const left = row.scrollLeft + panel.getBoundingClientRect().left - row.getBoundingClientRect().left - parseFloat(getComputedStyle(row).paddingLeft);
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  row.scrollTo({ left, behavior: reduce ? 'auto' : 'smooth' });
}

// Where each node sits on the desktop canvas (percent of the stage) and how deep it is.
const SPOTS = [
  { x: 4, y: 16, depth: 1 },
  { x: 9, y: 46, depth: 0.55 },
  { x: 3, y: 74, depth: 0.8 },
  { x: 79, y: 14, depth: 0.7 },
  { x: 74, y: 44, depth: 1 },
  { x: 80, y: 73, depth: 0.5 },
];

export default function SvHero() {
  const ref = useRef<HTMLElement>(null);
  const [lens, setLens] = useState<number[]>([]);

  // The wires: from the inner edge of each node to the post node, a horizontal-tangent curve.
  useLayoutEffect(() => {
    const root = ref.current;
    if (!root) return;
    const stage = root.querySelector<HTMLElement>('.sv-hero-stage')!;
    const nodes = Array.from(root.querySelectorAll<HTMLElement>('.sv-hero-node'));
    const post = root.querySelector<HTMLElement>('.sv-hero-post')!;
    const paths = Array.from(root.querySelectorAll<SVGPathElement>('.sv-hero-wires path[data-w]'));
    const lights = Array.from(root.querySelectorAll<SVGPathElement>('.sv-hero-wires path[data-l]'));
    const wide = window.matchMedia('(min-width: 1024px)');
    let raf = 0;
    const draw = () => {
      raf = 0;
      if (!wide.matches) return;
      const s = stage.getBoundingClientRect();
      const p = post.getBoundingClientRect();
      const out: number[] = [];
      nodes.forEach((n, i) => {
        const r = n.getBoundingClientRect();
        const left = r.left + r.width / 2 < s.left + s.width / 2;
        const x1 = (left ? r.right : r.left) - s.left;
        const y1 = r.top + Math.min(r.height / 2, 40) - s.top;
        const x2 = (left ? p.left + 18 : p.right - 18) - s.left;
        const y2 = p.top + p.height / 2 - s.top;
        const k = Math.abs(x2 - x1) * 0.55;
        const d = `M${x1.toFixed(1)} ${y1.toFixed(1)} C${(x1 + (left ? k : -k)).toFixed(1)} ${y1.toFixed(1)} ${(x2 + (left ? -k : k)).toFixed(1)} ${y2.toFixed(1)} ${x2.toFixed(1)} ${y2.toFixed(1)}`;
        paths[i].setAttribute('d', d);
        lights[i].setAttribute('d', d);
        out.push(paths[i].getTotalLength());
      });
      setLens((prev) => (prev.length === out.length && prev.every((v, i) => Math.abs(v - out[i]) < 1) ? prev : out));
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(draw);
    };
    draw();
    document.fonts?.ready.then(schedule);
    const ro = new ResizeObserver(schedule);
    ro.observe(stage);
    (root as HTMLElement & { __redraw?: () => void }).__redraw = schedule;
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  // Cursor depth (desktop, pointer only): each node leans toward the cursor by its depth, and the
  // wires are redrawn to follow.
  useEffect(() => {
    const root = ref.current;
    if (!root || !motionAllowed() || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    const nodes = Array.from(root.querySelectorAll<HTMLElement>('.sv-hero-node'));
    const target = { x: 0, y: 0 };
    const now = { x: 0, y: 0 };
    let raf = 0;
    const tick = () => {
      now.x += (target.x - now.x) * 0.08;
      now.y += (target.y - now.y) * 0.08;
      nodes.forEach((n, i) => {
        const d = SPOTS[i].depth;
        n.style.translate = `${(now.x * 22 * d).toFixed(2)}px ${(now.y * 16 * d).toFixed(2)}px`;
      });
      (root as HTMLElement & { __redraw?: () => void }).__redraw?.();
      raf = Math.abs(target.x - now.x) + Math.abs(target.y - now.y) > 0.001 ? requestAnimationFrame(tick) : 0;
    };
    const onMove = (e: PointerEvent) => {
      target.x = e.clientX / window.innerWidth - 0.5;
      target.y = e.clientY / window.innerHeight - 0.5;
      if (!raf) raf = requestAnimationFrame(tick);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Load-in (motion only): nodes settle in, then the wires draw, then the lights start. Once the
  // last node has settled (0.35s + 5 x 90ms + 0.9s), data-settled drops the nodes' transitions so
  // they don't trail the scroll scene below.
  useLayoutEffect(() => {
    if (motionAllowed()) ref.current?.setAttribute('data-arm', 'true');
    const id = requestAnimationFrame(() => requestAnimationFrame(() => ref.current?.setAttribute('data-in', 'true')));
    const done = window.setTimeout(() => ref.current?.setAttribute('data-settled', 'true'), 1900);
    return () => {
      cancelAnimationFrame(id);
      window.clearTimeout(done);
    };
  }, []);

  // Leaving: the nodes spread out and fade; the headline lifts a little. Every tween names its
  // start, so scrolling back always returns to the built hero: a plain .to() reads the start the
  // first time it renders, which on a reload mid-page (or a quick scroll away) caught the nodes
  // mid load-in at opacity 0, and they never came back (2026-10-23).
  useScene(ref, ({ gsap }, root) => {
    const mm = gsap.matchMedia();
    mm.add('(min-width: 1024px)', () => {
      const nodes = gsap.utils.toArray<HTMLElement>('.sv-hero-node', root);
      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: { trigger: root, start: 'top top', end: 'bottom top', scrub: SCRUB },
      });
      const from = { immediateRender: false };
      nodes.forEach((n, i) => {
        const left = SPOTS[i].x < 50;
        tl.fromTo(n, { x: 0, y: 0, opacity: 1 }, { x: (left ? -1 : 1) * (80 + 60 * SPOTS[i].depth), y: -40 * SPOTS[i].depth, opacity: 0, duration: 0.7, ...from }, 0);
      });
      tl.fromTo(root.querySelector('.sv-hero-wires'), { opacity: 1 }, { opacity: 0, duration: 0.3, ...from }, 0)
        .fromTo(root.querySelector('.sv-hero-copy'), { y: 0, opacity: 1 }, { y: -60, opacity: 0.2, duration: 0.9, ...from }, 0);
    });
    return () => mm.revert();
  });

  return (
    <section ref={ref} className="sv-hero" aria-labelledby="sv-hero-title">
      <div className="sv-hero-stage">
        <div className="sv-hero-grid" aria-hidden="true" />
        <svg className="sv-hero-wires" aria-hidden="true">
          {CAPABILITIES.map((c, i) => (
            <path
              key={`w-${c.id}`}
              data-w={i}
              style={lens[i] ? ({ ['--len' as string]: lens[i], ['--i' as string]: i } as React.CSSProperties) : undefined}
            />
          ))}
          {CAPABILITIES.map((c, i) => (
            <path
              key={`l-${c.id}`}
              data-l={i}
              style={lens[i] ? ({ ['--len' as string]: lens[i], ['--i' as string]: i } as React.CSSProperties) : undefined}
            />
          ))}
        </svg>

        <div className="sv-hero-copy">
          <h1 id="sv-hero-title" className="sv-hero-title">
            A prepared officer <br />
            on every post
          </h1>
          <p className="sv-hero-lead">
            Armed and unarmed coverage for federal, commercial, and industrial sites in Colorado Springs,
            Denver, and Pueblo. Pick a service, or find your industry.
          </p>
          <div className="sv-hero-actions">
            <Link to="/contact" className="ds-btn ds-btn-primary">
              Request a Quote
              <Arrow />
            </Link>
            <a href="#divisions" className="ds-link">
              See the six industries
              <Arrow />
            </a>
          </div>
          <p className="sv-hero-post" aria-hidden="true">
            <span className="sv-hero-post-bar">
              <span>Your post</span>
              <span>Colorado Springs · Denver · Pueblo</span>
            </span>
          </p>
        </div>

        <ul className="sv-hero-nodes">
          {CAPABILITIES.map((c, i) => {
            return (
              <li
                key={c.id}
                className="sv-hero-node"
                style={{ ['--x' as string]: `${SPOTS[i].x}%`, ['--y' as string]: `${SPOTS[i].y}%`, ['--i' as string]: i } as React.CSSProperties}
              >
                <a href={`#svc-${c.id}`} onClick={() => showPanel(c.id)}>
                  <span className="sv-node-bar">
                    <span>{n2(i)}</span>
                    <span>{c.keys[0]}</span>
                  </span>
                  <span className="sv-node-name">{c.title}</span>
                  <span className="sv-node-keys">{c.keys.slice(1).join(' · ')}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
