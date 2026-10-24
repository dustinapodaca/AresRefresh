import { useEffect } from 'react';
import Seo from '../seo/Seo';
import SvHero from '../components/svc/SvHero';
import SvServices from '../components/svc/SvServices';
import SvIndustries from '../components/svc/SvIndustries';
import SvProcess from '../components/svc/SvProcess';
import SvRelief from '../components/svc/SvRelief';
import SvClose from '../components/svc/SvClose';
import { destroyEngine, loadEngine } from '../components/home/engine';
import '../components/home/home.css';
import '../components/svc/svc.css';

// Services in flora.ai's language (home-flora bundle 3, 2026-10-22; trying it at /services,
// owner 2026-10-23, uncommitted: the page before it is tag safe-2026-10-23-931e70d). Studied from
// FLORA on Mobbin: the hero canvas of labeled nodes joined by wires, the numbered panels with a
// working piece of the product inside each, the card rows, the workflow canvas, the cursors, and
// the one-line close. Ares's content only (the six services, the six industries, the four stages,
// the relief schedule, the three cities), on the Home's scroll engine. The industries section
// keeps the old page's #divisions and the close #areas, so links from other pages still land.
export default function Services() {
  useEffect(() => {
    loadEngine();
    return () => destroyEngine();
  }, []);
  return (
    <main id="main" tabIndex={-1} className="ds nx sv">
      <Seo path="/services" />
      <SvHero />
      <SvServices />
      <SvIndustries />
      <SvProcess />
      <SvRelief />
      <SvClose />
    </main>
  );
}
