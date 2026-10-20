import { useEffect, useRef } from 'react';

// Details that make the page feel built (owner, 2026-10-19; /home-next), desktop with a fine pointer
// only, and none under reduced motion:
// - a cursor label: a small mono chip that trails the cursor over anything with data-cursor
//   ("OPEN PAGE", "CALL", "VIEW ON ELIBRARY"), lagging a little behind it;
// - magnetic buttons: the page's primary buttons lean up to 6px toward the cursor within 60px.
export default function Details() {
  const labelRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const label = labelRef.current!;
    let x = -100, y = -100, lx = -100, ly = -100, raf = 0, text = '';
    const buttons = () => Array.from(document.querySelectorAll<HTMLElement>('.hn .ds-btn-primary'));
    const pulls = new Map<HTMLElement, { x: number; y: number }>();
    const tick = () => {
      raf = 0;
      lx += (x - lx) * 0.22;
      ly += (y - ly) * 0.22;
      label.style.transform = `translate(${lx + 14}px, ${ly + 16}px)`;
      let moving = Math.abs(x - lx) > 0.3 || Math.abs(y - ly) > 0.3;
      pulls.forEach((p, b) => {
        const cur = (b as HTMLElement & { _pull?: { x: number; y: number } })._pull ?? { x: 0, y: 0 };
        cur.x += (p.x - cur.x) * 0.2;
        cur.y += (p.y - cur.y) * 0.2;
        (b as HTMLElement & { _pull?: { x: number; y: number } })._pull = cur;
        b.style.translate = `${cur.x.toFixed(2)}px ${cur.y.toFixed(2)}px`;
        if (Math.abs(p.x - cur.x) > 0.05 || Math.abs(p.y - cur.y) > 0.05) moving = true;
      });
      if (moving) raf = requestAnimationFrame(tick);
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      const target = (e.target as Element | null)?.closest?.('.hn [data-cursor]') as HTMLElement | null;
      const next = target?.dataset.cursor ?? '';
      if (next !== text) {
        text = next;
        if (next) label.textContent = next;
        label.toggleAttribute('data-on', !!next);
      }
      for (const b of buttons()) {
        const r = b.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        const dx = x - cx;
        const dy = y - cy;
        const reach = Math.max(r.width, r.height) / 2 + 60;
        const d = Math.hypot(dx, dy);
        pulls.set(b, d < reach ? { x: (dx / reach) * 6, y: (dy / reach) * 6 } : { x: 0, y: 0 });
      }
      schedule();
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onMove);
      cancelAnimationFrame(raf);
      pulls.forEach((_, b) => (b.style.translate = ''));
    };
  }, []);
  return <div ref={labelRef} className="hn-cursor ds-data" aria-hidden="true" />;
}
