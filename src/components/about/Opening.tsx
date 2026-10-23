import { useEffect, useRef } from 'react';
import Arrow from '../Arrow';
import { CREDENTIALS } from './data';
import { responsive } from '../../lib/responsive';

// The opening: Pikes Peak behind Garden of the Gods, full bleed (a real place, so it
// carries a caption), the headline low on it, then the four certification marks, each
// with its number, coming in one after another as a hairline runs across the row.
export default function Opening() {
  const creds = useRef<HTMLUListElement>(null);

  // The entrance runs once, when the row is first seen. Set up only after hydration, so
  // the prerendered page (and anyone without JS or with reduced motion) shows the row.
  useEffect(() => {
    const row = creds.current;
    if (!row || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    row.dataset.anim = 'ready';
    // Each mark plays once 40% of it is on screen (or it is already scrolled past, so none is
    // ever left hidden), in batches: whatever is on screen together cascades together, left to
    // right (--k). Desktop: all four at load. Phones (owner, 2026-10-23): the first two, already at
    // the foot of the first screen, at load; the second two as they scroll up into view.
    // At load, wait a beat so the cascade plays after the page has settled, not during the first
    // paint.
    const items = Array.from(row.querySelectorAll<HTMLElement>(':scope > li'));
    const armed = performance.now();
    const timers: number[] = [];
    const queued = new Set<HTMLElement>();
    let raf = 0;
    const check = () => {
      raf = 0;
      const vh = window.innerHeight;
      const batch = items.filter((li) => !queued.has(li) && li.getBoundingClientRect().top + li.offsetHeight * 0.4 <= vh);
      if (!batch.length) return;
      batch.forEach((li, k) => {
        queued.add(li);
        li.style.setProperty('--k', String(k));
      });
      if (queued.size === items.length) stop();
      const wait = Math.max(0, 450 - (performance.now() - armed));
      // Two frames so the start state is painted before it changes.
      timers.push(window.setTimeout(() => requestAnimationFrame(() => requestAnimationFrame(() => batch.forEach((li) => (li.dataset.in = '')))), wait));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(check);
    };
    const stop = () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    check();
    return () => {
      stop();
      cancelAnimationFrame(raf);
      timers.forEach(clearTimeout);
    };
  }, []);

  return (
    <section className="ds-ab-open" aria-labelledby="about-title">
      <figure className="ds-ab-hero">
        <img
          {...responsive('/images/about-hero.jpg')}
          alt="Pikes Peak behind the red rocks of Garden of the Gods, Colorado Springs"
          decoding="sync"
          {...{ fetchpriority: 'high' }}
        />
        <figcaption className="ds-caption">Pikes Peak, Colorado Springs</figcaption>
      </figure>

      <div className="ds-container ds-ab-open-copy">
        <h1 id="about-title" className="ds-display-xl">
          Built around the people on post
        </h1>
        {/* Copy audit (2026-10-10): the Home and About heroes no longer repeat each other. */}
        <p className="ds-lead">
          Ares was founded in Colorado Springs in 2021 on one idea: officers trained for the
          specific site, and treated well, protect it better.
        </p>
      </div>

      <ul ref={creds} className="ds-container ds-ab-creds" aria-label="Certifications and contract vehicle">
        {CREDENTIALS.map((c, i) => (
          <li key={c.alt} style={{ ['--i' as string]: i }}>
            <img {...responsive(c.src)} alt={c.alt} data-tall={c.tall || undefined} loading="eager" />
            {/* The logo names it; a label shows only where the mark says less than we do. */}
            {!c.id && <span className="ds-small">{c.label}</span>}
            {c.id &&
              (c.href ? (
                <a href={c.href} target="_blank" rel="noopener noreferrer" className="ds-link ds-data">
                  {c.id}
                  <Arrow external size={12} />
                </a>
              ) : (
                <span className="ds-data">{c.id}</span>
              ))}
          </li>
        ))}
      </ul>
    </section>
  );
}
