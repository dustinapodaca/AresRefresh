import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Arrow from '../Arrow';
import SwipeControls, { useSwipeRow } from '../SwipeControls';
import IndustryIndex from '../IndustryIndex';
import { DIVISIONS } from '../services/data';
import { INDUSTRY_PAGES } from '../market/industries';
import { responsive } from '../../lib/responsive';
import { readIn, useScene, words, SCRUB } from '../home/engine';
import './sv-industries.css';

// 02 Industries (home-flora, 2026-10-22; redrawn 2026-10-25, owner: the AI-tells pass, after the
// industry rows of Dropbox and Beside on Mobbin). The six industries in the owner's order, in a row that
// runs off the right edge and scrolls on its own (swipe, wheel, drag with the mouse, or the arrows),
// snapping card by card. Each industry is an open column, no box and no text on the photo: the
// photo, the name, its one line in full (it names the sites; the separate site line was folded into
// it, owner 2026-10-25), and the way to its page. Everything shows at once (no hover reveal); on desktop the row drifts a little to the left
// as the page scrolls past.

const shortFor = (to?: string) => INDUSTRY_PAGES.find((p) => `/industries/${p.slug}` === to)?.short;
const indexNameFor = (to: string | undefined, title: string) =>
  INDUSTRY_PAGES.find((p) => `/industries/${p.slug}` === to)?.indexName ?? title;

export default function SvIndustries() {
  const ref = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLOListElement>(null);
  const [progress, setProgress] = useState(0);
  const [edges, setEdges] = useState({ start: true, end: false });

  // Progress bar and arrow states from the row's own scroll position.
  useEffect(() => {
    const t = trackRef.current;
    if (!t) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = t.scrollWidth - t.clientWidth;
      const p = max > 0 ? t.scrollLeft / max : 0;
      setProgress(p);
      setEdges({ start: t.scrollLeft < 4, end: t.scrollLeft > max - 4 });
    };
    const on = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    t.addEventListener('scroll', on, { passive: true });
    window.addEventListener('resize', on);
    return () => {
      cancelAnimationFrame(raf);
      t.removeEventListener('scroll', on);
      window.removeEventListener('resize', on);
    };
  }, []);

  // Drag to scroll with a mouse (touch and trackpads scroll natively). A drag never fires the
  // link it started on.
  useEffect(() => {
    const t = trackRef.current;
    if (!t || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    let down = false;
    let moved = false;
    let startX = 0;
    let startLeft = 0;
    const onDown = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse' || e.button !== 0) return;
      down = true;
      moved = false;
      startX = e.clientX;
      startLeft = t.scrollLeft;
    };
    const onMove = (e: PointerEvent) => {
      if (!down) return;
      const dx = e.clientX - startX;
      if (!moved && Math.abs(dx) > 5) {
        moved = true;
        t.dataset.dragging = 'true';
      }
      if (moved) t.scrollLeft = startLeft - dx;
    };
    const onUp = () => {
      if (!down) return;
      down = false;
      if (moved) {
        delete t.dataset.dragging;
        // Settle on the nearest card.
        const card = t.querySelector<HTMLElement>('.sv-ind-card');
        const step = card ? card.offsetWidth + parseFloat(getComputedStyle(t).columnGap || '16') : 1;
        t.scrollTo({ left: Math.round(t.scrollLeft / step) * step, behavior: 'smooth' });
      }
    };
    const onClick = (e: MouseEvent) => {
      if (moved) {
        e.preventDefault();
        e.stopPropagation();
        moved = false;
      }
    };
    t.addEventListener('pointerdown', onDown);
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    t.addEventListener('click', onClick, true);
    return () => {
      t.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      t.removeEventListener('click', onClick, true);
    };
  }, []);

  // Phones: the swipe controls under the row (the header's bar and arrows stay for wider screens).
  const { at: showing, go } = useSwipeRow(trackRef, DIVISIONS.length);
  // The name row above the row (phones; owner, 2026-10-26) needs the script to move the row, so it
  // shows only once the page is running (not in the prerender or without JavaScript).
  const [live, setLive] = useState(false);
  useEffect(() => setLive(true), []);

  const step = (dir: 1 | -1) => {
    const t = trackRef.current;
    const card = t?.querySelector<HTMLElement>('.sv-ind-card');
    if (!t || !card) return;
    const gap = parseFloat(getComputedStyle(t).columnGap || '16');
    t.scrollBy({ left: dir * (card.offsetWidth + gap), behavior: 'smooth' });
  };

  // Desktop: the headline reads in, and the row drifts left as the section passes.
  useScene(ref, (engine, root) => {
    readIn(engine, root.querySelector('.sv-ind-title'));
    const { gsap } = engine;
    const mm = gsap.matchMedia();
    mm.add('(min-width: 1024px)', () => {
      gsap.fromTo(
        root.querySelector('.sv-ind-drift'),
        { x: 140 },
        {
          x: -60,
          ease: 'none',
          scrollTrigger: { trigger: root, start: 'top bottom', end: 'bottom top', scrub: SCRUB },
        },
      );
      gsap.from(root.querySelectorAll('.sv-ind-card'), {
        y: 60,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.07,
        scrollTrigger: { trigger: root.querySelector('.sv-ind-track'), start: 'top 85%', once: true },
      });
    });
    return () => mm.revert();
  });

  return (
    <section ref={ref} id="divisions" className="sv-ind" aria-labelledby="sv-ind-title">
      <header className="sv-ind-head nx-edge">
        <h2 id="sv-ind-title" className="sv-ind-title">
          {words('The sites we protect.')}
          <span className="sv-ind-sub">
            Six industries, from government facilities and critical sites to offices and campuses.
          </span>
        </h2>
        <div className="sv-ind-controls">
          <div className="sv-ind-bar" aria-hidden="true">
            <i style={{ transform: `scaleX(${0.18 + progress * 0.82})` }} />
          </div>
          <button type="button" className="sv-ind-arrow" aria-label="Previous industries" onClick={() => step(-1)} disabled={edges.start}>
            <Arrow size={18} />
          </button>
          <button type="button" className="sv-ind-arrow" aria-label="More industries" onClick={() => step(1)} disabled={edges.end}>
            <Arrow size={18} />
          </button>
        </div>
      </header>

      {live && (
        <IndustryIndex
          names={DIVISIONS.map((d) => indexNameFor(d.page?.to, d.title))}
          labels={DIVISIONS.map((d) => d.title)}
          at={showing}
          go={go}
        />
      )}

      <div className="sv-ind-drift">
        <ol ref={trackRef} className="sv-ind-track" aria-label="Industries">
          {DIVISIONS.map((d, i) => (
            <li key={d.id} className="sv-ind-card">
              <Link to={d.page?.to ?? '/services'} className="sv-ind-link" draggable={false}>
                <span className="sv-ind-photo" aria-hidden="true">
                  <img
                    {...responsive(d.photo.src, '(min-width: 1024px) 400px, 78vw')}
                    alt=""
                    draggable={false}
                    loading={i < 3 ? 'eager' : 'lazy'}
                    decoding="async"
                    style={{ objectPosition: d.photo.position ?? '50% 50%' }}
                  />
                </span>
                <span className="sv-ind-name">{d.title}</span>
                <span className="sv-ind-short">{shortFor(d.page?.to) ?? d.body}</span>
                <span className="sv-ind-open">
                  Open the page
                  <Arrow size={16} />
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </div>
      <SwipeControls count={DIVISIONS.length} at={showing} go={go} noun="industry" hint="Swipe for the next industry" names={DIVISIONS.map((d) => d.title)} />
    </section>
  );
}
