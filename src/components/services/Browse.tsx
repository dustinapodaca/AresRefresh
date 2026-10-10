import { ROLE_PAGES, capabilityFor } from '../market/roles';
import { RouteRow } from '../market/parts';

// 02 By role (2026-10-08; owner, 2026-10-10: the industries list moved into the six industry
// cards above, so this index is the services only).
export default function Browse() {
  return (
    <section id="browse" className="ds-svc-browse" aria-labelledby="browse-title">
      <h2 id="browse-title" className="ds-display-lg">By role.</h2>
      <h3 id="roles" className="ds-svc-browse-sub">Services</h3>
      <RouteRow label="Services by role" items={ROLE_PAGES.map((r) => ({ to: `/services/${r.slug}`, title: r.name, line: capabilityFor(r).line }))} />
    </section>
  );
}
