// Insights (/insights): plain buyer-education articles (docs/market-concepts.md,
// 2026-10-08). Written from facts already on the site and general, checkable practice.
// No invented statistics, clients, or response times. Drafts for the owner to review.

import type { Faq } from './roles';

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
  /** Optional questions after the article, in the site's questions block with FAQPage
   *  structured data (owner, 2026-10-26): short answers an assistant can quote whole. */
  faq?: Faq[];
  related: { label: string; to: string }[];
};

const D = { date: '2026-10-08', dateLabel: 'October 8, 2026' };

export const INSIGHTS: Insight[] = [
  {
    // Third monthly article (2026-10-26): the vetting checklist, written for the questions
    // buyers ask AI assistants ("how do I choose a security company in Denver"). Every Ares fact
    // is already on the site: the city licenses, the site walk, post orders and training on the
    // post by leadership, on-call scheduling and the missed-shift record, the same officers on a
    // site (About, "What clients told us"), and the federal identifiers. Ares staffs posts with
    // both W-2 and 1099 officers (owner, 2026-10-26), so the employment section stays neutral.
    // The rest is general, checkable practice.
    slug: 'how-to-choose-a-security-company-colorado',
    title: 'How to choose a security company in Colorado.',
    category: 'Buying security',
    date: '2026-10-26',
    dateLabel: 'October 26, 2026',
    summary: 'Most security companies look alike on paper. What to check before you sign: the city license, the insurance certificate, who the officers work for, and who covers the post when something goes wrong.',
    body: [
      { p: 'Most security companies look alike on paper: licensed, insured, trained, available around the clock. The differences show up after the contract starts, when an officer calls out, a post order changes, or something goes wrong on a shift. These questions find those differences before you sign.' },
      { h: 'Check the license for the city your site is in' },
      { p: 'Colorado has no statewide license for security companies or officers. Cities such as Denver, Colorado Springs, and Pueblo license them instead, so a company licensed in one city is not automatically licensed in another. Ask for the license number in the city where your site is, and look it up yourself. If the post is armed, confirm the license covers armed work.' },
      { h: 'Ask for the insurance certificate, not a promise' },
      { p: 'Ask for a certificate of insurance before the first shift, and ask to be named as an additional insured if your lease, lender, or contract requires it. Check general liability and workers’ compensation, and for an armed post, that the coverage includes armed work. Compare the limits to what your own contracts and insurer require.' },
      { h: 'Ask who the officers work for' },
      { p: 'Security companies staff posts with their own employees, independent contractors, or both. Either can work. What matters is that the answers are the same for every officer on your post: who trains them on your site, who supervises them, who covers for them when they call out, and whose insurance applies if one is hurt on your property. Ask the company to answer for every officer it would send, not only its employees.' },
      { h: 'Ask how a post starts' },
      { p: 'A good company walks your site before anything is signed, then sends a proposal scoped to that site: posts, hours, duties, armed or unarmed. A quote sent without a site walk is a guess. Ask who writes the post orders, and who trains the officer on them before the first shift.' },
      { h: 'Ask who covers a call-out' },
      { p: 'Every roster runs short sometimes. Ask what happens when an officer calls out at 2 a.m.: who finds the replacement, how fast, and whether the relief officer has ever seen your site. Ask for the company’s missed-shift record if it keeps one.' },
      { h: 'Ask whether you will see the same officers' },
      { p: 'Officers who know a site notice what is out of place. Officers who rotate every week do not. Ask whether the company keeps the same officers on a post, and how a new officer learns the site when someone does step in.' },
      { h: 'Ask who answers when something goes wrong' },
      { p: 'Ask for the name of the person you will call, and whether someone in leadership answers after hours. Ask how you will hear about a late officer, a staffing change, or an incident: a call, an email, a report, or the next invoice.' },
      { h: 'For federal agencies and prime contractors' },
      { list: [
        'Look up the company’s UEI on SAM.gov to confirm its registration is active.',
        'If it says it holds a GSA Schedule, look up the contract number on GSA eLibrary.',
        'If you need small-business or diverse-supplier credit, get the certificate numbers and confirm them with the certifier: the SBA for WOSB, WBENC for WBE, the city for local certifications.',
        'Ask for past performance on similar posts, and references you can call.',
      ] },
      { h: 'Red flags' },
      { list: [
        'No license number for the city where your site is, or one you cannot verify.',
        'A price quoted without anyone seeing the site.',
        'No clear answer on who covers a call-out.',
        'No certificate of insurance before the first shift.',
        'A contact who can only be reached during business hours.',
      ] },
      { h: 'How Ares answers these' },
      { p: 'Ares is licensed and bonded for armed and unarmed security in Colorado Springs, Denver, and Pueblo. Our city pages list each license number, with a link to look up the Colorado Springs and Denver licenses in the city’s own records. A member of our leadership walks every site before anything is signed, and we write the post orders for every post. Every officer we send, employee or contractor, trains on them with our leadership, on the post, before the first shift. Every contract has on-call scheduling behind it, and since 2021 we have missed fewer than 1% of shifts. We keep the same officers on a site whenever we can.' },
      { p: 'For federal buyers, Ares holds GSA MAS contract 47QSMS25D009Q, is active on SAM.gov (UEI XQXDN6E33SF4, CAGE 9KL18), and is an SBA-certified woman-owned small business (WOSB250470).' },
    ],
    faq: [
      {
        q: 'Does a security company need a state license in Colorado?',
        a: 'No. Colorado has no statewide license for security companies or officers. Cities license them instead, including Denver, Colorado Springs, and Pueblo, so check the license for the city your site is in.',
      },
      {
        q: 'What insurance should a security company carry?',
        a: 'Ask for a certificate of insurance showing general liability and workers’ compensation, with coverage for armed work if the post is armed, and limits that meet your own contracts. Ask to be named as an additional insured if your lease, lender, or contract requires it.',
      },
      {
        q: 'Should a security company visit my site before quoting?',
        a: 'Yes. A quote sent without a site walk is a guess. The company should see the site first, then propose the posts, hours, duties, and armed or unarmed coverage it needs.',
      },
    ],
    related: [
      { label: 'Security licensing in Colorado', to: '/insights/colorado-security-licensing' },
      { label: 'Who covers the post when an officer calls out?', to: '/insights/relief-surge-coverage' },
      { label: 'Capability Statement', to: '/capability-statement' },
    ],
  },
  {
    // Topic 1 of the copy audit's Insights list (2026-10-19): what drives the price, with no
    // rates (the audit's note). Every Ares fact is already on the site: the site walk before
    // anything is signed, the scoped proposal, training on the post, on-call relief, the GSA
    // schedule, and the city licenses. The rest is general, checkable practice.
    slug: 'security-guard-cost-colorado',
    title: 'How much do security guards cost in Colorado?',
    category: 'Buying security',
    date: '2026-10-19',
    dateLabel: 'October 19, 2026',
    summary: 'The price of a security officer comes down to a handful of choices: the hours, armed or unarmed, a post or a patrol, and what the site asks of the officer. What drives each one, and how to compare quotes.',
    body: [
      { p: 'The price of security comes down to a handful of choices: how many hours the post is staffed, whether the officer is armed, whether the site needs a fixed post or a patrol, and what the site asks of the officer. Two posts with the same title can differ on most of them, which is why we quote each site rather than publish rates.' },
      { h: 'Hours are the biggest factor' },
      { p: 'A post is billed by the hour it is staffed, so the schedule sets most of the cost. A post staffed around the clock is 168 hours a week, the work of more than four full-time officers. Holidays, overnight shifts, and overtime can raise the cost of the same hours.' },
      { p: 'Before asking for a quote, decide which hours actually need an officer. Many sites need a full post only at night and on weekends.' },
      { h: 'Armed or unarmed' },
      { p: 'Armed officers cost more. They need firearms training and current qualifications, and they carry more liability. Most sites are well served by unarmed officers; some contracts, insurers, and risks call for armed ones.' },
      { h: 'A fixed post or a patrol' },
      { p: 'A fixed post keeps one officer on site for the whole shift. A mobile patrol visits on a schedule and checks the site, so its cost is shared with other stops on the route. A site that needs eyes on it a few times a night may not need a full post.' },
      { h: 'What the post asks of the officer' },
      { list: [
        'Access control, visitor screening, or an access system to run.',
        'Restricted areas or escort duty, with their own rules for entry.',
        'Training on the site, its post orders, and its systems.',
        'Reports, logs, and checkpoints the client wants to review.',
      ] },
      { p: 'Each one adds skill or time, and so cost. Each one is also a reason the cheapest officer may not be the right one for the post.' },
      { h: 'Wage rules set a floor' },
      { p: 'Officer pay is most of the price, and the law sets its minimum. Denver sets its own minimum wage, above the state’s. Federal service contracts usually fall under the Service Contract Act, which sets the wages and benefits for each area from the Department of Labor’s wage determination.' },
      { h: 'Relief and supervision belong in the price' },
      { p: 'A low hourly rate can leave out what keeps a post covered: relief officers for call-outs and vacations, supervision, and training on the site. Ask what happens when an officer calls out, and whether that cover is part of the rate. At Ares, every contract has on-call scheduling behind it, and a member of our leadership trains each officer on the post before the first shift.' },
      { h: 'How to compare quotes' },
      { list: [
        'Give every vendor the same scope: posts, hours, armed or unarmed, and duties.',
        'Ask what the rate includes, such as relief, supervision, training, and reports.',
        'Ask for the vendor’s license in the city where the site is, since Colorado has no statewide security license.',
        'Ask to walk the site before anything is signed.',
      ] },
      { p: 'We walk every site before anything is signed, then send a scoped proposal for that site. Agencies can also order through our GSA Schedule, which carries pre-negotiated ceiling prices.' },
    ],
    related: [
      { label: 'Mobile Patrol', to: '/services/mobile-patrol' },
      { label: 'Commercial & Retail', to: '/industries/commercial-property' },
    ],
  },
  {
    // First of the copy audit's monthly topics (owner asked for a draft, 2026-10-11). Every
    // fact is already on the site: the relief schedule's fill times (owner, 2026-10-10), the
    // missed-shift record, training on the post, and the certification numbers.
    slug: 'relief-surge-coverage',
    // Retitled as a question (web audit, 2026-10-18) so it stops competing with the service page.
    title: 'Who covers the post when an officer calls out?',
    category: 'Operations',
    date: '2026-10-11',
    dateLabel: 'October 11, 2026',
    summary: 'Every security roster runs short sometimes. What to arrange before a call-out, an inspection, or a contract change leaves a post empty.',
    body: [
      { p: 'Every security roster runs short sometimes. An officer calls out, a vacation lands on a holiday week, an inspection needs extra posts, or a contract changes hands. The sites that handle it well arranged the coverage before the gap opened.' },
      { h: 'Relief, overflow, and surge are different needs' },
      { list: [
        'Relief covers a regular post when its officer is out: call-outs, vacations, and training days.',
        'Overflow adds posts when a site adds entrances, phases, or hours.',
        'Surge staffs a short, busy stretch: an inspection, an outage or storm event, a construction phase, or a contract transition.',
      ] },
      { p: 'All three need officers who can stand the post on short notice and know its rules when they arrive.' },
      { h: 'What to line up in advance' },
      { list: [
        'Current post orders for every post that might need cover, so a relief officer works to the same instructions as the regular one.',
        'The dates you already know will be hard to cover, such as holidays, inspections, and planned shutdowns.',
        'What a new officer needs to get on site: badges, access lists, or an escort.',
        'Who calls for cover, who they call, and how much notice they can usually give.',
        'Uniforms, agreed up front.',
      ] },
      { h: 'Train before the shift, not during it' },
      { p: 'A relief officer who has never seen the site is the weakest point in a roster. Ask the security company how its relief officers learn a post. At Ares, a member of our leadership trains each officer on the post before the first shift, relief and surge officers included.' },
      { h: 'Ask how fast cover really comes' },
      { p: 'Get an answer for your posts, not a general promise. Posts we already staff are covered the same shift from our relief schedule. A new post usually takes about a week, because every officer trains on the site first.' },
      { p: 'Since 2021, Ares has missed fewer than 1% of shifts, with on-call scheduling in every contract.' },
      { h: 'For prime contractors and other security companies' },
      { p: 'Relief and surge work is often subcontracted. If you hold the contract, check that the subcontractor is licensed in the city where the site is, will work under your post orders, and counts toward your small-business goals. Ares is an SBA-certified woman-owned small business (WOSB250470) and a WBENC-certified Women\u2019s Business Enterprise (WBE2303571), licensed and bonded in Colorado Springs, Denver, and Pueblo.' },
    ],
    related: [
      { label: 'Relief & Surge Coverage', to: '/services/relief-surge-coverage' },
      { label: 'Construction, Industrial & Logistics', to: '/industries/construction-industrial' },
      { label: 'Teaming & subcontracting', to: '/teaming' },
    ],
  },
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
      { label: 'Armed Security Officers', to: '/services/armed-security-officers' },
      { label: 'Unarmed Security Officers', to: '/services/unarmed-security-officers' },
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
      { label: 'Unarmed Security Officers', to: '/services/unarmed-security-officers' },
      { label: 'Access Control Officers', to: '/services/access-control' },
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
      { label: 'Construction, Industrial & Logistics', to: '/industries/construction-industrial' },
      { label: 'Mobile Patrol', to: '/services/mobile-patrol' },
    ],
  },
  {
    slug: 'buying-security-through-gsa',
    title: 'How agencies can buy security services through a GSA Schedule.',
    category: 'Buying security',
    ...D,
    summary: 'The GSA Multiple Award Schedule lets agencies order security services at pre-negotiated ceiling prices through streamlined procedures. How it works, and how to check a vendor.',
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
      { label: 'Government & Defense', to: '/industries/government-defense' },
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
      { p: 'Some other cities may license security too. If your site is somewhere else, check with that city before you hire.' },
      { h: 'What to ask a vendor' },
      { list: [
        'Its license number in the city where your site is, and where you can verify it.',
        'Whether it is bonded and insured for armed or unarmed work, as your post requires.',
        'Who trains its officers, and whether it is an approved training provider in that city.',
      ] },
      { h: 'Ares’ licenses' },
      { p: 'Ares is licensed and bonded for armed and unarmed security, and is a training provider for armed and unarmed officers, in Colorado Springs, Denver, and Pueblo. Each license is listed on our city pages, with a way to verify it or request a copy.' },
    ],
    related: [
      { label: 'Colorado Springs', to: '/locations/colorado-springs' },
      { label: 'Denver', to: '/locations/denver' },
      { label: 'Pueblo', to: '/locations/pueblo' },
    ],
  },
];

export const insightBySlug = (slug?: string) => INSIGHTS.find((i) => i.slug === slug);
