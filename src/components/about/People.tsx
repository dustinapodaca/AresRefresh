import { TRAITS } from './data';
import { responsive } from '../../lib/responsive';

// 03 People: the officer portrait (real Ares) beside the five traits we hire for
// (Approachable, Licensed, Experienced, Local, Steady), each set large with its line beneath.
export default function People() {
  return (
    <section id="people" className="ds-ab-people" aria-labelledby="people-title">
      <figure className="ds-plate ds-ab-portrait">
        <img
          {...responsive('/images/officer-portrait.jpg', '(min-width: 1024px) 50vw, 100vw')}
          alt="An Ares Security officer in a black Ares polo, ID lanyard, and duty belt with a radio, arms crossed and smiling in front of a black brick wall"
          loading="lazy"
          decoding="async"
        />
      </figure>
      <div className="ds-ab-people-copy">
        <h2 id="people-title" className="ds-display-lg">
          Who stands your post.
        </h2>
        <p className="ds-lead">We hire for character first, then train for the post.</p>
        <ul className="ds-ab-traits">
          {TRAITS.map((t) => (
            <li key={t.name}>
              <span className="ds-ab-trait">{t.name}</span>
              <span className="ds-ab-trait-line">{t.line}</span>
            </li>
          ))}
        </ul>
        {/* Phones: the swipe meter, as on the Home staffing row. */}
        <div className="ds-steps-meta ds-ab-traits-meta" aria-hidden="true">
          <span className="ds-steps-bar"><span /></span>
          <span className="ds-data">Swipe</span>
        </div>
      </div>
    </section>
  );
}
