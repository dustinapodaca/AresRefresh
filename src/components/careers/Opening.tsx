import Arrow from '../Arrow';
import { CAREERS_EMAIL, INDEED_REVIEWS, applyHref } from './data';
import { responsive } from '../../lib/responsive';

// The opening: the Colorado Springs skyline (a real place, captioned) as a band under the
// nav, the headline low on it, then the employees' Indeed rating as a small proof beside
// the way in (Runway's rating badge on Mobbin).
export default function Opening() {
  return (
    <section className="ds-cr-open" aria-labelledby="careers-title">
      <figure className="ds-cr-hero">
        <img
          {...responsive('/images/careers-hero.jpg')}
          alt="The aluminum spires of the Cadet Chapel at the U.S. Air Force Academy against a clear sky"
          decoding="sync"
          {...{ fetchpriority: 'high' }}
        />
        <figcaption className="ds-caption">Cadet Chapel, U.S. Air Force Academy</figcaption>
      </figure>
      <div className="ds-container ds-cr-open-copy">
        <h1 id="careers-title" className="ds-display-xl">
          Join the team.
        </h1>
        <p className="ds-lead">
          We hire armed and unarmed officers, with paid training and schedules you can plan a
          life around.
        </p>
        <div className="ds-actions">
          <a href="#roles" className="ds-btn ds-btn-primary">
            See open roles
            <Arrow />
          </a>
          <a href={applyHref()} className="ds-link ds-data">
            {CAREERS_EMAIL}
          </a>
        </div>
        <a href={INDEED_REVIEWS} target="_blank" rel="noopener noreferrer" className="ds-cr-rating">
          <span className="ds-data">4.8 / 5</span>
          <span>Rated by our employees on Indeed</span>
          <Arrow external size={12} />
        </a>
      </div>
    </section>
  );
}
