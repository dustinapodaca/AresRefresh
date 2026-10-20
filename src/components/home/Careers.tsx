import { Link } from 'react-router-dom';
import { useRef } from 'react';
import Arrow from '../Arrow';
import { useScene } from './motion';
import { RevealHeading, RevealLead } from './Reveal';

export default function Careers() {
  // The headline reads itself in (Reveal.tsx); as its line lands, the "See open roles" arrow nudges
  // in once (owner, 2026-10-19).
  const ref = useRef<HTMLElement>(null);
  useScene(ref, ({ gsap }, root) => {
    gsap.fromTo(
      root.querySelector('.ds-careers-copy .ds-link .ds-arrow'),
      { x: -10, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.6, ease: 'power3.out', scrollTrigger: { trigger: root.querySelector('.ds-careers-copy .ds-link'), start: 'top 82%', toggleActions: 'play none none none' } },
    );
  });
  return (
    <section ref={ref} id="careers" className="ds-careers" aria-labelledby="careers-title">
      <div className="ds-careers-grid">
        <div className="ds-careers-copy">
          {/* Copy audit (2026-10-10): was "Join the people who staff them." */}
          <RevealHeading id="careers-title" className="ds-display-lg">
            Now hiring armed and unarmed officers.
          </RevealHeading>
          <RevealLead className="ds-body">
            {'Training for your city license, schedules posted ahead, and a supervisor who answers. Veterans encouraged to apply.'}
          </RevealLead>
          <Link to="/careers" className="ds-link">
            See open roles
            <Arrow />
          </Link>
        </div>
      </div>
    </section>
  );
}
