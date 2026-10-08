import { ROLE_PAGES, capabilityFor } from '../market/roles';
import { INDUSTRY_PAGES } from '../market/industries';
import { RouteRow } from '../market/parts';

// 02 By role and industry (2026-10-08): every service and every industry has its own page;
// this is the index to them, right under the divisions.
export default function Browse() {
  return (
    <section id="browse" className="ds-svc-browse" aria-labelledby="browse-title">
      <h2 id="browse-title" className="ds-display-lg">By role, or by industry.</h2>
      <h3 id="roles" className="ds-svc-browse-sub">Services</h3>
      <RouteRow label="Services by role" items={ROLE_PAGES.map((r) => ({ to: `/services/${r.slug}`, title: r.name, line: capabilityFor(r).line }))} />
      <h3 id="industries" className="ds-svc-browse-sub">Industries</h3>
      <RouteRow label="Industries" items={INDUSTRY_PAGES.map((i) => ({ to: `/industries/${i.slug}`, title: i.name, line: i.short }))} />
    </section>
  );
}
