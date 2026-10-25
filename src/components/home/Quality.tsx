import { useRef } from 'react';
import { responsive } from '../../lib/responsive';
import { readIn, useScene, SCRUB } from './engine';
import './nx-quality.css';

// 03 Quality (home-flora, 2026-10-20): the photo becomes the spec sheet. The patrol vehicles sit
// inside the headline as a word-sized image, "Quality [photo] over quantity."; scrolling holds the
// screen and the photo grows out of the line to fill it, then the four company facts come in as
// callouts with rust leader lines drawn to points on the cars, and the principle rises last.
// Resolved (no motion, phones, tablets): the headline with its inline photo, the principle, the
// photo full width, and the facts as a ledger.

// The company facts (owner, 2026-10-12 and 2026-10-18).
const FACTS: { label: string; value: string; mono?: boolean }[] = [
  { label: 'Established', value: 'February 2021, Colorado Springs' },
  // The "Licensed" row was removed (owner, 2026-10-12); the proof row and city pages carry it.
  { label: 'Primary NAICS', value: '561612', mono: true },
  // Owner, 2026-10-10: true; the client is not named.
  { label: 'Longest client', value: 'On post continuously since 2022, through multiple renewals' },
  // The "Ownership" row was removed (owner, 2026-10-18); the hero's proof row carries it.
  // In its place (owner, 2026-10-18): training that covers every service, not only armed posts.
  { label: 'Post training', value: 'By our leadership, before the first shift' },
];

const PHOTO = '/images/mission-vehicle.jpg';
// The source's shape (1142 x 1378) and where it sits in a cover crop: low, on the cars.
const IW = 1142;
const IH = 1378;
const POS_Y = 0.74;

// Each fact's callout: where its chip sits on the stage (fractions of the stage) and the point
// on the photo it points at (fractions of the source image).
const CALLOUTS: { chip: [number, number]; point: [number, number] }[] = [
  { chip: [0.045, 0.44], point: [0.19, 0.792] }, // Established: the lead car's nose (raised 2026-10-25 to clear the principle)
  { chip: [0.1, 0.2], point: [0.452, 0.624] }, // Primary NAICS: the light bar
  { chip: [0.67, 0.16], point: [0.82, 0.703] }, // Longest client: the second vehicle
  { chip: [0.56, 0.42], point: [0.534, 0.742] }, // Post training: the door mark
];

export default function Quality() {
  const ref = useRef<HTMLElement>(null);

  useScene(ref, (e, root) => {
    const { gsap } = e;
    readIn(e, root.querySelector('.nx-q-title'));
    const mm = gsap.matchMedia();
    mm.add('(min-width: 1024px)', () => {
      const stage = root.querySelector<HTMLElement>('.nx-q-stage')!;
      const title = root.querySelector<HTMLElement>('.nx-q-title')!;
      const slot = root.querySelector<HTMLElement>('.nx-q-slot')!;
      const plate = root.querySelector<HTMLElement>('.nx-q-plate')!;
      const img = plate.querySelector<HTMLElement>('img')!;
      const shade = root.querySelector<HTMLElement>('.nx-q-shade')!;
      const dim = root.querySelector<HTMLElement>('.nx-q-dim')!;
      const svg = root.querySelector<SVGSVGElement>('.nx-q-leaders')!;
      const facts = Array.from(root.querySelectorAll<HTMLElement>('.nx-q-fact'));
      const lines = Array.from(svg.querySelectorAll<SVGLineElement>('line'));
      const marks = Array.from(svg.querySelectorAll<SVGGElement>('.nx-q-mark'));
      const para = root.querySelector<HTMLElement>('.nx-q-para')!;
      const cap = root.querySelector<HTMLElement>('.nx-q-cap')!;

      const from = { left: 0, top: 0, width: 0, height: 0, r: 0 };
      const measure = () => {
        const s = stage.getBoundingClientRect();
        const r = slot.getBoundingClientRect();
        from.left = r.left - s.left;
        from.top = r.top - s.top;
        from.width = r.width;
        from.height = r.height;
        from.r = Math.min(r.height * 0.22, 24);
        // The callouts, laid out for the stage at full bleed (cover crop math).
        const W = stage.clientWidth;
        const H = stage.clientHeight;
        const k = Math.max(W / IW, H / IH);
        const dw = IW * k;
        const dh = IH * k;
        const ox = (W - dw) / 2;
        const oy = (H - dh) * POS_Y;
        svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
        CALLOUTS.forEach((c, i) => {
          const chip = facts[i];
          const cx = c.chip[0] * W;
          const cy = c.chip[1] * H;
          chip.style.left = `${cx}px`;
          chip.style.top = `${cy}px`;
          const px = ox + c.point[0] * dw;
          const py = oy + c.point[1] * dh;
          const cw = chip.offsetWidth;
          const ch = chip.offsetHeight;
          // Leave the chip from the edge that faces the point.
          const sx = Math.min(Math.max(px, cx + 14), cx + cw - 14);
          const sy = py > cy + ch ? cy + ch : cy;
          const line = lines[i];
          line.setAttribute('x1', String(sx));
          line.setAttribute('y1', String(sy));
          line.setAttribute('x2', String(px));
          line.setAttribute('y2', String(py));
          marks[i].setAttribute('transform', `translate(${px} ${py})`);
        });
      };
      measure();

      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: stage,
          start: 'top top',
          end: '+=270%',
          pin: true,
          scrub: SCRUB,
          invalidateOnRefresh: true,
          onRefreshInit: measure,
        },
      });
      tl.fromTo(
        plate,
        {
          left: () => from.left,
          top: () => from.top,
          width: () => from.width,
          height: () => from.height,
          borderRadius: () => from.r,
        },
        {
          left: 0,
          top: 0,
          width: () => stage.clientWidth,
          height: () => stage.clientHeight,
          borderRadius: 0,
          ease: 'power2.inOut',
          duration: 0.42,
        },
        0,
      )
        .fromTo(img, { scale: 1.35 }, { scale: 1, ease: 'power2.inOut', duration: 0.42 }, 0)
        .to(title, { opacity: 0, scale: 0.94, filter: 'blur(6px)', duration: 0.2 }, 0.1)
        .fromTo(shade, { opacity: 0 }, { opacity: 1, duration: 0.18 }, 0.3)
        .fromTo(cap, { opacity: 0 }, { opacity: 1, duration: 0.08 }, 0.42);
      facts.forEach((f, i) => {
        const at = 0.48 + i * 0.075;
        tl.fromTo(marks[i], { scale: 0, opacity: 0, transformOrigin: '50% 50%' }, { scale: 1, opacity: 1, ease: 'back.out(3)', duration: 0.03 }, at)
          .fromTo(lines[i], { strokeDashoffset: 1000 }, { strokeDashoffset: 0, duration: 0.06 }, at + 0.01)
          .fromTo(f, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.05 }, at + 0.05);
      });
      // A beat on the full spec sheet once the last fact is in (owner, 2026-10-22: linger on the
      // cars and their callouts), then the photo and its callouts step back and the principle
      // comes forward.
      const BEAT = 0.12;
      tl.fromTo(dim, { opacity: 0 }, { opacity: 1, duration: 0.1 }, 0.8 + BEAT)
        // The four facts stay in view, legible, but step back into darker glass (owner, 2026-10-25:
        // they faded away); their leader lines dim further.
        .fromTo(facts, { '--q-dark': 0 }, { '--q-dark': 1, duration: 0.1 }, 0.8 + BEAT)
        .to(svg, { opacity: 0.35, duration: 0.1 }, 0.8 + BEAT)
        .fromTo(para, { opacity: 0, y: 56 }, { opacity: 1, y: 0, duration: 0.12 }, 0.84 + BEAT)
        .to({}, { duration: 0.08 });
    });
    // Sections set up in whatever order their code arrives; sort every trigger by its place on
    // the page so the pins above (Record, Industries, Prime) are measured before this one.
    e.ScrollTrigger.sort();
    return () => mm.revert();
  });

  return (
    <section ref={ref} id="quality" className="nx-quality" aria-labelledby="nx-quality-title">
      <div className="nx-q-stage">
        <h2 id="nx-quality-title" className="nx-statement nx-q-title">
          <span className="nx-sr">Quality over quantity.</span>
          <span className="nx-w" aria-hidden="true">
            Quality
          </span>{' '}
          <span className="nx-q-slot" aria-hidden="true">
            {/* 1.9em of the headline, which sets at the Statement's clamp(48px, 8.4vw, 150px)
                (measured 2026-10-22): 92px to 285px wide. */}
            <img {...responsive(PHOTO, '(max-width: 575px) 92px, (min-width: 1786px) 285px, 16vw')} alt="" loading="lazy" decoding="async" />
          </span>{' '}
          <span className="nx-w" aria-hidden="true">
            over
          </span>{' '}
          <span className="nx-w" aria-hidden="true">
            quantity.
          </span>
        </h2>

        <figure className="nx-q-plate">
          <img
            {...responsive(PHOTO, '100vw')}
            alt="Two marked Ares Security patrol vehicles parked outside a residential building"
            loading="lazy"
            decoding="async"
          />
          <span className="nx-q-shade" aria-hidden="true" />
          <span className="nx-q-dim" aria-hidden="true" />
          <figcaption className="nx-q-cap ds-data">Ares patrol vehicles</figcaption>
        </figure>

        <svg className="nx-q-leaders" aria-hidden="true" preserveAspectRatio="none">
          {CALLOUTS.map((_, i) => (
            <g key={i}>
              <line pathLength={1000} />
              <g className="nx-q-mark">
                <circle r="11" className="nx-q-ring" />
                <rect x="-3.5" y="-3.5" width="7" height="7" rx="1" />
              </g>
            </g>
          ))}
        </svg>

        <dl className="nx-q-facts">
          {FACTS.map((f) => (
            <div key={f.label} className="nx-q-fact">
              <dt>{f.label}</dt>
              <dd className={f.mono ? 'ds-data' : undefined}>{f.value}</dd>
            </div>
          ))}
        </dl>

        <p className="nx-q-para">
          We would rather staff fewer posts well than many posts thinly. That choice shapes everyone we
          hire, the training they get, and the standards they carry onto every site.
        </p>
      </div>
    </section>
  );
}
