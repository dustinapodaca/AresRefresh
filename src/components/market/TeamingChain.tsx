import { useEffect, useRef } from 'react';

// How teaming works, as three steps on one hairline (owner, 2026-10-25: the AI-tells pass; replaces
// the prime pipeline on /teaming and the prime strip on the Government & Defense page). The prime,
// Ares as its subcontractor, and the posts, each a short plain statement; no boxes, tags, dots, or
// glow. The hairline down the left fills rust with the scroll and each step comes up from 0.62 as the
// fill reaches it, the same as the four stages on phones; scrubbed, so it reverses. Drawn and lit by
// default (no JavaScript, the prerender, reduced motion); the waiting state is armed after mount.
const STEPS = [
  {
    who: 'The prime contractor',
    what: <>Holds the contract and needs posts covered under it.</>,
  },
  {
    who: 'Ares Security, as subcontractor',
    what: (
      <>
        A woman-owned small business, <span className="ds-data">SBA WOSB250470</span> and{' '}
        <span className="ds-data">WBENC WBE2303571</span>, so the work counts toward the prime&rsquo;s
        small-business subcontracting goals.
      </>
    ),
  },
  {
    who: 'The posts',
    what: <>Restricted-area escort, access control, and relief, overflow, and surge coverage.</>,
  },
];

export default function TeamingChain({ className = '' }: { className?: string }) {
  const ref = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const steps = Array.from(el.querySelectorAll<HTMLElement>('.ds-tc-step'));
    el.dataset.live = 'true';
    let raf = 0;
    const update = () => {
      raf = 0;
      // The fill starts as the chain's top passes 75% of the window and is full as its foot passes 35%.
      const r = el.getBoundingClientRect();
      const span = Math.max(1, r.height);
      const vh = window.innerHeight;
      const p = Math.min(1, Math.max(0, (vh * 0.75 - r.top) / (span + vh * 0.4)));
      el.style.setProperty('--tc', p.toFixed(4));
      const y = p * span;
      steps.forEach((s) => {
        const on = y >= s.offsetTop + 6;
        if ((s.dataset.on === 'true') !== on) s.dataset.on = String(on);
      });
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
      delete el.dataset.live;
    };
  }, []);

  return (
    <ol ref={ref} className={`ds-tc ${className}`.trim()} aria-label="How teaming works">
      {STEPS.map((s) => (
        <li key={s.who} className="ds-tc-step">
          <p className="ds-tc-who">{s.who}</p>
          <p className="ds-tc-what">{s.what}</p>
        </li>
      ))}
    </ol>
  );
}
