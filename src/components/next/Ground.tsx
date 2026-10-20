import { lazy, Suspense, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { terrainMode } from '../../lib/terrainSupport';
import { useMotion, useScene } from '../home/motion';
import { useMediaQuery } from '../home/useMediaQuery';

// One ground (owner, 2026-10-19; Home reimagined, /home-next): the hero's terrain becomes the page's
// canvas, one fixed layer behind the whole page on desktop, and the scroll flies a camera over it.
// Each section is a waypoint: the camera's tilt, height, glide, and the land's brightness and
// flatness are eased between them by one ScrollTrigger, and two CSS layers ride along: a dot-grid
// plane (the canvas the teaming nodes sit on) and a dusk glow low on the horizon for the close.
// Sections with a full-bleed photo cover it, and it stops drawing while they do.
// Phones: no fixed WebGL; the hero keeps the live terrain in its own box and the other sections show
// still frames of the terrain as their backgrounds. Reduced motion, the prerender, and no JavaScript:
// stills only, no camera. <html data-ground="live"> marks the page while the fixed canvas runs.

const Topography = lazy(() => import('../home/Topography'));

export type Waypoint = {
  /** Element and ScrollTrigger start line that place this waypoint on the scroll. */
  at: string;
  line: string;
  tilt: number;
  height: number;
  glide: number;
  bright: number;
  flat: number;
  /** Dot-grid plane, dusk glow, and how fully a photo covers the canvas (1 = fully covered). */
  grid: number;
  dusk: number;
  cover: number;
};

// The choreography (owner's waypoint table, 2026-10-19).
const W = (at: string, line: string, v: Omit<Waypoint, 'at' | 'line'>): Waypoint => ({ at, line, ...v });
const HERO = { tilt: 32, height: 1, glide: 1, bright: 1, flat: 0, grid: 0, dusk: 0, cover: 0 };
export const WAYPOINTS: Waypoint[] = [
  W('#hn-hero', 'top top', HERO),
  // The record: the camera pitches down and the land darkens to a quiet ground under the numbers.
  W('#record', 'top 80%', { ...HERO, tilt: 46, height: 0.9, glide: 0.7, bright: 0.45 }),
  W('#record', 'top top', { ...HERO, tilt: 58, height: 0.85, glide: 0.4, bright: 0.15 }),
  // The sites: nearly black behind full-bleed photography, then covered while the scene is pinned.
  W('#industries', 'top 70%', { ...HERO, tilt: 58, height: 0.85, glide: 0.4, bright: 0.06 }),
  W('.hn-sites-scene', 'top 40%', { ...HERO, tilt: 58, height: 0.85, glide: 0.4, bright: 0.06, cover: 0 }),
  W('.hn-sites-scene', 'top top', { ...HERO, tilt: 58, height: 0.85, glide: 0.4, bright: 0.06, cover: 1 }),
  W('#industries', 'bottom bottom', { ...HERO, tilt: 58, height: 0.85, glide: 0.4, bright: 0.06, cover: 1 }),
  // For prime contractors: the land flattens to a dot-grid plane, the canvas for the nodes.
  W('#primes', 'top 85%', { tilt: 64, height: 1, glide: 0.3, bright: 0.25, flat: 0.6, grid: 0.4, dusk: 0, cover: 0 }),
  W('#primes', 'top 30%', { tilt: 70, height: 1.05, glide: 0.2, bright: 0.12, flat: 1, grid: 1, dusk: 0, cover: 0 }),
  W('#primes', 'bottom 70%', { tilt: 70, height: 1.05, glide: 0.2, bright: 0.12, flat: 1, grid: 1, dusk: 0, cover: 0 }),
  // Quality: hidden behind the full-bleed photo.
  W('#quality', 'top 60%', { tilt: 70, height: 1.05, glide: 0.2, bright: 0.1, flat: 0.8, grid: 0.2, dusk: 0, cover: 0 }),
  W('#quality', 'top top', { tilt: 70, height: 1.05, glide: 0.2, bright: 0.1, flat: 0.8, grid: 0, dusk: 0, cover: 0 }),
  W('#quality', 'top -70%', { tilt: 70, height: 1.05, glide: 0.2, bright: 0.1, flat: 0.8, grid: 0, dusk: 0, cover: 1 }),
  W('#quality', 'bottom 80%', { tilt: 70, height: 1.05, glide: 0.2, bright: 0.1, flat: 0.8, grid: 0, dusk: 0, cover: 1 }),
  // Where we work: the camera rises to straight overhead; the section cross-fades the land into
  // the authored map as it passes overhead.
  W('#coverage', 'top 85%', { tilt: 76, height: 1.2, glide: 0.25, bright: 0.6, flat: 0.3, grid: 0, dusk: 0, cover: 0 }),
  W('#coverage', 'top top', { tilt: 89, height: 1.5, glide: 0.1, bright: 0.75, flat: 0.15, grid: 0, dusk: 0, cover: 0 }),
  // As the map comes in over it, the land dims so the authored map reads as the same ground.
  W('#coverage', 'top -40%', { tilt: 89, height: 1.5, glide: 0.1, bright: 0.28, flat: 0.15, grid: 0, dusk: 0, cover: 0 }),
  W('#coverage', 'bottom 60%', { tilt: 89, height: 1.5, glide: 0.1, bright: 0.28, flat: 0.15, grid: 0, dusk: 0, cover: 0 }),
  // Careers: hidden behind the full-bleed photo.
  W('#careers', 'top 40%', { tilt: 60, height: 1.2, glide: 0.4, bright: 0.3, flat: 0, grid: 0, dusk: 0, cover: 1 }),
  W('#careers', 'bottom 60%', { tilt: 40, height: 1, glide: 0.6, bright: 0.5, flat: 0, grid: 0, dusk: 0.4, cover: 1 }),
  // The close and the footer: back to the hero's angle, at dusk. The page ends where it began.
  W('#contact', 'top 70%', { ...HERO, bright: 0.7, dusk: 0.8 }),
  W('#contact', 'center center', { ...HERO, bright: 0.85, dusk: 1 }),
];

const smooth = (t: number) => t * t * (3 - 2 * t);

export default function Ground() {
  const engine = useMotion();
  const wide = useMediaQuery('(min-width: 900px)', false);
  // The terrain's own check (WebGL2 with a real GPU, not automated, no reduced motion), decided
  // fresh on mount: the prerendered page carries the prerender's answer ("still").
  const [mode, setMode] = useState<'live' | 'still'>('still');
  useLayoutEffect(() => {
    const m = terrainMode();
    document.documentElement.dataset.terrain = m;
    setMode(m);
  }, []);
  const live = !!engine && wide && mode === 'live';
  useEffect(() => {
    const html = document.documentElement;
    if (live) html.dataset.ground = 'live';
    return () => {
      delete html.dataset.ground;
    };
  }, [live]);

  const camera = useRef<Record<string, unknown>>({ tilt: 32, height: 1, glide: 1, brightness: 1, flatten: 0, paused: false }).current;
  const ref = useRef<HTMLDivElement>(null);

  useScene(
    ref,
    ({ ScrollTrigger }, root) => {
      if (!live) return;
      const plane = root.querySelector<HTMLElement>('.hn-plane')!;
      const dusk = root.querySelector<HTMLElement>('.hn-dusk')!;
      const canvas = root.querySelector<HTMLElement>('.hn-ground-terrain')!;
      const marks = WAYPOINTS.map((w) => {
        const el = document.querySelector(w.at);
        return el ? { w, st: ScrollTrigger.create({ trigger: el, start: w.line }) } : null;
      }).filter(Boolean) as { w: Waypoint; st: ScrollTrigger }[];
      const keys = ['tilt', 'height', 'glide', 'bright', 'flat', 'grid', 'dusk', 'cover'] as const;
      const draw = (scroll: number) => {
        if (!marks.length) return;
        let a = marks[0];
        let b = marks[0];
        let t = 0;
        if (scroll >= marks[marks.length - 1].st.start) a = b = marks[marks.length - 1];
        else if (scroll > marks[0].st.start) {
          for (let i = 0; i < marks.length - 1; i++) {
            const s0 = marks[i].st.start;
            const s1 = marks[i + 1].st.start;
            if (scroll >= s0 && scroll < s1) {
              a = marks[i];
              b = marks[i + 1];
              t = smooth(s1 > s0 ? (scroll - s0) / (s1 - s0) : 1);
              break;
            }
          }
        }
        const v = Object.fromEntries(keys.map((k) => [k, a.w[k] + (b.w[k] - a.w[k]) * t])) as Record<(typeof keys)[number], number>;
        camera.tilt = v.tilt;
        camera.height = v.height;
        camera.glide = v.glide;
        camera.brightness = v.bright;
        camera.flatten = v.flat;
        plane.style.opacity = v.grid.toFixed(3);
        dusk.style.opacity = v.dusk.toFixed(3);
        canvas.style.opacity = (1 - v.cover).toFixed(3);
        // Nothing to draw while a photo covers the canvas; wake it as the photo leaves.
        const paused = v.cover > 0.995;
        if (paused !== camera.paused) {
          camera.paused = paused;
          if (!paused) (camera.wake as (() => void) | undefined)?.();
        }
      };
      const st = ScrollTrigger.create({ start: 0, end: 'max', onUpdate: (self) => draw(self.scroll()) });
      const onRefresh = () => draw(st.scroll());
      ScrollTrigger.addEventListener('refresh', onRefresh);
      onRefresh();
      return () => ScrollTrigger.removeEventListener('refresh', onRefresh);
    },
    [live],
  );

  if (!live) return null;
  return (
    <div ref={ref} className="hn-ground" aria-hidden="true">
      <div className="hn-ground-terrain">
        <Suspense fallback={null}>
          <Topography
            camera={camera}
            color="#7a3c17"
            lineCount={22}
            lineWidth={1.2}
            elevation={0.26}
            scale={0.65}
            detail={0.12}
            foreground={0.2}
            tilt={32}
            speed={0.25}
            direction="forward"
            glow={0.6}
            depthOfField={0.4}
            fog={0.12}
            hoverEffect="lift"
            clickEffect="none"
            dpr={Math.min(window.devicePixelRatio || 1, 1.5)}
          />
        </Suspense>
      </div>
      <div className="hn-plane" />
      <div className="hn-dusk" />
      <div className="hn-grain" />
    </div>
  );
}
