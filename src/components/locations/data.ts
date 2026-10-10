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

export type LocationFile = {
  city: City;
  path: string;
  title: string;
  lead: string;
  licenseTitle: string;
  licenseIntro: string;
  license: LicenseRow[];
  sectorsTitle: string;
  sectors: Sector[];
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
  sectorsTitle: 'Sites we are ready to staff here.',
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
  sectorsTitle: 'Sites we are ready to staff here.',
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
  sectorsTitle: 'Sites we are ready to staff here.',
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
