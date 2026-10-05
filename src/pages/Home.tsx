import Seo from '../seo/Seo';
import Hero from '../components/home/Hero';
import DocRail from '../components/home/DocRail';
import Verify from '../components/home/Verify';
import Staffing from '../components/home/Staffing';
import Coverage from '../components/home/Coverage';
import Careers from '../components/home/Careers';
import Contact from '../components/home/Contact';

// Home: "The Dossier" (docs/concepts.md, Concept A). Design authority: DESIGN.md.
// Content source: docs/home-content.md. Copy changes: docs/copy-changes.md.
export default function Home() {
  return (
    <main className="ds ds-page">
      <Seo path="/" />
      <Hero />
      <div className="ds-container ds-doc">
        <div className="ds-doc-body">
          <Verify />
          <Staffing />
          <Coverage />
          <Careers />
          <Contact />
        </div>
        <DocRail />
      </div>
    </main>
  );
}
