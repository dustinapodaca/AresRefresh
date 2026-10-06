import LandingLayout from '../../components/LandingLayout';

/* COPY-REVIEW — every string below is new marketing copy. Built only from
   facts already on the site: HQ Colorado Springs, founded 2021, woman-owned,
   WOSB + WBENC certified, GSA MAS holder, NAICS 561612, and the three
   approved proof points. No new statistics, client names or site names. */

export default function ColoradoSprings() {
  return (
    <LandingLayout
      path="/locations/colorado-springs"
      crumb={{ label: 'Service Areas', to: '/services' }}
      crumbCurrent="Colorado Springs"
      h1={{ lead: 'Security Guards in', accent: 'Colorado Springs' }}
      lede="Colorado Springs is our home office, not a branch. Our leadership is based here, which means the people who write your post orders are the same people who show up to work them."
      heroImage="/images/capability-hero.jpg"
      sections={[
        {
          kicker: '01 · Local base',
          heading: 'Run from here, not from a regional hub.',
          body: [
            'Ares Security was founded in Colorado Springs in 2021 and has been headquartered here ever since. Scheduling, training and supervision all happen locally, so a shift change or a site question does not route through another state.',
            'That proximity is the reason we can commit to on-call coverage in every contract and keep missed shifts under one percent. When a post needs a body at short notice, the roster we draw from is already in the city.',
          ],
          bullets: [
            'Woman-owned, WOSB- and WBENC-certified',
            'GSA Multiple Award Schedule holder, NAICS 561612',
            'Leadership works the first shift on every new post',
          ],
        },
        {
          kicker: '02 · Coverage',
          heading: 'The posts we staff across the city.',
          body: [
            'We cover fixed posts, gates, lobbies and visitor-control desks, plus foot and mobile patrol for properties that need presence rather than a stationary officer. Armed and unarmed officers are both available depending on what the site and its insurer require.',
            'Escort coverage is available for contractors, vendors and visitors who need to be accompanied while on site, and we take surge and event work when a property has a date that outgrows its normal staffing.',
          ],
          bullets: [
            'Government and municipal facilities',
            'Commercial, retail and hospitality properties',
            'Industrial, construction and utility sites',
            'Healthcare, education and campus environments',
          ],
        },
        {
          kicker: '03 · Documentation',
          heading: 'Audit-ready from the first shift.',
          body: [
            'Every post gets written post orders, site-specific training and records built to survive review. Licensing and firearms qualifications are current at time of post, and the paperwork behind that is available on request rather than assembled after the fact.',
            'For public-sector buyers, our GSA Schedule and SAM registration mean the contracting path is already in place.',
          ],
        },
      ]}
      showProcess
      ctaHeading={{ lead: 'Need coverage in', accent: 'Colorado Springs?' }}
      ctaBody="Send us the site, the shift pattern and the date you need it filled. We respond within one business day."
    />
  );
}
