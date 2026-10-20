import { useRef } from 'react';
import { useMotion, useScene } from '../home/motion';
import { useMediaQuery } from '../home/useMediaQuery';

// One line (owner, 2026-10-19; /home-next): a single 1px rust thread runs the length of the page,
// drawn by the scroll with a soft glow at its tip, like flora's wires. It starts as the location
// point under the hero's headline and ends at the phone number, where the close draws it on as the
// number's underline. In each section it runs where that section's own rust line is (the record's
// axis, the industry list's tick, the teaming wires, I-25), so the section lines read as the same
// thread; between sections it keeps to the left gutter.
// Each section marks where its stretch runs with an element carrying data-thread: "start" (the
// hero's point), "x" (only its left edge counts: the thread runs down the section there), or "end"
// (the close). Pinned sections are measured on their pin spacer, so the stretch spans the pin.
// Desktop only, while the scroll engine runs. Phones show the line inside each section only.

type Pt = [number, number];

export default function Thread() {
  const engine = useMotion();
  const wide = useMediaQuery('(min-width: 1024px)', false);
  const on = !!engine && wide;
  const ref = useRef<SVGSVGElement>(null);

  useScene(
    ref as unknown as React.RefObject<HTMLElement>,
    ({ ScrollTrigger }, root) => {
      if (!on) return;
      const svg = root as unknown as SVGSVGElement;
      const path = svg.querySelector<SVGPathElement>('.hn-thread-path')!;
      const tip = svg.querySelector<SVGGElement>('.hn-thread-tip')!;
      let table: { len: number; y: number }[] = [];
      let total = 0;

      // The box a section occupies in the page's flow (its pin spacer when it is pinned).
      const flowBox = (el: Element) => {
        const box = (el.parentElement?.classList.contains('pin-spacer') ? el.parentElement : el) as HTMLElement;
        const r = box.getBoundingClientRect();
        return { top: r.top + window.scrollY, bottom: r.bottom + window.scrollY };
      };

      const build = () => {
        const docH = document.documentElement.scrollHeight;
        svg.setAttribute('height', String(docH));
        svg.setAttribute('viewBox', `0 0 ${window.innerWidth} ${docH}`);
        const container = document.querySelector<HTMLElement>('.hn .ds-container');
        const gutter = Math.max(14, (container ? container.getBoundingClientRect().left : 32) - 28);
        const pts: Pt[] = [];
        const marks = Array.from(document.querySelectorAll<HTMLElement>('.hn [data-thread]'));
        marks.forEach((m) => {
          const kind = m.dataset.thread;
          const r = m.getBoundingClientRect();
          const x = Math.round(r.left + r.width / 2);
          const section = m.closest('section');
          if (kind === 'start' || kind === 'end') {
            // A point: the hero's location dot, or where the phone's underline begins.
            const y = Math.round(r.top + window.scrollY + r.height / 2);
            const px = kind === 'end' ? Math.round(r.left) : x;
            if (kind === 'end' && pts.length) pts.push([gutter, y - 120]);
            pts.push([px, y]);
            if (kind === 'start') pts.push([px, y + 60], [gutter, y + 160]);
            return;
          }
          if (!section) return;
          const box = flowBox(section);
          const pad = Math.min(160, (box.bottom - box.top) * 0.12);
          pts.push([gutter, box.top + pad * 0.4], [x, box.top + pad], [x, box.bottom - pad], [gutter, box.bottom - pad * 0.4]);
        });
        if (pts.length < 2) return;
        // A path of straight runs with rounded turns (radius up to 28px).
        let d = `M${pts[0][0]} ${pts[0][1]}`;
        for (let i = 1; i < pts.length; i++) {
          const [x0, y0] = pts[i - 1];
          const [x1, y1] = pts[i];
          const my = (y0 + y1) / 2;
          if (x0 === x1) d += ` L${x1} ${y1}`;
          else d += ` C${x0} ${my} ${x1} ${my} ${x1} ${y1}`;
        }
        path.setAttribute('d', d);
        total = path.getTotalLength();
        table = [];
        for (let l = 0; l <= total; l += 12) table.push({ len: l, y: path.getPointAtLength(l).y });
        path.style.strokeDasharray = `${total} ${total}`;
      };

      // The tip rides at 62% of the screen: draw the thread down to the page position there.
      const draw = (scroll: number) => {
        if (!table.length) return;
        const y = scroll + window.innerHeight * 0.62;
        let len = total;
        for (let i = 0; i < table.length; i++) {
          if (table[i].y >= y) {
            len = table[i].len;
            break;
          }
        }
        path.style.strokeDashoffset = String(total - len);
        const p = path.getPointAtLength(len);
        tip.setAttribute('transform', `translate(${p.x.toFixed(1)} ${p.y.toFixed(1)})`);
        tip.style.opacity = len > 4 && len < total - 2 ? '1' : '0';
      };

      const st = ScrollTrigger.create({ start: 0, end: 'max', onUpdate: (self) => draw(self.scroll()) });
      const onRefresh = () => {
        build();
        draw(st.scroll());
      };
      ScrollTrigger.addEventListener('refresh', onRefresh);
      onRefresh();
      return () => ScrollTrigger.removeEventListener('refresh', onRefresh);
    },
    [on],
  );

  if (!on) return null;
  return (
    <svg ref={ref} className="hn-thread" aria-hidden="true" width="100%" preserveAspectRatio="none">
      <defs>
        <radialGradient id="hn-thread-glow">
          <stop offset="0%" stopColor="#e3a07a" stopOpacity="0.55" />
          <stop offset="45%" stopColor="#bc6f40" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#bc6f40" stopOpacity="0" />
        </radialGradient>
      </defs>
      <path className="hn-thread-path" fill="none" stroke="#bc6f40" strokeWidth="1" />
      {/* The drawing tip: a soft glow around a small bright point. */}
      <g className="hn-thread-tip">
        <circle r="18" fill="url(#hn-thread-glow)" />
        <circle r="2.5" fill="#f1c49a" />
      </g>
    </svg>
  );
}
