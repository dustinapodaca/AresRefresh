// The cover of the file (owner, 2026-10-06): the street photograph fills the opening from
// the top of the page, like the other heroes. The top part, behind the nav, the headline,
// and the lead, sits under a band of dark glass (the footer's glass) whose edge falls where
// the crisp photo begins. The divisions follow directly below.
export default function Opening() {
  return (
    <section className="ds-svc-open" aria-labelledby="services-title">
      <div className="ds-svc-open-photo" aria-hidden="true">
        <img src="/images/hero6.jpg" alt="" width={2400} height={1600} decoding="async" {...{ fetchpriority: 'high' }} />
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
