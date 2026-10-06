import Seo from '../seo/Seo';
import DocRail from '../components/home/DocRail';
import Hero from '../components/capability/Hero';
import { Buy, Capabilities, Credentials, Download, Why } from '../components/capability/Sections';
import { CAP_MARKS } from '../components/capability/data';

// Capability Statement: "The Statement, Served" (docs/capability-concepts.md). Design
// authority: DESIGN.md. Content: docs/capability-content.md (all of it carries over).
export default function CapabilityStatement() {
  return (
    <main className="ds ds-page ds-cs">
      <Seo path="/capability-statement" />
      <Hero />
      <div className="ds-container ds-doc">
        <div className="ds-doc-body">
          <Capabilities />
          <Why />
          <Buy />
          <Credentials />
          <Download />
        </div>
        <DocRail marks={CAP_MARKS} />
      </div>
    </main>
  );
}
