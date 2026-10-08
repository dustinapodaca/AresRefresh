import { Link } from 'react-router-dom';
import Seo from '../seo/Seo';
import Arrow from '../components/Arrow';
import { INSIGHTS } from '../components/market/insights';

// Insights index (Linear and Clerk on Mobbin): articles as ruled rows, title, category, and
// date, no thumbnails. Read mode.
export default function Insights() {
  return (
    <main className="ds ds-page ds-mk">
      <Seo path="/insights" />
      <section className="ds-container ds-mk-open ds-mk-open-solo" aria-labelledby="mk-title">
        <div className="ds-mk-open-copy">
          <h1 id="mk-title" className="ds-display-xl">Insights.</h1>
          <p className="ds-lead">
            Plain answers for people buying security: how to choose coverage, how contracting
            and licensing work, and what to expect on post.
          </p>
        </div>
      </section>
      <div className="ds-container">
        <ul className="ds-mk-posts">
          {INSIGHTS.map((a) => (
            <li key={a.slug}>
              <Link to={`/insights/${a.slug}`}>
                <span className="ds-mk-post-title">{a.title}</span>
                <span className="ds-mk-post-sum">{a.summary}</span>
                <span className="ds-mk-post-meta">
                  <span>{a.category}</span>
                  <time className="ds-data" dateTime={a.date}>{a.dateLabel}</time>
                </span>
                <Arrow size={18} />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
