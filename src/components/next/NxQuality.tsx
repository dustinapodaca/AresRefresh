import { useRef } from 'react';
import { FACTS } from '../home/Quality';
import { responsive } from '../../lib/responsive';
import { readIn, useScene } from './engine';
import './nx-quality.css';

// 03 Quality (home-flora, 2026-10-20): the photo becomes the spec sheet. The patrol vehicles sit
// inside the headline as a word-sized image, "Quality [photo] over quantity."; scrolling holds the
// screen and the photo grows out of the line to fill it, then the four company facts come in as
// callouts with rust leader lines drawn to points on the cars, and the principle rises last.
// Resolved (no motion, phones, tablets): the headline with its inline photo, the principle, the
// photo full width, and the facts as a ledger.

const PHOTO = '/images/mission-vehicle.jpg';
// The source's shape (1142 x 1378) and where it sits in a cover crop: low, on the cars.
const IW = 1142;
const IH = 1378;
const POS_Y = 0.74;

// Each fact's callout: where its chip sits on the stage (fractions of the stage) and the point
// on the photo it points at (fractions of the source image).
const CALLOUTS: { chip: [number, number]; point: [number, number] }[] = [
  { chip: [0.045, 0.5], point: [0.19, 0.792] }, // Established: the lead car's nose
  { chip: [0.1, 0.2], point: [0.452, 0.624] }, // Primary NAICS: the light bar
  { chip: [0.67, 0.16], point: [0.82, 0.703] }, // Longest client: the second vehicle
  { chip: [0.56, 0.42], point: [0.534, 0.742] }, // Post training: the door mark
];

export default function NxQuality() {
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
          end: '+=240%',
          pin: true,
          scrub: 0.7,
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
      // Last beat: the photo and its callouts step back and the principle comes forward.
      tl.fromTo(dim, { opacity: 0 }, { opacity: 1, duration: 0.1 }, 0.8)
        .to([...facts, svg], { opacity: 0.14, duration: 0.1 }, 0.8)
        .fromTo(para, { opacity: 0, y: 56 }, { opacity: 1, y: 0, duration: 0.12 }, 0.84)
        .to({}, { duration: 0.08 });
    });
    // Sections set up in whatever order their code arrives; sort every trigger by its place on
    // the page so the pins above (Record, Industries, Prime) are measured before this one.
    e.ScrollTrigger.sort();
    return () => mm.revert();
  });

  return (
    <section ref={ref} id="nx-quality" className="nx-quality" aria-labelledby="nx-quality-title">
      <div className="nx-q-stage">
        <h2 id="nx-quality-title" className="nx-statement nx-q-title">
          <span className="nx-sr">Quality over quantity.</span>
          <span className="nx-w" aria-hidden="true">
            Quality
          </span>{' '}
          <span className="nx-q-slot" aria-hidden="true">
            <img {...responsive(PHOTO, '320px')} alt="" loading="lazy" decoding="async" />
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
