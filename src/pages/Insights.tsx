import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Seo from '../seo/Seo';
import Arrow from '../components/Arrow';
import { CATEGORIES, INSIGHTS, type Insight, type InsightCategory } from '../components/market/insights';
import { AskStrip } from '../components/market/parts';
import InsightArt from '../components/insights/InsightArt';
import { readingMinutes } from '../components/insights/meta';
import '../components/insights/insights.css';

// Insights index, "The Reading Room" (2026-11-19; was ruled rows of title, summary, and date).
// After Linear's blog (line drawings on black cards, then a ruled list), Basedash (a square
// plate beside each post), and Retool's Cache (topics with their counts) on Mobbin. The topics
// filter the list in place (?topic= keeps the choice in the address); the newest article in the
// topic is the featured card; every article carries its plate. The prerender and no-JavaScript
// page show every article.

// The index shows each article's original post date only; updates and their dates live on the
// article itself (owner, 2026-11-27). The count line's date is the newest article's.
const LATEST = [...INSIGHTS].sort((x, y) => (x.date < y.date ? 1 : -1))[0];

// Topic · date · reading time: above the title on the featured card, in the side column of each row
// (owner, 2026-11-27).
function Meta({ a }: { a: Insight }) {
  return (
    <span className="ds-in-meta">
      <span>{a.category}</span>
      <time dateTime={a.date}>{a.dateLabel}</time>
      <span>{readingMinutes(a)} min read</span>
    </span>
  );
}

// The hero is `topics` (owner, 2026-11-19; the other forms removed 2026-11-22, tag
// options-archive-2026-11-22): from 1024px the five topics set large beside the headline, each with its
// count and an arrow, as the filter (the toggle row goes); below 1024px the headline, lead, and count with
// the topic toggles under them. The phone cards are `band` (owner, 2026-11-19): a 3:1 strip of the drawing
// across each card's top.

export default function Insights() {
  const [params, setParams] = useSearchParams();
  // The prerendered page shows every article; a ?topic= in the address applies once the page
  // has hydrated, so the first client render matches the static HTML.
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  const raw = ready ? params.get('topic') : null;
  const topic = (CATEGORIES as readonly string[]).includes(raw ?? '') ? (raw as InsightCategory) : null;
  const shown = topic ? INSIGHTS.filter((a) => a.category === topic) : INSIGHTS;
  const [lead, ...rest] = shown;

  const choose = (t: InsightCategory | null) => {
    const next = new URLSearchParams(params);
    if (t) next.set('topic', t);
    else next.delete('topic');
    setParams(next, { replace: true, preventScrollReset: true });
  };

  return (
    <main id="main" tabIndex={-1} className="ds ds-page ds-mk ds-in">
      <Seo path="/insights" />
      {/* Below 1024px this is the current hero exactly (the same opening classes, the toggle row
          under it); from 1024px the topics list stands beside the copy and the toggle row goes. */}
      <section className="ds-container ds-mk-open ds-mk-open-solo ds-in-h-topics" aria-labelledby="mk-title">
        <div className="ds-mk-open-copy">
        <h1 id="mk-title" className="ds-display-xl">Buying security, explained</h1>
          {/* Copy audit (2026-10-10): was "Insights." */}
          <p className="ds-lead">
            Plain answers on choosing coverage, running a post, contracting through GSA, and city
            licensing in Colorado.
          </p>
          <p className="ds-data ds-in-count">
            {INSIGHTS.length} articles · last updated <time dateTime={LATEST.date}>{LATEST.dateLabel}</time>
          </p>
        </div>
        <div className="ds-in-h-topiclist" role="group" aria-label="Topics">
          {[null, ...CATEGORIES].map((t) => {
            const n = t ? INSIGHTS.filter((a) => a.category === t).length : INSIGHTS.length;
            return (
              <button key={t ?? 'all'} type="button" className="ds-in-h-topic" aria-pressed={topic === t} onClick={() => choose(t)}>
                <span className="ds-in-h-topic-name">{t ?? 'All articles'}</span>
                <span className="ds-data">{String(n).padStart(2, '0')}</span>
                <Arrow size={18} />
              </button>
            );
          })}
        </div>
      </section>

      <div className="ds-container ds-in-body">
        <div className="ds-in-topics ds-in-topics-narrow" role="group" aria-label="Topics">
          {[null, ...CATEGORIES].map((t) => {
            const n = t ? INSIGHTS.filter((a) => a.category === t).length : INSIGHTS.length;
            return (
              <button key={t ?? 'all'} type="button" className="ds-in-topic" aria-pressed={topic === t} onClick={() => choose(t)}>
                {t ?? 'All'}
                <span className="ds-data">{n}</span>
              </button>
            );
          })}
        </div>
        <p className="nx-sr ds-in-sr" aria-live="polite">
          {topic ? `${shown.length} articles in ${topic}` : ''}
        </p>
        {lead && (
          <Link key={lead.slug} to={`/insights/${lead.slug}`} className="ds-in-feature">
            <span className="ds-in-feature-art">
              <InsightArt slug={lead.slug} size="lg" />
            </span>
            <span className="ds-in-feature-copy">
              <Meta a={lead} />
              <h2 className="ds-in-feature-title">{lead.title.replace(/\.$/, '')}</h2>
              <span className="ds-in-feature-sum">{lead.summary}</span>
              <span className="ds-in-feature-go">
                Read the article
                <Arrow size={16} />
              </span>
            </span>
          </Link>
        )}

        {rest.length > 0 && (
          <ul className="ds-in-list" data-rowcard="band" aria-label={topic ? `More in ${topic}` : 'All articles'}>
            {rest.map((a) => (
              <li key={a.slug}>
                <Link to={`/insights/${a.slug}`} className="ds-in-row">
                  <span className="ds-in-row-art">
                    <InsightArt slug={a.slug} size="sm" />
                  </span>
                  <span className="ds-in-row-copy">
                    <h2 className="ds-in-row-title">{a.title.replace(/\.$/, '')}</h2>
                    <span className="ds-in-row-sum">{a.summary}</span>
                  </span>
                  <Meta a={a} />
                  <Arrow size={18} />
                </Link>
              </li>
            ))}
          </ul>
        )}

        <AskStrip line="Have a question these don’t answer? Ask us about your site." quote="/contact" />
      </div>
    </main>
  );
}
