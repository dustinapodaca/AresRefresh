import { useEffect } from 'react';
import Seo from '../seo/Seo';
import Hero from '../components/home/Hero';
import Record from '../components/home/Record';
import Industries from '../components/home/Industries';
import Prime from '../components/home/Prime';
import Quality from '../components/home/Quality';
import Coverage from '../components/home/Coverage';
import Careers from '../components/home/Careers';
import Contact from '../components/home/Contact';
import { destroyEngine, loadEngine } from '../components/home/engine';
import '../components/home/home.css';

// Home (home-flora, 2026-10-20; the official Home since 2026-10-20, owner): one ground (the
// terrain), one line (a rust thread through every section), one camera (GSAP ScrollTrigger on
// native scroll), studied from flora.ai and Framer-built sites. Design authority: DESIGN.md
// ("Home"). Copy changes: docs/copy-changes.md.
export default function Home() {
  useEffect(() => {
    loadEngine();
    return () => destroyEngine();
  }, []);
  return (
    <main id="main" tabIndex={-1} className="ds nx">
      <Seo path="/" />
      <Hero />
      <Record />
      <Industries />
      <Prime />
      <Quality />
      <Coverage />
      <Careers />
      <Contact />
    </main>
  );
}
