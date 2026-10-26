import { useEffect, useRef, useState } from 'react';
import { LiquidGlassLogo, type LiquidGlassLogoHandle } from '../liquid-glass-logo';

// The Ares mark in glass, in the phone hero's window (owner, 2026-10-25). ReactDrops' Liquid Glass
// Logo (src/components/liquid-glass-logo*, installed unchanged; identical to the registry's 0.1.0)
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
const LOGO_SCALE = 0.93;
const DONE = 2.6; // seconds into the sequence: the glass has cleared and the settle waves have died

export default function SvGlassMark() {
  const glass = useRef<LiquidGlassLogoHandle>(null);
  const [paused, setPaused] = useState(true);
  const [shown, setShown] = useState(false);
  const [done, setDone] = useState(false);
  const box = useRef<HTMLDivElement>(null);
  const [fit, setFit] = useState(1);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const measure = () =>
      setFit(Math.min(1, el.clientWidth / (LOGO_SIZE * 1.9), el.clientHeight / (LOGO_SIZE * 1.5)));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    let timer = 0;
    const start = () => {
      window.removeEventListener('scroll', onScroll);
      setShown(true);
      glass.current?.replay();
      setPaused(false);
      timer = window.setTimeout(() => setDone(true), DONE * 1000);
    };
    const onScroll = () => {
      if (window.scrollY > 2) start();
    };
    if (window.scrollY > 2) start();
    else window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.clearTimeout(timer);
    };
  }, []);

  return (
    <div ref={box} className="sv-glass-in" data-shown={shown} data-done={done}>
      <LiquidGlassLogo
        ref={glass}
        logo='/images/ares-text.svg'
        logoSize={LOGO_SIZE}
        ending='logo'
        logoScale={LOGO_SCALE}
        background='#00000000'
        tile={false}
        paused={paused}
        aria-label='Ares Security'
        style={{ height: '100%', minHeight: 0 }}
      />
      <span className="sv-glass-crisp" aria-hidden="true" style={{ width: LOGO_SIZE * LOGO_SCALE * fit }} />
    </div>
  );
}
