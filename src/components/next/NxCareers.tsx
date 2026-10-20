import { useRef } from 'react';
import { Link } from 'react-router-dom';
import Arrow from '../Arrow';
import { responsive } from '../../lib/responsive';
import { useScene, words } from './engine';
import './nx-careers.css';

// 05 Careers (home-flora, 2026-10-20): the door opens. Two Ares officers seen from behind, the
// photo opening from a narrow vertical slit to the full screen as you scroll (two rust edges
// riding out with it like a door's), then the headline reads in over its lower third and three
// small nodes name what the job offers. Resolved: the photo full width with the copy over its foot
// (stacked under it on phones).

const PHOTO = '/images/about-security.jpg';
const OFFERS = [
  { k: 'Training', v: 'For your city license' },
  { k: 'Schedules', v: 'Posted ahead' },
  { k: 'Supervisors', v: 'Who answer' },
];

export default function NxCareers() {
  const ref = useRef<HTMLElement>(null);

  useScene(ref, (e, root) => {
    const { gsap } = e;
    const mm = gsap.matchMedia();
    mm.add('(min-width: 768px)', () => {
      const stage = root.querySelector<HTMLElement>('.nx-cr-stage')!;
      const photo = root.querySelector<HTMLElement>('.nx-cr-photo')!;
      const img = photo.querySelector('img')!;
      const edges = root.querySelectorAll<HTMLElement>('.nx-cr-edge');
      const ws = root.querySelectorAll('.nx-cr-title .nx-w');
      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: { trigger: stage, start: 'top top', end: '+=150%', pin: true, scrub: 0.6 },
      });
      tl.fromTo(photo, { clipPath: 'inset(0% 48.5% 0% 48.5%)' }, { clipPath: 'inset(0% 0% 0% 0%)', ease: 'power2.inOut', duration: 0.5 }, 0)
        .fromTo(img, { scale: 1.35 }, { scale: 1, ease: 'power2.inOut', duration: 0.5 }, 0)
        .fromTo(edges[0], { left: '48.5%' }, { left: '0%', ease: 'power2.inOut', duration: 0.5 }, 0)
        .fromTo(edges[1], { left: '51.5%' }, { left: '100%', ease: 'power2.inOut', duration: 0.5 }, 0)
        .to(edges, { opacity: 0, duration: 0.08 }, 0.44)
        .fromTo(root.querySelector('.nx-cr-shade'), { opacity: 0 }, { opacity: 1, duration: 0.2 }, 0.36)
        .fromTo(ws, { opacity: 0, yPercent: 60 }, { opacity: 1, yPercent: 0, stagger: 0.035, duration: 0.12 }, 0.48)
        .fromTo(root.querySelectorAll('.nx-cr-rise'), { opacity: 0, y: 28 }, { opacity: 1, y: 0, stagger: 0.04, duration: 0.1 }, 0.66)
        .to({}, { duration: 0.12 });
    });
    e.ScrollTrigger.sort();
    return () => mm.revert();
  });

  return (
    <section ref={ref} id="nx-careers" className="nx-careers" aria-labelledby="nx-careers-title">
      <div className="nx-cr-stage">
        <div className="nx-cr-photo">
          <img {...responsive(PHOTO, '100vw')} alt="" loading="lazy" decoding="async" />
        </div>
        <span className="nx-cr-edge" aria-hidden="true" />
        <span className="nx-cr-edge" aria-hidden="true" />
        <span className="nx-cr-shade" aria-hidden="true" />

        <div className="nx-cr-copy">
          <h2 id="nx-careers-title" className="nx-statement nx-cr-title">
            {words('Now hiring armed and unarmed officers.')}
          </h2>
          <div className="nx-cr-side nx-cr-rise">
            <p>
              Training for your city license, schedules posted ahead, and a supervisor who answers.
              Veterans encouraged to apply.
            </p>
            <Link to="/careers" className="ds-link nx-cr-link">
              See open roles
              <Arrow />
            </Link>
          </div>
          <ul className="nx-cr-nodes" aria-label="What the job offers">
            {OFFERS.map((o) => (
              <li key={o.k} className="nx-node nx-cr-rise" data-live="true">
                <p className="nx-node-bar">
                  <span>{o.k}</span>
                  <span>{o.v}</span>
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
