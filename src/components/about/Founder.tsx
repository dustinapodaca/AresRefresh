import { useEffect, useRef, useState, type CSSProperties } from 'react';

// "Why Ares exists." (copy audit: About had no founder section; owner, 2026-10-10). Second pass
// after Slash, Flora, and Resend on Mobbin: the letter (owner, 2026-10-10), the story set large in
// two tones (Flora). The note form (/about?founder=note) was removed at launch (owner, 2026-10-19;
// tag options-archive-2026-10-19, docs/options-archive.md). Since 2026-10-23 (owner) it speaks in
// company voice, not as Deidre's own story, and a "Since 2021" timeline takes the signature's place.
const STORY = {
  story: 'Ares was built from inside the guard business. Before 2021, our leadership ran operations, HR and scheduling at another Colorado security company, and worked alongside several more. The same things were missing at every one: structure, oversight, and the human element. Officers were sent to posts they had never seen, schedules were patched day to day, and managers went from one fire to the next. Clients and officers paid for it.',
  // The one line in ink; the rest of the story is muted (owner, 2026-10-19).
  close: 'Ares was founded to fix it from the top down.',
};

// Since 2021 (owner, 2026-10-23), in this order.
const SINCE = [
  { year: '2021', line: 'Founded in Colorado Springs' },
  { year: '2022', line: 'Longest client on post, continuously since' },
  { year: '2023', line: 'Registered on SAM.gov · WBENC certified' },
  { year: '2025', line: 'Restricted-area escort and access control on a Space Force base' },
  { year: '2026', line: 'Denver M/WBE and SBE · Colorado Verified' },
];

// The timeline is drawn and every year rust by default (prerendered HTML, no JavaScript, reduced
// motion). The motion is armed only after mount, as in Heard: data-anim="ready" sets the waiting
// state, then "on" (a frame later) turns the transitions on. The page's scroll observer
// (useScrollInViewObserver, center and once) sets data-in-view when it reaches the middle; then the
// years come in one after another, 90ms apart (--i), as the rule reaches each one.
function Since() {
  const ref = useRef<HTMLDivElement>(null);
  const [anim, setAnim] = useState<'ready' | 'on' | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    // Already at or past the middle on mount (a reload mid-page), or jumped past it between two
    // observer checks: drawn, without waiting for the center band.
    const past = () => el.getBoundingClientRect().top < window.innerHeight / 2;
    if (past()) {
      el.setAttribute('data-in-view', 'true');
      return;
    }
    const onScroll = () => {
      if (el.getAttribute('data-in-view') === 'true') window.removeEventListener('scroll', onScroll);
      else if (past()) el.setAttribute('data-in-view', 'true');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    setAnim('ready');
    const id = requestAnimationFrame(() => requestAnimationFrame(() => setAnim('on')));
    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <div ref={ref} className="ds-since" data-anim={anim ?? undefined} data-scroll-active="" data-scroll-once="" data-scroll-center="">
      <p id="since-title" className="ds-data ds-since-label">Since 2021</p>
      <ol className="ds-since-list" aria-labelledby="since-title">
        {SINCE.map((s, i) => (
          <li key={s.year} style={{ '--i': i } as CSSProperties}>
            <span className="ds-data ds-since-year">{s.year}</span>{' '}
            <span className="ds-since-line">{s.line}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default function Founder() {
  return (
    <section id="founder" className="ds-founder" data-form="letter" aria-labelledby="founder-title">
      <h2 id="founder-title" className="ds-display-lg">Why Ares exists.</h2>
      <div className="ds-founder-letter">
        <p className="ds-founder-story">
          {STORY.story} <span>{STORY.close}</span>
        </p>
        <Since />
      </div>
    </section>
  );
}
