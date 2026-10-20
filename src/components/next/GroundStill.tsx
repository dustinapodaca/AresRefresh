import { useRef } from 'react';
import { responsive } from '../../lib/responsive';
import { useScene } from '../home/motion';

// The ground as a still (owner, 2026-10-19; /home-next): on phones, and wherever the page's fixed
// terrain can't run (reduced motion, no WebGL, the prerender, no JavaScript), each waypoint section
// shows a frame captured from the live terrain at that section's camera (step 9: the record's dark
// pitched-down ground, the overhead view under the map, the dusk for the close), faded into the
// page top and bottom, with a light parallax while the scroll engine runs. Hidden while the fixed
// ground runs. The prime contractors' dot-grid plane is drawn in CSS ('plane').
export default function GroundStill({ name }: { name: 'record' | 'coverage' | 'contact' | 'plane' }) {
  const ref = useRef<HTMLDivElement>(null);
  useScene(ref, ({ gsap }, root) => {
    gsap.fromTo(root.firstElementChild, { yPercent: -6 }, { yPercent: 6, ease: 'none', scrollTrigger: { trigger: root, start: 'top bottom', end: 'bottom top', scrub: true } });
  });
  if (name === 'plane') {
    return (
      <div ref={ref} className="hn-still hn-still-plane" aria-hidden="true">
        <span />
      </div>
    );
  }
  const d = responsive(`/images/hero-topo/ground-${name}-desktop.webp`);
  return (
    <div ref={ref} className="hn-still" data-still={name} aria-hidden="true">
      <picture>
        <source media="(min-width: 768px)" srcSet={d.srcSet} sizes="100vw" width={d.width} height={d.height} />
        <img {...responsive(`/images/hero-topo/ground-${name}-phone.webp`, '100vw')} alt="" loading="lazy" decoding="async" />
      </picture>
    </div>
  );
}
