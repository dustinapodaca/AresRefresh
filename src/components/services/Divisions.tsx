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
  const [openId, setOpenId] = useState<string | null>(null);

  const reveal = useCallback((id: string | null) => {
    if (!id) return;
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top;
    if (top < 120 || top > window.innerHeight * 0.55) {
      el.scrollIntoView({ block: 'start', behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
    }
  }, []);

  const setOpen = useCallback(
    (next: string | null) => {
      const doc = document as ViewTransitionDoc;
      const apply = () => flushSync(() => setOpenId(next));
      if (doc.startViewTransition && !prefersReducedMotion()) {
        // Only the cards that change state crossfade their text; the rest just glide.
        const changing = [openId, next]
          .map((id) => (id ? document.getElementById(id) : null))
          .filter((el): el is HTMLElement => Boolean(el));
        changing.forEach((el) => (el.dataset.morph = 'true'));
        const done = () => {
          changing.forEach((el) => delete el.dataset.morph);
          reveal(next);
        };
        doc.startViewTransition(apply).finished.then(done, done);
      } else {
        apply();
        reveal(next);
      }
    },
    [openId, reveal],
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
          const open = openId === d.id;
          const panelId = `${d.id}-detail`;
          const toggle = () => setOpen(open ? null : d.id);
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
