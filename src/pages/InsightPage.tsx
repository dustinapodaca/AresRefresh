import { Link, useParams } from 'react-router-dom';
import Crumbs from '../components/market/Crumbs';
import Seo from '../seo/Seo';
import Arrow from '../components/Arrow';
import NotFound from './NotFound';
import { HOST } from '../seo/routes';
import { INSIGHTS, insightBySlug } from '../components/market/insights';
import { FaqSection, JsonLd, RouteRow } from '../components/market/parts';
import { heroTitle } from '../lib/heroTitle';

// One insight: a read-mode article at a 68ch measure, its related pages, and the other
// articles. Article structured data in the body.
// The articles' author and his LinkedIn (owner, 2026-10-19).
const AUTHOR_LINKEDIN = 'https://www.linkedin.com/in/dustinapodaca';

export default function InsightPage() {
  const { slug } = useParams();
  const a = insightBySlug(slug);
  if (!a) return <NotFound />;
  const others = INSIGHTS.filter((i) => i.slug !== a.slug).slice(0, 3);
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
  };

  return (
    <main id="main" tabIndex={-1} className="ds ds-page ds-mk">
      <Seo path={`/insights/${a.slug}`} />
      <article className="ds-container ds-mk-article" aria-labelledby="mk-title">
        <Crumbs path={`/insights/${a.slug}`} current={a.title} />
        <h1 id="mk-title" className="ds-display-lg">{heroTitle(a.title)}</h1>
        <p className="ds-data ds-mk-article-meta">
          <span>{a.category}</span>
          <time dateTime={a.date}>{a.dateLabel}</time>
          {a.updated && <time dateTime={a.updated}>Updated {a.updatedLabel}</time>}
          <a href={AUTHOR_LINKEDIN} target="_blank" rel="noopener noreferrer" className="ds-link" aria-label="Dustin Apodaca on LinkedIn (new tab)">
            Dustin Apodaca
            <Arrow external size={12} />
          </a>
        </p>
        <div className="ds-mk-article-body">
          {a.body.map((b, i) =>
            'h' in b ? (
              <h2 key={i}>{b.h}</h2>
            ) : 'list' in b ? (
              <ul key={i}>{b.list.map((li) => <li key={li}>{li}</li>)}</ul>
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
        <JsonLd data={ld} />
      </article>

      {/* The article's questions (2026-10-26), with FAQPage structured data. */}
      {a.faq && a.faq.length > 0 && (
        <div className="ds-container">
          <FaqSection items={a.faq} />
        </div>
      )}

      <div className="ds-container">
        <nav className="ds-mk-sec" aria-labelledby="mk-more">
          <h2 id="mk-more" className="ds-display-md">More insights.</h2>
          <RouteRow label="More insights" items={others.map((o) => ({ to: `/insights/${o.slug}`, title: o.title.replace(/\.$/, ''), line: o.category }))} />
        </nav>
      </div>
    </main>
  );
}
