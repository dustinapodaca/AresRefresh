import { useRef } from 'react';
import { Link } from 'react-router-dom';
import Arrow from '../Arrow';
import PhoneIcon from '../PhoneIcon';
import { responsive } from '../../lib/responsive';
import { useScene, SCRUB } from '../home/engine';
import './sv-close.css';

// The close on /services-next (home-flora, 2026-10-22), after FLORA's last screen: one two-tone
// line with the actions beside it ("A new medium needs a new canvas."), then a band like FLORA's
// footer image. Here the line names the three cities in ink, and the band is Denver in front of
// the Front Range, dissolving into the black, with the three cities as large links over its foot.
// Desktop with motion: the photo opens from an inset to the full width as it scrolls in, and the
// city names rise over it.

const CITIES = [
  { to: '/locations/colorado-springs', name: 'Colorado Springs', note: 'Headquarters' },
  { to: '/locations/denver', name: 'Denver', note: 'Service area' },
  { to: '/locations/pueblo', name: 'Pueblo', note: 'Service area' },
];

export default function SvClose() {
  const ref = useRef<HTMLElement>(null);

  useScene(ref, ({ gsap }, root) => {
    const mm = gsap.matchMedia();
    mm.add('(min-width: 1024px)', () => {
      const band = root.querySelector('.sv-close-band');
      gsap.fromTo(
        root.querySelector('.sv-close-photo'),
        { clipPath: 'inset(14% 18% 14% 18% round 6px)' },
        {
          clipPath: 'inset(0% 0% 0% 0% round 0px)',
          ease: 'none',
          scrollTrigger: { trigger: band, start: 'top 92%', end: 'top 22%', scrub: SCRUB },
        },
      );
      gsap.fromTo(
        root.querySelector('.sv-close-photo img'),
        { scale: 1.16 },
        { scale: 1, ease: 'none', scrollTrigger: { trigger: band, start: 'top bottom', end: 'bottom top', scrub: SCRUB } },
      );
      gsap.from(root.querySelectorAll('.sv-close-city'), {
        y: 48,
        opacity: 0,
        ease: 'none',
        stagger: 0.12,
        scrollTrigger: { trigger: band, start: 'top 55%', end: 'top 15%', scrub: SCRUB },
      });
      gsap.from(root.querySelectorAll('.sv-close-line, .sv-close-actions'), {
        y: 28,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: { trigger: root, start: 'top 82%', once: true },
      });
    });
    return () => mm.revert();
  });

  return (
    <section ref={ref} id="areas" className="sv-close" aria-labelledby="sv-close-title">
      <div className="sv-close-row nx-edge">
        <h2 id="sv-close-title" className="sv-close-line">
          Armed and unarmed officers in <b>Colorado Springs</b>, <b>Denver</b>, and <b>Pueblo</b>.
        </h2>
        <div className="sv-close-actions">
          <a href="tel:+17196963966" className="ds-link sv-close-call">
            <PhoneIcon size={18} />
            Call 719-696-3966
          </a>
          <Link to="/contact" className="ds-btn ds-btn-primary">
            Request a Quote
            <Arrow />
          </Link>
        </div>
      </div>

      <figure className="sv-close-band">
        <div className="sv-close-photo">
          <img
            {...responsive('/images/about-banner.jpg', '100vw')}
            alt="The Denver skyline in front of the Front Range"
            loading="lazy"
            decoding="async"
          />
          <figcaption className="sv-close-caption ds-data">Denver and the Front Range</figcaption>
        </div>
        <ul className="sv-close-cities nx-edge">
          {CITIES.map((c) => (
            <li key={c.to} className="sv-close-city">
              <Link to={c.to}>
                <span className="sv-close-note ds-data">{c.note}</span>
                <span className="sv-close-name">
                  {c.name}
                  <Arrow size={22} />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </figure>
    </section>
  );
}
