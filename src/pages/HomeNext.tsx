import { useEffect } from 'react';
import Seo from '../seo/Seo';
import NxHero from '../components/next/NxHero';
import NxRecord from '../components/next/NxRecord';
import NxIndustries from '../components/next/NxIndustries';
import NxPrime from '../components/next/NxPrime';
import NxQuality from '../components/next/NxQuality';
import NxCoverage from '../components/next/NxCoverage';
import NxCareers from '../components/next/NxCareers';
import NxContact from '../components/next/NxContact';
import { destroyEngine, loadEngine } from '../components/next/engine';
import '../components/next/next.css';

// /home-next (home-flora, 2026-10-20): the reimagined Home, built as a preview beside the live
// one (noindex, not in the sitemap) so the owner can compare them before any swap. One ground
// (the terrain), one line (a rust thread through every section), one camera (Lenis + GSAP
// ScrollTrigger), studied from flora.ai and Framer-built sites; the content is the live Home's.
export default function HomeNext() {
  useEffect(() => {
    loadEngine();
    return () => destroyEngine();
  }, []);
  return (
    <main id="main" tabIndex={-1} className="ds nx">
      <Seo path="/home-next" />
      <NxHero />
      <NxRecord />
      <NxIndustries />
      <NxPrime />
      <NxQuality />
      <NxCoverage />
      <NxCareers />
      <NxContact />
    </main>
  );
}
