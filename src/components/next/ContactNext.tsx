import { useRef } from 'react';
import { Link } from 'react-router-dom';
import Arrow from '../Arrow';
import { useScene } from '../home/motion';
import { Statement } from './objects';
import GroundStill from './GroundStill';

// 4.8 The close (owner, 2026-10-19; /home-next): the line ends at the phone number. The camera drops
// back to the hero's angle at dusk (Ground.tsx), so the page ends where it began. The headline
// across the full width; under it the phone number as the largest object on the page, a tel: link,
// with "For urgent procurement timelines or active contracts." as its label bar and the email and
// base beneath; the page's line arrives and draws itself on as the number's underline, left to
// right, where the thread ends (hover lights it and an arrow slides in). Then, quieter, the quote
// line and Request a Quote. Phone taps and the quote form are measured as on the live page
// (src/lib/analytics.ts listens for tel: clicks).
const PHONE = '719-696-3966';
const TEL = 'tel:+17196963966';
const EMAIL = 'contact@aressecurity.co';

export default function ContactNext() {
  const ref = useRef<HTMLElement>(null);
  useScene(ref, ({ gsap }, root) => {
    const line = root.querySelector('.hn-phone-line');
    gsap.fromTo(line, { scaleX: 0 }, { scaleX: 1, ease: 'none', scrollTrigger: { trigger: root.querySelector('.hn-phone'), start: 'top 80%', end: 'top 45%', scrub: true } });
    gsap.fromTo(root.querySelectorAll('.hn-close-row > *'), { y: 24, opacity: 0.2 }, { y: 0, opacity: 1, ease: 'none', stagger: 0.15, scrollTrigger: { trigger: root.querySelector('.hn-close-row'), start: 'top 92%', end: 'top 65%', scrub: true } });
  });
  return (
    <section ref={ref} id="contact" className="hn-contact" aria-labelledby="contact-title">
      <GroundStill name="contact" />
      <div className="ds-container">
        <Statement id="contact-title" className="hn-contact-title">
          Request a quote, or call us.
        </Statement>

        <div className="hn-phone-block">
          <span className="hn-node-bar hn-phone-bar">
            <span className="hn-node-dot" aria-hidden="true" />
            <span className="hn-phone-note">For urgent procurement timelines or active contracts.</span>
          </span>
          <a href={TEL} className="hn-phone" data-cursor="CALL">
            <span>{PHONE}</span>
            <Arrow />
            {/* Where the page's line ends: it draws on as the number's underline. */}
            <i className="hn-phone-line" data-thread="end" aria-hidden="true" />
          </a>
          <p className="ds-data hn-phone-meta">
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
            <span aria-hidden="true">·</span>
            <span>Colorado Springs, CO</span>
          </p>
        </div>

        <div className="hn-close-row">
          <p className="hn-close-line">
            Send a site, a shift pattern, and a deadline. We walk your site before anything is signed, then send a scoped proposal.
          </p>
          <Link to="/contact" className="ds-btn ds-btn-primary">
            Request a Quote
            <Arrow />
          </Link>
        </div>
      </div>
    </section>
  );
}
