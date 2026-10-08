// The opening photograph (owner, 2026-10-08): Denver towers at blue hour, generated with
// Nano Banana (assets/generated/services-hero/s1-towers.txt). The other options tried are
// recorded in assets/generated/README.md.
const HERO = { src: '/images/services-hero/nb-s1-towers.webp', width: 2400, height: 1350 };

export default function Opening() {
  return (
    <section className="ds-svc-open" aria-labelledby="services-title">
      <div className="ds-svc-open-photo" aria-hidden="true">
        <img src={HERO.src} alt="" width={HERO.width} height={HERO.height} decoding="async" {...{ fetchpriority: 'high' }} />
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
