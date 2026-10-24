import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Arrow from '../Arrow';
import { DIVISIONS } from '../services/data';
import { INDUSTRY_PAGES } from '../market/industries';
import { responsive } from '../../lib/responsive';
import { motionAllowed, readIn, useScene, words, SCRUB } from '../home/engine';
import './sv-industries.css';

// 02 Industries on /services-next (home-flora, 2026-10-22), after FLORA's "Hear about us." row:
// dark photo cards with the caption at the foot, in a row that runs off the right edge. The six
// industries in the owner's order. Hovering or focusing a card lifts its caption to show the sites
// it covers and the way to its page. The row scrolls on its own (swipe, wheel, drag with the mouse,
// or the arrows), snaps card by card, and drifts a little to the left as the page scrolls past.

const n2 = (i: number) => String(i + 1).padStart(2, '0');
const shortFor = (to?: string) => INDUSTRY_PAGES.find((p) => `/industries/${p.slug}` === to)?.short;

// Phones (owner, 2026-10-23: the text over the photos was hard to read, and Services should not
// copy Home's deck): each card is a site file in the page's own node language, after the hero.
// A mono bar (number, site count), the photo in its own frame with crop marks and nothing over it,
// the name and the industry's short line on the card, the site types on a wire with a node each,
// and the way to the page at the foot. As a card settles in the row, its crop marks close in and
// the wire draws down, lighting each node. Drawn by default (prerender, no JS, reduced motion);
// armed after mount. Desktop keeps the caption over the photo.

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

  // Phones: each card plays once, as most of it comes on screen (the row clips the ones beside it).
  useEffect(() => {
    const root = ref.current;
    if (!root || !motionAllowed() || !window.matchMedia('(max-width: 767px)').matches) return;
    root.dataset.arm = 'true';
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          (e.target as HTMLElement).dataset.live = 'true';
          io.unobserve(e.target);
        }),
      { threshold: 0.6 },
    );
    root.querySelectorAll('.sv-ind-card').forEach((c) => io.observe(c));
    return () => {
      io.disconnect();
      delete root.dataset.arm;
    };
  }, []);

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

      <div className="sv-ind-drift">
        <ol ref={trackRef} className="sv-ind-track" aria-label="Industries">
          {DIVISIONS.map((d, i) => (
            <li key={d.id} className="sv-ind-card">
              <Link to={d.page?.to ?? '/services'} className="sv-ind-link" draggable={false}>
                <span className="sv-ind-nbar ds-data" aria-hidden="true">
                  <span>
                    {n2(i)} <em>/ {n2(DIVISIONS.length - 1)}</em>
                  </span>
                  <span>{d.covers.length} site types</span>
                </span>
                <span className="sv-ind-photo" aria-hidden="true">
                  <img
                    {...responsive(d.photo.src, '(min-width: 1024px) 400px, 78vw')}
                    alt=""
                    draggable={false}
                    loading={i < 3 ? 'eager' : 'lazy'}
                    decoding="async"
                    style={{ objectPosition: d.photo.position ?? '50% 50%' }}
                  />
                  <span className="sv-ind-crop">
                    <i />
                    <i />
                    <i />
                    <i />
                  </span>
                </span>
                <span className="sv-ind-shade" aria-hidden="true" />
                <span className="sv-ind-idx ds-data">{n2(i)}</span>
                <span className="sv-ind-cap">
                  <span className="sv-ind-name">{d.title}</span>
                  <span className="sv-ind-body">{d.body}</span>
                  {shortFor(d.page?.to) && <span className="sv-ind-short">{shortFor(d.page?.to)}</span>}
                  <span className="sv-ind-more">
                    <span className="sv-ind-more-in">
                    <span className="sv-ind-covers">
                      {d.covers.map((c, k) => (
                        <span key={c.name} style={{ ['--k' as string]: k } as React.CSSProperties}>
                          {c.name}
                        </span>
                      ))}
                    </span>
                    <span className="sv-ind-open">
                      Open the page
                      <Arrow size={16} />
                    </span>
                    </span>
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
