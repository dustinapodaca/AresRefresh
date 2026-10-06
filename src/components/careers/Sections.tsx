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

// 02 Why people stay: the team at the range beside the four reasons, with the employees'
// Indeed rating as the proof.
export function Why() {
  return (
    <section id="why" className="ds-cr-why" aria-labelledby="why-title">
      <figure className="ds-plate ds-cr-team">
        <div className="ds-cr-shot-frame">
          <img
            src="/images/careers-philosophy.jpg"
            alt="Eight Ares Security team members in grey and black uniform polos at an indoor firearms range, wearing eye and ear protection"
            width={1184}
            height={880}
            loading="lazy"
            decoding="async"
          />
        </div>
        <figcaption className="ds-caption">The Ares team at the range</figcaption>
      </figure>
      <div className="ds-cr-why-copy">
        <h2 id="why-title" className="ds-display-lg">
          Why people stay.
        </h2>
        <p className="ds-lead">
          Our employees rate Ares 4.8 out of 5 on Indeed, with management and work-life balance
          scoring highest.{' '}
          <a href={INDEED_REVIEWS} target="_blank" rel="noopener noreferrer" className="ds-link">
            Read the reviews
            <Arrow external size={12} />
          </a>
        </p>
        <ul className="ds-cr-reasons">
          {REASONS.map((r) => (
            <li key={r.name}>
              <h3>{r.name}</h3>
              <p className="ds-small">{r.line}</p>
            </li>
          ))}
        </ul>
        <p className="ds-handoff">What that looks like day to day.</p>
      </div>
    </section>
  );
}

// 03 How we work: an Ares officer at the range as a wide plate (the photo is 1184px, too
// small to run full bleed), then the well-being paragraph.
export function Work() {
  return (
    <section id="work" className="ds-cr-work" aria-labelledby="work-title">
      <figure className="ds-plate ds-cr-shot">
        <div className="ds-cr-shot-frame">
          <img
            src="/images/careers-team.jpg"
            alt="An Ares officer in a black SECURITY polo firing at the range, seen from behind"
            width={1184}
            height={880}
            loading="lazy"
            decoding="async"
          />
        </div>
        <figcaption className="ds-caption">An Ares officer at the range</figcaption>
      </figure>
      <div className="ds-cr-work-copy">
        <h2 id="work-title" className="ds-display-lg">
          People first.
        </h2>
        <div className="ds-cr-work-body">
          <p className="ds-body">
            The well-being of our people comes first. Healthy officers do better work, so we
            plan for a real balance between work and rest.
          </p>
          <p className="ds-body">
            You are more than a guard here. As the company grows, we want our people to grow
            with it.
          </p>
        </div>
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
