import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Arrow from '../Arrow';
import { readIn, useScene, words, SCRUB } from './engine';
import { cssPanSupported, frames, panRange, panSheet } from '../../lib/stickyPan';
import './nx-prime.css';

// For prime contractors (home-flora, 2026-10-20): the prime, Ares, and the three posts as cards with
// black label tabs, joined by wires; the three proof points sit as small notes beside the card they
// prove. Every fact is one already on the live Home's panel. Desktop with motion: the wires draw and
// the cards light with the scroll. Phones and tablets with motion (owner, 2026-10-25): the cards sit
// in a row on a rail, the row holds the screen and slides sideways as the reader scrolls (like the
// Services stages on desktop), and each card lights as it reaches the reading line. Resolved default
// (prerender, reduced motion): built and still; one column on phones. The dot grid, the rust pulses,
// the wire end squares, and the boxed capital tags were removed in the AI-tells pass (2026-10-25).

const POSTS = ['Restricted-Area Escort', 'Access Control', 'Relief & Surge'];

type Wire = { id: string; d: string; x1: number; y1: number; x2: number; y2: number };

export default function Prime() {
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
      // The label is a tab on the card's top, so a wire meets the tab.
      const top = (n: string) => {
        const b = box(`${n} .nx-pn-body`);
        const tab = box(`${n} .nx-node-bar`);
        return b && tab ? { ...b, t: tab.t } : b;
      };
      const prime = top('[data-node="prime"]');
      const ares = top('[data-node="ares"]');
      const posts = POSTS.map((_, i) => top(`[data-node="post-${i}"]`));
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
    const { gsap, ScrollTrigger } = e;
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
          // Built by the time the canvas is in the middle of the screen (owner, 2026-10-23: Relief &
          // Surge was still coming in there; was 'bottom 62%').
          end: 'center 55%',
          scrub: SCRUB,
          invalidateOnRefresh: true,
          onRefreshInit: setDash,
          onUpdate: (self) => {
            nodes.forEach((n, k) => (n.dataset.live = self.progress >= lightAt[k] ? 'true' : 'false'));
          },
        },
      });
      tl.fromTo(nodes[0], { opacity: 0.25, y: 24 }, { opacity: 1, y: 0, duration: 0.12 }, 0);
      tl.fromTo('.nx-pw[data-w="w-prime"]', { strokeDashoffset: (_: number, t: SVGPathElement) => Number(t.dataset.len) }, { strokeDashoffset: 0, duration: 0.24 }, 0.1);
      tl.fromTo(tags[0], { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.06 }, 0.2);
      tl.fromTo(nodes[1], { opacity: 0.25, y: 24 }, { opacity: 1, y: 0, duration: 0.12 }, 0.3);
      tl.fromTo(notes[0], { opacity: 0, x: -16 }, { opacity: 1, x: 0, duration: 0.1 }, 0.42);
      tl.fromTo(
        '.nx-pw[data-w^="w-post"]',
        { strokeDashoffset: (_: number, t: SVGPathElement) => Number(t.dataset.len) },
        { strokeDashoffset: 0, duration: 0.24, stagger: 0.05 },
        0.48,
      );
      tl.fromTo(nodes.slice(2), { opacity: 0.25, y: 24 }, { opacity: 1, y: 0, duration: 0.1, stagger: 0.05 }, 0.68);
      tl.fromTo(notes.slice(1), { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.1, stagger: 0.06 }, 0.86);
      return () => {
        delete canvas.dataset.build;
      };
    });
    // Phones and tablets (owner, 2026-10-25; was a rail drawing down one column): the cards sit in a
    // row on a rail, the row holds the screen and slides sideways with the scroll, and each card and
    // the note under it light as they reach the reading line. Scrubbed, so scrolling back rewinds it.
    mm.add('(max-width: 1023px)', () => {
      const view = root.querySelector<HTMLElement>('.nx-prime-view')!;
      const frame = root.querySelector<HTMLElement>('.nx-prime-frame')!;
      frame.dataset.hpan = 'on';
      const items = gsap.utils.toArray<HTMLElement>(':scope > .nx-pn, :scope > .nx-pnote', canvas);
      const nodes = items.filter((el) => el.classList.contains('nx-pn'));
      view.dataset.hpan = 'on';
      canvas.dataset.hpan = 'on';
      const distance = () => Math.max(0, canvas.scrollWidth - view.clientWidth);
      const ares = canvas.querySelector<HTMLElement>('[data-node="ares"]')!;
      const fit = () => canvas.style.setProperty('--ares-h', `${ares.offsetHeight}px`);
      fit();
      const posts = [0, 1, 2].map((k) => canvas.querySelector<HTMLElement>(`[data-node="post-${k}"]`)!);
      // The scroll is split in two: the row slides until the posts' column is in view (PAN), then the
      // row holds while the posts fall out of one another and the rail runs on to its end.
      const PAN = 0.68;
      // Geometry is measured once per layout (refresh), never per frame: reading it each frame, right
      // after the row moved, forced a layout every frame on phones (owner, 2026-10-25: the pan felt
      // heavier than the rest of the page).
      const fill = canvas.querySelector<HTMLElement>('.nx-prail-fill')!;
      const tipEl = canvas.querySelector<HTMLElement>('.nx-prail-tip')!;
      let g = { start: 0, line: 1, postsAt: 0, viewW: 1, railW: 1, dist: 0, lefts: [] as number[] };
      const measure = () => {
        const start = nodes[0].offsetLeft;
        const line = Math.max(1, canvas.scrollWidth - 2 * start);
        g = {
          start,
          line,
          postsAt: (posts[0].offsetLeft + 24 - start) / line,
          viewW: view.clientWidth,
          railW: fill.offsetWidth,
          dist: Math.max(0, canvas.scrollWidth - view.clientWidth),
          lefts: items.map((el) => el.offsetLeft + 24),
        };
      };
      measure();
      // The pinned frame's place: centered in the room under the nav, never under it.
      const holdTop = () => {
        const nav = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--ds-header')) || 64;
        const room = window.innerHeight - nav;
        return Math.round(nav + Math.max(12, (room - frame.offsetHeight) / 2));
      };
      const PEEK = 7;
      // The rail's fill (0 to 1) at a point of the hold: up to the reading line while the row slides,
      // held at the posts while they fall, then on to its end.
      const railAt = (prog: number) => {
        const { start, line, postsAt, viewW, dist } = g;
        if (prog >= PAN) return postsAt + (1 - postsAt) * ((prog - PAN) / (1 - PAN));
        const at = viewW * 0.62 + dist * (Math.max(0, prog) / PAN);
        return Math.max(0, Math.min(1, (at - start) / Math.max(1, postsAt * line))) * postsAt;
      };

      // Where scroll-driven animations run (owner, 2026-10-25: the scripted pan was choppy on an
      // iPhone): the frame holds with position: sticky over a runway as long as the pan, and the row's
      // slide, the rail, the posts falling, and the escort note are CSS animations on the section's view
      // timeline (lib/stickyPan.ts). Script measures on load and resize and flips the lit states as the
      // scroll passes them. The same numbers as the scripted version below.
      if (cssPanSupported()) {
        const grid = root.querySelector<HTMLElement>('.nx-prime-grid')!;
        const runway = root.querySelector<HTMLElement>('.nx-prime-runway')!;
        const note = canvas.querySelector<HTMLElement>('[data-note="restricted"]')!;
        const sheet = panSheet('nx-prime');
        root.dataset.pan = 'css';
        let top = 0;
        let padT = 0;
        let run = 1;
        let dist = 0;
        let tipShown = '';
        const lit = () => {
          const prog = Math.max(0, Math.min(1, (top - padT - grid.getBoundingClientRect().top) / run));
          const rail = railAt(prog);
          const at = g.viewW * 0.62 + dist * (Math.min(prog, PAN) / PAN);
          const tip = g.start + rail * g.line;
          items.forEach((el, k) => {
            const on = String(prog >= PAN || g.lefts[k] <= Math.max(at, tip));
            if (el.dataset.lit !== on) {
              el.dataset.lit = on;
              if (el.classList.contains('nx-pn')) el.dataset.live = on;
            }
          });
          const o = rail > 0.001 && rail < 0.999 ? '1' : '0';
          if (o !== tipShown) tipEl.style.opacity = tipShown = o;
        };
        const layout = () => {
          fit();
          measure();
          dist = g.dist;
          top = holdTop();
          run = Math.max(1, Math.round((dist * 1.2) / PAN));
          const cs = getComputedStyle(grid);
          padT = parseFloat(cs.paddingTop) || 0;
          frame.style.top = `${top}px`;
          runway.style.height = `${run}px`;
          const endS = top + frame.offsetHeight + (parseFloat(cs.paddingBottom) || 0);
          // The scripted timeline's tweens are placed in its own seconds, and it runs PAN + 0.36 long (a
          // little past 1), so their stretches of the hold are those times over its length.
          const T = Math.max(1, PAN + 0.36);
          const range = (a: number, b: number) => `animation-timeline: --nxprime; animation-range: ${panRange(endS, run, a / T, b / T)};`;
          // The rail is straight lines between these points, so its keyframes are exact.
          const { start, line, postsAt, viewW } = g;
          const pts = new Set([0, PAN, 1]);
          const zeroAt = (PAN * (start - viewW * 0.62)) / Math.max(1, dist);
          const fullAt = (PAN * (postsAt * line - (viewW * 0.62 - start))) / Math.max(1, dist);
          for (const f of [zeroAt, fullAt]) if (f > 0 && f < PAN) pts.add(f);
          const stops = [...pts].sort((a, b) => a - b);
          const fillKf = frames(stops.map((f) => [f, `transform: scaleX(${railAt(f).toFixed(4)});`]));
          const tipKf = frames(stops.map((f) => [f, `transform: translate3d(${(railAt(f) * g.railW).toFixed(1)}px, 0, 0);`]));
          const gap = (a: number, b: number) => -(posts[b].offsetTop - posts[a].offsetTop);
          const out = 'animation-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);'; // GSAP's power2.out
          const sel = ".nx-prime[data-pan='css']";
          sheet.set(
            [
              `@keyframes nx-prime-pan { from { transform: translate3d(0, 0, 0); } to { transform: translate3d(${-dist}px, 0, 0); } }`,
              `@keyframes nx-prime-fill { ${fillKf} }`,
              `@keyframes nx-prime-tip { ${tipKf} }`,
              // Each post falls out of the one above it; the third rides behind the second until then.
              `@keyframes nx-prime-post1 { from { transform: translate3d(0, ${gap(0, 1) + PEEK}px, 0) scale(0.94); ${out} } to { transform: translate3d(0, 0, 0) scale(1); } }`,
              `@keyframes nx-prime-post2 { 0% { transform: translate3d(0, ${gap(0, 2) + 2 * PEEK}px, 0) scale(0.88); ${out} } 50% { transform: translate3d(0, ${gap(1, 2) + PEEK}px, 0) scale(0.94); } 53.571% { transform: translate3d(0, ${gap(1, 2) + PEEK}px, 0) scale(0.94); ${out} } 100% { transform: translate3d(0, 0, 0) scale(1); } }`,
              `@keyframes nx-prime-note { from { opacity: 0; visibility: hidden; transform: translate3d(0, -10px, 0); ${out} } to { opacity: 1; visibility: visible; transform: translate3d(0, 0, 0); } }`,
              `${sel} .nx-prime-canvas { animation: nx-prime-pan linear both; ${range(0, PAN)} }`,
              `${sel} .nx-prail-fill { animation: nx-prime-fill linear both; ${range(0, T)} }`,
              `${sel} .nx-prail-tip { animation: nx-prime-tip linear both; ${range(0, T)} }`,
              `${sel} [data-node='post-1'] { animation: nx-prime-post1 linear both; ${range(PAN + 0.02, PAN + 0.16)} }`,
              `${sel} [data-node='post-2'] { animation: nx-prime-post2 linear both; ${range(PAN + 0.02, PAN + 0.3)} }`,
              `${sel} [data-note='restricted'] { animation: nx-prime-note linear both; ${range(PAN + 0.29, PAN + 0.36)} }`,
            ].join('\n'),
          );
          lit();
        };
        layout();
        let width = window.innerWidth;
        // Width changes only: Safari's bars sliding away change the height, and the hold shouldn't jump.
        const onResize = () => {
          if (window.innerWidth === width) return;
          width = window.innerWidth;
          layout();
          ScrollTrigger.refresh();
        };
        const ro = new ResizeObserver(() => layout());
        ro.observe(canvas);
        window.addEventListener('scroll', lit, { passive: true });
        window.addEventListener('resize', onResize);
        ScrollTrigger.refresh();
        return () => {
          ro.disconnect();
          window.removeEventListener('scroll', lit);
          window.removeEventListener('resize', onResize);
          sheet.remove();
          delete root.dataset.pan;
          delete view.dataset.hpan;
          delete canvas.dataset.hpan;
          delete frame.dataset.hpan;
          frame.style.top = '';
          runway.style.height = '';
          tipEl.style.removeProperty('opacity');
          canvas.style.removeProperty('--ares-h');
          items.forEach((el) => {
            delete el.dataset.lit;
            if (el.classList.contains('nx-pn')) el.dataset.live = 'true';
          });
          ScrollTrigger.refresh();
        };
      }

      let tl: gsap.core.Timeline;
      let tipOn = '';
      const paint = () => {
        const prog = tl ? tl.progress() : 0;
        const tx = Number(gsap.getProperty(canvas, 'x')) || 0;
        const { start, line, postsAt, viewW, railW, lefts } = g;
        // The reading line, 62% across the screen, in the row's own coordinates.
        const at = viewW * 0.62 - tx;
        let rail: number;
        if (prog < PAN) {
          rail = Math.max(0, Math.min(1, (at - start) / Math.max(1, postsAt * line))) * postsAt;
        } else {
          rail = postsAt + (1 - postsAt) * ((prog - PAN) / (1 - PAN));
        }
        const tip = start + rail * line;
        items.forEach((el, k) => {
          const on = String(prog >= PAN || lefts[k] <= Math.max(at, tip));
          // Only on a change: rewriting the attributes every frame restyled the row every frame.
          if (el.dataset.lit !== on) {
            el.dataset.lit = on;
            if (el.classList.contains('nx-pn')) el.dataset.live = on;
          }
        });
        fill.style.transform = `scaleX(${rail.toFixed(4)})`;
        tipEl.style.transform = `translateX(${(rail * railW).toFixed(1)}px)`;
        const o = rail > 0.001 && rail < 0.999 ? '1' : '0';
        if (o !== tipOn) tipEl.style.opacity = tipOn = o;
      };
      // Each post falls out of the one above it: the second slides down from behind the first, then
      // the third from behind the second (it rides behind the second until then).
      const gap = (a: number, b: number) => () => -(posts[b].offsetTop - posts[a].offsetTop);
      tl = gsap.timeline({
        defaults: { ease: 'none' },
        onUpdate: paint,
        scrollTrigger: {
          // The heading and the row hold together (owner, 2026-10-25: the row alone left the screen
          // mostly black), centered in the room under the nav, never under it.
          trigger: frame,
          start: () => `top ${holdTop()}px`,
          end: () => `+=${Math.round((distance() * 1.2) / PAN)}`,
          pin: frame,
          scrub: SCRUB,
          invalidateOnRefresh: true,
          onRefreshInit: () => {
            gsap.set(canvas, { x: 0 });
            gsap.set(posts, { y: 0, scale: 1 });
            fit();
          },
          onRefresh: () => {
            measure();
            paint();
          },
        },
      });
      // force3D: the row stays on its GPU layer at rest too (GSAP's auto flips it back to 2D when the
      // scroll stops, and iOS re-rasterizes the wide row each time it starts again).
      tl.fromTo(canvas, { x: 0 }, { x: () => -distance(), duration: PAN, force3D: true }, 0);
      // Before they fall, the two waiting posts sit as a deck behind the first, only their lower
      // edges showing, each a step narrower (after Superpower's stacked steps; owner, 2026-10-25).
      // Then each falls out of the one above it: the second slides down from behind the first, then
      // the third from behind the second (riding behind the second until then).
      gsap.set(posts, { transformOrigin: '50% 100%' });
      tl.fromTo(posts[1], { y: () => gap(0, 1)() + PEEK, scale: 0.94 }, { y: 0, scale: 1, duration: 0.14, ease: 'power2.out' }, PAN + 0.02);
      tl.fromTo(posts[2], { y: () => gap(0, 2)() + 2 * PEEK, scale: 0.88 }, { y: () => gap(1, 2)() + PEEK, scale: 0.94, duration: 0.14, ease: 'power2.out' }, PAN + 0.02);
      tl.to(posts[2], { y: 0, scale: 1, duration: 0.13, ease: 'power2.out' }, PAN + 0.17);
      // The escort note comes up once the posts have landed.
      const note = canvas.querySelector<HTMLElement>('[data-note="restricted"]')!;
      tl.fromTo(note, { autoAlpha: 0, y: -10 }, { autoAlpha: 1, y: 0, duration: 0.07, ease: 'power2.out' }, PAN + 0.29);
      tl.to({}, { duration: 1 - (PAN + 0.36) }, PAN + 0.36);
      paint();
      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
        gsap.set(canvas, { clearProps: 'x' });
        for (const el of [fill, tipEl]) el.style.removeProperty('transform');
        tipEl.style.removeProperty('opacity');
        gsap.set(posts, { clearProps: 'transform,opacity,visibility' });
        gsap.set(canvas.querySelector('[data-note="restricted"]'), { clearProps: 'opacity,visibility,transform' });
        delete view.dataset.hpan;
        delete canvas.dataset.hpan;
        delete frame.dataset.hpan;
        canvas.style.removeProperty('--rail');
        canvas.style.removeProperty('--tipo');
        canvas.style.removeProperty('--ares-h');
        items.forEach((el) => {
          delete el.dataset.lit;
          if (el.classList.contains('nx-pn')) el.dataset.live = 'true';
        });
      };
    });
    return () => mm.revert();
  });

  return (
    <section ref={ref} id="prime" className="nx-prime" aria-labelledby="nx-prime-title">
      <div className="nx-prime-grid nx-edge">
        {/* The frame holds the heading and the row together while the row pins on phones; elsewhere it
            steps aside (display: contents) and the copy and the canvas are the grid's own columns. */}
        <div className="nx-prime-frame">
        <div className="nx-prime-copy">
          <h2 id="nx-prime-title" className="nx-statement nx-statement-sm">
            {words('For prime contractors.')}
          </h2>
          <p className="nx-prime-line">
            <span>A woman-owned subcontractor for Front Range work.</span> Restricted-area escorts,
            access control officers, and relief, overflow, and surge coverage under your contract.
          </p>
          <Link to="/teaming" className="ds-btn ds-btn-primary nx-prime-cta">
            Teaming & subcontracting
            <Arrow />
          </Link>
          {/* Phones and tablets: a text link under the line, like the all-services link above it (owner,
              2026-10-25), so the pinned frame holds no button. */}
          <Link to="/teaming" className="ds-link nx-prime-cta-text">
            Teaming & subcontracting
            <Arrow />
          </Link>
        </div>

        <div className="nx-prime-view">
          <div ref={canvasRef} className="nx-prime-canvas">
            <svg className="nx-prime-wires" width={size.w} height={size.h} viewBox={`0 0 ${size.w || 1} ${size.h || 1}`} aria-hidden="true">
              {wires.map((w) => (
                <g key={w.id}>
                  <path className="nx-pw-base" d={w.d} />
                  <path className="nx-pw" data-w={w.id} d={w.d} />
                </g>
              ))}
            </svg>
            {/* Phones and tablets: the rail's rust fill and the bright tip riding it, moved by their own
                transforms (not a variable on the whole row), so the pan stays on the compositor. */}
            <i className="nx-prail-fill" aria-hidden="true" />
            <i className="nx-prail-tip" aria-hidden="true" />

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
              style={
                wires[0]
                  ? {
                      left: (wires[0].x1 + wires[0].x2) / 2,
                      top: (wires[0].y1 + wires[0].y2) / 2,
                    }
                  : undefined
              }
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
                </p>
                <div className="nx-pn-body">
                  <span className="nx-pn-v">{p}</span>
                </div>
              </div>
            ))}

            <p className="nx-pnote" data-note="restricted">
              <span className="nx-pnote-k">Restricted-area experience</span>
              Escort and access control on a Space Force base in Colorado
              <span className="nx-pnote-id">Subcontractor · 2025 to 2027</span>
            </p>
          </div>
        </div>
        </div>
        {/* Phones: the runway the frame holds over while the row slides (sticky, where supported). */}
        <div className="nx-prime-runway" aria-hidden="true" />
      </div>
    </section>
  );
}
