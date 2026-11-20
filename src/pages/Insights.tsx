import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Seo from '../seo/Seo';
import Arrow from '../components/Arrow';
import { CATEGORIES, INSIGHTS, type Insight, type InsightCategory } from '../components/market/insights';
import { AskStrip } from '../components/market/parts';
import InsightArt from '../components/insights/InsightArt';
import { readingMinutes, shownDate } from '../components/insights/meta';
import '../components/insights/insights.css';

// Insights index, "The Reading Room" (2026-11-19; was ruled rows of title, summary, and date).
// After Linear's blog (line drawings on black cards, then a ruled list), Basedash (a square
// plate beside each post), and Retool's Cache (topics with their counts) on Mobbin. The topics
// filter the list in place (?topic= keeps the choice in the address); the newest article in the
// topic is the featured card; every article carries its plate. The prerender and no-JavaScript
// page show every article.

const LATEST = [...INSIGHTS].map((a) => shownDate(a)).sort((x, y) => (x.iso < y.iso ? 1 : -1))[0];

function Meta({ a }: { a: Insight }) {
  const d = shownDate(a);
  return (
    <span className="ds-in-meta">
      <span>{a.category}</span>
      <time className="ds-data" dateTime={d.iso}>{d.label}</time>
      <span className="ds-data">{readingMinutes(a)} min read</span>
    </span>
  );
}

// The hero, four forms for the owner to compare at /insights?hero=current|topics|front|ask|plates
// (owner, 2026-11-19: "better options for the insights hero", from Mobbin). `topics` is the
// default (owner, 2026-11-19), on desktop only: below 1024px it is `current` (the headline, lead,
// and count, the topic toggles under them), which the owner kept for phones.
//  - current: the hero before this round, at every width.
//  - topics: after Claude's blog. From 1024px the four topics set large beside the headline, each
//    with its count and an arrow; they are the filter (the toggle row goes). Below: as current.
//  - front: after Mural, Webflow, and Twingate. A front page: the newest article large on the left,
//    "Latest" (the next three) ruled on the right, all on the first screen.
//  - ask: after Airbnb's and Upwork's resource centers. A search over every article and its
//    questions, and five questions buyers ask, each a link to the article that answers it.
//  - plates: after Linear's and Slack's libraries. The line drawings of the six newest articles as
//    a wall beside the headline, each a link.
const HERO_OPTIONS = ['current', 'topics', 'front', 'ask', 'plates'] as const;
type HeroKey = (typeof HERO_OPTIONS)[number];

// The questions under the ask form's search: each article's first question, in the order buyers
// tend to ask them.
const ASKED = ['security-guard-cost-colorado', 'armed-or-unarmed-security', 'what-is-a-post-order', 'colorado-security-licensing', 'buying-security-through-gsa']
  .map((slug) => INSIGHTS.find((a) => a.slug === slug))
  .filter((a): a is Insight => !!a && !!a.faq?.length)
  .map((a) => ({ q: a.faq![0].q, slug: a.slug }));

// Everything a search can match: the title, summary, text, and questions.
const SEARCH_TEXT = new Map(
  INSIGHTS.map((a) => [
    a.slug,
    [a.title, a.summary, ...a.body.map((b) => ('p' in b ? b.p : 'h' in b ? b.h : 'list' in b ? b.list.join(' ') : '')), ...(a.faq ?? []).map((f) => `${f.q} ${f.a}`)]
      .join(' ')
      .toLowerCase(),
  ]),
);
const matches = (a: Insight, q: string) => {
  // Each word must start a word in the article ("id" finds "ID", not "provide").
  const words = q.toLowerCase().split(/\s+/).filter(Boolean);
  const text = SEARCH_TEXT.get(a.slug) ?? '';
  return words.every((w) => new RegExp(`(^|[^a-z0-9])${w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`).test(text));
};

const cleanTitle = (t: string) => t.replace(/\.$/, '');

export default function Insights() {
  const [params, setParams] = useSearchParams();
  // The prerendered page shows every article; a ?topic= in the address applies once the page
  // has hydrated, so the first client render matches the static HTML.
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  const raw = ready ? params.get('topic') : null;
  const topic = (CATEGORIES as readonly string[]).includes(raw ?? '') ? (raw as InsightCategory) : null;
  const askedHero = ready ? params.get('hero') : null;
  const hero: HeroKey = (HERO_OPTIONS as readonly string[]).includes(askedHero ?? '') ? (askedHero as HeroKey) : 'topics';
  const [query, setQuery] = useState('');
  const q = hero === 'ask' ? query.trim() : '';
  const inTopic = topic ? INSIGHTS.filter((a) => a.category === topic) : INSIGHTS;
  const shown = q ? inTopic.filter((a) => matches(a, q)) : inTopic;
  // The front page already shows the four newest; the list under it starts after them (until a
  // topic is chosen). A search lists its matches without a featured card.
  const frontTop = INSIGHTS.slice(0, 4);
  let lead: Insight | undefined;
  let rest: Insight[];
  if (hero === 'front') {
    lead = undefined;
    rest = topic ? shown : shown.slice(4);
  } else if (q) {
    lead = undefined;
    rest = shown;
  } else {
    [lead, ...rest] = shown;
  }

  const choose = (t: InsightCategory | null) => {
    const next = new URLSearchParams(params);
    if (t) next.set('topic', t);
    else next.delete('topic');
    setParams(next, { replace: true, preventScrollReset: true });
  };

  return (
    <main id="main" tabIndex={-1} className="ds ds-page ds-mk ds-in">
      <Seo path="/insights" />
      {hero === 'current' && (
        <section className="ds-container ds-mk-open ds-mk-open-solo" aria-labelledby="mk-title">
          <div className="ds-mk-open-copy">
          <h1 id="mk-title" className="ds-display-xl">Buying security, explained</h1>
          {/* Copy audit (2026-10-10): was "Insights." */}
            <p className="ds-lead">
              Plain answers on choosing coverage, running a post, contracting through GSA, and city
              licensing in Colorado.
            </p>
            <p className="ds-data ds-in-count">
              {INSIGHTS.length} articles · last updated <time dateTime={LATEST.iso}>{LATEST.label.replace(/^Updated /, '')}</time>
            </p>
          </div>
        </section>
      )}

      {hero === 'topics' && (
        // Below 1024px this is the current hero exactly (the same opening classes, the toggle row
        // under it); from 1024px the topics list stands beside the copy and the toggle row goes.
        <section className="ds-container ds-mk-open ds-mk-open-solo ds-in-h-topics" aria-labelledby="mk-title">
          <div className="ds-mk-open-copy">
          <h1 id="mk-title" className="ds-display-xl">Buying security, explained</h1>
            {/* Copy audit (2026-10-10): was "Insights." */}
            <p className="ds-lead">
              Plain answers on choosing coverage, running a post, contracting through GSA, and city
              licensing in Colorado.
            </p>
            <p className="ds-data ds-in-count">
              {INSIGHTS.length} articles · last updated <time dateTime={LATEST.iso}>{LATEST.label.replace(/^Updated /, '')}</time>
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
      )}

      {hero === 'front' && (
        <section className="ds-container ds-in-h ds-in-h-front" aria-labelledby="mk-title">
          <div className="ds-in-h-fronthead">
            <h1 id="mk-title" className="ds-display-lg">Buying security, explained</h1>
            <p className="ds-lead">
              Plain answers on choosing coverage, running a post, contracting through GSA, and city
              licensing in Colorado.
            </p>
          </div>
          <div className="ds-in-h-frontgrid">
            <Link to={`/insights/${frontTop[0].slug}`} className="ds-in-h-frontlead">
              <span className="ds-in-feature-art ds-in-h-frontart">
                <InsightArt slug={frontTop[0].slug} size="lg" />
              </span>
              <Meta a={frontTop[0]} />
              <h2 className="ds-in-h-fronttitle">{cleanTitle(frontTop[0].title)}</h2>
              <span className="ds-in-row-sum">{frontTop[0].summary}</span>
            </Link>
            <div className="ds-in-h-latest">
              <p className="ds-in-h-latest-title">Latest</p>
              <ul>
                {frontTop.slice(1).map((a) => (
                  <li key={a.slug}>
                    <Link to={`/insights/${a.slug}`}>
                      <span className="ds-in-h-latest-topic">{a.category}</span>
                      <span className="ds-in-h-latest-name">{cleanTitle(a.title)}</span>
                      <span className="ds-data">{readingMinutes(a)} min read</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      {hero === 'ask' && (
        <section className="ds-container ds-in-h ds-in-h-ask" aria-labelledby="mk-title">
          <div className="ds-in-h-copy">
          <h1 id="mk-title" className="ds-display-xl">Buying security, explained</h1>
            {/* Copy audit (2026-10-10): was "Insights." */}
            <p className="ds-lead">
              Plain answers on choosing coverage, running a post, contracting through GSA, and city
              licensing in Colorado.
            </p>
            <p className="ds-data ds-in-count">
              {INSIGHTS.length} articles · last updated <time dateTime={LATEST.iso}>{LATEST.label.replace(/^Updated /, '')}</time>
            </p>
          </div>
          <div className="ds-in-h-askbox">
            <label className="ds-in-h-search">
              <span className="nx-sr">Search the articles</span>
              <svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true">
                <circle cx="8.5" cy="8.5" r="5.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
                <path d="M13 13l4 4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search the articles and their questions"
                autoComplete="off"
              />
            </label>
            <p className="ds-in-h-asked-title">Questions buyers ask</p>
            <ul className="ds-in-h-asked">
              {ASKED.map((x) => (
                <li key={x.slug}>
                  <Link to={`/insights/${x.slug}#questions`}>
                    {x.q}
                    <Arrow size={14} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {hero === 'plates' && (
        <section className="ds-container ds-in-h ds-in-h-plates" aria-labelledby="mk-title">
          <div className="ds-in-h-copy">
          <h1 id="mk-title" className="ds-display-xl">Buying security, explained</h1>
            {/* Copy audit (2026-10-10): was "Insights." */}
            <p className="ds-lead">
              Plain answers on choosing coverage, running a post, contracting through GSA, and city
              licensing in Colorado.
            </p>
            <p className="ds-data ds-in-count">
              {INSIGHTS.length} articles · last updated <time dateTime={LATEST.iso}>{LATEST.label.replace(/^Updated /, '')}</time>
            </p>
          </div>
          <ul className="ds-in-h-wall">
            {INSIGHTS.slice(0, 6).map((a) => (
              <li key={a.slug}>
                <Link to={`/insights/${a.slug}`}>
                  <span className="ds-in-row-art ds-in-h-wallart">
                    <InsightArt slug={a.slug} size="sm" />
                  </span>
                  <span className="ds-in-h-wallname">{cleanTitle(a.title)}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <div className="ds-container ds-in-body">
        <div className={`ds-in-topics${hero === 'topics' ? ' ds-in-topics-narrow' : ''}`} role="group" aria-label="Topics">
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
          {q ? `${shown.length} articles match` : topic ? `${shown.length} articles in ${topic}` : ''}
        </p>
        {q && shown.length === 0 && (
          <p className="ds-in-empty">
            No article matches that yet. <Link to="/contact" className="ds-link">Ask us about your site</Link>.
          </p>
        )}

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
          <ul className="ds-in-list" aria-label={topic ? `More in ${topic}` : 'All articles'}>
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
