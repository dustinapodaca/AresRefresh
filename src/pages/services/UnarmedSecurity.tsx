import LandingLayout from '../../components/LandingLayout';

/* COPY-REVIEW — new marketing copy. Angle is deliberately the inverse of the
   armed page: customer-facing presence and access control, not force. */

export default function UnarmedSecurity() {
  return (
    <LandingLayout
      path="/services/unarmed-security"
      crumb={{ label: 'Services', to: '/services' }}
      crumbCurrent="Unarmed Security"
      h1={{ lead: 'Unarmed Security', accent: 'Officers' }}
      lede="Most posts are not about force. They are about someone being visibly present, knowing who belongs on site, and handling the first ninety seconds of a problem correctly."
      heroImage="/images/capability-hero.jpg"
      sections={[
        {
          kicker: '01 · The post',
          heading: 'Fixed posts, gates and lobbies.',
          body: [
            'Unarmed officers cover reception and lobby desks, vehicle and pedestrian gates, and visitor-control points where the job is to verify, log and direct. The officer is often the first person a visitor speaks to, so we staff for composure as much as for deterrence.',
            'Where a property needs movement rather than a stationary officer, the same coverage extends to foot patrol on a documented route with recorded checkpoints.',
          ],
          bullets: [
            'Reception, lobby and front-desk posts',
            'Vehicle and pedestrian gate control',
            'Visitor verification, logging and badging',
            'Documented foot patrol routes',
          ],
        },
        {
          kicker: '02 · Environments',
          heading: 'Where a calm presence does the work.',
          body: [
            'Commercial and retail properties, hospitality, healthcare, education and campus environments all tend to need the same thing: coverage that reduces incidents without making the place feel hostile to the people using it.',
            'We also staff industrial, construction and utility sites where access control is the main requirement and a weapon would add liability rather than remove it.',
          ],
        },
        {
          kicker: '03 · Standards',
          heading: 'The same documentation as an armed post.',
          body: [
            'Unarmed does not mean informal. Officers are licensed for the jurisdiction, trained on your site before their first shift, and working from written post orders with a defined escalation path.',
            'On-call coverage is written into every contract, and reporting is built so a property manager can read what happened without chasing anyone for it.',
          ],
        },
      ]}
      showProcess
      ctaHeading={{ lead: 'Staffing a lobby, gate', accent: 'or front desk?' }}
      ctaBody="Send the site, the hours and the shift pattern you need covered. We respond within one business day."
    />
  );
}
