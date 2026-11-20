import { useEffect, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Arrow from '../Arrow';
import SwipeControls, { useSwipeRow } from '../SwipeControls';
import InsightArt from '../insights/InsightArt';
import { readingMinutes } from '../insights/meta';
import { INSIGHTS, type Insight } from '../market/insights';
import { readIn, useScene, words } from './engine';
import '../insights/insights.css';
import './nx-reading.css';

// Questions buyers ask (owner, 2026-11-20): a quiet stop between 02 The sites we protect and For prime
// contractors (moved up from before 05 Now hiring the same day, owner: too low) that links the Home to the Insights articles, for buyers who are not ready to call. Set at
// section size, not the Home's statement size, so it reads as an aside. Four whole versions (desktop
// and phone each) for the owner to compare at /?reading=cards|list|feature|questions, from Mobbin:
//  - cards: after Rox's, Chronicle's, and Instrument's "Latest articles". Three cards, each the
//    article's line drawing over its topic, reading time, and title. Phones: a swipe row with the
//    shared swipe controls.
//  - list: after Dovetail's "Resources for enterprise" and monday.com's "Top articles". The heading,
//    lead, and link on the left; four ruled rows on the right, no drawings. Phones: stacked.
//  - feature: after Greptile's "Latest" and Figma's blog. One article large with its drawing, two
//    smaller beside it. Phones: the large card, then two compact rows.
//  - questions: after Maze's "Popular articles" and Mailchimp's guides. Four buyer questions set
//    large, each a link to the article that answers it; on desktop the drawing beside them follows
//    the question pointed at or focused. Phones: the questions alone.
// `cards` is the default until the owner picks.
const OPTIONS = ['cards', 'list', 'feature', 'questions'] as const;
type Key = (typeof OPTIONS)[number];
const DEFAULT: Key = 'cards';

const pick = (slugs: string[]) =>
  slugs.map((s) => INSIGHTS.find((a) => a.slug === s)).filter((a): a is Insight => !!a);

// What a buyer asks first: cost, armed or unarmed, choosing a company, then licensing.
const THREE = pick(['security-guard-cost-colorado', 'armed-or-unarmed-security', 'how-to-choose-a-security-company-colorado']);
const FOUR = pick(['security-guard-cost-colorado', 'armed-or-unarmed-security', 'how-to-choose-a-security-company-colorado', 'colorado-security-licensing']);
// The questions version shows each article's own first question.
const ASKED = pick(['security-guard-cost-colorado', 'armed-or-unarmed-security', 'what-is-a-post-order', 'colorado-security-licensing']).map(
  (a) => ({ a, q: a.faq?.[0]?.q ?? a.title }),
);

const clean = (t: string) => t.replace(/\.$/, '');
const TITLE = 'Questions buyers ask.';
const LEAD = 'Plain answers on cost, coverage, and licensing in Colorado, for when you are still comparing.';

function Meta({ a }: { a: Insight }) {
  return (
    <span className="nx-rd-meta">
      <span>{a.category}</span>
      <span className="ds-data">{readingMinutes(a)} min read</span>
    </span>
  );
}

function AllLink({ className = '' }: { className?: string }) {
  return (
    <Link to="/insights" className={`ds-link nx-rd-all ${className}`}>
      All {INSIGHTS.length} articles
      <Arrow size={16} />
    </Link>
  );
}

function Head({ withAll = true }: { withAll?: boolean }) {
  return (
    <div className="nx-rd-head">
      <div className="nx-rd-headcopy">
        <h2 id="nx-reading-title" className="ds-display-lg nx-rd-title">
          {words(TITLE)}
        </h2>
        <p className="nx-rd-lead">{LEAD}</p>
      </div>
      {withAll && <AllLink className="nx-rd-all-top" />}
    </div>
  );
}

function Cards() {
  const row = useRef<HTMLUListElement>(null);
  const { at, go } = useSwipeRow(row, THREE.length);
  return (
    <>
      <Head />
      <ul ref={row} className="nx-rd-cards">
        {THREE.map((a) => (
          <li key={a.slug}>
            <Link to={`/insights/${a.slug}`} className="nx-rd-card">
              <span className="nx-rd-card-art">
                <InsightArt slug={a.slug} size="md" />
              </span>
              <span className="nx-rd-card-copy">
                <Meta a={a} />
                <span className="nx-rd-card-title">{clean(a.title)}</span>
                <Arrow size={18} />
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <SwipeControls count={THREE.length} at={at} go={go} noun="article" hint="Swipe" names={THREE.map((a) => clean(a.title))} />
      <AllLink className="nx-rd-all-foot" />
    </>
  );
}

function List() {
  return (
    <div className="nx-rd-split">
      <div className="nx-rd-side">
        <h2 id="nx-reading-title" className="ds-display-lg nx-rd-title">
          {words(TITLE)}
        </h2>
        <p className="nx-rd-lead">{LEAD}</p>
        <AllLink className="nx-rd-all-side" />
      </div>
      <ul className="nx-rd-rows">
        {FOUR.map((a) => (
          <li key={a.slug}>
            <Link to={`/insights/${a.slug}`} className="nx-rd-row">
              <span className="nx-rd-row-title">{clean(a.title)}</span>
              <span className="nx-rd-row-sum">{a.summary}</span>
              <Meta a={a} />
              <Arrow size={18} />
            </Link>
          </li>
        ))}
      </ul>
      <AllLink className="nx-rd-all-foot" />
    </div>
  );
}

function Feature() {
  const [lead, ...rest] = THREE;
  return (
    <>
      <Head />
      <div className="nx-rd-feat">
        <Link to={`/insights/${lead.slug}`} className="nx-rd-feat-lead">
          <span className="nx-rd-feat-art">
            <InsightArt slug={lead.slug} size="lg" />
          </span>
          <span className="nx-rd-feat-copy">
            <Meta a={lead} />
            <span className="nx-rd-feat-title">{clean(lead.title)}</span>
            <span className="nx-rd-feat-sum">{lead.summary}</span>
            <span className="nx-rd-feat-go">
              Read the article
              <Arrow size={16} />
            </span>
          </span>
        </Link>
        <ul className="nx-rd-feat-rest">
          {rest.map((a) => (
            <li key={a.slug}>
              <Link to={`/insights/${a.slug}`} className="nx-rd-mini">
                <span className="nx-rd-mini-art">
                  <InsightArt slug={a.slug} size="sm" />
                </span>
                <span className="nx-rd-mini-copy">
                  <span className="nx-rd-mini-title">{clean(a.title)}</span>
                  <Meta a={a} />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <AllLink className="nx-rd-all-foot" />
    </>
  );
}

function Questions() {
  const [on, setOn] = useState(0);
  return (
    <div className="nx-rd-split nx-rd-q">
      <div className="nx-rd-side">
        <h2 id="nx-reading-title" className="ds-display-lg nx-rd-title">
          {words(TITLE)}
        </h2>
        <p className="nx-rd-lead">{LEAD}</p>
        <AllLink className="nx-rd-all-side" />
        {/* The drawing for the question pointed at or focused (desktop only). */}
        <span className="nx-rd-q-art" aria-hidden="true">
          {ASKED.map((x, i) => (
            <span key={x.a.slug} className="nx-rd-q-plate" data-on={i === on}>
              <InsightArt slug={x.a.slug} size="md" />
            </span>
          ))}
        </span>
      </div>
      <ol className="nx-rd-qs">
        {ASKED.map((x, i) => (
          <li key={x.a.slug}>
            <Link
              to={`/insights/${x.a.slug}`}
              className="nx-rd-qlink"
              data-on={i === on}
              onMouseEnter={() => setOn(i)}
              onFocus={() => setOn(i)}
            >
              <span className="nx-rd-q-text">{x.q}</span>
              <span className="nx-rd-q-foot">
                <span>{clean(x.a.title)}</span>
                <span className="ds-data">{readingMinutes(x.a)} min read</span>
              </span>
              <Arrow size={22} />
            </Link>
          </li>
        ))}
      </ol>
      <AllLink className="nx-rd-all-foot" />
    </div>
  );
}

export default function Reading() {
  const ref = useRef<HTMLElement>(null);
  const [params] = useSearchParams();
  // The prerender shows the default; a ?reading= applies once the page's script runs.
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  const asked = ready ? params.get('reading') : null;
  const form: Key = (OPTIONS as readonly string[]).includes(asked ?? '') ? (asked as Key) : DEFAULT;

  useScene(ref, (e, root) => {
    readIn(e, root.querySelector('.nx-rd-title'));
  });

  return (
    <section ref={ref} id="reading" className="nx-reading" data-form={form} aria-labelledby="nx-reading-title">
      {form === 'cards' && <Cards />}
      {form === 'list' && <List />}
      {form === 'feature' && <Feature />}
      {form === 'questions' && <Questions />}
    </section>
  );
}
