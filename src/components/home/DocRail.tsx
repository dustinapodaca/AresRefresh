import { useEffect, useState, type CSSProperties } from 'react';

export type Mark = { id: string; n: string; label: string };

// How the desktop rail is drawn. Every page shares the marks, the active section, and the
// mobile running head; each redesigned page has its own form (DESIGN.md, "The document rail").
//  rail     Home: mono marks on a track with the rust tick.
//  ticks    Capability Statement: a column of dashes sized to each section; read dashes
//           light, the current one is rust, labels show on hover.
//  dock     Services: a bar fixed at the bottom center, a segment per section filling
//           as you read, like the page's own stage meter.
//  counter  About: the section number large, rolling to the next, with its name and bars.
//  list     Careers: the section names in Inter, dimmed, the current one in ink with a
//           small dot that moves to it (Intercom's list on Mobbin).
export type RailVariant = 'rail' | 'ticks' | 'dock' | 'counter' | 'list';

// The running document marks. These are the only section numbers on the page.
// Home uses these; other pages pass their own.
export const MARKS: readonly Mark[] = [
  { id: 'record', n: '01', label: 'Record' },
  { id: 'quality', n: '02', label: 'Quality' },
  { id: 'industries', n: '03', label: 'Industries' },
  { id: 'coverage', n: '04', label: 'Coverage' },
  { id: 'careers', n: '05', label: 'Careers' },
  { id: 'contact', n: '06', label: 'Contact' },
];

// Progress through the current section is kept in 40 steps, so the forms that show it
// re-render a few dozen times per section rather than every frame.
const STEPS = 40;

type Reading = { active: string | null; progress: number; ended: boolean; heights: number[] };

// The current section is the last one whose top has passed 35% of the viewport.
// Null while the reader is still in the hero. `ended` is true once the footer's first line of
// content has scrolled above the viewport's foot (the footer's text is in view).
function useReading(marks: readonly Mark[]): Reading {
  const [state, setState] = useState<Reading>({ active: null, progress: 0, ended: false, heights: [] });
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const line = window.innerHeight * 0.35;
      let current: string | null = null;
      let progress = 0;
      const heights: number[] = [];
      for (const m of marks) {
        const el = document.getElementById(m.id);
        if (!el) {
          heights.push(0);
          continue;
        }
        const r = el.getBoundingClientRect();
        heights.push(Math.round(r.height / 120));
        if (r.top <= line) {
          current = m.id;
          progress = Math.round(Math.min(1, Math.max(0, (line - r.top) / r.height)) * STEPS) / STEPS;
        }
      }
      // The footer's first line of content, not the document's box: on Services the opening's
      // hold carries the content (and the footer) lower than the document's layout box, which
      // made the dock leave early, and the footer's own top padding is still open page
      // (owner, 2026-10-08: stay until the footer's text first appears).
      const foot = document.querySelector('.ds-footer .ds-container') ?? document.querySelector('.ds-footer');
      const doc = document.querySelector('.ds-doc');
      const ended = foot
        ? foot.getBoundingClientRect().top < window.innerHeight
        : doc
          ? doc.getBoundingClientRect().bottom < window.innerHeight
          : false;
      setState((s) =>
        s.active === current && s.progress === progress && s.ended === ended && s.heights.join() === heights.join()
          ? s
          : { active: current, progress, ended, heights },
      );
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [marks]);
  return state;
}

export default function DocRail({ marks = MARKS, variant = 'rail' }: { marks?: readonly Mark[]; variant?: RailVariant }) {
  const { active, progress, ended, heights } = useReading(marks);
  const index = marks.findIndex((m) => m.id === active);
  const current = index >= 0 ? marks[index] : undefined;
  const total = String(marks.length).padStart(2, '0');
  const here = (id: string) => (active === id ? ('location' as const) : undefined);

  return (
    <>
      <aside className="ds-rail" data-variant={variant} aria-label="On this page">
        {variant === 'rail' && (
          <nav className="ds-rail-nav">
            <div className="ds-rail-inner">
              <span className="ds-rail-fill" aria-hidden="true" />
              <ol>
                {marks.map((m) => (
                  <li key={m.id}>
                    <a href={`#${m.id}`} aria-current={here(m.id)}>
                      <span>{m.n}</span>
                      <span>{m.label}</span>
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </nav>
        )}

        {variant === 'ticks' && (
          <nav className="ds-rail-nav">
            <ol className="ds-tk">
              {marks.map((m, i) => {
                // A dash per ~360px of section (3 to 9), so long sections read long.
                const count = Math.min(9, Math.max(3, Math.round((heights[i] ?? 0) / 3)));
                const lit = i < index ? count : i === index ? Math.max(1, Math.ceil(progress * count)) : 0;
                return (
                  <li key={m.id}>
                    <a href={`#${m.id}`} aria-current={here(m.id)}>
                      <span className="ds-tk-dashes" aria-hidden="true">
                        {Array.from({ length: count }, (_, t) => (
                          <span key={t} data-lit={t < lit || undefined} data-now={(i === index && t === lit - 1) || undefined} />
                        ))}
                      </span>
                      <span className="ds-tk-label">
                        <span>{m.n}</span> {m.label}
                      </span>
                    </a>
                  </li>
                );
              })}
            </ol>
          </nav>
        )}

        {variant === 'list' && (
          <nav className="ds-rail-nav">
            <div className="ds-rl-wrap" style={{ '--i': Math.max(0, index) } as CSSProperties} data-idle={!current || undefined}>
              <span className="ds-rl-dot" aria-hidden="true" />
              <ol className="ds-rl">
                {marks.map((m) => (
                  <li key={m.id}>
                    <a href={`#${m.id}`} aria-current={here(m.id)}>
                      {m.label}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </nav>
        )}

        {variant === 'counter' && (
          <nav className="ds-rail-nav">
            <div className="ds-count" data-idle={!current || undefined}>
              <p className="ds-count-head" aria-hidden="true">
                <span className="ds-count-n">
                  {/* Keyed, so each new number rolls up into place. */}
                  <span key={(current ?? marks[0]).n}>{(current ?? marks[0]).n}</span>
                </span>
                <span className="ds-count-total">/ {total}</span>
              </p>
              <p className="ds-count-label" aria-hidden="true">
                {(current ?? marks[0]).label}
              </p>
              <ol className="ds-count-bars">
                {marks.map((m) => (
                  <li key={m.id}>
                    <a href={`#${m.id}`} aria-current={here(m.id)} aria-label={`${m.n} ${m.label}`}>
                      <span />
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </nav>
        )}

        {/* The dock slides away once the document ends (the footer is in view). */}
        {variant === 'dock' && (
          <nav className="ds-dock" data-visible={(Boolean(current) && !ended) || undefined}>
            <span className="ds-dock-label" aria-hidden="true">
              <span>{current?.n}</span> {current?.label}
            </span>
            <ol>
              {marks.map((m, i) => (
                <li key={m.id}>
                  <a href={`#${m.id}`} aria-current={here(m.id)} aria-label={`${m.n} ${m.label}`}>
                    <span>
                      <span style={{ transform: `scaleX(${i < index ? 1 : i === index ? progress : 0})` }} />
                    </span>
                  </a>
                </li>
              ))}
            </ol>
            <span className="ds-dock-count" aria-hidden="true">
              {current ? `${current.n} / ${total}` : ''}
            </span>
          </nav>
        )}
      </aside>

      {/* Below 1200px the rail collapses into a running head under the header. */}
      <div className="ds-runhead" data-visible={Boolean(current)} aria-hidden="true">
        <div className="ds-container">
          <span>{current ? current.label : ''}</span>
          <span>{current ? `${current.n} / ${total}` : ''}</span>
        </div>
        <span className="ds-runhead-fill" />
      </div>
    </>
  );
}
