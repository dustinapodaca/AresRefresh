import LandingLayout from '../../components/LandingLayout';

/* COPY-REVIEW — new marketing copy. Angle: documented routes and auditable
   checkpoint logs, i.e. proof the patrol actually happened. */

export default function MobilePatrol() {
  return (
    <LandingLayout
      path="/services/mobile-patrol"
      crumb={{ label: 'Services', to: '/services' }}
      crumbCurrent="Mobile Patrol"
      h1={{ lead: 'Foot and Mobile', accent: 'Patrol' }}
      lede="A patrol is only worth what it can prove. Ours run documented routes with recorded checkpoints, so the log answers whether the officer was actually at the back gate at 2 a.m."
      heroImage="/images/capability-hero.jpg"
      sections={[
        {
          kicker: '01 · Proof',
          heading: 'Documented routes, auditable logs.',
          body: [
            'Each patrol works an agreed route with defined checkpoints, and each pass is recorded. That record is the deliverable as much as the presence is — it is what lets you show an insurer, an owner or a contracting officer that coverage happened as contracted.',
            'Routes are set with you rather than inherited. If a site has a problem corner, it becomes a checkpoint instead of a note someone hopefully remembers.',
          ],
          bullets: [
            'Agreed route with fixed checkpoints',
            'Time-stamped record of every pass',
            'Reporting written for review, not filing',
          ],
        },
        {
          kicker: '02 · Coverage model',
          heading: 'When a patrol beats a fixed post.',
          body: [
            'Patrol is the right answer when a property is too large for one post, when the risk window is after hours, or when several nearby addresses can be covered by one officer in rotation. It is also how a multi-site contract stays affordable without leaving buildings unattended.',
            'Foot patrol suits campuses, interiors and dense sites. Vehicle patrol suits perimeters, yards and properties spread across distance.',
          ],
          bullets: [
            'After-hours and overnight coverage',
            'Perimeter, yard and laydown-area checks',
            'Multi-address rotation on a single contract',
            'Alarm and call-out response',
          ],
        },
        {
          kicker: '03 · Reliability',
          heading: 'A route that does not get skipped.',
          body: [
            'On-call coverage is part of every contract, and we hold missed shifts under one percent — which matters more on patrol than anywhere else, because an unstaffed patrol is invisible until something has already happened.',
            'Officers are trained on your site and your route before their first shift, and leadership works that first shift with them.',
          ],
        },
      ]}
      showProcess
      ctaHeading={{ lead: 'Need a patrol route', accent: 'built?' }}
      ctaBody="Send the site or address list, the hours you want covered, and any problem areas. We respond within one business day."
    />
  );
}
