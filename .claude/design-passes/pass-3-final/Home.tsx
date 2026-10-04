import { Link } from 'react-router-dom';
import Seo from '../seo/Seo';

// Same five sections, in the same order, as the original Home: hero with
// the GSA card, the reliability section with the officer photo, the
// woman-owned band, the three explore cards, and the testimonial.
// Restyled with the xAI design analysis: one near-black canvas, weight-400
// display type with tight tracking, uppercase tracked mono labels, 8px
// hairline cards with no shadows, and pills as the only interactive shape.
// Dark only. Scroll reveals are removed for now; motion is a separate phase.
// Every link sets its own text color: the base `a:hover` rule paints ink,
// which would vanish on this canvas.

const GSA_ELIBRARY_URL =
  'https://www.gsaelibrary.gsa.gov/ElibMain/contractorInfo.do?contractNumber=47QSMS25D009Q&contractorName=ARES+SECURITY+LLC&executeQuery=YES';

const FOCUS = 'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white';
const PILL_FILLED = `inline-flex h-11 items-center justify-center rounded-full border border-white bg-white px-5 text-[14px] text-canvas hover:bg-white/85 hover:text-canvas ${FOCUS}`;
const PILL_OUTLINE = `inline-flex h-11 items-center justify-center gap-2 rounded-full border border-white/25 px-5 text-[14px] text-white hover:border-white/60 hover:text-white ${FOCUS}`;
const MONO_LABEL = 'font-mono text-[12px] uppercase leading-4 tracking-[0.1em] text-mute';
const CARD = 'rounded-lg border border-hairline bg-card';

const DISPLAY_XL: React.CSSProperties = { fontSize: 'clamp(40px, 5.6vw, 80px)', lineHeight: 1, letterSpacing: '-0.035em' };
const DISPLAY_MD: React.CSSProperties = { fontSize: 'clamp(32px, 3.4vw, 48px)', lineHeight: 1.05, letterSpacing: '-0.03em' };

const PRACTICES = [
  {
    h: 'Trained on site by leadership',
    p: 'Before their first shift, every officer is trained on your post by a leader who has worked that exact post.',
  },
  {
    h: 'Planned before the contract',
    p: 'We learn your site, operations, and risks before anything is signed, so the plan fits how your facility runs.',
  },
  {
    h: 'Clean documentation',
    p: 'Proposals, post orders, and reports are written to the standard of a technical submittal.',
  },
  {
    h: 'A direct line',
    p: 'Regular updates and direct access to the people managing your account.',
  },
];

// Woman-owned band data. Every value already appears on the original Home
// or the Capability Statement page. Identifiers render in mono, as data.
type SpecRow = { k: string; v: string; sub?: string; mono?: boolean; href?: string };

const CERTIFICATIONS: SpecRow[] = [
  { k: 'Ownership', v: 'Minority woman-owned' },
  { k: 'WOSB', v: 'WOSB250470', mono: true, sub: 'Set-aside eligible' },
  { k: 'WBENC', v: 'WBE2303571', mono: true },
  { k: 'Veterans', v: 'Supervisors and NRA firearms instructor' },
  { k: 'Founded', v: '2021', mono: true, sub: 'Colorado Springs, CO' },
];

const CONTRACTING: SpecRow[] = [
  { k: 'GSA MAS contract', v: '47QSMS25D009Q', mono: true, href: GSA_ELIBRARY_URL },
  { k: 'SIN', v: '561612', mono: true, sub: 'Security Services' },
  { k: 'UEI', v: 'XQXDN6E33SF4', mono: true },
  { k: 'CAGE code', v: '9KL18', mono: true },
  { k: 'Primary NAICS', v: '561612', mono: true, sub: 'Security Guards & Patrol Services' },
];

const EXPLORE_CARDS = [
  {
    to: '/about',
    title: 'About Us',
    body: 'Our story, our principles, and the people behind every post.',
    cta: 'About Ares',
    src: '/images/about-sunset.jpg',
    w: 1400,
    h: 805,
  },
  {
    to: '/services',
    title: 'Services',
    body: 'Six service divisions across federal, commercial, industrial, and specialized sites.',
    cta: 'View Services',
    src: '/images/capabilities-card.jpg',
    w: 1408,
    h: 736,
  },
  {
    to: '/careers',
    title: 'Careers',
    body: 'Armed, unarmed, cleared, and office roles with paid training. Veterans are encouraged to apply.',
    cta: 'See Open Roles',
    src: '/images/careers-team.jpg',
    w: 1184,
    h: 880,
  },
];

export default function Home() {
  return (
    <main className="bg-canvas text-body">
      <Seo path="/" />

      {/* Hero */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img
            src="/images/hero-steel-wide.webp"
            alt=""
            width={1680}
            height={640}
            className="h-full w-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,10,10,0.55)_0%,rgba(10,10,10,0.7)_55%,#0a0a0a_100%)]" />
        </div>
        <div className="container-ares pt-40 pb-20 lg:pt-48 lg:pb-24">
          <img
            src="/images/ares-text.svg"
            alt="Ares Security"
            width={330}
            height={110}
            className="block w-full max-w-[200px] opacity-90 lg:max-w-[240px]"
            style={{ filter: 'brightness(0) invert(1)' }}
          />
          <h1 className="mt-10 font-normal text-balance text-white" style={DISPLAY_XL}>
            Security guards for federal and commercial sites.
          </h1>
          <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-start">
            <div>
              <p className="max-w-[34rem] text-[18px] leading-7">
                A minority woman-owned, employee-focused firm serving Colorado Springs, Denver, and Pueblo since 2021.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/contact" className={PILL_FILLED}>Request a Quote</Link>
                <Link to="/capability-statement" className={PILL_OUTLINE}>Capability Statement</Link>
              </div>
            </div>

            {/* GSA contract card */}
            <div className={`p-6 ${CARD}`}>
              <div className="flex items-start justify-between gap-4">
                <img
                  src="/images/gsa-contract-holder.png"
                  alt="GSA Contract Holder"
                  className="block h-auto w-auto max-w-[180px]"
                />
              </div>
              <dl className="m-0 mt-5">
                <dt className={MONO_LABEL}>Contract</dt>
                <dd className="m-0 mt-1.5 font-mono text-[17px] tracking-[0.02em] text-white">47QSMS25D009Q</dd>
              </dl>
              <p className="mt-4 text-[14px] leading-5 text-mute">
                Pre-negotiated federal pricing. Agencies can award task orders without opening a new competition.
              </p>
              <a
                href={GSA_ELIBRARY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={`mt-5 ${PILL_OUTLINE}`}
              >
                View on GSA eLibrary <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* How we staff a post (was "We Are Reliable In Every Way") */}
      <section>
        <div className="container-ares py-24 lg:py-32">
          <div className="grid items-end gap-8 lg:grid-cols-[1fr_auto]">
            <h2 className="font-normal text-white" style={DISPLAY_MD}>How we staff a post</h2>
            <Link to="/about" className={`justify-self-start ${PILL_OUTLINE}`}>About Ares</Link>
          </div>
          <div className="mt-12 grid gap-4 lg:grid-cols-[1fr_1.6fr]">
            <div className={`aspect-[4/3] overflow-hidden lg:aspect-auto ${CARD}`}>
              <img
                src="/images/backbone-officer.jpg"
                alt="Smiling Ares Security officer in a black Ares Security polo shirt, standing against a brick wall"
                width={733}
                height={900}
                loading="lazy"
                className="h-full w-full object-cover object-[center_20%]"
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {PRACTICES.map((item) => (
                <div key={item.h} className={`p-6 lg:p-8 ${CARD}`}>
                  <h3 className="text-[20px] font-normal leading-7 text-white">{item.h}</h3>
                  <p className="mt-3 text-[16px] leading-6 text-mute">{item.p}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Woman-owned band */}
      <section>
        <div className="container-ares">
          <div className="grid gap-12 border-t border-hairline py-24 lg:grid-cols-[1fr_1.15fr] lg:gap-16 lg:py-32">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <h2 className="font-normal text-white" style={DISPLAY_MD}>
                Minority woman-owned. Reliability-driven.
              </h2>
              <p className="mt-6 max-w-[34rem] text-[17px] leading-7">
                WOSB and WBENC certified. On-call scheduling is standard in every contract, and missed shifts have stayed under 1% since we opened.
              </p>
              <div className="mt-12">
                <p className="font-normal text-white" style={{ fontSize: 'clamp(72px, 8vw, 112px)', lineHeight: 1, letterSpacing: '-0.04em' }}>
                  &lt;1%
                </p>
                <p className={`mt-4 ${MONO_LABEL}`}>Missed shifts since 2021</p>
              </div>
            </div>
            <div className="grid gap-4">
              <SpecPlate title="Certifications" rows={CERTIFICATIONS} />
              <SpecPlate title="Federal contracting" rows={CONTRACTING} />
            </div>
          </div>
        </div>
      </section>

      {/* Explore cards (was the three hover-expand cards) */}
      <section>
        <div className="container-ares">
          <div className="border-t border-hairline py-24 lg:py-32">
            <h2 className="font-normal text-white" style={DISPLAY_MD}>Get to know Ares</h2>
            <div className="mt-12 grid gap-4 lg:grid-cols-[1.6fr_1fr_1fr]">
              {EXPLORE_CARDS.map((c) => (
                <Link
                  key={c.to}
                  to={c.to}
                  className={`group flex flex-col overflow-hidden text-white hover:border-white/25 hover:text-white ${CARD} ${FOCUS}`}
                >
                  <div className="h-56 overflow-hidden border-b border-hairline lg:h-72">
                    <img
                      src={c.src}
                      alt=""
                      width={c.w}
                      height={c.h}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6 lg:p-8">
                    <h3 className="text-[24px] font-normal leading-8 tracking-[-0.02em] text-white">{c.title}</h3>
                    <p className="mt-3 flex-1 text-[16px] leading-6 text-mute">{c.body}</p>
                    <span className="mt-8 inline-flex h-11 items-center gap-2 self-start rounded-full border border-white/25 px-5 text-[14px] text-white group-hover:border-white/60">
                      {c.cta} <span aria-hidden="true">→</span>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section>
        <div className="container-ares">
          <figure className="m-0 border-t border-hairline py-24 text-center lg:py-32">
            <blockquote
              className="m-0 mx-auto max-w-[30ch] font-normal text-white"
              style={{ fontSize: 'clamp(26px, 3vw, 40px)', lineHeight: 1.2, letterSpacing: '-0.02em' }}
            >
              <p>
                “Ares arrived prepared. Their documentation was cleaner than the incumbent’s from day one.”
              </p>
            </blockquote>
            <figcaption className="mt-10 flex flex-col items-center gap-1.5">
              <span className="font-mono text-[12px] uppercase tracking-[0.1em] text-white">Contracting Officer</span>
              <span className={MONO_LABEL}>USAF · Buckley Space Force Base</span>
            </figcaption>
          </figure>
        </div>
      </section>
    </main>
  );
}

function SpecPlate({ title, rows }: { title: string; rows: SpecRow[] }) {
  return (
    <div className={`p-6 lg:p-8 ${CARD}`}>
      <h3 className="text-[20px] font-normal leading-7 text-white">{title}</h3>
      <dl className="m-0 mt-6">
        {rows.map((row) => (
          <div
            key={row.k}
            className="flex flex-col gap-1.5 border-t border-hairline py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
          >
            <dt className={`shrink-0 ${MONO_LABEL}`}>{row.k}</dt>
            <dd className="m-0 sm:text-right">
              <span className={row.mono ? 'font-mono text-[15px] tracking-[0.02em] text-white' : 'text-[15px] leading-6 text-white'}>
                {row.href ? (
                  <a
                    href={row.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-white underline decoration-white/30 underline-offset-4 hover:text-white hover:decoration-white ${FOCUS}`}
                  >
                    {row.v}
                    <span aria-hidden="true" className="ml-1 font-sans">↗</span>
                    <span className="sr-only"> (opens GSA eLibrary in a new tab)</span>
                  </a>
                ) : (
                  row.v
                )}
              </span>
              {row.sub && <span className="mt-0.5 block text-[13px] leading-5 text-mute">{row.sub}</span>}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
