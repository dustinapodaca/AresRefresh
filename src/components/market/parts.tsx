import { useRef, type MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import Arrow from '../Arrow';
import type { Faq, SheetRow } from './roles';
import CallLink from '../CallLink';
import { isOpening, preventSelect, setDetailsOpen } from '../../lib/disclosure';

// Shared parts of the role, industry, insight, and city job pages.

/** JSON-LD in the page body (valid anywhere in the document; keeps src/seo untouched). */
export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

// Opening and closing the questions: one open at a time, the other closing as the new one opens
// (owner, 2026-10-16), on the site's fold motion (src/lib/disclosure.ts; owner, 2026-11-27).
// Without JS the native <details> still open and close; under reduced motion they snap.
const FAQ_PARTS = { body: '.ds-mk-faq-a', items: '.ds-mk-faq-a > *', nudge: true };

/** Questions as an accordion (Linear and Dovetail on Mobbin): the heading left, the questions
 *  right, each a native <details> so it works without JS. Emits FAQPage structured data. */
export function FaqSection({ items, id = 'questions' }: { items: Faq[]; id?: string }) {
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  };
  const listRef = useRef<HTMLDivElement>(null);
  const toggle = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const details = e.currentTarget.parentElement as HTMLDetailsElement;
    const opening = isOpening(details);
    if (opening) {
      listRef.current?.querySelectorAll<HTMLDetailsElement>('details[open]').forEach((d) => d !== details && !d.hasAttribute('data-closing') && setDetailsOpen(d, false, FAQ_PARTS));
    }
    setDetailsOpen(details, opening, FAQ_PARTS);
  };
  return (
    <section id={id} className="ds-mk-faq" aria-labelledby={`${id}-title`}>
      <div className="ds-mk-faq-head">
        {/* "Something else? Call ..." was cut (design review, 2026-10-13): the phone is already
            in each page's opening and its closing ask. */}
        <h2 id={`${id}-title`} className="ds-display-md">Questions, answered</h2>
      </div>
      <div className="ds-mk-faq-list" ref={listRef}>
        {items.map((f) => (
          <details key={f.q} className="ds-fold-line">
            <summary onClick={toggle} onMouseDown={preventSelect}>
              <span>{f.q}</span>
              <span className="ds-mk-faq-mark" aria-hidden="true" />
            </summary>
            <div className="ds-mk-faq-a">
              <p>{f.a}</p>
            </div>
          </details>
        ))}
      </div>
      <JsonLd data={ld} />
    </section>
  );
}

/** A spec sheet: label and value on hairline rows, with a route where there is one. */
export function Sheet({ rows, label }: { rows: SheetRow[]; label: string }) {
  return (
    <dl className="ds-mk-sheet" aria-label={label}>
      {rows.map((r) => (
        <div key={r.label}>
          <dt>{r.label}</dt>
          <dd>
            {r.href ? (
              r.external ? (
                <a href={r.href} target="_blank" rel="noopener noreferrer" className="ds-link">
                  {r.value}
                  <Arrow external size={12} />
                </a>
              ) : (
                <Link to={r.href} className="ds-link">{r.value}</Link>
              )
            ) : (
              r.value
            )}
          </dd>
        </div>
      ))}
    </dl>
  );
}

/** The ask: one plain line, the quote button, and the phone, on a strong hairline. */
export function AskStrip({ line, quote, label = 'Request a Quote' }: { line: string; quote: string; label?: string }) {
  return (
    <div className="ds-mk-ask">
      <p className="ds-mk-ask-line">{line}</p>
      <div className="ds-actions">
        <Link to={quote} className="ds-btn ds-btn-primary">
          {label}
          <Arrow />
        </Link>
        <CallLink />
      </div>
    </div>
  );
}

/** Routes out: ruled links with a title and a line (the location pages' ending). */
export function RouteRow({ items, label }: { items: { to: string; title: string; line: string }[]; label: string }) {
  return (
    <ul className="ds-mk-routes" aria-label={label}>
      {items.map((r) => (
        <li key={r.to}>
          <Link to={r.to}>
            <span className="ds-mk-route-title">{r.title}</span>
            <span className="ds-small">{r.line}</span>
            <Arrow size={18} />
          </Link>
        </li>
      ))}
    </ul>
  );
}
