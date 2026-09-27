import LandingLayout from '../../components/LandingLayout';

/* COPY-REVIEW — new marketing copy. Permitted facts only; the sole clearance
   wording used anywhere is the approved sentence pair. No new statistics. */

export default function ArmedSecurity() {
  return (
    <LandingLayout
      path="/services/armed-security"
      crumb={{ label: 'Services', to: '/services' }}
      crumbCurrent="Armed Security"
      h1={{ lead: 'Armed Security', accent: 'Officers' }}
      lede="Armed posts carry a different standard of proof. Qualifications have to be current on the day the officer stands the post, and the paperwork has to survive an audit — not just exist."
      heroImage="/images/capability-hero.jpg"
      sections={[
        {
          kicker: '01 · Qualification',
          heading: 'Current at time of post.',
          body: [
            'Every armed officer we place holds state licensing and firearms qualifications that are current at the time they work the post, not at the time they were hired. We track expiry against the schedule, which is how a qualification gap never becomes your liability gap.',
            'Those records are available on request. For insurers and contracting officers, that is usually the first question asked and the slowest one to answer — so we keep it answerable.',
          ],
          bullets: [
            'State licensing current for the working jurisdiction',
            'Firearms qualifications verified against the schedule',
            'Documentation available on request, not reconstructed',
          ],
        },
        {
          kicker: '02 · Where it fits',
          heading: 'Sites where presence has to be unambiguous.',
          body: [
            'Armed coverage makes sense where the risk is cash, controlled materials, or a site whose insurer requires it. That commonly means banking and cash-handling environments, regulated facilities, utilities and critical infrastructure, and government posts.',
            'It is not the right answer everywhere. Where a site needs visible order and access control rather than force, unarmed coverage is the better and cheaper fit, and we will tell you so.',
          ],
          bullets: [
            'Cash-handling and banking environments',
            'Regulated and high-liability facilities',
            'Government and municipal posts',
            'Utility and critical-infrastructure sites',
          ],
        },
        {
          kicker: '03 · Operations',
          heading: 'Written orders, real supervision.',
          body: [
            'Armed posts get written post orders specific to the site, escalation paths agreed before deployment, and site-specific training completed before the first shift. Leadership works that first shift alongside the officer.',
            'On-call coverage is included in every contract, so an armed post does not go dark because one person called out. Facility clearance in process. Clearance-eligible hiring.',
          ],
        },
      ]}
      showProcess
      ctaHeading={{ lead: 'Need armed coverage', accent: 'scoped?' }}
      ctaBody="Send the site, the hours and any insurer requirement you are working to. We respond within one business day."
    />
  );
}
