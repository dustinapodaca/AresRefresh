import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Seo from '../seo/Seo';
import Arrow from '../components/Arrow';
import CopyButton from '../components/capability/CopyButton';
import { DownloadIcon } from '../components/capability/Hero';
import {
  CAPABILITIES,
  CRED_GROUPS,
  DIFFERENTIATORS,
  GSA_SPECS,
  PAST_PERFORMANCE,
  PATHS,
  PDF_URL,
  SAM_ACTIVE_THROUGH,
  SAM_VERIFY,
  THIRD_PERSON,
} from '../components/capability/data';
import { ROLE_PAGES } from '../components/market/roles';
import { GSA_ELIBRARY } from '../components/home/links';
import { responsive } from '../lib/responsive';
import { motionAllowed } from '../components/home/engine';
import '../components/home/home.css';
import '../components/capnext/cn.css';

// Capability Statement, "The company card" (from the home-flora (4) bundle's /capability-next, third start, 2026-10-23; owner: "start over", for people who just
// need the information, fitting the new Home and Services).
//
// "The company card." Home has one striking visual (the terrain inside the headline) and Services
// has one (the post canvas); this page's is the thing a contracting officer actually wants: the
// company's identifiers, set as a credential card (the CR80 card ratio, like a badge) floating in
// glass over the Denver hero photo. The card turns a little under the cursor;
// every number on it copies with a click.
//
// Below the hero the page reads like a document, not a stack of boxes: a reading column with
// Statement-size headlines and hairline ledgers, and on desktop a sticky rail on the left holding a
// small copy of the card (the identifiers never leave the screen), the section index, and the PDF.
// Quieter motion than Home and Services: the card's tilt, and one fade-up per block.

const say = (line: string) => THIRD_PERSON[line] ?? line;
const slugFor = (capabilityId: string) => ROLE_PAGES.find((r) => r.capabilityId === capabilityId)?.slug;

const IDS = {
  uei: 'XQXDN6E33SF4',
  cage: '9KL18',
  gsa: '47QSMS25D009Q',
  naics: '561612',
  psc: 'S206',
};

// "March 26, 2027" as "Mar 26, 2027", so it fits a field on the card.
const SAM_SHORT = new Date(SAM_ACTIVE_THROUGH).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

const SECTIONS = [
  { id: 'capabilities', label: 'Core competencies' },
  { id: 'why', label: 'Why Ares' },
  { id: 'past', label: 'Past performance' },
  { id: 'buy', label: 'How to buy' },
  { id: 'credentials', label: 'Codes and certifications' },
];
// No closing Download section (owner, 2026-10-23): the hero, the rail, and the phone bar carry the PDF.

// ------------------------------------------------------------------ the card
// Layered mountain ranges (owner, 2026-11-13): three ridgelines drawn back to front, the far one faintest,
// and when the card turns toward the cursor each layer shifts by its depth (--tx, --ty; cn.css), so the
// range reads deep, not flat. The near range is the one-line drawing (after the owner's reference, drawn
// fresh): a flat horizon, low foothills, a cluster of sharp peaks, Pikes Peak the high one; a rust point
// draws its skyline, and its face lines and front ridge draw in as the point passes them, then the point
// fades. All in a 1000 by 100 box. SVG animation, so it runs in the prerender too; reduced motion shows
// it drawn and still (cn.css).
const RIDGE_FAR =
  'M-40 84 C40 82 90 70 140 60 C180 52 200 40 230 30 C250 24 262 22 278 26 C300 32 320 46 350 50 ' +
  'C380 54 400 40 430 28 C450 20 462 12 476 10 C492 12 510 26 530 34 C560 44 590 30 620 22 ' +
  'C640 16 652 14 668 18 C700 28 730 44 760 48 C790 52 820 36 850 30 C870 26 884 28 900 36 C940 54 990 72 1040 80';
const RIDGE_MID =
  'M-40 88 C30 86 70 76 110 66 C140 58 160 44 186 34 L204 28 C220 34 240 44 262 46 C290 48 310 38 334 30 ' +
  'L352 24 C370 32 392 46 420 50 C450 54 470 52 500 54 C540 56 570 44 600 36 L618 30 C640 38 660 48 690 50 ' +
  'C720 52 740 40 768 30 L790 22 C810 28 830 40 860 50 C900 64 960 78 1040 88';
const RIDGE =
  'M0 94 L60 94 C80 94 100 90 118 87 C126 85 134 84 142 85 C156 86 168 82 182 80 C194 78 204 81 214 79 ' +
  'C224 77 232 73 244 72 C256 71 262 74 274 72 C286 70 292 66 304 64 C316 62 326 60 336 54 L362 28 ' +
  'C372 32 382 37 392 40 C400 36 408 31 418 26 C426 29 434 32 440 34 C456 24 472 14 488 6 C492 9 496 12 500 14 ' +
  'C516 20 532 26 548 30 C554 27 560 24 566 22 C578 28 590 35 600 40 C616 35 632 31 650 28 ' +
  'C664 34 676 40 690 44 C702 48 712 51 724 53 C738 56 750 60 762 59 C774 58 782 55 792 56 ' +
  'C804 58 812 63 824 64 C836 65 848 61 862 62 C876 64 888 70 902 75 C920 82 936 88 952 92 C968 94 984 94 1000 94';
// [path, begin (s), duration (s)]: each starts as the point passes it.
const RIDGE_DETAIL: [string, string, string][] = [
  ['M90 95 C160 91 220 88 280 85 C320 82 350 80 380 78', '1.8s', '1.1s'],
  ['M170 98 C210 96 250 95 290 93', '1.95s', '0.6s'],
  ['M330 83 C360 77 400 73 430 71 C455 69 470 74 490 76 C505 71 520 63 540 61 C560 62 580 70 600 74 C620 71 640 67 660 70 C690 75 720 80 760 86 C790 90 810 94 830 95 C850 94 862 92 880 92', '2.14s', '1.6s'],
  ['M362 28 C358 38 352 46 344 56', '2.17s', '0.6s'],
  ['M418 26 C412 34 406 40 398 49 C393 54 389 56 384 58', '2.22s', '0.6s'],
  ['M488 6 C484 12 490 18 482 26 C476 32 470 40 458 50', '2.3s', '0.7s'],
  ['M566 22 C556 30 548 38 534 48', '2.38s', '0.6s'],
  ['M650 28 C644 36 646 42 636 50', '2.48s', '0.6s'],
];
const RIDGE_ANIM = { begin: '1.3s', dur: '2.6s', calcMode: 'spline', keyTimes: '0;1', keySplines: '0.45 0 0.25 1', fill: 'freeze' } as const;

// Each range's fill, closed down to the foot of the box: it hides the lines of the ranges behind it.
const closed = (d: string) => `${d} L1040 100 L-40 100 Z`;

function RidgeLayers() {
  const far = { begin: '0.3s', dur: '1.6s', calcMode: 'spline', keyTimes: '0;1', keySplines: '0.45 0 0.25 1', fill: 'freeze' } as const;
  const mid = { ...far, begin: '0.75s', dur: '1.9s' };
  // A range and its fill; the fill is uncovered left to right with the line, by a growing clip.
  const layer = (id: string, d: string, anim: Record<string, string>) => (
    <>
      <clipPath id={`ccr-${id}`} className="cc-ridge-clip">
        <rect x="-40" y="-20" width="0" height="140">
          <animate attributeName="width" from="0" to="1080" {...anim} />
        </rect>
      </clipPath>
      <path className="cc-ridge-fill" d={closed(d)} clipPath={`url(#ccr-${id})`} mask="url(#ccr-fade)" />
      <path className="cc-ridge-line" d={d} pathLength={1} strokeDasharray="1 1" strokeDashoffset="1">
        <animate attributeName="stroke-dashoffset" from="1" to="0" {...anim} />
      </path>
    </>
  );
  return (
    <svg className="cc-ridge" viewBox="0 0 1000 100" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        {/* The fills fade out toward the foot, so the ranges sit on the card with no edge. */}
        <linearGradient id="ccr-fade-g" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0.45" stopColor="#fff" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <mask id="ccr-fade" maskUnits="userSpaceOnUse" x="-40" y="0" width="1080" height="100">
          <rect x="-40" y="0" width="1080" height="100" fill="url(#ccr-fade-g)" />
        </mask>
      </defs>
      <g className="cc-ridge-layer cc-ridge-far">{layer('far', RIDGE_FAR, far)}</g>
      <g className="cc-ridge-layer cc-ridge-mid">{layer('mid', RIDGE_MID, mid)}</g>
      <g className="cc-ridge-layer cc-ridge-near">
        {/* The near range sits lowest in the box, so the ranges behind rise over it. */}
        <g transform="translate(0 34) scale(1 0.66)">
          {layer('near', RIDGE, RIDGE_ANIM)}
          {RIDGE_DETAIL.map(([d, begin, dur]) => (
            <path key={d} className="cc-ridge-line cc-ridge-detail" d={d} pathLength={1} strokeDasharray="1 1" strokeDashoffset="1">
              <animate attributeName="stroke-dashoffset" from="1" to="0" begin={begin} dur={dur} calcMode="spline" keyTimes="0;1" keySplines="0.3 0 0.3 1" fill="freeze" />
            </path>
          ))}
          <g className="cc-ridge-dot" opacity="0">
            <circle r="9" className="cc-ridge-halo" />
            <circle r="4.5" className="cc-ridge-pt" />
            <animateMotion path={RIDGE} keyPoints="0;1" {...RIDGE_ANIM} />
            <set attributeName="opacity" to="1" begin={RIDGE_ANIM.begin} />
            <animate attributeName="opacity" from="1" to="0" begin="3.9s" dur="0.5s" fill="freeze" />
          </g>
        </g>
      </g>
    </svg>
  );
}

// Alpenglow (owner, 2026-11-13): the one-line range drawn by the rust point as before, then a band of
// warm light sweeps along the ridge left to right, like sunrise on the Front Range, and leaves a faint warm
// edge on the summit. The detail lines start 0.8s sooner than in the layers, which begin later.
const GLOW_DRAW = { ...RIDGE_ANIM, begin: '0.5s' } as const;
const shifted = (begin: string) => `${Math.max(0, parseFloat(begin) - 0.8).toFixed(2)}s`;

function RidgeGlow() {
  return (
    <svg className="cc-ridge cc-glow" viewBox="0 0 1000 100" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        {/* The sweep: a band of light about a fifth of the width, carried across once. */}
        <linearGradient id="ccg-sweep" gradientUnits="userSpaceOnUse" x1="-460" y1="0" x2="-100" y2="0">
          <stop offset="0" stopColor="#bc6f40" stopOpacity="0" />
          <stop offset="0.45" stopColor="#e2925a" stopOpacity="0.9" />
          <stop offset="0.55" stopColor="#f1c49a" stopOpacity="1" />
          <stop offset="1" stopColor="#bc6f40" stopOpacity="0" />
          <animate attributeName="x1" from="-460" to="1100" begin="3s" dur="2s" calcMode="spline" keyTimes="0;1" keySplines="0.4 0 0.4 1" fill="freeze" />
          <animate attributeName="x2" from="-100" to="1460" begin="3s" dur="2s" calcMode="spline" keyTimes="0;1" keySplines="0.4 0 0.4 1" fill="freeze" />
        </linearGradient>
        {/* What stays: warmth on the summit and the peaks beside it, fading out to either side. */}
        <linearGradient id="ccg-warm" gradientUnits="userSpaceOnUse" x1="300" y1="0" x2="700" y2="0">
          <stop offset="0" stopColor="#bc6f40" stopOpacity="0" />
          <stop offset="0.47" stopColor="#e2925a" stopOpacity="0.85" />
          <stop offset="1" stopColor="#bc6f40" stopOpacity="0" />
        </linearGradient>
        <filter id="ccg-soft" x="-5%" y="-40%" width="110%" height="180%">
          <feGaussianBlur stdDeviation="4 2.5" />
        </filter>
      </defs>
      <path className="cc-ridge-line" d={RIDGE} pathLength={1} strokeDasharray="1 1" strokeDashoffset="1">
        <animate attributeName="stroke-dashoffset" from="1" to="0" {...GLOW_DRAW} />
      </path>
      {RIDGE_DETAIL.map(([d, begin, dur]) => (
        <path key={d} className="cc-ridge-line cc-ridge-detail" d={d} pathLength={1} strokeDasharray="1 1" strokeDashoffset="1">
          <animate attributeName="stroke-dashoffset" from="1" to="0" begin={shifted(begin)} dur={dur} calcMode="spline" keyTimes="0;1" keySplines="0.3 0 0.3 1" fill="freeze" />
        </path>
      ))}
      <g className="cc-glow-sweep">
        <path className="cc-glow-halo" d={RIDGE} stroke="url(#ccg-sweep)" filter="url(#ccg-soft)" />
        <path className="cc-glow-edge" d={RIDGE} stroke="url(#ccg-sweep)" />
      </g>
      <g className="cc-glow-warm" opacity="0">
        <path className="cc-glow-halo" d={RIDGE} stroke="url(#ccg-warm)" filter="url(#ccg-soft)" />
        <path className="cc-glow-edge" d={RIDGE} stroke="url(#ccg-warm)" />
        <animate attributeName="opacity" from="0" to="1" begin="4s" dur="1.4s" fill="freeze" />
      </g>
      <g className="cc-ridge-dot" opacity="0">
        <circle r="9" className="cc-ridge-halo" />
        <circle r="4.5" className="cc-ridge-pt" />
        <animateMotion path={RIDGE} keyPoints="0;1" {...GLOW_DRAW} />
        <set attributeName="opacity" to="1" begin={GLOW_DRAW.begin} />
        <animate attributeName="opacity" from="1" to="0" begin="3.1s" dur="0.5s" fill="freeze" />
      </g>
    </svg>
  );
}

// The card's drawing, for the owner to compare at /capability-statement?ridge=glow|layers (2026-11-13):
// glow (the one-line range, then a sweep of warm light along it) or layers (three ranges in depth, drawn
// back to front). Glow is the default while the owner tries it (owner, 2026-11-13); layers was built first.
// (Topographic contours were tried the same day and dropped; in git at cc62092.)
const RIDGES = { glow: RidgeGlow, layers: RidgeLayers } as const;
function Ridge() {
  const [params] = useSearchParams();
  const asked = params.get('ridge');
  const R = RIDGES[(asked && asked in RIDGES ? asked : 'glow') as keyof typeof RIDGES];
  return <R />;
}

function Field({ label, value, copy, live, wide }: { label: string; value: string; copy?: string; live?: boolean; wide?: boolean }) {
  return (
    <div className="cc-field" data-wide={wide || undefined}>
      <dt>{label}</dt>
      <dd>
        <span className="ds-data" data-live={live || undefined}>
          {value}
        </span>
        {copy && <CopyButton value={value} label={copy} />}
      </dd>
    </div>
  );
}

function CompanyCard({ compact = false }: { compact?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);

  // The card turns toward the cursor (up to 7 degrees; its sheen was removed, owner 2026-10-23) (pointer devices,
  // motion allowed, the large card only).
  useEffect(() => {
    const el = ref.current;
    if (!el || compact || !motionAllowed() || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    let raf = 0;
    const target = { x: 0, y: 0 };
    const now = { x: 0, y: 0 };
    const tick = () => {
      now.x += (target.x - now.x) * 0.1;
      now.y += (target.y - now.y) * 0.1;
      el.style.setProperty('--rx', `${(-now.y * 7).toFixed(2)}deg`);
      el.style.setProperty('--ry', `${(now.x * 9).toFixed(2)}deg`);
      // The ridge layers shift by depth with the same turn (cn.css).
      el.style.setProperty('--tx', now.x.toFixed(3));
      el.style.setProperty('--ty', now.y.toFixed(3));
      raf = Math.abs(target.x - now.x) + Math.abs(target.y - now.y) > 0.001 ? requestAnimationFrame(tick) : 0;
    };
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      target.x = Math.max(-1, Math.min(1, (e.clientX - (r.left + r.width / 2)) / (r.width * 0.9)));
      target.y = Math.max(-1, Math.min(1, (e.clientY - (r.top + r.height / 2)) / (r.height * 1.2)));
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const onLeave = () => {
      target.x = 0;
      target.y = 0;
      if (!raf) raf = requestAnimationFrame(tick);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    document.documentElement.addEventListener('pointerleave', onLeave);
    return () => {
      window.removeEventListener('pointermove', onMove);
      document.documentElement.removeEventListener('pointerleave', onLeave);
      cancelAnimationFrame(raf);
    };
  }, [compact]);

  if (compact) {
    return (
      <div className="cc cc-compact">
        <p className="cc-top">
          <span className="cc-mark" aria-hidden="true" />
          <span className="ds-data">Ares Security LLC</span>
        </p>
        <dl className="cc-fields">
          <Field label="UEI" value={IDS.uei} copy="UEI" />
          <Field label="CAGE" value={IDS.cage} copy="CAGE code" />
          <Field label="GSA MAS" value={IDS.gsa} copy="GSA contract number" />
          <Field label="NAICS" value={IDS.naics} />
          <Field label="SAM" value="Active" live />
        </dl>
      </div>
    );
  }

  return (
    <div className="cc-stage">
      <div ref={ref} className="cc" role="group" aria-label="Ares Security company identifiers">
        <div className="cc-head">
          <span className="cc-logo" aria-hidden="true">
            <span className="cc-mark" />
            {/* From 600px: the mark and the wordmark larger, a rule between them like the nav's, and
                no big name under them (owner, 2026-11-13). Phones keep their lockup. */}
            <span className="cc-divider" />
            <span className="cc-word" />
            {/* Phones: the rail card's lockup, the name in mono caps beside the mark (owner, 2026-10-23). */}
            <span className="cc-tag ds-data">Ares Security LLC</span>
          </span>
          <span className="cc-kind ds-data">Capability statement · 2026</span>
        </div>
        <div className="cc-name">
          <p className="cc-legal">Ares Security LLC</p>
          <p className="cc-sub">Minority woman-owned small business · Colorado Springs, CO</p>
        </div>
        <Ridge />
        <dl className="cc-fields">
          <Field label="UEI" value={IDS.uei} copy="UEI" />
          <Field label="CAGE code" value={IDS.cage} copy="CAGE code" />
          <Field label="GSA MAS" value={IDS.gsa} copy="GSA contract number" />
          <Field label="NAICS · PSC" value={`${IDS.naics} · ${IDS.psc}`} />
          <Field label="Set-aside" value="WOSB eligible" />
          <Field label={`SAM · to ${SAM_SHORT}`} value="Active" live />
        </dl>
        <div className="cc-foot">
          {/* The GSA mark in white where the drawn chip was (owner, 2026-11-13; an SBA WOSB mark beside it
              was tried the same day and removed). */}
          <img className="cc-gsa" src="/images/gsa-mark.webp" alt="GSA" width={30} height={30} decoding="async" />
          <span className="ds-data cc-certs">WOSB250470 · WBE2303571</span>
        </div>
      </div>
    </div>
  );
}

// ------------------------------------------------------------------ hero
function Hero() {
  return (
    <section className="cx-hero" aria-labelledby="cx-title">
      <div className="cx-hero-photo" aria-hidden="true">
        <img {...responsive('/images/services-hero/denver-sunset.webp')} alt="" decoding="sync" {...{ fetchpriority: 'high' }} />
      </div>
      {/* The place caption as on the other photo heroes: top right under the nav (owner, 2026-10-23). */}
      <p className="ds-caption ds-cs-hero-cap">Downtown Denver, Colorado</p>
      <div className="cx-hero-grid">
        <div className="cx-hero-copy">
          <h1 id="cx-title" className="cx-title">
            Capability Statement
          </h1>
          <p className="cx-lead">
            Armed and unarmed security officers for federal agencies, prime contractors, and commercial sites
            across Colorado. Every identifier is below and in the PDF.
          </p>
          <div className="cx-actions">
            <a href={PDF_URL} className="ds-btn ds-btn-primary" download>
              <DownloadIcon />
              Download the PDF
            </a>
            <a href={SAM_VERIFY} target="_blank" rel="noopener noreferrer" className="ds-link">
              Verify on SAM.gov
              <Arrow external size={14} />
            </a>
          </div>
          <p className="cx-spec ds-data">1 page · PDF · 1.5 MB · 2026</p>
        </div>
        <CompanyCard />
      </div>
    </section>
  );
}

// ------------------------------------------------------------------ rail
function Rail({ active }: { active: string }) {
  return (
    <aside className="cx-rail" aria-label="On this page">
      <CompanyCard compact />
      <nav className="cx-index">
        {SECTIONS.map((s, i) => (
          <a key={s.id} href={`#${s.id}`} data-on={active === s.id}>
            {s.label}
          </a>
        ))}
      </nav>
      <a href={PDF_URL} className="ds-btn ds-btn-primary cx-rail-pdf" download>
        <DownloadIcon />
        Download the PDF
      </a>
    </aside>
  );
}

// Phones and tablets (owner, 2026-10-23: design it as well for mobile): the rail's card can't sit
// beside the text, so once the hero card has scrolled away a slim bar slides down under the nav
// with the identifiers (each copies with a tap) and the current section, which opens the index.
function MobileBar({ active, show }: { active: string; show: boolean }) {
  const [open, setOpen] = useState(false);
  const i = Math.max(0, SECTIONS.findIndex((s) => s.id === active));
  useEffect(() => {
    if (!show) setOpen(false);
  }, [show]);
  // Land the section's headline just under the nav and this bar (the site's in-page glide only
  // knows about the nav).
  const jump = (e: React.MouseEvent, id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    e.preventDefault();
    e.stopPropagation();
    setOpen(false);
    const head = document.querySelector<HTMLElement>('[data-site-header]')?.offsetHeight ?? 64;
    const pad = parseFloat(getComputedStyle(el).paddingTop) || 0;
    const top = el.getBoundingClientRect().top + window.scrollY + pad - head - 96;
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top, behavior: still ? 'auto' : 'smooth' });
    history.replaceState(null, '', `#${id}`);
  };
  return (
    <div className="cx-mbar" data-show={show} data-open={open} aria-hidden={!show}>
      <div className="cx-mbar-row">
        <button type="button" className="cx-mbar-sec" onClick={() => setOpen((o) => !o)} aria-expanded={open} tabIndex={show ? 0 : -1}>
          <span className="cx-mbar-sec-label">{SECTIONS[i].label}</span>
          <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M4 6l4 4 4-4" />
          </svg>
        </button>
        <a href={PDF_URL} className="cx-mbar-pdf" download tabIndex={show ? 0 : -1}>
          <DownloadIcon size={14} />
          PDF
        </a>
      </div>
      <ul className="cx-mbar-ids">
        {[
          { l: 'UEI', v: IDS.uei, c: 'UEI' },
          { l: 'CAGE', v: IDS.cage, c: 'CAGE code' },
          { l: 'GSA', v: IDS.gsa, c: 'GSA contract number' },
          { l: 'NAICS', v: IDS.naics },
        ].map((x) => (
          <li key={x.l}>
            <span className="cx-mbar-l">{x.l}</span>
            <span className="ds-data">{x.v}</span>
            {x.c && show && <CopyButton value={x.v} label={x.c} />}
          </li>
        ))}
      </ul>
      <nav className="cx-mbar-menu" aria-label="On this page">
        {SECTIONS.map((sct, k) => (
          <a key={sct.id} href={`#${sct.id}`} data-on={active === sct.id} onClick={(e) => jump(e, sct.id)} tabIndex={open ? 0 : -1}>
            {sct.label}
          </a>
        ))}
      </nav>
    </div>
  );
}

function Head({ id, i, title, lead }: { id: string; i: number; title: string; lead?: string }) {
  return (
    <header className="cx-head" data-rv>
      <h2 id={id} className="cx-h2">
        {title}
      </h2>
      {lead && <p className="cx-head-lead">{lead}</p>}
    </header>
  );
}

// ------------------------------------------------------------------ sections
function Competencies() {
  return (
    <section id="capabilities" className="cx-sec" aria-labelledby="cx-caps">
      <Head id="cx-caps" i={0} title="Core competencies." lead="Six services, each staffed by officers Ares trains on the post before their first shift." />
      <ol className="cx-caps">
        {CAPABILITIES.map((c, i) => {
          const slug = slugFor(c.id);
          return (
            <li key={c.id} data-rv>
              <div className="cx-caps-main">
                <h3 className="cx-caps-title">
                  {slug ? (
                    <Link to={`/services/${slug}`}>
                      {c.title}
                      <Arrow size={18} />
                    </Link>
                  ) : (
                    c.title
                  )}
                </h3>
                <p className="cx-caps-line">{c.line}</p>
              </div>
              <ul className="cx-caps-inc" aria-label={`${c.title} includes`}>
                {c.includes.map((x) => (
                  <li key={x.name}>{x.name}</li>
                ))}
              </ul>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

// The proof of each reason as a large figure, so a reader scanning the page gets the evidence first.
// On desktop the first two set as two lines each, so they match side by side (owner, 2026-10-23;
// phones too, where they wrap on their own).
const FIGURES: { lines: string[] }[] = [
  { lines: ['Restricted', 'areas'] },
  { lines: ['4-stage', 'deployment'] },
  { lines: ['43 / 45'] },
  { lines: ['4.8 / 5'] },
];
// The four-stage proof names the stages, so it carries as much as the restricted-area one beside it
// (owner, 2026-10-23; the shared data keeps "Trained on post by leadership").
const PROOF: Record<string, string> = {
  'Four-stage deployment': 'Audit · Compliance · Training · Deployment · Trained on post by leadership',
};
// The figure above already says "4-stage deployment", so the title says what the stages achieve
// (owner, 2026-10-23; the shared data keeps "Four-stage deployment").
const TITLE: Record<string, string> = {
  'Four-stage deployment': 'Ready before the first shift',
};

// Phones: the four are a swipe row (owner, 2026-10-23) with the Home industry deck's controls: a
// counter, a meter (rust for the current card; tap a step to go there), two arrows, and a hint.
function Why() {
  const rowRef = useRef<HTMLOListElement>(null);
  const [at, setAt] = useState(0);
  const N = DIFFERENTIATORS.length;

  useEffect(() => {
    const row = rowRef.current;
    if (!row) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const cards = Array.from(row.children) as HTMLElement[];
      const left = row.getBoundingClientRect().left + parseFloat(getComputedStyle(row).paddingLeft);
      let best = 0;
      cards.forEach((c, i) => {
        if (Math.abs(c.getBoundingClientRect().left - left) < Math.abs(cards[best].getBoundingClientRect().left - left)) best = i;
      });
      setAt(best);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    row.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      row.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const go = (i: number) => {
    const row = rowRef.current;
    const card = row?.children[Math.max(0, Math.min(N - 1, i))] as HTMLElement | undefined;
    if (!row || !card) return;
    const left = row.scrollLeft + card.getBoundingClientRect().left - row.getBoundingClientRect().left - parseFloat(getComputedStyle(row).paddingLeft);
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    row.scrollTo({ left, behavior: still ? 'auto' : 'smooth' });
  };

  return (
    <section id="why" className="cx-sec" aria-labelledby="cx-why">
      <Head id="cx-why" i={1} title="Why Ares." lead="Four reasons, each with its source." />
      <ol ref={rowRef} className="cx-why">
        {DIFFERENTIATORS.map((d, i) => (
          <li key={d.title} data-rv style={{ ['--i' as string]: i % 2 } as CSSProperties}>
            <p className="cx-why-fig" aria-hidden="true" data-lines={FIGURES[i].lines.length}>
              <span className="cx-why-fig-full">
                {FIGURES[i].lines.map((l, k) => (
                  <span key={l}>
                    {k > 0 && ' '}
                    {l}
                  </span>
                ))}
              </span>
            </p>
            <h3 className="cx-why-title">{TITLE[d.title] ?? say(d.title)}</h3>
            <p className="cx-why-body">{say(d.body)}</p>
            <p className="cx-why-src ds-data">
              <span>Source</span>
              {d.href ? (
                <a href={d.href} target="_blank" rel="noopener noreferrer">
                  {d.proof}
                  <Arrow external size={11} />
                </a>
              ) : (
                <span>{PROOF[d.title] ?? d.proof}</span>
              )}
            </p>
          </li>
        ))}
      </ol>
      <div className="cx-why-ctl">
        <p className="sr-only" aria-live="polite">
          Reason {at + 1} of {N}
        </p>
        {/* No arrows on phones (owner, 2026-10-25): each step is a 44px tap target named for its
            reason. */}
        <div className="cx-why-meter" role="group" aria-label="Choose a reason">
          {DIFFERENTIATORS.map((d, i) => (
            <button
              key={d.title}
              type="button"
              className="cx-why-seg"
              data-on={i === at}
              data-past={i < at}
              aria-label={`Go to reason ${i + 1} of ${N}`}
              aria-current={i === at ? 'true' : undefined}
              onClick={() => go(i)}
            >
              <i />
            </button>
          ))}
        </div>
      </div>
      <p className="cx-why-hint ds-data" aria-hidden="true">
        Swipe for the next reason
      </p>
    </section>
  );
}

// Past performance (owner, 2026-10-24): no revenue figure (revenue is company data, not past
// performance). Read like the PDF and without the AI tells (owner, 2026-10-25: was a featured card
// with a status light and a ledger with status dots and mono column heads): one list in the PDF's
// order, each contract a row on a hairline, its scope and where it was on the left, its term on the
// right in the data face, then the PDF's footnote. Clients and the base stay unnamed, and the list
// stays a selection. A value shows only where data.ts has one; nothing is estimated.
function Past() {
  return (
    <section id="past" className="cx-sec" aria-labelledby="cx-past">
      <Head id="cx-past" i={2} title="Past performance." lead={PAST_PERFORMANCE.leadNext} />
      <ol className="cx-pp" data-rv>
        {PAST_PERFORMANCE.rows.map((p) => (
          <li key={p.scope} className="cx-pp-row">
            <div className="cx-pp-what">
              <h3 className="cx-pp-scope">{p.scope}</h3>
              <p className="cx-pp-where">{p.where}</p>
            </div>
            <p className="cx-pp-term ds-data">
              {p.term}
              {p.value && <span className="cx-pp-value">{p.value}</span>}
            </p>
          </li>
        ))}
      </ol>
      <p className="cx-past-more">{PAST_PERFORMANCE.completed}</p>
      <p className="cx-past-refs ds-data">
        <Link to="/contact">References available on request.</Link>
      </p>
    </section>
  );
}

function Buy() {
  const contract = GSA_SPECS.find((x) => x.copy)!;
  const rest = GSA_SPECS.filter((x) => !x.copy);
  return (
    <section id="buy" className="cx-sec" aria-labelledby="cx-buy">
      <Head id="cx-buy" i={3} title={say('How to buy from us.')} lead="Pre-negotiated pricing, and award without a re-compete." />
      <div className="cx-gsa" data-rv>
        <p className="cx-gsa-label ds-data">
          <span>GSA Multiple Award Schedule</span>
          <span className="cx-status" data-state="available">
            <i aria-hidden="true" />
            Active
          </span>
        </p>
        <p className="cx-gsa-number">
          <span className="ds-data">{contract.value}</span>
          <CopyButton value={contract.value} label="GSA contract number" />
        </p>
        <dl className="cx-ledger cx-ledger-2">
          {rest.map((x) => (
            <div key={x.label} className="cx-ledger-row">
              <dt>{x.label}</dt>
              <dd>{x.value}</dd>
            </div>
          ))}
        </dl>
        <a href={GSA_ELIBRARY} target="_blank" rel="noopener noreferrer" className="ds-link">
          View on GSA eLibrary
          <Arrow external size={14} />
        </a>
      </div>
      <h3 className="cx-sub ds-data" data-rv>
        Other procurement paths
      </h3>
      <ul className="cx-paths" data-rv>
        {PATHS.map((x) => (
          <li key={x.name}>
            {x.to ? (
              <Link to={x.to} className="cx-path">
                {x.name}
                <Arrow size={14} />
              </Link>
            ) : (
              <span className="cx-path">{x.name}</span>
            )}
            <span className="cx-status ds-data" data-state={x.status === 'Available' ? 'available' : 'request'}>
              <i aria-hidden="true" />
              {x.status}
            </span>
          </li>
        ))}
      </ul>
      <p className="cx-note" data-rv>
        <strong>Set-aside eligible: WOSB.</strong> {say('Contact us to confirm scope and pricing for any vehicle above.')}
      </p>
    </section>
  );
}

function Credentials() {
  const [vehicle, registration, certifications, licensing] = CRED_GROUPS;
  const codes = [...vehicle.rows, ...registration.rows];
  return (
    <section id="credentials" className="cx-sec" aria-labelledby="cx-creds">
      <Head id="cx-creds" i={4} title="Codes and certifications." lead={say('All data matches our SAM.gov registration.')} />
      {[
        { name: 'Codes and registration', rows: codes },
        certifications,
        licensing,
      ].map((g) => (
        <div key={g.name} className="cx-group" data-rv>
          <h3 className="cx-sub ds-data">{g.name}</h3>
          <dl className="cx-ledger cx-ledger-ids">
            {g.rows.map((r) => (
              <div key={r.label} className="cx-ledger-row">
                <dt>
                  {r.mark && (
                    <span className="cx-mark">
                      <img {...responsive(r.mark.src)} alt="" loading="lazy" decoding="async" data-color={r.mark.color || undefined} />
                    </span>
                  )}
                  {r.label}
                </dt>
                <dd className="cx-id">
                  <span className={r.mono ? 'ds-data' : undefined} data-live={r.live || undefined}>
                    {r.value}
                  </span>
                  {r.copy && <CopyButton value={r.value} label={r.label} />}
                </dd>
                <dd className="cx-id-note">{r.note ?? ''}</dd>
              </div>
            ))}
          </dl>
        </div>
      ))}
    </section>
  );
}

export default function CapabilityStatement() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(SECTIONS[0].id);
  const [bar, setBar] = useState(false);

  // The phone bar shows once the hero card is off the screen (and only below the rail's width).
  useEffect(() => {
    const card = document.querySelector('.cx-hero .cc');
    if (!card) return;
    const io = new IntersectionObserver(([e]) => setBar(!e.isIntersecting && e.boundingClientRect.top < 0), { threshold: 0 });
    io.observe(card);
    return () => io.disconnect();
  }, []);

  // One fade-up per block, once (motion only), and the rail's index follows the reader.
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-35% 0px -55% 0px' },
    );
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) io.observe(el);
    });
    let rv: IntersectionObserver | undefined;
    if (motionAllowed()) {
      root.dataset.rvArm = 'true';
      rv = new IntersectionObserver(
        (entries) =>
          entries.forEach((e) => {
            if (!e.isIntersecting) return;
            (e.target as HTMLElement).dataset.in = 'true';
            rv!.unobserve(e.target);
          }),
        { rootMargin: '0px 0px -6% 0px', threshold: 0.05 },
      );
      root.querySelectorAll('[data-rv]').forEach((el) => rv!.observe(el));
    }
    return () => {
      io.disconnect();
      rv?.disconnect();
    };
  }, []);

  return (
    <main ref={ref} id="main" tabIndex={-1} className="ds nx cx">
      <Seo path="/capability-statement" />
      <Hero />
      <MobileBar active={active} show={bar} />
      <div className="cx-doc">
        <Rail active={active} />
        <div className="cx-body">
          <Competencies />
          <Why />
          <Past />
          <Buy />
          <Credentials />
        </div>
      </div>
    </main>
  );
}
