// The opening photograph (owner, 2026-10-08): downtown Denver at sunset with the Front Range
// (a real place, swapped with the Request a Quote page, which now has the generated towers).
// The 2400px original of contact-hero.jpg (hero1.jpg), as WebP, graded down to match.
const HERO = { src: '/images/services-hero/denver-sunset.webp', width: 2400, height: 1380 };

export default function Opening() {
  return (
    <section className="ds-svc-open" aria-labelledby="services-title">
      {/* The photo holds still (sticky) through the opening; a mirror of it (flipped
          vertically) sits above it so the glass frosts real image to the top. */}
      <div className="ds-svc-open-photo" aria-hidden="true">
        <div className="ds-svc-open-stack">
          <div className="ds-svc-open-mirror">
            <img src={HERO.src} alt="" width={HERO.width} height={HERO.height} decoding="async" />
          </div>
          <img src={HERO.src} alt="" width={HERO.width} height={HERO.height} decoding="async" {...{ fetchpriority: 'high' }} />
        </div>
      </div>

      {/* The glass and the copy scroll up and away over the still photo (owner, 2026-10-08);
          once they have passed under the nav the whole photo shows, then the page moves on. */}
      <div className="ds-svc-open-glass">
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
      </div>

      {/* One screen of the full photo after the glass has gone. */}
      <div className="ds-svc-open-hold" aria-hidden="true" />
    </section>
  );
}
