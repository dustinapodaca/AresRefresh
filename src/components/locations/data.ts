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

export type Landmark = Coord & { label: string; note?: string; side?: 'left' | 'right' };

export type LicenseRow = {
  label: string;
  value: string;
  mono?: boolean;
  route?: { label: string; href: string } | { note: string };
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
      route: { label: 'Request a copy', href: copyRequest('Colorado Springs', '0850744L') },
    },
    { label: 'Status', value: 'Licensed and bonded for armed and unarmed security' },
    { label: 'Training provider', value: 'Armed and unarmed, approved by the City of Colorado Springs' },
    { label: 'Armed endorsements', value: 'From our NRA-certified firearms instructor, a veteran' },
    { label: 'Office', value: 'Colorado Springs, CO 80906', mono: true, route: { note: 'Headquarters since 2021' } },
  ],
  sectorsTitle: 'Sites we are ready to staff here.',
  sectors: [
    { name: 'Defense contractors and military-adjacent sites', division: 'Government', divisionId: 'government' },
    { name: 'Data centers', division: 'Specialized & Armed', divisionId: 'specialized' },
    { name: 'Construction and industrial sites', division: 'Industrial & Construction', divisionId: 'industrial' },
    { name: 'Utilities and critical infrastructure', division: 'Industrial & Construction', divisionId: 'industrial' },
    { name: 'Commercial property and retail', division: 'Commercial', divisionId: 'commercial' },
    { name: 'Airport-area development', division: 'Airport & Transportation', divisionId: 'airport' },
    { name: 'Campuses and institutions', division: 'Institutional & Community', divisionId: 'community' },
  ],
  landmarks: [{ label: 'Pikes Peak', note: '14,115 FT', lat: 38.8409, lon: -105.0442, side: 'left' }],
};
