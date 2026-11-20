import { useId, type ReactNode } from 'react';

// Insight plates (2026-11-19): one authored line drawing per article, so each post shows what
// it is about without a photograph. The site's own language: hairlines in ink on the dot grid,
// one rust accent with a soft light behind it (the officer, the open item, the post that
// matters), labels in the data face. Drawn at 320 by 200; strokes keep their width at any size
// (non-scaling), and labels drop out on the small plates, where they could not be read.
// After Linear's blog (line drawings on black cards) on Mobbin.

type Art = { caption: string; draw: (k: Keys) => ReactNode };
type Keys = { glow: string };

const T = (x: number, y: number, s: string, anchor: 'start' | 'middle' | 'end' = 'start', cls = 'ia-t') => (
  <text x={x} y={y} textAnchor={anchor} className={cls}>{s}</text>
);
const Glow = ({ k, x, y, r = 46 }: { k: Keys; x: number; y: number; r?: number }) => <circle cx={x} cy={y} r={r} fill={`url(#${k.glow})`} />;
const tick = (x: number, y: number) => <path className="ia-l" d={`M${x + 3} ${y} l3.5 3.5 l6 -7.5`} />;

const ARTS: Record<string, Art> = {
  'what-does-an-access-control-officer-do': {
    caption: 'Credentials checked at the entry point, and every entry logged.',
    draw: (k) => (
      <>
        <Glow k={k} x={190} y={116} />
        {/* the boundary with its one entry point */}
        <path className="ia-l" d="M172 24V82M172 118V176M164 82h16M164 118h16" />
        <rect className="ia-l" x="180" y="58" width="10" height="14" rx="1" />
        <path className="ia-f" d="M183 63h4" />
        {/* the queue, the person at the door, the one through */}
        <circle className="ia-d ia-dim" cx="52" cy="100" r="4.5" />
        <circle className="ia-d ia-dim" cx="78" cy="100" r="4.5" />
        <circle className="ia-d ia-dim" cx="104" cy="100" r="4.5" />
        <circle className="ia-d" cx="148" cy="100" r="4.5" />
        <path className="ia-f ia-dash" d="M158 100H222" />
        <circle className="ia-d" cx="230" cy="100" r="4.5" />
        {/* the officer */}
        <circle className="ia-rf" cx="190" cy="116" r="4.5" />
        <circle className="ia-r" cx="190" cy="116" r="10" />
        {/* the log */}
        <rect className="ia-f" x="252" y="42" width="48" height="116" rx="2" />
        <path className="ia-f" d="M260 58h32M260 72h26M260 86h32M260 100h22M260 114h30M260 128h24" />
        <path className="ia-r" d="M260 142h18" />
        {T(176, 18, 'Entry point')}
        {T(252, 34, 'Log')}
      </>
    ),
  },
  'what-primes-look-for-security-subcontractor': {
    caption: 'The prime holds the contract; the subcontractor staffs the posts.',
    draw: (k) => (
      <>
        <Glow k={k} x={171} y={100} />
        <rect className="ia-l" x="24" y="78" width="74" height="44" rx="2" />
        <path className="ia-l" d="M98 100H134" />
        <rect className="ia-card ia-r" x="134" y="78" width="74" height="44" rx="2" />
        <path className="ia-l" d="M208 100H226M226 100C240 100 236 46 250 46M226 100H250M226 100C240 100 236 154 250 154" />
        <rect className="ia-l" x="250" y="34" width="52" height="24" rx="2" />
        <rect className="ia-l" x="250" y="88" width="52" height="24" rx="2" />
        <rect className="ia-l" x="250" y="142" width="52" height="24" rx="2" />
        {T(61, 104, 'Prime', 'middle')}
        {T(171, 104, 'Ares', 'middle', 'ia-t ia-tr')}
        {T(276, 50, 'Escort', 'middle')}
        {T(276, 104, 'Access', 'middle')}
        {T(276, 158, 'Relief', 'middle')}
      </>
    ),
  },
  'contractor-escorts-military-bases': {
    caption: 'Every escortee in the escort officer’s line of sight, inside the restricted area.',
    draw: (k) => (
      <>
        <Glow k={k} x={196} y={100} r={60} />
        <path className="ia-l ia-dash" d="M70 86V26H298V174H70V114" />
        <path className="ia-l" d="M64 86h12M64 114h12" />
        <path className="ia-f ia-dash" d="M20 100H146" />
        <circle className="ia-r ia-dash" cx="196" cy="100" r="48" />
        <circle className="ia-d" cx="172" cy="84" r="4" />
        <circle className="ia-d" cx="220" cy="82" r="4" />
        <circle className="ia-d" cx="174" cy="120" r="4" />
        <circle className="ia-d" cx="218" cy="120" r="4" />
        <circle className="ia-rf" cx="196" cy="102" r="5" />
        {T(70, 18, 'Restricted area')}
        {T(196, 166, 'Line of sight', 'middle', 'ia-t ia-tr')}
        {T(20, 92, 'Entry')}
      </>
    ),
  },
  'how-to-choose-a-security-company-colorado': {
    caption: 'What to check before you sign.',
    draw: (k) => {
      const rows = ['City license', 'Insurance', 'Who the officers work for', 'Site walk', 'Call-out cover', 'Who answers'];
      const lens = [56, 70, 40, 64, 50, 0];
      return (
        <>
          <Glow k={k} x={71} y={164} r={40} />
          {rows.map((label, i) => {
            const y = 34 + i * 26;
            const last = i === rows.length - 1;
            return (
              <g key={label}>
                <rect className={last ? 'ia-r' : 'ia-l'} x="64" y={y - 7} width="14" height="14" rx="2" />
                {!last && tick(64, y)}
                {T(90, y + 3.5, label, 'start', last ? 'ia-t ia-tr' : 'ia-t')}
                {lens[i] > 0 && <path className="ia-f" d={`M${246} ${y}h${lens[i]}`} />}
              </g>
            );
          })}
        </>
      );
    },
  },
  'security-guard-cost-colorado': {
    caption: 'A post covered around the clock is 168 hours a week.',
    draw: (k) => {
      const cells: ReactNode[] = [];
      for (let d = 0; d < 7; d++) for (let h = 0; h < 24; h++) cells.push(<rect key={`${d}-${h}`} className="ia-cell" x={44 + h * 11} y={44 + d * 15} width="9" height="13" rx="1" />);
      return (
        <>
          <Glow k={k} x={175} y={176} r={50} />
          {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => <g key={i}>{T(34, 54 + i * 15, d, 'middle', 'ia-t ia-tf')}</g>)}
          {T(44, 36, '00:00', 'start', 'ia-t ia-tf')}
          {T(176, 36, '12:00', 'middle', 'ia-t ia-tf')}
          {T(306, 36, '24:00', 'end', 'ia-t ia-tf')}
          {cells}
          <path className="ia-r" d="M44 158v6H306v-6" />
          {T(175, 182, '168 hours a week', 'middle', 'ia-t ia-tr')}
        </>
      );
    },
  },
  'relief-surge-coverage': {
    caption: 'A call-out covered from the week’s on-call schedule.',
    draw: (k) => {
      const x0 = 56;
      const tiles: ReactNode[] = [];
      for (let r = 0; r < 3; r++)
        for (let c = 0; c < 7; c++) {
          const hit = r === 2 && c === 3;
          const x = x0 + c * 36, y = 36 + r * 28;
          tiles.push(
            <g key={`${r}-${c}`}>
              <rect className={hit ? 'ia-r' : 'ia-f'} x={x} y={y} width="30" height="20" rx="2" />
              <circle className={hit ? 'ia-rf' : 'ia-d ia-dim'} cx={x + 15} cy={y + 10} r="2.2" />
            </g>,
          );
        }
      const cx = x0 + 3 * 36 + 15;
      return (
        <>
          <Glow k={k} x={cx} y={112} r={44} />
          {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => <g key={i}>{T(x0 + i * 36 + 15, 28, d, 'middle', 'ia-t ia-tf')}</g>)}
          {T(48, 50, 'Day', 'end', 'ia-t ia-tf')}
          {T(48, 78, 'Swing', 'end', 'ia-t ia-tf')}
          {T(48, 106, 'Night', 'end', 'ia-t ia-tf')}
          {tiles}
          {Array.from({ length: 7 }, (_, c) => <rect key={c} className={c === 3 ? 'ia-r ia-dash' : 'ia-f ia-dash'} x={x0 + c * 36} y="140" width="30" height="14" rx="2" />)}
          <path className="ia-r" d={`M${cx} 140V118M${cx - 4} 123l4 -5 4 5`} />
          {T(48, 150, 'On-call', 'end', 'ia-t ia-tf')}
          {T(x0, 182, 'Thursday night covered', 'start', 'ia-t ia-tr')}
        </>
      );
    },
  },
  'armed-or-unarmed-security': {
    caption: 'Unarmed or armed: decided by what the officer may have to stop.',
    draw: (k) => (
      <>
        <Glow k={k} x={236} y={96} r={44} />
        <path className="ia-f" d="M160 30V170" />
        <circle className="ia-l" cx="84" cy="96" r="30" />
        <circle className="ia-f" cx="84" cy="96" r="44" />
        <circle className="ia-d" cx="84" cy="96" r="4.5" />
        <circle className="ia-l" cx="236" cy="96" r="34" />
        <circle className="ia-f" cx="236" cy="96" r="22" />
        <circle className="ia-r" cx="236" cy="96" r="10" />
        <path className="ia-f" d="M236 52V140M192 96H280" />
        <circle className="ia-rf" cx="236" cy="96" r="3" />
        {T(84, 166, 'Unarmed', 'middle')}
        {T(236, 166, 'Armed', 'middle')}
      </>
    ),
  },
  'what-is-a-post-order': {
    caption: 'One post order for each post, every duty in the order it happens.',
    draw: (k) => (
      <>
        <Glow k={k} x={160} y={124} r={54} />
        <rect className="ia-f" x="124" y="32" width="118" height="152" rx="2" />
        <rect className="ia-card ia-l" x="100" y="22" width="118" height="156" rx="2" />
        <rect className="ia-card ia-l" x="144" y="16" width="30" height="10" rx="2" />
        <path className="ia-l" d="M112 42h70" />
        {[0, 1, 2, 3, 4, 5].map((i) => {
          const y = 64 + i * 18;
          const hot = i === 3;
          return (
            <g key={i}>
              {T(112, y + 3, `0${i + 1}`, 'start', hot ? 'ia-t ia-tr' : 'ia-t ia-tf')}
              <path className={hot ? 'ia-r' : 'ia-f'} d={`M132 ${y}h${[70, 56, 64, 74, 48, 60][i]}`} />
            </g>
          );
        })}
        <path className="ia-r" d="M95 112v14" />
      </>
    ),
  },
  'construction-site-security': {
    caption: 'The gate, the perimeter, and after hours on an active build.',
    draw: (k) => (
      <>
        <Glow k={k} x={252} y={176} r={40} />
        <path className="ia-l" d="M20 160H300" />
        <path className="ia-l" d="M70 160V70M100 160V70M130 160V70M160 160V70M70 150H160M70 130H160M70 110H160M70 90H160M70 70H160" />
        <path className="ia-f" d="M190 160V110M220 160V130M160 130H220M160 110H190" />
        <path className="ia-l" d="M232 160V30M150 34H300M232 30l-16 4M180 34V62" />
        <path className="ia-f" d="M174 62h12v8h-12z" />
        <path className="ia-f ia-dash" d="M20 178H240M264 178H300" />
        <path className="ia-l" d="M240 172v12M264 172v12" />
        <circle className="ia-rf" cx="252" cy="178" r="4" />
        {T(252, 196, 'Gate', 'middle', 'ia-t ia-tr')}
        {T(20, 194, 'Perimeter', 'start', 'ia-t ia-tf')}
      </>
    ),
  },
  'buying-security-through-gsa': {
    caption: 'An agency orders from a schedule holder at its ceiling prices.',
    draw: (k) => (
      <>
        <Glow k={k} x={160} y={100} r={56} />
        <rect className="ia-l" x="18" y="82" width="74" height="36" rx="2" />
        <path className="ia-l" d="M92 100H124M196 100H228" />
        <path className="ia-l" d="M120 96l4 4-4 4M224 96l4 4-4 4" />
        <rect className="ia-card ia-r" x="124" y="66" width="72" height="68" rx="2" />
        <rect className="ia-l" x="228" y="82" width="74" height="36" rx="2" />
        <path className="ia-f" d="M134 150h52M134 160h40M134 170h48" />
        {T(55, 104, 'Agency', 'middle')}
        {T(160, 94, 'GSA MAS', 'middle', 'ia-t ia-tr')}
        {T(160, 112, 'SIN 561612', 'middle', 'ia-t ia-tf')}
        {T(265, 104, 'Order', 'middle')}
        {T(134, 144, 'Price list', 'start', 'ia-t ia-tf')}
      </>
    ),
  },
  'colorado-security-licensing': {
    caption: 'No state license: Denver, Colorado Springs, and Pueblo each license their own.',
    draw: (k) => (
      <>
        <Glow k={k} x={185} y={106} r={44} />
        <rect className="ia-l" x="40" y="30" width="240" height="140" rx="1" />
        <path className="ia-f" d="M178 30L179 74L185 106L192 126L196 170" />
        <path className="ia-f" d="M160 113l5 -9 5 9z" />
        <circle className="ia-d" cx="179" cy="74" r="3.5" />
        <circle className="ia-d" cx="192" cy="126" r="3.5" />
        <circle className="ia-r" cx="185" cy="106" r="9" />
        <circle className="ia-rf" cx="185" cy="106" r="3.5" />
        {T(171, 77, 'Denver', 'end')}
        {T(199, 109, 'Colorado Springs', 'start', 'ia-t ia-tr')}
        {T(202, 130, 'Pueblo')}
        {T(40, 22, 'Colorado')}
      </>
    ),
  },
};

// A plain sheet for any future article that has no drawing yet.
const FALLBACK: Art = {
  caption: '',
  draw: (k) => (
    <>
      <Glow k={k} x={160} y={124} r={50} />
      <rect className="ia-card ia-l" x="112" y="26" width="96" height="148" rx="2" />
      <path className="ia-l" d="M124 46h56" />
      <path className="ia-f" d="M124 66h70M124 82h58M124 98h66M124 114h52M124 130h62" />
      <path className="ia-r" d="M124 146h38" />
    </>
  ),
};

export function artCaption(slug: string) {
  return (ARTS[slug] ?? FALLBACK).caption;
}

/** The plate for one article. `size="sm"` drops the labels (the index rows); `grid={false}`
 *  leaves the dot grid to the frame (the article's wide plate draws its own). */
export default function InsightArt({ slug, size = 'md', grid: showGrid = true, className = '' }: { slug: string; size?: 'sm' | 'md' | 'lg'; grid?: boolean; className?: string }) {
  const uid = useId().replace(/:/g, '');
  const k = { glow: `ia-glow-${uid}` };
  const grid = `ia-grid-${uid}`;
  const fade = `ia-fade-${uid}`;
  const art = ARTS[slug] ?? FALLBACK;
  return (
    <svg className={`ds-ia ${className}`} data-size={size} viewBox="0 0 320 200" aria-hidden="true" focusable="false" preserveAspectRatio="xMidYMid meet">
      <defs>
        <pattern id={grid} width="10" height="10" patternUnits="userSpaceOnUse">
          <circle cx="5" cy="5" r="0.7" className="ia-grid-dot" />
        </pattern>
        <radialGradient id={fade} cx="50%" cy="50%" r="62%">
          <stop offset="0.55" stopColor="#fff" />
          <stop offset="1" stopColor="#000" />
        </radialGradient>
        <mask id={`${fade}-m`}>
          <rect width="320" height="200" fill={`url(#${fade})`} />
        </mask>
        <radialGradient id={k.glow}>
          <stop offset="0" stopColor="#bc6f40" stopOpacity="0.3" />
          <stop offset="0.45" stopColor="#8b4920" stopOpacity="0.12" />
          <stop offset="1" stopColor="#8b4920" stopOpacity="0" />
        </radialGradient>
      </defs>
      {showGrid && <rect width="320" height="200" fill={`url(#${grid})`} mask={`url(#${fade}-m)`} />}
      <g className="ia-draw">{art.draw(k)}</g>
    </svg>
  );
}
