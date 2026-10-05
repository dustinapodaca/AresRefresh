import Arrow from '../Arrow';
import { GSA_ELIBRARY } from '../home/links';
import { DIVISIONS } from './data';

// 01 Divisions: six entries, each a photo plate beside its number, title, body, and the
// site types it covers. The Matrix photos are set at a size the files can hold.
export default function Divisions() {
  return (
    <section id="divisions" className="ds-svc-divisions" aria-labelledby="divisions-title">
      <div className="ds-svc-head">
        <h2 id="divisions-title" className="ds-display-lg">
          What each division covers.
        </h2>
        <p className="ds-lead">
          Every division is staffed the same way: each officer is trained on your post by
          someone from our leadership who has worked it.
        </p>
      </div>

      <div className="ds-svc-entries">
        {DIVISIONS.map((d, i) => (
          <article key={d.id} id={d.id} className="ds-svc-entry" aria-labelledby={`${d.id}-title`}>
            {/* Stock photographs, not Ares sites, so they carry no exhibit caption. */}
            <div className="ds-plate ds-svc-plate">
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

            <div className="ds-svc-entry-copy">
              {/* The number hangs beside the title on its baseline, not above it. */}
              <div className="ds-svc-title-row">
                <span className="ds-data ds-svc-n" aria-hidden="true">{d.n}</span>
                <h3 id={`${d.id}-title`} className="ds-svc-title">{d.title}</h3>
              </div>
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
              <div className="ds-svc-covers">
                <h4 className="ds-small">Covers</h4>
                <ul>
                  {d.covers.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              </div>
            </div>
          </article>
        ))}
      </div>

      <p className="ds-lead ds-handoff">Whichever division fits your site, the work starts the same way.</p>
    </section>
  );
}
