import { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import Arrow from '../components/Arrow';
import CoverageMap from '../components/home/CoverageMap';
import { GSA_ELIBRARY } from '../components/home/links';
import Seo from '../seo/Seo';

// Request a quote: "The Intake" (docs/contact-concepts.md). Design authority: DESIGN.md.
// Content: docs/contact-content.md. A short form page, so no section rail.

// What needs covering: the six Services divisions, the capability statement, and other.
// Web3Forms uses `subject` as the email's subject line, so the slug is swapped for the
// label right before posting.
const NEEDS: { slug: string; label: string }[] = [
  { slug: 'government', label: 'Government Security Personnel' },
  { slug: 'airport', label: 'Airport & Transportation Security' },
  { slug: 'commercial', label: 'Commercial & High-Traffic Security' },
  { slug: 'industrial', label: 'Industrial, Logistics & Construction' },
  { slug: 'specialized', label: 'Specialized & Armed Protection' },
  { slug: 'community', label: 'Institutional & Community Security' },
  { slug: 'capability', label: 'Capability statement request' },
  { slug: 'other', label: 'Something else' },
];
const LABEL = Object.fromEntries(NEEDS.map((n) => [n.slug, n.label]));

const FAILED = 'That did not send. Please try again, or email contact@aressecurity.co.';

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

    fd.append('access_key', key);

    // Rewrite `subject` from its slug to a readable email subject.
    const slug = String(fd.get('subject') || '');
    fd.set('subject', `Ares Inquiry: ${LABEL[slug] || 'General inquiry'}`);

    // So replying from the inbox goes back to the inquirer, not Web3Forms.
    const email = String(fd.get('email') || '');
    if (email) fd.append('replyTo', email);

    // Friendly "from" display name in the notification email.
    const name = String(fd.get('name') || '');
    if (name) fd.append('from_name', `Ares Quote: ${name}`);

    setSending(true);
    setStatus({ text: 'Sending your request…', ok: true, done: false });
    try {
      const res = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: fd });
      const data = await res.json();
      if (data.success) {
        setStatus({ text: 'Sent. We will reply to the email you gave us.', ok: true, done: true });
        form.reset();
      } else {
        setStatus({ text: FAILED, ok: false, done: true });
      }
    } catch {
      setStatus({ text: FAILED, ok: false, done: true });
    } finally {
      setSending(false);
    }
  }

  return (
    <main className="ds ds-page ds-qt">
      <Seo path="/contact" />

      <section className="ds-qt-open" aria-labelledby="qt-title">
        <figure className="ds-qt-hero">
          <img
            src="/images/contact-hero.jpg"
            alt="Downtown Denver at sunset, the Front Range behind it"
            width={1400}
            height={805}
            decoding="async"
            {...{ fetchpriority: 'high' }}
          />
          <figcaption className="ds-data">Denver, Colorado</figcaption>
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
        <div className="ds-qt-main">
          <form className="ds-qt-form" onSubmit={submit} aria-labelledby="qt-title" aria-busy={sending}>
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
              <legend>About the site</legend>
              <Field id="qf-message" label="Message">
                <textarea
                  id="qf-message"
                  name="message"
                  required
                  rows={6}
                  placeholder="Site, shift pattern, deadline, and any compliance considerations."
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
          <div className="ds-qt-gsa">
            <h2 className="ds-qt-sub">Buying through GSA?</h2>
            <div className="ds-qt-gsa-row">
              <p className="ds-small">GSA Multiple Award Schedule</p>
              <p className="ds-data ds-qt-gsa-n">47QSMS25D009Q</p>
              <div className="ds-qt-gsa-links">
                <a href={GSA_ELIBRARY} target="_blank" rel="noopener noreferrer" className="ds-link">
                  View on GSA eLibrary
                  <Arrow external size={12} />
                </a>
                <Link to="/capability-statement" className="ds-link">
                  Capability statement
                  <Arrow size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>

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
