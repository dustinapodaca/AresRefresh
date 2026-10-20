import { useEffect, useRef } from 'react';
import { useMotion, useScene } from './motion';
import Arrow from '../Arrow';
import { INDEED_REVIEWS } from '../careers/data';
import { RevealHeading, RevealLead } from './Reveal';

// 01 Record (owner, 2026-10-06; Mobbin: Lightdash and Ramp, proof cards over a wide quote).
// One grid: the three things we stand for, each led by its proof as a figure in its own
// light, then a client's words as a wide card. Dark glass over rust light, as in the
// footer. Desktop: the cards rise into place as they scroll in. Phones: they pile up.
export const VALUES: {
  name: string;
  light: 'sun' | 'horizon' | 'three';
  figure: string;
  /** The odometer's frames on the way to the figure: nearby values, never from 0 (owner,
      2026-10-19), each the figure's length so the digits share columns. */
  roll: string[];
  caption: string;
  href?: string;
  line: string;
}[] = [
  {
    name: 'Reliability',
    light: 'horizon',
    figure: '<1%',
    roll: ['<4%', '<3%', '<2%'],
    caption: 'Missed shifts since 2021',
    line: 'On-call coverage is written into every contract, and leadership works the first shift on every new post.',
  },
  {
    // Was "Integrity" with 16/18 (owner, 2026-10-10: all five past performance evaluations).
    name: 'Client rating',
    light: 'sun',
    figure: '43/45',
    roll: ['38/45', '40/45', '42/45'],
    caption: 'Criteria rated Very Good or Exceptional',
    line: 'Across five past performance evaluations since 2021, clients rated Ares Very Good or Exceptional on 43 of 45 criteria, with none below Satisfactory.',
  },
  {
    name: 'Personnel',
    light: 'three',
    figure: '4.8/5',
    roll: ['4.5/5', '4.6/5', '4.7/5'],
    caption: 'Employee rating on Indeed',
    href: INDEED_REVIEWS,
    // Says what the 4.8 is about (copy audit round 3, 2026-10-10; Careers says the same).
    line: 'On Indeed, where the reviews are public, our officers rate us highest for management and work-life balance.', // longer (owner, 2026-10-18) so it runs 3 lines or more on phones
  },
];

// The figure as an odometer (owner, 2026-10-19): while the scroll engine runs, each changing digit
// is a reel that rolls through its frames to the figure once, as the card lands; signs and fixed
// digits ("<", "%", "/45") hold still. Readers get the figure itself; the reels are hidden from them.
// Without the engine, the plain figure.
function Figure({ value, roll }: { value: string; roll: string[] }) {
  const engine = useMotion();
  if (!engine) return <p className="ds-data ds-value-figure">{value}</p>;
  const frames = [...roll, value];
  const cols = [...value].map((ch, i) => {
    const reel = frames.map((f) => f[i]);
    return reel.every((c) => c === ch) ? ch : reel;
  });
  return (
    <p className="ds-data ds-value-figure">
      <span className="ds-sr">{value}</span>
      <span className="ds-odo" aria-hidden="true">
        {cols.map((c, i) =>
          typeof c === 'string' ? (
            <span key={i}>{c}</span>
          ) : (
            <span key={i} className="ds-odo-col">
              <span className="ds-odo-reel" data-n={c.length}>
                {c.map((g, j) => (
                  <span key={j}>{g}</span>
                ))}
              </span>
            </span>
          ),
        )}
      </span>
    </p>
  );
}

export default function Record() {
  const listRef = useRef<HTMLUListElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // Desktop: the cards rise with the scroll, a step apart, settling from a slight tilt (owner,
  // 2026-10-19; they rose on a one-shot CSS timeline). Every width: as a card lands (desktop: its top
  // passes 60% of the screen; phones: it reaches the top of the pile) its figure rolls into place
  // and its corner light comes up from 0.6. Cards already past that line hold their final state.
  useScene(sectionRef, ({ gsap }, root) => {
    const list = root.querySelector('.ds-values-list')!;
    const cards = Array.from(root.querySelectorAll<HTMLElement>('.ds-value'));
    const mm = gsap.matchMedia();
    mm.add('(min-width: 1024px)', () => {
      gsap.fromTo(
        cards,
        { y: 120, rotateX: 8, transformPerspective: 1200, transformOrigin: '50% 100%' },
        { y: 0, rotateX: 0, ease: 'none', stagger: 0.095, scrollTrigger: { trigger: list, start: 'top 95%', end: 'top 40%', scrub: true } },
      );
    });

    const wide = window.matchMedia('(min-width: 1024px)').matches;
    const line = wide ? 0.6 : 0.25;
    const land = (card: HTMLElement, instant: boolean) => {
      const reels = card.querySelectorAll<HTMLElement>('.ds-odo-reel');
      reels.forEach((reel, i) => {
        const n = Number(reel.dataset.n);
        const to = { yPercent: (-(n - 1) / n) * 100 };
        if (instant) gsap.set(reel, to);
        else gsap.to(reel, { ...to, duration: 0.7, delay: i * 0.06, ease: 'power3.out' });
      });
      if (instant) gsap.set(card, { '--corner': 1 });
      else gsap.to(card, { '--corner': 1, duration: 0.6, ease: 'power2.out' });
    };
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          land(e.target as HTMLElement, false);
          io.unobserve(e.target);
        }),
      { rootMargin: `0px 0px -${Math.round((1 - line) * 100)}% 0px` },
    );
    cards.forEach((card) => {
      if (card.getBoundingClientRect().top < window.innerHeight * line) land(card, true);
      else {
        gsap.set(card, { '--corner': 0.6 });
        io.observe(card);
      }
    });
    return () => {
      io.disconnect();
      mm.revert();
    };
  });

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
    <section ref={sectionRef} id="record" className="ds-record" aria-labelledby="record-title">
      <div className="ds-sec-head">
        <RevealHeading id="record-title" className="ds-display-lg">
          The record so far.
        </RevealHeading>
        {/* Design review (2026-10-13): the old line repeated the hero's headline. */}
        <RevealLead className="ds-lead">Federal agencies and commercial clients hold us to the same record.</RevealLead>
      </div>

      <ul ref={listRef} className="ds-values-list">
        {VALUES.map((v) => (
          <li key={v.name} className="ds-value" data-light={v.light}>
            <div className="ds-value-light">
              <Figure value={v.figure} roll={v.roll} />
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
