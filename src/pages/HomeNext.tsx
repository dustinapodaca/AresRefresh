import { Seo } from '../seo/Seo';
import { MotionProvider, useMotionEngine } from '../components/home/motion';
import Ground from '../components/next/Ground';
import Thread from '../components/next/Thread';
import RouteRail from '../components/next/RouteRail';
import Details from '../components/next/Details';
import HeroNext from '../components/next/HeroNext';
import RecordNext from '../components/next/RecordNext';
import '../components/next/next.css';

// Home, reimagined (owner, 2026-10-19; blue-sky brief): the whole page built from Ares's own objects,
// the ground (the terrain), the line (I-25, a patrol route), the post (a site with a label, an ID,
// and a status), and the record (verifiable numbers). One ground under the page, one rust line
// through it, one camera moved by the scroll. A noindex preview at /home-next; the live Home is
// untouched until the owner chooses to swap. Without JavaScript, under reduced motion, and in the
// prerender it is a clean vertical page with stills in place.
const PLACEHOLDERS = [
  ['industries', 'The sites we protect.'],
  ['primes', 'For prime contractors.'],
  ['quality', 'Quality over quantity.'],
  ['coverage', 'Where we work.'],
  ['careers', 'Now hiring armed and unarmed officers.'],
  ['contact', 'Request a quote, or call us.'],
] as const;

export default function HomeNext() {
  const engine = useMotionEngine();
  return (
    <MotionProvider engine={engine}>
      <main id="main" tabIndex={-1} className="ds ds-page hn" data-motion={engine ? 'on' : undefined}>
        <Seo path="/home-next" />
        <Ground />
        <HeroNext />
        <RecordNext />
        {PLACEHOLDERS.map(([id, t]) => (
          <section key={id} id={id} className="hn-section hn-placeholder">
            <div className="ds-container">
              <h2 className="hn-statement">{t}</h2>
              <i className="hn-mark" data-thread={id === 'contact' ? 'end' : 'x'} />
            </div>
          </section>
        ))}
        <Thread />
        <RouteRail />
        <Details />
      </main>
    </MotionProvider>
  );
}
