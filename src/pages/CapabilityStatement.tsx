import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { Link } from 'react-router-dom';
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
const n2 = (i: number) => String(i + 1).padStart(2, '0');

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
            <span className="cc-word" />
          </span>
          <span className="cc-kind ds-data">Capability statement · 2026</span>
        </div>
        <div className="cc-name">
          <p className="cc-legal">Ares Security LLC</p>
          <p className="cc-sub">Minority woman-owned small business · Colorado Springs, CO</p>
        </div>
        <dl className="cc-fields">
          <Field label="UEI" value={IDS.uei} copy="UEI" />
          <Field label="CAGE code" value={IDS.cage} copy="CAGE code" />
          <Field label="GSA MAS" value={IDS.gsa} copy="GSA contract number" />
          <Field label="NAICS · PSC" value={`${IDS.naics} · ${IDS.psc}`} />
          <Field label="Set-aside" value="WOSB eligible" />
          <Field label={`SAM · to ${SAM_SHORT}`} value="Active" live />
        </dl>
        <div className="cc-foot">
          <span className="cc-chip" aria-hidden="true" />
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
            <span className="ds-data">{n2(i)}</span>
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
          <span className="ds-data">{n2(i)}</span>
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
            <span className="ds-data">{n2(k)}</span>
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
      <p className="cx-n ds-data">
        {n2(i)} <span>/ {n2(SECTIONS.length - 1)}</span>
      </p>
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
              <span className="cx-caps-n ds-data">{n2(i)}</span>
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
// On desktop the first two set as two lines each, so they match side by side (owner, 2026-10-23);
// phones show `short`.
const FIGURES: { lines: string[]; short?: string }[] = [
  { lines: ['Restricted', 'areas'] },
  { lines: ['4-stage', 'deployment'], short: '4 stages' },
  { lines: ['43 / 45'] },
  { lines: ['4.8 / 5'] },
];
// The four-stage proof names the stages, so it carries as much as the restricted-area one beside it
// (owner, 2026-10-23; the shared data keeps "Trained on post by leadership").
const PROOF: Record<string, string> = {
  'Four-stage deployment': 'Audit · Compliance · Training · Deployment · Trained on post by leadership',
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
              {FIGURES[i].short && <span className="cx-why-fig-short">{FIGURES[i].short}</span>}
            </p>
            <h3 className="cx-why-title">{say(d.title)}</h3>
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
        <p className="cx-why-count ds-data" aria-live="polite">
          <b>{n2(at)}</b> / {n2(N - 1)}
        </p>
        <div className="cx-why-meter" aria-hidden="true">
          {DIFFERENTIATORS.map((d, i) => (
            <button key={d.title} type="button" tabIndex={-1} className="cx-why-seg" data-on={i === at} data-past={i < at} onClick={() => go(i)}>
              <i />
            </button>
          ))}
        </div>
        <div className="cx-why-arrows">
          <button type="button" className="cx-why-arrow" aria-label="Previous reason" disabled={at === 0} onClick={() => go(at - 1)}>
            <Arrow size={18} />
          </button>
          <button type="button" className="cx-why-arrow" aria-label="Next reason" disabled={at === N - 1} onClick={() => go(at + 1)}>
            <Arrow size={18} />
          </button>
        </div>
      </div>
      <p className="cx-why-hint ds-data" aria-hidden="true">
        Swipe for the next reason
      </p>
    </section>
  );
}

function Past() {
  return (
    <section id="past" className="cx-sec" aria-labelledby="cx-past">
      <Head id="cx-past" i={2} title="Past performance." />
      <div className="cx-past-top" data-rv>
        <p className="cx-past-fig">
          <span className="cx-past-num ds-data">$2.1M+</span>
          <span className="cx-past-cap">Revenue, 2021 through 2025</span>
        </p>
        <p className="cx-past-lead">{PAST_PERFORMANCE.lead}</p>
      </div>
      <dl className="cx-ledger" data-rv>
        {PAST_PERFORMANCE.rows.map((p) => (
          <div key={p.scope} className="cx-ledger-row">
            <dt>{p.scope}</dt>
            <dd>{p.where}</dd>
            <dd className="ds-data cx-ledger-term">{p.term}</dd>
          </div>
        ))}
      </dl>
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
