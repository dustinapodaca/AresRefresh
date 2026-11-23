// Location pages ("The Local File", docs/locations-concepts.md). One record per city.
// Content inventory: docs/locations-content.md; copy changes: docs/copy-changes.md.
// Sites are listed as what Ares is licensed and ready to staff in the city, never as
// current clients or posts (owner, 2026-10-06: no Springs sites yet).

export type Coord = { lat: number; lon: number };

export type RegionId = 'front-range' | 'western-slope' | 'san-luis-valley';

export type City = {
  slug: string;
  name: string;
  path: string;
  coord: Coord;
  region: RegionId;
  /** The counties the city's page covers, for the Service Areas hub. */
  counties: string;
  /** One line on what the city requires and what Ares holds, for the hub's ledger. */
  rule: string;
  held: string;
  /** Which side of its dot the name sits on the statewide map (default right). */
  side?: 'left' | 'right';
};

/** A region's own map (LocationMap): its bounds, its roads, and its name on the plate. Each plate
 *  is 480 by 500 and its bounds keep that shape in kilometres, so every region reads to scale. */
export type Region = {
  id: RegionId;
  name: string;
  line: string;
  bounds: { lon0: number; lon1: number; lat0: number; lat1: number };
  /** Roads as lat/lon polylines, with a label placed beside one point of each. */
  roads: { name: string; points: [number, number][]; label: [number, number] }[];
  /** State lines inside the plate (dashed), with the neighbour's name. */
  borders?: { points: [number, number][]; label: string; at: [number, number]; end?: boolean }[];
};

export const REGIONS: Region[] = [
  {
    id: 'front-range',
    name: 'Front Range',
    line: 'Along I-25, where Ares started in 2021 and keeps its headquarters.',
    bounds: { lon0: -106.2, lon1: -103.6, lat0: 40.05, lat1: 37.95 },
    roads: [
      {
        name: 'I-25',
        // Wyoming, Fort Collins, Denver, Colorado Springs, Pueblo, Walsenburg: I-25 runs off both edges.
        points: [
          [41.1, -104.95],
          [40.585, -105.08],
          [39.7392, -104.9903],
          [38.8339, -104.8214],
          [38.2544, -104.6091],
          [37.6247, -104.7803],
        ],
        label: [39.3, -104.93],
      },
    ],
  },
  {
    id: 'western-slope',
    name: 'Western Slope',
    line: 'West of the Divide, from Glenwood Springs and Grand Junction south to Durango.',
    bounds: { lon0: -109.67, lon1: -106.14, lat0: 39.95, lat1: 37.05 },
    roads: [
      {
        name: 'I-70',
        // Eagle, Glenwood Springs, Rifle, Parachute, Grand Junction, Fruita, into Utah.
        points: [
          [39.655, -106.83],
          [39.5505, -107.3248],
          [39.535, -107.783],
          [39.45, -108.05],
          [39.0639, -108.5506],
          [39.159, -108.73],
          [39.17, -109.05],
          [39.0, -109.67],
        ],
        label: [39.62, -108.0],
      },
      {
        name: 'US-50',
        points: [
          [39.0639, -108.5506],
          [38.742, -108.069],
          [38.4783, -107.8762],
        ],
        label: [38.78, -108.25],
      },
      {
        name: 'US-550',
        // Montrose, Ridgway, Ouray, Silverton, Durango.
        points: [
          [38.4783, -107.8762],
          [38.153, -107.756],
          [38.023, -107.671],
          [37.812, -107.664],
          [37.2753, -107.8801],
        ],
        label: [37.9, -107.62],
      },
    ],
    borders: [{ points: [[39.95, -109.05], [37.05, -109.05]], label: 'UTAH', at: [38.0, -109.05], end: true }],
  },
  {
    id: 'san-luis-valley',
    name: 'San Luis Valley',
    line: 'The San Luis Valley and the southern end of the state, from Alamosa east to Trinidad.',
    // Widened east for Trinidad (owner, 2026-11-22), keeping the plate's shape in kilometres.
    bounds: { lon0: -107.1, lon1: -103.9, lat0: 38.75, lat1: 36.1 },
    roads: [
      {
        name: 'US-160',
        // Del Norte, Monte Vista, Alamosa, Fort Garland, La Veta Pass, Walsenburg.
        points: [
          [37.678, -106.353],
          [37.5794, -106.148],
          [37.4695, -105.87],
          [37.43, -105.433],
          [37.59, -105.2],
          [37.6247, -104.7803],
        ],
        label: [37.36, -105.62],
      },
      {
        name: 'I-25',
        // Pueblo, Walsenburg, Aguilar, Trinidad, Raton Pass.
        points: [
          [38.75, -104.75],
          [38.2544, -104.6091],
          [37.6247, -104.7803],
          [37.4, -104.65],
          [37.1695, -104.5005],
          [36.99, -104.47],
          [36.1, -104.4],
        ],
        label: [37.95, -104.66],
      },
    ],
    borders: [{ points: [[37.0, -107.1], [37.0, -103.9]], label: 'NEW MEXICO', at: [37.0, -104.85], end: true }],
  },
];

export const regionOf = (id: RegionId) => REGIONS.find((r) => r.id === id)!;

/** `inline` sets the note on the label's line (DEN AIRPORT), lifted a little off the city. */
export type Landmark = Coord & { label: string; note?: string; side?: 'left' | 'right'; kind?: 'peak' | 'airport'; inline?: boolean; above?: boolean };

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
  /** A window of its own on the region's map, when the city sits off the region's plate (Fort Collins,
   *  north of the Front Range plate). Same shape in kilometres as the plates. */
  bounds?: Region['bounds'];
};

// Every city Ares is set up to staff (owner, 2026-11-22: Colorado-wide). The hub at /locations
// lists them by region; each has its own page. Facts in `rule` and `held` are each city's own
// licensing, from the city's code and its written answers to Ares (HubSpot, 2026-11).
export const CITIES: City[] = [
  {
    slug: 'colorado-springs',
    name: 'Colorado Springs',
    path: '/locations/colorado-springs',
    coord: { lat: 38.8339, lon: -104.8214 },
    region: 'front-range',
    counties: 'El Paso and Teller counties',
    rule: 'Contract security agency license',
    held: '0850744L',
  },
  {
    slug: 'denver',
    name: 'Denver',
    path: '/locations/denver',
    coord: { lat: 39.7392, lon: -104.9903 },
    region: 'front-range',
    counties: 'Denver, Adams, Arapahoe, Jefferson, Douglas, and Broomfield counties',
    rule: 'Private security employer license',
    held: '2021-BFN-0001984',
  },  {
    slug: 'fort-collins',
    name: 'Fort Collins',
    path: '/locations/fort-collins',
    coord: { lat: 40.5853, lon: -105.0844 },
    region: 'front-range',
    counties: 'Larimer and Weld counties',
    rule: 'City sales and use tax license, its business license',
    held: 'Sales and use tax license',
  },

  {
    slug: 'pueblo',
    name: 'Pueblo',
    path: '/locations/pueblo',
    coord: { lat: 38.2544, lon: -104.6091 },
    region: 'front-range',
    counties: 'Pueblo County',
    rule: 'Merchant patrol and security license, through Pueblo PD',
    held: '26422',
  },
  {
    slug: 'grand-junction',
    name: 'Grand Junction',
    path: '/locations/grand-junction',
    coord: { lat: 39.0639, lon: -108.5506 },
    region: 'western-slope',
    counties: 'Mesa County',
    rule: 'No city license for security companies',
    held: 'None required, confirmed by the City',
  },
  {
    slug: 'glenwood-springs',
    name: 'Glenwood Springs',
    path: '/locations/glenwood-springs',
    coord: { lat: 39.5505, lon: -107.3248 },
    region: 'western-slope',
    counties: 'Garfield, Eagle, and Pitkin counties',
    rule: 'City business license, two-year term',
    held: 'Business license',
  },
  {
    slug: 'montrose',
    name: 'Montrose',
    path: '/locations/montrose',
    coord: { lat: 38.4783, lon: -107.8762 },
    region: 'western-slope',
    counties: 'Montrose, Delta, and Ouray counties',
    rule: 'No business license; sales tax license for retail only',
    held: 'None required, confirmed by the City',
    side: 'left',
  },
  {
    slug: 'durango',
    name: 'Durango',
    path: '/locations/durango',
    coord: { lat: 37.2753, lon: -107.8801 },
    region: 'western-slope',
    counties: 'La Plata and Montezuma counties',
    rule: 'City business license, renewed each year',
    held: 'Business license',
  },
  {
    slug: 'alamosa',
    name: 'Alamosa',
    path: '/locations/alamosa',
    coord: { lat: 37.4695, lon: -105.87 },
    region: 'san-luis-valley',
    counties: 'Alamosa, Rio Grande, Conejos, Costilla, and Saguache counties',
    rule: 'Contract security license for the company and every officer',
    held: 'Company and officer licenses',
  },
  {
    slug: 'trinidad',
    name: 'Trinidad',
    path: '/locations/trinidad',
    coord: { lat: 37.1695, lon: -104.5005 },
    region: 'san-luis-valley',
    counties: 'Las Animas and Huerfano counties',
    rule: 'City business license, renewed each year',
    held: 'Business license',
  },
];

const city = (slug: string) => CITIES.find((c) => c.slug === slug)!;

const copyRequest = (cityName: string, number: string) =>
  `mailto:contact@aressecurity.co?subject=${encodeURIComponent(`License copy: ${cityName} ${number}`)}`;

// Licensed and bonded; an armed and unarmed security provider and training provider in
// all three cities (owner, 2026-10-06).
export const COLORADO_SPRINGS: LocationFile = {
  city: city('colorado-springs'),
  path: '/locations/colorado-springs',
  title: 'Security guards in Colorado Springs.',
  lead: 'Armed and unarmed security officers for sites across Colorado Springs and El Paso County, from the company headquartered here since 2021. Our leadership is based here and trains every officer on the post before their first shift.',
  licenseTitle: 'Licensed in Colorado Springs',
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
  local: 'Colorado Springs is home. Ares was founded here in 2021, and our headquarters is still here, so leadership is a short drive from any post in El Paso or Teller County. A member of that leadership walks your site before anything is signed, trains each officer on the post before the first shift, and works the first shift on every new post. The City of Colorado Springs licenses us for armed and unarmed security and approves us as an armed and unarmed training provider, so we qualify our own officers here. We are ready to staff defense contractors and military-adjacent sites, data centers, builds and industrial yards, utilities, commercial property, campuses, and community health centers. Federal agencies here can also order through our GSA Multiple Award Schedule contract.',
  sectorsTitle: 'Sites we are ready to staff here',
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
    { name: 'Defense contractors and military-adjacent sites', division: 'Government & Defense', divisionId: 'government' },
    { name: 'Commercial property and retail', division: 'Commercial & Retail', divisionId: 'commercial' },
    { name: 'Data centers', division: 'Critical & High-Liability Sites', divisionId: 'critical' },
    { name: 'Utilities and critical infrastructure', division: 'Critical & High-Liability Sites', divisionId: 'critical' },
    { name: 'Campuses and institutions', division: 'Institutional & Community', divisionId: 'community' },
    { name: 'Community health centers and clinics', division: 'Institutional & Community', divisionId: 'community' },
    { name: 'Construction and industrial sites', division: 'Construction, Industrial & Logistics', divisionId: 'industrial' },
    { name: 'Airport-area development', division: 'Airport & Transportation', divisionId: 'airport' },
  ],
  landmarks: [{ label: 'Pikes Peak', note: '14,115 FT', lat: 38.8409, lon: -105.0442, side: 'left' }],
};

export const DENVER: LocationFile = {
  city: city('denver'),
  path: '/locations/denver',
  title: 'Security guards in Denver.',
  // The training line moved into "Security in Denver." (copy audit round 3).
  lead: 'Armed and unarmed security officers for sites across Greater Denver: Aurora, Lakewood, Commerce City, Broomfield, Douglas County, and the DIA corridor.',
  licenseTitle: 'Licensed in Denver',
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
  sectorsTitle: 'Sites we are ready to staff here',
  faq: [
    {
      q: 'Does a security company need a Denver license?',
      a: 'Yes. Colorado has no statewide security license, so Denver licenses private security employers itself. Ares holds Denver Private Security Employer license 2021-BFN-0001984 for armed and unarmed security, and you can check it in the city\u2019s public record from the license section above.',
    },
    {
      q: 'Do you cover sites outside the city of Denver?',
      a: 'Yes. We staff across Greater Denver, including Aurora, Lakewood, Commerce City, Broomfield, Douglas County, and the DIA corridor. Tell us the address and the hours, and we will tell you plainly whether we can staff it and when.',
    },
    {
      // Owner, 2026-10-10: the same factors as the other cities.
      q: 'How soon can you start a post in Denver?',
      // Worded apart from the other two cities' (web audit, 2026-10-18); the same facts.
      a: 'Four things set it: the site, what our technical audit finds before anything is signed, how many officers the post needs, and any clearance requirements. Leadership comes up from Colorado Springs to walk the site and train each officer on the post before the first shift. Give us your start date and we will tell you plainly whether we can meet it.',
    },
  ],
  sectors: [
    { name: 'Data centers and critical infrastructure', division: 'Critical & High-Liability Sites', divisionId: 'critical' },
    { name: 'Airport-area sites and the DIA corridor', division: 'Airport & Transportation', divisionId: 'airport' },
    { name: 'Construction, including data-center builds', division: 'Construction, Industrial & Logistics', divisionId: 'industrial' },
    { name: 'Warehouses and logistics', division: 'Construction, Industrial & Logistics', divisionId: 'industrial' },
    { name: 'Hospitals and healthcare', division: 'Critical & High-Liability Sites', divisionId: 'critical' },
    { name: 'Parking and transportation', division: 'Airport & Transportation', divisionId: 'airport' },
    { name: 'Public-sector facilities', division: 'Government & Defense', divisionId: 'government' },
    { name: 'Commercial property and corporate campuses', division: 'Commercial & Retail', divisionId: 'commercial' },
  ],
  landmarks: [{ label: 'DEN', note: 'AIRPORT', lat: 39.8561, lon: -104.6737, side: 'right', kind: 'airport', inline: true }],
};

export const PUEBLO: LocationFile = {
  city: city('pueblo'),
  path: '/locations/pueblo',
  title: 'Security guards in Pueblo.',
  lead: 'Armed and unarmed security officers for sites across Pueblo and Pueblo County, from a company licensed here that trains its own officers. Our headquarters is up I-25 in Colorado Springs.',
  licenseTitle: 'Licensed in Pueblo',
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
  sectorsTitle: 'Sites we are ready to staff here',
  faq: [
    {
      q: 'Does a security company need a Pueblo license?',
      a: 'Yes. Colorado has no statewide security license, and Pueblo licenses security companies through the Pueblo Police Department. Ares holds Pueblo merchant patrol and security license 26422 for armed and unarmed security. Pueblo has no online lookup, so we send a copy on request.',
    },
    {
      q: 'How soon can you start a post in Pueblo?',
      // Worded apart from the other two cities' (web audit, 2026-10-18); the same facts.
      a: 'The start date turns on the site, our technical audit before anything is signed, the number of officers the post needs, and any clearance requirements. Leadership comes down I-25 from Colorado Springs to walk the site, write the post orders, and train each officer on the post before the first shift. Send us your date and we will answer plainly whether we can make it.',
    },
  ],
  sectors: [
    { name: 'Industrial and energy sites', division: 'Construction, Industrial & Logistics', divisionId: 'industrial' },
    { name: 'Construction sites', division: 'Construction, Industrial & Logistics', divisionId: 'industrial' },
    { name: 'City and county facilities', division: 'Government & Defense', divisionId: 'government' },
    { name: 'Campuses and institutions', division: 'Institutional & Community', divisionId: 'community' },
    { name: 'Apartment and residential properties', division: 'Institutional & Community', divisionId: 'community' },
    { name: 'Commercial property and retail', division: 'Commercial & Retail', divisionId: 'commercial' },
  ],
  landmarks: [{ label: 'PUB', note: 'AIRPORT', lat: 38.2891, lon: -104.4966, side: 'right', kind: 'airport' }],
  focusSide: 'left',
};

// ---------------------------------------------------------------------------------------------
// Western Slope and San Luis Valley (owner, 2026-11-22: Colorado-wide). Each page says only what is
// true of that city: its own licensing (from the city's code and its written answers to Ares), the
// sites Ares is ready to staff there, and how far it is from headquarters. Sites are "ready to
// staff", never current clients or posts. No contract, prime, or agency is named.

const armedRow: LicenseRow = { label: 'Armed endorsements', value: 'From our NRA-certified firearms instructor, a veteran' };

export const GRAND_JUNCTION: LocationFile = {
  city: city('grand-junction'),
  path: '/locations/grand-junction',
  title: 'Security guards in Grand Junction.',
  lead: 'Armed and unarmed security officers for sites across Grand Junction and Mesa County, from a Colorado security company that licenses, screens, and trains its own officers.',
  licenseTitle: 'Licensing in Grand Junction',
  licenseIntro:
    'Colorado has no statewide security license, and Grand Junction has no city license for security companies. The City confirmed in writing that Ares, with no office in the city, needs none. Our own standard is below.',
  license: [
    { label: 'City license', value: 'None required', route: { note: 'Confirmed in writing by the City, 2026' } },
    { label: 'Status', value: 'Armed and unarmed security' },
    armedRow,
    { label: 'Office', value: 'Colorado Springs, CO 80906', mono: true, route: { note: 'Headquarters, about 4.5 hours by road' } },
  ],
  local:
    'Grand Junction is the largest city on the Western Slope, and Ares is ready to staff it. The city has no business license and no security license, so the standard a buyer can rely on here is the company’s own: every officer is screened before hire, trained on the post before the first shift, and, on an armed post, qualified by our NRA-certified firearms instructor. Here we are ready to staff public-sector and federal facilities, hospitals and clinics, energy and industrial sites, campuses, construction, and commercial property across Mesa County. A member of our leadership walks every new site before anything is signed, and federal agencies can order through our GSA Multiple Award Schedule contract.',
  sectorsTitle: 'Sites we are ready to staff here',
  faq: [
    {
      q: 'Does a security company need a Grand Junction license?',
      a: 'No. Colorado has no statewide security license, and Grand Junction has no business license or security license. The City confirmed in writing that Ares, which has no office in the city, needs no city license to staff sites here.',
    },
    {
      q: 'Do you cover sites outside Grand Junction?',
      a: 'Yes, across Mesa County, including Fruita, Palisade, and Clifton. Some towns license security companies on their own, so we check what the town requires before we quote. Tell us the address and the hours, and we will tell you plainly whether we can staff it and when.',
    },
  ],
  sectors: [
    { name: 'Public-sector and federal facilities', division: 'Government & Defense', divisionId: 'government' },
    { name: 'Hospitals and clinics', division: 'Critical & High-Liability Sites', divisionId: 'critical' },
    { name: 'Energy and industrial sites', division: 'Construction, Industrial & Logistics', divisionId: 'industrial' },
    { name: 'Campuses and institutions', division: 'Institutional & Community', divisionId: 'community' },
    { name: 'Construction sites', division: 'Construction, Industrial & Logistics', divisionId: 'industrial' },
    { name: 'Commercial property and retail', division: 'Commercial & Retail', divisionId: 'commercial' },
  ],
  landmarks: [],
};

export const GLENWOOD_SPRINGS: LocationFile = {
  city: city('glenwood-springs'),
  path: '/locations/glenwood-springs',
  title: 'Security guards in Glenwood Springs.',
  lead: 'Armed and unarmed security officers for sites in Glenwood Springs, along I-70 through Garfield County, and up the Roaring Fork Valley.',
  licenseTitle: 'Licensed in Glenwood Springs',
  licenseIntro:
    'Colorado has no statewide security license. Glenwood Springs requires a business license of anyone doing business in the city, services included, and Ares holds one.',
  license: [
    { label: 'City of Glenwood Springs business license', value: 'Active', route: { note: 'Two-year term, through 2027' } },
    { label: 'Status', value: 'Armed and unarmed security' },
    armedRow,
    { label: 'Office', value: 'Colorado Springs, CO 80906', mono: true, route: { note: 'Headquarters, about 3.5 hours by road' } },
  ],
  local:
    'Glenwood Springs sits where I-70 meets the Roaring Fork Valley, at the center of Garfield County. The city requires a business license of anyone doing business inside city limits, and Ares holds one; it runs on a two-year term that ends with each odd-numbered year. Here we are ready to staff public-sector facilities, hospitals and clinics, hotels and commercial property, construction, and apartment and residential properties, from Glenwood Springs west along I-70 and up the valley. Every officer is screened before hire and trained on the post before the first shift, and armed officers are qualified by our NRA-certified firearms instructor. A member of our leadership walks every new site before anything is signed.',
  sectorsTitle: 'Sites we are ready to staff here',
  faq: [
    {
      q: 'Does a security company need a Glenwood Springs license?',
      a: 'Yes, a city business license. Colorado has no statewide security license, and Glenwood Springs has no separate security license, but it requires a business license of anyone doing business in the city. Ares holds one, on the city’s two-year term through 2027.',
    },
    {
      q: 'Do you cover sites outside Glenwood Springs?',
      a: 'Yes, along I-70 through Garfield and Eagle counties and up the Roaring Fork Valley into Pitkin County, including New Castle, Rifle, Carbondale, Aspen, and Vail. Some towns license businesses on their own, so we check what the town requires before we quote. Send us the address and the hours.',
    },
  ],
  sectors: [
    { name: 'Public-sector facilities', division: 'Government & Defense', divisionId: 'government' },
    { name: 'Hospitals and clinics', division: 'Critical & High-Liability Sites', divisionId: 'critical' },
    { name: 'Hotels and commercial property', division: 'Commercial & Retail', divisionId: 'commercial' },
    { name: 'Construction sites', division: 'Construction, Industrial & Logistics', divisionId: 'industrial' },
    { name: 'Apartment and residential properties', division: 'Institutional & Community', divisionId: 'community' },
  ],
  landmarks: [],
};

export const MONTROSE: LocationFile = {
  city: city('montrose'),
  path: '/locations/montrose',
  title: 'Security guards in Montrose.',
  lead: 'Armed and unarmed security officers for sites across Montrose and the Uncompahgre Valley, on US-50 between Grand Junction and the San Juans.',
  licenseTitle: 'Licensing in Montrose',
  licenseIntro:
    'Colorado has no statewide security license. Montrose has no business license, and its sales tax license is for retail sales only, so a security company working here needs no city license. The City confirmed that for Ares in writing.',
  license: [
    { label: 'City license', value: 'None required', route: { note: 'Confirmed in writing by the City, 2026' } },
    { label: 'Status', value: 'Armed and unarmed security' },
    armedRow,
    { label: 'Office', value: 'Colorado Springs, CO 80906', mono: true, route: { note: 'Headquarters, about 4 hours by road' } },
  ],
  local:
    'Montrose is the center of the Uncompahgre Valley, on US-50 between Grand Junction and the San Juans. The city has no business license and no security license, and its sales tax license covers retail sales only, so the standard here is the company’s own: officers screened before hire, trained on the post before the first shift, and, on an armed post, qualified by our NRA-certified firearms instructor. Here we are ready to staff public-sector facilities, hospitals and clinics, industrial and warehouse sites, airport-area sites, and commercial property across Montrose County. A member of our leadership walks every new site before anything is signed, and federal agencies can order through our GSA Multiple Award Schedule contract.',
  sectorsTitle: 'Sites we are ready to staff here',
  faq: [
    {
      q: 'Does a security company need a Montrose license?',
      a: 'No. Colorado has no statewide security license, Montrose has no business license, and the city’s sales tax license applies only to retail sales. The City confirmed in writing that Ares needs no city license to staff sites here.',
    },
    {
      q: 'Do you cover sites outside Montrose?',
      a: 'Yes, across Montrose County and into Delta and Ouray counties, along US-50 toward Olathe and Delta and US-550 toward Ouray. Some towns license businesses on their own, so we check what the town requires before we quote. Tell us the address and the hours, and we will answer plainly.',
    },
  ],
  sectors: [
    { name: 'Public-sector facilities', division: 'Government & Defense', divisionId: 'government' },
    { name: 'Hospitals and clinics', division: 'Critical & High-Liability Sites', divisionId: 'critical' },
    { name: 'Industrial and warehouse sites', division: 'Construction, Industrial & Logistics', divisionId: 'industrial' },
    { name: 'Airport-area sites', division: 'Airport & Transportation', divisionId: 'airport' },
    { name: 'Commercial property and retail', division: 'Commercial & Retail', divisionId: 'commercial' },
  ],
  landmarks: [],
  focusSide: 'left',
};

export const DURANGO: LocationFile = {
  city: city('durango'),
  path: '/locations/durango',
  title: 'Security guards in Durango.',
  lead: 'Armed and unarmed security officers for sites across Durango and La Plata County, from a Colorado security company licensed to work in the city.',
  licenseTitle: 'Licensed in Durango',
  licenseIntro:
    'Colorado has no statewide security license. Durango requires a business license of any company that works inside city limits, services included, and Ares holds one.',
  license: [
    { label: 'City of Durango business license', value: 'Active', route: { note: 'Renewed each January' } },
    { label: 'Status', value: 'Armed and unarmed security' },
    armedRow,
    { label: 'Office', value: 'Colorado Springs, CO 80906', mono: true, route: { note: 'Headquarters, about 5.5 hours by road' } },
  ],
  local:
    'Durango is the hub of La Plata County and Southwest Colorado. The City of Durango requires a business license of any company that enters city limits to work, services included, and Ares holds one. Durango once had a separate merchant patrol license; the city repealed it in 2016, so the business license is the one that applies to security. Here we are ready to staff public-sector and federal facilities, hospitals and clinics, campuses, construction, apartment and residential properties, and commercial property and retail across La Plata County. Every officer is screened before hire and trained on the post before the first shift, and armed officers are qualified by our NRA-certified firearms instructor.',
  sectorsTitle: 'Sites we are ready to staff here',
  faq: [
    {
      q: 'Does a security company need a Durango license?',
      a: 'Yes, a city business license. Colorado has no statewide security license, and Durango repealed its separate merchant patrol license in 2016, so the business license is the one that applies. Ares holds a City of Durango business license.',
    },
    {
      q: 'Do you cover sites outside Durango?',
      a: 'Yes, across La Plata County and into Montezuma County, including Bayfield, Cortez, and the US-160 and US-550 corridors. Some towns license businesses on their own, so we check what the town requires before we quote. Send us the address and the hours.',
    },
  ],
  sectors: [
    { name: 'Public-sector and federal facilities', division: 'Government & Defense', divisionId: 'government' },
    { name: 'Hospitals and clinics', division: 'Critical & High-Liability Sites', divisionId: 'critical' },
    { name: 'Campuses and institutions', division: 'Institutional & Community', divisionId: 'community' },
    { name: 'Construction sites', division: 'Construction, Industrial & Logistics', divisionId: 'industrial' },
    { name: 'Apartment and residential properties', division: 'Institutional & Community', divisionId: 'community' },
    { name: 'Commercial property and retail', division: 'Commercial & Retail', divisionId: 'commercial' },
  ],
  landmarks: [],
};

export const ALAMOSA: LocationFile = {
  city: city('alamosa'),
  path: '/locations/alamosa',
  title: 'Security guards in Alamosa.',
  lead: 'Armed and unarmed security officers for sites across Alamosa and the San Luis Valley, licensed under the city’s own security ordinance.',
  licenseTitle: 'Licensed in Alamosa',
  licenseIntro:
    'Colorado has no statewide security license. Alamosa licenses contract security companies and every officer who works in the city, under an ordinance it rewrote in 2024, and these are ours here.',
  license: [
    { label: 'Contract security license', value: 'Company and each officer', route: { note: 'Renewed each calendar year' } },
    { label: 'Armed officers', value: 'Each holds a Colorado concealed handgun permit' },
    armedRow,
    { label: 'Office', value: 'Colorado Springs, CO 80906', mono: true, route: { note: 'Headquarters, about 2.5 hours by road' } },
  ],
  local:
    'Alamosa is the center of the San Luis Valley, and its licensing is the strictest of any city we staff. Since 2024 the city has licensed contract security companies and each officer who works in the city, and every armed officer must also hold a Colorado concealed handgun permit. Ares holds the company license and licenses each officer it posts here, and we give the police chief the name of every armed officer. Here we are ready to staff public-sector and federal facilities, campuses, hospitals and clinics, commercial property and retail, and agricultural and industrial sites across Alamosa County. Our headquarters is about two and a half hours away in Colorado Springs, and a member of our leadership walks every new site before anything is signed.',
  sectorsTitle: 'Sites we are ready to staff here',
  faq: [
    {
      q: 'Does a security company need an Alamosa license?',
      a: 'Yes, and so does each officer. Colorado has no statewide security license, but Alamosa’s security ordinance (rewritten in 2024) licenses contract security companies and every officer who works in the city, and armed officers must hold a Colorado concealed handgun permit. Ares holds the company license and licenses each officer it posts here.',
    },
    {
      q: 'Do you cover sites outside Alamosa?',
      a: 'Yes, across the San Luis Valley, in Alamosa, Rio Grande, Conejos, Costilla, and Saguache counties, including Monte Vista and the US-160 corridor. Towns set their own rules, so we check what each one requires before we quote. Tell us the address and the hours, and we will tell you plainly whether we can staff it and when.',
    },
  ],
  sectors: [
    { name: 'Public-sector and federal facilities', division: 'Government & Defense', divisionId: 'government' },
    { name: 'Campuses and institutions', division: 'Institutional & Community', divisionId: 'community' },
    { name: 'Hospitals and clinics', division: 'Critical & High-Liability Sites', divisionId: 'critical' },
    { name: 'Commercial property and retail', division: 'Commercial & Retail', divisionId: 'commercial' },
    { name: 'Agricultural and industrial sites', division: 'Construction, Industrial & Logistics', divisionId: 'industrial' },
  ],
  landmarks: [{ label: 'Blanca Peak', note: '14,345 FT', lat: 37.5775, lon: -105.4856, above: true }],
  // The name to the left of its dot, so Blanca Peak can sit to the right.
  focusSide: 'left',
};

// Trinidad (owner, 2026-11-22: "we are getting licensed there"). From the City of Trinidad's
// municipal code, Chapter 9 (read 2026-11-22): a business license from the City Clerk for any business
// within city limits (Sec. 9-4), valid through the last day of February each year (Sec. 9-8). The code
// has no security-specific license (Chapters 2, 3, 8, 9, 16, and 21 searched).
export const TRINIDAD: LocationFile = {
  city: city('trinidad'),
  path: '/locations/trinidad',
  title: 'Security guards in Trinidad.',
  lead: 'Armed and unarmed security officers for sites across Trinidad and Las Animas County, on I-25 just north of Raton Pass and the New Mexico line.',
  licenseTitle: 'Licensed in Trinidad',
  licenseIntro:
    'Colorado has no statewide security license, and Trinidad has no separate security license. The city requires a business license of any business working inside city limits, and Ares holds one.',
  license: [
    { label: 'City of Trinidad business license', value: 'Active', route: { note: 'Renewed each year, through February' } },
    { label: 'Status', value: 'Armed and unarmed security' },
    armedRow,
    { label: 'Office', value: 'Colorado Springs, CO 80906', mono: true, route: { note: 'Headquarters, about 2 hours by road' } },
  ],
  local:
    'Trinidad is the seat of Las Animas County, on I-25 just north of Raton Pass and the New Mexico line. The city requires a business license of any business working inside city limits, renewed each year through February, and Ares holds one; Trinidad has no separate security license, so the standard a buyer can rely on is the company’s own. Every officer is screened before hire and trained on the post before the first shift, and armed officers are qualified by our NRA-certified firearms instructor. Here we are ready to staff public-sector facilities, hospitals and clinics, campuses, hotels and commercial property, and construction across Las Animas County. Our headquarters is about two hours up I-25, and a member of our leadership walks every new site before anything is signed.',
  sectorsTitle: 'Sites we are ready to staff here',
  faq: [
    {
      q: 'Does a security company need a Trinidad license?',
      a: 'Yes, a city business license. Colorado has no statewide security license, and Trinidad has no separate security license, but the city requires a business license of any business working inside city limits, renewed each year through February. Ares holds one.',
    },
    {
      q: 'Do you cover sites outside Trinidad?',
      a: 'Yes, across Las Animas County and up I-25 into Huerfano County, toward Walsenburg. Some towns license businesses on their own, so we check what the town requires before we quote. Tell us the address and the hours, and we will tell you plainly whether we can staff it and when.',
    },
  ],
  sectors: [
    { name: 'Public-sector facilities', division: 'Government & Defense', divisionId: 'government' },
    { name: 'Hospitals and clinics', division: 'Critical & High-Liability Sites', divisionId: 'critical' },
    { name: 'Campuses and institutions', division: 'Institutional & Community', divisionId: 'community' },
    { name: 'Hotels and commercial property', division: 'Commercial & Retail', divisionId: 'commercial' },
    { name: 'Construction sites', division: 'Construction, Industrial & Logistics', divisionId: 'industrial' },
  ],
  landmarks: [],
  // Near the plate's east edge: the name sits to the left of its dot.
  focusSide: 'left',
};

// Fort Collins (owner, 2026-11-22). From the City's sales tax guide "Engaged in Business" (May 14,
// 2024): a business that sends employees into the city to work, or keeps employees on duty at a
// location there, is engaged in business and must hold an active City of Fort Collins sales/use tax
// license (Sec. 25-91), which the City's licensing page calls its "Sales Tax/Business License". The
// City's licensing pages list no security license; Chapters 15 and 17 of the code were not read
// (Municode would not load), so the page claims no more than that.
export const FORT_COLLINS: LocationFile = {
  city: city('fort-collins'),
  path: '/locations/fort-collins',
  title: 'Security guards in Fort Collins.',
  lead: 'Armed and unarmed security officers for sites across Fort Collins, Loveland, and Larimer County, on I-25 at the north end of the Front Range.',
  licenseTitle: 'Licensed in Fort Collins',
  licenseIntro:
    'Colorado has no statewide security license. Fort Collins requires its sales and use tax license, which serves as the city’s business license, of any business that sends employees to work in the city, and Ares holds one.',
  license: [
    { label: 'City of Fort Collins sales and use tax license', value: 'Active', route: { note: 'The city’s business license' } },
    { label: 'Status', value: 'Armed and unarmed security' },
    armedRow,
    { label: 'Office', value: 'Colorado Springs, CO 80906', mono: true, route: { note: 'Headquarters, about 2 hours by road' } },
  ],
  local:
    'Fort Collins sits on I-25 at the north end of the Front Range, the seat of Larimer County and home to Colorado State University. The city requires its sales and use tax license, which doubles as its business license, of any business that sends employees to work inside city limits, and Ares holds one. Here we are ready to staff public-sector facilities, hospitals and clinics, campuses, construction, industrial and warehouse sites, and commercial property and retail across Larimer County. Every officer is screened before hire and trained on the post before the first shift, and armed officers are qualified by our NRA-certified firearms instructor. Our headquarters is about two hours down I-25 in Colorado Springs, and a member of our leadership walks every new site before anything is signed.',
  sectorsTitle: 'Sites we are ready to staff here',
  faq: [
    {
      q: 'Does a security company need a Fort Collins license?',
      a: 'Yes. Colorado has no statewide security license, but Fort Collins requires its sales and use tax license, which serves as the city’s business license, of any business that sends employees to work inside city limits, services included. Ares holds one.',
    },
    {
      q: 'Do you cover sites outside Fort Collins?',
      a: 'Yes, across Larimer County and into Weld County, including Loveland, Windsor, and Wellington. Some towns license businesses on their own, so we check what the town requires before we quote. Tell us the address and the hours, and we will tell you plainly whether we can staff it and when.',
    },
  ],
  sectors: [
    { name: 'Public-sector facilities', division: 'Government & Defense', divisionId: 'government' },
    { name: 'Hospitals and clinics', division: 'Critical & High-Liability Sites', divisionId: 'critical' },
    { name: 'Campuses and institutions', division: 'Institutional & Community', divisionId: 'community' },
    { name: 'Construction sites', division: 'Construction, Industrial & Logistics', divisionId: 'industrial' },
    { name: 'Industrial and warehouse sites', division: 'Construction, Industrial & Logistics', divisionId: 'industrial' },
    { name: 'Commercial property and retail', division: 'Commercial & Retail', divisionId: 'commercial' },
  ],
  landmarks: [],
  // North of the Front Range plate: the same plate moved up to take in Fort Collins down to Denver.
  bounds: { lon0: -106.2, lon1: -103.6, lat0: 41.1, lat1: 39.0 },
};

/** Every city page, in the hub's order. */
export const LOCATION_FILES: LocationFile[] = [COLORADO_SPRINGS, DENVER, FORT_COLLINS, PUEBLO, GRAND_JUNCTION, GLENWOOD_SPRINGS, MONTROSE, DURANGO, ALAMOSA, TRINIDAD];
