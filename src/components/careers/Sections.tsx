import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import Arrow from '../Arrow';
import { CAREERS_EMAIL, INDEED_REVIEWS, REASONS, ROLES, applyHref } from './data';
import { responsive } from '../../lib/responsive';

// 01 Roles: a quiet table on hairlines (Runway and Linear's open roles on Mobbin). Each
// Apply opens an email with the role in the subject.
export function Roles() {
  return (
    <section id="roles" className="ds-cr-roles" aria-labelledby="roles-title">
      <div className="ds-cr-head">
        <h2 id="roles-title" className="ds-display-lg">
          Open roles.
        </h2>
        <p className="ds-lead">Posts across Colorado Springs, Denver, and Pueblo.</p>
      </div>
      <div className="ds-cr-table" role="table" aria-label="Open roles">
        <div className="ds-cr-row ds-cr-row-head" role="row">
          <span role="columnheader">Role</span>
          <span role="columnheader">Location</span>
          <span role="columnheader">
            <span className="sr-only">Apply</span>
          </span>
        </div>
        {ROLES.map((r) => (
          <div key={r.title} className="ds-cr-row" role="row">
            <div role="cell" className="ds-cr-role">
              <h3>{r.title}</h3>
              <p className="ds-small">{r.line}</p>
            </div>
            <span role="cell" className="ds-cr-where">
              {r.where}
            </span>
            <span role="cell" className="ds-cr-apply">
              <a href={applyHref(r.title)} className="ds-link" aria-label={`Apply: ${r.title}`}>
                Apply
                <Arrow size={14} />
              </a>
            </span>
          </div>
        ))}
      </div>
      <p className="ds-cr-bycity">
        Jobs by city:{' '}
        <Link to="/careers/colorado-springs" className="ds-link">Colorado Springs</Link>,{' '}
        <Link to="/careers/denver" className="ds-link">Denver</Link>, and{' '}
        <Link to="/careers/pueblo" className="ds-link">Pueblo</Link>.
      </p>
    </section>
  );
}

// 02 Why people stay: one photo holds still while the four reasons scroll past. Halfway
// down (the third reason) it switches from the team to the officer at the range (owner:
// no camera moves).
const SHOTS = [
  { src: 'team', caption: 'The Ares team at the range' },
  { src: 'officer', caption: 'An Ares officer at the range' },
] as const;

export function Why() {
  const [active, setActive] = useState(-1);
  const items = useRef<(HTMLLIElement | null)[]>([]);

  // The reason in view is the last one whose top has passed the line below;
  // above the first it is none, so scrolling back up returns to the team photo.
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      // Desktop: the middle of the viewport. Below 1024px the photo sits over the top of
      // the screen, so the line is the middle of the open area beneath it.
      let line = window.innerHeight / 2;
      const lens = document.querySelector<HTMLElement>('.ds-cr-lens');
      if (lens && window.matchMedia('(max-width: 1023px)').matches) {
        // Where the photo ends once it is stuck, so the first reason waits for it too.
        const stuckBottom = parseFloat(getComputedStyle(lens).top) + lens.offsetHeight;
        line = (stuckBottom + window.innerHeight) / 2;
      }
      let next = -1;
      items.current.forEach((el, i) => {
        if (el && el.getBoundingClientRect().top <= line) next = i;
      });
      setActive(next);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  const shot = SHOTS[active >= 2 ? 1 : 0];

  return (
    <section id="why" className="ds-cr-why" aria-labelledby="why-title">
      <div className="ds-cr-why-intro">
        <h2 id="why-title" className="ds-display-lg">
          Why people stay.
        </h2>
        <div className="ds-cr-why-text">
          <p className="ds-lead">
            Our employees rate Ares 4.8 out of 5 on Indeed, with management and work-life
            balance scoring highest.{' '}
            <a href={INDEED_REVIEWS} target="_blank" rel="noopener noreferrer" className="ds-link">
              Read the reviews
              <Arrow external size={12} />
            </a>
          </p>
          <p className="ds-body">
            The well-being of our people comes first. Healthy officers do better work, so we plan
            for a real balance between work and rest. As the company grows, we want our people to
            grow with it.
          </p>
        </div>
      </div>

      <div className="ds-cr-lens-wrap">
        <figure className="ds-cr-lens" data-src={shot.src} aria-hidden="true">
          <div className="ds-cr-lens-frame">
            <img {...responsive('/images/careers-philosophy.jpg', '(min-width: 1024px) 50vw, 100vw')} alt="" loading="lazy" decoding="async" data-shot="team" />
            <img {...responsive('/images/careers-team.jpg', '(min-width: 1024px) 50vw, 100vw')} alt="" loading="lazy" decoding="async" data-shot="officer" />
          </div>
          <figcaption className="ds-caption">{shot.caption}</figcaption>
        </figure>

        <ol className="ds-cr-reasons">
          {REASONS.map((r, i) => (
            <li
              key={r.name}
              ref={(el) => {
                items.current[i] = el;
              }}
              data-i={i}
              data-active={active === i || undefined}
            >
              <span className="ds-data">0{i + 1}</span>
              <div>
                <h3>{r.name}</h3>
                <p className="ds-small">{r.line}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
      <p className="ds-handoff">If that sounds like your kind of team, write to us.</p>
    </section>
  );
}

// 04 Apply (the close): the email large over the rust light.
export function Apply() {
  return (
    <section id="apply" className="ds-cr-apply-close" aria-labelledby="apply-title">
      <div className="ds-cr-apply-copy">
        <h2 id="apply-title" className="ds-display-lg">
          Send us your résumé.
        </h2>
        <p className="ds-lead">Tell us the role and the city you want to work in.</p>
      </div>
      <div className="ds-cr-apply-side">
        <a href={applyHref()} className="ds-phone ds-cr-email">
          {CAREERS_EMAIL}
        </a>
        <div className="ds-actions">
          <a href={applyHref()} className="ds-btn ds-btn-primary">
            Email your résumé
            <Arrow />
          </a>
          <a href="#roles" className="ds-link">
            See open roles
          </a>
        </div>
      </div>
    </section>
  );
}
