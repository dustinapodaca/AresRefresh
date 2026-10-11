import { useEffect, useRef } from 'react';
import Arrow from '../Arrow';
import { CREDENTIALS } from './data';
import { responsive } from '../../lib/responsive';

// The opening: Pikes Peak behind Garden of the Gods, full bleed (a real place, so it
// carries a caption), the headline low on it, then the four certification marks, each
// with its number, sliding in one after another.
export default function Opening() {
  const creds = useRef<HTMLUListElement>(null);

  // The entrance runs once, when the row is first seen. Set up only after hydration, so
  // the prerendered page (and anyone without JS or with reduced motion) shows the row.
  useEffect(() => {
    const row = creds.current;
    if (!row || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    row.dataset.anim = 'ready';
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        // Two frames so the start state is painted before it changes.
        requestAnimationFrame(() => requestAnimationFrame(() => (row.dataset.anim = 'in')));
      },
      { threshold: 0.4 },
    );
    io.observe(row);
    return () => io.disconnect();
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
