import { lazy, Suspense, useCallback, useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import Arrow from '../Arrow';
import { GSA_ELIBRARY } from './links';
import { responsive } from '../../lib/responsive';
import { heroTitle } from '../../lib/heroTitle';
import { terrainMode } from '../../lib/terrainSupport';
import { useScene } from './motion';

// The headline (owner, 2026-10-19, picked from ten) over the lead ("critical sites", not "data
// centers": web audit, owner 2026-10-18). No eyebrow above the headline (owner); the search phrase
// is carried by the title and description. The other headlines (/?hero=) and the photo background
// (/?herobg=photo) were removed at launch (owner, 2026-10-19; tag options-archive-2026-10-19,
// docs/options-archive.md).
const HERO = {
  title: 'Security officers for Colorado\u2019s Front Range.',
  lead: 'From restricted areas and critical sites to offices and campuses: officers trained on your post before the first shift.',
};

// The terrain (WebGL2) loads on its own, only on Home and only once the page has mounted, so other
// pages and the first paint don't carry its code (web audit, 2026-10-18).
const Topography = lazy(() => import('./Topography'));

// The terrain's still frames (2026-10-18), captured from the live terrain at 1440 and 390.
const TOPO_STILL = responsive('/images/hero-topo/terrain-desktop.webp');

export default function Hero() {
  const hero = HERO;
  // The terrain is drawn in the browser only, after mount, and never for automated browsers:
  // the build's prerender (headless Chrome on Netlify, no GPU) drew it in software and timed out
  // on Home (2026-10-15). The snapshot keeps the empty dark box; the terrain fills it on load.
  // Where it can't run (WebGL2 blocked or missing, a software renderer, no JavaScript, the
  // prerender, reduced motion) a still frame of it shows instead, from the first paint (owner,
  // 2026-10-18: no still-then-terrain swap). <html data-terrain> says which; the inline script in
  // index.html sets it before the first paint, and lib/terrainSupport.ts when Home is reached
  // from another page. If the terrain was expected but draws nothing within a few seconds, the
  // still comes in its place ('fallback'), the only time it fades.
  const [live, setLive] = useState(false);
  const drawn = useRef(false);
  const onDrawn = useCallback(() => {
    drawn.current = true;
  }, []);
  useLayoutEffect(() => {
    const html = document.documentElement;
    if (!html.dataset.terrain) html.dataset.terrain = terrainMode();
  }, []);
  useEffect(() => {
    const html = document.documentElement;
    if (html.dataset.terrain !== 'live') return;
    setLive(true);
    // Counted only while the tab is showing: a background tab draws nothing yet.
    let left = 4000;
    let started = 0;
    let timer = 0;
    const fail = () => {
      if (drawn.current) return;
      html.dataset.terrain = 'fallback';
      setLive(false);
    };
    const run = () => {
      if (document.hidden || timer) return;
      started = performance.now();
      timer = window.setTimeout(fail, left);
    };
    const pause = () => {
      if (!document.hidden || !timer) return;
      window.clearTimeout(timer);
      timer = 0;
      left -= performance.now() - started;
    };
    const onVisibility = () => (document.hidden ? pause() : run());
    run();
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      window.clearTimeout(timer);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);
  // Desktop zooms out (owner, 2026-10-15): the component narrows its camera on wide screens, so
  // the land reads magnified there; smaller landforms from 900px. Phones keep the full size.
  const [wide, setWide] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 900px)');
    const sync = () => setWide(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);
  // Phones and tablets (owner, 2026-10-16): the terrain reaches down to the end of the lead, just
  // above the quote button (it ended at the headline). How far the copy's top sits above the
  // lead's foot goes in --topo-reach; the CSS grows the box by that and pulls the copy up by the
  // same, so the copy stays put. Without JS the box keeps its old 7rem reach.
  const sectionRef = useRef<HTMLElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const leadRef = useRef<HTMLParagraphElement>(null);
  useEffect(() => {
    const section = sectionRef.current, copy = copyRef.current, lead = leadRef.current;
    if (!section || !copy || !lead) return;
    const measure = () => {
      const reach = lead.offsetTop + lead.offsetHeight + 16;
      section.style.setProperty('--topo-reach', `${reach}px`);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(copy);
    return () => ro.disconnect();
  }, []);
  // As the hero leaves (owner, 2026-10-19): the camera tips forward and down over the land and the
  // glide speeds up, so the reader flies on over the terrain instead of watching it fade; the copy
  // and its glass strip rise faster than the page (desktop) and the still drifts slower, the three
  // layers moving apart as before (they were CSS scroll timelines, which Firefox never ran).
  const camera = useRef({ tilt: 32, glide: 1 }).current;
  useScene(sectionRef, ({ gsap, ScrollTrigger }, root) => {
    const copy = root.querySelector('.ds-hero-copy');
    const still = root.querySelector('.ds-hero-photo img');
    ScrollTrigger.create({
      trigger: root,
      start: 'top top',
      end: 'bottom top',
      onUpdate: (self) => {
        camera.tilt = 32 + 26 * self.progress;
        camera.glide = 1 + 3 * self.progress;
      },
    });
    const exit = { trigger: root, start: 'top top', end: 'bottom top', scrub: true };
    if (still) gsap.fromTo(still, { yPercent: 0 }, { yPercent: 4, ease: 'none', scrollTrigger: exit });
    const mm = gsap.matchMedia();
    mm.add('(min-width: 900px)', () => {
      if (copy) gsap.fromTo(copy, { y: 0 }, { y: () => -0.4 * window.innerHeight, ease: 'none', scrollTrigger: { ...exit, invalidateOnRefresh: true } });
    });
    return () => {
      mm.revert();
      camera.tilt = 32;
      camera.glide = 1;
    };
  });

  return (
    <section ref={sectionRef} className="ds-hero" aria-labelledby="hero-title">
      {/* The background (owner, 2026-10-15): React Bits' Topography, contour lines of a terrain
          in the site's rust drifting under the copy, the cursor lifting the land and a click
          sending a ring out. The copper-glass tower photo (hero6.jpg) it replaced moved to the
          Services opening. Same box as the photo had: full bleed from 900px, running down under
          01 Record. */}
        <div className="ds-hero-photo ds-hero-topo" aria-hidden="true">
          <picture className="ds-hero-topo-still">
            <source media="(min-width: 900px)" srcSet={TOPO_STILL.srcSet} sizes="100vw" width={TOPO_STILL.width} height={TOPO_STILL.height} />
            {/* Lazy: hidden while the terrain runs, so it is only fetched where it shows. */}
            <img {...responsive('/images/hero-topo/terrain-phone.webp', '100vw')} alt="" loading="lazy" decoding="async" />
          </picture>
          {live && <Suspense fallback={null}><Topography
            onReady={onDrawn}
            camera={camera}
            color="#7a3c17"
            lineCount={22}
            lineWidth={1.2}
            // Elevation 0.5 (owner, 2026-10-15; was 1.15, then 0.65). Desktop's smaller landforms
            // scale the height down with them (0.5 x 0.55), or the hills keep their old steepness.
            // Desktop (owner, 2026-10-15): zoomed out a tad (0.65; was 0.55, then 0.75) with rounder,
            // lower hills (the height scaled with it) and less fine detail, like Colorado's rolling
            // high plains, not busy or pointy.
            elevation={wide ? 0.26 : 0.5}
            scale={wide ? 0.65 : 1}
            detail={wide ? 0.12 : 0.35}
            foreground={0.2}
            tilt={32}
            speed={0.25}
            direction="forward"
            glow={0.6}
            depthOfField={0.4}
            // Less distance fog (owner, 2026-10-15; was 0.35), so the far land reaches up behind the nav.
            fog={0.12}
            hoverEffect="lift"
            clickEffect="pulse"
          /></Suspense>}
        </div>

      <div className="ds-container">
        <div ref={copyRef} className="ds-hero-copy">
          {/* Each word in a mask of its own, so the load-in can raise it into place (the text
              reads as one line to every reader and crawler). */}
          <h1 id="hero-title" className="ds-display-xl">
            {heroTitle(hero.title)
              .split(' ')
              .map((w, i, all) => (
                <span key={i}>
                  <span className="ds-hero-w" style={{ '--i': i } as CSSProperties}>
                    <span>{w}</span>
                  </span>
                  {i < all.length - 1 ? ' ' : ''}
                </span>
              ))}
          </h1>
          <p ref={leadRef} className="ds-lead">{hero.lead}</p>
          {/* Below 1024px only: from there up the nav carries the quote button. */}
          <div className="ds-actions ds-hero-actions">
            <Link to="/contact" className="ds-btn ds-btn-primary">
              Request a Quote
              <Arrow />
            </Link>
            {/* No call link here (owner, 2026-10-13): the nav's handset and menu carry the phone. */}
          </div>
          {/* The proof row (audit): one line each, every one checkable on the linked page. */}
          <ul className="ds-hero-proof" aria-label="Proof">
            {/* Each line's words in a span of their own, so the load-in can bring them up after
                the hairline above them has drawn. */}
            <li style={{ '--i': 0 } as CSSProperties}>
              <span className="ds-hero-proof-t">
                <span>GSA MAS</span>{' '}
                <a href={GSA_ELIBRARY} target="_blank" rel="noopener noreferrer" className="ds-data">
                  47QSMS25D009Q
                  <Arrow external size={12} />
                </a>
              </span>
            </li>
            {/* Quiet facts, not links; GSA is the only route (copy audit round 3). */}
            <li style={{ '--i': 1 } as CSSProperties}><span className="ds-hero-proof-t">Minority woman-owned (WOSB, WBENC)</span></li>
            <li style={{ '--i': 2 } as CSSProperties}><span className="ds-hero-proof-t">Licensed in Colorado Springs, Denver, Pueblo</span></li>
          </ul>
        </div>
      </div>
    </section>
  );
}
