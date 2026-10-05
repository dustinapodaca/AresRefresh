import { useCallback, useRef, useState, type CSSProperties } from 'react';
import { flushSync } from 'react-dom';
import Arrow from '../Arrow';
import { GSA_ELIBRARY } from '../home/links';
import { DIVISIONS } from './data';

const EASE = 'cubic-bezier(0.32, 0.72, 0, 1)'; // drawer curve
const DURATION = 320;

// 01 Divisions: six containers in two columns (owner request: a Framer look). The + opens
// one in place; one is open at a time. The motion is a FLIP on the real cards: measure,
// change state, measure again, then play each card from where it was to where it is.
// The cards never leave the page, so they pass under the fixed nav and its glass.
// On phones the opened card also slides to the top, just under the nav and running head.
export default function Divisions() {
  const [openId, setOpenId] = useState<string | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const toggleCard = useCallback(
    (id: string) => {
      const next = openId === id ? null : id;
      const grid = gridRef.current;
      const cards = grid ? (Array.from(grid.children) as HTMLElement[]) : [];
      const first = new Map(cards.map((c) => [c, c.getBoundingClientRect()]));

      flushSync(() => setOpenId(next));

      // Phones: bring the opened card to the top, below the nav and running head. Done
      // instantly here; the FLIP below turns it into one glide from where it was.
      const opened = next ? document.getElementById(next) : null;
      if (opened && window.matchMedia('(max-width: 767px)').matches) {
        const floor = parseFloat(getComputedStyle(opened).scrollMarginTop) || 120;
        window.scrollBy({ top: opened.getBoundingClientRect().top - floor, behavior: 'instant' as ScrollBehavior });
      }

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      for (const card of cards) {
        const a = first.get(card);
        const b = card.getBoundingClientRect();
        if (!a) continue;
        const dx = a.left - b.left;
        const dy = a.top - b.top;
        const grows = card === opened && (b.width > a.width + 1 || b.height > a.height + 1);
        if (!grows && Math.abs(dx) < 1 && Math.abs(dy) < 1) continue;
        const from: Keyframe = { transform: `translate(${dx}px, ${dy}px)` };
        const to: Keyframe = { transform: 'translate(0, 0)' };
        if (grows) {
          // The opening card starts at its old size and opens out to the new one.
          const r = Math.max(0, b.width - a.width);
          const btm = Math.max(0, b.height - a.height);
          from.clipPath = `inset(0 ${r}px ${btm}px 0 round 18px)`;
          to.clipPath = 'inset(0 0 0 0 round 18px)';
        }
        const anim = card.animate([from, to], { duration: DURATION, easing: EASE });
        if (card === opened) {
          // The opening card rides above the others as they make room.
          card.style.zIndex = '1';
          const reset = () => card.style.removeProperty('z-index');
          anim.finished.then(reset, reset);
        }
      }
    },
    [openId],
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

      <div className="ds-svc-grid" ref={gridRef}>
        {DIVISIONS.map((d, i) => {
          const open = openId === d.id;
          const panelId = `${d.id}-detail`;
          const toggle = () => toggleCard(d.id);
          return (
            <article
              key={d.id}
              id={d.id}
              className="ds-svc-card"
              data-open={open}
              data-col={i % 2 ? 'right' : 'left'}
              aria-labelledby={`${d.id}-title`}
              style={{ '--o': i * 2 } as CSSProperties}
            >
              <div
                className="ds-svc-card-media"
                onClick={toggle}
                aria-hidden="true"
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

              <div className="ds-svc-card-text">
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
