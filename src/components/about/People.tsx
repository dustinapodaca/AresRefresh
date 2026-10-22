import { useEffect, useRef, useState, type CSSProperties } from 'react';
import Arrow from '../Arrow';
import { INDEED_REVIEWS } from '../careers/data';
import { STANDARDS } from './data';
import { responsive } from '../../lib/responsive';

const n2 = (i: number) => String(i + 1).padStart(2, '0');
// Desktop: the share of the stage at which each row checks (owner, 2026-10-18). Row 03 also
// turns the plate to the second officer.
const AT = [0.12, 0.3, 0.48, 0.66, 0.84];

const SHOTS = [
  {
    src: '/images/officer-portrait.jpg',
    alt: 'Ares Security officer in uniform with an ID lanyard and a radio on the duty belt, arms crossed, smiling',
  },
  {
    src: '/images/backbone-officer.jpg',
    alt: 'Ares Security officer in a black Ares polo, smiling, in front of a brick wall',
  },
];

function Check() {
  return (
    <svg className="ds-ab-cred-check" width="28" height="28" viewBox="0 0 28 28" aria-hidden="true">
      <circle cx="14" cy="14" r="12.5" />
      <path d="M8.75 14.4l3.4 3.4 7.1-7.6" pathLength={1} />
    </svg>
  );
}

// 03 Who stands your post (owner, 2026-10-18): an officer credential. Two real officers share
// one plate while a liquid glass card, set like an ID, checks off the five standards.
// Desktop: a 260vh stage with a sticky frame; scroll progress (--p, one passive rAF listener)
// eases the plate from 1.06 to 1 and checks the rows at AT; as row 03 checks, the plate turns to
// the second officer. Phones and tablets: no pin; the rows check at the optical center (the page's
// scroll observer, set up in About.tsx after this effect) while the photo holds under the nav and
// the card passes over it; the officers crossfade with the scroll while the card covers the photo,
// and the photo ends clear below the card. It all reverses on the way up; the checks stay.
// Without JavaScript, in the prerender, and under reduced motion: both portraits side by side
// above the card, every row checked. The motion is armed only after mount (data-anim).
export default function People() {
  const ref = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const after = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<'desktop' | 'phone' | null>(null);

  // Arm, and on phones hand the rows to the page's scroll observer (center, once). Runs before
  // About's observer setup, since a child's effects run before its parent's.
  useEffect(() => {
    const root = ref.current;
    if (!root || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const desktop = window.matchMedia('(min-width: 1024px)').matches;
    if (!desktop) {
      const mid = window.innerHeight / 2;
      root.querySelectorAll<HTMLElement>('.ds-ab-cred-row').forEach((row) => {
        const r = row.getBoundingClientRect();
        if (r.top + r.height / 2 < mid) row.setAttribute('data-in-view', 'true');
        else {
          row.setAttribute('data-scroll-active', '');
          row.setAttribute('data-scroll-once', '');
          row.setAttribute('data-scroll-center', '');
        }
      });
    }
    setMode(desktop ? 'desktop' : 'phone');
  }, []);

  // Desktop: progress through the stage drives the scale and the checks (never unchecking).
  // Both: the photo follows the scroll both ways (owner, 2026-10-18): on desktop the second officer
  // past the point where row 03 checks, the first again above it; on phones once the card covers
  // half of the photo.
  useEffect(() => {
    if (!mode) return;
    const root = ref.current;
    const box = stage.current;
    if (!root || !box) return;
    const rows = Array.from(root.querySelectorAll<HTMLElement>('.ds-ab-cred-row'));
    const plate = root.querySelector<HTMLElement>('.ds-ab-cred-plate')!;
    const card = root.querySelector<HTMLElement>('.ds-ab-cred-card')!;
    let raf = 0;
    const update = () => {
      raf = 0;
      if (mode === 'desktop') {
        const r = box.getBoundingClientRect();
        const frame = box.firstElementChild as HTMLElement | null;
        const travel = r.height - (frame?.offsetHeight ?? window.innerHeight);
        const p = Math.min(1, Math.max(0, travel > 0 ? -r.top / travel : 1));
        root.style.setProperty('--p', p.toFixed(4));
        rows.forEach((row, i) => {
          if (p >= AT[i] && row.getAttribute('data-in-view') !== 'true') row.setAttribute('data-in-view', 'true');
        });
        const second = p >= AT[2];
        const photo = second ? '2' : '1';
        if (root.dataset.photo !== photo) root.dataset.photo = photo;
      } else {
        // Phones: the photo holds while the card passes over it (owner, 2026-10-18). The two officers
        // crossfade with the scroll (--swap, 0 to 1): from when the card covers about 85% of the first
        // to when row 05 reaches the middle of the screen and checks, so the second is whole before it
        // comes out below the card.
        const pr = plate.getBoundingClientRect();
        const cr = card.getBoundingClientRect();
        const last = rows[rows.length - 1].getBoundingClientRect();
        const start = pr.top + pr.height * 0.15;
        const range = start + (last.top + last.height / 2 - cr.top) - window.innerHeight / 2;
        const swap = range > 0 ? Math.min(1, Math.max(0, (start - cr.top) / range)) : cr.top < start ? 1 : 0;
        root.style.setProperty('--swap', swap.toFixed(4));
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
    };
  }, [mode]);

  // Phones: the closing line rides inside the frame and holds just under the photo with it, so it is
  // already there when the card clears the photo (owner, 2026-10-18). The CSS needs its height.
  useEffect(() => {
    const root = ref.current;
    const box = after.current;
    if (mode !== 'phone' || !root || !box) return;
    const ro = new ResizeObserver(() => root.style.setProperty('--after-h', `${box.offsetHeight}px`));
    ro.observe(box);
    return () => ro.disconnect();
  }, [mode]);

  // The closing line, two-toned like the founder letter.
  const close = (
    <div ref={after} className="ds-ab-cred-after">
      <p className="ds-ab-cred-close">
        <span>Officers who are treated well stay, and officers who stay know your site:</span> fair pay on time,
        and a supervisor who answers.
      </p>
      <a href={INDEED_REVIEWS} target="_blank" rel="noopener noreferrer" className="ds-link ds-data ds-ab-cred-proof">
        On Indeed they rate us 4.8 out of 5
        <Arrow external size={14} />
      </a>
    </div>
  );

  return (
    <section ref={ref} id="people" className="ds-ab-cred" data-anim={mode ?? undefined} style={{ '--p': 0 } as CSSProperties} aria-labelledby="people-title">
      <div className="ds-ab-cred-head">
        <h2 id="people-title" className="ds-display-lg">
          Who stands your post.
        </h2>
        <p className="ds-lead">Every officer meets the same standard before they reach your door.</p>
      </div>

      <div ref={stage} className="ds-ab-cred-stage">
        <div className="ds-ab-cred-frame">
          <div className="ds-ab-cred-plate">
            <div className="ds-ab-cred-shots">
              {SHOTS.map((s, i) => (
                <figure key={s.src} className="ds-ab-cred-shot" data-shot={i + 1}>
                  <img {...responsive(s.src, '(min-width: 1024px) 45vw, (min-width: 768px) 100vw, 124vw')} alt={s.alt} loading="lazy" decoding="async" />
                </figure>
              ))}
            </div>
          </div>

          <div className="ds-ab-cred-card">
            <p className="ds-data ds-ab-cred-bar">
              <span>Officer standard</span>
              <span>{n2(STANDARDS.length - 1)} checks</span>
            </p>
            <ol className="ds-ab-cred-rows">
              {STANDARDS.map((s, i) => (
                <li key={s.name} className="ds-ab-cred-row">
                  <span className="ds-data ds-ab-cred-n" aria-hidden="true">{n2(i)}</span>
                  <span className="ds-ab-cred-text">
                    <span className="ds-ab-cred-word">{s.name}</span>
                    <span className="ds-ab-cred-line">{s.line}</span>
                  </span>
                  <Check />
                </li>
              ))}
            </ol>
            <p className="ds-data ds-ab-cred-foot">Ares Security · Colorado</p>
          </div>
          {mode === 'phone' && close}
        </div>
      </div>

      {mode !== 'phone' && close}
    </section>
  );
}
