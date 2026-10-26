import Seo from '../seo/Seo';
import DocRail from '../components/home/DocRail';
import Opening from '../components/about/Opening';
import Founder from '../components/about/Founder';
import Heard from '../components/about/Heard';
import People from '../components/about/People';
import { ABOUT_MARKS } from '../components/about/data';
import { useScrollInViewObserver } from '../hooks/useScrollInViewObserver';

// About: "The Company File" (docs/about-concepts.md). Design authority: DESIGN.md.
// Content source: docs/about-content.md. Copy changes: docs/copy-changes.md.
export default function About() {
  // One scroll observer for the page (center, once), set up after the sections' own effects have
  // tagged their elements: on phones the credential rows in People (Heard watches its own cards).
  useScrollInViewObserver();
  return (
    <main id="main" tabIndex={-1} className="ds ds-page ds-ab">
      <Seo path="/about" />
      <Opening />
      <div className="ds-container ds-doc">
        <div className="ds-doc-body">
          <Founder />
          <Heard />
          <People />
        </div>
        <DocRail marks={ABOUT_MARKS} variant="ticks" />
      </div>
    </main>
  );
}
