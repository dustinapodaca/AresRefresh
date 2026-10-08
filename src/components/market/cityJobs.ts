// City job pages (/careers/<city>): recruiting by city, beside the city service pages
// (docs/market-concepts.md, 2026-10-08). Roles come from the Careers roles list.
export type CityJobs = {
  slug: 'colorado-springs' | 'denver' | 'pueblo';
  city: string;
  title: string;
  lead: string;
  licensing: string;
};

export const CITY_JOBS: CityJobs[] = [
  {
    slug: 'colorado-springs',
    city: 'Colorado Springs',
    title: 'Security jobs in Colorado Springs.',
    lead: 'Armed and unarmed security officer jobs with the company headquartered here since 2021, with paid training and schedules you can plan a life around.',
    licensing: 'Colorado Springs licenses security officers. Ares is an approved armed and unarmed training provider in the city, so we train new officers for the licensing their post requires.',
  },
  {
    slug: 'denver',
    city: 'Denver',
    title: 'Security jobs in Denver.',
    lead: 'Armed and unarmed security officer jobs across the Denver metro area, with paid training and schedules you can plan a life around.',
    licensing: 'Denver licenses security officers. Ares is an eligible armed and unarmed training provider in Denver, so we train new officers for the licensing their post requires.',
  },
  {
    slug: 'pueblo',
    city: 'Pueblo',
    title: 'Security jobs in Pueblo.',
    lead: 'Armed and unarmed security officer jobs in Pueblo, with paid training and schedules you can plan a life around.',
    licensing: 'Pueblo licenses security officers through the Pueblo Police Department. Ares is an approved armed and unarmed training provider there, so we train new officers for the certificates their post requires.',
  },
];

export const cityJobsBySlug = (slug?: string) => CITY_JOBS.find((c) => c.slug === slug);
