import { TRAITS } from './data';

// 03 People: the officer portrait (real Ares) beside the five traits we hire for, set
// large, each with one line.
export default function People() {
  return (
    <section id="people" className="ds-ab-people" aria-labelledby="people-title">
      <figure className="ds-plate ds-ab-portrait">
        <img
          src="/images/officer-portrait.jpg"
          alt="An Ares Security officer in a black Ares polo, arms crossed, smiling outside a building"
          width={992}
          height={1040}
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
