import { Link } from 'react-router-dom';
import { useScrollInViewObserver } from '../hooks/useScrollInViewObserver';

/* Section 02 "Differentiation & Values" — the eight commitments that
   distinguish Ares from the recurring failures of the industry. First
   four answer client complaints; last four answer what our people
   typically endure elsewhere. Rendered as an 8-cube grid beside the
   narrative. */
const VALUES = [
  { n: '01', w: 'Presence',        g: 'Hands-on from day one' },
  { n: '02', w: 'Consistency',     g: 'Familiar, retained teams' },
  { n: '03', w: 'Professionalism', g: 'Vetted, disciplined officers' },
  { n: '04', w: 'Accountability',  g: 'Owned and resolved fast' },
  { n: '05', w: 'Support',         g: 'Reachable every shift' },
  { n: '06', w: 'Advancement',     g: 'A path upward' },
  { n: '07', w: 'Respect',         g: 'Heard, not handled' },
  { n: '08', w: 'Recognition',     g: 'Good work gets seen' },
] as const;

/* Section 03 "Backbone" — five character traits we hire for, shown as
   a name + description ledger. Listed in narrative order, not ranked. */
const TRAITS = [
  { name: 'Diverse',       desc: 'Backgrounds and perspectives that reflect the communities we protect.' },
  { name: 'Experienced',   desc: 'Seasoned officers who have stood the hard posts before.' },
  { name: 'Composed',      desc: 'Calm and clear when a situation turns.' },
  { name: 'Cleared',       desc: 'Background-checked and licensed before they reach your post.' },
  { name: 'Compassionate', desc: 'Approachable people who treat clients and the public with respect.' },
] as const;

export default function About() {
  useScrollInViewObserver();

  return (
    <main>
      <PageHeading title="About Us" subtitle="Founded in compliance. Built for the long post. A woman-owned, employee-focused firm rooted in public-sector standards and carried into every commercial engagement." crumbs={[{ to: '/', label: 'Home' }, { label: 'About' }]} slotId="about-heading-bg" />

      {/* Credentials Strip — at <=460px switches to a 2x2 grid with explicit
          ordering (Row 1: GSA, Women Owned · Row 2: SBA, WBENC). Above 460px
          stays as the single-row flex layout with separators. */}
      <section aria-label="Certifications and contract vehicles" className="py-20">
        <div className="container-ares">
          <ul role="list" className="m-0 flex list-none flex-wrap items-center justify-center gap-x-[clamp(28px,5vw,64px)] gap-y-[18px] p-0 max-[460px]:flex-nowrap max-[460px]:justify-evenly max-[460px]:gap-x-0 sm:flex-nowrap">
            <li className="flex max-w-[260px] flex-none items-center justify-center max-[460px]:order-1 max-[460px]:min-h-12 max-[460px]:max-w-full">
              <img
                src="/images/cert-gsa-blue.png"
                alt="GSA Schedule Holder"
                data-reveal="left"
                style={{ ['--reveal-delay' as string]: '0ms' } as React.CSSProperties}
                className="block h-12 w-auto max-w-full object-contain max-[460px]:h-auto max-[460px]:max-h-10 sm:h-[62px]"
              />
            </li>
            <li aria-hidden className="hidden h-12 w-px flex-none bg-line sm:block" />
            <li className="flex max-w-[260px] flex-none items-center justify-center max-[460px]:order-2 max-[460px]:min-h-12 max-[460px]:max-w-full">
              <img
                src="/images/cert-wosb.png"
                alt="SBA WOSB Certified"
                data-reveal="left"
                style={{ ['--reveal-delay' as string]: '150ms' } as React.CSSProperties}
                className="block h-11 w-auto max-w-full object-contain max-[460px]:h-auto max-[460px]:max-h-12 sm:h-14"
              />
            </li>
            <li aria-hidden className="hidden h-12 w-px flex-none bg-line sm:block" />
            <li className="flex max-w-[260px] flex-none items-center justify-center max-[460px]:order-3 max-[460px]:min-h-12 max-[460px]:max-w-full">
              <img
                src="/images/cert-women-owned.png"
                alt="Women Owned"
                data-reveal="left"
                style={{ ['--reveal-delay' as string]: '300ms' } as React.CSSProperties}
                className="block h-12 w-auto max-w-full object-contain max-[460px]:h-auto max-[460px]:max-h-10 sm:h-[62px]"
              />
            </li>
            <li aria-hidden className="hidden h-12 w-px flex-none bg-line sm:block" />
            <li className="flex max-w-[260px] flex-none items-center justify-center max-[460px]:order-4 max-[460px]:min-h-12 max-[460px]:max-w-full">
              <img
                src="/images/cert-wbenc.png"
                alt="Certified WBENC Women's Business Enterprise"
                data-reveal="left"
                style={{ ['--reveal-delay' as string]: '450ms' } as React.CSSProperties}
                className="block h-11 w-auto max-w-full object-contain max-[460px]:h-auto max-[460px]:max-h-10 sm:h-14"
              />
            </li>
          </ul>
        </div>
      </section>

      {/* Mission */}
      <section className="relative">
        <div className="container-ares">
          <div className="grid gap-10 lg:grid-cols-3">
            <div>
              <h3 className="brackets-title mb-4" data-reveal="up">SECTION 01 · MISSION</h3>
              <h2
                className="text-ink"
                style={{ fontSize: 'clamp(40px, 6vw, 60px)', fontWeight: 400, letterSpacing: '-0.06em', lineHeight: 0.92, textTransform: 'none' }}
                data-reveal="up"
              >
                Quality Over <span className="font-light italic text-mid">Quantity</span>
              </h2>
            </div>
            <p className="text-[20px] leading-snug text-ink-2">
              Reputation and character can't be bought. Our culture is built from the ground up — by investing time, attention to detail, and the values our people live by. Employees first, always.
            </p>
            <p className="text-[20px] leading-snug text-ink-2">
              We're driven to deliver quality service to our clients and our people — not chase quantity at their expense. That single choice shapes everyone we hire and every post we stand.
            </p>
          </div>

          <Spacer h="64" />

          <div className="grid items-stretch gap-8 lg:grid-cols-[1fr_1.6fr]">
            <div data-reveal="left" className="relative min-h-[380px] overflow-hidden rounded-2xl bg-paper-2">
              <img src="/images/mission-vehicle.jpg" alt="" className="absolute inset-0 h-full w-full object-cover object-bottom" />
            </div>
            <div data-reveal="right" className="relative isolate flex flex-col justify-between gap-12 overflow-hidden rounded-2xl bg-ink p-12 text-paper">
              <div aria-hidden className="absolute inset-0 -z-20 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/images/cap-cta-bg.jpg')" }} />
              <div aria-hidden className="pointer-events-none absolute inset-0 -z-10" style={{ background: 'linear-gradient(180deg, rgba(31,31,31,.55) 0%, rgba(31,31,31,.35) 50%, rgba(31,31,31,.7) 100%), linear-gradient(90deg, rgba(31,31,31,.55) 0%, rgba(31,31,31,.2) 60%, rgba(31,31,31,.4) 100%)' }} />
              {/* inline-grid with explicit columns so the text track sizes to its
                  longest word on mobile (`min-content`). That way when the text
                  wraps, the closing "]" sits at the text track's right edge —
                  vertically centered against both lines via `items-center` —
                  instead of pinning to the far right of the card. On wider
                  viewports the text track uses `max-content`, keeping it on a
                  single line with brackets adjacent. */}
              <h3 className="relative inline-grid items-center gap-2.5 self-start text-[13px] font-medium uppercase tracking-[0.22em] text-paper/65 grid-cols-[auto_max-content_auto] max-[460px]:self-center">
                <span aria-hidden className="opacity-50">[</span>
                <span>CAPABILITY STATEMENT</span>
                <span aria-hidden className="opacity-50">]</span>
              </h3>
              <div className="relative flex flex-col items-stretch gap-6 sm:flex-row sm:items-end sm:justify-between sm:gap-8">
                <div className="min-w-0 flex-1">
                  <h3 className="mb-4 text-[32px] text-paper lg:text-[48px]" style={{ fontWeight: 400, letterSpacing: '-0.06em', lineHeight: 1.02, textTransform: 'none' }}>
                    Procurement-Ready Company Overview
                  </h3>
                  <p className="text-[16px] text-paper/80 lg:text-[18px]">Core competencies, certifications, past performance, contracting data, and company qualifications in a concise reference document.</p>
                </div>
                <Link to="/capability-statement" className="btn btn-glass w-full shrink-0 sm:w-auto">View Statement</Link>
              </div>
            </div>
          </div>
        </div>
        <Spacer />
      </section>

      {/* Differentiation & Values — warm-grey section between Mission (§01)
          and People (§03). Narrative on the left, 8-cube commitments grid
          on the right. */}
      <AboutDifferentiation />

      {/* Personnel */}
      <section>
        <Spacer />
        <div className="container-ares">
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.1fr]">
            <div>
              <h3 className="brackets-title mb-4" data-reveal="up">SECTION 03 · PEOPLE</h3>
              <h2
                className="mb-6 text-ink"
                style={{ fontSize: 'clamp(34px, 4.4vw, 56px)', fontWeight: 400, letterSpacing: '-0.06em', lineHeight: 0.95, textTransform: 'none' }}
                data-reveal="up"
              >
                The <span className="font-light italic text-mid">Backbone</span> of Ares
              </h2>
              <p className="mb-8 max-w-[54ch] text-[18px] text-ink-2">
                We don't hire just anybody. A company is only as good as the people who carry its name onto the post — so we build our teams around character first, then sharpen it with training, standards, and accountability.
              </p>
              <ul className="m-0 flex list-none flex-col p-0">
                {TRAITS.map((t) => (
                  <li
                    key={t.name}
                    className="grid grid-cols-1 gap-1 border-t border-line py-4 first:border-0 first:pt-0 sm:grid-cols-[13ch_1fr] sm:items-center sm:gap-[52px]"
                  >
                    <span className="text-[13px] font-semibold uppercase tracking-[0.18em] text-ink">{t.name}</span>
                    <span className="text-[16px] text-ink-2">{t.desc}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div data-reveal="right" className="relative aspect-[2/3] overflow-hidden rounded-2xl bg-paper-2 lg:aspect-auto lg:min-h-[560px]">
              <img src="/images/officer-portrait.jpg" alt="" className="absolute inset-0 h-full w-full object-cover" style={{ objectPosition: 'center top' }} />
            </div>
          </div>
        </div>
        <Spacer />
      </section>
    </main>
  );
}

/* Section 02 — "Differentiation & Values." Warm-grey background (#E5E4E1)
   so the section feels like a calm interlude between Mission (§01) and
   People (§03). Two-tone title ("Raising the" in --ink, "Bar" in
   --ink-2). Body splits 3fr/2fr on lg+: narrative on the left (two
   "For our clients" / "For our people" value groups) and an 8-cube
   commitments grid on the right. Each cube nudges up + sharpens its
   border on hover so the grid still feels responsive without a heavy
   accent color. */
function AboutDifferentiation() {
  return (
    <section className="bg-[#E5E4E1]" aria-label="Differentiation and values">
      <Spacer />
      <div className="container-ares">
        <h3 className="brackets-title mb-4" data-reveal="up">SECTION 02 · DIFFERENTIATION & VALUES</h3>
        <h2
          className="mb-8 text-ink"
          style={{ fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 400, letterSpacing: '-0.05em', lineHeight: 0.92, textTransform: 'none' }}
          data-reveal="up"
        >
          Raising the <span className="font-light italic text-mid">Bar</span>
        </h2>
        <p className="mb-14 max-w-[72ch] text-[21px] leading-snug text-ink-2">
          The security industry runs on the same recurring failures — clients dropped after the contract is signed, officers underpaid and underprepared. We built Ares to refuse those compromises. These eight commitments are what that refusal looks like, day to day.
        </p>

        <div className="grid items-stretch gap-[clamp(40px,5vw,72px)] lg:grid-cols-[3fr_2fr]">
          {/* Narrative column — justify-between so the second group pins to
              the bottom of the row, matching the cube grid's bottom edge.
              The gap-10 acts as the minimum spacing when content is tall
              enough that justify-between has no slack to distribute. */}
          <div className="flex flex-col justify-between gap-10">
            <ValGroup
              index="For our clients"
              title={<>Present Where It <span className="font-light italic text-mid">Counts</span></>}
            >
              <p>
                Most contracts go quiet the moment they're signed. We built Ares to do the opposite. Ownership and supervisors are hands-on where it matters most — standing up new posts, training officers on site, and staying reachable long after the start date. The teams we assign are retained and familiar, so the people protecting your site actually know it, and when something goes wrong, we own it and resolve it fast.
              </p>
            </ValGroup>
            <ValGroup
              index="For our people"
              title={<>A Standard Worth <span className="font-light italic text-mid">Standing</span> For</>}
            >
              <p>
                In this industry, officers get treated as interchangeable — hired fast, dropped at a post, replaced when they burn out. We built Ares so the person in the uniform is the point, not the overhead.
              </p>
              <p>
                We pay what the responsibility of the post actually demands — on time, in full, with overtime honored instead of negotiated away. No one goes in cold: officers are trained on the specific site before their first shift, not handed a badge and an address. Schedules are posted far enough ahead to plan a life around, and built to be sustainable — no endless doubles, no last-minute holds. And there's a real chain of command on every shift, at every site, which means when something happens, you call and someone answers. Out here, no one stands a post alone.
              </p>
            </ValGroup>
          </div>

          {/* 8-cube commitments grid */}
          <div className="flex flex-col">
            <p className="mb-4 text-[12px] font-semibold uppercase tracking-[0.22em] text-mid">
              Our values, in practice
            </p>
            <div className="grid flex-1 gap-3 sm:grid-cols-2 lg:[grid-template-rows:repeat(4,minmax(0,1fr))]">
              {VALUES.map((v) => (
                <div
                  key={v.n}
                  className="flex min-h-[120px] flex-col gap-1.5 rounded-xl border border-line/60 bg-paper px-[22px] py-[18px] shadow-[0_12px_28px_-18px_rgba(31,31,31,0.20)] transition duration-200 hover:-translate-y-0.5 hover:border-ink hover:shadow-[0_18px_40px_-22px_rgba(31,31,31,0.28)] lg:min-h-0"
                >
                  <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-light">{v.n}</span>
                  <span className="mt-auto text-[16px] font-semibold text-ink">{v.w}</span>
                  <span className="text-[13px] text-mid">{v.g}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Spacer />
    </section>
  );
}

function ValGroup({ index, title, children }: { index: string; title: React.ReactNode; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-3.5 flex items-center gap-3 text-[13px] font-semibold uppercase tracking-[0.22em] text-mid before:h-[1.5px] before:w-7 before:bg-ink before:content-['']">
        {index}
      </p>
      <h3
        className="m-0 mb-3.5 font-normal normal-case text-ink"
        style={{ fontSize: 'clamp(24px, 2.4vw, 30px)', letterSpacing: '-0.03em', lineHeight: 1.05 }}
      >
        {title}
      </h3>
      {/* Wrapper is a div (not a p) so callers can pass multiple <p>
          children for multi-paragraph copy. space-y-4 gives those
          paragraphs consistent vertical rhythm. */}
      <div className="space-y-4 text-[17px] leading-relaxed text-ink-2">{children}</div>
    </div>
  );
}

function Differentiator({ label, title, body, tags, dark }: { label: string; title: string; body: string; tags: string[]; dark?: boolean }) {
  return (
    <article className={`relative flex flex-col gap-4 rounded-2xl border p-10 ${dark ? 'border-ink bg-ink text-paper' : 'border-line bg-paper text-ink-2'}`}>
      <div className={`absolute right-8 top-8 text-[12px] font-semibold uppercase tracking-[0.18em] ${dark ? 'text-paper/60' : 'text-mid'}`}>{label}</div>
      <div className={`flex h-16 w-16 items-center justify-center rounded-full ${dark ? 'bg-paper text-ink' : 'bg-ink text-paper'}`}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="4" width="18" height="14" rx="2" /><path d="M3 10h18M8 14h4" /></svg>
      </div>
      <h3 className={`text-[24px] font-semibold ${dark ? 'text-paper' : 'text-ink'}`}>{title}</h3>
      <p className={dark ? 'text-paper/75' : 'text-ink-2'}>{body}</p>
      <div className={`mt-auto flex flex-wrap gap-1.5 border-t pt-4 ${dark ? 'border-white/15' : 'border-line'}`}>
        {tags.map((t) => (
          <span key={t} className={dark ? 'pill-glass pill-glass-dark' : 'pill-glass'}>{t}</span>
        ))}
      </div>
    </article>
  );
}

function PageHeading({ title, subtitle, crumbs, slotId }: { title: string; subtitle?: string; crumbs: { to?: string; label: string }[]; slotId: string }) {
  return (
    <section className="relative isolate overflow-hidden bg-ink pt-[280px] pb-[140px] text-paper">
      <div className="hero-gradient absolute inset-0 -z-10">
        <img src="/images/about-hero.jpg" alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(31,31,31,0.85)_0%,rgba(31,31,31,0.6)_40%,rgba(31,31,31,0.25)_100%),linear-gradient(180deg,rgba(31,31,31,0.4)_0%,rgba(31,31,31,0.15)_50%,rgba(31,31,31,0.55)_100%)]" />
      </div>
      <div className="container-ares">
        <ol className="reveal m-0 mb-6 flex list-none gap-2 p-0 text-[13px] uppercase tracking-[0.14em] text-paper/65">
          {crumbs.map((c, i) => (
            <li key={i} className="flex items-center gap-2">
              {c.to ? <Link to={c.to} className="text-paper/65 hover:text-paper">{c.label}</Link> : <span className="text-paper">{c.label}</span>}
              {i < crumbs.length - 1 && <span className="text-paper/40">/</span>}
            </li>
          ))}
        </ol>
        <h1 className="reveal-d1 m-0 font-normal text-paper" style={{ fontSize: 'clamp(48px, 7vw, 84px)', lineHeight: 0.92, letterSpacing: '-0.06em' }}>{title}</h1>
        {subtitle && <p className="reveal-d2 mt-6 max-w-[60ch] text-[20px] text-paper/75">{subtitle}</p>}
      </div>
    </section>
  );
}

function Spacer({ h = '100' }: { h?: '100' | '64' | '50' }) {
  const map = { '100': 'h-25', '64': 'h-16', '50': 'h-[50px]' } as const;
  return <div className={map[h]} />;
}
