import { useEffect, useRef, useState } from 'react';
import { LiquidGlassLogo, type LiquidGlassLogoHandle } from '../liquid-glass-logo';

// The Ares mark in glass, in the middle of the phone hero's window (owner, 2026-10-25). ReactDrops'
// Liquid Glass Logo (src/components/liquid-glass-logo*, installed unchanged) draws a drop of glass
// that becomes a square tile around the mark. Its "logo" ending would then clear the glass and
// leave the mark alone; here the sequence holds on the finished tile instead, so the mark stays
// behind glass in a square. It starts once the window's shutter has risen. Reduced motion: the
// component shows its own still ending (the mark alone), and without WebGL its image fallback.
//
// HOLD is the moment in the component's 1.8s logo sequence where the tile has formed and turned to
// frosted glass, the towers showing through and the chromatic streaks still on its rim, before the
// glass clears away (chosen from frames 0.4 to 1.3s, 2026-10-25). ?glass=<seconds> pins any moment
// (dev).

const HOLD = 1.16;
const START = 1.55; // seconds after mount: the shutter (svc.css) has finished rising

export default function SvGlassMark() {
  const glass = useRef<LiquidGlassLogoHandle>(null);
  const [paused, setPaused] = useState(true);

  useEffect(() => {
    const pin = new URLSearchParams(window.location.search).get('glass');
    if (pin !== null) {
      const t = Number(pin) || HOLD;
      const id = window.setTimeout(() => glass.current?.seek(t), 300);
      return () => window.clearTimeout(id);
    }
    const timers: number[] = [];
    timers.push(
      window.setTimeout(() => {
        glass.current?.replay();
        setPaused(false);
        // Stop on the tile. The clock runs at speed 1 from here; the seek lands it exactly.
        timers.push(
          window.setTimeout(() => {
            glass.current?.pause();
            glass.current?.seek(HOLD);
            setPaused(true);
          }, HOLD * 1000),
        );
      }, START * 1000),
    );
    return () => timers.forEach((id) => window.clearTimeout(id));
  }, []);

  return (
    <LiquidGlassLogo
      ref={glass}
      logo='/ares-logo.svg'
      ending='logo'
      theme='light'
      background='#ffffff00'
      paused={paused}
      aria-label='Ares Security'
      style={{ height: '100%', minHeight: 0 }}
    />
  );
}
