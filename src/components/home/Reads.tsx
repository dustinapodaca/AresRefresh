import { useRef } from 'react';
import { Link } from 'react-router-dom';
import Arrow from '../Arrow';
import InsightArt from '../insights/InsightArt';
import { readingMinutes } from '../insights/meta';
import { INSIGHTS, insightBySlug } from '../market/insights';
import { useScene } from './engine';
import '../insights/insights.css';
import './nx-reads.css';

// From the Insights (2026-11-20, owner: a way into the articles from Home, "not a huge section like
// the others"). An interlude between 02 The sites we protect and For prime contractors, not a
// numbered section: no Statement headline, no pin, no rail mark. A small head on a hairline-strong
// rule (the heading, one line, and "All N articles") over three articles in a ruled row, each its
// small plate beside its title. After Linear's "More news" list and Squarespace's and Rox's header
// rows (a rule, the label, "View all" at the right) on Mobbin. Motion: the list's top rule draws left
// to right as it comes up, scrubbed; drawn and still everywhere else. Reworked 2026-11-20 (owner):
// the rule moved from above the heading to the top of the list (no rule between sections), the
// heading and line stacked on the left, larger plates, cost / armed or unarmed / choosing, and the
// "All articles" link after the list on phones. Shown at /?reading=strip, the default (Reading.tsx).

// The three a buyer asks first: cost, armed or unarmed, and how to choose a company (owner,
// 2026-11-20; the escort guide was third, but it speaks only to federal buyers and the prime block
// below covers them). Change the slugs here; any missing slug is skipped.
const PICKS = ['security-guard-cost-colorado', 'armed-or-unarmed-security', 'how-to-choose-a-security-company-colorado'];

export default function Reads() {
  const ref = useRef<HTMLElement>(null);
  const picks = PICKS.map((s) => insightBySlug(s)).filter((a): a is NonNullable<typeof a> => Boolean(a));

  useScene(ref, (e, root) => {
    const rule = root.querySelector('.nx-reads-rule');
    if (!rule) return;
    e.gsap.fromTo(
      rule,
      { scaleX: 0 },
      { scaleX: 1, ease: 'none', scrollTrigger: { trigger: rule, start: 'top 92%', end: 'top 62%', scrub: true } },
    );
  });

  if (!picks.length) return null;
  return (
    <section ref={ref} id="insights" className="nx-reads nx-edge" aria-labelledby="nx-reads-title">
      <div className="nx-reads-head">
        <h2 id="nx-reads-title" className="nx-reads-title">Questions buyers ask.</h2>
        <p className="nx-reads-line">Plain answers on cost, coverage, and licensing in Colorado, for when you are still comparing.</p>
        <Link to="/insights" className="ds-link nx-reads-all nx-reads-all-top">
          All {INSIGHTS.length} articles
          <Arrow size={14} />
        </Link>
      </div>
      {/* The list's own top rule, not a rule between sections (owner, 2026-11-20): it draws left to
          right as the list comes up. */}
      <span className="nx-reads-rule" aria-hidden="true" />
      <ol className="nx-reads-list">
        {picks.map((a) => (
          <li key={a.slug}>
            <Link to={`/insights/${a.slug}`} className="nx-read">
              <span className="nx-read-art">
                <InsightArt slug={a.slug} size="sm" grid={false} />
              </span>
              <span className="nx-read-copy">
                <span className="nx-read-meta">
                  <span>{a.category}</span>
                  <span className="ds-data">{readingMinutes(a)} min read</span>
                </span>
                <span className="nx-read-title">{a.title.replace(/\.$/, '')}</span>
              </span>
              <span className="nx-read-go" aria-hidden="true">
                <Arrow size={16} />
              </span>
            </Link>
          </li>
        ))}
      </ol>
      {/* Phones: the link to all of them after the three. */}
      <Link to="/insights" className="ds-link nx-reads-all nx-reads-all-foot">
        All {INSIGHTS.length} articles
        <Arrow size={14} />
      </Link>
    </section>
  );
}
