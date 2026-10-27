import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import Seo from '../seo/Seo';
import Arrow from '../components/Arrow';
import { DownloadIcon } from '../components/capability/Hero';
import { FaqSection } from '../components/market/parts';
import type { Faq } from '../components/market/roles';
import { GSA_ELIBRARY } from '../components/home/links';
import { PDF_URL } from '../components/capability/data';
import { motionAllowed } from '../components/home/engine';
import { responsive } from '../lib/responsive';
import '../components/teaming/tb.css';

// Teaming and subcontracting, "Your contract, our officers" (owner, 2026-10-26: the second of two
// forms from the teaming-previews bundle, live at /teaming in place of the market-parts page). The page
// every teaming email links to, for primes, guard companies, and builders. No facility clearance claim
// and no clearance wording here (clearance requirements live on Careers only, owner 2026-10-10).
//
// The Capability Statement is about one company, so its object is one card. Teaming is about two
// companies, so the hero is two: the prime's site on the left (a Space Force base in Colorado from the
// air) and Ares officers on the right (About's two officers seen from behind), split by a
// seam with a rust wire across it marked "Teaming", Home's prime-section language. On load the halves
// close in toward the seam and the wire draws across. The identifiers stay on the Capability
// Statement (linked); what a prime buys, the subcontracting credit, is set large in its own section.
// Every fact is the previous page's.

const QUOTE = '/contact?service=teaming';
const PHONE = '719-696-3966';
const TEL = 'tel:+17196963966';
const EMAIL = 'contact@aressecurity.co';

const PARTNERS = [
  {
    name: 'Prime contractors',
    line: 'On federal and commercial contracts that need a woman-owned security subcontractor, or more officers than the prime can staff.',
    // The Space Force base at golden hour (owner, 2026-10-26; was the radomes behind the fence).
    photo: '/images/market/government-schriever.jpg',
    pos: '50% 56%',
    // In a bit toward the domes at the left (owner, 2026-10-26).
    zoom: { scale: 1.45, origin: '14% 56%' },
    roles: [
      { name: 'Restricted-Area Escort', to: '/services/restricted-area-escort' },
      { name: 'Access Control Officers', to: '/services/access-control' },
      { name: 'Relief & Surge Coverage', to: '/services/relief-surge-coverage' },
    ],
  },
  {
    name: 'Guard companies',
    line: 'Relief, overflow, and surge shifts on posts you already hold, staffed to your post orders.',
    // Ares patrol vehicles (owner, 2026-10-26; was an Ares officer).
    photo: '/images/mission-vehicle.jpg',
    pos: '50% 86%',
    roles: [
      { name: 'Relief & Surge Coverage', to: '/services/relief-surge-coverage' },
      { name: 'Armed Security Officers', to: '/services/armed-security-officers' },
      { name: 'Unarmed Security Officers', to: '/services/unarmed-security-officers' },
    ],
  },
  {
    name: 'Builders and general contractors',
    line: 'Escorts, gate control, and access control while a site is built, including on military construction.',
    // Offices under Pikes Peak, the builder's sign edited out (owner, 2026-10-26; was the data center
    // campus). Cropped in from the left so the name on the brick building there stays out of frame.
    photo: '/images/market/office-pikes-peak.jpg',
    pos: '50% 50%',
    zoom: { scale: 1.16, origin: '100% 40%' },
    roles: [
      { name: 'Restricted-Area Escort', to: '/services/restricted-area-escort' },
      { name: 'Access Control Officers', to: '/services/access-control' },
    ],
  },
];

const CREDIT = [
  { value: 'WOSB250470', label: 'SBA woman-owned small business' },
  { value: 'WBE2303571', label: 'WBENC certified' },
  { value: '21353671', label: 'Denver M/WBE and SBE, B2G vendor' },
];

type Row = { label: string; value: ReactNode; to?: string; href?: string };
// Each city links to its own page (owner, 2026-10-26; the whole line went to Denver's).
const CITY = (to: string, name: string) => (
  <Link to={to} className="ds-link">
    {name}
  </Link>
);
const MORE: Row[] = [
  {
    label: 'Licensed',
    value: (
      <>
        Armed and unarmed, in {CITY('/locations/colorado-springs', 'Colorado Springs')}, {CITY('/locations/denver', 'Denver')}, and{' '}
        {CITY('/locations/pueblo', 'Pueblo')}
      </>
    ),
  },
  { label: 'Reliability', value: 'Fewer than 1% of shifts missed since 2021' },
  { label: 'Past performance', value: 'Restricted-area escort and access control on a Space Force base in Colorado, as a subcontractor, 2025 to 2027', to: '/capability-statement#past' },
  { label: 'Contract vehicle', value: 'GSA MAS 47QSMS25D009Q, SIN 561612', href: GSA_ELIBRARY },
  { label: 'Identifiers', value: 'UEI, CAGE, NAICS, and every certification', to: '/capability-statement#credentials' },
];

const STEPS = [
  { title: 'Send us the contract', line: 'The contract, the posts, and the coverage you need.' },
  { title: 'Who we can staff, and when', line: 'We come back with the officers we can put on your posts and the date they can start.' },
  { title: 'Post orders, written with you', line: 'And a mutual non-solicitation agreement for the people on the shared contract, if you want one.' },
  { title: 'Trained on your post', line: 'A member of our leadership trains each officer on the post before the first shift.' },
  { title: 'Relief behind every post', line: 'On-call coverage is written into every contract, and checkpoint, visitor, and incident logs are kept to your post orders.' },
];

const FAQ: Faq[] = [
  {
    q: 'Can you cover relief or overflow on a contract we already hold?',
    a: 'Yes. We staff relief, overflow, and surge shifts under your contract, trained on your post orders before the first shift, with our own on-call relief behind them.',
  },
  {
    q: 'Will you agree to mutual non-solicitation?',
    a: 'Yes. We are open to a mutual non-solicitation agreement covering the people on a shared contract.',
  },
  {
    q: 'Do you subcontract on federal work?',
    a: 'Yes. Ares works today as a subcontractor on a federal construction program, providing restricted-area escort and access control, and holds GSA Multiple Award Schedule contract 47QSMS25D009Q.',
  },
  {
    q: 'Where in Colorado do you work?',
    a: 'Along the Front Range: the Denver metro area, Colorado Springs, and Pueblo. Ares is licensed and bonded for armed and unarmed security in all three cities.',
  },
];

// ------------------------------------------------------------------ hero
function Hero() {
  return (
    <section className="tb-hero" aria-labelledby="tb-title">
      <div className="tb-pair">
        <figure className="tb-half tb-half-a">
          <div className="tb-half-photo">
            {/* A Space Force base from the air: its domes, a C-17 on the apron, Denver and the Front Range
                behind (owner, 2026-10-26; was the base at golden hour zoomed on its domes). */}
            <img
              {...responsive('/images/market/base-aerial.jpg', '(min-width: 768px) 50vw, 100vw')}
              alt=""
              decoding="sync"
              {...{ fetchpriority: 'high' }}
            />
          </div>
          <figcaption className="tb-half-copy">
            <p className="tb-half-name">Your contract</p>
            <p className="tb-half-line">You hold the contract and the posts under it.</p>
          </figcaption>
        </figure>

        {/* The seam: a rust wire across it, "Teaming" at the crossing. */}
        <div className="tb-seam" aria-hidden="true">
          <span className="tb-wire" />
          <span className="tb-tie">Teaming</span>
        </div>

        <figure className="tb-half tb-half-b">
          <div className="tb-half-photo">
            <img {...responsive('/images/about-security.jpg')} alt="" decoding="sync" />
          </div>
          <figcaption className="tb-half-copy">
            <p className="tb-half-name">Our officers</p>
            <p className="tb-half-line">Trained on your post, with relief behind every shift.</p>
          </figcaption>
        </figure>
      </div>

      <div className="tb-hero-text">
        <h1 id="tb-title" className="tb-title">
          Teaming &amp; subcontracting
        </h1>
        <div className="tb-hero-side">
          <p className="tb-lead">
            A minority woman-owned security subcontractor for primes, guard companies, and builders on
            Colorado&rsquo;s Front Range: restricted-area escorts, access control officers, and relief,
            overflow, and surge coverage.
          </p>
          <div className="tb-actions">
            <Link to={QUOTE} className="ds-btn ds-btn-primary">
              Talk teaming
              <Arrow />
            </Link>
            <a href={PDF_URL} className="ds-link" download>
              Capability Statement (PDF)
              <DownloadIcon />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ------------------------------------------------------------------ sections
function Head({ id, title, lead }: { id: string; title: string; lead?: string }) {
  return (
    <header className="tb-head" data-rv>
      <h2 id={id} className="tb-h2">
        {title}
      </h2>
      {lead && <p className="tb-head-lead">{lead}</p>}
    </header>
  );
}

function Partners() {
  return (
    <section className="tb-sec" aria-labelledby="tb-who">
      <Head id="tb-who" title="Who we team with." />
      <ul className="tb-rows">
        {PARTNERS.map((p) => (
          <li key={p.name} className="tb-row" data-rv>
            <div className="tb-row-photo" aria-hidden="true">
              <img
                {...responsive(p.photo)}
                alt=""
                loading="lazy"
                style={{
                  objectPosition: p.pos,
                  // A crop for one photo: the `scale` property, so the hover's transform still runs.
                  ...('zoom' in p && p.zoom ? { scale: String(p.zoom.scale), transformOrigin: p.zoom.origin } : {}),
                }}
              />
            </div>
            <div className="tb-row-text">
              <h3 className="tb-row-name">{p.name}</h3>
              <p className="tb-row-line">{p.line}</p>
            </div>
            <ul className="tb-row-roles" aria-label={`Posts for ${p.name.toLowerCase()}`}>
              {p.roles.map((r) => (
                <li key={r.name}>
                  <Link to={r.to}>
                    <span>{r.name}</span>
                    <Arrow size={14} />
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Credit() {
  return (
    <section className="tb-sec" aria-labelledby="tb-gets">
      <Head
        id="tb-gets"
        title="What the prime gets."
        lead="The work Ares does under your contract counts toward your small-business subcontracting goals."
      />
      <dl className="tb-credit">
        {CREDIT.map((c, i) => (
          <div key={c.value} data-rv style={{ '--i': i } as CSSProperties}>
            <dd className="tb-credit-value ds-data">{c.value}</dd>
            <dt className="tb-credit-label">{c.label}</dt>
          </div>
        ))}
      </dl>
      <dl className="tb-more" data-rv aria-label="Also for the prime">
        {MORE.map((r) => (
          <div key={r.label} className="tb-more-row">
            <dt>{r.label}</dt>
            <dd>
              {r.to ? (
                <Link to={r.to} className="ds-link">
                  {r.value}
                </Link>
              ) : r.href ? (
                <a href={r.href} target="_blank" rel="noopener noreferrer" className="ds-link">
                  {r.value}
                  <Arrow external size={12} />
                </a>
              ) : (
                r.value
              )}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

// Five steps on one hairline that fills rust with the scroll (across on desktop, down on phones).
function Steps() {
  const ref = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !motionAllowed()) return;
    const steps = Array.from(el.querySelectorAll<HTMLElement>('.tb-step'));
    const across = window.matchMedia('(min-width: 1024px)');
    el.dataset.live = 'true';
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      let p: number;
      if (across.matches) {
        p = Math.min(1, Math.max(0, (vh * 0.85 - r.top) / (vh * 0.45)));
        steps.forEach((s, i) => {
          const on = p >= (i + 0.35) / steps.length;
          if ((s.dataset.on === 'true') !== on) s.dataset.on = String(on);
        });
      } else {
        p = Math.min(1, Math.max(0, (vh * 0.75 - r.top) / (r.height + vh * 0.4)));
        const y = p * r.height;
        steps.forEach((s) => {
          const on = y >= s.offsetTop + 6;
          if ((s.dataset.on === 'true') !== on) s.dataset.on = String(on);
        });
      }
      el.style.setProperty('--fill', p.toFixed(4));
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
    <section className="tb-sec" aria-labelledby="tb-steps">
      <Head id="tb-steps" title="From the contract to the first shift." />
      <ol ref={ref} className="tb-steps">
        {STEPS.map((s, i) => (
          <li key={s.title} className="tb-step">
            <span className="tb-step-n ds-data" aria-hidden="true">
              {String(i + 1).padStart(2, '0')}
            </span>
            <h3 className="tb-step-title">{s.title}</h3>
            <p className="tb-step-line">{s.line}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

function Close() {
  return (
    <section className="tb-close" aria-labelledby="tb-close-title">
      <h2 id="tb-close-title" className="tb-close-title" data-rv>
        Send us the contract.
      </h2>
      <p className="tb-close-line" data-rv>
        The contract, the posts, and the coverage you need. We will come back with who we can staff and when.
      </p>
      <div className="tb-close-call" data-rv>
        <a href={TEL} className="tb-close-phone" aria-label={`Call ${PHONE}`}>
          <span className="ds-data">{PHONE}</span>
          <Arrow size={36} />
          <span className="tb-close-rule" aria-hidden="true" />
        </a>
        <p className="tb-close-meta ds-data">
          <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
          <span aria-hidden="true">·</span>
          <span>Colorado Springs, CO</span>
        </p>
      </div>
      <div className="tb-close-actions" data-rv>
        <Link to={QUOTE} className="ds-btn ds-btn-primary">
          Talk teaming
          <Arrow />
        </Link>
      </div>
      <div className="tb-close-horizon" aria-hidden="true" />
    </section>
  );
}

export default function Teaming() {
  const ref = useRef<HTMLElement>(null);
  const [inHero, setInHero] = useState(false);

  // The hero closes in once on load; one fade-up per block, once (motion only).
  useEffect(() => {
    const root = ref.current;
    if (!root || !motionAllowed()) return;
    root.dataset.rvArm = 'true';
    const id = requestAnimationFrame(() => requestAnimationFrame(() => setInHero(true)));
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          (e.target as HTMLElement).dataset.in = 'true';
          io.unobserve(e.target);
        }),
      { rootMargin: '0px 0px -6% 0px', threshold: 0.05 },
    );
    root.querySelectorAll('[data-rv]').forEach((el) => io.observe(el));
    return () => {
      cancelAnimationFrame(id);
      io.disconnect();
    };
  }, []);

  return (
    <main ref={ref} id="main" tabIndex={-1} className="ds ds-page tb" data-hero-in={inHero || undefined}>
      <Seo path="/teaming" />
      <Hero />
      <div className="tb-doc">
        <Partners />
        <Credit />
        <Steps />
        <div data-rv>
          <FaqSection items={FAQ} />
        </div>
      </div>
      <Close />
    </main>
  );
}
