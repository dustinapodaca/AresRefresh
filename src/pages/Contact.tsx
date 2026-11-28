import { FormEvent, useEffect, useLayoutEffect, useRef, useState } from 'react';
import Arrow from '../components/Arrow';
import { RegionsMap } from '../components/home/CoverageRegions';
import '../components/home/nx-coverage.css';
import QuoteToast, { type ToastData } from '../components/QuoteToast';
import Seo from '../seo/Seo';
import { responsive } from '../lib/responsive';
import { formatPhone, subjectFor, toWeb3Forms, type Quote } from '../lib/quote';
import { track } from '../lib/analytics';

// Request a quote: "The Intake" (docs/contact-concepts.md). Design authority: DESIGN.md.
// Content: docs/contact-content.md. A short form page, so no section rail.

// What can we help with (was "What needs covering?", owner 2026-11-27): the six services (one page each under /services/<slug>) and
// "not sure". The email carries the label, not the slug (src/lib/quote.ts). Role and industry pages link here with
// ?service=<slug> or ?industry=<slug>, and the matching answer is picked for the reader.
// On phones a dropdown, not eight rows (owner, 2026-11-27: the rows ran 457px).
const NEEDS: { slug: string; label: string }[] = [
  { slug: 'armed-security-officers', label: 'Armed Security Officers' },
  { slug: 'unarmed-security-officers', label: 'Unarmed Security Officers' },
  { slug: 'access-control', label: 'Access Control Officers' },
  { slug: 'restricted-area-escort', label: 'Restricted-Area Escort' },
  { slug: 'mobile-patrol', label: 'Mobile Patrol' },
  { slug: 'relief-surge-coverage', label: 'Relief & Surge Coverage' },
  { slug: 'teaming', label: 'Teaming or subcontract coverage' }, // for primes and guard companies (/teaming)
  { slug: 'other', label: 'Not sure, or something else' },
];

type ChipSet = { name: string; legend: string; options: string[] };

// Where the site is: the one question about the post the form keeps in view (owner, 2026-11-23);
// chips from 640px, a dropdown below (owner, 2026-11-27).
const WHERE: ChipSet = { name: 'location', legend: 'Where is the site?', options: ['Colorado Springs', 'Denver metro', 'Pueblo', 'Western Slope', 'San Luis Valley', 'Elsewhere in Colorado'] };

// The rest of the post, in a few taps (CenCore's quote form, without the clearance question),
// folded behind "Add details" (owner, 2026-11-23: the form read as too long to bother with).
const CHIPS: ChipSet[] = [
  { name: 'officers', legend: 'Officers on post at once', options: ['1 to 2', '3 to 5', '6 to 15', '16 or more', 'Not sure'] },
  { name: 'schedule', legend: 'Schedule', options: ['Business hours', 'Nights and weekends', '24/7', 'One-time or short-term', 'Not sure'] },
  { name: 'start', legend: 'When do you need coverage?', options: ['Within 30 days', '1 to 3 months', '3 to 6 months', 'Just planning'] },
];

// The six industries, one name each, with the same slugs as their pages (an industry page
// links here with ?industry=<slug>; owner, 2026-10-10), plus anything else, in the fixed order
// (owner, 2026-10-26). Event security
// left the site (owner, 2026-10-10), so the event site type went with it.
const SITE_TYPES: { slug: string; label: string }[] = [
  { slug: 'government-defense', label: 'Government & Defense' },
  { slug: 'commercial-property', label: 'Commercial & Retail' },
  { slug: 'critical-infrastructure', label: 'Critical & High-Liability Sites' },
  { slug: 'institutional-community', label: 'Institutional & Community' },
  { slug: 'construction-industrial', label: 'Construction, Industrial & Logistics' },
  { slug: 'airport-transportation', label: 'Airport & Transportation' },
  { slug: 'other', label: 'Something else' },
];

const HEARD = ['Google search', 'AI assistant (ChatGPT, Gemini, and others)', 'GSA eLibrary or SAM.gov', 'Agency or prime referral', 'Referral from a client or colleague', 'LinkedIn', 'Other'];
const LABEL = Object.fromEntries(NEEDS.map((n) => [n.slug, n.label]));

// What happens after a request, from facts already on the site.
const NEXT = [
  // "Read by leadership only" stays once, under Send (design review, 2026-10-13).
  { name: 'We read your request', line: 'Your site, the coverage you need, and your dates.' },
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
  // What can we help with: one answer, shown as rows from 640px and as a dropdown below
  // (owner, 2026-11-27). The hidden one is disabled so it is neither required nor sent; until
  // the script runs both stay enabled, so the prerender matches the first client render.
  const [need, setNeed] = useState('');
  // Where is the site: chips from 640px, the same dropdown below (owner, 2026-11-27).
  const [where, setWhere] = useState('');
  const [narrow, setNarrow] = useState<boolean | null>(null);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 639px)');
    const sync = () => setNarrow(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  // Pick the service or site type the reader came from (after hydration, so the prerendered
  // HTML and the first client render match).
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const form = formRef.current;
    if (!form) return;
    const service = q.get('service');
    if (service && NEEDS.some((n) => n.slug === service)) setNeed(service);
    const industry = q.get('industry');
    if (industry) {
      const select = form.querySelector<HTMLSelectElement>('select[name="site_type"]');
      if (select && SITE_TYPES.some((t) => t.slug === industry)) {
        select.value = industry;
        // Show the answer picked for the reader.
        const more = select.closest('details');
        if (more) more.open = true;
      }
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
        // A conversion in Google Analytics: which service, nothing the reader typed.
        track('generate_lead', { service: quote.service });
        setStatus(null);
        setToast({ kind: 'sent', email: quote.email, subject: subjectFor(quote) });
        form.reset();
        setNeed('');
        setWhere('');
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
            alt="Office towers at blue hour"
            decoding="sync"
            {...{ fetchpriority: 'high' }}
          />
        </figure>
        <div className="ds-container ds-qt-open-copy">
          <h1 id="qt-title" className="ds-display-xl">
            Request a quote
          </h1>
          <p className="ds-lead">
            Send a site, a shift pattern, and a deadline. We will come back with a scoped
            proposal for federal, commercial, or specialized work.
          </p>
        </div>
      </section>

      <div className="ds-container ds-qt-body">
        <form ref={formRef} className="ds-qt-form" onSubmit={submit} aria-labelledby="qt-title" aria-busy={sending}>
          <fieldset className="ds-qt-part ds-qt-need-part">
            <legend id="qf-need-legend">What can we help with?</legend>
            <div className="ds-qt-needs">
              {NEEDS.map((n) => (
                <label key={n.slug} className="ds-qt-need">
                  <input
                    type="radio"
                    name="subject"
                    value={n.slug}
                    required
                    disabled={narrow === true}
                    checked={need === n.slug}
                    onChange={() => setNeed(n.slug)}
                    aria-describedby="qf-need-err"
                  />
                  <span className="ds-qt-dot" aria-hidden="true" />
                  <span>{n.label}</span>
                </label>
              ))}
            </div>
            <select
              name="subject"
              required
              disabled={narrow === false}
              value={need}
              onChange={(e) => setNeed(e.target.value)}
              aria-labelledby="qf-need-legend"
              aria-describedby="qf-need-err"
              className="ds-qt-input ds-qt-select ds-qt-need-select"
            >
              <option value="">Choose one</option>
              {NEEDS.map((n) => <option key={n.slug} value={n.slug}>{n.label}</option>)}
            </select>
            <p id="qf-need-err" className="ds-qt-err">
              Choose what we can help with.
            </p>
          </fieldset>

          <fieldset className="ds-qt-part ds-qt-where-part">
            <legend id="qf-where-legend">{WHERE.legend}</legend>
            <div className="ds-qt-chips">
              {WHERE.options.map((o) => (
                <label key={o} className="ds-qt-chip">
                  <input
                    type="radio"
                    name={WHERE.name}
                    value={o}
                    disabled={narrow === true}
                    checked={where === o}
                    onChange={() => setWhere(o)}
                  />
                  <span>{o}</span>
                </label>
              ))}
            </div>
            <select
              name={WHERE.name}
              disabled={narrow === false}
              value={where}
              onChange={(e) => setWhere(e.target.value)}
              aria-labelledby="qf-where-legend"
              className="ds-qt-input ds-qt-select ds-qt-where-select"
            >
              <option value="">Choose one</option>
              {WHERE.options.map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
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
            </div>
          </fieldset>

          {/* The rest is optional and folded away (owner, 2026-11-23); native <details>, so it
              opens without JS, and whatever is chosen inside is sent either way. Phone and
              organization fold in here too, after the email and before the message (owner,
              2026-11-27, at every width). */}
          <details className="ds-qt-more">
            <summary>
              <span>
                Add details <span className="ds-qt-more-note">Optional</span>
              </span>
              <span className="ds-qt-more-mark" aria-hidden="true" />
            </summary>
            <div className="ds-qt-more-body">
              <div className="ds-qt-fields">
                <Field id="qf-phone" label="Phone">
                  <input id="qf-phone" name="phone" type="tel" autoComplete="tel" placeholder="(555) 555-5555" className="ds-qt-input" />
                </Field>
                <Field id="qf-org" label="Organization">
                  <input id="qf-org" name="organization" type="text" autoComplete="organization" placeholder="Agency, company, or LLC" className="ds-qt-input" />
                </Field>
              </div>
              <div className="ds-qt-chipsets ds-qt-fields-after">
                {CHIPS.map((g) => (
                  <fieldset key={g.name} className="ds-qt-chipset">
                    <legend>{g.legend}</legend>
                    <Chips set={g} />
                  </fieldset>
                ))}
              </div>
              <div className="ds-qt-fields ds-qt-fields-after">
                <Field id="qf-site" label="Type of site">
                  <select id="qf-site" name="site_type" className="ds-qt-input ds-qt-select" defaultValue="">
                    <option value="">Choose one</option>
                    {SITE_TYPES.map((t) => <option key={t.slug} value={t.slug}>{t.label}</option>)}
                  </select>
                </Field>
                <Field id="qf-heard" label="How did you hear about us?">
                  <select id="qf-heard" name="heard_about" className="ds-qt-input ds-qt-select" defaultValue="">
                    <option value="">Choose one</option>
                    {HEARD.map((h) => <option key={h} value={h}>{h}</option>)}
                  </select>
                </Field>
              </div>
            </div>
          </details>

          <fieldset className="ds-qt-part ds-qt-part-grow">
            <legend>Anything we should know?</legend>
            <Field id="qf-message" label="Message" optional>
              <textarea
                id="qf-message"
                name="message"
                rows={4}
                placeholder="The hours, your dates, or anything the post must meet."
                className="ds-qt-input"
              />
            </Field>
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
            {/* So applicants don't use the quote form (copy audit, 2026-10-10). */}
            <p className="ds-small">
              Looking for work? Email{' '}
              <a href="mailto:careers@aressecurity.co" className="ds-link ds-data">careers@aressecurity.co</a>
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
            <p className="ds-small">Headquartered in Colorado Springs, with officers across Colorado.</p>
            <QuoteMap />
          </div>

        </aside>
      </div>

      <QuoteToast data={toast} onClose={() => setToast(null)} />
    </main>
  );
}

function Chips({ set }: { set: ChipSet }) {
  return (
    <div className="ds-qt-chips">
      {set.options.map((o) => (
        <label key={o} className="ds-qt-chip">
          <input type="radio" name={set.name} value={o} />
          <span>{o}</span>
        </label>
      ))}
    </div>
  );
}

/** Home's regions map (owner, 2026-11-23: it shows all of Colorado; the I-25 map named only three
 *  cities), drawn whole. Pointing at a region lights it and dims the others, easing as on Home. */
function QuoteMap() {
  const [active, setActive] = useState<string | null>(null);
  const ref = useRef<HTMLElement>(null);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.setAttribute('data-easing', '');
    const t = window.setTimeout(() => el.removeAttribute('data-easing'), 450);
    return () => window.clearTimeout(t);
  }, [active]);
  return (
    <figure ref={ref} className="nx-cv-map ds-qt-map" data-active={active || undefined}>
      <RegionsMap active={active} onPoint={(id) => setActive((cur) => (cur === id ? cur : id))} />
    </figure>
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
