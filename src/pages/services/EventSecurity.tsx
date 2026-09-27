import LandingLayout from '../../components/LandingLayout';

/* COPY-REVIEW — new marketing copy. Angle: dated, finite work with a
   headcount, which is operationally different from standing coverage. */

export default function EventSecurity() {
  return (
    <LandingLayout
      path="/services/event-security"
      crumb={{ label: 'Services', to: '/services' }}
      crumbCurrent="Event Security"
      h1={{ lead: 'Event and Surge', accent: 'Coverage' }}
      lede="Event work has a date, a headcount and no second chance. It is planned backwards from doors-open, which makes it a different job from standing a post."
      heroImage="/images/capability-hero.jpg"
      sections={[
        {
          kicker: '01 · Planning',
          heading: 'Backwards from doors-open.',
          body: [
            'We scope events from the schedule: when the venue opens, when attendance peaks, where people enter and leave, and which positions have to be filled before the first guest arrives. That determines headcount rather than the other way round.',
            'Bag and entry checks, crowd flow at bottlenecks, and a defined escalation path all get agreed in advance, so officers are not inventing policy at a door with a queue behind it.',
          ],
          bullets: [
            'Entry, bag-check and credential positions',
            'Crowd-flow coverage at known bottlenecks',
            'Agreed escalation path before doors open',
          ],
        },
        {
          kicker: '02 · Surge',
          heading: 'When existing coverage is not enough for one date.',
          body: [
            'Surge coverage is for properties that are already staffed but have a day that outgrows the roster — a seasonal peak, a conference, an all-hands, a single high-attendance day. We add officers to the existing post structure instead of replacing it.',
            'For clients already under contract with us, surge draws on the same on-call roster that backs their standing coverage, so the added officers are people who know the site.',
          ],
          bullets: [
            'Seasonal and holiday peaks',
            'Conferences and single-day high attendance',
            'Temporary expansion of an existing post',
          ],
        },
        {
          kicker: '03 · Venues',
          heading: 'Where we staff event work.',
          body: [
            'We cover events at commercial and hospitality venues, campuses and education facilities, healthcare sites, and government or municipal spaces. Armed and unarmed officers are both available depending on the venue and the audience.',
            'Officers are licensed for the jurisdiction, briefed on the specific venue before the date, and supervised on site rather than dropped off.',
          ],
        },
      ]}
      ctaHeading={{ lead: 'Have a date that needs', accent: 'covering?' }}
      ctaBody="Send the date, the site and an expected headcount. We respond within one business day."
    />
  );
}
