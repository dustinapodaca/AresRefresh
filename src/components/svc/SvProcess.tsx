import { useRef, type CSSProperties } from 'react';
import { STAGES } from '../services/data';
import { readIn, useScene, words, SCRUB } from '../home/engine';
import './sv-process.css';

// 03 Process, "The workflow canvas" (home-flora, 2026-10-22), after FLORA's workflow canvas (media
// nodes with a label bar, joined by curved wires on a dot grid). The four stages are four large
// nodes on one wide canvas, wired left to right; stage 03 sprouts the six systems officers learn
// before their first shift as small satellite nodes. Faint mono annotations mark the phases.
// Desktop with motion: the section holds the screen and the canvas pans sideways with the scroll;
// each wire draws as the pan carries it to the middle, and each node lights as it arrives.
// Phones and tablets with motion (owner, 2026-10-25): the same idea in one row, the stage cards
// panning sideways under a rust wire across their tops. Everywhere else (reduced motion, the
// prerender, no JavaScript): the four nodes stacked on a rust wire, the systems as a two-column list
// inside stage 03.

// The six systems (services/Systems.tsx; names only here).
const SYSTEMS = [
  'Card readers and access panels',
  'CCTV monitors',
  'Visitor management software',
  'Intercoms and radios',
  'Gate and dock controls',
  'Alarm panels',
];

const PHASES = [
  { label: 'Pre-contract', at: 0 },
  { label: 'Contract execution', at: 2 },
  { label: 'Operational', at: 3 },
];

// Canvas layout on desktop: stage nodes (x in px from the canvas's left pad, y in % of the view),
// and the satellites under stage 03.
const STAGE_SPOTS = [
  { x: 0, y: 24 },
  { x: 610, y: 47 },
  { x: 1220, y: 15 },
  { x: 1930, y: 40 },
];
const SAT_SPOTS = [
  { x: 1090, y: 66 },
  { x: 1320, y: 66 },
  { x: 1550, y: 66 },
  { x: 1200, y: 81 },
  { x: 1430, y: 81 },
  { x: 1660, y: 81 },
];
const PHASE_SPOTS = [
  { x: 0, y: 12 },
  { x: 1220, y: 6 },
  { x: 1930, y: 28 },
];
const NODE_W = 400;
const SAT_W = 210;

type WireRef = { el: SVGPathElement; from: HTMLElement; to: HTMLElement; kind: 'main' | 'sat' };

export default function SvProcess() {
  const ref = useRef<HTMLElement>(null);

  // The head reads in on every layout.
  useScene(ref, (engine, root) => {
    readIn(engine, root.querySelector('.sv-pr-title'));

    const mm = engine.gsap.matchMedia();
    // Phones and tablets (owner, 2026-10-25; was the stacked list drawing down a rail): like desktop,
    // the stages pan sideways with the scroll, one at a time. The heading holds above the row (the
    // intro moves under it: the three don't fit one phone screen), and a hairline across the stage
    // tops fills rust to a reading line (62% across); each stage comes up as the line reaches it.
    // No card boxes, glows, or tip (AI-tells pass, owner 2026-10-25). Scrubbed, so it reverses on the
    // way up. The stacked list stays the resolved default.
    mm.add('(max-width: 1023px)', () => {
      const { gsap, ScrollTrigger } = engine;
      const view = root.querySelector<HTMLElement>('.sv-pr-view')!;
      const track = root.querySelector<HTMLElement>('.sv-pr-track')!;
      const title = root.querySelector<HTMLElement>('.sv-pr-title')!;
      const list = root.querySelector<HTMLElement>('.sv-pr-stages')!;
      const rail = root.querySelector<HTMLElement>('.sv-pr-rail')!;
      const fill = rail.querySelector<HTMLElement>('i')!;
      const tip = rail.querySelector<HTMLElement>('b')!;
      const nodes = Array.from(list.querySelectorAll<HTMLElement>(':scope > .sv-pr-node'));
      root.dataset.arm = 'true';
      root.dataset.hpan = 'on';
      let first = 0;
      let span = 1;
      let stops: number[] = [];
      // Track coordinates: the rail runs from the first stage's stop to the last one's.
      const measure = () => {
        stops = nodes.map((n) => list.offsetLeft + n.offsetLeft + 4);
        first = stops[0];
        span = Math.max(1, stops[stops.length - 1] - first);
        rail.style.left = `${first}px`;
        rail.style.width = `${span}px`;
      };
      const distance = () => Math.max(0, track.scrollWidth - view.clientWidth);
      // The held frame (owner, 2026-10-25): the heading under the nav, the row under it, and the intro
      // in a black card under the row.
      // About 88px under the nav on a regular phone (owner, 2026-10-25: halfway between centered and
      // 20px), less on short screens so the row stays in view.
      const pinTop = () =>
        (parseFloat(getComputedStyle(root).getPropertyValue('--ds-header')) || 64) +
        Math.round(Math.max(36, Math.min(88, (window.innerHeight - 640) * 0.45)));
      const paint = () => {
        const tx = Number(gsap.getProperty(track, 'x')) || 0;
        const at = view.clientWidth * 0.62 - tx;
        const p = Math.max(0, Math.min(1, (at - first) / span));
        fill.style.transform = `scaleX(${p.toFixed(4)})`;
        tip.style.transform = `translateX(${(p * span).toFixed(1)}px)`;
        tip.style.opacity = p > 0.002 ? '1' : '0';
        nodes.forEach((n, i) => {
          const on = stops[i] <= at;
          if ((n.dataset.lit === 'true') !== on) n.dataset.lit = String(on);
        });
        const done = p >= 0.999;
        if ((root.dataset.done === 'true') !== done) {
          if (done) root.dataset.done = 'true';
          else delete root.dataset.done;
        }
      };
      measure();
      const tween = gsap.to(track, {
        x: () => -distance(),
        ease: 'none',
        onUpdate: paint,
        scrollTrigger: {
          // The section holds once its heading reaches its place in the frame.
          trigger: title,
          start: () => `top ${pinTop()}px`,
          end: () => `+=${Math.round(distance() * 1.15)}`,
          pin: root,
          scrub: SCRUB,
          invalidateOnRefresh: true,
          onRefreshInit: () => gsap.set(track, { x: 0 }),
          onRefresh: () => {
            measure();
            paint();
          },
        },
      });
      paint();
      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
        gsap.set(track, { clearProps: 'transform' });
        delete root.dataset.arm;
        delete root.dataset.hpan;
        delete root.dataset.done;
        nodes.forEach((n) => delete n.dataset.lit);
        for (const el of [fill, tip]) el.style.transform = '';
        tip.style.opacity = '';
        rail.style.left = '';
        rail.style.width = '';
        ScrollTrigger.refresh();
      };
    });
    mm.add('(min-width: 1024px)', () => {
      const { gsap, ScrollTrigger } = engine;
      const view = root.querySelector<HTMLElement>('.sv-pr-view')!;
      const track = root.querySelector<HTMLElement>('.sv-pr-track')!;
      const stages = gsap.utils.toArray<HTMLElement>('.sv-pr-node', track);
      const sats = gsap.utils.toArray<HTMLElement>('.sv-pr-sat', track);
      const phases = gsap.utils.toArray<HTMLElement>('.sv-pr-phase', track);
      const svg = track.querySelector<SVGSVGElement>('.sv-pr-wires')!;
      const mains = Array.from(svg.querySelectorAll<SVGPathElement>('path[data-main]'));
      const lights = Array.from(svg.querySelectorAll<SVGPathElement>('path[data-light]'));
      const satWires = Array.from(svg.querySelectorAll<SVGPathElement>('path[data-sat]'));

      // Wires from the real node boxes (canvas coordinates, before any pan).
      const wires: WireRef[] = [];
      const route = () => {
        wires.length = 0;
        const box = (el: HTMLElement) => ({ x: el.offsetLeft, y: el.offsetTop, w: el.offsetWidth, h: el.offsetHeight });
        for (let i = 0; i < stages.length - 1; i += 1) {
          const a = box(stages[i]);
          const b = box(stages[i + 1]);
          const x1 = a.x + a.w;
          const y1 = a.y + Math.min(46, a.h / 2);
          const x2 = b.x;
          const y2 = b.y + Math.min(46, b.h / 2);
          const k = (x2 - x1) * 0.5;
          const d = `M${x1} ${y1} C${x1 + k} ${y1} ${x2 - k} ${y2} ${x2} ${y2}`;
          mains[i].setAttribute('d', d);
          lights[i].setAttribute('d', d);
          wires.push({ el: mains[i], from: stages[i], to: stages[i + 1], kind: 'main' });
        }
        const s3 = box(stages[2]);
        sats.forEach((sat, i) => {
          const b = box(sat);
          const x1 = s3.x + s3.w * (0.22 + i * 0.11);
          const y1 = s3.y + s3.h;
          const x2 = b.x + b.w / 2;
          const y2 = b.y;
          const k = (y2 - y1) * 0.5;
          satWires[i].setAttribute('d', `M${x1} ${y1} C${x1} ${y1 + k} ${x2} ${y2 - k} ${x2} ${y2}`);
          wires.push({ el: satWires[i], from: stages[2], to: sat, kind: 'sat' });
        });
      };
      route();

      const distance = () => Math.max(0, track.scrollWidth - view.clientWidth);
      // Where the "arrival line" sits: a little right of the middle, so a node lights as it
      // settles into view rather than at the far edge.
      const line = () => view.clientWidth * 0.7;

      const paint = () => {
        const tx = Number(gsap.getProperty(track, 'x')) || 0;
        const at = line();
        stages.forEach((n) => {
          const cx = n.offsetLeft + tx + 120;
          n.dataset.lit = String(cx < at);
        });
        phases.forEach((p) => (p.dataset.lit = String(p.offsetLeft + tx < at)));
        wires.forEach((w) => {
          let p: number;
          if (w.kind === 'main') {
            const start = w.from.offsetLeft + w.from.offsetWidth;
            const end = w.to.offsetLeft;
            p = (at - (start + tx)) / Math.max(1, end - start);
          } else {
            const start = w.from.offsetLeft + 120;
            p = (at - (start + tx)) / 420;
          }
          p = Math.max(0, Math.min(1, p));
          w.el.style.strokeDashoffset = String(1000 * (1 - p));
          if (w.kind === 'sat') w.to.dataset.lit = String(p > 0.98);
        });
        mains.forEach((m, i) => lights[i].setAttribute('data-on', String(Number(m.style.strokeDashoffset) < 1)));
      };

      const tween = gsap.to(track, {
        x: () => -distance(),
        ease: 'none',
        onUpdate: paint,
        scrollTrigger: {
          trigger: view,
          start: 'top top',
          end: () => `+=${Math.round(distance() * 1.15)}`,
          pin: true,
          scrub: SCRUB,
          invalidateOnRefresh: true,
          onRefreshInit: () => gsap.set(track, { x: 0 }),
          onRefresh: () => {
            route();
            paint();
          },
        },
      });
      paint();
      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
        ScrollTrigger.refresh();
      };
    });
    return () => mm.revert();
  });

  return (
    <section ref={ref} id="sv-process" className="sv-pr" aria-labelledby="sv-pr-title">
      <header className="sv-pr-head nx-edge">
        <h2 id="sv-pr-title" className="nx-statement nx-statement-sm sv-pr-title">
          {words('Four stages, from site walk to first shift.')}
        </h2>
        <p className="sv-pr-intro">
          Every site has its own shift pattern, threat profile, and compliance requirements. The four
          stages exist because protection that holds up under scrutiny can&rsquo;t be rushed, copied
          from another contract, or trusted to a stranger on day one.
        </p>
      </header>

      <div className="sv-pr-view">
        <div
          className="sv-pr-track"
          style={{ ['--node-w' as string]: `${NODE_W}px`, ['--sat-w' as string]: `${SAT_W}px` } as CSSProperties}
        >
          <div className="sv-pr-grid" aria-hidden="true" />
          <svg className="sv-pr-wires" aria-hidden="true">
            {STAGES.slice(0, -1).map((s, i) => (
              <path key={`m-${s.n}`} data-main={i} pathLength={1000} />
            ))}
            {STAGES.slice(0, -1).map((s, i) => (
              <path key={`l-${s.n}`} data-light={i} pathLength={1000} style={{ ['--i' as string]: i } as CSSProperties} />
            ))}
            {SYSTEMS.map((name, i) => (
              <path key={`s-${name}`} data-sat={i} pathLength={1000} />
            ))}
          </svg>

          {PHASES.map((p, i) => (
            <p
              key={p.label}
              className="sv-pr-phase ds-data"
              aria-hidden="true"
              style={{ ['--x' as string]: `${PHASE_SPOTS[i].x}px`, ['--y' as string]: `${PHASE_SPOTS[i].y}%` } as CSSProperties}
            >
              {p.label}
            </p>
          ))}

          {/* The phone and tablet wire that draws with the scroll (decorative). */}
          <span className="sv-pr-rail" aria-hidden="true">
            <i />
            <b />
          </span>
          <ol className="sv-pr-stages">
            {STAGES.map((s, i) => (
              <li
                key={s.n}
                className="sv-pr-node"
                data-phase={PHASES.reduce((acc, p) => (i >= p.at ? p.label : acc), PHASES[0].label)}
                style={{ ['--x' as string]: `${STAGE_SPOTS[i].x}px`, ['--y' as string]: `${STAGE_SPOTS[i].y}%` } as CSSProperties}
              >
                <p className="sv-pr-bar">
                  <span>{s.n}</span>
                  <span>{s.covers}</span>
                </p>
                <div className="sv-pr-card">
                  <h3 className="sv-pr-name">{s.title}</h3>
                  <p className="sv-pr-body">{s.body}</p>
                  {s.systems && (
                    <ul className="sv-pr-syslist" aria-label="Systems officers learn before their first shift">
                      {SYSTEMS.map((name, k) => (
                        <li key={name} style={{ ['--k' as string]: k } as CSSProperties}>
                          {name}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </li>
            ))}
          </ol>

          {/* The same six systems as satellite nodes on the desktop canvas (the list above carries
              them for readers). */}
          <ul className="sv-pr-sats" aria-hidden="true">
            {SYSTEMS.map((name, i) => (
              <li
                key={name}
                className="sv-pr-sat"
                style={{ ['--x' as string]: `${SAT_SPOTS[i].x}px`, ['--y' as string]: `${SAT_SPOTS[i].y}%` } as CSSProperties}
              >
                <span className="sv-pr-sat-name">{name}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="sv-pr-handoff nx-edge">The same four stages run at every post, in every city we cover.</p>
    </section>
  );
}
