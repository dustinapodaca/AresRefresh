import { useRef } from 'react';
import { FACTS } from '../home/Quality';
import { responsive } from '../../lib/responsive';
import { useMotion, useScene } from '../home/motion';
import { useMediaQuery } from '../home/useMediaQuery';
import { Chip } from './objects';

// 4.5 Quality over quantity (owner, 2026-10-19; /home-next): the photo becomes the spec sheet. The
// headline holds the patrol vehicles inline, a word-sized photo between "Quality" and "over
// quantity." (Framer-style). Desktop pins it: the inline photo grows out of the line to the whole
// screen while the words part around it and fade back to 0.3 behind it; then the four facts come
// up on the photo one at a time as ledger chips, each with a rust leader line (the page's line)
// drawn to a point on the photo: the light bar, the door decal, a wheel, the second vehicle; then
// the paragraph rises at the bottom left, and the photo eases back and darkens as the next section
// nears. Phones and the static page: the headline with its inline photo, the photo opening to the
// full width beneath it, the facts as a stacked ledger, each with a short rust tick.

const PHOTO = '/images/mission-vehicle.jpg';
const IW = 1142;
const IH = 1378;
// The photo's framing when it fills the screen.
const POS = { x: 0.5, y: 0.74 };
// Where each fact points, in the photo's own fractions, and where its chip sits (% of the screen).
const CALLOUTS = [
  { fact: 0, target: [0.47, 0.625], chip: [6, 20] },
  { fact: 1, target: [0.43, 0.81], chip: [6, 66] },
  { fact: 2, target: [0.8, 0.68], chip: [72, 18] },
  { fact: 3, target: [0.56, 0.735], chip: [72, 64] },
];

export default function QualityNext() {
  const engine = useMotion();
  const wide = useMediaQuery('(min-width: 1024px) and (min-height: 640px)', false);
  const scene = !!engine && wide;
  const ref = useRef<HTMLElement>(null);

  useScene(
    ref,
    ({ gsap, ScrollTrigger }, root) => {
      if (!scene) {
        const ph = root.querySelector('.hn-q-wide');
        if (ph) gsap.fromTo(ph, { clipPath: 'inset(0% 18% round 4px)' }, { clipPath: 'inset(0% 0% round 4px)', ease: 'none', scrollTrigger: { trigger: ph, start: 'top 90%', end: 'top 35%', scrub: true } });
        root.querySelectorAll<HTMLElement>('.hn-q-ledger > div').forEach((row) => {
          gsap.fromTo(row, { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.6, ease: 'power3.out', scrollTrigger: { trigger: row, start: 'top 88%', toggleActions: 'play none none none' } });
        });
        return;
      }
      const sceneEl = root.querySelector<HTMLElement>('.hn-q-scene')!;
      const slot = root.querySelector<HTMLElement>('.hn-q-slot')!;
      const photo = root.querySelector<HTMLElement>('.hn-q-photo')!;
      const img = photo.querySelector('img')!;
      const shade = root.querySelector<HTMLElement>('.hn-q-shade')!;
      const left = root.querySelector<HTMLElement>('.hn-q-left')!;
      const right = root.querySelector<HTMLElement>('.hn-q-right')!;
      const chips = Array.from(root.querySelectorAll<HTMLElement>('.hn-q-chip'));
      const lines = Array.from(root.querySelectorAll<SVGLineElement>('.hn-q-lead'));
      const ends = Array.from(root.querySelectorAll<SVGRectElement>('.hn-q-end'));
      const para = root.querySelector<HTMLElement>('.hn-q-para')!;
      const svg = root.querySelector<SVGSVGElement>('.hn-q-svg')!;

      // The inline slot's box, as insets from the scene's edges, so the full-screen photo can start
      // clipped to exactly that box.
      let inset = '0px 0px 0px 0px';
      // In the slot the photo shows the vehicles whole: scaled down about their middle and moved so
      // they sit in the slot, then grown and moved back to the full-screen framing.
      let start = { x: 0, y: 0, scale: 1, origin: '50% 50%' };
      const measure = () => {
        const s = sceneEl.getBoundingClientRect();
        const r = slot.getBoundingClientRect();
        inset = `${r.top - s.top}px ${s.right - r.right}px ${s.bottom - r.bottom}px ${r.left - s.left}px`;
        // The leader lines: from each chip's near edge to its point on the photo (cover framing).
        const W = s.width;
        const H = s.height;
        const k = Math.max(W / IW, H / IH);
        const dw = IW * k;
        const dh = IH * k;
        const ox = (W - dw) * POS.x;
        const oy = (H - dh) * POS.y;
        svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
        // The vehicles span about 0.13 to 0.9 of the photo's width, centered near (0.56, 0.72).
        const px = ox + 0.56 * dw;
        const py = oy + 0.72 * dh;
        const sx = r.left - s.left + r.width / 2;
        const sy = r.top - s.top + r.height / 2;
        start = { x: sx - px, y: sy - py, scale: r.width / (0.8 * dw), origin: `${px}px ${py}px` };
        CALLOUTS.forEach((c, i) => {
          const tx = ox + c.target[0] * dw;
          const ty = oy + c.target[1] * dh;
          const chip = chips[i];
          const cr = chip.getBoundingClientRect();
          const fromRight = c.chip[0] < 50;
          const cx = (fromRight ? cr.right : cr.left) - s.left;
          const cy = cr.top - s.top + cr.height / 2;
          lines[i].setAttribute('x1', String(cx));
          lines[i].setAttribute('y1', String(cy));
          lines[i].setAttribute('x2', String(tx));
          lines[i].setAttribute('y2', String(ty));
          ends[i].setAttribute('x', String(tx - 2.5));
          ends[i].setAttribute('y', String(ty - 2.5));
        });
      };
      measure();

      gsap.set(lines, { strokeDasharray: 1, strokeDashoffset: 1 });
      gsap.set([...chips, ...ends], { autoAlpha: 0 });
      gsap.set(para, { opacity: 0 });
      const tl = gsap.timeline({ defaults: { ease: 'none' } });
      // The photo grows out of the line to the whole screen; the words part around it.
      tl.fromTo(photo, { clipPath: () => `inset(${inset} round 6px)` }, { clipPath: 'inset(0px 0px 0px 0px round 0px)', duration: 2 }, 0)
        .fromTo(img, { x: () => start.x, y: () => start.y, scale: () => start.scale, transformOrigin: () => start.origin }, { x: 0, y: 0, scale: 1, duration: 2 }, 0)
        .to(slot, { opacity: 0, duration: 0.2 }, 0)
        .fromTo(root.querySelector('.hn-q-cap'), { opacity: 0 }, { opacity: 1, duration: 0.4 }, 1.8)
        .to(left, { x: () => -window.innerWidth * 0.18, duration: 1.4 }, 0)
        .to(right, { x: () => window.innerWidth * 0.18, duration: 1.4 }, 0)
        .to([left, right], { opacity: 0.3, duration: 1 }, 1)
        .to(shade, { opacity: 1, duration: 1 }, 1.4);
      // The facts, one at a time, each with its leader line.
      chips.forEach((chip, i) => {
        const at = 2.2 + i * 0.7;
        tl.to(chip, { autoAlpha: 1, duration: 0.3 }, at).to(lines[i], { strokeDashoffset: 0, duration: 0.5 }, at + 0.15).to(ends[i], { autoAlpha: 1, duration: 0.1 }, at + 0.6);
      });
      tl.to(para, { opacity: 1, duration: 0.6 }, 5.2).fromTo(para, { y: 40 }, { y: 0, duration: 0.8 }, 5.2);
      // The photo eases back and darkens as the next section nears.
      tl.to(photo, { scale: 0.94, duration: 1 }, 6.4).to(img, { filter: 'brightness(0.5)', duration: 1 }, 6.4);

      ScrollTrigger.create({
        trigger: sceneEl,
        start: 'top top',
        end: () => `+=${window.innerHeight * 3}`,
        pin: true,
        scrub: true,
        animation: tl,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onRefreshInit: () => {
          // Measure at rest: undo the scrubbed motion's offsets first.
          gsap.set([left, right], { x: 0 });
        },
        onRefresh: measure,
      });
      requestAnimationFrame(() => ScrollTrigger.refresh());
    },
    [scene],
  );

  return (
    <section ref={ref} id="quality" className="hn-quality" data-scene={scene ? 'on' : undefined} aria-labelledby="quality-title">
      <div className="hn-q-scene">
        {scene && (
          <div className="hn-q-photo" aria-hidden="true">
            <img {...responsive(PHOTO, '100vw')} alt="" loading="lazy" decoding="async" className="hn-grade" style={{ objectPosition: `${POS.x * 100}% ${POS.y * 100}%` }} />
            <i className="hn-q-shade" />
          </div>
        )}
        <div className="ds-container hn-q-head">
          <h2 id="quality-title" className="hn-statement hn-q-title" aria-label="Quality over quantity.">
            <span className="hn-q-left" aria-hidden="true">Quality</span>{' '}
            {/* The patrol vehicles as a word in the line. */}
            <span className="hn-q-slot" aria-hidden="true">
              {!scene && <img {...responsive(PHOTO, '240px')} alt="" loading="lazy" decoding="async" className="hn-grade" style={{ objectPosition: '50% 74%' }} />}
            </span>{' '}
            <span className="hn-q-right" aria-hidden="true">over quantity.</span>
          </h2>
        </div>

        {scene && (
          <>
            <svg className="hn-q-svg" aria-hidden="true">
              {CALLOUTS.map((c) => (
                <line key={c.fact} className="hn-q-lead" pathLength={1} />
              ))}
              {CALLOUTS.map((c) => (
                <rect key={`e${c.fact}`} className="hn-q-end" width="5" height="5" rx="1" />
              ))}
            </svg>
            {/* The chips repeat the facts the list below gives readers. */}
            <div aria-hidden="true">
              {CALLOUTS.map((c) => (
                <Chip key={c.fact} className="hn-q-chip" label={FACTS[c.fact].label} value={FACTS[c.fact].value} mono={FACTS[c.fact].mono} style={{ left: `${c.chip[0]}%`, top: `${c.chip[1]}%` }} />
              ))}
            </div>
            <p className="hn-q-para">
              We would rather staff fewer posts well than many posts thinly. That choice shapes everyone we hire, the training they get, and the standards they carry onto every site.
            </p>
            <span className="ds-data hn-q-cap">Ares patrol vehicles</span>
          </>
        )}

        {!scene && (
          <div className="ds-container hn-q-static">
            <p className="ds-lead hn-q-lead-p">
              We would rather staff fewer posts well than many posts thinly. That choice shapes everyone we hire, the training they get, and the standards they carry onto every site.
            </p>
            <figure className="hn-q-figure">
              <span className="hn-q-wide">
                <img {...responsive(PHOTO, '100vw')} alt="Two marked Ares Security patrol vehicles parked outside a residential building" loading="lazy" decoding="async" className="hn-grade" />
              </span>
              <figcaption className="ds-data">Ares patrol vehicles</figcaption>
            </figure>
            <dl className="hn-q-ledger">
              {FACTS.map((f) => (
                <div key={f.label}>
                  <dt>{f.label}</dt>
                  <dd className={f.mono ? 'ds-data' : undefined}>{f.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        )}
        {/* Readers get the facts as a list in the pinned form too. */}
        {scene && (
          <dl className="ds-sr">
            {FACTS.map((f) => (
              <div key={f.label}>
                <dt>{f.label}</dt>
                <dd>{f.value}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </section>
  );
}
