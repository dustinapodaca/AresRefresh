import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Arrow from '../components/Arrow';
import { FaqSection } from '../components/market/parts';
import type { Faq } from '../components/market/roles';
import { motionAllowed } from '../components/home/engine';
import { responsive } from '../lib/responsive';
import '../components/ep/ep.css';

// /executive-protection-next (2026-10-30): a mock of an Executive Protection division page. Ares
// does not offer executive protection today; this is what the division could look like if it
// starts (owner, 2026-10-30). A noindex preview, kept out of the menus and the sitemap.
//
// One page that is both the service and the people it serves, like /teaming: the buyer (a chief of
// staff, a family office, a corporate security director) is not the buyer of guard posts, so it is
// a division of its own, linked from Services, rather than a seventh service or industry card.
//
// The hero's object is a movement: the Colorado Capitol at night, with one route drawn up the
// avenue to its door and three times along it. The division's planned lead spent five years on a
// Colorado governor's protective detail (owner), so the Capitol is the right building. Every
// commitment on this page (NDA first, plain clothes, the New York office from 2027) is DRAFT copy
// for the owner to confirm before anything goes live. No clients, numbers, or credentials invented.

const QUOTE = '/contact?service=executive-protection';
const PHONE = '719-696-3966';
const TEL = 'tel:+17196963966';
const EMAIL = 'contact@aressecurity.co';

// The route, in the photo's own units (800 by 600, the 2400 by 1799 file at a third).
// It leaves from the Capitol's door, runs east to the avenue, and turns northeast up it, out toward
// the city lights on the horizon (owner, 2026-10-30; was drawn the other way, ending at the door).
const ROUTE = 'M 292 330 L 330 322 L 404 321 L 452 328 L 500 292 L 548 262 L 600 234 L 652 212';
const STOPS = [
  { x: 292, y: 330, time: '07:40', name: 'Depart' },
  { x: 500, y: 292, time: '07:52', name: 'Route B' },
  { x: 652, y: 212, time: '08:05', name: 'Arrive' },
];

const WHO = [
  {
    name: 'Executives & boards',
    line: 'Chief executives, founders, and directors: at the office, on the road, and at the meetings that make the news.',
  },
  {
    name: 'Family offices & private families',
    line: 'Residential security and daily movements, planned around the homes, schools, and travel of one family.',
  },
  {
    name: 'Visiting principals',
    line: 'Leaders, speakers, and guests in Colorado or New York for a day or a week, met at the aircraft and seen through to departure.',
  },
  {
    name: 'Public figures',
    line: 'People whose work puts them in front of crowds, cameras, or strong opinions.',
  },
];

const PHASES = [
  {
    name: 'Before',
    line: 'Most of the work, done before anyone sees it.',
    items: [
      { title: 'Threat & risk assessment', line: 'Who the principal is, where they are going, and what has happened before.' },
      { title: 'Advance work', line: 'Routes, venues, hospitals, and safe rooms walked before the principal arrives.' },
      { title: 'Coordination', line: 'With venues, hotels, aviation, drivers, and local law enforcement.' },
    ],
  },
  {
    name: 'On the day',
    line: 'Close to the principal, and quiet about it.',
    items: [
      { title: 'Close protection', line: 'Agents with the principal, in plain clothes, armed where the law allows.' },
      { title: 'Secure transportation', line: 'Protective drivers, with a primary and an alternate route for every movement.' },
      { title: 'Residential security', line: 'Posts at the home, overnight or around the clock.' },
    ],
  },
  {
    name: 'After',
    line: 'So the next trip starts from what this one learned.',
    items: [
      { title: 'Debrief', line: 'What happened, what changed, and what we would do differently, in writing.' },
      { title: 'A standing plan', line: 'Kept current between trips, with the same detail lead holding it.' },
    ],
  },
];

const LEAD = [
  { label: 'Background', value: 'Colorado State Patrol' },
  { label: 'Protective detail', value: 'Five years on a Colorado governor’s detail' },
  { label: 'Based in', value: 'New York, from 2027' },
];

const DISCRETION = [
  { label: 'Before the first briefing', value: 'A mutual nondisclosure agreement, signed before we ask a single question about the principal.' },
  { label: 'Need to know', value: 'Only the agents on the detail know who the principal is or where they will be.' },
  { label: 'Plain clothes', value: 'Agents dress for the room the principal is in, not for the camera.' },
  { label: 'Nothing posted', value: 'No photos, places, or names on social media, by anyone on the detail, ever.' },
];

const PLACES = [
  {
    name: 'Colorado',
    status: 'Now',
    line: 'Licensed for armed and unarmed security in Denver, Colorado Springs, and Pueblo, where Ares has worked since 2021.',
    cities: ['Denver', 'Colorado Springs', 'Pueblo'],
  },
  {
    name: 'New York',
    status: 'From 2027',
    line: 'A detail lead based in the state, with agents who hold New York’s security guard licenses.',
    cities: ['New York City', 'Westchester', 'Long Island'],
  },
];

const STEPS = [
  { title: 'A private call', line: 'Who needs protection, where, and when. Nothing is written down until the NDA is signed.' },
  { title: 'The assessment', line: 'The principal’s profile, schedule, places, and any past concerns.' },
  { title: 'The plan', line: 'Agents, drivers, routes, and the price, in one document.' },
  { title: 'The advance', line: 'The detail lead walks the routes and venues before the first movement.' },
  { title: 'The first movement', line: 'The same agents from the first day on, and a debrief after.' },
];

const FAQ: Faq[] = [
  {
    q: 'Are your agents armed?',
    a: 'In Colorado they can be: Ares is licensed for armed security in Denver, Colorado Springs, and Pueblo. Outside Colorado, armed coverage follows that state’s licensing, and we tell you what applies before the detail is set.',
  },
  {
    q: 'Can you cover a single trip?',
    a: 'Yes. A detail can be one visit, a week of travel, or standing coverage at home and at work.',
  },
  {
    q: 'Do you work alongside our own security team?',
    a: 'Yes. The detail answers to whoever you name, and we write the plan with your security team, assistants, and drivers.',
  },
  {
    q: 'Will you sign our nondisclosure agreement?',
    a: 'Yes, yours or ours, before the first briefing.',
  },
  {
    q: 'How soon can a detail start?',
    a: 'It depends on the advance the trip needs. Tell us the date, and we will tell you plainly what can be done by then.',
  },
];

// ------------------------------------------------------------------ hero
function Hero() {
  return (
    <section className="ep-hero" aria-labelledby="ep-title">
      <div className="ep-media" aria-hidden="true">
        <div className="ep-stage">
          <img
            {...responsive('/images/services-hero/denver-capitol-night.webp')}
            alt=""
            decoding="sync"
            {...{ fetchpriority: 'high' }}
          />
          <svg className="ep-route" viewBox="0 0 800 600" preserveAspectRatio="none">
            {/* Fainter as it goes off into the distance. */}
            <defs>
              <linearGradient id="ep-fade" gradientUnits="userSpaceOnUse" x1="460" y1="0" x2="660" y2="0">
                <stop offset="0" stopColor="#e3a06f" />
                <stop offset="1" stopColor="#e3a06f" stopOpacity="0.35" />
              </linearGradient>
            </defs>
            <path className="ep-route-glow" d={ROUTE} pathLength={1} />
            <path className="ep-route-line" d={ROUTE} pathLength={1} stroke="url(#ep-fade)" />
          </svg>
          {STOPS.map((s, i) => (
            <span
              key={s.name}
              className="ep-stop"
              data-start={i === 0 || undefined}
              data-end={i === STOPS.length - 1 || undefined}
              style={{ left: `${(s.x / 800) * 100}%`, top: `${(s.y / 600) * 100}%`, '--i': i } as CSSProperties}
            >
              <span className="ep-stop-dot" />
              <span className="ep-stop-label">
                <span className="ds-data">{s.time}</span>
                {s.name}
              </span>
            </span>
          ))}
        </div>
        <div className="ep-shade" />
      </div>

      <div className="ep-hero-text">
        <h1 id="ep-title" className="ep-title">
          Executive protection.
        </h1>
        <div className="ep-hero-side">
          <p className="ep-lead">
            A protective detail planned around one person&rsquo;s day: the advance, the route, the arrival, and
            the people around them. A division of Ares Security, led by a former member of a Colorado
            governor&rsquo;s protective detail.
          </p>
          <div className="ep-actions">
            <Link to={QUOTE} className="ds-btn ds-btn-primary">
              Request a consultation
              <Arrow />
            </Link>
            <a href={TEL} className="ds-link">
              <span className="ds-data">{PHONE}</span>
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
    <header className="ep-head" data-rv>
      <h2 id={id} className="ep-h2">
        {title}
      </h2>
      {lead && <p className="ep-head-lead">{lead}</p>}
    </header>
  );
}

function Who() {
  return (
    <section className="ep-sec" aria-labelledby="ep-who">
      <Head id="ep-who" title="Who we protect." />
      <ul className="ep-who">
        {WHO.map((w, i) => (
          <li key={w.name} data-rv style={{ '--i': i % 2 } as CSSProperties}>
            <h3 className="ep-who-name">{w.name}</h3>
            <p className="ep-who-line">{w.line}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Covers() {
  return (
    <section className="ep-sec" aria-labelledby="ep-covers">
      <Head id="ep-covers" title="What a detail covers." lead="Before, during, and after every movement." />
      <div className="ep-phases">
        {PHASES.map((p, i) => (
          <section key={p.name} className="ep-phase" data-rv style={{ '--i': i } as CSSProperties} aria-label={p.name}>
            <h3 className="ep-phase-name">{p.name}</h3>
            <p className="ep-phase-line">{p.line}</p>
            <ul className="ep-phase-items">
              {p.items.map((it) => (
                <li key={it.title}>
                  <h4 className="ep-item-title">{it.title}</h4>
                  <p className="ep-item-line">{it.line}</p>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </section>
  );
}

function Lead() {
  return (
    <section className="ep-sec ep-lead-sec" aria-labelledby="ep-lead">
      <div className="ep-lead-copy" data-rv>
        <h2 id="ep-lead" className="ep-h2">
          One detail lead, known by name.
        </h2>
        <p className="ep-head-lead">
          The same agents on every movement, not new faces each week. It is how Ares runs every post it
          holds, and it matters more when the post is a person.
        </p>
      </div>
      <figure className="ep-card" data-rv style={{ '--i': 1 } as CSSProperties}>
        <div className="ep-card-photo" aria-hidden="true">
          <img {...responsive('/images/services-hero/denver-capitol-night.webp', '(max-width: 1023px) 200vw, 1000px')} alt="" loading="lazy" />
        </div>
        <figcaption className="ep-card-body">
          <p className="ep-card-role">Director of Executive Protection</p>
          <dl className="ep-card-rows">
            {LEAD.map((r) => (
              <div key={r.label}>
                <dt>{r.label}</dt>
                <dd>{r.value}</dd>
              </div>
            ))}
          </dl>
        </figcaption>
      </figure>
    </section>
  );
}

function Discretion() {
  return (
    <section className="ep-sec" aria-labelledby="ep-quiet">
      <Head id="ep-quiet" title="Discreet by default." />
      <dl className="ep-ledger" data-rv>
        {DISCRETION.map((r) => (
          <div key={r.label} className="ep-ledger-row">
            <dt>{r.label}</dt>
            <dd>{r.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

function Where() {
  return (
    <section className="ep-sec" aria-labelledby="ep-where">
      <Head
        id="ep-where"
        title="Where we work."
        lead="And with the principal wherever the trip goes. Armed coverage follows each state’s licensing; we tell you what applies before a trip is set."
      />
      <div className="ep-places">
        {PLACES.map((p, i) => (
          <article key={p.name} className="ep-place" data-rv style={{ '--i': i } as CSSProperties}>
            <header className="ep-place-head">
              <h3 className="ep-place-name">{p.name}</h3>
              <span className="ep-place-status ds-data">{p.status}</span>
            </header>
            <p className="ep-place-line">{p.line}</p>
            <ul className="ep-place-cities ds-data">
              {p.cities.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}

// Five steps on one hairline that fills rust with the scroll (across on desktop, down on phones),
// the same reading as the teaming page's steps.
function Steps() {
  const ref = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !motionAllowed()) return;
    const steps = Array.from(el.querySelectorAll<HTMLElement>('.ep-step'));
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
    <section className="ep-sec" aria-labelledby="ep-steps">
      <Head id="ep-steps" title="From the first call to the first movement." />
      <ol ref={ref} className="ep-steps">
        {STEPS.map((s, i) => (
          <li key={s.title} className="ep-step">
            <span className="ep-step-n ds-data" aria-hidden="true">
              {String(i + 1).padStart(2, '0')}
            </span>
            <h3 className="ep-step-title">{s.title}</h3>
            <p className="ep-step-line">{s.line}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

function Close() {
  return (
    <section className="ep-close" aria-labelledby="ep-close-title">
      <h2 id="ep-close-title" className="ep-close-title" data-rv>
        Start with a private conversation.
      </h2>
      <p className="ep-close-line" data-rv>
        Who needs protection, where, and when. The detail lead calls you back.
      </p>
      <div className="ep-close-call" data-rv>
        <a href={TEL} className="ep-close-phone" aria-label={`Call ${PHONE}`}>
          <span className="ds-data">{PHONE}</span>
          <Arrow size={36} />
          <span className="ep-close-rule" aria-hidden="true" />
        </a>
        <p className="ep-close-meta ds-data">
          <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
          <span aria-hidden="true">·</span>
          <span>Colorado Springs, CO</span>
        </p>
      </div>
      <div className="ep-close-actions" data-rv>
        <Link to={QUOTE} className="ds-btn ds-btn-primary">
          Request a consultation
          <Arrow />
        </Link>
      </div>
    </section>
  );
}

export default function ExecutiveProtectionNext() {
  const ref = useRef<HTMLElement>(null);
  const [inHero, setInHero] = useState(false);

  // The route draws once on load; one fade-up per block, once (motion only).
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
    <main ref={ref} id="main" tabIndex={-1} className="ds ds-page ep" data-hero-in={inHero || undefined}>
      <Helmet>
        <title>Executive Protection | Ares Security</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <Hero />
      <div className="ep-doc">
        <Who />
        <Covers />
        <Lead />
        <Discretion />
        <Where />
        <Steps />
        <div data-rv>
          <FaqSection items={FAQ} />
        </div>
      </div>
      <Close />
    </main>
  );
}
