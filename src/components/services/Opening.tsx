// The cover of the file: headline and lead, then the street photograph as a wide band
// fading into the canvas. The divisions follow directly below.
export default function Opening() {
  return (
    <section className="ds-svc-open" aria-labelledby="services-title">
      <div className="ds-container ds-svc-open-head">
        <h1 id="services-title" className="ds-display-xl">
          Security officers for six kinds of sites.
        </h1>
        <div className="ds-svc-open-side">
          <p className="ds-lead">
            Armed, unarmed, and cleared officers for federal, commercial, industrial, and
            institutional sites in Colorado Springs, Denver, and Pueblo. Find the division
            closest to your site.
          </p>
        </div>
      </div>

      <div className="ds-svc-band" aria-hidden="true">
        <img src="/images/capabilities-hero.jpg" alt="" width={2255} height={1864} decoding="async" {...{ fetchpriority: 'high' }} />
      </div>
    </section>
  );
}
