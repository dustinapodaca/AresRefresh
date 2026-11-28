import { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import Crumbs from '../components/market/Crumbs';
import Seo from '../seo/Seo';
import Arrow from '../components/Arrow';
import NotFound from './NotFound';
import { HOST } from '../seo/routes';
import { INSIGHTS, insightBySlug } from '../components/market/insights';
import { AskStrip, FaqSection, JsonLd } from '../components/market/parts';
import InsightArt, { artCaption } from '../components/insights/InsightArt';
import { headingId, headings, readingMinutes, readNext } from '../components/insights/meta';
import { useActiveSection } from '../lib/useActiveSection';
import { heroTitle } from '../lib/heroTitle';
import { isOpening, preventSelect, setDetailsOpen } from '../lib/disclosure';
import '../components/insights/insights.css';

// "On this page" below 1200px opens and shuts like every fold on the site (src/lib/disclosure.ts).
function toggleToc(e: React.MouseEvent<HTMLElement>) {
  e.preventDefault();
  const details = e.currentTarget.parentElement as HTMLDetailsElement;
  setDetailsOpen(details, isOpening(details), { body: 'nav', items: 'nav > ul', nudge: true });
}

// One insight (2026-11-19 redesign; was one reading column with related links and "More
// insights" routes). The article's plate under the headline (after Linear's articles), the
// reading time beside the date, and its sections in an "On this page" column that tracks the
// one in view (the policies' side column, set on the right as on Attio's articles); below 1200px
// the same list folds under the meta row. A thin rust line under the nav shows how far the reader
// is. Then sources, related, the questions, the ask, and what to read next in the same topic.
// The articles' author and his LinkedIn (owner, 2026-10-19).
const AUTHOR_LINKEDIN = 'https://www.linkedin.com/in/dustinapodaca';

export default function InsightPage() {
  const { slug } = useParams();
  const a = insightBySlug(slug);
  const toc = useMemo(() => (a ? [...headings(a), ...(a.faq?.length ? [{ id: 'questions', title: 'Questions' }] : [])] : []), [a]);
  const ids = useMemo(() => toc.map((t) => t.id), [toc]);
  const active = useActiveSection(ids);
  if (!a) return <NotFound />;

  const next = readNext(a, INSIGHTS);
  const caption = artCaption(a.slug);
  const minutes = readingMinutes(a);
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: a.title.replace(/\.$/, ''),
    description: a.summary,
    datePublished: a.date,
    // The last real content change (2026-10-26), so a refreshed article reads as fresh.
    dateModified: a.updated ?? a.date,
    // The site's share image; Article results want one (2026-10-26).
    image: `${HOST}/images/og/ares-security.jpg`,
    // The articles' author (owner, 2026-10-19): the same Person as in index.html's JSON-LD.
    author: { '@type': 'Person', '@id': `${HOST}/#dustin-apodaca`, name: 'Dustin Apodaca', sameAs: [AUTHOR_LINKEDIN] },
    publisher: { '@id': `${HOST}/#localbusiness` },
    mainEntityOfPage: `${HOST}/insights/${a.slug}`,
    articleSection: a.category,
    timeRequired: `PT${minutes}M`,
  };

  const tocList = (
    <ul>
      {toc.map((t) => (
        <li key={t.id}>
          <a href={`#${t.id}`} aria-current={active === t.id ? 'location' : undefined}>
            {t.title}
          </a>
        </li>
      ))}
    </ul>
  );

  return (
    <main id="main" tabIndex={-1} className="ds ds-page ds-mk ds-in">
      <Seo path={`/insights/${a.slug}`} />
      <div className="ds-in-progress" aria-hidden="true" />
      <article className="ds-container ds-in-article" aria-labelledby="mk-title">
        <header className="ds-in-head">
          <Crumbs
            path={`/insights/${a.slug}`}
            current={a.title}
            section={{ name: a.category, to: `/insights?topic=${encodeURIComponent(a.category)}` }}
          />
          <h1 id="mk-title" className="ds-display-lg">{heroTitle(a.title)}</h1>
          {/* The byline (owner, 2026-11-27, after Quartz, Uxcel, Matter, and Substack on Mobbin): the
              topic moved up into the breadcrumb; here who and when on the left, how long on the right
              (at the end of the dates on phones). Text face, middle dots, no labels. */}
          <div className="ds-in-byline">
            <div className="ds-in-byline-who">
              <p>
                By{' '}
                <a href={AUTHOR_LINKEDIN} target="_blank" rel="noopener noreferrer" className="ds-link" aria-label="Dustin Apodaca on LinkedIn (new tab)">
                  Dustin Apodaca
                  <Arrow external size={12} />
                </a>
              </p>
              <p className="ds-in-byline-when">
                <time dateTime={a.date}>{a.dateLabel}</time>
                {a.updated && <span className="ds-in-byline-upd">Updated <time dateTime={a.updated}>{a.updatedLabel}</time></span>}
                <span className="ds-in-byline-time-sm">{minutes} min read</span>
              </p>
            </div>
            <p className="ds-in-byline-time">{minutes} min read</p>
          </div>
        </header>

        <figure className="ds-in-plate">
          <div className="ds-in-plate-frame">
            <InsightArt slug={a.slug} size="lg" grid={false} />
          </div>
          {caption && <figcaption className="ds-caption">{caption}</figcaption>}
        </figure>

        <div className="ds-in-grid">
          {toc.length > 2 && (
            <aside className="ds-in-side">
              <nav className="ds-in-toc" aria-label="On this page">
                <p className="ds-in-toc-title">On this page</p>
                {tocList}
              </nav>
            </aside>
          )}

          <div className="ds-in-main">
            {toc.length > 2 && (
              <details className="ds-in-toc-fold ds-fold-line">
                <summary onClick={toggleToc} onMouseDown={preventSelect}>
                  On this page <span className="ds-data">{toc.length}</span>
                </summary>
                <nav aria-label="On this page">{tocList}</nav>
              </details>
            )}

            <div className="ds-mk-article-body">
              {a.body.map((b, i) =>
                'h' in b ? (
                  <h2 key={i} id={headingId(b.h)}>{b.h}</h2>
                ) : 'list' in b ? (
                  <ul key={i}>{b.list.map((li) => <li key={li}>{li}</li>)}</ul>
                ) : 'doc' in b ? (
                  // A sample document (2026-11-19): its preview inside the column like a photo (4px
                  // corners, the hairline edge), a mono caption, and the download as a quiet link.
                  <figure key={i} className="ds-mk-doc">
                    <a href={b.doc.href} className="ds-mk-doc-frame" aria-label={b.doc.label}>
                      <img src={b.doc.image} width={b.doc.width} height={b.doc.height} alt={b.doc.alt} loading="lazy" decoding="async" />
                    </a>
                    <figcaption className="ds-caption">{b.doc.meta}</figcaption>
                    <a href={b.doc.href} className="ds-link ds-mk-doc-link">
                      {b.doc.label}
                      <Arrow size={14} />
                    </a>
                  </figure>
                ) : (
                  <p key={i}>{b.p}</p>
                ),
              )}
            </div>

            {/* Primary sources (2026-10-26): the checkable record behind the article. */}
            {a.sources && a.sources.length > 0 && (
              <div className="ds-mk-article-related">
                <p className="ds-mk-article-related-title">Sources</p>
                <ul>
                  {a.sources.map((s) => (
                    <li key={s.url}>
                      <a href={s.url} target="_blank" rel="noopener noreferrer" className="ds-link">
                        {s.label}
                        <Arrow external size={14} />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="ds-mk-article-related">
              <p className="ds-mk-article-related-title">Related</p>
              <ul>
                {a.related.map((r) => (
                  <li key={r.to}>
                    <Link to={r.to} className="ds-link">
                      {r.label}
                      <Arrow size={14} />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <JsonLd data={ld} />
      </article>

      {/* The article's questions (2026-10-26), with FAQPage structured data. */}
      {a.faq && a.faq.length > 0 && (
        <div className="ds-container">
          <FaqSection items={a.faq} />
        </div>
      )}

      <div className="ds-container">
        <AskStrip line="Have a post to cover in Colorado? Tell us about the site." quote="/contact" />
        <nav className="ds-mk-sec ds-in-next" aria-labelledby="mk-more">
          <h2 id="mk-more" className="ds-display-md">More insights</h2>
          <ul className="ds-in-cards">
            {next.map((o) => (
              <li key={o.slug}>
                <Link to={`/insights/${o.slug}`} className="ds-in-card">
                  <span className="ds-in-card-art">
                    <InsightArt slug={o.slug} size="sm" />
                  </span>
                  <span className="ds-in-meta">
                    <span>{o.category}</span>
                    <span>{readingMinutes(o)} min read</span>
                  </span>
                  <span className="ds-in-card-title">{o.title.replace(/\.$/, '')}</span>
                  <span className="ds-in-card-go" aria-hidden="true">
                    <Arrow size={16} />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <Link to="/insights" className="ds-link ds-in-all">
            All {INSIGHTS.length} articles
            <Arrow size={14} />
          </Link>
        </nav>
      </div>
    </main>
  );
}
