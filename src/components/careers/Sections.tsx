import { useEffect, useRef, useState, type CSSProperties } from 'react';
import Arrow from '../Arrow';
import { CAREERS_EMAIL, INDEED_REVIEWS, REASONS, ROLES, applyHref } from './data';

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
      <p className="ds-handoff">Why officers stay once they join.</p>
    </section>
  );
}

// 02 Why people stay: one frame works like a camera. It holds still while the four
// reasons scroll past; as each reaches the middle of the screen the frame pans and zooms
// across the team photo to a different group, and cuts to the officer at the range for
// training. Crops frame groups, never a single person, so no reason is pinned on anyone.
type Shot = { src: 'team' | 'officer'; x: number; y: number; z: number; caption: string };
const SHOTS: Shot[] = [
  { src: 'team', x: 78, y: 38, z: 1.7, caption: 'The Ares team at the range' },
  { src: 'team', x: 22, y: 38, z: 1.7, caption: 'The Ares team at the range' },
  { src: 'team', x: 50, y: 50, z: 1, caption: 'The Ares team at the range' },
  { src: 'officer', x: 50, y: 50, z: 1, caption: 'An Ares officer at the range' },
];

export function Why() {
  const [active, setActive] = useState(-1);
  const items = useRef<(HTMLLIElement | null)[]>([]);

  // The reason crossing the middle of the viewport is the one in frame.
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.i));
        }
      },
      { rootMargin: '-50% 0px -50% 0px' },
    );
    items.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  const shot = active >= 0 ? SHOTS[active] : { ...SHOTS[2], caption: SHOTS[2].caption };
  const lens = { '--fx': `${shot.x}%`, '--fy': `${shot.y}%`, '--z': shot.z } as CSSProperties;

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
        <figure className="ds-cr-lens" data-src={shot.src} style={lens} aria-hidden="true">
          <div className="ds-cr-lens-frame">
            <img src="/images/careers-philosophy.jpg" alt="" width={1184} height={880} loading="lazy" decoding="async" data-shot="team" />
            <img src="/images/careers-team.jpg" alt="" width={1184} height={880} loading="lazy" decoding="async" data-shot="officer" />
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
