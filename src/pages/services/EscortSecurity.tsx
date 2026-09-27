import LandingLayout from '../../components/LandingLayout';

/* COPY-REVIEW — new marketing copy. Restricted-area escort is described only
   as a service; the single approved clearance sentence pair is the only
   clearance wording used. No site or installation is named. */

export default function EscortSecurity() {
  return (
    <LandingLayout
      path="/services/escort-security"
      crumb={{ label: 'Services', to: '/services' }}
      crumbCurrent="Escort Security"
      h1={{ lead: 'Escort Security', accent: 'Officers' }}
      lede="Escort is the post you need when someone has legitimate business on site but cannot be left unaccompanied. It is quiet, procedural work, and it fails loudly when it is staffed casually."
      heroImage="/images/capability-hero.jpg"
      sections={[
        {
          kicker: '01 · The requirement',
          heading: 'Accompanied access, properly logged.',
          body: [
            'Contractors, vendors, delivery personnel and visitors frequently need access to areas they are not cleared to enter alone. An escort officer accompanies them for the duration, controls what they can reach, and records the visit so there is an account of who was where and when.',
            'Restricted-area escort is available where a site requires accompanied movement through controlled space. Facility clearance in process. Clearance-eligible hiring.',
          ],
          bullets: [
            'Contractor and vendor escort',
            'Visitor and delivery accompaniment',
            'Restricted-area accompanied movement',
            'Time-stamped visit records',
          ],
        },
        {
          kicker: '02 · Why it is different',
          heading: 'Procedure, not presence.',
          body: [
            'An escort officer is not primarily a deterrent. The value is procedural: knowing the boundaries of the area, knowing what the visitor is permitted to do, and being willing to stop work that drifts outside it — politely, and every time.',
            'We train escort officers on the specific site and its access rules before their first shift, because the rules are the job. Written post orders define the boundaries rather than leaving them to judgment.',
          ],
        },
        {
          kicker: '03 · Fit',
          heading: 'Where escort posts come up.',
          body: [
            'Escort coverage is most often requested at government and municipal facilities, utility and critical-infrastructure sites, healthcare environments with controlled areas, and industrial or construction sites during active work by outside trades.',
            'Officers are licensed for the jurisdiction, and on-call coverage is written into the contract so an escort post does not lapse and strand a vendor at a gate.',
          ],
        },
      ]}
      showProcess
      ctaHeading={{ lead: 'Need accompanied', accent: 'site access?' }}
      ctaBody="Tell us the site, the areas involved and how often escort is needed. We respond within one business day."
    />
  );
}
