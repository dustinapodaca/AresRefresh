import Seo from '../seo/Seo';
import DocRail from '../components/home/DocRail';
import Opening from '../components/careers/Opening';
import { Apply, Roles, Why } from '../components/careers/Sections';
import { CAREER_MARKS } from '../components/careers/data';

// Careers: "The Roster" (docs/careers-concepts.md). Design authority: DESIGN.md.
// Content: docs/careers-content.md.
export default function Careers() {
  return (
    <main className="ds ds-page ds-cr">
      <Seo path="/careers" />
      <Opening />
      <div className="ds-container ds-doc">
        <div className="ds-doc-body">
          <Roles />
          <Why />
          <Apply />
        </div>
        <DocRail marks={CAREER_MARKS} variant="list" />
      </div>
    </main>
  );
}
