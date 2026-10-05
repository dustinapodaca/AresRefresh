import Arrow from '../Arrow';
import { GSA_ELIBRARY } from '../home/links';
import { DIVISIONS } from './data';

// 01 Divisions, set as a schedule of services: one ruled row per division, like the
// line items of a contract. Name and coverage, the description, then the photo as a
// small exhibit (the Matrix files are as small as 640px, so they stay small).
export default function Divisions() {
  return (
    <section id="divisions" className="ds-svc-divisions" aria-labelledby="divisions-title">
      <h2 id="divisions-title" className="ds-display-lg">
        What each division covers.
      </h2>
      <p className="ds-lead ds-svc-intro">
        Every division is staffed the same way: each officer is trained on your post by
        someone from our leadership who has worked it.
      </p>

      <div className="ds-svc-schedule">
        {DIVISIONS.map((d, i) => (
          <article key={d.id} id={d.id} className="ds-svc-row" aria-labelledby={`${d.id}-title`}>
            <div className="ds-svc-row-name">
              <div className="ds-svc-title-row">
                <span className="ds-data ds-svc-n" aria-hidden="true">{d.n}</span>
                <h3 id={`${d.id}-title`} className="ds-svc-title">{d.title}</h3>
              </div>
              <ul className="ds-svc-covers" aria-label={`${d.title} covers`}>
                {d.covers.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </div>

            <div className="ds-svc-row-body">
              <p className="ds-body">{d.body}</p>
              {d.id === 'government' && (
                <dl className="ds-svc-proof">
                  <dt>GSA Multiple Award Schedule</dt>
                  <dd className="ds-data">47QSMS25D009Q</dd>
                  <dd>
                    <a href={GSA_ELIBRARY} target="_blank" rel="noopener noreferrer" className="ds-link">
                      View on GSA eLibrary
                      <Arrow external size={14} />
                    </a>
                  </dd>
                </dl>
              )}
            </div>

            {/* Stock photographs, not Ares sites, so they carry no exhibit caption. */}
            <div className="ds-plate ds-svc-thumb">
              <img
                src={d.photo.src}
                alt=""
                width={d.photo.width}
                height={d.photo.height}
                loading={i < 2 ? 'eager' : 'lazy'}
                decoding="async"
                style={d.photo.position ? { objectPosition: d.photo.position } : undefined}
              />
            </div>
          </article>
        ))}
      </div>

      <p className="ds-lead ds-handoff">Whichever division fits your site, the work starts the same way.</p>
    </section>
  );
}
