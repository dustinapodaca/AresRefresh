import { Link } from 'react-router-dom';
import Crumbs from '../market/Crumbs';
import { FaqSection } from '../market/parts';
import Seo from '../../seo/Seo';
import Arrow from '../Arrow';
import LocationMap from './LocationMap';
import { CITIES, type LocationFile } from './data';
import { DIVISIONS } from '../services/data';

// Each site type links to its industry's own page (copy audit, 2026-10-10; was the Services
// card), falling back to the card if an industry has no page.
const industryPage = (id: string) => DIVISIONS.find((d) => d.id === id)?.page?.to ?? `/services#${id}`;

// A location page: "The Local File" (docs/locations-concepts.md). It answers the search
// ("security guards in <city>"), shows the city's own license, lists the sites we are
// ready to staff there, then hands the reader on to the rest of the site. Design
// authority: DESIGN.md.
const ROUTES = [
  { to: '/services', title: 'Services', line: 'Six services, six industries, and how a post starts' },
  { to: '/capability-statement', title: 'Capability Statement', line: 'GSA, UEI, CAGE, and the one-page PDF' },
  { to: '/about', title: 'About Ares', line: 'Who we are and how we work' },
];

export default function LocationPage({ file }: { file: LocationFile }) {
  const others = CITIES.filter((c) => c.slug !== file.city.slug);

  return (
    <main id="main" tabIndex={-1} className="ds ds-page ds-loc">
      <Seo path={file.path} />

      <section className="ds-loc-open" aria-labelledby="loc-title">
        <div className="ds-container ds-loc-open-grid">
          <div className="ds-loc-open-copy">
            <Crumbs path={file.path} current={file.city.name} />
            <h1 id="loc-title" className="ds-display-xl">{file.title}</h1>
            <p className="ds-lead">{file.lead}</p>
            {/* Below 1024px only: from there up the nav carries the quote button. */}
            <div className="ds-actions ds-loc-actions">
              <Link to="/contact" className="ds-btn ds-btn-primary">
                Request a quote
                <Arrow />
              </Link>
              <a href="tel:+17196963966" className="ds-link">
                Call <span className="ds-data">719-696-3966</span>
              </a>
            </div>
          </div>
          <LocationMap focus={file.city} landmarks={file.landmarks} focusSide={file.focusSide} />
        </div>
      </section>

      <div className="ds-container">
        {/* Only this city's page says this (copy audit, 2026-10-10). */}
        <section className="ds-loc-local ds-mk-split" aria-labelledby="loc-local-title">
          <h2 id="loc-local-title" className="ds-display-lg">Security in {file.city.name}.</h2>
          <div className="ds-mk-prose"><p>{file.local}</p></div>
        </section>

        <section className="ds-loc-license" aria-labelledby="loc-license-title">
          <div className="ds-loc-license-head">
            <h2 id="loc-license-title" className="ds-display-lg">{file.licenseTitle}</h2>
            <p className="ds-body">{file.licenseIntro}</p>
          </div>
          <dl className="ds-loc-ledger">
            {file.license.map((r) => (
              <div className="ds-ledger-row" key={r.label}>
                <dt>{r.label}</dt>
                <dd className={r.mono ? 'ds-data' : 'ds-note'}>{r.value}</dd>
                {r.route && (
                  <dd className="ds-ledger-route">
                    {'links' in r.route ? (
                      <span className="ds-loc-routes-inline">
                        {r.route.links.map((l) => (
                          <a
                            key={l.label}
                            href={l.href}
                            className="ds-link"
                            {...(l.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                          >
                            {l.label}
                            <Arrow external={l.external} size={14} />
                          </a>
                        ))}
                      </span>
                    ) : (
                      // One line (owner, 2026-10-09; it was two lines briefly).
                      <span className="ds-small ds-loc-note">{r.route.note}</span>
                    )}
                  </dd>
                )}
              </div>
            ))}
          </dl>
        </section>

        <section className="ds-loc-sectors" aria-labelledby="loc-sectors-title">
          <h2 id="loc-sectors-title" className="ds-display-md">{file.sectorsTitle}</h2>
          {/* Two columns read downward; the first column's last row closes with a rule. */}
          <ul className="ds-loc-sector-list" style={{ ['--rows' as string]: Math.ceil(file.sectors.length / 2) }}>
            {file.sectors.map((s, i) => (
              <li key={s.name} data-col-end={i === Math.ceil(file.sectors.length / 2) - 1 || undefined}>
                <Link to={industryPage(s.divisionId)}>
                  <span className="ds-loc-sector">{s.name}</span>
                  <span className="ds-small">{s.division}</span>
                  <Arrow size={16} />
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <FaqSection items={file.faq} />

        <nav className="ds-loc-next" aria-labelledby="loc-next-title">
          <h2 id="loc-next-title" className="sr-only">Where to next</h2>
          <ul className="ds-loc-routes">
            {ROUTES.map((r) => (
              <li key={r.to}>
                <Link to={r.to}>
                  <span className="ds-loc-route-title">{r.title}</span>
                  <span className="ds-small">{r.line}</span>
                  <Arrow size={20} />
                </Link>
              </li>
            ))}
          </ul>
          <p className="ds-loc-also">
            Also licensed in{' '}
            {others.map((c, i) => (
              <span key={c.slug}>
                {i > 0 && ' and '}
                <Link to={c.path} className="ds-link">{c.name}</Link>
              </span>
            ))}
            .
          </p>
        </nav>
      </div>
    </main>
  );
}
