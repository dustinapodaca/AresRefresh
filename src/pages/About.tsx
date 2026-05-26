import { Link } from 'react-router-dom';
import { useScrollInViewObserver } from '../hooks/useScrollInViewObserver';

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
              <h2 className="text-display-md text-ink crafting_h" data-reveal="up">
                CRAFTING<br />
                <span className="font-light italic text-mid">reliable security</span><br />
                INTO PRECISION
              </h2>
            </div>
            <p className="text-[20px] leading-snug text-ink-2">
              Ares Security was founded in the high-stakes sector of high-cash dispensary and cannabis logistics. Our roots taught us how to operate within rigorous regulatory frameworks where transparency is non-negotiable —
            </p>
            <p className="text-[20px] leading-snug text-ink-2">
              — a discipline we now carry into every federal corridor and commercial dock we stand on. Woman-owned. Employee-focused. Built to the standard of public-sector environments.
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

      {/* Why Different */}
      <section className="bg-paper-2">
        <Spacer />
        <div className="container-ares">
          <h3 className="brackets-title mb-4" data-reveal="up">SECTION 02 · DIFFERENTIATION</h3>
          <h2 className="text-display-lg mb-12 text-ink" data-reveal="up">
            THREE REASONS THE <span className="font-light italic text-mid">RECORD</span> HOLDS
          </h2>

          <div className="grid gap-6 lg:grid-cols-3">
            <InvertCard label="01 · TECHNICAL" title="Superior Technical Performance" body="Industry's most comprehensive technical submittals and run-throughs — briefings, post orders, and documentation built to the standard auditors look for." tags={['Submittals', 'Run-Throughs', 'Post Orders']} icon={
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="14" rx="2" /><path d="M3 10h18M8 14h4" /></svg>
            } />
            <InvertCard label="02 · FEDERAL" title="Proven Federal Trust" body="Managing high-stakes environments requiring specialized clearances, including Buckley Space Force Base — the trust extended by federal clients is the clearest measure we have." tags={['TS-Cleared', 'Buckley SFB', 'GSA Holder']} icon={
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L4 6v6c0 5 3.5 9.5 8 10 4.5-.5 8-5 8-10V6l-8-4z" /><path d="M9 12l2 2 4-4" /></svg>
            } />
            <InvertCard label="03 · LEGACY" title="A Legacy of Compliance" body="Specializing in high-risk, high-detail operations across GSA mandates and local retail — from federal corridors to dispensary floors, one standard of documentation applies." tags={['GSA', 'Cannabis', 'Retail']} icon={
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M9 12l2 2 4-4" /></svg>
            } />
          </div>
        </div>
        <Spacer />
      </section>

      {/* Personnel */}
      <section>
        <Spacer />
        <div className="container-ares">
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.1fr]">
            <div>
              <h3 className="brackets-title mb-4" data-reveal="up">SECTION 03 · PEOPLE</h3>
              <h2 className="mb-6 text-display-lg text-ink" data-reveal="up">
                THE BACKBONE <span className="font-light italic text-mid">of Ares</span>
              </h2>
              <p className="mb-6 max-w-[54ch] text-[18px] text-ink-2">
                From unarmed professionals to armed personnel in restricted federal areas, our guards are as approachable as they are disciplined — trained to read a room as carefully as a post order, and to carry themselves accordingly.
              </p>
              <ul className="m-0 flex list-none flex-col p-0">
                {[
                  { big: '100%', lbl: 'Background-Checked & Licensed', sub: 'licenses & certifications current at time of post' },
                  { big: '24/7', lbl: 'Shift Coverage · Federal & Commercial', sub: 'multi-jurisdiction rotation with supervisor on call' },
                  { big: 'VET', lbl: 'Veteran Leadership & Training', sub: 'briefing cadence drawn from military discipline' },
                ].map((r) => (
                  <li key={r.lbl} className="grid grid-cols-[96px_1fr] items-center gap-8 border-t border-line py-3.5 first:border-0 first:pt-0">
                    <span className="text-[40px] font-bold leading-[0.9] text-ink tracking-tight">{r.big}</span>
                    <span className="text-[13px] font-semibold uppercase tracking-[0.12em] text-ink">
                      {r.lbl}
                      <small className="mt-1 block text-[13px] font-normal normal-case tracking-[0.02em] text-mid">{r.sub}</small>
                    </span>
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

function InvertCard({ label, title, body, tags, icon }: { label: string; title: string; body: string; tags: string[]; icon: React.ReactNode }) {
  return (
    <article data-scroll-active data-in-view="false" className="group relative flex flex-col gap-4 rounded-2xl border border-line bg-paper p-10 text-ink-2 transition-[border-color,transform,box-shadow] duration-300 hover:-translate-y-[3px] hover:border-ink hover:shadow-[0_24px_60px_-28px_rgba(31,31,31,0.18)] max-[460px]:data-[in-view=true]:-translate-y-[3px] max-[460px]:data-[in-view=true]:border-ink max-[460px]:data-[in-view=true]:shadow-[0_24px_60px_-28px_rgba(31,31,31,0.18)]">
      <div className="absolute right-8 top-8 text-[12px] font-semibold uppercase tracking-[0.18em] text-mid">{label}</div>
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-ink text-paper">
        {icon}
      </div>
      <h3 className="text-[24px] font-semibold text-ink">{title}</h3>
      <p className="text-ink-2">{body}</p>
      <div className="mt-auto flex flex-wrap gap-1.5 border-t border-line pt-4">
        {tags.map((t) => (
          <span key={t} className="pill-glass">{t}</span>
        ))}
      </div>
    </article>
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
