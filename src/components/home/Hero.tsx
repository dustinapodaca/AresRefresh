import { lazy, Suspense, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Arrow from '../Arrow';
import PhoneIcon from '../PhoneIcon';
import { GSA_ELIBRARY } from './links';
import { responsive } from '../../lib/responsive';
import { terrainMode } from '../../lib/terrainSupport';
import { motionAllowed, useScene, SCRUB } from './engine';
import type { LiquidGlassLogoHandle } from '../liquid-glass-logo/liquid-glass-logo';

// Hero, "The ground" (home-flora, 2026-10-20). One visual, no floating images (owner): the
// headline is cut out of the black, a window onto the rust terrain moving behind it. Scrolling
// holds the screen, lifts the copy away, and flies the camera into the F of "Front" until the
// stroke fills the window and the land is all there is; then the land dims under 01 Record.
//
// How the window works: the ground (a rust light with the terrain screened over it) sits under a
// black layer that holds the headline in white with mix-blend-mode: multiply. Black times the
// ground is black; white times the ground is the ground. The h1 is real text throughout.

const Topography = lazy(() => import('./Topography'));
// The title card's mark forms as liquid glass (owner, 2026-10-25; ReactDrops "Liquid Glass Logo"):
// a droplet becomes a glass tile, then the glass and its waves clear, leaving the white mark at its
// normal size. Driven by the scroll, not a clock. Loaded only where the scroll scene runs.
const LiquidGlassLogo = lazy(() => import('../liquid-glass-logo/liquid-glass-logo').then((m) => ({ default: m.LiquidGlassLogo })));
// The glass sequence's length when it ends on the logo (logoFinishTime in the renderer), and the
// share of the renderer's logo box the logo fills (logoScale).
const GLASS_END = 1.8;
const GLASS_LOGO_SCALE = 0.72;
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
  // The glass mark: on where the scroll scene runs, sized from the title card's mark.
  const [glass, setGlass] = useState(false);
  const [markH, setMarkH] = useState(0);
  const glassRef = useRef<LiquidGlassLogoHandle>(null);

  useLayoutEffect(() => {
    const html = document.documentElement;
    if (!html.dataset.terrain) html.dataset.terrain = terrainMode();
    setLive(html.dataset.terrain === 'live');
    setWide(window.matchMedia('(min-width: 900px)').matches);
    // Arm the load-in before the first paint, only where motion runs; the prerender and reduced
    // motion keep the lit headline from the start.
    if (motionAllowed()) ref.current?.setAttribute('data-arm', 'true');
    setGlass(motionAllowed());
  }, []);

  // The mark's height, for the glass's logo size (the card is sized in CSS from the window).
  useEffect(() => {
    if (!glass) return;
    const card = ref.current?.querySelector<HTMLElement>('.nx-hero-card');
    if (!card) return;
    const read = () => setMarkH(card.offsetHeight);
    read();
    const ro = new ResizeObserver(read);
    ro.observe(card);
    return () => ro.disconnect();
  }, [glass]);

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
    const card = root.querySelector<HTMLElement>('.nx-hero-card')!;

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
      // The glass mark follows the scrubbed timeline: the droplet forms as the card comes up (0.7)
      // and the mark has settled before the beat ends (0.98), in both directions.
      onUpdate: () => {
        const t = Math.max(0, Math.min(1, (tl.time() - 0.7) / 0.28));
        glassRef.current?.seek(t * GLASS_END);
      },
      scrollTrigger: {
        trigger: root,
        start: 'top top',
        end: '+=165%',
        pin: stage,
        scrub: SCRUB,
        invalidateOnRefresh: true,
        onRefreshInit: measure,
        onUpdate: (self) => {
          // The camera pitches down and speeds up as we dive in.
          const p = self.progress;
          // Once the reader scrolls, the scroll owns the copy.
          if (p > 0.002) attachCopy();
          control.current.tilt = 32 + 30 * p;
          control.current.speed = 0.25 + 1.4 * p * p;
          control.current.wake?.();
        },
      },
    });
    tl.to(
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
      // The Ares mark in white, dead center, once most of the land shows (owner, 2026-10-22: like a
      // title card in a film), then a beat on it before the stage lets go.
      .fromTo(card, { autoAlpha: 0, scale: 0.94 }, { autoAlpha: 1, scale: 1, duration: 0.14, ease: 'power1.out' }, 0.72)
      .to({}, { duration: 0.18 }, 0.86);

    // The land and the mark scroll away together, the land dimming as it goes (it dimmed under the
    // pin before the mark, which would have swallowed it), and a shade rising from its foot so
    // its lower edge melts into the black below instead of a hard line.
    const away = { trigger: root, start: 'bottom bottom', end: 'bottom top', scrub: SCRUB };
    gsap.fromTo(ground, { opacity: 1 }, { opacity: 0.22, ease: 'none', immediateRender: false, scrollTrigger: away });
    gsap.fromTo(root.querySelector('.nx-hero-foot'), { opacity: 0 }, { opacity: 1, ease: 'power1.out', immediateRender: false, scrollTrigger: { ...away, end: 'bottom 75%' } });

    // The copy joins the scroll only once the load-in has finished, or at the first scroll if that
    // comes first (2026-10-22): built mid-load-in (arriving on Home from another page), GSAP
    // recorded the button and proof half faded and held them at opacity 0 until the reader
    // scrolled. So the load-in ends first, then the tweens start from the copy fully shown.
    let attached = false;
    const later = gsap.context(() => {}, root);
    function attachCopy() {
      if (attached) return;
      attached = true;
      root.dataset.in = 'done';
      tl.fromTo(copy, { yPercent: 0, opacity: 1 }, { yPercent: -40, opacity: 0, stagger: 0.04, duration: 0.25, immediateRender: false }, 0);
      tl.render(tl.time(), false, true);
      // The Scroll cue goes first (owner, 2026-10-22): gone over the first 160px at any screen height.
      later.add(() => {
        gsap.fromTo(
          cue,
          { opacity: 1 },
          { opacity: 0, ease: 'none', immediateRender: false, scrollTrigger: { trigger: root, start: 'top top', end: '+=160', scrub: SCRUB } },
        );
      });
    }
    if (root.dataset.in === 'done') attachCopy();
    const watch = new MutationObserver(() => root.dataset.in === 'done' && attachCopy());
    watch.observe(root, { attributes: true, attributeFilter: ['data-in'] });

    return () => {
      watch.disconnect();
      later.revert();
      ScrollTrigger.refresh();
    };
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

        {/* The title card: the mark, and a second Scroll cue at its lower right (owner, 2026-10-22). */}
        <span className="nx-hero-card" aria-hidden="true">
          {glass && markH > 0 ? (
            <Suspense fallback={<span className="nx-hero-logo" />}>
              <span
                className="nx-hero-glass"
                style={{ width: (markH / GLASS_LOGO_SCALE) * 1.9, height: (markH / GLASS_LOGO_SCALE) * 1.5 }}
              >
                <LiquidGlassLogo
                  ref={glassRef}
                  logo="/images/ares-mark-white.svg"
                  ending="logo"
                  theme="dark"
                  paused
                  logoSize={Math.round(markH / GLASS_LOGO_SCALE)}
                  style={{ background: 'transparent', minHeight: 0 }}
                  aria-label=""
                />
              </span>
            </Suspense>
          ) : (
            <span className="nx-hero-logo" />
          )}
          <span className="nx-hero-card-cue ds-data">Scroll</span>
        </span>
        <span className="nx-hero-foot" aria-hidden="true" />

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
              {/* The GSA mark (owner, 2026-10-23): the official logo, cropped to its square, 96px for 3x screens. */}
              <img className="nx-hero-gsa" src="/images/gsa-mark.webp" alt="" width={16} height={16} decoding="async" />
              <span>GSA MAS</span>{' '}
              <a href={GSA_ELIBRARY} target="_blank" rel="noopener noreferrer" className="ds-data">
                47QSMS25D009Q
                <Arrow external size={12} />
              </a>
            </li>
            <li>Minority woman-owned (WOSB, WBENC, M/WBE)</li>
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
