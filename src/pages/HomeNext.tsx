import { Seo } from '../seo/Seo';
import { MotionProvider, useMotionEngine } from '../components/home/motion';
import Ground from '../components/next/Ground';
import Thread from '../components/next/Thread';
import RouteRail from '../components/next/RouteRail';
import Details from '../components/next/Details';
import HeroNext from '../components/next/HeroNext';
import RecordNext from '../components/next/RecordNext';
import SitesNext from '../components/next/SitesNext';
import PrimesNext from '../components/next/PrimesNext';
import QualityNext from '../components/next/QualityNext';
import WhereNext from '../components/next/WhereNext';
import CareersNext from '../components/next/CareersNext';
import ContactNext from '../components/next/ContactNext';
import '../components/next/next.css';

// Home, reimagined (owner, 2026-10-19; blue-sky brief): the whole page built from Ares's own objects,
// the ground (the terrain), the line (I-25, a patrol route), the post (a site with a label, an ID,
// and a status), and the record (verifiable numbers). One ground under the page, one rust line
// through it, one camera moved by the scroll. A noindex preview at /home-next; the live Home is
// untouched until the owner chooses to swap. Without JavaScript, under reduced motion, and in the
// prerender it is a clean vertical page with stills in place.

export default function HomeNext() {
  const engine = useMotionEngine();
  return (
    <MotionProvider engine={engine}>
      <main id="main" tabIndex={-1} className="ds ds-page hn" data-motion={engine ? 'on' : undefined}>
        <Seo path="/home-next" />
        <HeroNext />
        <RecordNext />
        <SitesNext />
        <PrimesNext />
        <QualityNext />
        <WhereNext />
        <CareersNext />
        <ContactNext />
        {/* After the sections: their pins exist before the ground's waypoints and the line are measured. */}
        <Ground />
        <Thread />
        <RouteRail />
        <Details />
      </main>
    </MotionProvider>
  );
}
