// Location pages ("The Local File", docs/locations-concepts.md). One record per city.
// Content inventory: docs/locations-content.md; copy changes: docs/copy-changes.md.
// Sites are listed as what Ares is licensed and ready to staff in the city, never as
// current clients or posts (owner, 2026-10-06: no Springs sites yet).

export type Coord = { lat: number; lon: number };

export type City = {
  slug: 'colorado-springs' | 'denver' | 'pueblo';
  name: string;
  path: string;
  coord: Coord;
};

/** `inline` sets the note on the label's line (DEN AIRPORT), lifted a little off the city. */
export type Landmark = Coord & { label: string; note?: string; side?: 'left' | 'right'; kind?: 'peak' | 'airport'; inline?: boolean };

export type LicenseRow = {
  label: string;
  value: string;
  mono?: boolean;
  /** Links (external ones open the issuing city's record) or a plain note. */
  route?: { links: { label: string; href: string; external?: boolean }[] } | { note: string };
};

export type Sector = { name: string; division: string; divisionId: string };
export type CityFaq = { q: string; a: string };

export type LocationFile = {
  city: City;
  path: string;
  title: string;
  lead: string;
  licenseTitle: string;
  licenseIntro: string;
  license: LicenseRow[];
  /** "Security in <city>." (copy audit, 2026-10-10): 120 to 180 words only this city's page
   *  says, from facts already on the site, in "ready to staff" terms. */
  local: string;
  sectorsTitle: string;
  sectors: Sector[];
  /** Two questions only this city's page asks (copy audit). */
  faq: CityFaq[];
  landmarks: Landmark[];
  /** Which side of its dot the city's name sits on the map (default right). */
  focusSide?: 'left' | 'right';
};

export const CITIES: City[] = [
  { slug: 'denver', name: 'Denver', path: '/locations/denver', coord: { lat: 39.7392, lon: -104.9903 } },
  { slug: 'colorado-springs', name: 'Colorado Springs', path: '/locations/colorado-springs', coord: { lat: 38.8339, lon: -104.8214 } },
  { slug: 'pueblo', name: 'Pueblo', path: '/locations/pueblo', coord: { lat: 38.2544, lon: -104.6091 } },
];

const city = (slug: City['slug']) => CITIES.find((c) => c.slug === slug)!;

const copyRequest = (cityName: string, number: string) =>
  `mailto:contact@aressecurity.co?subject=${encodeURIComponent(`License copy: ${cityName} ${number}`)}`;

// Licensed and bonded; an armed and unarmed security provider and training provider in
// all three cities (owner, 2026-10-06).
export const COLORADO_SPRINGS: LocationFile = {
  city: city('colorado-springs'),
  path: '/locations/colorado-springs',
  title: 'Security guards in Colorado Springs.',
  lead: 'Armed and unarmed security officers for sites across Colorado Springs and El Paso County, from the company headquartered here since 2021. Our leadership is based here and trains every officer on the post before their first shift.',
  licenseTitle: 'Licensed in Colorado Springs.',
  licenseIntro:
    'Colorado has no statewide security license. Colorado Springs licenses security companies itself, and these are ours here.',
  license: [
    {
      label: 'Contract Security Agency license',
      value: '0850744L',
      mono: true,
      route: {
        links: [
          // The city's public license record (Accela).
          {
            label: 'Verify',
            href: 'https://aca-prod.accela.com/COSPRINGS/Cap/CapDetail.aspx?Module=Licensing&TabName=Licensing&capID1=REC21&capID2=00000&capID3=008D0&agencyCode=COSPRINGS&IsToShowInspection=',
            external: true,
          },
        ],
      },
    },
    { label: 'Status', value: 'Licensed and bonded for armed and unarmed security' },
    { label: 'Training provider', value: 'Armed and unarmed, approved by the City of Colorado Springs' },
    { label: 'Armed endorsements', value: 'From our NRA-certified firearms instructor, a veteran' },
    { label: 'Office', value: 'Colorado Springs, CO 80906', mono: true, route: { note: 'Headquarters since 2021' } },
  ],
  local: 'Colorado Springs is home. Ares was founded here in 2021, and our headquarters is still here, so leadership is a short drive from any post in El Paso County. A member of that leadership walks your site before anything is signed, trains each officer on the post before the first shift, and works the first shift on every new post. The City of Colorado Springs licenses us for armed and unarmed security and approves us as an armed and unarmed training provider, so we qualify our own officers here. We are ready to staff defense contractors and military-adjacent sites, data centers, builds and industrial yards, utilities, commercial property, and campuses. Federal agencies here can also order through our GSA Multiple Award Schedule contract.',
  sectorsTitle: 'Sites we are ready to staff here.',
  faq: [
    {
      q: 'Does a security company need a Colorado Springs license?',
      a: 'Yes. Colorado has no statewide security license, so the City of Colorado Springs licenses contract security agencies itself. Ares holds Colorado Springs Contract Security Agency license 0850744L for armed and unarmed security, and you can check it in the city\u2019s public record from the license section above.',
    },
    {
      q: 'How soon can you start a post in Colorado Springs?',
      // Owner, 2026-10-10: what the start date depends on.
      a: 'It depends on the site, the technical audit we do before anything is signed, how many officers the post needs, and any clearance requirements the site has. Our leadership is based in Colorado Springs, so we can walk the site quickly and train each officer on the post before the first shift. Tell us your date and we will say plainly whether we can meet it.',
    },
  ],
  sectors: [
    { name: 'Defense contractors and military-adjacent sites', division: 'Government & Military', divisionId: 'government' },
    { name: 'Data centers', division: 'Critical & High-Liability Sites', divisionId: 'critical' },
    { name: 'Construction and industrial sites', division: 'Construction, Industrial & Logistics', divisionId: 'industrial' },
    { name: 'Utilities and critical infrastructure', division: 'Critical & High-Liability Sites', divisionId: 'critical' },
    { name: 'Commercial property and retail', division: 'Commercial & Retail', divisionId: 'commercial' },
    { name: 'Airport-area development', division: 'Airport & Transportation', divisionId: 'airport' },
    { name: 'Campuses and institutions', division: 'Institutional & Community', divisionId: 'community' },
  ],
  landmarks: [{ label: 'Pikes Peak', note: '14,115 FT', lat: 38.8409, lon: -105.0442, side: 'left' }],
};

export const DENVER: LocationFile = {
  city: city('denver'),
  path: '/locations/denver',
  title: 'Security guards in Denver.',
  lead: 'Armed and unarmed security officers for sites across Greater Denver: Aurora, Lakewood, Commerce City, Douglas County, and the DIA corridor. Our leadership trains every officer on the post before their first shift.',
  licenseTitle: 'Licensed in Denver.',
  licenseIntro: 'Colorado has no statewide security license. Denver licenses security companies itself, and these are ours here.',
  license: [
    {
      label: 'Private Security Employer license',
      value: '2021-BFN-0001984',
      mono: true,
      route: {
        links: [
          // The city's public license record (Accela).
          {
            label: 'Verify',
            href: 'https://aca-prod.accela.com/DENVER/Cap/CapDetail.aspx?Module=Licenses&TabName=Licenses&capID1=21CAP&capID2=00000&capID3=014GJ&agencyCode=DENVER&IsToShowInspection=',
            external: true,
          },
        ],
      },
    },
    { label: 'Status', value: 'Licensed and bonded for armed and unarmed security' },
    { label: 'Training provider', value: 'Armed and unarmed, an eligible training provider in Denver' },
    { label: 'Armed endorsements', value: 'From our NRA-certified firearms instructor, a veteran' },
    { label: 'Office', value: 'Colorado Springs, CO 80906', mono: true, route: { note: 'Headquarters, an hour south on I-25' } },
  ],
  local: 'Greater Denver runs from Aurora and Commerce City to Lakewood, Douglas County, and the DIA corridor, and Ares is licensed to staff all of it. Denver licenses private security employers itself, and we hold Denver license 2021-BFN-0001984 for armed and unarmed security, as an eligible training provider in the city. Here we are ready to staff data centers and their builds, warehouses and logistics, airport-area sites, hospitals, parking and transportation, public-sector facilities, and commercial property. Our headquarters is an hour south on I-25 in Colorado Springs, and a member of our leadership still trains each officer on the post before the first shift and works the first shift on every new post. Ares is also Denver M/WBE and SBE certified, for city work that sets participation goals.',
  sectorsTitle: 'Sites we are ready to staff here.',
  faq: [
    {
      q: 'Does a security company need a Denver license?',
      a: 'Yes. Colorado has no statewide security license, so Denver licenses private security employers itself. Ares holds Denver Private Security Employer license 2021-BFN-0001984 for armed and unarmed security, and you can check it in the city\u2019s public record from the license section above.',
    },
    {
      q: 'Do you cover sites outside the city of Denver?',
      a: 'Yes. We staff across Greater Denver, including Aurora, Lakewood, Commerce City, Douglas County, and the DIA corridor. Tell us the address and the hours, and we will tell you plainly whether we can staff it and when.',
    },
    {
      // Owner, 2026-10-10: the same factors as the other cities.
      q: 'How soon can you start a post in Denver?',
      a: 'It depends on the site, the technical audit we do before anything is signed, how many officers the post needs, and any clearance requirements the site has. Leadership comes up from Colorado Springs to walk the site and train each officer on the post before the first shift. Tell us your date and we will say plainly whether we can meet it.',
    },
  ],
  sectors: [
    { name: 'Data centers and critical infrastructure', division: 'Critical & High-Liability Sites', divisionId: 'critical' },
    { name: 'Airport-area sites and the DIA corridor', division: 'Airport & Transportation', divisionId: 'airport' },
    { name: 'Construction, including data-center builds', division: 'Construction, Industrial & Logistics', divisionId: 'industrial' },
    { name: 'Warehouses and logistics', division: 'Construction, Industrial & Logistics', divisionId: 'industrial' },
    { name: 'Hospitals and healthcare', division: 'Institutional & Community', divisionId: 'community' },
    { name: 'Parking and transportation', division: 'Airport & Transportation', divisionId: 'airport' },
    { name: 'Public-sector facilities', division: 'Government & Military', divisionId: 'government' },
    { name: 'Commercial property and corporate campuses', division: 'Commercial & Retail', divisionId: 'commercial' },
  ],
  landmarks: [{ label: 'DEN', note: 'AIRPORT', lat: 39.8561, lon: -104.6737, side: 'right', kind: 'airport', inline: true }],
};

export const PUEBLO: LocationFile = {
  city: city('pueblo'),
  path: '/locations/pueblo',
  title: 'Security guards in Pueblo.',
  lead: 'Armed and unarmed security officers for sites across Pueblo and Pueblo County, from a company licensed here that trains its own officers. Our headquarters is up I-25 in Colorado Springs.',
  licenseTitle: 'Licensed in Pueblo.',
  licenseIntro: 'Colorado has no statewide security license. Pueblo licenses security companies itself, through the Pueblo Police Department, and these are ours here.',
  license: [
    {
      label: 'Merchant patrol and security license',
      value: '26422',
      mono: true,
      route: { links: [{ label: 'Request a copy', href: copyRequest('Pueblo', '26422') }] },
    },
    { label: 'Status', value: 'Licensed and bonded for armed and unarmed security' },
    { label: 'Training provider', value: 'Armed and unarmed, approved by the Pueblo Police Department' },
    { label: 'Armed endorsements', value: 'From our NRA-certified firearms instructor, a veteran' },
    { label: 'Office', value: 'Colorado Springs, CO 80906', mono: true, route: { note: 'Headquarters, 45 minutes north on I-25' } },
  ],
  // The audit's "Pueblo is where our CEO started in security" waits for Deidre's OK.
  local: 'Pueblo licenses security companies through the Pueblo Police Department, and Ares holds Pueblo license 26422 for armed and unarmed security. The department also approves us as an armed and unarmed training provider, so the officers we post here are trained and qualified to Pueblo\u2019s own rules. Our headquarters is 45 minutes north on I-25 in Colorado Springs, close enough that a member of our leadership walks each site, trains each officer on the post before the first shift, and works the first shift on every new post. Here we are ready to staff industrial and energy sites, construction, city and county facilities, campuses, apartment and residential properties, and commercial property, across Pueblo and Pueblo County. Federal agencies here can also order through our GSA Multiple Award Schedule contract.',
  sectorsTitle: 'Sites we are ready to staff here.',
  faq: [
    {
      q: 'Does a security company need a Pueblo license?',
      a: 'Yes. Colorado has no statewide security license, and Pueblo licenses security companies through the Pueblo Police Department. Ares holds Pueblo merchant patrol and security license 26422 for armed and unarmed security. Pueblo has no online lookup, so we send a copy on request.',
    },
    {
      q: 'How soon can you start a post in Pueblo?',
      a: 'It depends on the site, the technical audit we do before anything is signed, how many officers the post needs, and any clearance requirements the site has. We walk the site, write the post orders, and train each officer on the post before the first shift. Tell us your date and we will say plainly whether we can meet it.',
    },
  ],
  sectors: [
    { name: 'Industrial and energy sites', division: 'Construction, Industrial & Logistics', divisionId: 'industrial' },
    { name: 'Construction sites', division: 'Construction, Industrial & Logistics', divisionId: 'industrial' },
    { name: 'City and county facilities', division: 'Government & Military', divisionId: 'government' },
    { name: 'Campuses and institutions', division: 'Institutional & Community', divisionId: 'community' },
    { name: 'Apartment and residential properties', division: 'Institutional & Community', divisionId: 'community' },
    { name: 'Commercial property and retail', division: 'Commercial & Retail', divisionId: 'commercial' },
  ],
  landmarks: [{ label: 'PUB', note: 'AIRPORT', lat: 38.2891, lon: -104.4966, side: 'right', kind: 'airport' }],
  focusSide: 'left',
};
