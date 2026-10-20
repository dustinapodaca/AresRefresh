import { lazy, Suspense, useEffect, useRef, useState, type CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import Arrow from '../Arrow';
import PhoneIcon from '../PhoneIcon';
import CredentialStrip from '../home/CredentialStrip';
import { GSA_ELIBRARY } from '../home/links';
import { responsive } from '../../lib/responsive';
import { terrainMode } from '../../lib/terrainSupport';
import { useMediaQuery } from '../home/useMediaQuery';
import { useScene } from '../home/motion';
import { Node } from './objects';

// 4.1 The ground (owner, 2026-10-19; /home-next). The headline at the foot of a full-screen terrain
// (desktop: the page's one fixed ground, Ground.tsx; phones: the live terrain in the hero's own box;
// a still frame wherever it can't run), the lead beneath it with a quiet call link, and floating
// evidence Nodes around it at different depths, each a real, checkable item, never over the headline.
// The three proof lines live in those Nodes now (no separate proof row). At its foot, the
// certification marks run as a slow marquee at every width.
// Motion: the headline's lines rise from their masks, then the lead, then the rust point (where the
// page's one line begins) blinks on and the Nodes come up (CSS, from the first paint; index.html's
// <noscript> style and reduced motion show it all at once). The Nodes lean with the cursor by their
// depth, and fly past the camera as the hero leaves, near ones first.

const Topography = lazy(() => import('../home/Topography'));
const STILL_D = responsive('/images/hero-topo/terrain-desktop.webp');

type Ev = {
  key: string;
  label: string;
  meta?: string;
  /** Position (desktop, % of the hero) and depth (0 far to 1 near). */
  x: number;
  y: number;
  depth: number;
  w: number;
  photo?: { src: string; alt: string; ratio: string; pos?: string };
  text?: string;
  href?: string;
  to?: string;
  cursor?: string;
  /** Shown on phones, peeking from the top corners. */
  phone?: boolean;
};

const EVIDENCE: Ev[] = [
  { key: 'gsa', label: 'GSA MAS', meta: 'SIN 561612', x: 7, y: 14, depth: 0.55, w: 240, text: '47QSMS25D009Q', href: GSA_ELIBRARY, cursor: 'VIEW ON ELIBRARY', phone: true },
  { key: 'peak', label: 'Pikes Peak', meta: 'Colorado Springs', x: 32, y: 11, depth: 0.25, w: 250, photo: { src: '/images/about-hero.jpg', alt: 'Pikes Peak and the Garden of the Gods, Colorado Springs', ratio: '4 / 3', pos: '50% 60%' } },
  { key: 'woman', label: 'Minority woman-owned', meta: 'WOSB, WBENC', x: 7, y: 36, depth: 0.8, w: 290, text: 'WOSB250470 · WBE2303571', to: '/capability-statement', cursor: 'OPEN PAGE', phone: true },
  { key: 'patrol', label: 'Patrol', meta: 'Colorado Springs', x: 58, y: 9, depth: 0.95, w: 280, photo: { src: '/images/mission-vehicle.jpg', alt: 'Two marked Ares Security patrol vehicles', ratio: '16 / 10', pos: '50% 76%' } },
  { key: 'officer', label: 'Officers on post', meta: 'Ares Security', x: 80, y: 20, depth: 0.45, w: 240, photo: { src: '/images/officer-portrait.jpg', alt: 'An Ares Security officer in uniform', ratio: '4 / 5', pos: '50% 30%' } },
  { key: 'licensed', label: 'Licensed', meta: 'City licenses', x: 36, y: 37, depth: 0.35, w: 300, text: 'Colorado Springs, Denver, Pueblo', phone: true },
  { key: 'shifts', label: 'Missed shifts', meta: 'Since 2021', x: 82, y: 64, depth: 0.7, w: 230, text: 'Fewer than 1%' },
];

export default function HeroNext() {
  const wide = useMediaQuery('(min-width: 900px)', false);
  const sectionRef = useRef<HTMLElement>(null);
  // Phones keep the live terrain in the hero's own box (desktop draws the page's fixed ground).
  const [phoneTerrain, setPhoneTerrain] = useState(false);
  useEffect(() => {
    setPhoneTerrain(!wide && terrainMode() === 'live');
  }, [wide]);

  useScene(sectionRef, ({ gsap }, root) => {
    const nodes = Array.from(root.querySelectorAll<HTMLElement>('.hn-ev'));
    const mm = gsap.matchMedia();
    mm.add('(min-width: 900px)', () => {
      // Fly past the camera: near Nodes grow and drift outward off the screen first, far ones later.
      const rect = root.getBoundingClientRect();
      nodes.forEach((n) => {
        const depth = Number(n.dataset.depth);
        const r = n.getBoundingClientRect();
        const dx = r.left + r.width / 2 - rect.width / 2;
        const dy = r.top + r.height / 2 - rect.height * 0.45;
        gsap.fromTo(
          n,
          { scale: 1, x: 0, y: 0, opacity: 1 },
          {
            scale: 1 + depth * 1.6,
            x: dx * (0.6 + depth * 1.4),
            y: dy * (0.6 + depth * 1.4) - 120,
            opacity: 0,
            ease: 'none',
            scrollTrigger: { trigger: root, start: 'top top', end: () => `+=${window.innerHeight * (1.15 - depth * 0.55)}`, scrub: true },
          },
        );
      });
    });
    // The cursor: each Node leans by its depth (near about 24px, far about 6px), smoothed.
    let raf = 0, tx = 0, ty = 0, cx = 0, cy = 0;
    const fine = window.matchMedia('(min-width: 900px) and (hover: hover) and (pointer: fine)').matches;
    const tick = () => {
      raf = 0;
      cx += (tx - cx) * 0.08;
      cy += (ty - cy) * 0.08;
      nodes.forEach((n) => {
        const d = 6 + Number(n.dataset.depth) * 18;
        (n.firstElementChild as HTMLElement).style.translate = `${(cx * d).toFixed(2)}px ${(cy * d).toFixed(2)}px`;
      });
      if (Math.abs(tx - cx) > 0.001 || Math.abs(ty - cy) > 0.001) raf = requestAnimationFrame(tick);
    };
    const onMove = (e: PointerEvent) => {
      tx = e.clientX / window.innerWidth - 0.5;
      ty = e.clientY / window.innerHeight - 0.5;
      if (!raf) raf = requestAnimationFrame(tick);
    };
    if (fine) window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onMove);
      cancelAnimationFrame(raf);
      mm.revert();
    };
  });

  return (
    <section ref={sectionRef} id="hn-hero" className="hn-hero" data-arm aria-labelledby="hn-title">
      {/* The hero's own ground: the still (desktop without the fixed ground, reduced motion, the
          prerender), or on phones the live terrain. */}
      <div className="hn-hero-ground" aria-hidden="true">
        <picture className="hn-hero-still">
          <source media="(min-width: 900px)" srcSet={STILL_D.srcSet} sizes="100vw" width={STILL_D.width} height={STILL_D.height} />
          <img {...responsive('/images/hero-topo/terrain-phone.webp', '100vw')} alt="" decoding="async" />
        </picture>
        {phoneTerrain && (
          <Suspense fallback={null}>
            <Topography color="#7a3c17" lineCount={22} lineWidth={1.2} elevation={0.5} scale={1} detail={0.35} foreground={0.2} tilt={32} speed={0.25} direction="forward" glow={0.6} depthOfField={0.4} fog={0.12} hoverEffect="lift" clickEffect="pulse" />
          </Suspense>
        )}
      </div>

      <div className="hn-ev-field">
        {EVIDENCE.map((e, i) => (
          <div
            key={e.key}
            className="hn-ev"
            data-depth={e.depth}
            data-phone={e.phone ? 'true' : undefined}
            style={{ '--x': `${e.x}%`, '--y': `${e.y}%`, '--w': `${e.w}px`, '--i': i } as CSSProperties}
          >
            <div className="hn-ev-in">
              <Node label={e.label} meta={e.meta} status={e.key === 'shifts' ? 'active' : 'idle'} href={e.href} to={e.to} cursor={e.cursor} kind={e.photo ? 'photo' : 'text'}>
                {e.photo ? (
                  <span className="hn-ev-photo" style={{ aspectRatio: e.photo.ratio }}>
                    <img {...responsive(e.photo.src, `${e.w}px`)} alt={e.photo.alt} loading="lazy" decoding="async" className="hn-grade" style={{ objectPosition: e.photo.pos }} />
                  </span>
                ) : (
                  <span className={e.key === 'gsa' || e.key === 'woman' ? 'hn-ev-text ds-data' : 'hn-ev-text'}>{e.text}</span>
                )}
              </Node>
            </div>
          </div>
        ))}
      </div>

      <div className="ds-container hn-hero-copy">
        {/* Two lines on desktop, each rising from its own mask. */}
        <h1 id="hn-title" className="hn-hero-title">
          <span className="hn-line"><span>Security officers for</span></span>{' '}
          <span className="hn-line"><span>Colorado’s Front Range</span></span>
        </h1>
        <div className="hn-hero-under">
          <p className="ds-lead hn-hero-lead">
            From restricted areas and critical sites to offices and campuses: officers trained on your post before the first shift.
          </p>
          <a href="tel:+17196963966" className="hn-call" data-cursor="CALL">
            <PhoneIcon size={18} />
            Call <span className="ds-data">719-696-3966</span>
          </a>
          {/* Below 1024px only: from there up the nav carries the quote button. */}
          <Link to="/contact" className="ds-btn ds-btn-primary hn-hero-quote">
            Request a Quote
            <Arrow />
          </Link>
        </div>
        {/* Where the page's one line begins: a location point under the headline. */}
        <i className="hn-hero-point" data-thread="start" aria-hidden="true" />
      </div>

      <div className="hn-marquee">
        <CredentialStrip />
      </div>
    </section>
  );
}
