import { useCallback, useState, type CSSProperties } from 'react';
import { flushSync } from 'react-dom';
import Arrow from '../Arrow';
import { GSA_ELIBRARY } from '../home/links';
import { DIVISIONS } from './data';

type ViewTransitionDoc = Document & {
  startViewTransition?: (update: () => void) => { finished: Promise<void> };
};

// 01 Divisions: six containers in two columns (owner request: a Framer look). The + opens
// one in place: it grows to the full width, its photo opens up beside the detail, and the
// others make room. Morphs with the View Transitions API; snaps where it isn't supported
// or the reader prefers reduced motion.
export default function Divisions() {
  const [openIds, setOpenIds] = useState<ReadonlySet<string>>(() => new Set());

  // Each card opens and closes on its own; opening one never closes another, so nothing
  // above the tapped card changes height and the page never has to scroll under it.
  const toggleCard = useCallback(
    (id: string) => {
      const next = new Set(openIds);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      const doc = document as ViewTransitionDoc;
      if (!doc.startViewTransition || prefersReducedMotion()) {
        setOpenIds(next);
        return;
      }
      // Only the card that changes state crossfades its text; the rest just glide.
      const card = document.getElementById(id);
      if (card) card.dataset.morph = 'true';
      const root = document.documentElement;
      const apply = () => {
        root.classList.add('ds-vt');
        flushSync(() => setOpenIds(next));
      };
      const done = () => {
        root.classList.remove('ds-vt');
        if (card) delete card.dataset.morph;
      };
      doc.startViewTransition(apply).finished.then(done, done);
    },
    [openIds],
  );

  return (
    <section id="divisions" className="ds-svc-divisions" aria-labelledby="divisions-title">
      <h2 id="divisions-title" className="ds-display-lg">
        What each division covers.
      </h2>
      <p className="ds-lead ds-svc-intro">
        Every division is staffed the same way: each officer is trained on your post by
        someone from our leadership who has worked it. Open one to see where we post.
      </p>

      <div className="ds-svc-grid">
        {DIVISIONS.map((d, i) => {
          const open = openIds.has(d.id);
          const panelId = `${d.id}-detail`;
          const toggle = () => toggleCard(d.id);
          return (
            <article
              key={d.id}
              id={d.id}
              className="ds-svc-card"
              data-open={open}
              aria-labelledby={`${d.id}-title`}
              style={{ viewTransitionName: `svc-${d.id}` } as CSSProperties}
            >
              <div
                className="ds-svc-card-media"
                onClick={toggle}
                aria-hidden="true"
                style={{ viewTransitionName: `svc-${d.id}-media` } as CSSProperties}
              >
                {/* Stock photographs, not Ares sites, so they carry no exhibit caption. */}
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

              <div className="ds-svc-card-text" style={{ viewTransitionName: `svc-${d.id}-text` } as CSSProperties}>
                <h3 id={`${d.id}-title`} className="ds-svc-card-head">
                  <button type="button" aria-expanded={open} aria-controls={panelId} onClick={toggle}>
                    <span className="ds-data ds-svc-n" aria-hidden="true">{d.n}</span>
                    <span className="ds-svc-title">{d.title}</span>
                    <span className="ds-svc-plus" aria-hidden="true">
                      <span />
                      <span />
                    </span>
                  </button>
                </h3>

                {!open && (
                  <ul className="ds-svc-covers" aria-label={`${d.title} covers`}>
                    {d.covers.map((c) => (
                      <li key={c.name}>{c.name}</li>
                    ))}
                  </ul>
                )}

                {/* Always in the document (and the prerendered HTML); hidden until opened. */}
                <div id={panelId} className="ds-svc-detail" hidden={!open}>
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
                  <ul className="ds-svc-items">
                    {d.covers.map((c) => (
                      <li key={c.name}>
                        <span className="ds-svc-item-name">{c.name}</span>
                        <span className="ds-svc-item-detail">{c.detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <p className="ds-lead ds-handoff">Whichever division fits your site, the work starts the same way.</p>
    </section>
  );
}

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
