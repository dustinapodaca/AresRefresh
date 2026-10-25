import { useRef, type CSSProperties, type ReactNode } from 'react';
import Arrow from '../Arrow';
import { INDEED_REVIEWS } from '../careers/data';
import { readIn, useScene, words, SCRUB } from './engine';
import './nx-record.css';

// 01 The record (home-flora, 2026-10-20): "Proof you can see." Each of the three figures gets a
// whole screen and a diagram drawn only from its own number, never a count we don't have:
// <1% as a 10 x 10 field that fills (fewer than 1 in 100), 43/45 as 45 criteria with 43 lit and
// 2 outlined, 4.8/5 as five bars with the last at 80%. On desktop with motion the section holds
// still while the three moments play in turn; the digits roll into place from nearby values,
// never from 0. Resolved default (prerender, phones, reduced motion): the three moments stacked,
// every diagram built.

// The three proofs (owner, 2026-10-06 to 2026-10-18).
const VALUES: {
  name: string;
  figure: string;
  caption: string;
  href?: string;
  line: string;
}[] = [
  {
    name: 'Reliability',
    figure: '<1%',
    caption: 'Missed shifts since 2021',
    line: 'On-call coverage is written into every contract, and leadership works the first shift on every new post.',
  },
  {
    // Was "Integrity" with 16/18 (owner, 2026-10-10: all five past performance evaluations).
    name: 'Client rating',
    figure: '43/45',
    caption: 'Criteria rated Very Good or Exceptional',
    line: 'Across five past performance evaluations since 2021, clients rated Ares Very Good or Exceptional on 43 of 45 criteria, with none below Satisfactory.',
  },
  {
    name: 'Personnel',
    figure: '4.8/5',
    caption: 'Employee rating on Indeed',
    href: INDEED_REVIEWS,
    // Says what the 4.8 is about (copy audit round 3, 2026-10-10; Careers says the same).
    line: 'On Indeed, where the reviews are public, our officers rate us highest for management and work-life balance.', // longer (owner, 2026-10-18) so it runs 3 lines or more on phones
  },
];


// Nearby values each digit rolls through (ending on its own), never counting up from 0.
// "<1%" rolls down toward 1, the rest roll up into place.
function rollFor(d: number, down: boolean) {
  return down ? [d + 3, d + 2, d + 1, d] : [d - 3, d - 2, d - 1, d].map((v) => (v + 10) % 10);
}

function Figure({ figure }: { figure: string }) {
  const down = figure.startsWith('<');
  // The value's own part rolls; a denominator ("/45", "/5") stays put and reads quieter.
  const [own, denom] = figure.split('/');
  const chars = own.split('');
  return (
    <p className="nx-rec-num">
      <span className="nx-sr">{figure}</span>
      <span aria-hidden="true" className="nx-rec-digits">
        {chars.map((c, i) =>
          /\d/.test(c) ? (
            // eslint-disable-next-line react/no-array-index-key
            <span key={i} className="nx-odo">
              <span className="nx-odo-strip" style={{ ['--n' as string]: 4 }}>
                {rollFor(Number(c), down).map((v, k) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <span key={k}>{v}</span>
                ))}
              </span>
            </span>
          ) : (
            // eslint-disable-next-line react/no-array-index-key
            <span key={i} className="nx-rec-sym">
              {c}
            </span>
          ),
        )}
        {denom && <span className="nx-rec-denom">/{denom}</span>}
      </span>
    </p>
  );
}

function Diagram({ i }: { i: number }): ReactNode {
  if (i === 0)
    return (
      <div className="nx-rec-grid" data-kind="hundred">
        {Array.from({ length: 100 }, (_, k) => (
          <i key={k} className="nx-sq" />
        ))}
      </div>
    );
  if (i === 1)
    return (
      <div className="nx-rec-grid" data-kind="criteria">
        {Array.from({ length: 45 }, (_, k) => (
          <i key={k} className="nx-sq" data-off={k >= 43 || undefined} />
        ))}
      </div>
    );
  return (
    <div className="nx-rec-bars">
      {[1, 1, 1, 1, 0.8].map((f, k) => (
        // eslint-disable-next-line react/no-array-index-key
        <span key={k} className="nx-bar">
          <i style={{ ['--f' as string]: f }} />
        </span>
      ))}
    </div>
  );
}

const CAPTION_MONO = [
  'Fewer than 1 in 100 shifts missed · since 2021',
  '5 past performance evaluations · 45 criteria · none below Satisfactory',
  'Indeed · employee rating',
];

export default function Record() {
  const ref = useRef<HTMLElement>(null);

  useScene(ref, (e, root) => {
    const { gsap } = e;
    readIn(e, root.querySelector('.nx-rec-head h2'));

    const moments = gsap.utils.toArray<HTMLElement>('.nx-rec-moment', root);
    const stage = root.querySelector<HTMLElement>('.nx-rec-stage')!;
    const tabs = gsap.utils.toArray<HTMLElement>('.nx-rec-tab', root);
    const meter = root.querySelector<HTMLElement>('.nx-rec-meter i');

    const roll = (m: HTMLElement) =>
      gsap.fromTo(
        m.querySelectorAll('.nx-odo-strip'),
        { y: 0, yPercent: 0 },
        { yPercent: -75, duration: 0.7, ease: 'power3.out', stagger: 0.06, overwrite: true },
      );
    const build = (m: HTMLElement) => {
      const sq = m.querySelectorAll('.nx-sq');
      const bars = m.querySelectorAll('.nx-bar i');
      return { sq, bars };
    };

    const mm = gsap.matchMedia();
    // Pinned at every width where motion runs (phones and tablets too since 2026-10-25, owner; they
    // had the three stacked): about a screen per figure on desktop, a little less on a phone.
    mm.add({ wide: '(min-width: 1024px)', narrow: '(max-width: 1023px)' }, (ctx) => {
      const narrow = !!ctx.conditions?.narrow;
      root.dataset.pin = 'on';
      // Narrow screens: every slide's words take the tallest one's height, so the three line up.
      const evenUp = () => {
        stage.style.removeProperty('--rec-copy-h');
        stage.style.removeProperty('--rec-viz-h');
        if (!narrow) return;
        const tallest = (sel: string) => Math.max(...moments.map((m) => m.querySelector<HTMLElement>(sel)?.offsetHeight ?? 0));
        stage.style.setProperty('--rec-copy-h', `${tallest('.nx-rec-copy')}px`);
        stage.style.setProperty('--rec-viz-h', `${tallest('.nx-rec-viz')}px`);
      };
      evenUp();
      e.ScrollTrigger.addEventListener('refreshInit', evenUp);
      gsap.set(moments.slice(1), { autoAlpha: 0 });
      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: stage,
          start: 'top top',
          end: '+=' + moments.length * (narrow ? 80 : 95) + '%',
          pin: true,
          scrub: SCRUB,
          onUpdate: (self) => {
            const at = Math.min(moments.length - 1, Math.floor(self.progress * moments.length * 0.9999));
            if (stage.dataset.at !== String(at)) {
              stage.dataset.at = String(at);
              tabs.forEach((t, k) => {
                t.dataset.live = k === at ? 'true' : 'false';
                t.dataset.past = k < at ? 'true' : 'false';
              });
              roll(moments[at]);
            }
            if (meter) meter.style.transform = `scaleX(${self.progress})`;
          },
        },
      });
      moments.forEach((m, k) => {
        const { sq, bars } = build(m);
        const at = k;
        if (k > 0) {
          tl.to(moments[k - 1], { autoAlpha: 0, y: -40, duration: 0.25 }, at - 0.05);
          tl.fromTo(m, { autoAlpha: 0, y: 60 }, { autoAlpha: 1, y: 0, duration: 0.3 }, at);
        }
        if (sq.length)
          tl.fromTo(
            sq,
            { opacity: 0.08, scale: 0.4 },
            { opacity: 1, scale: 1, duration: 0.5, stagger: { each: 0.5 / sq.length, from: 'start' } },
            at + 0.08,
          );
        if (bars.length)
          tl.fromTo(bars, { scaleX: 0 }, { scaleX: 1, duration: 0.45, stagger: 0.07 }, at + 0.08);
        tl.fromTo(
          m.querySelectorAll('.nx-rec-cap, .nx-rec-line'),
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.2, stagger: 0.06 },
          at + 0.12,
        );
        tl.to({}, { duration: 0.3 }, at + 0.6);
      });
      roll(moments[0]);
      tabs[0] && (tabs[0].dataset.live = 'true');
      return () => {
        e.ScrollTrigger.removeEventListener('refreshInit', evenUp);
        stage.style.removeProperty('--rec-copy-h');
        stage.style.removeProperty('--rec-viz-h');
        delete root.dataset.pin;
        delete stage.dataset.at;
      };
    });
    return () => mm.revert();
  });

  return (
    <section ref={ref} id="record" className="nx-record" aria-labelledby="nx-record-title">
      <header className="nx-rec-head nx-edge">
        <h2 id="nx-record-title" className="nx-statement">
          {words('The record so far.')}
        </h2>
        <p className="nx-rec-lead">Federal agencies and commercial clients hold us to the same record.</p>
      </header>

      <div className="nx-rec-stage">
        <div className="nx-rec-tabs nx-edge" aria-hidden="true">
          {VALUES.map((v, i) => (
            <span key={v.name} className="nx-rec-tab" data-live={i === 0} style={{ ['--k' as string]: i, ['--n' as string]: VALUES.length } as CSSProperties}>
              {v.name}
            </span>
          ))}
          <span className="nx-rec-meter">
            <i />
          </span>
        </div>
        <div className="nx-rec-moments nx-edge">
          {VALUES.map((v, i) => (
            <figure key={v.name} className="nx-rec-moment nx-node" data-live="true">
              <div className="nx-rec-copy">
                <Figure figure={v.figure} />
                <figcaption className="nx-rec-cap">
                  {v.href ? (
                    <a href={v.href} target="_blank" rel="noopener noreferrer" className="nx-rec-caption">
                      {v.caption}
                      <Arrow external size={12} />
                    </a>
                  ) : (
                    <span className="nx-rec-caption">{v.caption}</span>
                  )}
                </figcaption>
                <p className="nx-rec-line">{v.line}</p>
              </div>
              <div className="nx-rec-viz" aria-hidden="true">
                <Diagram i={i} />
                <p className="nx-rec-mono">{CAPTION_MONO[i]}</p>
              </div>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
