import { Link, useParams } from 'react-router-dom';
import Seo from '../seo/Seo';
import Arrow from '../components/Arrow';
import NotFound from './NotFound';
import Crumbs from '../components/market/Crumbs';
import { ROLE_PAGES, SHARED_SHEET, SHEET_NOTE, capabilityFor, roleBySlug } from '../components/market/roles';
import { industryBySlug } from '../components/market/industries';
import { AskStrip, FaqSection, RouteRow, Sheet } from '../components/market/parts';
import { heroTitle } from '../lib/heroTitle';

// A role page ("The Post Sheet", docs/market-concepts.md): the service named as buyers
// search for it, its spec sheet, what the post covers, where we post it, questions, and the
// other services. Design authority: DESIGN.md.
export default function RolePage() {
  const { slug } = useParams();
  const role = roleBySlug(slug);
  if (!role) return <NotFound />;
  const cap = capabilityFor(role);
  const quote = `/contact?service=${role.slug}`;
  const others = ROLE_PAGES.filter((r) => r.slug !== role.slug);

  return (
    <main id="main" tabIndex={-1} className="ds ds-page ds-mk">
      <Seo path={`/services/${role.slug}`} />

      <section className="ds-container ds-mk-open" aria-labelledby="mk-title">
        <div className="ds-mk-open-copy">
          <Crumbs path={`/services/${role.slug}`} current={role.name} />
          <h1 id="mk-title" className="ds-display-xl">{heroTitle(role.title)}</h1>
          <p className="ds-lead">{role.lead}</p>
          <div className="ds-actions">
            <Link to={quote} className="ds-btn ds-btn-primary">
              Request a quote
              <Arrow />
            </Link>
            <a href="tel:+17196963966" className="ds-link">
              Call <span className="ds-data">719-696-3966</span>
            </a>
          </div>
        </div>
        <div className="ds-mk-sheet-wrap">
          <Sheet rows={[role.sheet, ...SHARED_SHEET]} label={`${role.name} at a glance`} />
          <p className="ds-mk-sheet-note">{SHEET_NOTE}</p>
        </div>
      </section>

      <div className="ds-container">
        {/* Written only for this service (copy audit service template, 2026-10-10). */}
        <section className="ds-mk-sec ds-mk-split" aria-labelledby="mk-how">
          <h2 id="mk-how" className="ds-display-lg">How it works at your site.</h2>
          <div className="ds-mk-prose"><p>{role.how}</p></div>
        </section>

        <section className="ds-mk-sec" aria-labelledby="mk-covers">
          <h2 id="mk-covers" className="ds-display-lg">What the post covers.</h2>
          <ol className="ds-mk-duties">
            {cap.includes.slice(0, 4).map((d, i) => (
              <li key={d.name}>
                <span className="ds-data ds-mk-n" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                <h3>{d.name}</h3>
                <p>{d.detail}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="ds-mk-sec ds-mk-sec-tight" aria-labelledby="mk-where">
          <h2 id="mk-where" className="ds-display-md">Where it is asked for.</h2>
          <RouteRow
            label="Industries"
            items={role.industries.map((s) => {
              const ind = industryBySlug(s)!;
              return { to: `/industries/${ind.slug}`, title: ind.name, line: ind.short };
            })}
          />
        </section>

        <FaqSection items={role.faq} />

        <AskStrip line={role.ask} quote={quote} />

        <nav className="ds-mk-sec" aria-labelledby="mk-more">
          <h2 id="mk-more" className="ds-display-md">More services.</h2>
          <RouteRow label="Other services" items={others.map((r) => ({ to: `/services/${r.slug}`, title: r.name, line: capabilityFor(r).line }))} />
        </nav>
      </div>
    </main>
  );
}
