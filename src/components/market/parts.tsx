import { useRef, type MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import Arrow from '../Arrow';
import type { Faq, SheetRow } from './roles';

// Shared parts of the role, industry, insight, and city job pages.

/** JSON-LD in the page body (valid anywhere in the document; keeps src/seo untouched). */
export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

// Opening and closing the questions (owner, 2026-10-16): the answer's height eases open (260ms)
// and shut (200ms), and one question is open at a time, the other closing as the new one opens.
// Without JS the native <details> still open and close; under reduced motion they snap.
const FAQ_EASE = 'cubic-bezier(0.2, 0.8, 0.2, 1)';
const running = new WeakMap<HTMLElement, Animation>();

function slide(details: HTMLDetailsElement, open: boolean) {
  const body = details.querySelector<HTMLElement>('.ds-mk-faq-a');
  if (!body) return;
  running.get(body)?.cancel();
  const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (open) {
    details.removeAttribute('data-closing');
    details.open = true;
    if (still) return;
    const h = body.scrollHeight;
    const a = body.animate([{ height: '0px', transform: 'translateY(-6px)' }, { height: `${h}px`, transform: 'none' }], { duration: 260, easing: FAQ_EASE });
    running.set(body, a);
    a.onfinish = () => running.delete(body);
  } else {
    if (still) { details.open = false; return; }
    details.setAttribute('data-closing', '');
    const a = body.animate([{ height: `${body.offsetHeight}px` }, { height: '0px' }], { duration: 200, easing: FAQ_EASE });
    running.set(body, a);
    a.onfinish = () => { running.delete(body); details.open = false; details.removeAttribute('data-closing'); };
  }
}

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
    const opening = !details.open || details.hasAttribute('data-closing');
    if (opening) {
      listRef.current?.querySelectorAll<HTMLDetailsElement>('details[open]').forEach((d) => d !== details && !d.hasAttribute('data-closing') && slide(d, false));
    }
    slide(details, opening);
  };
  return (
    <section id={id} className="ds-mk-faq" aria-labelledby={`${id}-title`}>
      <div className="ds-mk-faq-head">
        {/* "Something else? Call ..." was cut (design review, 2026-10-13): the phone is already
            in each page's opening and its closing ask. */}
        <h2 id={`${id}-title`} className="ds-display-md">Questions, answered.</h2>
      </div>
      <div className="ds-mk-faq-list" ref={listRef}>
        {items.map((f) => (
          <details key={f.q}>
            <summary onClick={toggle}>
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
