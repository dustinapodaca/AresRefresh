import { useRef } from 'react';
import { Link } from 'react-router-dom';
import Arrow from '../Arrow';
import { responsive } from '../../lib/responsive';
import { useMotion, useScene } from '../home/motion';
import { useMediaQuery } from '../home/useMediaQuery';
import { Node, Statement } from './objects';

// 4.7 Careers (owner, 2026-10-19; /home-next): the door opens. The two officers (their backs, SECURITY
// across their uniforms) come into view through a vertical slit that widens from the middle to the
// full screen, like a door opening onto the post; the headline rises over the photo's lower third;
// three small Nodes from the existing line come in along the foot, with "Veterans encouraged to
// apply." as plain text and "See open roles" at the right. Desktop pins it while the door opens;
// phones open the photo the same way in the flow.

const NODES = [
  { label: 'Training', text: 'For your city license' },
  { label: 'Schedules', text: 'Posted ahead' },
  { label: 'Supervisors', text: 'Who answer' },
];

export default function CareersNext() {
  const engine = useMotion();
  const wide = useMediaQuery('(min-width: 1024px) and (min-height: 640px)', false);
  const scene = !!engine && wide;
  const ref = useRef<HTMLElement>(null);

  useScene(
    ref,
    ({ gsap, ScrollTrigger }, root) => {
      const door = root.querySelector<HTMLElement>('.hn-door')!;
      const img = door.querySelector('img')!;
      const copy = root.querySelector<HTMLElement>('.hn-careers-copy')!;
      const nodes = Array.from(root.querySelectorAll<HTMLElement>('.hn-careers-nodes > *'));
      const tl = gsap.timeline({ defaults: { ease: 'none' } });
      tl.fromTo(door, { clipPath: 'inset(0% 48% 0% 48%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.4 }, 0)
        .fromTo(img, { scale: 1.12 }, { scale: 1, duration: 1.6 }, 0)
        .fromTo(copy, { y: 60, opacity: 0.15 }, { y: 0, opacity: 1, duration: 0.8 }, 0.9)
        .fromTo(nodes, { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, stagger: 0.15 }, 1.4)
        .to({}, { duration: 0.4 }, 2);
      if (scene) {
        ScrollTrigger.create({ trigger: root.querySelector('.hn-careers-scene'), start: 'top top', end: () => `+=${window.innerHeight * 1.3}`, pin: true, scrub: true, animation: tl, anticipatePin: 1 });
        requestAnimationFrame(() => ScrollTrigger.refresh());
      } else {
        ScrollTrigger.create({ trigger: door, start: 'top 90%', end: 'bottom 70%', scrub: true, animation: tl });
      }
    },
    [scene],
  );

  return (
    <section ref={ref} id="careers" className="hn-careers" data-scene={scene ? 'on' : undefined} aria-labelledby="careers-title">
      <div className="hn-careers-scene">
        <div className="hn-door" aria-hidden="true">
          <img {...responsive('/images/about-security.jpg', '100vw')} alt="" loading="lazy" decoding="async" className="hn-grade" />
        </div>
        <div className="ds-container hn-careers-over">
          <div className="hn-careers-copy">
            <Statement id="careers-title" className="hn-careers-title" start="top 95%" end="top 60%">
              Now hiring armed and unarmed officers.
            </Statement>
          </div>
          <div className="hn-careers-foot">
            <div className="hn-careers-nodes">
              {NODES.map((n) => (
                <Node key={n.label} label={n.label} kind="text">
                  <span className="hn-careers-node">{n.text}</span>
                </Node>
              ))}
            </div>
            <p className="hn-careers-vets">Veterans encouraged to apply.</p>
            <Link to="/careers" className="ds-link hn-careers-link" data-cursor="OPEN PAGE">
              See open roles
              <Arrow />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
