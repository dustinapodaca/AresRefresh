import Seo from '../seo/Seo';
import DocRail from '../components/home/DocRail';
import Opening from '../components/services/Opening';
import Divisions from '../components/services/Divisions';
import Process from '../components/services/Process';
import Areas from '../components/services/Areas';
import Close from '../components/services/Close';
import { SERVICE_MARKS } from '../components/services/data';

// Services: "The Schedule" (docs/services-concepts.md, Concept A). Design authority:
// DESIGN.md. Content source: docs/services-content.md. Copy changes: docs/copy-changes.md.
export default function Services() {
  return (
    <main className="ds ds-page ds-svc">
      <Seo path="/services" />
      <Opening />
      <div className="ds-container ds-doc">
        <div className="ds-doc-body">
          <Divisions />
          <Process />
          <Areas />
          <Close />
        </div>
        <DocRail marks={SERVICE_MARKS} variant="dock" />
      </div>
    </main>
  );
}
