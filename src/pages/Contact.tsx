import { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import ArrowBtn from '../components/ArrowBtn';
import ImageSlot from '../components/ImageSlot';

export default function Contact() {
  const [status, setStatus] = useState<string | null>(null);

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("✓ Inquiry received. We'll respond within one business day to the email you provided.");
    (e.currentTarget as HTMLFormElement).reset();
  }

  return (
    <main className="overflow-x-hidden">
      {/* Page heading */}
      <section className="relative isolate overflow-hidden bg-ink pt-[280px] pb-[140px] text-paper">
        <div className="hero-gradient absolute inset-0 -z-10">
          <img src="/images/contact-hero.jpg" alt="" className="absolute inset-0 h-full w-full object-cover" />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(31,31,31,0.85)_0%,rgba(31,31,31,0.55)_45%,rgba(31,31,31,0.3)_100%),linear-gradient(180deg,rgba(31,31,31,0.4)_0%,rgba(31,31,31,0.15)_50%,rgba(31,31,31,0.55)_100%)]" />
        </div>
        <div className="container-ares">
          <ol className="reveal m-0 mb-6 flex list-none gap-2 p-0 text-[13px] uppercase tracking-[0.14em] text-paper/65">
            <li><Link to="/">Home</Link></li>
            <li className="text-paper/40">/</li>
            <li className="text-paper">Request a Quote</li>
          </ol>
          <h1 className="reveal-d1 m-0 font-normal text-paper" style={{ fontSize: 'clamp(48px, 7vw, 84px)', lineHeight: 0.92, letterSpacing: '-0.06em' }}>
            Request a Quote
          </h1>
          <p className="reveal-d2 mt-6 max-w-[60ch] text-[20px] text-paper/75">
            Send a site, a shift pattern, and a deadline. We'll respond within one business day with a scoped proposal — federal, commercial, or specialized.
          </p>
        </div>
      </section>

      {/* Map + form */}
      <section>
        <Spacer />
        <div className="container-ares">
          <div className="grid grid-cols-1 items-stretch gap-12 lg:grid-cols-2">
            {/* Map card */}
            <div className="relative min-h-[560px] overflow-hidden rounded-[2rem] border border-line bg-paper-2 shadow-[0_24px_60px_-28px_rgba(31,31,31,0.18)]">
              <iframe
                title="Ares Security service area map"
                src="https://maps.google.com/maps?q=38.9%2C-104.8&t=&z=8&ie=UTF8&iwloc=near&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 h-full w-full border-0"
                style={{ filter: 'grayscale(0.55) contrast(0.95)' }}
              />
              <div className="absolute left-6 top-6 flex max-w-[240px] flex-col gap-1.5 rounded-xl border border-line bg-paper p-4 shadow-[0_12px_30px_-16px_rgba(31,31,31,0.18)]">
                <h4 className="m-0 text-[14px] font-bold tracking-tight text-ink">Ares Security LLC</h4>
                <div className="flex items-center gap-1 text-[12px] font-medium text-mid">
                  <span>★ ★ ★ ★</span>
                  <b className="text-ink">4.0</b>
                  <span>(4)</span>
                </div>
              </div>

              <div className="absolute inset-x-6 bottom-6 grid grid-cols-1 gap-6 rounded-xl bg-ink p-6 text-paper shadow-[0_24px_60px_-16px_rgba(31,31,31,0.4)] sm:grid-cols-2">
                <div>
                  <h5 className="mb-2.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-paper/55">Service Areas</h5>
                  <ul className="m-0 flex list-none flex-col gap-1.5 p-0 text-[15px] text-paper">
                    <li>— Colorado Springs</li>
                    <li>— Denver</li>
                    <li>— Pueblo</li>
                  </ul>
                </div>
                <div className="flex flex-col gap-4">
                  <div>
                    <h5 className="mb-2.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-paper/55">Email</h5>
                    <a href="mailto:contact@aressecurity.co" className="text-[15px] font-medium text-paper hover:text-pale">contact@aressecurity.co</a>
                  </div>
                  <div>
                    <h5 className="mb-2.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-paper/55">Phone</h5>
                    <a href="tel:+17196963966" className="text-[15px] font-medium text-paper hover:text-pale">719-696-3966</a>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={submit} className="flex flex-col gap-6 rounded-[2rem] border border-line bg-paper p-10">
              <div className="flex flex-col gap-2.5 border-b border-line pb-5">
                <h3 className="brackets-title">CONTACT US</h3>
                <h2 className="text-[clamp(28px,3vw,40px)] font-bold tracking-tight text-ink">
                  How can we <span className="font-light italic text-mid">help you?</span>
                </h2>
                <p className="text-[15px] text-ink-2">Fill out the form and we'll get back to you within one business day. For urgent procurement timelines, call us directly.</p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field id="qf-name" label="Name"><input id="qf-name" name="name" type="text" required placeholder="Jane Smith" className="field-input" /></Field>
                <Field id="qf-email" label="Email"><input id="qf-email" name="email" type="email" required placeholder="jane@company.com" className="field-input" /></Field>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field id="qf-org" label="Organization"><input id="qf-org" name="organization" type="text" placeholder="Agency, company, or LLC" className="field-input" /></Field>
                <Field id="qf-phone" label="Phone (optional)"><input id="qf-phone" name="phone" type="tel" placeholder="(555) 555-5555" className="field-input" /></Field>
              </div>

              <Field id="qf-subject" label="Subject">
                <select id="qf-subject" name="subject" required defaultValue="" className="field-input appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%27http://www.w3.org/2000/svg%27 width=%2712%27 height=%278%27 viewBox=%270 0 12 8%27><path d=%27M1 1l5 5 5-5%27 stroke=%27%231F1F1F%27 stroke-width=%271.5%27 fill=%27none%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27/></svg>')] bg-[length:12px_8px] bg-[right_1rem_center] bg-no-repeat pr-10">
                  <option value="" disabled>Choose one</option>
                  <option value="federal">Federal Division (Cleared Ops · GSA)</option>
                  <option value="commercial">Commercial & Retail Security</option>
                  <option value="industrial">Industrial & Logistics</option>
                  <option value="armed">Armed Asset Protection / High-Cash</option>
                  <option value="capability">Request Capability Statement (PDF)</option>
                  <option value="other">Other inquiry</option>
                </select>
              </Field>

              <Field id="qf-message" label="Message">
                <textarea id="qf-message" name="message" required placeholder="Site, shift pattern, deadline, and any compliance considerations." className="field-input min-h-[140px] resize-y" />
              </Field>

              {status && (
                <div className="rounded-xl border border-line bg-mid/10 px-4 py-3.5 text-[14px] font-medium text-ink" role="status" aria-live="polite">
                  {status}
                </div>
              )}

              <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                <p className="max-w-[36ch] text-[12px] text-mid"><b className="font-semibold text-ink">Discretion guaranteed.</b> Inquiries reviewed by leadership only.</p>
                <button type="submit" className="inline-flex items-center gap-3 rounded-full bg-ink px-9 py-4 text-[13px] font-semibold uppercase tracking-[0.18em] text-paper transition-all hover:-translate-y-0.5 hover:bg-mid">
                  Send Inquiry
                  <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="none"><path d="M15.3846 0H0.615385C0.275692 0 0 0.275692 0 0.615385C0 0.955077 0.275692 1.23077 0.615385 1.23077H13.8988L0.180308 14.9495C-0.06 15.1898 -0.06 15.5794 0.180308 15.8197C0.300615 15.94 0.457846 16 0.615385 16C0.772923 16 0.930461 15.94 1.05046 15.8197L14.7692 2.10092V15.3846C14.7692 15.7243 15.0449 16 15.3846 16C15.7243 16 16 15.7243 16 15.3846V0.615385C16 0.275692 15.7243 0 15.3846 0Z" fill="currentColor" /></svg>
                </button>
              </div>
            </form>
          </div>

          {/* Quick contact tiles */}
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <QCard href="mailto:contact@aressecurity.co" h="EMAIL" big="contact@aressecurity.co" p="Inbox monitored business hours · response within 1 business day." icon={
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></svg>
            } />
            <QCard href="tel:+17196963966" h="PHONE" big="719-696-3966" p="For urgent procurement timelines or active contracts." icon={
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.36 1.9.7 2.8a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.9.34 1.84.57 2.8.7A2 2 0 0122 16.92z"/></svg>
            } />
            <QCard h="HEADQUARTERS" big="Colorado Springs, Colorado" p="Service across Colorado Springs, Denver, and Pueblo metro areas." icon={
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
            } />
          </div>
        </div>
        <Spacer />
      </section>

    </main>
  );
}

function Field({ id, label, children }: { id: string; label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-[11px] font-semibold uppercase tracking-[0.18em] text-mid">{label}</label>
      {children}
    </div>
  );
}

function QCard({ href, h, big, p, icon }: { href?: string; h: string; big: string; p: string; icon: React.ReactNode }) {
  const Tag: any = href ? 'a' : 'div';
  return (
    <Tag href={href} className="flex flex-col gap-4 rounded-2xl border border-line bg-paper p-8 transition-all duration-300 hover:-translate-y-0.5 hover:border-ink hover:shadow-[0_24px_60px_-28px_rgba(31,31,31,0.18)]">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-ink text-paper">
        {icon}
      </div>
      <h3 className="m-0 text-[13px] font-semibold uppercase tracking-[0.18em] text-mid">{h}</h3>
      <span className="m-0 text-[22px] font-semibold tracking-tight text-ink">{big}</span>
      <p className="m-0 text-[14px] leading-relaxed text-ink-2">{p}</p>
    </Tag>
  );
}

function Spacer() { return <div className="h-25" />; }
