import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Seo from '../seo/Seo';
import Arrow from '../components/FlowArrow';

// Home as a field document (DESIGN.md v2, derived from the Mobbin board in
// docs/inspiration.md). One continuous charcoal surface with a visible frame:
// a 220px index column for the reading rail plus three content columns, with
// full-height lines and no section dividers. The hero ends on a proof strip
// split by the frame (Superpower/Giga); the ledger's columns are the frame's
// columns (Locomotive, basement); the measured figure hangs into the quote;
// the staff photo is pinned with annotation markers while the steps advance
// along a frame line (Samara); cities are giant ruled rows; a full-bleed photo
// carries the frame over it into the company panels; the close glows bronze.
// Every link sets its own text color: the base `a:hover` rule paints ink,
// which would vanish on this canvas.

const GSA_ELIBRARY_URL =
  'https://www.gsaelibrary.gsa.gov/ElibMain/contractorInfo.do?contractNumber=47QSMS25D009Q&contractorName=ARES+SECURITY+LLC&executeQuery=YES';

const FOCUS = 'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signal';
const PILL_PRIMARY = `pill pill-lg pill-primary ${FOCUS}`;
const PILL_SECONDARY = `pill pill-lg pill-secondary ${FOCUS}`;
// The frame grid. Content cells add lg:px-7 so text sits off the lines.
const GRID = 'lg:grid lg:grid-cols-[220px_repeat(3,minmax(0,1fr))]';
const SPAN = 'lg:col-start-2 lg:col-span-3 lg:px-7';
const LINK = `flow-link inline-flex items-center gap-1.5 text-signal hover:text-paper-ink ${FOCUS}`;

const DISPLAY_XXL: React.CSSProperties = { fontSize: 'clamp(44px, 7.6vw, 116px)', lineHeight: 0.94, letterSpacing: '-0.05em' };
const DISPLAY_LG: React.CSSProperties = { fontSize: 'clamp(34px, 4.2vw, 60px)', lineHeight: 1.02, letterSpacing: '-0.04em' };
const DISPLAY_MD: React.CSSProperties = { fontSize: 'clamp(26px, 2.6vw, 38px)', lineHeight: 1.15, letterSpacing: '-0.03em' };
const CITY: React.CSSProperties = { fontSize: 'clamp(36px, 8.2vw, 124px)', lineHeight: 1, letterSpacing: '-0.05em' };

const SECTIONS = [
  { id: 'verify', n: '01', label: 'Verify' },
  { id: 'staffing', n: '02', label: 'Staffing' },
  { id: 'coverage', n: '03', label: 'Coverage' },
  { id: 'careers', n: '04', label: 'Company' },
  { id: 'contact', n: '05', label: 'Contact' },
];

// The ledger, grouped the way a contracting officer checks a vendor. Every
// value already appears on the Capability Statement page or in the approved
// Home copy.
type LedgerRow = { k: string; v: string; note?: string; href?: string; internal?: boolean; mono?: boolean };
const LEDGER_GROUPS: { title: string; rows: LedgerRow[] }[] = [
  {
    title: 'Contract vehicle',
    rows: [
      { k: 'GSA MAS contract', v: '47QSMS25D009Q', note: 'Pre-negotiated pricing. Task orders without a new competition.', href: GSA_ELIBRARY_URL, mono: true },
      { k: 'SIN', v: '561612', note: 'Security Services', mono: true },
    ],
  },
  {
    title: 'Federal registration',
    rows: [
      { k: 'UEI', v: 'XQXDN6E33SF4', note: 'Unique Entity Identifier, SAM.gov', mono: true },
      { k: 'CAGE code', v: '9KL18', note: 'Commercial and Government Entity', mono: true },
      { k: 'Primary NAICS', v: '561612', note: 'Security Guards & Patrol Services', mono: true },
    ],
  },
  {
    title: 'Ownership and certification',
    rows: [
      { k: 'Ownership', v: 'Minority woman-owned', note: 'WOSB and WBENC certified' },
      { k: 'WOSB certification', v: 'WOSB250470', note: 'Set-aside eligible', mono: true },
      { k: 'WBENC certification', v: 'WBE2303571', note: "Women's Business Enterprise", mono: true },
      { k: 'Founded', v: '2021', note: 'Colorado Springs, CO', mono: true },
    ],
  },
  {
    title: 'Documents',
    rows: [
      { k: 'Capability statement', v: 'Read the statement', note: 'Every number above, on one page', href: '/capability-statement', internal: true },
    ],
  },
];

const STEPS = [
  {
    h: 'Planned before the contract',
    p: 'We learn your site, operations, and risks before anything is signed, so the plan fits how your facility runs.',
  },
  {
    h: 'Trained on site by leadership',
    p: 'Before their first shift, every officer is trained on your post by a leader who has worked that exact post.',
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

// Annotation markers on the staff photo (Superpower pattern). Each label is
// a claim the About page already makes.
const MARKERS = [
  { label: 'Background-checked', className: 'top-[16%] right-[8%]' },
  { label: 'Licensed', className: 'top-[48%] left-[7%]' },
  { label: 'Trained on site', className: 'bottom-[14%] right-[10%]' },
];

const AREAS = [
  { to: '/locations/colorado-springs', label: 'Colorado Springs' },
  { to: '/locations/denver', label: 'Denver' },
  { to: '/locations/pueblo', label: 'Pueblo' },
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

// "Get to know Ares" (rail: 04 Company): Pass 3-final's three panels in its
// order and wording, now one per frame column.
const PANELS = [
  {
    to: '/about',
    title: 'About Us',
    body: 'Our story, our principles, and the people behind every post.',
    cta: 'About Ares',
    src: '/images/about-sunset.jpg',
    alt: 'Denver skyline at sunset with the Front Range behind it',
    w: 1400,
    h: 805,
  },
  {
    to: '/services',
    title: 'Services',
    body: 'Six service divisions across federal, commercial, industrial, and specialized sites.',
    cta: 'View Services',
    src: '/images/about-security.jpg',
    alt: 'Two Ares Security officers seen from behind, Security printed across their shirts',
    w: 1408,
    h: 736,
  },
  {
    to: '/careers',
    title: 'Careers',
    body: 'Armed, unarmed, cleared, and office roles with paid training. Veterans are encouraged to apply.',
    cta: 'See Open Roles',
    src: '/images/careers-team.jpg',
    alt: 'Officer in a Security shirt training at an indoor firing range',
    w: 1184,
    h: 880,
  },
];

// The frame: vertical hairlines at the container's column boundaries,
// desktop only. `fill` adds the rail's reading progress along the first line.
function FrameLines({ fill = false, tone = 'bg-hairline' }: { fill?: boolean; tone?: string }) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden lg:block">
      <div className="container-ares relative h-full">
        <div className="relative grid h-full grid-cols-[220px_repeat(3,minmax(0,1fr))]">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="relative">
              <span className={`absolute top-0 bottom-0 left-0 w-px ${tone}`} />
              {i === 3 && <span className={`absolute top-0 right-0 bottom-0 w-px ${tone}`} />}
              {fill && i === 0 && <span className="flow-rail-fill absolute top-0 bottom-0 left-0 w-px bg-signal" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const docRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<string>('verify');
  const [docVisible, setDocVisible] = useState(false);

  // Theme the browser surfaces (scrollbar, selection, overscroll) while Home
  // is mounted.
  useEffect(() => {
    const root = document.documentElement;
    root.dataset.surface = 'dark';
    return () => {
      delete root.dataset.surface;
    };
  }, []);

  // Rail state: the active section is the last one (in page order) whose
  // top has crossed 40% of the viewport. Observer callbacks only trigger the
  // check; positions are read fresh each time, so fast scrolls and jumps
  // cannot leave the rail on a stale section.
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;
    const sync = () => {
      const line = window.innerHeight * 0.4;
      let current = SECTIONS[0].id;
      SECTIONS.forEach((s) => {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top <= line) current = s.id;
      });
      setActive(current);
    };
    const sectionIo = new IntersectionObserver(sync, {
      rootMargin: '0px 0px -60% 0px',
      threshold: [0, 1],
    });
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) sectionIo.observe(el);
    });
    const docIo = new IntersectionObserver(([e]) => setDocVisible(e.isIntersecting), {
      rootMargin: '-40% 0px -40% 0px',
    });
    if (docRef.current) docIo.observe(docRef.current);
    return () => {
      sectionIo.disconnect();
      docIo.disconnect();
    };
  }, []);

  const activeIndex = Math.max(0, SECTIONS.findIndex((s) => s.id === active));

  return (
    <main
      className="bg-canvas text-ink-muted"
      style={{ fontFeatureSettings: '"cv01", "cv05", "cv09", "cv11", "ss03"' }}
    >
      <Seo path="/" />

      {/* Hero: the photograph under the nav, the frame drawn over it, and a
          proof strip split by the frame lines along the bottom edge */}
      <section className="relative isolate flex min-h-[100dvh] flex-col overflow-clip">
        <img
          src="/images/hero6.webp"
          alt=""
          width={1920}
          height={1280}
          className="flow-hero-photo absolute inset-0 -z-10 h-full w-full object-cover object-[center_60%] [filter:brightness(0.6)] [mask-image:linear-gradient(180deg,transparent_0%,rgba(0,0,0,0.08)_14%,rgba(0,0,0,0.4)_36%,#000_62%,rgba(0,0,0,0.8)_86%,rgba(0,0,0,0.35)_100%)]"
        />
        <FrameLines tone="bg-white/[0.09]" />
        <div className="container-ares relative flex flex-1 flex-col pt-36 lg:pt-44">
          <div className={GRID}>
            <h1 className="font-display font-semibold text-balance text-paper-ink lg:col-span-4 lg:pr-7" style={DISPLAY_XXL}>
              Security guards for federal and commercial sites.
            </h1>
          </div>
          <div className={`${GRID} mt-8 lg:mt-12`}>
            <p className="max-w-[30rem] text-[18px] leading-[1.5] tracking-[-0.01em] text-paper-ink lg:col-start-3 lg:col-span-2 lg:px-7">
              A minority woman-owned, employee-focused firm serving Colorado Springs, Denver, and Pueblo since 2021.
            </p>
          </div>

          <div className="min-h-[14vh] flex-1" />

          {/* Proof strip */}
          <dl className="m-0 grid grid-cols-2 border-t border-paper-ink/15 lg:grid-cols-[220px_repeat(3,minmax(0,1fr))]">
            <div className="col-span-2 flex items-center border-b border-paper-ink/10 py-5 lg:col-span-1 lg:border-b-0 lg:py-7">
              <dt className="sr-only">Contract holder</dt>
              <dd className="m-0">
                <img src="/images/gsa-contract-holder.png" alt="GSA Contract Holder" width={576} height={138} className="block h-auto w-[176px]" />
              </dd>
            </div>
            <div className="border-r border-paper-ink/10 py-5 pr-4 lg:border-r-0 lg:px-7 lg:py-7">
              <dt className="text-[13px] text-paper-ink/70">GSA MAS contract</dt>
              <dd className="m-0 mt-2 font-mono text-[15px] tracking-[0.01em] text-paper-ink tabular-nums lg:text-[18px]">
                <a href={GSA_ELIBRARY_URL} target="_blank" rel="noopener noreferrer" className={`flow-link inline-flex items-center gap-1.5 text-paper-ink hover:text-paper-ink ${FOCUS}`}>
                  47QSMS25D009Q
                  <Arrow diag className="h-3.5 w-3.5" />
                  <span className="sr-only"> (opens GSA eLibrary in a new tab)</span>
                </a>
              </dd>
            </div>
            <div className="py-5 pl-4 lg:px-7 lg:py-7">
              <dt className="text-[13px] text-paper-ink/70">WOSB and WBENC certified</dt>
              <dd className="m-0 mt-2 font-mono text-[15px] leading-[1.5] tracking-[0.01em] text-paper-ink tabular-nums lg:text-[18px]">
                WOSB250470
                <span className="block">WBE2303571</span>
              </dd>
            </div>
            <div className="col-span-2 border-t border-paper-ink/10 py-5 lg:col-span-1 lg:border-t-0 lg:px-7 lg:py-7">
              <dt className="text-[13px] text-paper-ink/70">Founded</dt>
              <dd className="m-0 mt-2 font-mono text-[15px] tracking-[0.01em] text-paper-ink tabular-nums lg:text-[18px]">
                2021 <span className="font-sans text-paper-ink/70">Colorado Springs, CO</span>
              </dd>
            </div>
          </dl>
          <div className="h-[18vh] lg:h-[22vh]" />
        </div>
      </section>

      {/* The document: everything the rail tracks */}
      <div ref={docRef} className="flow-doc relative">
        <FrameLines fill />

        {/* Desktop rail, in the frame's index column */}
        <nav
          aria-label="Page sections"
          className={`pointer-events-none absolute inset-0 z-20 hidden transition-opacity duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] lg:block ${docVisible ? 'opacity-100' : 'opacity-0'}`}
        >
          <div className="container-ares h-full">
            <div className="pointer-events-auto sticky top-32 w-[200px] pl-6">
              <ol className="m-0 flex list-none flex-col gap-3.5 p-0">
                {SECTIONS.map((s) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      aria-current={active === s.id ? 'location' : undefined}
                      className={`flex gap-3 font-mono text-[12px] leading-4 tracking-[0.02em] transition-colors duration-200 ${active === s.id ? 'text-signal hover:text-signal' : 'text-ink-muted hover:text-paper-ink'} ${FOCUS}`}
                    >
                      <span>{s.n}</span>
                      <span>{s.label}</span>
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </nav>

        {/* Mobile rail: current section and progress under the header */}
        <div
          aria-hidden="true"
          className={`fixed inset-x-0 top-[92px] z-40 border-b border-hairline bg-canvas transition-opacity duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] lg:hidden ${docVisible ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
        >
          <div className="container-ares flex h-9 items-center justify-between font-mono text-[12px]">
            <span className="text-paper-ink">
              {SECTIONS[activeIndex].n} {SECTIONS[activeIndex].label}
            </span>
            <span>{activeIndex + 1} of {SECTIONS.length}</span>
          </div>
          <div className="relative h-px">
            <span className="flow-progress-fill absolute inset-0 bg-signal" />
          </div>
        </div>

        {/* 01 Verify: a ledger whose columns are the frame's columns */}
        <section id="verify" className="relative z-[1] -mt-[16vh] scroll-mt-32 lg:-mt-[20vh]">
          <div className="container-ares relative">
            <div className={GRID}>
              <div className={SPAN}>
                <h2 className="font-display max-w-[18ch] font-semibold text-paper-ink" style={DISPLAY_LG}>
                  Everything you need to verify us.
                </h2>
                <p className="mt-5 max-w-[46ch] text-[18px] leading-[1.5]">
                  Contract, registration, and certification numbers in one place. The GSA contract number links to the government’s own listing.
                </p>
              </div>
            </div>

            <div className={`${GRID} mt-14 lg:mt-20`}>
              <table className="w-full table-fixed border-collapse text-left max-lg:block lg:col-start-2 lg:col-span-3">
                <caption className="sr-only">Ares Security contract, registration, and certification record</caption>
                <thead className="max-lg:sr-only">
                  <tr>
                    <th scope="col" className="px-7 pb-3 font-mono text-[12px] font-normal text-ink-muted">Group</th>
                    <th scope="col" className="px-7 pb-3 font-mono text-[12px] font-normal text-ink-muted">Item</th>
                    <th scope="col" className="px-7 pb-3 font-mono text-[12px] font-normal text-ink-muted">Number</th>
                  </tr>
                </thead>
                {LEDGER_GROUPS.map((group) => (
                  <tbody key={group.title} className="border-t border-paper-ink/25 max-lg:block">
                    {group.rows.map((row, i) => (
                      <tr key={row.k} className="flow-ledger-row max-lg:grid max-lg:gap-1 max-lg:py-4">
                        {i === 0 && (
                          <th scope="rowgroup" rowSpan={group.rows.length} className="px-7 py-4 align-top text-[15px] font-medium text-paper-ink max-lg:hidden">
                            {group.title}
                          </th>
                        )}
                        <th scope="row" className="py-4 align-baseline text-[15px] font-normal max-lg:p-0 lg:px-7">
                          {i === 0 && <span className="mb-2 block text-[13px] font-medium text-paper-ink lg:hidden">{group.title}</span>}
                          <span className="text-paper-ink/90">{row.k}</span>
                          {row.note && <span className="mt-1 block text-[13px] leading-[1.45] text-ink-muted">{row.note}</span>}
                        </th>
                        <td className={`py-4 align-baseline text-paper-ink max-lg:p-0 lg:px-7 ${row.mono ? 'font-mono text-[17px] tracking-[0.01em] tabular-nums' : 'text-[16px]'}`}>
                          {row.href && row.internal ? (
                            <Link to={row.href} className={LINK}>
                              {row.v}
                              <Arrow className="h-3.5 w-3.5" />
                            </Link>
                          ) : row.href ? (
                            <a href={row.href} target="_blank" rel="noopener noreferrer" className={LINK}>
                              {row.v}
                              <Arrow diag className="h-3.5 w-3.5" />
                              <span className="sr-only"> (opens GSA eLibrary in a new tab)</span>
                            </a>
                          ) : (
                            row.v
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                ))}
              </table>
            </div>

            {/* The measured figure; it hangs into the quote below */}
            <div className={`${GRID} mt-24 lg:mt-32 lg:items-end`}>
              <p
                className="font-mono font-normal text-paper-ink tabular-nums lg:col-start-2 lg:col-span-2 lg:-mb-20 lg:px-7"
                style={{ fontSize: 'clamp(96px, 15vw, 220px)', lineHeight: 0.85, letterSpacing: '-0.06em' }}
              >
                &lt;1%
              </p>
              <div className="mt-6 lg:mt-0 lg:px-7 lg:pb-2">
                <p className="text-[18px] leading-[1.45] text-paper-ink">Missed shifts since 2021.</p>
                <p className="mt-1 text-[16px] leading-[1.5]">On-call scheduling is standard in every contract.</p>
              </div>
            </div>

            {/* The quote: attribution in the frame's second column */}
            <figure className={`${GRID} m-0 mt-16 gap-6 max-lg:grid lg:mt-0 lg:pt-28`}>
              <figcaption className="text-[14px] leading-5 lg:col-start-2 lg:px-7 lg:pt-3">
                <span className="font-medium text-paper-ink">Contracting Officer</span>
                <span className="block">USAF · Buckley Space Force Base</span>
              </figcaption>
              <blockquote className="m-0 lg:col-span-2 lg:px-7">
                <p className="font-medium text-paper-ink lg:-indent-[0.4em]" style={DISPLAY_MD}>
                  “Ares arrived prepared. Their documentation was cleaner than the incumbent’s from day one.”
                </p>
              </blockquote>
            </figure>
            <div className={`${GRID} mt-20 pb-28 lg:mt-24 lg:pb-36`}>
              <p className="max-w-[26ch] text-[22px] leading-[1.3] font-semibold tracking-[-0.02em] text-paper-ink lg:col-start-3 lg:col-span-2 lg:px-7">
                That record comes down to how each post is staffed.
              </p>
            </div>
          </div>
        </section>

        {/* 02 Staffing: the annotated photo in one column, the steps riding
            the next frame line */}
        <section id="staffing" className="relative scroll-mt-32">
          <div className="container-ares relative">
            <div className={GRID}>
              <h2 className={`max-w-[20ch] font-semibold text-balance text-paper-ink ${SPAN}`} style={DISPLAY_LG}>
                Every officer is trained on your post by a leader who has worked it.
              </h2>
            </div>

            <div className={`${GRID} mt-14 lg:mt-20`}>
              <div className="lg:sticky lg:top-32 lg:col-start-2 lg:self-start lg:px-7">
                <div className="relative aspect-[4/5] overflow-hidden border border-hairline">
                  <img
                    src="/images/backbone-officer.jpg"
                    alt="Smiling Ares Security officer in a black Ares Security polo shirt, standing against a brick wall"
                    width={733}
                    height={900}
                    loading="lazy"
                    className="h-full w-full object-cover object-[center_20%]"
                  />
                  {MARKERS.map((m) => (
                    <span
                      key={m.label}
                      className={`flow-annotation absolute inline-flex items-center gap-2 bg-canvas/80 px-2 py-1 text-paper-ink ${m.className}`}
                    >
                      <span aria-hidden="true" className="h-[7px] w-[7px] border border-signal" />
                      {m.label}
                    </span>
                  ))}
                </div>
              </div>

              {/* Steps on the frame line: it fills as the reader moves through them */}
              <ol className="flow-steps relative m-0 mt-12 list-none p-0 pl-8 lg:col-span-2 lg:mt-0 lg:pl-0">
                <span aria-hidden="true" className="absolute top-3 bottom-3 left-0 w-px bg-hairline lg:hidden" />
                <span aria-hidden="true" className="flow-steps-fill absolute top-3 bottom-3 left-0 w-px bg-signal" />
                {STEPS.map((step, i) => (
                  <li key={step.h} className="flow-step relative py-7 lg:flex lg:min-h-[24vh] lg:flex-col lg:justify-center lg:px-7 lg:py-8">
                    <span aria-hidden="true" className="absolute top-[2.35rem] left-[-32px] h-[7px] w-[7px] -translate-x-1/2 rounded-full border border-signal bg-canvas lg:top-[50%] lg:left-0" />
                    <h3 className="text-[24px] leading-[1.25] font-semibold tracking-[-0.02em] text-paper-ink lg:text-[28px]">
                      <span className="mr-3 font-mono text-[14px] font-normal tracking-normal text-ink-muted tabular-nums lg:text-[15px]">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      {step.h}
                    </h3>
                    <p className="mt-3 max-w-[40ch] text-[17px] leading-[1.55]">{step.p}</p>
                  </li>
                ))}
              </ol>
            </div>

            <div className={`${GRID} mt-10 pb-24 lg:pb-32`}>
              <p className="border-t border-hairline pt-6 text-[15px] leading-[1.5] lg:col-start-3 lg:col-span-2 lg:px-7">
                Veteran supervisors on staff, and our NRA firearms instructor is a veteran.
              </p>
            </div>
          </div>
        </section>

        {/* 03 Coverage: giant ruled city rows, then divisions as frame cells */}
        <section id="coverage" className="relative scroll-mt-32 pt-8 lg:pt-12">
          <div className="container-ares relative">
            <div className={GRID}>
              <div className={SPAN}>
                <h2 className="font-display max-w-[24ch] font-medium text-paper-ink" style={DISPLAY_MD}>
                  We staff posts like this in three metro areas, across six kinds of sites.
                </h2>
              </div>
            </div>

            <div className={`${GRID} mt-14 lg:mt-20`}>
              <ul className="m-0 list-none border-t border-hairline p-0 lg:col-start-2 lg:col-span-3">
                {AREAS.map((a) => (
                  <li key={a.to} className="border-b border-hairline">
                    <Link
                      to={a.to}
                      className={`flow-link group relative flex items-center justify-between gap-4 py-6 lg:justify-center text-paper-ink hover:text-paper-ink lg:py-8 ${FOCUS}`}
                    >
                      <span className="font-display font-semibold" style={CITY}>{a.label}</span>
                      <Arrow className="h-7 w-7 text-ink-muted group-hover:text-paper-ink lg:absolute lg:right-7 lg:h-9 lg:w-9" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className={`${GRID} mt-20 lg:mt-28`}>
              <div className={`flex items-baseline justify-between gap-6 ${SPAN}`}>
                <h3 className="text-[22px] leading-[1.25] font-semibold tracking-[-0.02em] text-paper-ink">Six service divisions</h3>
                <Link to="/services" className={`${LINK} shrink-0 whitespace-nowrap text-[15px] font-medium`}>
                  All services <Arrow className="h-4 w-4" />
                </Link>
              </div>
              <ul className="m-0 mt-6 grid list-none p-0 sm:grid-cols-2 lg:col-start-2 lg:col-span-3 lg:grid-cols-3">
                {DIVISIONS.map((d, i) => (
                  <li
                    key={d}
                    className="flex min-h-[88px] items-end border-t border-hairline py-5 text-[17px] leading-[1.35] font-medium tracking-[-0.01em] text-paper-ink lg:min-h-[150px] lg:px-7 lg:py-7"
                  >
                    <span>
                      <span className="mb-3 block font-mono text-[12px] font-normal text-ink-muted tabular-nums">{String(i + 1).padStart(2, '0')}</span>
                      {d}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Full-bleed photograph closing Coverage, the frame drawn over it;
              the next headline crosses its lower edge */}
          <div aria-hidden="true" className="relative mt-24 h-[46vh] min-h-[300px] overflow-clip lg:mt-32 lg:h-[66vh]">
            <img
              src="/images/about-hero.jpg"
              alt=""
              width={2400}
              height={1600}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover object-[center_55%] [filter:brightness(0.6)_saturate(0.85)] [mask-image:linear-gradient(180deg,transparent_0%,#000_28%,rgba(0,0,0,0.75)_70%,transparent_100%)]"
            />
            <FrameLines tone="bg-white/[0.1]" />
          </div>
        </section>

        {/* 04 Company: one panel per frame column */}
        <section id="careers" className="relative z-10 -mt-[14vh] scroll-mt-32 lg:-mt-[20vh]">
          <div className="container-ares relative">
            <div className={GRID}>
              <h2 className={`font-semibold text-paper-ink ${SPAN}`} style={DISPLAY_LG}>Get to know Ares</h2>
            </div>
            <div className={`${GRID} mt-12 max-lg:grid max-lg:gap-14`}>
              {PANELS.map((p, i) => (
                <Link key={p.to} to={p.to} className={`flow-link group flex flex-col text-paper-ink hover:text-paper-ink lg:px-7 ${i === 0 ? 'lg:col-start-2' : ''} ${FOCUS}`}>
                  <div className="aspect-[4/3] overflow-hidden border border-hairline">
                    <img src={p.src} alt={p.alt} width={p.w} height={p.h} loading="lazy" className="h-full w-full object-cover" />
                  </div>
                  <h3 className="mt-6 text-[24px] leading-[1.2] font-semibold tracking-[-0.02em] text-paper-ink">{p.title}</h3>
                  <p className="mt-2 max-w-[44ch] text-[16px] leading-[1.55] text-ink-muted">{p.body}</p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-[15px] font-medium text-signal group-hover:text-paper-ink">
                    {p.cta} <Arrow className="h-4 w-4" />
                  </span>
                </Link>
              ))}
            </div>
            <div className={`${GRID} mt-20 lg:mt-24`}>
              <p className={`max-w-[30ch] text-[20px] leading-[1.35] font-medium tracking-[-0.015em] text-paper-ink ${SPAN}`}>
                Every quote starts with a conversation about your site.
              </p>
            </div>
          </div>
        </section>

        {/* 05 Contact: bronze light field with one glass panel */}
        <section id="contact" className="relative isolate scroll-mt-32 pt-24 pb-28 lg:pt-32 lg:pb-40">
          <div aria-hidden="true" className="flow-field pointer-events-none absolute inset-x-0 top-0 bottom-0 -z-10" />
          <div className="container-ares relative">
            <div className={`${GRID} pt-8 lg:pt-12`}>
              <div className={SPAN}>
                <h2 className="font-display max-w-[14ch] font-semibold text-balance text-paper-ink" style={DISPLAY_XXL}>
                  Tell us about your site.
                </h2>
                <div className="flow-glass mt-12 grid gap-8 rounded-[20px] p-7 sm:p-10 lg:mt-16 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:p-12">
                  <div>
                    <a
                      href="tel:+17196963966"
                      className={`block font-mono text-[30px] tracking-[-0.01em] text-paper-ink tabular-nums hover:text-paper-ink sm:text-[44px] ${FOCUS}`}
                    >
                      719-696-3966
                    </a>
                    <a href="mailto:contact@aressecurity.co" className={`mt-2 inline-block text-[17px] text-paper-ink/70 hover:text-paper-ink ${FOCUS}`}>
                      contact@aressecurity.co
                    </a>
                  </div>
                  <div className="grid gap-2.5 sm:flex sm:flex-wrap">
                    <Link to="/contact" className={PILL_PRIMARY}>
                      Request a Quote <Arrow className="h-4 w-4" />
                    </Link>
                    <Link to="/capability-statement" className={PILL_SECONDARY}>Capability Statement</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
