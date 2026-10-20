import { useEffect, useRef, useState } from 'react';

// The rail as a miniature of the line (owner, 2026-10-19; /home-next): a short vertical route with
// six stops, 01 Record to 06 Contact, and a dot that travels it with the reading position. Each stop
// is a link to its section (in-page links glide and land through scrollToSection, SmoothAnchors).
// Desktop from 1200px. Below that, the running head: the stop's name, its count, and a progress
// line (the same markup as the other pages', so the nav folds its wordmark the same way).
export const STOPS = [
  { id: 'record', n: '01', label: 'Record' },
  { id: 'industries', n: '02', label: 'Industries' },
  { id: 'quality', n: '03', label: 'Quality' },
  { id: 'coverage', n: '04', label: 'Coverage' },
  { id: 'careers', n: '05', label: 'Careers' },
  { id: 'contact', n: '06', label: 'Contact' },
] as const;

export default function RouteRail() {
  const [active, setActive] = useState(-1);
  const dotRef = useRef<HTMLSpanElement>(null);
  const fillRef = useRef<HTMLSpanElement>(null);
  const endedRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const line = window.innerHeight * 0.35;
      let current = -1;
      let progress = 0;
      STOPS.forEach((s, i) => {
        const el = document.getElementById(s.id);
        if (!el) return;
        // A pinned section is measured on its spacer, which spans the pin.
        const box = (el.parentElement?.classList.contains('pin-spacer') ? el.parentElement : el).getBoundingClientRect();
        if (box.top <= line) {
          current = i;
          progress = Math.min(1, Math.max(0, (line - box.top) / box.height));
        }
      });
      setActive(current);
      // The dot rides the route from stop to stop: at a stop as its section begins, halfway to the
      // next one halfway through it.
      const stops = listRef.current ? Array.from(listRef.current.querySelectorAll<HTMLElement>('a i')) : [];
      if (stops.length && dotRef.current && listRef.current) {
        const base = listRef.current.getBoundingClientRect().top;
        const ys = stops.map((i) => i.getBoundingClientRect().top + i.offsetHeight / 2 - base);
        const k = Math.max(0, current);
        const y = current < 0 ? ys[0] : k >= ys.length - 1 ? ys[ys.length - 1] : ys[k] + (ys[k + 1] - ys[k]) * progress;
        dotRef.current.style.transform = `translateY(${y.toFixed(1)}px)`;
      }
      const doc = document.documentElement;
      const page = Math.min(1, Math.max(0, window.scrollY / Math.max(1, doc.scrollHeight - window.innerHeight)));
      fillRef.current?.style.setProperty('transform', `scaleX(${page.toFixed(4)})`);
      const foot = document.querySelector('.ds-footer .ds-container');
      endedRef.current?.toggleAttribute('data-ended', !!foot && foot.getBoundingClientRect().top < window.innerHeight);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  const current = active >= 0 ? STOPS[active] : null;
  return (
    <>
      <nav ref={endedRef} className="hn-route" data-visible={current ? 'true' : undefined} aria-label="On this page">
        <div ref={listRef} className="hn-route-list">
          <span ref={dotRef} className="hn-route-dot" aria-hidden="true" />
          <ol>
          {STOPS.map((s, i) => (
            <li key={s.id}>
              <a href={`#${s.id}`} aria-current={i === active ? 'location' : undefined}>
                <i aria-hidden="true" />
                <span className="ds-data">{s.n}</span>
                <span>{s.label}</span>
              </a>
            </li>
          ))}
          </ol>
        </div>
      </nav>
      <div className="ds-runhead" data-visible={Boolean(current)} aria-hidden="true">
        <div className="ds-container">
          <span>{current ? current.label : ''}</span>
          <span>{current ? `${current.n} / 06` : ''}</span>
        </div>
        <span ref={fillRef} className="ds-runhead-fill hn-runhead-fill" />
      </div>
    </>
  );
}
