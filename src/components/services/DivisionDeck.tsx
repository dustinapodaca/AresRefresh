import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties, type KeyboardEvent, type PointerEvent } from 'react';
import Arrow from '../Arrow';
import { GSA_ELIBRARY } from '../home/links';
import { DIVISIONS } from './data';

// Phones only (PROTOTYPE, owner trial 2026-10-05): the six divisions as a fanned deck,
// after a stacked-carousel reference. Drag or tap a side card to move through it; the
// front division's detail sits below the deck. Hand-built drag and spring (no animation
// library): the deck is painted from one progress value, 0 to 5, outside React.
const X = 84; // px between neighbouring cards
const Y = 18; // px each step drops
const ROT = 3.5; // deg each step tilts (the reference's 8 to 12 read as playful)
const SHRINK = 0.06; // scale lost per step
const SENS = 180; // px of drag per card
const K = 200; // spring stiffness
const C = 30; // spring damping (no overshoot)

const total = DIVISIONS.length;
const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function pose(i: number, p: number) {
  const o = i - p;
  const a = Math.abs(o);
  return {
    transform: `translate3d(${o * X}px, ${a * Y}px, 0) rotate(${o * ROT}deg) scale(${1 - a * SHRINK})`,
    zIndex: String(100 - Math.round(a * 10)),
    opacity: String(clamp(3 - a, 0, 1)),
    dim: String(Math.min(a, 2) * 0.28),
    front: String(clamp(1 - a * 1.6, 0, 1)),
  };
}

export default function DivisionDeck() {
  const cards = useRef<(HTMLDivElement | null)[]>([]);
  const fill = useRef<HTMLSpanElement>(null);
  const progress = useRef(0);
  const frame = useRef(0);
  const drag = useRef<{ x: number; start: number; lastX: number; lastT: number; v: number; moved: boolean } | null>(null);
  const [active, setActive] = useState(0);

  const paint = useCallback((p: number) => {
    progress.current = p;
    cards.current.forEach((el, i) => {
      if (!el) return;
      const s = pose(i, p);
      el.style.transform = s.transform;
      el.style.zIndex = s.zIndex;
      el.style.opacity = s.opacity;
      el.style.setProperty('--dim', s.dim);
      el.style.setProperty('--front', s.front);
    });
    if (fill.current) fill.current.style.transform = `scaleX(${(clamp(p, 0, total - 1) + 1) / total})`;
  }, []);

  // Glide to a card on a critically damped spring, carrying the release velocity.
  const settle = useCallback(
    (to: number, velocity = 0) => {
      cancelAnimationFrame(frame.current);
      const target = clamp(Math.round(to), 0, total - 1);
      setActive(target);
      if (reducedMotion()) return paint(target);
      let x = progress.current;
      let v = velocity;
      let last = performance.now();
      const step = (t: number) => {
        const dt = Math.min(0.032, (t - last) / 1000);
        last = t;
        v += (-K * (x - target) - C * v) * dt;
        x += v * dt;
        if (Math.abs(x - target) < 0.001 && Math.abs(v) < 0.01) return paint(target);
        paint(x);
        frame.current = requestAnimationFrame(step);
      };
      frame.current = requestAnimationFrame(step);
    },
    [paint],
  );

  useEffect(() => {
    paint(0);
    return () => cancelAnimationFrame(frame.current);
  }, [paint]);

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    cancelAnimationFrame(frame.current);
    drag.current = { x: e.clientX, start: progress.current, lastX: e.clientX, lastT: e.timeStamp, v: 0, moved: false };
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d) return;
    const dx = e.clientX - d.x;
    if (Math.abs(dx) > 6) d.moved = true;
    let p = d.start - dx / SENS;
    // Past either end the deck resists instead of stopping dead.
    if (p < 0) p *= 0.35;
    if (p > total - 1) p = total - 1 + (p - (total - 1)) * 0.35;
    paint(p);
    const dt = e.timeStamp - d.lastT;
    if (dt > 0) d.v = 0.8 * ((e.clientX - d.lastX) / dt) + 0.2 * d.v; // px per ms, smoothed
    d.lastX = e.clientX;
    d.lastT = e.timeStamp;
  };
  const onPointerUp = (e: PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    drag.current = null;
    if (!d) return;
    if (!d.moved) {
      // A tap on a side card brings it to the front.
      const r = e.currentTarget.getBoundingClientRect();
      const fromCentre = e.clientX - (r.left + r.width / 2);
      if (Math.abs(fromCentre) > 64) settle(Math.round(progress.current) + Math.sign(fromCentre));
      else settle(progress.current);
      return;
    }
    const pxPerSec = d.v * 1000;
    const shift = clamp(Math.round(-(e.clientX - d.x) / 120 - pxPerSec / 500), -3, 3);
    settle(Math.round(d.start) + shift, -pxPerSec / SENS);
  };
  const onPointerCancel = () => {
    drag.current = null;
    settle(progress.current);
  };
  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowRight') settle(active + 1);
    else if (e.key === 'ArrowLeft') settle(active - 1);
    else return;
    e.preventDefault();
  };

  // First paint (and the prerender) already shows the deck fanned at card one.
  const initial = useMemo(() => DIVISIONS.map((_, i) => pose(i, 0)), []);
  const d = DIVISIONS[active];

  return (
    <div className="ds-svc-deck">
      <div
        className="ds-svc-deck-stage"
        role="group"
        aria-roledescription="carousel"
        aria-label="Service divisions"
        tabIndex={0}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerCancel}
        onKeyDown={onKeyDown}
      >
        {DIVISIONS.map((div, i) => (
          <div
            key={div.id}
            ref={(el) => (cards.current[i] = el)}
            className="ds-svc-deck-card"
            aria-hidden={i !== active}
            style={
              {
                transform: initial[i].transform,
                zIndex: initial[i].zIndex,
                opacity: initial[i].opacity,
                '--dim': initial[i].dim,
                '--front': initial[i].front,
              } as CSSProperties
            }
          >
            <img
              src={div.photo.src}
              alt=""
              width={div.photo.width}
              height={div.photo.height}
              loading={i < 3 ? 'eager' : 'lazy'}
              decoding="async"
              draggable={false}
              style={div.photo.position ? { objectPosition: div.photo.position } : undefined}
            />
            <div className="ds-svc-deck-panel">
              <span className="ds-data">{div.n}</span>
              <span>{div.title}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="ds-svc-deck-controls">
        <button type="button" className="ds-svc-deck-step" onClick={() => settle(active - 1)} disabled={active === 0} aria-label="Previous division">
          <span className="ds-svc-deck-prev"><Arrow /></span>
        </button>
        <div className="ds-svc-deck-meter">
          <ol>
            {DIVISIONS.map((div, i) => (
              <li key={div.id}>
                <button type="button" className="ds-data" data-on={i <= active} onClick={() => settle(i)} aria-label={`${div.n} ${div.title}`}>
                  {div.n}
                </button>
              </li>
            ))}
          </ol>
          <span className="ds-svc-deck-track" aria-hidden="true">
            <span ref={fill} style={{ transform: `scaleX(${1 / total})` }} />
          </span>
        </div>
        <button type="button" className="ds-svc-deck-step" onClick={() => settle(active + 1)} disabled={active === total - 1} aria-label="Next division">
          <Arrow />
        </button>
      </div>

      {/* The front division's detail. */}
      <div className="ds-svc-deck-detail" aria-live="polite" key={d.id}>
        <p className="ds-svc-deck-name">
          <span className="ds-data">{d.n}</span>
          {d.title}
        </p>
        <p className="ds-body">{d.body}</p>
        {d.id === 'government' && (
          <dl className="ds-svc-proof">
            <dt>GSA Multiple Award Schedule</dt>
            <dd className="ds-data">47QSMS25D009Q</dd>
            <dd>
              <a href={GSA_ELIBRARY} target="_blank" rel="noopener noreferrer" className="ds-link">
                View on GSA eLibrary
                <Arrow external size={14} />
              </a>
            </dd>
          </dl>
        )}
        <ul className="ds-svc-items">
          {d.covers.map((c) => (
            <li key={c.name}>
              <span className="ds-svc-item-name">{c.name}</span>
              <span className="ds-svc-item-detail">{c.detail}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
