import { useRef, type CSSProperties } from 'react';
import Arrow from '../Arrow';
import { VALUES } from '../home/Record';
import { useMotion, useScene } from '../home/motion';
import { useMediaQuery } from '../home/useMediaQuery';
import { Statement } from './objects';
import GroundStill from './GroundStill';

// 4.2 Proof you can see (owner, 2026-10-19; /home-next). Not cards: three full-screen proof moments,
// each its real number beside a diagram drawn only from that number. Reliability "<1%": a 10 by 10
// grid of squares filling ink (the ratio, no square marked as missed). Client rating "43/45": 45
// squares in three rows of 15, 43 in ink and 2 outlined. Personnel "4.8/5": five bars, four full and
// the fifth at 80%. Desktop pins the section: the headline opens it and shrinks to a label at the
// top left as the first figure arrives; the one grid of squares reflows from each diagram into the
// next; the digits roll from nearby values, never from 0; the page's line is the axis on the left,
// a rust tick marking the moment. Phones: three moments stacked, each diagram building once.
// Readers get each moment as a figure with its real number, caption, and line (diagrams hidden).

type Moment = {
  label: string;
  meta: string;
  figure: string;
  roll: string[];
  caption: string;
  href?: string;
  line: string;
  kind: 'grid' | 'rows' | 'bars';
};

const MOMENTS: Moment[] = [
  { label: VALUES[0].name, meta: 'Since 2021', figure: VALUES[0].figure, roll: ['<4%', '<3%', '<2%'], caption: 'Fewer than 1 in 100 shifts missed · since 2021', line: VALUES[0].line, kind: 'grid' },
  { label: VALUES[1].name, meta: '43 of 45', figure: VALUES[1].figure, roll: ['38/45', '40/45', '42/45'], caption: '5 past performance evaluations · 45 criteria · none below Satisfactory', line: VALUES[1].line, kind: 'rows' },
  { label: VALUES[2].name, meta: 'Indeed', figure: VALUES[2].figure, roll: ['4.5/5', '4.6/5', '4.7/5'], caption: 'Indeed · employee rating', href: VALUES[2].href, line: VALUES[2].line, kind: 'bars' },
];

// The diagram's geometry, in px (desktop; phones scale the whole diagram down).
const S = 21; // square
const G = 6; // gap
const STEP = S + G;
const posGrid = (i: number) => [(i % 10) * STEP, Math.floor(i / 10) * STEP];
const posRows = (i: number) => [(i % 15) * STEP, Math.floor(i / 15) * STEP + STEP * 3.5];
const BAR_W = 15 * STEP - G;
const barY = (b: number) => b * (STEP * 1.6) + STEP * 1.2;

function Odometer({ value, roll }: { value: string; roll: string[] }) {
  const engine = useMotion();
  if (!engine) return <span>{value}</span>;
  const frames = [...roll, value];
  return (
    <>
      <span className="ds-sr">{value}</span>
      <span className="hn-odo" aria-hidden="true">
        {[...value].map((ch, i) => {
          const reel = frames.map((f) => f[i]);
          if (reel.every((c) => c === ch)) return <span key={i}>{ch}</span>;
          return (
            <span key={i} className="hn-odo-col">
              <span className="hn-odo-reel" data-n={reel.length}>
                {reel.map((g, j) => (
                  <span key={j}>{g}</span>
                ))}
              </span>
            </span>
          );
        })}
      </span>
    </>
  );
}

/** A moment's own diagram, drawn in its final state (phones, reduced motion, the prerender). */
function StaticDiagram({ kind }: { kind: Moment['kind'] }) {
  if (kind === 'bars')
    return (
      <span className="hn-dia hn-dia-bars" aria-hidden="true">
        {[1, 1, 1, 1, 0.8].map((f, b) => (
          <span key={b} className="hn-bar">
            <span style={{ transform: `scaleX(${f})` }} />
          </span>
        ))}
      </span>
    );
  const n = kind === 'grid' ? 100 : 45;
  return (
    <span className={`hn-dia hn-dia-${kind}`} aria-hidden="true">
      {Array.from({ length: n }).map((_, i) => (
        <i key={i} data-on={kind === 'grid' || i < 43 ? 'true' : undefined} />
      ))}
    </span>
  );
}

export default function RecordNext() {
  const engine = useMotion();
  const wide = useMediaQuery('(min-width: 1024px) and (min-height: 640px)', false);
  const scene = !!engine && wide;
  const ref = useRef<HTMLElement>(null);

  useScene(
    ref,
    ({ gsap, ScrollTrigger }, root) => {
      if (!scene) {
        // Phones: each diagram builds once as its moment comes in.
        root.querySelectorAll<HTMLElement>('.hn-moment').forEach((m) => {
          const cells = m.querySelectorAll('.hn-dia i[data-on]');
          const bars = m.querySelectorAll('.hn-bar > span');
          const reels = m.querySelectorAll<HTMLElement>('.hn-odo-reel');
          const tl = gsap.timeline({ scrollTrigger: { trigger: m, start: 'top 75%', toggleActions: 'play none none none' } });
          if (cells.length) tl.fromTo(cells, { backgroundColor: 'rgba(238,240,242,0)' }, { backgroundColor: 'rgba(238,240,242,1)', duration: 0.02, stagger: 0.012 }, 0);
          if (bars.length) tl.fromTo(bars, { scaleX: 0 }, { scaleX: (i: number) => (i === 4 ? 0.8 : 1), duration: 0.6, ease: 'power3.out', stagger: 0.12 }, 0);
          reels.forEach((r, i) => {
            const n = Number(r.dataset.n);
            tl.fromTo(r, { yPercent: 0 }, { yPercent: (-(n - 1) / n) * 100, duration: 0.7, ease: 'power3.out' }, 0.1 + i * 0.06);
          });
        });
        return;
      }

      const sceneEl = root.querySelector<HTMLElement>('.hn-record-scene')!;
      const title = root.querySelector<HTMLElement>('.hn-record-title')!;
      const lead = root.querySelector<HTMLElement>('.hn-record-lead')!;
      const moments = Array.from(root.querySelectorAll<HTMLElement>('.hn-moment'));
      const squares = Array.from(root.querySelectorAll<HTMLElement>('.hn-sq'));
      const bars = Array.from(root.querySelectorAll<HTMLElement>('.hn-mbar'));
      const tick = root.querySelector<HTMLElement>('.hn-record-tick')!;
      const reels = (m: HTMLElement) => Array.from(m.querySelectorAll<HTMLElement>('.hn-odo-reel'));

      const INK = 'rgba(238,240,242,1)';
      const CLEAR = 'rgba(238,240,242,0)';
      gsap.set(squares, { x: (i: number) => posGrid(i)[0], y: (i: number) => posGrid(i)[1], backgroundColor: CLEAR, opacity: 1, scale: 1 });
      gsap.set(bars, { opacity: 0 });
      gsap.set(bars.map((b) => b.firstElementChild), { scaleX: 0 });
      gsap.set(moments, { autoAlpha: 0, y: 24 });

      // Timeline units: the opening (1), each moment (3), each reflow (1).
      const tl = gsap.timeline({ defaults: { ease: 'none' } });
      tl.to(title, { scale: 0.14, duration: 1 }, 0)
        .to(lead, { autoAlpha: 0, y: -16, duration: 0.6 }, 0)
        .to(moments[0], { autoAlpha: 1, y: 0, duration: 0.6 }, 0.6)
        .set(tick, { top: '0%' }, 0.6);
      // 1. Reliability: the grid fills, square by square; the digit rolls.
      tl.to(squares, { backgroundColor: INK, duration: 0.05, stagger: 0.02 }, 1);
      reels(moments[0]).forEach((r) => {
        const n = Number(r.dataset.n);
        tl.fromTo(r, { yPercent: 0 }, { yPercent: (-(n - 1) / n) * 100, duration: 1.2, ease: `steps(${n - 1})` }, 1);
      });
      // Reflow into three rows of 15; 55 squares leave.
      tl.to(moments[0], { autoAlpha: 0, y: -24, duration: 0.5 }, 3.4)
        .to(squares.slice(45), { opacity: 0, scale: 0.4, duration: 0.6, stagger: 0.004 }, 3.4)
        .to(squares.slice(0, 45), { x: (i: number) => posRows(i)[0], y: (i: number) => posRows(i)[1], backgroundColor: CLEAR, duration: 0.9, stagger: 0.006 }, 3.5)
        .to(moments[1], { autoAlpha: 1, y: 0, duration: 0.5 }, 3.9)
        .to(tick, { top: '33.33%', duration: 0.6 }, 3.6);
      // 2. Client rating: the 45 light one by one as the digits roll; 43 settle in ink, 2 stay open.
      tl.to(squares.slice(0, 43), { backgroundColor: INK, duration: 0.05, stagger: 0.03 }, 4.6);
      reels(moments[1]).forEach((r, i) => {
        const n = Number(r.dataset.n);
        tl.fromTo(r, { yPercent: 0 }, { yPercent: (-(n - 1) / n) * 100, duration: 1.2, ease: `steps(${n - 1})` }, 4.6 + i * 0.1);
      });
      // Collapse into five bars.
      tl.to(moments[1], { autoAlpha: 0, y: -24, duration: 0.5 }, 7.2)
        .to(squares.slice(0, 45), { x: (i: number) => (i % 9) * (BAR_W / 9), y: (i: number) => barY(Math.floor(i / 9)), scale: 0.5, opacity: 0, duration: 0.9, stagger: 0.004 }, 7.2)
        .to(bars, { opacity: 1, duration: 0.4 }, 7.6)
        .to(moments[2], { autoAlpha: 1, y: 0, duration: 0.5 }, 7.7)
        .to(tick, { top: '66.66%', duration: 0.6 }, 7.4);
      // 3. Personnel: four bars fill, the fifth to 80%.
      tl.to(bars.map((b) => b.firstElementChild), { scaleX: (i: number) => (i === 4 ? 0.8 : 1), duration: 0.8, stagger: 0.25 }, 8.2);
      reels(moments[2]).forEach((r) => {
        const n = Number(r.dataset.n);
        tl.fromTo(r, { yPercent: 0 }, { yPercent: (-(n - 1) / n) * 100, duration: 1.2, ease: `steps(${n - 1})` }, 8.2);
      });
      tl.to({}, { duration: 1 }, 10);

      ScrollTrigger.create({
        trigger: sceneEl,
        start: 'top top',
        end: () => `+=${window.innerHeight * 2.9}`,
        pin: true,
        scrub: true,
        animation: tl,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      });
      requestAnimationFrame(() => ScrollTrigger.refresh());
    },
    [scene],
  );

  return (
    <section ref={ref} id="record" className="hn-record" data-scene={scene ? 'on' : undefined} aria-labelledby="record-title">
      <GroundStill name="record" />
      <div className="hn-record-wrap">
        <div className="hn-record-scene">
          <div className="ds-container hn-record-inner">
            <div className="hn-record-head">
              <Statement id="record-title" className="hn-record-title">
                The record so far.
              </Statement>
              <p className="ds-lead hn-record-lead">Federal agencies and commercial clients hold us to the same record.</p>
            </div>

            <div className="hn-record-stage">
              {/* The page's line runs here as the axis; the tick marks the moment. */}
              <span className="hn-record-axis" data-thread="x" aria-hidden="true">
                <span className="hn-record-tick" />
              </span>
              <div className="hn-moments">
                {MOMENTS.map((m) => (
                  <figure key={m.label} className="hn-moment">
                    <span className="hn-node-bar">
                      <span className="hn-node-dot" aria-hidden="true" />
                      <span className="hn-node-label">{m.label}</span>
                      <span className="hn-node-meta">{m.meta}</span>
                    </span>
                    <div className="hn-moment-row">
                      <p className="ds-data hn-figure">
                        <Odometer value={m.figure} roll={m.roll} />
                      </p>
                      <StaticDiagram kind={m.kind} />
                    </div>
                    <figcaption>
                      {m.href ? (
                        <a href={m.href} target="_blank" rel="noopener noreferrer" className="ds-data hn-moment-cap" data-cursor="OPEN INDEED">
                          {m.caption}
                          <Arrow external size={12} />
                        </a>
                      ) : (
                        <span className="ds-data hn-moment-cap">{m.caption}</span>
                      )}
                      <span className="hn-moment-line">{m.line}</span>
                    </figcaption>
                  </figure>
                ))}
              </div>
              {/* The one diagram that reflows between the three (desktop, while pinned). */}
              {scene && (
                <div className="hn-mdia" aria-hidden="true" style={{ '--sq': `${S}px` } as CSSProperties}>
                  {Array.from({ length: 100 }).map((_, i) => (
                    <i key={i} className="hn-sq" />
                  ))}
                  {[0, 1, 2, 3, 4].map((b) => (
                    <span key={b} className="hn-mbar" style={{ top: barY(b), width: BAR_W }}>
                      <span />
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
