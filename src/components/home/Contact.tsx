import { useRef } from 'react';
import { Link } from 'react-router-dom';
import Arrow from '../Arrow';
import { RevealHeading } from './Reveal';
import { useScene } from './motion';

// The close, open (owner, 2026-10-19; REVERSES the two glass cards, `routes`, owner 2026-10-16: two
// equal boxes ended the scroll on a component, not a moment). The headline reads itself in; beneath
// it, from 768px, two columns with one hairline between them: the quote line and the button left,
// the phone number right as the largest thing on the close, the email and base under it. The
// traveling light rises behind it as the horizon and hands on to the footer's closing stage. Phone
// taps and the quote form are measured as before (src/lib/analytics.ts listens for tel: clicks).
// The earlier forms are in tag options-archive-2026-10-19 (docs/options-archive.md).
const PHONE = '719-696-3966';
const TEL = 'tel:+17196963966';
const EMAIL = 'contact@aressecurity.co';

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  // The hairline grows down between the columns and each column comes up, tied to the scroll.
  useScene(ref, ({ gsap }, root) => {
    const body = root.querySelector('.ds-close');
    const range = { trigger: body, start: 'top 88%', end: 'top 50%', scrub: true };
    gsap.fromTo(root.querySelector('.ds-close-rule'), { scaleY: 0 }, { scaleY: 1, ease: 'none', scrollTrigger: range });
    gsap.fromTo(root.querySelectorAll('.ds-close > div'), { y: 32, opacity: 0.2 }, { y: 0, opacity: 1, ease: 'none', stagger: 0.15, scrollTrigger: range });
  });
  return (
    <section ref={ref} id="contact" className="ds-contact" data-form="open" aria-labelledby="contact-title">
      <RevealHeading id="contact-title" className="ds-display-xl">
        Request a quote, or call us.
      </RevealHeading>
      <div className="ds-close">
        <div className="ds-close-quote">
          <p className="ds-close-line">
            Send a site, a shift pattern, and a deadline. We walk your site before anything is
            signed, then send a scoped proposal.
          </p>
          <Link to="/contact" className="ds-btn ds-btn-primary">
            Request a Quote
            <Arrow />
          </Link>
        </div>
        <span className="ds-close-rule" aria-hidden="true" />
        <div className="ds-close-call">
          <p className="ds-close-note">For urgent procurement timelines or active contracts.</p>
          <a href={TEL} className="ds-close-phone">
            <span>{PHONE}</span>
            <Arrow />
          </a>
          <p className="ds-data ds-cta-meta">
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
            <span aria-hidden="true">·</span>
            <span>Colorado Springs, CO</span>
          </p>
        </div>
      </div>
    </section>
  );
}
