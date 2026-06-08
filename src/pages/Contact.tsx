import { FormEvent, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ArrowBtn from '../components/ArrowBtn';
import ImageSlot from '../components/ImageSlot';
import { useScrollInViewObserver } from '../hooks/useScrollInViewObserver';

/* Friendly labels for the inquiry-type dropdown. The form's `subject`
   field stores a short slug ("federal", "commercial", …) but Web3Forms
   uses the `subject` field as the literal email-subject line, so we
   swap the slug for one of these labels right before posting. */
const SUBJECT_LABEL: Record<string, string> = {
  federal: 'Federal Division (Cleared Ops · GSA)',
  commercial: 'Commercial & Retail Security',
  industrial: 'Industrial & Logistics',
  armed: 'Armed Asset Protection / High-Cash',
  capability: 'Capability Statement Request',
  other: 'General Inquiry',
};

export default function Contact() {
  useScrollInViewObserver();
  const [status, setStatus] = useState<{ text: string; ok: boolean } | null>(null);
  const [sending, setSending] = useState(false);

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);

    // Honeypot — real users can't see the field; bots fill it.
    if (fd.get('botcheck')) return;

    const key = import.meta.env.VITE_WEB3FORMS_KEY;
    if (!key) {
      setStatus({ text: '✗ Form not configured. Please email contact@aressecurity.co directly.', ok: false });
      return;
    }

    fd.append('access_key', key);

    // Rewrite `subject` from internal slug → human-readable email subject.
    const slug = String(fd.get('subject') || '');
    fd.set('subject', `Ares Inquiry — ${SUBJECT_LABEL[slug] || 'General Inquiry'}`);

    // So replying from the inbox goes back to the inquirer, not Web3Forms.
    const email = String(fd.get('email') || '');
    if (email) fd.append('replyTo', email);

    // Friendly "from" display name in the notification email.
    const name = String(fd.get('name') || '');
    if (name) fd.append('from_name', `Ares Quote — ${name}`);

    setSending(true);
    setStatus(null);
    try {
      const res = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: fd });
      const data = await res.json();
      if (data.success) {
        setStatus({ text: "Message sent — we'll respond within one business day to the email you provided.", ok: true });
        form.reset();
      } else {
        setStatus({ text: 'Failed to send message, please try again or email us directly at: contact@aressecurity.co', ok: false });
      }
    } catch {
      setStatus({ text: 'Failed to send message, please try again or email us directly at: contact@aressecurity.co', ok: false });
    } finally {
      setSending(false);
    }
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
              {/* The iframe is intentionally rendered 50px larger than its
                  container on every side; the parent's overflow:hidden then
                  clips out the corners where Google's embed controls live —
                  the "View larger map" link top-left, the layer/Satellite
                  toggle bottom-left, and the fullscreen button bottom-right.
                  The visible map slice is still centered on the requested
                  lat/lng. */}
              <iframe
                title="Ares Security service area map"
                src="https://maps.google.com/maps?ll=39.2%2C-104.95&t=&z=8&ie=UTF8&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute border-0"
                style={{
                  top: '-50px',
                  left: '-50px',
                  width: 'calc(100% + 100px)',
                  height: 'calc(100% + 100px)',
                }}
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
            <form onSubmit={submit} data-reveal="up" className="flex flex-col gap-6 rounded-[2rem] border border-line bg-paper px-5 py-10">
              <div className="flex flex-col gap-2.5 border-b border-line pb-5">
                <h3 className="brackets-title">CONTACT US</h3>
                <h2
                  className="text-ink"
                  style={{ fontSize: 'clamp(28px, 3vw, 40px)', fontWeight: 400, letterSpacing: '-0.06em', lineHeight: 0.95, textTransform: 'none' }}
                >
                  How Can We <span className="font-light italic text-mid">Help You?</span>
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

              {/* Honeypot — hidden from sighted users and tab order, but bots
                  filling every input will tick this and the submit handler
                  will silently bail. Web3Forms recommends the `botcheck`
                  name specifically. */}
              <input
                type="checkbox"
                name="botcheck"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="absolute -left-[5000px] h-0 w-0 opacity-0"
              />

              <div className="flex flex-col items-center gap-4 pt-2">
                <p className="max-w-[36ch] text-center text-[12px] text-mid"><b className="font-semibold text-ink">Discretion guaranteed.</b> Inquiries reviewed by leadership only.</p>
                <button
                  type="submit"
                  disabled={sending}
                  className="inline-flex items-center gap-3 rounded-full bg-ink px-9 py-4 text-[13px] font-semibold uppercase tracking-[0.18em] text-paper transition-all hover:-translate-y-0.5 hover:bg-mid disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:bg-ink"
                >
                  {sending ? 'Sending…' : 'Send Inquiry'}
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

      {status && (
        <Toast
          text={status.text}
          ok={status.ok}
          onDismiss={() => setStatus(null)}
        />
      )}
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
    <Tag href={href} data-scroll-active data-in-view="false" className="flex flex-col gap-4 rounded-2xl border border-line bg-paper p-8 transition-all duration-300 hover:-translate-y-0.5 hover:border-ink hover:shadow-[0_24px_60px_-28px_rgba(31,31,31,0.18)] max-[460px]:data-[in-view=true]:-translate-y-0.5 max-[460px]:data-[in-view=true]:border-ink max-[460px]:data-[in-view=true]:shadow-[0_24px_60px_-28px_rgba(31,31,31,0.18)]">
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

/* Toast — fixed-position notification used for form submit feedback.
   Matches the old site's pattern: dark ink card pinned top-right, an
   icon disc on the left (red+! for error, emerald+✓ for success), the
   message body, a dismiss button, and a colored progress bar along
   the bottom that drains over TOAST_MS. Auto-dismiss fires when the
   bar finishes; clicking × dismisses immediately. */
const TOAST_MS = 6000;

function Toast({ text, ok, onDismiss }: { text: string; ok: boolean; onDismiss: () => void }) {
  // Re-arm the timer whenever the message text changes — a back-to-back
  // submit (e.g. error, then a successful retry) should give the user
  // the full read time on the second toast, not finish on the first
  // toast's leftover clock.
  useEffect(() => {
    const t = setTimeout(onDismiss, TOAST_MS);
    return () => clearTimeout(t);
  }, [onDismiss, text]);

  const barClass = ok ? 'bg-emerald-500' : 'bg-orange-500';
  const iconClass = ok ? 'bg-emerald-500' : 'bg-red-500';

  return (
    <div
      role="status"
      aria-live="polite"
      style={{ animation: 'toast-enter 0.32s cubic-bezier(0.16, 1, 0.3, 1) both' }}
      className="fixed right-4 top-4 z-[60] flex w-[360px] max-w-[calc(100vw-32px)] overflow-hidden rounded-xl bg-ink text-paper shadow-[0_24px_60px_-16px_rgba(0,0,0,0.5)] sm:right-6 sm:top-6"
    >
      <div className="flex flex-1 items-start gap-3 px-4 pb-5 pt-4 pr-2">
        <span className={`mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full ${iconClass}`}>
          {ok ? (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-paper">
              <path d="M5 12l4.5 4.5L19 7" />
            </svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-paper">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 5h2v6h-2V7zm0 8h2v2h-2v-2z" />
            </svg>
          )}
        </span>
        <p className="m-0 flex-1 text-[14px] leading-snug text-paper">{text}</p>
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Dismiss"
          className="-mr-1 flex h-6 w-6 flex-shrink-0 cursor-pointer items-center justify-center rounded text-paper/60 hover:text-paper"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      </div>
      {/* Progress bar — drains from full to empty over TOAST_MS. */}
      <span
        aria-hidden
        style={{ animation: `toast-shrink ${TOAST_MS}ms linear forwards` }}
        className={`absolute bottom-0 left-0 h-[3px] w-full ${barClass}`}
      />
    </div>
  );
}
