import { Link, useParams } from 'react-router-dom';
import Seo from '../seo/Seo';
import Arrow from '../components/Arrow';
import NotFound from './NotFound';
import { HOST } from '../seo/routes';
import { INSIGHTS, insightBySlug } from '../components/market/insights';
import { JsonLd, RouteRow } from '../components/market/parts';

// One insight: a read-mode article at a 68ch measure, its related pages, and the other
// articles. Article structured data in the body.
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
    dateModified: a.date,
    author: { '@type': 'Organization', name: 'Ares Security LLC', url: HOST },
    publisher: { '@id': `${HOST}/#localbusiness` },
    mainEntityOfPage: `${HOST}/insights/${a.slug}`,
  };

  return (
    <main className="ds ds-page ds-mk">
      <Seo path={`/insights/${a.slug}`} />
      <article className="ds-container ds-mk-article" aria-labelledby="mk-title">
        <h1 id="mk-title" className="ds-display-lg">{a.title}</h1>
        <p className="ds-data ds-mk-article-meta">
          <span>{a.category}</span>
          <time dateTime={a.date}>{a.dateLabel}</time>
          <span>Ares Security</span>
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

      <div className="ds-container">
        <nav className="ds-mk-sec" aria-labelledby="mk-more">
          <h2 id="mk-more" className="ds-display-md">More insights.</h2>
          <RouteRow label="More insights" items={others.map((o) => ({ to: `/insights/${o.slug}`, title: o.title.replace(/\.$/, ''), line: o.category }))} />
        </nav>
      </div>
    </main>
  );
}
