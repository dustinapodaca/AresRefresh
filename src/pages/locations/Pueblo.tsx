import LandingLayout from '../../components/LandingLayout';

/* COPY-REVIEW — new marketing copy. Pueblo angle: industrial, utility and
   construction sites, and the commitment that leadership travels to work the
   first shift rather than subcontracting the market out. */

export default function Pueblo() {
  return (
    <LandingLayout
      path="/locations/pueblo"
      crumb={{ label: 'Service Areas', to: '/services' }}
      crumbCurrent="Pueblo"
      h1={{ lead: 'Security Guard Services in', accent: 'Pueblo' }}
      lede="Pueblo sites are usually industrial before they are anything else — yards, perimeters, utility infrastructure and active builds. Those posts are won or lost on whether someone actually shows up."
      heroImage="/images/capability-hero.jpg"
      sections={[
        {
          kicker: '01 · Reliability',
          heading: 'Leadership works the first shift here too.',
          body: [
            'We do not hand Pueblo work to a subcontractor and hope it holds. Our leadership travels down to work the opening shift on a new post, learns the site, and only then hands off to the officers who will run it day to day.',
            'That is also how we hold missed shifts under one percent, and why on-call coverage is part of every contract rather than a paid add-on. A yard with no officer on it is not a discount, it is an exposure.',
          ],
          bullets: [
            'On-call coverage written into every contract',
            'Site-specific training before the first scheduled shift',
            'Written post orders and auditable reporting',
          ],
        },
        {
          kicker: '02 · Site types',
          heading: 'Perimeters, yards and active builds.',
          body: [
            'Most of what we are asked for in Pueblo is access control at a gate, perimeter and yard patrol after hours, and coverage for construction sites while materials and equipment are on the ground. Armed coverage is available where the site or its insurer calls for it.',
            'We also staff utility and critical-infrastructure locations, along with the commercial, healthcare and education posts that make up the rest of the local market.',
          ],
          bullets: [
            'Gate and access-control posts',
            'Perimeter and yard patrol, including after hours',
            'Construction and laydown-yard coverage',
            'Utility and infrastructure locations',
          ],
        },
        {
          kicker: '03 · Standing',
          heading: 'Small-business certified, federally registered.',
          body: [
            'Ares Security is a woman-owned small business, WOSB- and WBENC-certified, and a GSA Multiple Award Schedule holder under NAICS 561612. Public-sector buyers in the area can contract through that schedule directly.',
            'Officer licensing and firearms qualifications are current at time of post, and the supporting records are available on request.',
          ],
        },
      ]}
      showProcess
      ctaHeading={{ lead: 'Need officers in', accent: 'Pueblo?' }}
      ctaBody="Tell us the site, the hours and when coverage has to begin. We respond within one business day."
    />
  );
}
