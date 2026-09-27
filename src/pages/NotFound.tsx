import { Link } from 'react-router-dom';
import Seo from '../seo/Seo';

/**
 * Real 404. Netlify serves the prerendered dist/404.html with a 404 status
 * (see public/_redirects), which replaces the old `/* -> /index.html 200`
 * rule that turned every mistyped URL into a soft 404 duplicate of Home.
 */
export default function NotFound() {
  return (
    <main className="font-sans">
      <Seo path="/404" noindex />
      <section className="relative isolate flex min-h-[70vh] items-center overflow-hidden bg-ink pt-[240px] pb-[120px] text-paper max-[460px]:pt-[190px] max-[460px]:pb-[90px]">
        <div className="container-ares">
          <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-paper/55">Error 404</div>
          <h1
            className="mt-5 mb-0 font-normal text-paper"
            style={{ fontSize: 'clamp(40px, 6vw, 72px)', lineHeight: 0.94, letterSpacing: '-0.06em' }}
          >
            Page <span className="font-light italic text-light">not found.</span>
          </h1>
          <p className="mt-6 max-w-[54ch] text-[18px] text-paper/75">
            That page does not exist, or it has moved. Everything below is still where it should be.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link to="/" className="btn btn-white">Home</Link>
            <Link to="/services" className="btn btn-outline-white">Services</Link>
            <Link to="/contact" className="btn btn-outline-white">Request a Quote</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
