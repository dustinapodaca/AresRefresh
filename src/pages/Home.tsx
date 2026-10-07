import Seo from '../seo/Seo';
import Hero from '../components/home/Hero';
import CredentialStrip from '../components/home/CredentialStrip';
import DocRail from '../components/home/DocRail';
import Record from '../components/home/Record';
import Quality from '../components/home/Quality';
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
      <CredentialStrip />
      <div className="ds-container ds-doc">
        <div className="ds-doc-body">
          <Record />
          <Quality />
          <Coverage />
          <Careers />
          <Contact />
        </div>
        <DocRail />
      </div>
    </main>
  );
}
