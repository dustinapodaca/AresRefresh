import { Link } from 'react-router-dom';
import Seo from '../seo/Seo';

// Home, dark only, built on Vercel's Geist system in its dark theme:
// a centered hero with the page's only color (a mesh glow over the muted
// photo), then a code-block band for the contractor record, a hairline
// feature grid, coverage, template cards, a customer quote, and a centered
// call-to-action band. Marketing CTAs are pills; small chrome is 6px; cards
// are 12-16px with a 1px hairline and no shadow.
// Every link sets its own text color: the base `a:hover` rule paints ink,
// which would vanish on this canvas.

const GSA_ELIBRARY_URL =
  'https://www.gsaelibrary.gsa.gov/ElibMain/contractorInfo.do?contractNumber=47QSMS25D009Q&contractorName=ARES+SECURITY+LLC&executeQuery=YES';

const FOCUS = 'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signal';
const PILL_PRIMARY = `inline-flex h-12 items-center justify-center gap-2 rounded-full bg-heading px-6 text-[16px] font-medium text-canvas hover:bg-white hover:text-canvas ${FOCUS}`;
const PILL_SECONDARY = `inline-flex h-12 items-center justify-center gap-2 rounded-full border border-hairline bg-card px-6 text-[16px] font-medium text-heading hover:border-white/25 hover:text-heading ${FOCUS}`;
const EYEBROW = 'font-mono text-[12px] font-medium uppercase leading-4 text-mute';
const CARD = 'rounded-[12px] border border-hairline bg-card';

const HEADING_LG: React.CSSProperties = { fontSize: 'clamp(28px, 2.6vw, 36px)', lineHeight: 1.15, letterSpacing: '-0.04em' };

type RecordRow = { k: string; v: string; href?: string };
// Every value already appears on the Capability Statement page or in the
// approved Home copy.
const RECORD: RecordRow[] = [
  { k: 'GSA MAS contract', v: '47QSMS25D009Q', href: GSA_ELIBRARY_URL },
  { k: 'SIN', v: '561612' },
  { k: 'UEI', v: 'XQXDN6E33SF4' },
  { k: 'CAGE code', v: '9KL18' },
  { k: 'Primary NAICS', v: '561612' },
  { k: 'WOSB', v: 'WOSB250470' },
  { k: 'WBENC', v: 'WBE2303571' },
  { k: 'Ownership', v: 'Minority woman-owned' },
  { k: 'Founded', v: '2021, Colorado Springs, CO' },
];

const PRACTICES = [
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

// Division names match the Services page exactly.
const DIVISIONS = [
  'Government Security Personnel',
  'Airport & Transportation Security',
  'Commercial & High-Traffic Security',
  'Industrial, Logistics & Construction',
  'Specialized & Armed Protection',
  'Institutional & Community Security',
];

const AREAS = [
  { to: '/locations/colorado-springs', label: 'Colorado Springs' },
  { to: '/locations/denver', label: 'Denver' },
  { to: '/locations/pueblo', label: 'Pueblo' },
];

const TEMPLATES = [
  {
    to: '/about',
    title: 'About Ares',
    body: 'Our story, our principles, and the people behind every post.',
    src: '/images/about-security.jpg',
    alt: 'Two Ares Security officers seen from behind, Security printed across their shirts',
    w: 1408,
    h: 736,
  },
  {
    to: '/services',
    title: 'Services',
    body: 'Six service divisions across federal, commercial, industrial, and specialized sites.',
    src: '/images/mission-vehicle.jpg',
    alt: 'Two Ares Security patrol vehicles parked on a residential street',
    w: 750,
    h: 842,
  },
  {
    to: '/careers',
    title: 'Careers',
    body: 'Armed, unarmed, cleared, and office roles with paid training. Veterans are encouraged to apply.',
    src: '/images/careers-philosophy.jpg',
    alt: 'The Ares Security team in uniform at an indoor firing range',
    w: 1184,
    h: 880,
  },
];

export default function Home() {
  return (
    <main className="bg-canvas font-geist text-body">
      <Seo path="/" />

      {/* Hero: centered, full viewport, the page's one color */}
      <section className="relative isolate flex min-h-[100dvh] flex-col overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <img
            src="/images/hero6.webp"
            alt=""
            width={1920}
            height={1280}
            className="h-full w-full object-cover object-[center_60%] opacity-30"
          />
          <div
            className="absolute inset-0"
            style={{
              background: [
                'radial-gradient(38% 42% at 34% 30%, rgba(0,124,240,0.30) 0%, rgba(0,124,240,0) 70%)',
                'radial-gradient(34% 40% at 66% 26%, rgba(0,223,216,0.16) 0%, rgba(0,223,216,0) 70%)',
                'radial-gradient(30% 36% at 52% 14%, rgba(121,40,202,0.18) 0%, rgba(121,40,202,0) 70%)',
                'linear-gradient(180deg, rgba(10,10,10,0.3) 0%, rgba(10,10,10,0.65) 60%, #0a0a0a 100%)',
              ].join(', '),
            }}
          />
        </div>
        <div className="container-ares flex flex-1 flex-col items-center justify-center pt-32 pb-20 text-center lg:pt-36">
          <a
            href={GSA_ELIBRARY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex h-9 items-center gap-2 rounded-[64px] border border-hairline bg-card/80 px-4 text-[14px] text-heading hover:border-white/25 hover:text-heading ${FOCUS}`}
          >
            <span className="font-mono text-[13px]">GSA MAS 47QSMS25D009Q</span>
            <span aria-hidden="true" className="text-mute">↗</span>
            <span className="sr-only">(opens GSA eLibrary in a new tab)</span>
          </a>
          <h1
            className="mx-auto mt-8 max-w-[18ch] font-semibold text-balance text-heading"
            style={{ fontSize: 'clamp(44px, 6vw, 84px)', lineHeight: 1, letterSpacing: '-0.05em' }}
          >
            Security guards for federal and commercial sites.
          </h1>
          <p className="mx-auto mt-7 max-w-[36rem] text-[18px] leading-7 text-body">
            A minority woman-owned, employee-focused firm serving Colorado Springs, Denver, and Pueblo since 2021.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link to="/contact" className={PILL_PRIMARY}>Request a Quote</Link>
            <Link to="/capability-statement" className={PILL_SECONDARY}>Capability Statement</Link>
          </div>
        </div>
      </section>

      {/* Code-block band: the contractor record */}
      <section>
        <div className="container-ares grid gap-12 pb-24 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-center lg:gap-20 lg:pb-32">
          <div>
            <h2 className="font-semibold text-balance text-heading" style={HEADING_LG}>Everything you need to verify us.</h2>
            <p className="mt-4 max-w-[32rem] text-[16px] leading-6">
              Pre-negotiated federal pricing on the GSA schedule. Agencies can award task orders without opening a new competition.
            </p>
            <Link to="/capability-statement" className={`mt-6 inline-flex items-center gap-1.5 text-[14px] font-medium text-signal hover:text-heading ${FOCUS}`}>
              Read the capability statement <span aria-hidden="true">→</span>
            </Link>
          </div>
          <div className={`overflow-hidden ${CARD}`}>
            <div className="flex items-center justify-between border-b border-hairline px-5 py-3">
              <span className="font-mono text-[13px] text-heading">Ares Security LLC</span>
              <span className={EYEBROW}>Contractor record</span>
            </div>
            <dl className="m-0 px-5 py-4 font-mono text-[14px] leading-7">
              {RECORD.map((row) => (
                <div key={row.k} className="grid py-1 sm:grid-cols-[18ch_minmax(0,1fr)] sm:gap-4 sm:py-0">
                  <dt className="text-mute">{row.k}</dt>
                  <dd className="m-0 text-heading">
                    {row.href ? (
                      <a href={row.href} target="_blank" rel="noopener noreferrer" className={`text-signal hover:text-heading ${FOCUS}`}>
                        {row.v}
                        <span aria-hidden="true" className="ml-1 font-geist">↗</span>
                        <span className="sr-only"> (opens GSA eLibrary in a new tab)</span>
                      </a>
                    ) : (
                      row.v
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* Hairline feature grid: how a post is staffed */}
      <section className="border-t border-hairline">
        <div className="container-ares py-24 lg:py-32">
          <h2 className="max-w-[24ch] font-semibold text-heading" style={HEADING_LG}>How we staff a post</h2>
          <div className="mt-12 grid gap-px overflow-hidden rounded-[16px] border border-hairline bg-hairline lg:grid-cols-3">
            {/* Lead card: the differentiator, with a staff photo */}
            <div className="grid bg-card sm:grid-cols-2 lg:col-span-2">
              <div className="flex flex-col justify-between p-6 lg:p-8">
                <p className={EYEBROW}>Site training</p>
                <div className="mt-10">
                  <h3 className="text-[20px] font-semibold leading-7 tracking-[-0.02em] text-heading">
                    Trained on site by leadership
                  </h3>
                  <p className="mt-2 text-[15px] leading-6">
                    Before their first shift, every officer is trained on your post by a leader who has worked that exact post.
                  </p>
                </div>
              </div>
              <div className="aspect-[4/3] border-t border-hairline sm:aspect-auto sm:border-t-0 sm:border-l">
                <img
                  src="/images/officer-portrait.jpg"
                  alt="Ares Security officer in a black Ares polo with a badge on a lanyard, arms crossed, smiling"
                  width={992}
                  height={1040}
                  loading="lazy"
                  className="h-full w-full object-cover object-[center_25%]"
                />
              </div>
            </div>
            {/* Metric card */}
            <div className="flex flex-col justify-between bg-card p-6 lg:p-8">
              <p className={EYEBROW}>Performance</p>
              <div className="mt-10">
                <p className="font-semibold text-heading" style={{ fontSize: 'clamp(56px, 6vw, 84px)', lineHeight: 1, letterSpacing: '-0.05em' }}>
                  &lt;1%
                </p>
                <p className="mt-3 text-[15px] leading-6">Missed shifts since 2021. On-call scheduling is standard in every contract.</p>
              </div>
            </div>
            {PRACTICES.map((item) => (
              <div key={item.h} className="bg-card p-6 lg:p-8">
                <h3 className="text-[20px] font-semibold leading-7 tracking-[-0.02em] text-heading">{item.h}</h3>
                <p className="mt-2 text-[15px] leading-6">{item.p}</p>
              </div>
            ))}
            {/* Full-width row: veterans */}
            <div className="flex flex-col gap-2 bg-card p-6 sm:flex-row sm:items-baseline sm:justify-between lg:col-span-3 lg:px-8">
              <h3 className="text-[16px] font-semibold tracking-[-0.01em] text-heading">Veterans in leadership</h3>
              <p className="text-[15px] leading-6">Veteran supervisors on staff, and our NRA firearms instructor is a veteran.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Coverage: divisions as a hairline grid, areas as category pills */}
      <section className="border-t border-hairline">
        <div className="container-ares py-24 lg:py-32">
          <h2 className="font-semibold text-heading" style={HEADING_LG}>Services and service areas</h2>
          <ul className="m-0 mt-12 grid list-none gap-px overflow-hidden rounded-[12px] border border-hairline bg-hairline p-0 sm:grid-cols-2 lg:grid-cols-3">
            {DIVISIONS.map((d) => (
              <li key={d} className="bg-card px-6 py-5 text-[16px] font-medium tracking-[-0.01em] text-heading">{d}</li>
            ))}
          </ul>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center gap-2">
              <span className={`mr-2 ${EYEBROW}`}>Where we work</span>
              {AREAS.map((a) => (
                <Link
                  key={a.to}
                  to={a.to}
                  className={`inline-flex h-10 items-center gap-2 rounded-[64px] border border-hairline bg-card px-4 text-[14px] font-medium text-heading hover:border-white/25 hover:text-heading ${FOCUS}`}
                >
                  {a.label} <span aria-hidden="true" className="text-mute">→</span>
                </Link>
              ))}
            </div>
            <Link to="/services" className={`text-[14px] font-medium text-signal hover:text-heading ${FOCUS}`}>
              All services <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Template cards */}
      <section className="border-t border-hairline">
        <div className="container-ares py-24 lg:py-32">
          <h2 className="font-semibold text-heading" style={HEADING_LG}>Get to know Ares</h2>
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {TEMPLATES.map((t) => (
              <Link
                key={t.to}
                to={t.to}
                className={`group flex flex-col overflow-hidden text-heading hover:border-white/25 hover:text-heading ${CARD} ${FOCUS}`}
              >
                <div className="aspect-[16/10] overflow-hidden border-b border-hairline">
                  <img src={t.src} alt={t.alt} width={t.w} height={t.h} loading="lazy" className="h-full w-full object-cover" />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="text-[16px] font-semibold tracking-[-0.01em] text-heading">{t.title}</h3>
                    <span aria-hidden="true" className="text-mute group-hover:text-heading">→</span>
                  </div>
                  <p className="mt-2 text-[14px] leading-5">{t.body}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Customer quote (placeholder, shortened) */}
      <section className="border-t border-hairline">
        <div className="container-ares py-24 lg:py-32">
          <figure className="m-0 mx-auto max-w-3xl rounded-[16px] border border-hairline bg-card p-8 sm:p-12">
            <blockquote className="m-0">
              <p
                className="font-medium text-heading"
                style={{ fontSize: 'clamp(22px, 2.2vw, 30px)', lineHeight: 1.3, letterSpacing: '-0.02em' }}
              >
                “Ares arrived prepared. Their documentation was cleaner than the incumbent’s from day one.”
              </p>
            </blockquote>
            <figcaption className="mt-8 flex flex-col gap-1 border-t border-hairline pt-5 sm:flex-row sm:items-center sm:justify-between">
              <span className="text-[14px] font-semibold text-heading">Contracting Officer</span>
              <span className="font-mono text-[13px] text-mute">USAF · Buckley Space Force Base</span>
            </figcaption>
          </figure>
        </div>
      </section>

      {/* Call-to-action band */}
      <section className="border-t border-hairline">
        <div className="container-ares py-24 text-center lg:py-32">
          <h2
            className="font-semibold text-balance text-heading"
            style={{ fontSize: 'clamp(36px, 4.4vw, 60px)', lineHeight: 1.02, letterSpacing: '-0.05em' }}
          >
            Tell us about your site.
          </h2>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link to="/contact" className={PILL_PRIMARY}>Request a Quote</Link>
            <a href="tel:+17196963966" className={`${PILL_SECONDARY} font-mono`}>719-696-3966</a>
          </div>
          <a href="mailto:contact@aressecurity.co" className={`mt-6 inline-block text-[15px] text-mute hover:text-heading ${FOCUS}`}>
            contact@aressecurity.co
          </a>
        </div>
      </section>
    </main>
  );
}
