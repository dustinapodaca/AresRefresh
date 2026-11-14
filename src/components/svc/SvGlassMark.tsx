import { useEffect, useRef, useState } from 'react';
import { LiquidGlassLogo, type LiquidGlassLogoHandle } from '../liquid-glass-logo';

// The Ares mark in glass, in the phone hero's window (owner, 2026-10-25). ReactDrops' Liquid Glass
// Logo (src/components/liquid-glass-logo*, the registry's 0.1.0, unchanged but for the `stretch` and
// `stretchY` settings we added on 2026-10-26 for a rectangular plate; they default to 0, the original
// square)
// with ReactDrops' own setup for it (owner, 2026-10-25: "try it like this instead", replacing the
// glass card held mid-sequence): the sphere-to-tile glass entrance plays through, then the glass
// clears and leaves the original mark alone at its normal size, white on the dark setting, at
// logoScale 0.93, with no second text reveal. The ARES / SECURITY text logo (owner, 2026-10-25; was
// the mark), on a 288px tile (was the default 256 fitted down to about 184 by the window's width).
// The page behind is set to black for the shader (its dark-page fade); the canvas stays transparent
// around the glass, so the towers show. The glass plate is see-through (tile off; owner, 2026-10-26,
// after ReactDrops' backgroundImage setup, which turns the plate off the same way): the towers show
// through the glass as it forms, keeping its bevel, refraction, and chromatic edges, instead of a
// dark navy tile hiding them.
//
// Nothing shows until the reader first scrolls (owner, 2026-10-25: it came in on load); then it plays
// once. A page opened already scrolled starts it at once. Reduced motion: the component shows its
// own still ending (the mark alone) on that first scroll, and without WebGL its image fallback.
//
// Crisp at the end (owner, 2026-10-25): the canvas draws the logo from a bitmap at no more than 2x, so
// it read soft on a phone. Once the sequence has settled (DONE), the real SVG takes its place, set at
// the size and spot the canvas leaves it, with a short crossfade. The canvas shrinks the logo to fit
// its box (the renderer's fit(): room for the side reflections across, 1.5 tiles down), so the SVG
// takes the same fit, measured whenever the box changes (owner, 2026-10-25: on a short phone it landed
// far bigger than the canvas had drawn it).
const LOGO_SIZE = 288;
// Desktop (owner, 2026-11-13): the same sequence in the framed window the aperture closes to, played as
// soon as it mounts (SvHero mounts it once the window has closed in past the headline), the logo larger.
const LOGO_SIZE_DESK = 340;
// Desktop: not the whole window (owner, 2026-11-13: smaller, and the big canvas bogged down): a plate a
// little wider than the logo, on a canvas just big enough for the renderer (cn: .sv-glass, svc.css).
const PLATE_DESK = 470;
const LOGO_SCALE = 0.93;
// The glass plate fills the window it sits in, whatever the phone (owner, 2026-10-26; was a square
// 24px wider a side). The plate grows to about 1.05 of its resting size while the glass shows (the
// shader's expand), so it is sized to the window at that size, not past it.
const GLASS_SWELL = 1.05;
// No back wall or nested lines inside the rim (owner, 2026-11-13: they read as a border ~20px in); the
// `walls` setting we added to the component, 0 here, one pane with a single rim.
// Squarer corners than the component's own rounded square (5), nearer the window's 4px (owner, 2026-10-26).
const CORNER = 18;
// How far .sv-glass runs past the window above and below (svc.css).
const ROOM_Y = 40;
const DONE = 2.6; // seconds into the sequence: the glass has cleared and the settle waves have died
// The glass itself is done here (the renderer's logo finish), so the page may move on (SvHero holds it on
// desktop until then; owner, 2026-11-13: release as soon as the glass is done, not after the crisp swap).
const GLASS_DONE = 1.8;

export default function SvGlassMark({ mode = 'phone', onDone }: { mode?: 'phone' | 'desktop'; onDone?: () => void }) {
  const desk = mode === 'desktop';
  const size = desk ? LOGO_SIZE_DESK : LOGO_SIZE;
  const glass = useRef<LiquidGlassLogoHandle>(null);
  const [paused, setPaused] = useState(true);
  const [shown, setShown] = useState(false);
  const [done, setDone] = useState(false);
  const box = useRef<HTMLDivElement>(null);
  const [fit, setFit] = useState(1);
  const [stretch, setStretch] = useState<[number, number]>([0, 0]);

  // The renderer's fit (the logo's size in its box), and the stretch that takes the plate out to the
  // window: the stage less its side padding across, the box less its room above and below down.
  useEffect(() => {
    const el = box.current;
    const stage = el?.closest<HTMLElement>('.sv-hero-stage');
    if (!el || !stage) return;
    const measure = () => {
      const f = Math.min(1, el.clientWidth / (size * 1.9), el.clientHeight / (size * 1.5));
      const unit = size * f;
      // Phones: the stage less its side padding (the box runs past the window for the reflections).
      // Desktop: a plate a little wider than the logo, square in height.
      const w = desk ? PLATE_DESK * f : stage.clientWidth - 2 * (parseFloat(getComputedStyle(stage).paddingLeft) || 0);
      const h = desk ? 0 : el.clientHeight - 2 * ROOM_Y;
      const side = (size: number) => Math.max(0, (size / GLASS_SWELL - unit) / (2 * unit));
      setFit(f);
      setStretch([side(w), side(h)]);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    ro.observe(stage);
    return () => ro.disconnect();
  }, [desk, size]);

  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;
  useEffect(() => {
    let timer = 0;
    let doneTimer = 0;
    const start = () => {
      window.removeEventListener('scroll', onScroll);
      setShown(true);
      glass.current?.replay();
      setPaused(false);
      timer = window.setTimeout(() => setDone(true), DONE * 1000);
      doneTimer = window.setTimeout(() => onDoneRef.current?.(), GLASS_DONE * 1000);
    };
    const onScroll = () => {
      if (window.scrollY > 2) start();
    };
    if (desk || window.scrollY > 2) start();
    else window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.clearTimeout(timer);
      window.clearTimeout(doneTimer);
    };
  }, [desk]);

  return (
    <div ref={box} className="sv-glass-in" data-shown={shown} data-done={done}>
      <LiquidGlassLogo
        ref={glass}
        logo='/images/ares-text.svg'
        logoSize={size}
        ending='logo'
        logoScale={LOGO_SCALE}
        stretch={stretch[0]}
        stretchY={stretch[1]}
        corner={CORNER}
        walls={0}
        background='#00000000'
        tile={false}
        paused={paused}
        aria-label='Ares Security'
        style={{ height: '100%', minHeight: 0 }}
      />
      <span className="sv-glass-crisp" aria-hidden="true" style={{ width: size * LOGO_SCALE * fit }} />
    </div>
  );
}
