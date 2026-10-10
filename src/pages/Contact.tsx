import { FormEvent, useEffect, useRef, useState } from 'react';
import Arrow from '../components/Arrow';
import CoverageMap from '../components/home/CoverageMap';
import QuoteToast, { type ToastData } from '../components/QuoteToast';
import Seo from '../seo/Seo';
import { responsive } from '../lib/responsive';
import { formatPhone, subjectFor, toWeb3Forms, type Quote } from '../lib/quote';

// Request a quote: "The Intake" (docs/contact-concepts.md). Design authority: DESIGN.md.
// Content: docs/contact-content.md. A short form page, so no section rail.

// What needs covering: the six services (one page each under /services/<slug>) and
// "not sure". The email carries the label, not the slug (src/lib/quote.ts). Role and industry pages link here with
// ?service=<slug> or ?industry=<slug>, and the matching answer is picked for the reader.
const NEEDS: { slug: string; label: string }[] = [
  { slug: 'armed-security-officers', label: 'Armed security officers' },
  { slug: 'unarmed-security-officers', label: 'Unarmed security officers' },
  { slug: 'access-control', label: 'Access control' },
  { slug: 'mobile-patrol', label: 'Mobile patrol' },
  { slug: 'relief-surge-coverage', label: 'Relief and surge coverage' },
  { slug: 'restricted-area-escort', label: 'Restricted-area escort' },
  { slug: 'teaming', label: 'Teaming or subcontract coverage' }, // for primes and guard companies (/teaming)
  { slug: 'other', label: 'Not sure, or something else' },
];

// The post, in a few taps (CenCore's quote form, without the clearance question).
const CHIPS: { name: string; legend: string; options: string[] }[] = [
  { name: 'location', legend: 'Where is the site?', options: ['Colorado Springs', 'Denver metro', 'Pueblo', 'Elsewhere in Colorado'] },
  { name: 'officers', legend: 'Officers on post at once', options: ['1 to 2', '3 to 5', '6 to 15', '16 or more', 'Not sure'] },
  { name: 'schedule', legend: 'Schedule', options: ['Business hours', 'Nights and weekends', '24/7', 'One-time or event', 'Not sure'] },
  { name: 'start', legend: 'When do you need coverage?', options: ['Within 30 days', '1 to 3 months', '3 to 6 months', 'Just planning'] },
];

// The six industries, one name each, with the same slugs as their pages (an industry page
// links here with ?industry=<slug>; owner, 2026-10-10), plus events and anything else.
const SITE_TYPES: { slug: string; label: string }[] = [
  { slug: 'government-military', label: 'Government & Military' },
  { slug: 'critical-infrastructure', label: 'Critical & High-Liability Sites' },
  { slug: 'construction-industrial', label: 'Construction, Industrial & Logistics' },
  { slug: 'airport-transportation', label: 'Airport & Transportation' },
  { slug: 'commercial-property', label: 'Commercial & Retail' },
  { slug: 'institutional-community', label: 'Institutional & Community' },
  { slug: 'event-venue', label: 'Event or venue' },
  { slug: 'other', label: 'Something else' },
];

const HEARD = ['Google search', 'AI assistant (ChatGPT, Gemini, and others)', 'GSA eLibrary or SAM.gov', 'Agency or prime referral', 'Referral from a client or colleague', 'LinkedIn', 'Other'];
const LABEL = Object.fromEntries(NEEDS.map((n) => [n.slug, n.label]));

// What happens after a request, from facts already on the site.
const NEXT = [
  { name: 'Leadership reads it', line: 'Every request is reviewed by leadership only.' },
  { name: 'We walk your site', line: 'Before anything is signed, so the plan fits how your site runs.' },
  { name: 'You get a scoped proposal', line: 'Staffing, post orders, and pricing for your site.' },
];

export default function Contact() {
  // `done` marks a result (it carries the light); while sending, the line only announces.
  const [status, setStatus] = useState<{ text: string; ok: boolean; done: boolean } | null>(null);
  const [sending, setSending] = useState(false);
  // The result shows as a centered toast (QuoteToast); the inline line only says "Sending…".
  const [toast, setToast] = useState<ToastData | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  // Pick the service or site type the reader came from (after hydration, so the prerendered
  // HTML and the first client render match).
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const form = formRef.current;
    if (!form) return;
    const service = q.get('service');
    if (service) {
      const radio = form.querySelector<HTMLInputElement>(`input[name="subject"][value="${CSS.escape(service)}"]`);
      if (radio) radio.checked = true;
    }
    const industry = q.get('industry');
    if (industry) {
      const select = form.querySelector<HTMLSelectElement>('select[name="site_type"]');
      if (select && SITE_TYPES.some((t) => t.slug === industry)) select.value = industry;
    }
  }, []);

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);

    // Honeypot: real users can't see the field; bots fill it.
    if (fd.get('botcheck')) return;

    const key = import.meta.env.VITE_WEB3FORMS_KEY;
    if (!key) {
      setStatus({ text: 'The form is not set up yet. Please email contact@aressecurity.co.', ok: false, done: true });
      return;
    }

    // Read the answers once, as the email shows them (src/lib/quote.ts): labels, not slugs;
    // trimmed; the phone formatted.
    const text = (k: string) => String(fd.get(k) || '').trim();
    const site = text('site_type');
    const quote: Quote = {
      name: text('name'),
      organization: text('organization'),
      email: text('email'),
      phone: formatPhone(text('phone')),
      service: LABEL[text('subject')] || 'General inquiry',
      location: text('location'),
      officers: text('officers'),
      schedule: text('schedule'),
      start: text('start'),
      siteType: site ? SITE_TYPES.find((t) => t.slug === site)?.label || site : '',
      message: text('message'),
      heardAbout: text('heard_about'),
    };

    setToast(null);
    setSending(true);
    setStatus({ text: 'Sending your request…', ok: true, done: false });
    try {
      const res = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: toWeb3Forms(quote, key) });
      const data = await res.json();
      if (data.success) {
        setStatus(null);
        setToast({ kind: 'sent', email: quote.email, subject: subjectFor(quote) });
        form.reset();
      } else {
        setStatus(null);
        setToast({ kind: 'failed' });
      }
    } catch {
      setStatus(null);
      setToast({ kind: 'failed' });
    } finally {
      setSending(false);
    }
  }

  return (
    <main id="main" tabIndex={-1} className="ds ds-page ds-qt">
      <Seo path="/contact" />

      <section className="ds-qt-open" aria-labelledby="qt-title">
        {/* Denver towers at blue hour (generated with Nano Banana; swapped with the Services
            opening, owner 2026-10-08). Generated, so it carries no place caption. */}
        <figure className="ds-qt-hero">
          <img
            {...responsive('/images/services-hero/nb-s1-towers.webp')}
            alt=""
            decoding="sync"
            {...{ fetchpriority: 'high' }}
          />
        </figure>
        <div className="ds-container ds-qt-open-copy">
          <h1 id="qt-title" className="ds-display-xl">
            Request a quote.
          </h1>
          <p className="ds-lead">
            Send a site, a shift pattern, and a deadline. We will come back with a scoped
            proposal for federal, commercial, or specialized work.
          </p>
        </div>
      </section>

      <div className="ds-container ds-qt-body">
        <form ref={formRef} className="ds-qt-form" onSubmit={submit} aria-labelledby="qt-title" aria-busy={sending}>
          <fieldset className="ds-qt-part">
            <legend>What needs covering?</legend>
            <div className="ds-qt-needs">
              {NEEDS.map((n) => (
                <label key={n.slug} className="ds-qt-need">
                  <input type="radio" name="subject" value={n.slug} required aria-describedby="qf-need-err" />
                  <span className="ds-qt-dot" aria-hidden="true" />
                  <span>{n.label}</span>
                </label>
              ))}
            </div>
            <p id="qf-need-err" className="ds-qt-err">
              Choose what needs covering.
            </p>
          </fieldset>

          <fieldset className="ds-qt-part">
            <legend>About the post</legend>
            <div className="ds-qt-chipsets">
              {CHIPS.map((g) => (
                <fieldset key={g.name} className="ds-qt-chipset">
                  <legend>{g.legend} <span>Optional</span></legend>
                  <div className="ds-qt-chips">
                    {g.options.map((o) => (
                      <label key={o} className="ds-qt-chip">
                        <input type="radio" name={g.name} value={o} />
                        <span>{o}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>
              ))}
            </div>
            <div className="ds-qt-fields ds-qt-fields-after">
              <Field id="qf-site" label="Type of site" optional>
                <select id="qf-site" name="site_type" className="ds-qt-input ds-qt-select" defaultValue="">
                  <option value="">Choose one</option>
                  {SITE_TYPES.map((t) => <option key={t.slug} value={t.slug}>{t.label}</option>)}
                </select>
              </Field>
              <Field id="qf-heard" label="How did you hear about us?" optional>
                <select id="qf-heard" name="heard_about" className="ds-qt-input ds-qt-select" defaultValue="">
                  <option value="">Choose one</option>
                  {HEARD.map((h) => <option key={h} value={h}>{h}</option>)}
                </select>
              </Field>
            </div>
          </fieldset>

          <fieldset className="ds-qt-part ds-qt-part-grow">
            <legend>About the site</legend>
            <Field id="qf-message" label="Message">
              <textarea
                id="qf-message"
                name="message"
                required
                rows={6}
                placeholder="The address or area, the hours, what officers should watch for, and any requirements the post must meet."
                className="ds-qt-input"
              />
            </Field>
          </fieldset>

          <fieldset className="ds-qt-part">
            <legend>How to reach you</legend>
            <div className="ds-qt-fields">
              <Field id="qf-name" label="Name">
                <input id="qf-name" name="name" type="text" required autoComplete="name" placeholder="Jane Smith" className="ds-qt-input" />
              </Field>
              <Field id="qf-email" label="Email">
                <input id="qf-email" name="email" type="email" required autoComplete="email" placeholder="jane@company.com" className="ds-qt-input" />
              </Field>
              <Field id="qf-org" label="Organization" optional>
                <input id="qf-org" name="organization" type="text" autoComplete="organization" placeholder="Agency, company, or LLC" className="ds-qt-input" />
              </Field>
              <Field id="qf-phone" label="Phone" optional>
                <input id="qf-phone" name="phone" type="tel" autoComplete="tel" placeholder="(555) 555-5555" className="ds-qt-input" />
              </Field>
            </div>
          </fieldset>

          {/* Honeypot: hidden from sighted users and the tab order; bots that fill every
              input tick it and the submit handler bails. Web3Forms recommends the name. */}
          <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" aria-hidden="true" className="ds-qt-trap" />

          <div className="ds-qt-send">
            <button type="submit" className="ds-btn ds-btn-primary" disabled={sending}>
              {sending ? 'Sending…' : 'Send request'}
              {!sending && <Arrow />}
            </button>
            <p className="ds-small">
              <strong>Discretion guaranteed.</strong> Requests are read by leadership only.
            </p>
            <p className="ds-qt-status" role="status" aria-live="polite" data-ok={status?.done ? String(status.ok) : undefined}>
              {status?.text}
            </p>
          </div>
        </form>

        <aside className="ds-qt-side" aria-label="Other ways to reach us">
          <div className="ds-qt-talk">
            <h2 className="ds-qt-sub">Rather talk?</h2>
            <p className="ds-small">For urgent procurement timelines or active contracts, call us directly.</p>
            <a href="tel:+17196963966" className="ds-qt-phone">
              719-696-3966
            </a>
            <a href="mailto:contact@aressecurity.co" className="ds-link ds-data">
              contact@aressecurity.co
            </a>
          </div>

          <div className="ds-qt-next">
            <h2 className="ds-qt-sub">What happens next</h2>
            <ol>
              {NEXT.map((s, i) => (
                <li key={s.name}>
                  <span className="ds-data">0{i + 1}</span>
                  <div>
                    <p className="ds-qt-next-name">{s.name}</p>
                    <p className="ds-small">{s.line}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="ds-qt-where">
            <h2 className="ds-qt-sub">Where we post officers</h2>
            <p className="ds-small">Headquartered in Colorado Springs, with officers in Denver and Pueblo.</p>
            <CoverageMap />
          </div>

        </aside>
      </div>

      <QuoteToast data={toast} onClose={() => setToast(null)} />
    </main>
  );
}

function Field({ id, label, optional, children }: { id: string; label: string; optional?: boolean; children: React.ReactNode }) {
  return (
    <div className="ds-qt-field">
      <label htmlFor={id}>
        {label}
        {optional && <span> Optional</span>}
      </label>
      {children}
    </div>
  );
}
