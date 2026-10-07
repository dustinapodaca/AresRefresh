import { STAFFING_STEPS } from './data';

// 01 Staffing (owner, 2026-10-06: moved whole from Home, photo and all, in exchange for
// "Quality over quantity."): the officer photo holds still on desktop while the four steps
// scroll past; below 1024px the steps become a swipe row with a meter.
export default function Staffing() {
  return (
    <section id="staffing" className="ds-staffing" aria-labelledby="staffing-title">
      <div className="ds-staffing-intro">
        <h2 id="staffing-title" className="ds-display-lg">
          How we staff a post.
        </h2>
        <p className="ds-lead">
          Every post we take on is staffed the same way, from the first look at the site to the
          first shift.
        </p>
      </div>

      <div className="ds-staffing-body">
        {/* Pinned on desktop while the four steps scroll past. */}
        <div className="ds-staffing-media">
          <figure className="ds-plate">
            <img
              src="/images/backbone-officer.jpg"
              alt="Smiling Ares Security officer in a black Ares Security polo shirt, standing against a brick wall"
              width={733}
              height={900}
              loading="lazy"
              decoding="async"
            />
          </figure>
        </div>

        {/* Below 1024px the steps become a swipe row; the bar fills as it scrolls. */}
        <div className="ds-steps-wrap">
          <ol className="ds-steps" tabIndex={0} aria-label="Four steps">
            {STAFFING_STEPS.map((s, i) => (
              <li key={s.title}>
                <span className="ds-data ds-step-n" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="ds-title">{s.title}</h3>
                <p className="ds-body">{s.body}</p>
              </li>
            ))}
          </ol>
          <div className="ds-steps-meta" aria-hidden="true">
            <span className="ds-steps-bar"><span /></span>
            <span className="ds-data">Swipe</span>
          </div>
        </div>
      </div>
    </section>
  );
}
