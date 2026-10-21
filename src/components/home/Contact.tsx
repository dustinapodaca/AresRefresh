import { useRef } from 'react';
import { Link } from 'react-router-dom';
import Arrow from '../Arrow';
import { readIn, useScene, words } from './engine';
import './nx-contact.css';

// 06 Contact (home-flora, 2026-10-20): the line ends at the phone number. The headline across the
// full width, then the number as the largest object on the page; the page's rust line arrives and
// draws itself as its underline. The quote route sits beneath as a quieter second row, and a low
// rust horizon comes up behind it as the page ends, handing over to the footer's closing light.

const PHONE = '719-696-3966';
const TEL = 'tel:+17196963966';
const EMAIL = 'contact@aressecurity.co';

export default function Contact() {
  const ref = useRef<HTMLElement>(null);

  useScene(ref, (e, root) => {
    const { gsap } = e;
    readIn(e, root.querySelector('.nx-ct-title'));
    const phone = root.querySelector<HTMLElement>('.nx-ct-phone')!;
    gsap.fromTo(
      root.querySelector('.nx-ct-line'),
      { scaleX: 0 },
      { scaleX: 1, ease: 'none', scrollTrigger: { trigger: phone, start: 'top 88%', end: 'top 52%', scrub: 0.6 } },
    );
    gsap.fromTo(
      phone.querySelectorAll('.nx-ct-digit'),
      { opacity: 0.16, yPercent: 30 },
      { opacity: 1, yPercent: 0, ease: 'none', stagger: 0.05, scrollTrigger: { trigger: phone, start: 'top 95%', end: 'top 60%', scrub: 0.6 } },
    );
    gsap.fromTo(
      root.querySelectorAll('.nx-ct-rise'),
      { opacity: 0, y: 32 },
      { opacity: 1, y: 0, ease: 'none', stagger: 0.1, scrollTrigger: { trigger: root.querySelector('.nx-ct-quote'), start: 'top 95%', end: 'top 70%', scrub: 0.6 } },
    );
    gsap.fromTo(
      root.querySelector('.nx-ct-horizon'),
      { yPercent: 38, opacity: 0.25, scaleX: 0.8 },
      { yPercent: 0, opacity: 1, scaleX: 1, ease: 'none', scrollTrigger: { trigger: root, start: 'center bottom', end: 'bottom bottom', scrub: 0.6 } },
    );
    e.ScrollTrigger.sort();
  });

  return (
    <section ref={ref} id="contact" className="nx-contact" aria-labelledby="nx-contact-title">
      <div className="nx-ct-inner">
        <h2 id="nx-contact-title" className="nx-statement nx-ct-title">
          {words('Request a quote, or call us.')}
        </h2>

        <div className="nx-ct-call nx-node" data-live="true">
          <p className="nx-node-bar">
            <span>Call us</span>
            <span>For urgent procurement timelines or active contracts.</span>
          </p>
          <a href={TEL} className="nx-ct-phone" aria-label={`Call ${PHONE}`}>
            <span className="nx-ct-digits" aria-hidden="true">
              {PHONE.split('').map((d, i) => (
                // eslint-disable-next-line react/no-array-index-key
                <span key={i} className="nx-ct-digit">
                  {d}
                </span>
              ))}
            </span>
            <span className="nx-ct-go" aria-hidden="true">
              <Arrow size={40} />
            </span>
            <span className="nx-ct-line" aria-hidden="true" />
          </a>
          <p className="nx-ct-meta ds-data">
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
            <span aria-hidden="true">·</span>
            <span>Colorado Springs, CO</span>
          </p>
        </div>

        <div className="nx-ct-quote">
          <p className="nx-ct-rise">
            Send a site, a shift pattern, and a deadline. We walk your site before anything is signed,
            then send a scoped proposal.
          </p>
          <Link to="/contact" className="ds-btn ds-btn-primary nx-ct-rise">
            Request a Quote
            <Arrow />
          </Link>
        </div>
      </div>
      <div className="nx-ct-horizon" aria-hidden="true" />
    </section>
  );
}
