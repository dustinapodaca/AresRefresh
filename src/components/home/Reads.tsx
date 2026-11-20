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
// rows (a rule, the label, "View all" at the right) on Mobbin. Motion: the rule draws left to right
// as the strip comes up, scrubbed; drawn and still everywhere else.

// The three a buyer reaches for at this point of Home, ending on the escort guide, which hands off
// to the prime contractors block below it. Change the slugs here; any missing slug is skipped.
const PICKS = ['how-to-choose-a-security-company-colorado', 'security-guard-cost-colorado', 'contractor-escorts-military-bases'];

export default function Reads() {
  const ref = useRef<HTMLElement>(null);
  const picks = PICKS.map((s) => insightBySlug(s)).filter((a): a is NonNullable<typeof a> => Boolean(a));

  useScene(ref, (e, root) => {
    const rule = root.querySelector('.nx-reads-rule');
    if (!rule) return;
    e.gsap.fromTo(
      rule,
      { scaleX: 0 },
      { scaleX: 1, ease: 'none', scrollTrigger: { trigger: root, start: 'top 92%', end: 'top 58%', scrub: true } },
    );
  });

  if (!picks.length) return null;
  return (
    <section ref={ref} id="insights" className="nx-reads nx-edge" aria-labelledby="nx-reads-title">
      <span className="nx-reads-rule" aria-hidden="true" />
      <div className="nx-reads-head">
        <h2 id="nx-reads-title" className="nx-reads-title">Guides for buyers.</h2>
        <p className="nx-reads-line">Cost, licensing, and how a post runs in Colorado, written by the people who staff them.</p>
        <Link to="/insights" className="ds-link nx-reads-all">
          All {INSIGHTS.length} articles
          <Arrow size={14} />
        </Link>
      </div>
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
    </section>
  );
}
