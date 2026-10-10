import Seo from '../seo/Seo';
import DocRail from '../components/home/DocRail';
import Opening from '../components/about/Opening';
import Staffing from '../components/about/Staffing';
import Commitments from '../components/about/Commitments';
import People from '../components/about/People';
import { ABOUT_MARKS } from '../components/about/data';

// About: "The Company File" (docs/about-concepts.md). Design authority: DESIGN.md.
// Content source: docs/about-content.md. Copy changes: docs/copy-changes.md.
export default function About() {
  return (
    <main id="main" tabIndex={-1} className="ds ds-page ds-ab">
      <Seo path="/about" />
      <Opening />
      <div className="ds-container ds-doc">
        <div className="ds-doc-body">
          <Staffing />
          <Commitments />
          <People />
        </div>
        <DocRail marks={ABOUT_MARKS} variant="counter" />
      </div>
    </main>
  );
}
