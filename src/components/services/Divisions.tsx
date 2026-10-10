import { useCallback, useRef, useState, type CSSProperties } from 'react';
import { flushSync } from 'react-dom';
import Arrow from '../Arrow';
import { GSA_ELIBRARY } from '../home/links';
import { DIVISIONS } from './data';
import { glideUnderHeads } from '../glideUnderHeads';
import { responsive } from '../../lib/responsive';
import { Link } from 'react-router-dom';

const EASE = 'cubic-bezier(0.32, 0.72, 0, 1)'; // drawer curve
const DURATION = 320;

// Desktop grid (owner reference, 2026-10-05; equal cards by owner request): six
// columns, two equal cards to a row. When a card opens it takes its whole row and the
// cards from its row on re-pair beneath it; a last odd card sits at half width.
const ROW_SPANS = [[3, 3]];
type Slot = { order: number; span: number; corners: string };

function bento(openId: string | null): Map<string, Slot> {
  const ids = DIVISIONS.map((d) => d.id);
  const openAt = openId ? ids.indexOf(openId) : -1;
  const rows: { id: string; span: number }[][] = [];
  const pair = (list: string[], from: number) => {
    let r = from;
    for (let k = 0; k < list.length; ) {
      const left = list.length - k;
      if (left === 1) {
        rows.push([{ id: list[k], span: 3 }]);
        break;
      }
      const [a, b] = ROW_SPANS[r % ROW_SPANS.length];
      rows.push([{ id: list[k], span: a }, { id: list[k + 1], span: b }]);
      k += 2;
      r += 1;
    }
  };
  if (openAt < 0) {
    pair(ids, 0);
  } else {
    const rowStart = openAt - (openAt % 2);
    pair(ids.slice(0, rowStart), 0);
    rows.push([{ id: ids[openAt], span: 6 }]);
    pair(ids.slice(rowStart).filter((id) => id !== openId), rowStart / 2);
  }
  const slots = new Map<string, Slot>();
  let order = 0;
  rows.forEach((row, r) => {
    row.forEach((cell, c) => {
      const corners: string[] = [];
      if (r === 0 && c === 0) corners.push('tl');
      if (r === 0 && c === row.length - 1) corners.push('tr');
      if (r === rows.length - 1 && c === 0) corners.push('bl');
      if (r === rows.length - 1 && c === row.length - 1) corners.push('br');
      slots.set(cell.id, { order: order++, span: cell.span, corners: corners.join(' ') });
    });
  });
  return slots;
}

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

      // At every width, bring the opened card to the top, just under the nav (and the
      // running head, where it shows). Done instantly here; the FLIP below turns it into
      // one glide from where it was.
      const opened = next ? document.getElementById(next) : null;
      if (opened) {
        glideUnderHeads(opened);
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
        // A card that grows (the opening one, or one widening in the bento reflow) starts
        // clipped to its old size and opens out; it never scales, so text never stretches.
        const widens = b.width > a.width + 1 || b.height > a.height + 1;
        if (grows || widens) {
          const r = Math.max(0, b.width - a.width);
          const btm = Math.max(0, b.height - a.height);
          // The card's own corner (read, not repeated here), so the clip never shows a
          // different radius from the card it lands on.
          const round = getComputedStyle(card).borderTopLeftRadius;
          from.clipPath = `inset(0 ${r}px ${btm}px 0 round ${round})`;
          to.clipPath = `inset(0 0 0 0 round ${round})`;
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

  const slots = bento(openId);

  return (
    <section id="divisions" className="ds-svc-divisions" aria-labelledby="divisions-title">
      <h2 id="divisions-title" className="ds-display-lg">
        Who we protect.
      </h2>
      <p className="ds-lead ds-svc-intro">Open one to see the sites we staff.</p>

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
              data-corner={slots.get(d.id)?.corners || undefined}
              aria-labelledby={`${d.id}-title`}
              style={{ '--o': i * 2, '--lo': slots.get(d.id)?.order, '--span': slots.get(d.id)?.span } as CSSProperties}
            >
              <div className="ds-svc-card-media" onClick={toggle} aria-hidden="true">
                {/* Stock photographs, not Ares sites, so they carry no exhibit caption. */}
                <img
                  {...responsive(d.photo.src, '(min-width: 768px) 50vw, 100vw')}
                  alt=""
                  loading={i < 2 ? 'eager' : 'lazy'}
                  decoding="async"
                  style={d.photo.position ? { objectPosition: d.photo.position } : undefined}
                />
                {d.photo.sharp && (
                  <img
                    className="ds-svc-photo-sharp"
                    {...responsive(d.photo.sharp.src, '(min-width: 1024px) 42vw, 100vw')}
                    alt=""
                    loading="lazy"
                    decoding="async"
                  />
                )}
              </div>

              {/* Over the photo's foot, a frosted panel (owner reference) carries the name and
                  the one-line description; the detail opens beneath it. */}
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
                <p className="ds-svc-desc">{d.body}</p>
                {/* The industry's full page, in the card's heading area so it shows closed or open
                    (owner, 2026-10-10). */}
                {d.page && (
                  // Screen readers get the industry's name, since all six links read alike.
                  <Link to={d.page.to} className="ds-link ds-svc-more" aria-label={`Open the full ${d.title} page`}>
                    Open the full page
                    <Arrow size={14} />
                  </Link>
                )}

                {/* Always in the document (and the prerendered HTML); hidden until opened. */}
                <div id={panelId} className="ds-svc-detail" hidden={!open}>
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
                  <ul className="ds-svc-items" aria-label={`Where ${d.title} posts officers`}>
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

      <p className="ds-lead ds-handoff">Whichever industry you are in, the work starts the same way.</p>
    </section>
  );
}

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
