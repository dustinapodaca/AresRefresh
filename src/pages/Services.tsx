import Seo from '../seo/Seo';
import DocRail from '../components/home/DocRail';
import Opening from '../components/services/Opening';
import Divisions from '../components/services/Divisions';
import Process from '../components/services/Process';
import { Capabilities } from '../components/capability/Sections';
import Relief from '../components/services/Relief';
import Areas from '../components/services/Areas';
import { SERVICE_MARKS } from '../components/services/data';

// Services: "The Schedule" (docs/services-concepts.md, Concept A). Design authority:
// DESIGN.md. Content source: docs/services-content.md. Copy changes: docs/copy-changes.md.
export default function Services() {
  return (
    <main id="main" tabIndex={-1} className="ds ds-page ds-svc">
      <Seo path="/services" />
      <Opening />
      <div className="ds-container ds-doc">
        <div className="ds-doc-body">
          {/* The six services first (owner, 2026-10-18, web audit): the Capability Statement's
              cards, which replace the "By role." list; the industries follow. */}
          <Capabilities onServices />
          <Divisions />
          <Process />
          <Relief />
          <Areas />
        </div>
        <DocRail marks={SERVICE_MARKS} variant="dock" />
      </div>
    </main>
  );
}
