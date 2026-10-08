import { Link } from 'react-router-dom';
import Arrow from '../Arrow';
import type { Faq, SheetRow } from './roles';

// Shared parts of the role, industry, insight, and city job pages.

/** JSON-LD in the page body (valid anywhere in the document; keeps src/seo untouched). */
export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

/** Questions as an accordion (Linear and Dovetail on Mobbin): the heading left, the questions
 *  right, each a native <details> so it works without JS. Emits FAQPage structured data. */
export function FaqSection({ items, id = 'questions' }: { items: Faq[]; id?: string }) {
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  };
  return (
    <section id={id} className="ds-mk-faq" aria-labelledby={`${id}-title`}>
      <div className="ds-mk-faq-head">
        <h2 id={`${id}-title`} className="ds-display-md">Questions, answered.</h2>
        <p className="ds-small">
          Something else? Call <a href="tel:+17196963966" className="ds-link ds-data">719-696-3966</a>.
        </p>
      </div>
      <div className="ds-mk-faq-list">
        {items.map((f) => (
          <details key={f.q}>
            <summary>
              <span>{f.q}</span>
              <span className="ds-mk-faq-mark" aria-hidden="true" />
            </summary>
            <p>{f.a}</p>
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
export function AskStrip({ line, quote }: { line: string; quote: string }) {
  return (
    <div className="ds-mk-ask">
      <p className="ds-mk-ask-line">{line}</p>
      <div className="ds-actions">
        <Link to={quote} className="ds-btn ds-btn-primary">
          Request a quote
          <Arrow />
        </Link>
        <a href="tel:+17196963966" className="ds-link">
          Call <span className="ds-data">719-696-3966</span>
        </a>
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
