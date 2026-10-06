import LandingLayout from '../../components/LandingLayout';

/* COPY-REVIEW — new marketing copy. Denver angle is deliberately different
   from the Colorado Springs page: metro-scale, multi-site portfolios and
   surge work, rather than "we are headquartered here". */

export default function Denver() {
  return (
    <LandingLayout
      path="/locations/denver"
      crumb={{ label: 'Service Areas', to: '/services' }}
      crumbCurrent="Denver"
      h1={{ lead: 'Security Guard Services in', accent: 'Denver' }}
      lede="Denver work tends to arrive as a portfolio rather than a single post — several buildings, different hours, one point of contact. That is the shape of contract we are built for."
      heroImage="/images/capability-hero.jpg"
      sections={[
        {
          kicker: '01 · Multi-site',
          heading: 'Several properties, one accountable roster.',
          body: [
            'Metro-area clients rarely need one officer at one door. They need a lobby covered during business hours, a gate covered overnight, and a patrol that ties the rest together — reported consistently enough that a property manager can read one summary instead of three.',
            'We staff those as a single contract with a single roster, so coverage can shift between sites without renegotiating scope. On-call coverage is written into every contract, which is what keeps a call-out at one building from becoming a gap at another.',
          ],
          bullets: [
            'Fixed post, gate, lobby and visitor-control coverage',
            'Foot and mobile patrol across multiple addresses',
            'Armed and unarmed officers',
          ],
        },
        {
          kicker: '02 · Sectors',
          heading: 'Where we work in the metro.',
          body: [
            'Commercial and industrial properties make up most of our Denver-area work, alongside construction sites that need perimeter and access control while a build is live. We also cover healthcare, education and campus environments, where the officer is as much a visible point of help as a deterrent.',
            'Event and surge coverage is available for venues and employers with dates that exceed their normal headcount — conferences, seasonal peaks, or a single high-attendance day.',
          ],
        },
        {
          kicker: '03 · Credentials',
          heading: 'A contracting path that already exists.',
          body: [
            'Ares Security is woman-owned and certified as a WOSB and through WBENC, and holds a GSA Multiple Award Schedule under NAICS 561612. For agencies and prime contractors, that means award without standing up a new vehicle.',
            'Officers are licensed for the jurisdiction they work in, with firearms qualifications current at time of post. Post orders and reporting are written for review, not for filing.',
          ],
        },
      ]}
      showProcess
      ctaHeading={{ lead: 'Covering multiple sites in', accent: 'Denver?' }}
      ctaBody="Send the address list, the hours each site needs, and your deadline. We will come back with scope and pricing within one business day."
    />
  );
}
