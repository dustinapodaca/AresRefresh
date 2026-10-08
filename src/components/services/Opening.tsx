// The opening photograph (owner, 2026-10-08): downtown Denver at sunset with the Front Range
// (a real place, swapped with the Request a Quote page, which now has the generated towers).
const HERO = { src: '/images/contact-hero.jpg', width: 1400, height: 805 };

export default function Opening() {
  return (
    <section className="ds-svc-open" aria-labelledby="services-title">
      {/* The photo sits 164px lower; above it, a mirror of it (flipped vertically) fills the
          opening to the top, so the glass frosts real image all the way up (owner,
          2026-10-08). */}
      <div className="ds-svc-open-photo" aria-hidden="true">
        <div className="ds-svc-open-stack">
          <div className="ds-svc-open-mirror">
            <img src={HERO.src} alt="" width={HERO.width} height={HERO.height} decoding="async" />
          </div>
          <img src={HERO.src} alt="" width={HERO.width} height={HERO.height} decoding="async" {...{ fetchpriority: 'high' }} />
        </div>
      </div>
      <div className="ds-svc-open-glass" aria-hidden="true" />

      <div className="ds-container ds-svc-open-head">
        <h1 id="services-title" className="ds-display-xl">
          Security officers for six kinds of sites.
        </h1>
        <div className="ds-svc-open-side">
          <p className="ds-lead">
            Armed and unarmed officers for federal, commercial, industrial, and
            institutional sites in Colorado Springs, Denver, and Pueblo. Find the division
            closest to your site.
          </p>
        </div>
      </div>

      {/* Holds the open, crisp part of the photograph below the glass. */}
      <div className="ds-svc-band" aria-hidden="true" />
    </section>
  );
}
