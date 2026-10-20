import { useRef } from 'react';
import { useMotion, useScene } from './motion';

// One traveling rust light (owner, 2026-10-19): in place of a separate light in every section, one
// soft light behind the whole page, carried by the scroll. Off over the hero (the terrain is the
// light there); low behind the Record cards, so their glass has something to bend; behind the photo
// in the Industries scene; gone while the prime panel's own light takes over; gathered on the
// Colorado Springs pin in Coverage; then rising from below as the close's horizon and handing on to
// the footer's closing stage. Drawn in CSS (crisp on phones), moved by transform and opacity only.
// Only while the scroll engine runs; without it each section keeps its own light.

type Key = {
  /** The element and the ScrollTrigger start line that place this key on the scroll. */
  at: string;
  line: string;
  /** Center as a fraction of the viewport, or a function of the scroll (to follow an element). */
  x: number | ((scroll: number) => number);
  y: number | ((scroll: number) => number);
  s: number;
  o: number;
};

// Ease between keys so the light never starts or stops with a jolt.
const smooth = (t: number) => t * t * (3 - 2 * t);

export default function TravelLight() {
  const engine = useMotion();
  const ref = useRef<HTMLDivElement>(null);

  useScene(ref, ({ gsap, ScrollTrigger }, root) => {
    const light = root.querySelector<HTMLElement>('.ds-light-in')!;
    const set = gsap.quickSetter(light, 'css') as (v: Record<string, number>) => void;

    // The Colorado Springs pin's place on the screen at a given scroll (cached on refresh).
    let hq = { x: 0.5, y: 0 };
    const hqY = (scroll: number) => (hq.y - scroll) / window.innerHeight;
    const hqX = () => hq.x;
    const measureHq = () => {
      const pin = document.querySelector<SVGElement>('[data-hq-pin]');
      if (!pin) return;
      const r = pin.getBoundingClientRect();
      hq = { x: (r.left + r.width / 2) / window.innerWidth, y: r.top + r.height / 2 + window.scrollY };
    };

    const KEYS: Key[] = [
      { at: '#record', line: 'top 95%', x: 0.5, y: 1.15, s: 1, o: 0 },
      { at: '#record', line: 'top 35%', x: 0.52, y: 0.8, s: 1.15, o: 0.55 },
      { at: '#record', line: 'bottom 70%', x: 0.48, y: 0.74, s: 1.1, o: 0.5 },
      { at: '#industries', line: 'top top', x: 0.72, y: 0.56, s: 0.95, o: 0.5 },
      { at: '.ds-primes-panel', line: 'top bottom', x: 0.74, y: 0.6, s: 0.95, o: 0.45 },
      { at: '.ds-primes-panel', line: 'top 60%', x: 0.76, y: 0.72, s: 0.9, o: 0 },
      { at: '.ds-primes-panel', line: 'bottom 55%', x: 0.4, y: 0.8, s: 1.2, o: 0 },
      { at: '#quality', line: 'top 40%', x: 0.3, y: 0.62, s: 1.3, o: 0.28 },
      { at: '#quality', line: 'bottom 70%', x: 0.62, y: 0.55, s: 1.1, o: 0.26 },
      { at: '.ds-map', line: 'top 75%', x: hqX, y: hqY, s: 0.55, o: 0.5 },
      { at: '.ds-map', line: 'bottom 35%', x: hqX, y: hqY, s: 0.5, o: 0.55 },
      { at: '#careers', line: 'top 55%', x: 0.5, y: 0.62, s: 1.35, o: 0.2 },
      { at: '#contact', line: 'top 75%', x: 0.5, y: 1.08, s: 1.7, o: 0.32 },
      { at: '#contact', line: 'center 55%', x: 0.5, y: 0.84, s: 1.8, o: 0.7 },
      // No still stretch at the end (owner, 2026-10-19: never scroll through still black): after the
      // close's columns are in, the horizon keeps rising behind it, then sets into the footer's own
      // light as the closing stage arrives.
      { at: '.ds-ft-stage', line: 'top bottom', x: 0.5, y: 0.6, s: 2.3, o: 0.75 },
      { at: '.ds-ft-stage', line: 'top 75%', x: 0.5, y: 1.05, s: 1.8, o: 0 },
    ];

    // Each key's scroll position, from a bare ScrollTrigger so pins earlier on the page count.
    const marks = KEYS.map((k) => {
      const el = document.querySelector(k.at);
      return el ? ScrollTrigger.create({ trigger: el, start: k.line }) : null;
    });
    const keys = KEYS.map((k, i) => ({ ...k, st: marks[i] })).filter((k) => k.st);

    const val = (v: Key['x'], scroll: number) => (typeof v === 'function' ? v(scroll) : v);
    const draw = (scroll: number) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      let a = keys[0];
      let b = keys[0];
      let t = 0;
      if (scroll <= keys[0].st!.start) t = 0;
      else if (scroll >= keys[keys.length - 1].st!.start) a = b = keys[keys.length - 1];
      else {
        for (let i = 0; i < keys.length - 1; i++) {
          const s0 = keys[i].st!.start;
          const s1 = keys[i + 1].st!.start;
          if (scroll >= s0 && scroll < s1) {
            a = keys[i];
            b = keys[i + 1];
            t = smooth(s1 > s0 ? (scroll - s0) / (s1 - s0) : 1);
            break;
          }
        }
      }
      const mix = (p: number, q: number) => p + (q - p) * t;
      set({
        x: mix(val(a.x, scroll), val(b.x, scroll)) * w,
        y: mix(val(a.y, scroll), val(b.y, scroll)) * h,
        scale: mix(a.s, b.s),
        opacity: mix(a.o, b.o),
      });
    };

    const st = ScrollTrigger.create({ start: 0, end: 'max', onUpdate: (self) => draw(self.scroll()) });
    // Redrawn once every trigger has been measured again (its own refresh can come before the keys').
    const onRefresh = () => {
      measureHq();
      draw(st.scroll());
    };
    ScrollTrigger.addEventListener('refresh', onRefresh);
    onRefresh();
    return () => ScrollTrigger.removeEventListener('refresh', onRefresh);
  });

  if (!engine) return null;
  return (
    <div ref={ref} className="ds-light" aria-hidden="true">
      <div className="ds-light-in">
        <i />
        <i />
      </div>
    </div>
  );
}
