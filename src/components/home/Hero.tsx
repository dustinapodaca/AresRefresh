import { lazy, Suspense, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Arrow from '../Arrow';
import PhoneIcon from '../PhoneIcon';
import { GSA_ELIBRARY } from './links';
import { responsive } from '../../lib/responsive';
import { terrainMode } from '../../lib/terrainSupport';
import { motionAllowed, useScene, SCRUB } from './engine';

// Hero, "The ground" (home-flora, 2026-10-20). One visual, no floating images (owner): the
// headline is cut out of the black, a window onto the rust terrain moving behind it. Scrolling
// holds the screen, lifts the copy away, and flies the camera into the F of "Front" until the
// stroke fills the window and the land is all there is; then the land dims under 01 Record.
//
// How the window works: the ground (a rust light with the terrain screened over it) sits under a
// black layer that holds the headline in white with mix-blend-mode: multiply. Black times the
// ground is black; white times the ground is the ground. The h1 is real text throughout.

const Topography = lazy(() => import('./Topography'));
const STILL = responsive('/images/hero-topo/terrain-desktop.webp');
const TEL = 'tel:+17196963966';
// The most the headline layer is ever scaled on the fly-in (see measure()).
const MAX_ZOOM = 40;

type Control = { current: Record<string, unknown> & { wake?: () => void } };

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const [live, setLive] = useState(false);
  const [wide, setWide] = useState(false);
  const control = useRef<Control>({ current: {} }).current;

  useLayoutEffect(() => {
    const html = document.documentElement;
    if (!html.dataset.terrain) html.dataset.terrain = terrainMode();
    setLive(html.dataset.terrain === 'live');
    setWide(window.matchMedia('(min-width: 900px)').matches);
    // Arm the load-in before the first paint, only where motion runs; the prerender and reduced
    // motion keep the lit headline from the start.
    if (motionAllowed()) ref.current?.setAttribute('data-arm', 'true');
  }, []);

  // The headline settles in on first paint (CSS); the motion version is armed by the engine.
  useEffect(() => {
    const id = requestAnimationFrame(() => ref.current?.setAttribute('data-in', 'true'));
    // After the load-in (its last step ends about 2.3s in), drop its transitions so they never
    // smooth or delay the scroll's own motion.
    const done = window.setTimeout(() => {
      if (ref.current?.dataset.in === 'true') ref.current.dataset.in = 'done';
    }, 2600);
    return () => {
      cancelAnimationFrame(id);
      window.clearTimeout(done);
    };
  }, []);

  useScene(ref, ({ gsap, ScrollTrigger }, root) => {
    const stage = root.querySelector<HTMLElement>('.nx-hero-stage')!;
    const mask = root.querySelector<HTMLElement>('.nx-hero-mask')!;
    const title = root.querySelector<HTMLElement>('.nx-hero-title')!;
    const fly = root.querySelector<HTMLElement>('.nx-fly')!;
    const copy = root.querySelectorAll<HTMLElement>('.nx-hero-copy .nx-hero-lift');
    const cue = root.querySelector<HTMLElement>('.nx-hero-cue')!;
    const ground = root.querySelector<HTMLElement>('.nx-hero-ground')!;

    // Where to fly: the middle of the F's stem, and how far to scale. Capped (2026-10-20): the
    // full-window stroke took about 210x, and Chrome on a Mac dropped tiles of a layer that big
    // (the headline came back as a fragment and the nav blanked). The black fades out while it
    // grows, so the land is all there is without the stroke having to cover the window.
    let px = 0;
    let py = 0;
    let scale = 60;
    const measure = () => {
      gsap.set(mask, { clearProps: 'transform' });
      const m = mask.getBoundingClientRect();
      const f = fly.getBoundingClientRect();
      const size = parseFloat(getComputedStyle(title).fontSize);
      px = f.left - m.left + size * 0.15;
      py = f.top - m.top + f.height * 0.56;
      const stem = size * 0.13;
      scale = Math.min(MAX_ZOOM, (window.innerWidth * 1.1) / stem);
      mask.style.transformOrigin = `${px}px ${py}px`;
    };
    measure();

    const tl = gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: {
        trigger: root,
        start: 'top top',
        end: '+=140%',
        pin: stage,
        scrub: SCRUB,
        invalidateOnRefresh: true,
        onRefreshInit: measure,
        onUpdate: (self) => {
          // The camera pitches down and speeds up as we dive in.
          const p = self.progress;
          // Once the reader scrolls, the scroll owns the copy: end the load-in's transitions.
          if (p > 0 && root.dataset.in === 'true') root.dataset.in = 'done';
          control.current.tilt = 32 + 30 * p;
          control.current.speed = 0.25 + 1.4 * p * p;
          control.current.wake?.();
        },
      },
    });
    // From explicit values, not whatever the load-in had reached: scrolling before it finished
    // recorded the copy half faded (or hidden), and scrolling back up returned it to that.
    tl.fromTo(copy, { yPercent: 0, opacity: 1 }, { yPercent: -40, opacity: 0, stagger: 0.04, duration: 0.25, immediateRender: false }, 0)
      .to(
        mask,
        {
          scale: () => scale,
          // Bring the stem's middle to the middle of the window while it grows (the stage is
          // pinned at the top-left of the window).
          x: () => window.innerWidth / 2 - px,
          y: () => stage.clientHeight / 2 - py,
          duration: 0.8,
          ease: 'power2.in',
          force3D: true,
        },
        0.08,
      )
      // autoAlpha: hidden once faded, so the browser stops drawing the zoomed layer.
      .to(mask, { autoAlpha: 0, duration: 0.24 }, 0.6)
      .to(ground, { opacity: 0.22, duration: 0.2 }, 0.8);

    // The Scroll cue goes first (owner, 2026-10-22): gone over the first 160px at any screen height.
    gsap.fromTo(
      cue,
      { opacity: 1 },
      { opacity: 0, ease: 'none', immediateRender: false, scrollTrigger: { trigger: root, start: 'top top', end: '+=160', scrub: SCRUB } },
    );

    return () => ScrollTrigger.refresh();
  });

  return (
    <section ref={ref} className="nx-hero" aria-labelledby="nx-hero-title">
      <div className="nx-hero-stage">
        <div className="nx-hero-ground" aria-hidden="true">
          <div className="nx-hero-light" />
          <picture className="nx-hero-still">
            <source media="(min-width: 900px)" srcSet={STILL.srcSet} sizes="100vw" />
            <img {...responsive('/images/hero-topo/terrain-phone.webp', '100vw')} alt="" decoding="async" />
          </picture>
          {live && (
            <Suspense fallback={null}>
              <Topography
                color="#9c4f22"
                lineCount={26}
                lineWidth={1.4}
                elevation={wide ? 0.3 : 0.5}
                scale={wide ? 0.7 : 1}
                detail={wide ? 0.14 : 0.35}
                foreground={0.2}
                tilt={32}
                speed={0.25}
                direction="forward"
                glow={0.9}
                brightness={1.5}
                depthOfField={0.3}
                fog={0.1}
                hoverEffect="lift"
                clickEffect="pulse"
                control={control}
              />
            </Suspense>
          )}
        </div>

        <div className="nx-hero-mask">
          <h1 id="nx-hero-title" className="nx-hero-title">
            Security officers for Colorado’s{' '}
            <span className="nx-nowrap">
              <span className="nx-fly">F</span>ront Range
            </span>
          </h1>
        </div>

        <div className="nx-hero-copy">
          <p className="nx-hero-lead nx-hero-lift">
            From restricted areas and critical sites to offices and campuses: officers trained on your
            post before the first shift.
          </p>
          <div className="nx-hero-actions nx-hero-lift">
            <Link to="/contact" className="ds-btn ds-btn-primary">
              Request a Quote
              <Arrow />
            </Link>
            <a href={TEL} className="ds-link nx-hero-call">
              <PhoneIcon />
              719-696-3966
            </a>
          </div>
          <ul className="nx-hero-proof nx-hero-lift" aria-label="Proof">
            <li>
              <span>GSA MAS</span>{' '}
              <a href={GSA_ELIBRARY} target="_blank" rel="noopener noreferrer" className="ds-data">
                47QSMS25D009Q
                <Arrow external size={12} />
              </a>
            </li>
            <li>Minority woman-owned (WOSB, WBENC)</li>
            <li>Licensed in Colorado Springs, Denver, Pueblo</li>
          </ul>
        </div>
        <p className="nx-hero-cue ds-data nx-hero-lift" aria-hidden="true">
          Scroll
        </p>
      </div>
    </section>
  );
}
