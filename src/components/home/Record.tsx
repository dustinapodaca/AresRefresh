import { useEffect, useRef } from 'react';
import Arrow from '../Arrow';
import { INDEED_REVIEWS } from '../careers/data';

// 01 Record (owner, 2026-10-06; Mobbin: Lightdash and Ramp, proof cards over a wide quote).
// One grid: the three things we stand for, each led by its proof as a figure in its own
// light, then a client's words as a wide card. Dark glass over rust light, as in the
// footer. Desktop: the cards rise into place as they scroll in. Phones: they pile up.
export const VALUES: {
  name: string;
  light: 'sun' | 'horizon' | 'three';
  figure: string;
  caption: string;
  href?: string;
  line: string;
}[] = [
  {
    name: 'Reliability',
    light: 'horizon',
    figure: '<1%',
    caption: 'Missed shifts since 2021',
    line: 'On-call coverage is written into every contract, and leadership works the first shift on every new post.',
  },
  {
    // Was "Integrity" with 16/18 (owner, 2026-10-10: all five past performance evaluations).
    name: 'Client rating',
    light: 'sun',
    figure: '43/45',
    caption: 'Criteria rated Very Good or Exceptional',
    line: 'Across five past performance evaluations since 2021, clients rated Ares Very Good or Exceptional on 43 of 45 criteria, with none below Satisfactory.',
  },
  {
    name: 'Personnel',
    light: 'three',
    figure: '4.8/5',
    caption: 'Employee rating on Indeed',
    href: INDEED_REVIEWS,
    // Says what the 4.8 is about (copy audit round 3, 2026-10-10; Careers says the same).
    line: 'Our officers rate us highest for management and work-life balance.',
  },
];

export default function Record() {
  const listRef = useRef<HTMLUListElement>(null);

  // Phones and tablets: the three cards pile up, so they share one height, the tallest card's
  // (owner, 2026-10-08). Without JS they keep their own heights.
  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const mq = window.matchMedia('(max-width: 1023px)');
    let frame = 0;
    const measure = () => {
      frame = 0;
      list.style.removeProperty('--ds-value-h');
      if (!mq.matches) return;
      const cards = [...list.querySelectorAll<HTMLElement>('.ds-value')];
      const tallest = Math.max(...cards.map((c) => c.offsetHeight));
      list.style.setProperty('--ds-value-h', `${tallest}px`);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };
    measure();
    document.fonts?.ready.then(schedule);
    window.addEventListener('resize', schedule);
    mq.addEventListener('change', schedule);
    return () => {
      window.removeEventListener('resize', schedule);
      mq.removeEventListener('change', schedule);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section id="record" className="ds-record" aria-labelledby="record-title">
      <div className="ds-sec-head">
        <h2 id="record-title" className="ds-display-lg">
          The record so far.
        </h2>
        <p className="ds-lead">
          Federal agencies and commercial clients hire us for the same thing: a prepared officer
          on post, every shift.
        </p>
      </div>

      <ul ref={listRef} className="ds-values-list">
        {VALUES.map((v) => (
          <li key={v.name} className="ds-value" data-light={v.light}>
            <div className="ds-value-light">
              <p className="ds-data ds-value-figure">{v.figure}</p>
              {v.href ? (
                <a href={v.href} target="_blank" rel="noopener noreferrer" className="ds-value-caption">
                  {v.caption}
                  <Arrow external size={12} />
                </a>
              ) : (
                <p className="ds-value-caption">{v.caption}</p>
              )}
            </div>
            <div className="ds-value-glass">
              <h3>{v.name}</h3>
              <p>{v.line}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
