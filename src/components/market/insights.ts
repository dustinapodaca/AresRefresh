// Insights (/insights): plain buyer-education articles (docs/market-concepts.md,
// 2026-10-08). Written from facts already on the site and general, checkable practice.
// No invented statistics, clients, or response times. Drafts for the owner to review.

export type Block =
  | { p: string }
  | { list: string[] }
  | { h: string };

export type Insight = {
  slug: string;
  title: string;
  category: 'Buying security' | 'Operations' | 'Licensing';
  /** ISO date and its display form. */
  date: string;
  dateLabel: string;
  summary: string;
  body: Block[];
  related: { label: string; to: string }[];
};

const D = { date: '2026-10-08', dateLabel: 'October 8, 2026' };

export const INSIGHTS: Insight[] = [
  {
    slug: 'armed-or-unarmed-security',
    title: 'Armed or unarmed security: how to decide.',
    category: 'Buying security',
    ...D,
    summary: 'Most sites need unarmed officers. Some need armed ones. The difference is what the officer may have to stop, and what the contract, the insurer, and the law require.',
    body: [
      { p: 'Most sites need unarmed officers. Some need armed ones. The difference is not how serious a site is. It is what the officer may have to stop, and what the contract, the insurer, and the law require.' },
      { h: 'Start with the risk on site' },
      { p: 'Look at what is there and what has happened before. Armed coverage is usually considered for:' },
      { list: [
        'Cash handling, such as banks, cash rooms, and armored pickups.',
        'High-value or regulated goods, materials, or equipment.',
        'Isolated posts at night, far from help.',
        'A history of violence or armed incidents at or near the site.',
      ] },
      { p: 'Lobbies, offices, most retail, construction sites, and events are usually well served by trained, visible unarmed officers.' },
      { h: 'Check what you are required to have' },
      { p: 'Read the solicitation, the lease, and the insurance policy before deciding. Some federal posts and contracts specify armed officers. Some properties and insurers prohibit firearms on site. Either requirement settles the question.' },
      { h: 'Weigh the cost of getting it wrong' },
      { p: 'Armed officers cost more and carry more liability. An armed officer where a visible unarmed presence would do adds cost without adding much protection. An unarmed officer where the risk calls for an armed one leaves a gap.' },
      { h: 'What armed officers need' },
      { p: 'Colorado has no statewide security license, so the city sets the rules. Ask any vendor for its license in the city where your site is, and confirm that firearms qualifications are current at the time of post.' },
      { h: 'If you are not sure' },
      { p: 'Walk the site with the security company before anything is signed. A good vendor will tell you when unarmed coverage is enough.' },
    ],
    related: [
      { label: 'Armed security officers', to: '/services/armed-security-officers' },
      { label: 'Unarmed security officers', to: '/services/unarmed-security-officers' },
    ],
  },
  {
    slug: 'what-is-a-post-order',
    title: 'What a post order is, and why every site needs one.',
    category: 'Operations',
    ...D,
    summary: 'A post order is the written instruction set for one security post. It is how a site gets the same coverage on every shift, whoever is standing the post.',
    body: [
      { p: 'A post order is the written instruction set for one security post. It is how a site gets the same coverage on every shift, whoever is standing the post.' },
      { h: 'What a good post order covers' },
      { list: [
        'The post itself: location, hours, and whether it is fixed or patrol.',
        'Duties, in the order they happen on a shift.',
        'Access rules: who may enter, what they must show, and what to do when someone does not qualify.',
        'Patrol routes and checkpoints, and how each is logged.',
        'Who to call, in order, for each kind of problem.',
        'What to write down, and where the reports go.',
      ] },
      { h: 'Who writes it' },
      { p: 'The security company writes it with the client. The client knows the site and its rules. The security company knows how to turn them into instructions an officer can follow at three in the morning.' },
      { p: 'At Ares we write the post orders for every post and train each officer on them, on the post, before the first shift.' },
      { h: 'Keep it current' },
      { p: 'A post order is only as good as its last update. Change it when gates, hours, tenants, or contacts change, and retrain the officers who stand the post.' },
    ],
    related: [
      { label: 'Unarmed security officers', to: '/services/unarmed-security-officers' },
      { label: 'Access control officers', to: '/services/access-control' },
    ],
  },
  {
    slug: 'construction-site-security',
    title: 'Construction site security: what to cover during a build.',
    category: 'Operations',
    ...D,
    summary: 'An active build is open in ways a finished building is not. What to cover at the gate, on the perimeter, and after hours, and how coverage should change as the site does.',
    body: [
      { p: 'An active build is open in ways a finished building is not. Fences move, gates change, and equipment and materials sit on the ground overnight. Most theft and trespass happen in the hours nobody is there.' },
      { h: 'The gate' },
      { p: 'Every person, vehicle, and delivery that enters should be checked against a list and logged. A staffed gate is also the simplest deterrent a site has.' },
      { h: 'The perimeter' },
      { p: 'Rounds on a set schedule catch cut fences, open gates, and damage before they become losses. Each checkpoint should be logged with a time.' },
      { h: 'After hours' },
      { p: 'Sites that close at night need either an officer on post or a patrol that checks the site on a schedule and responds when an alarm trips. Many builds use both at different phases.' },
      { h: 'Change coverage as the site changes' },
      { p: 'A build at excavation needs different coverage than a build at fit-out. Revisit the post orders and staffing whenever gates, hours, or the value on site change.' },
    ],
    related: [
      { label: 'Construction and industrial sites', to: '/industries/construction-industrial' },
      { label: 'Mobile patrol', to: '/services/mobile-patrol' },
    ],
  },
  {
    slug: 'buying-security-through-gsa',
    title: 'How agencies can buy security services through a GSA Schedule.',
    category: 'Buying security',
    ...D,
    summary: 'The GSA Multiple Award Schedule lets agencies order security services at pre-negotiated pricing without opening a new competition. How it works, and how to check a vendor.',
    body: [
      { p: 'The GSA Multiple Award Schedule (MAS) is a set of long-term, government-wide contracts with pre-negotiated ceiling prices. Security guard and patrol services sit under SIN 561612.' },
      { h: 'How ordering works' },
      { p: 'Agencies place orders against a vendor’s schedule contract using the ordering procedures in FAR subpart 8.4, often by sending a request for quotes to schedule holders through GSA eBuy. There is no need to open a new full and open competition, and agencies can still ask for a price reduction on a specific order.' },
      { h: 'Set-asides' },
      { p: 'Agencies may set aside orders under the schedule for small businesses, including women-owned small businesses, at their discretion.' },
      { h: 'How to check a vendor' },
      { list: [
        'Look up the contract number on GSA eLibrary to confirm the schedule and SIN.',
        'Look up the vendor’s UEI on SAM.gov to confirm the registration is active.',
        'Ask for the vendor’s licenses in the city where the work is, since Colorado has no statewide security license.',
      ] },
      { h: 'Ares on the schedule' },
      { p: 'Ares holds GSA MAS contract 47QSMS25D009Q under SIN 561612, is active on SAM.gov (UEI XQXDN6E33SF4, CAGE 9KL18), and is an SBA-certified woman-owned small business (WOSB250470).' },
    ],
    related: [
      { label: 'Government and military facilities', to: '/industries/government-military' },
      { label: 'Capability Statement', to: '/capability-statement' },
    ],
  },
  {
    slug: 'colorado-security-licensing',
    title: 'Security licensing in Colorado: why the city matters.',
    category: 'Licensing',
    ...D,
    summary: 'Colorado has no statewide license for security companies or officers. Cities license them instead, so the right license depends on where your site is.',
    body: [
      { p: 'Colorado has no statewide license for security companies or security officers. Instead, several cities license security themselves, so the license that matters depends on where your site is.' },
      { h: 'How the three biggest Front Range cities do it' },
      { list: [
        'Denver issues a Private Security Employer license to companies.',
        'Colorado Springs issues a Contract Security Agency license.',
        'Pueblo licenses security through the Pueblo Police Department.',
      ] },
      { p: 'Several other cities license security on their own as well. If your site is somewhere else, check with that city before you hire.' },
      { h: 'What to ask a vendor' },
      { list: [
        'Its license number in the city where your site is, and where you can verify it.',
        'Whether it is bonded and insured for armed or unarmed work, as your post requires.',
        'Who trains its officers, and whether it is an approved training provider in that city.',
      ] },
      { h: 'Ares’ licenses' },
      { p: 'Ares is licensed and bonded for armed and unarmed security, and is an approved armed and unarmed training provider, in Colorado Springs, Denver, and Pueblo. Each license is listed, with a way to verify it, on our city pages.' },
    ],
    related: [
      { label: 'Colorado Springs', to: '/locations/colorado-springs' },
      { label: 'Denver', to: '/locations/denver' },
      { label: 'Pueblo', to: '/locations/pueblo' },
    ],
  },
];

export const insightBySlug = (slug?: string) => INSIGHTS.find((i) => i.slug === slug);
