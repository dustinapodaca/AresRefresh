import { Link } from 'react-router-dom';
import Seo from '../seo/Seo';

const GSA_ELIBRARY_URL =
  'https://www.gsaelibrary.gsa.gov/ElibMain/contractorInfo.do?contractNumber=47QSMS25D009Q&contractorName=ARES+SECURITY+LLC&executeQuery=YES';

// Spec sheet. Every value here already appears on the Capability Statement
// page or in the old Home copy; nothing is new. Mono = an identifier or a
// measured figure, set in IBM Plex Mono so it reads as data, not prose.
type SpecRow = {
  k: string;
  v: string;
  sub?: string;
  mono?: boolean;
  featured?: boolean;
  href?: string;
};

const SPEC: { title: string; rows: SpecRow[] }[] = [
  {
    title: 'Contract vehicle',
    rows: [
      { k: 'GSA MAS contract', v: '47QSMS25D009Q', mono: true, href: GSA_ELIBRARY_URL },
      { k: 'SIN', v: '561612', mono: true, sub: 'Security Services' },
      { k: 'Ordering', v: 'Pre-negotiated pricing. Agencies can award task orders without a new competition.' },
    ],
  },
  {
    title: 'Federal registration',
    rows: [
      { k: 'UEI', v: 'XQXDN6E33SF4', mono: true },
      { k: 'CAGE code', v: '9KL18', mono: true },
      { k: 'Primary NAICS', v: '561612', mono: true, sub: 'Security Guards & Patrol Services' },
    ],
  },
  {
    title: 'Ownership and certification',
    rows: [
      { k: 'Ownership', v: 'Minority woman-owned' },
      { k: 'WOSB certification', v: 'WOSB250470', mono: true, sub: 'Set-aside eligible' },
      { k: 'WBENC certification', v: 'WBE2303571', mono: true },
      { k: 'Founded', v: '2021', mono: true, sub: 'Colorado Springs, CO' },
    ],
  },
  {
    title: 'Performance',
    rows: [
      { k: 'Missed shifts', v: '<1%', featured: true, sub: 'Since founding in 2021' },
      { k: 'On-call coverage', v: 'Standard in every contract' },
      { k: 'Veterans', v: 'Supervisors and NRA firearms instructor' },
    ],
  },
];

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

// One heading scale for every section h2: tight tracking at display size,
// medium weight, so hierarchy comes from size and weight, not italics.
const H2_STYLE: React.CSSProperties = {
  fontSize: 'clamp(32px, 3.4vw, 48px)',
  lineHeight: 1.08,
  letterSpacing: '-0.03em',
};

export default function Home() {
  return (
    <main>
      <Seo path="/" />

      {/* Hero */}
      <section className="bg-ink text-paper">
        <div className="container-ares grid gap-12 pt-32 pb-16 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:items-center lg:gap-16 lg:pt-40 lg:pb-24">
          <div>
            <h1
              className="font-medium text-balance text-paper"
              style={{ fontSize: 'clamp(38px, 3.9vw, 56px)', lineHeight: 1.04, letterSpacing: '-0.035em' }}
            >
              Security guards for federal and commercial sites.
            </h1>
            <p className="mt-6 max-w-[34rem] text-[19px] leading-[1.5] text-paper/70">
              A minority woman-owned GSA schedule holder serving Colorado Springs, Denver, and Pueblo since 2021.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link to="/contact" className="btn btn-white">Request a Quote</Link>
              <Link to="/capability-statement" className="btn btn-outline-white">Capability Statement</Link>
            </div>
          </div>
          <div className="relative aspect-[16/10] overflow-hidden rounded-[6px] bg-ink-2 lg:aspect-[4/5]">
            <img
              src="/images/hero-steel.webp"
              alt=""
              width={960}
              height={1200}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Spec sheet */}
      <section className="bg-paper">
        <div className="container-ares py-20 lg:py-28">
          <h2 className="font-medium text-ink" style={H2_STYLE}>Everything you need to verify us.</h2>
          <div className="mt-12 grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
            {SPEC.map((group) => (
              <div key={group.title} className="border-t border-ink pt-5">
                <h3 className="text-[15px] font-semibold tracking-normal text-ink">{group.title}</h3>
                <dl className="mt-6 flex flex-col gap-6">
                  {group.rows.map((row) => (
                    <SpecItem key={row.k} row={row} />
                  ))}
                </dl>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="bg-paper-2">
        <div className="container-ares py-20 lg:py-28">
          <figure className="m-0 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,2.2fr)] lg:gap-16">
            <blockquote
              className="m-0 font-medium text-ink lg:order-2 lg:-indent-[0.4em]"
              style={{ fontSize: 'clamp(24px, 2.5vw, 36px)', lineHeight: 1.25, letterSpacing: '-0.02em' }}
            >
              <p>
                “Ares arrived prepared. Their documentation was cleaner than the incumbent’s from day one, and their team was inside the badge cycle before most contractors finish onboarding.”
              </p>
            </blockquote>
            <figcaption className="self-start border-t border-ink pt-5 lg:order-1">
              <div className="text-[15px] font-semibold text-ink">Contracting Officer</div>
              <div className="mt-1 text-[15px] text-ink-2">USAF · Buckley Space Force Base</div>
            </figcaption>
          </figure>
        </div>
      </section>

      {/* How we staff a post */}
      <section className="bg-paper">
        <div className="container-ares grid gap-12 py-20 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-center lg:gap-20 lg:py-28">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[6px] bg-pale lg:aspect-square">
            <img
              src="/images/backbone-officer.jpg"
              alt="Smiling Ares Security officer in a black Ares Security polo shirt, standing against a brick wall"
              width={733}
              height={900}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover object-[center_20%]"
            />
          </div>
          <div>
            <h2 className="font-medium text-ink" style={H2_STYLE}>How we staff a post</h2>
            <div className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2">
              {PRACTICES.map((item) => (
                <div key={item.h} className="border-t border-line pt-5">
                  <h3 className="text-[18px] font-semibold text-ink">{item.h}</h3>
                  <p className="mt-2 text-[16px] leading-relaxed text-ink-2">{item.p}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services and service areas */}
      <section className="bg-paper">
        <div className="container-ares">
          <div className="border-t border-line py-20 lg:py-28">
            <h2 className="font-medium text-ink" style={H2_STYLE}>Services and service areas</h2>
            <div className="mt-12 grid gap-14 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-20">
              <div>
                <h3 className="text-[15px] font-semibold tracking-normal text-ink">Service divisions</h3>
                <ul className="mt-5 grid list-none gap-x-10 p-0 sm:grid-cols-2">
                  {DIVISIONS.map((d) => (
                    <li key={d} className="border-t border-line py-4 text-[17px] text-ink">{d}</li>
                  ))}
                </ul>
                <Link to="/services" className="mt-6 inline-flex items-center gap-2 text-[15px] font-semibold text-ink underline decoration-line underline-offset-4 hover:decoration-ink">
                  All services <span aria-hidden="true">→</span>
                </Link>
              </div>
              <div>
                <h3 className="text-[15px] font-semibold tracking-normal text-ink">Where we work</h3>
                <ul className="mt-5 list-none p-0">
                  {AREAS.map((a) => (
                    <li key={a.to} className="border-t border-line">
                      <Link to={a.to} className="group flex items-center justify-between py-4 text-[17px] text-ink">
                        {a.label}
                        <span aria-hidden="true" className="text-mid transition-colors group-hover:text-ink">→</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Careers */}
      <section className="bg-paper-2">
        <div className="container-ares grid gap-12 py-20 lg:grid-cols-2 lg:items-center lg:gap-20 lg:py-28">
          <div>
            <h2 className="font-medium text-ink" style={H2_STYLE}>Now hiring officers</h2>
            <p className="mt-5 max-w-[34rem] text-[17px] leading-relaxed text-ink-2">
              Armed, unarmed, cleared, and office roles, with paid training and real room to grow. Veterans are encouraged to apply.
            </p>
            <Link to="/careers" className="btn btn-primary mt-8">See Open Roles</Link>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-[6px] bg-pale">
            <img
              src="/images/careers-team.jpg"
              alt="Officer in a Security shirt training at an indoor firing range"
              width={1184}
              height={880}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="bg-paper">
        <div className="container-ares grid gap-10 py-20 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-end lg:gap-20 lg:py-28">
          <h2
            className="font-medium text-ink"
            style={{ fontSize: 'clamp(36px, 4.4vw, 60px)', lineHeight: 1.04, letterSpacing: '-0.035em' }}
          >
            Tell us about your site.
          </h2>
          <div>
            <a href="tel:+17196963966" className="block font-mono text-[28px] tracking-[-0.01em] text-ink">719-696-3966</a>
            <a href="mailto:contact@aressecurity.co" className="mt-1 block text-[16px] text-ink-2">contact@aressecurity.co</a>
            <Link to="/contact" className="btn btn-primary mt-8">Request a Quote</Link>
          </div>
        </div>
      </section>
    </main>
  );
}

function SpecItem({ row }: { row: SpecRow }) {
  const valueClass = row.featured
    ? 'font-mono text-[56px] leading-none tracking-[-0.04em] text-ink'
    : row.mono
      ? 'font-mono text-[17px] tracking-[0.01em] text-ink'
      : 'text-[16px] leading-snug text-ink';

  return (
    <div>
      <dt className="text-[13px] text-ink-2">{row.k}</dt>
      <dd className={`m-0 mt-1.5 ${valueClass}`}>
        {row.href ? (
          <a
            href={row.href}
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-line underline-offset-4 hover:decoration-ink"
          >
            {row.v}
            <span aria-hidden="true" className="ml-1.5 font-sans">↗</span>
            <span className="sr-only"> (opens GSA eLibrary in a new tab)</span>
          </a>
        ) : (
          row.v
        )}
      </dd>
      {row.sub && <dd className="m-0 mt-1 text-[13px] text-ink-2">{row.sub}</dd>}
    </div>
  );
}
