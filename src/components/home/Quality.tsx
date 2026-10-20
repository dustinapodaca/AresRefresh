import { useRef } from 'react';
import { responsive } from '../../lib/responsive';
import { useScene } from './motion';
import { RevealHeading, RevealLead } from './Reveal';

// 02 Quality (owner, 2026-10-06: moved whole from About, photo and all, and set for Home):
// the principle as a large statement with its paragraph, then the patrol vehicles as a wide
// plate beside the company facts.
export const FACTS: { label: string; value: string; mono?: boolean }[] = [
  { label: 'Established', value: 'February 2021, Colorado Springs' },
  // The "Licensed" row was removed (owner, 2026-10-12); the proof row and city pages carry it.
  { label: 'Primary NAICS', value: '561612', mono: true },
  // Owner, 2026-10-10: true; the client is not named.
  { label: 'Longest client', value: 'On post continuously since 2022, through multiple renewals' },
  // The "Ownership" row was removed (owner, 2026-10-18); the hero's proof row carries it.
  // In its place (owner, 2026-10-18): training that covers every service, not only armed posts.
  { label: 'Post training', value: 'By our leadership, before the first shift' },
];

// The patrol vehicles across the whole column, the facts in a row beneath (design review item 28;
// wide chosen, owner 2026-10-16). The side, portrait, and glass forms (/?vehicles=) were removed at
// launch (owner, 2026-10-19; tag options-archive-2026-10-19, docs/options-archive.md).
// One scroll (owner, 2026-10-19): the headline at display-xl with its lead beneath (desktop), so this
// head breaks the pattern of the others; the plate opens from an inset to the full column as it
// rises, the photo moving a little slower than its frame and settling from 1.08; each fact's
// hairline draws, then its label and value come up.
export default function Quality() {
  const ref = useRef<HTMLElement>(null);
  useScene(ref, ({ gsap }, root) => {
    const frame = root.querySelector('.ds-quality-frame');
    const img = root.querySelector('.ds-quality-frame img');
    const range = { trigger: frame, start: 'top 90%', end: 'top 40%', scrub: true };
    gsap.fromTo(frame, { clipPath: 'inset(6% 10% round 4px)' }, { clipPath: 'inset(0% 0% round 4px)', ease: 'none', scrollTrigger: range });
    gsap.fromTo(img, { scale: 1.08, yPercent: -4 }, { scale: 1, yPercent: 0, ease: 'none', scrollTrigger: range });
    const facts = Array.from(root.querySelectorAll<HTMLElement>('.ds-quality-facts > div'));
    const tl = gsap.timeline({ scrollTrigger: { trigger: root.querySelector('.ds-quality-facts'), start: 'top 88%', toggleActions: 'play none none none' } });
    facts.forEach((f, i) => {
      // The hairline is the row's ::before, drawn to the length in --rule (a <dl> row holds only its
      // term and value).
      tl.fromTo(f, { '--rule': 0 }, { '--rule': 1, duration: 0.6, ease: 'power2.out' }, i * 0.07);
      tl.fromTo(f.querySelectorAll('dt, dd'), { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', stagger: 0.07 }, 0.3 + i * 0.07);
    });
  });
  return (
    <section ref={ref} id="quality" className="ds-quality" aria-labelledby="quality-title">
      <div className="ds-sec-head">
        <RevealHeading id="quality-title" className="ds-display-xl">
          Quality over quantity.
        </RevealHeading>
        <RevealLead className="ds-lead">
          {'We would rather staff fewer posts well than many posts thinly. That choice shapes everyone we hire, the training they get, and the standards they carry onto every site.'}
        </RevealLead>
      </div>

      <div className="ds-quality-body" data-form="wide">
        <figure className="ds-plate ds-quality-photo">
          <span className="ds-quality-frame">
            <img
              {...responsive('/images/mission-vehicle.jpg', '(min-width: 1024px) 58vw, 100vw')}
              alt="Two marked Ares Security patrol vehicles parked outside a residential building"
              loading="lazy"
              decoding="async"
            />
          </span>
          <figcaption className="ds-caption">Ares patrol vehicles</figcaption>
        </figure>
        <dl className="ds-quality-facts">
          {FACTS.map((f) => (
            <div key={f.label}>
              <dt>{f.label}</dt>
              <dd className={f.mono ? 'ds-data' : undefined}>{f.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
