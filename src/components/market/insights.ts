// Insights (/insights): plain buyer-education articles (docs/market-concepts.md,
// 2026-10-08). Written from facts already on the site and general, checkable practice.
// No invented statistics, clients, or response times. Drafts for the owner to review.

import type { Faq } from './roles';

export type Block =
  | { p: string }
  | { list: string[] }
  | { h: string }
  | { doc: DocLink };

/** A downloadable document shown in the article as a preview image (2026-11-19): a sample the
 *  reader can open, such as the escort post order in public/files. */
export type DocLink = {
  href: string;
  image: string;
  width: number;
  height: number;
  alt: string;
  /** The link's words, e.g. "Download the sample post order". */
  label: string;
  /** Mono caption under the preview: what it is, pages, format, size. */
  meta: string;
};

/** The sample escort post order (2026-11-19), built in the Ares Proposals design. */
const SAMPLE_POST_ORDER: DocLink = {
  href: '/files/Ares-Security-Sample-Escort-Post-Order.pdf',
  image: '/images/insights/sample-post-order-preview.webp',
  width: 1472,
  height: 963,
  alt: 'The cover and the On Shift page of the Ares sample post order for a contractor escort post',
  label: 'Download the sample post order (PDF)',
  meta: 'Contractor escort post order · 4 pages · PDF',
};

/** The four topics, in the order the index offers them (2026-11-19: "Federal & teaming" split
 *  out for the prime, escort, and GSA articles, so federal buyers and primes find theirs). */
export const CATEGORIES = ['Buying security', 'Operations', 'Federal & teaming', 'Licensing'] as const;
export type InsightCategory = (typeof CATEGORIES)[number];

export type Insight = {
  slug: string;
  title: string;
  category: InsightCategory;
  /** ISO date and its display form. */
  date: string;
  dateLabel: string;
  /** The last real content change, when there has been one after publishing (2026-10-26):
   *  shown beside the date and sent as the Article's dateModified, so refreshes read as fresh. */
  updated?: string;
  updatedLabel?: string;
  summary: string;
  body: Block[];
  /** Questions under the article, with FAQPage structured data (2026-10-26). Answers repeat
   *  facts from the body or its sources only. */
  faq?: Faq[];
  /** Primary sources the article relies on, listed under it (2026-10-26). */
  sources?: { label: string; url: string }[];
  related: { label: string; to: string }[];
};

// The refresh that added questions, sources, and related articles to every insight.
const U = { updated: '2026-10-26', updatedLabel: 'October 26, 2026' };
// The refresh of the five shortest or least-clicked articles (owner, 2026-11-19).
const U2 = { updated: '2026-11-19', updatedLabel: 'November 19, 2026' };

// Primary sources, shared across articles.
const SRC = {
  sam: { label: 'SAM.gov entity registrations', url: 'https://sam.gov' },
  elibrary: { label: 'GSA eLibrary', url: 'https://www.gsaelibrary.gsa.gov/' },
  far84: { label: 'FAR subpart 8.4, Federal Supply Schedules (Acquisition.gov)', url: 'https://www.acquisition.gov/far/subpart-8.4' },
  // GSA has already found schedule prices fair and reasonable; agencies may still ask for discounts.
  far8404: { label: 'FAR 8.404, Use of Federal Supply Schedules (Acquisition.gov)', url: 'https://www.acquisition.gov/far/8.404' },
  wageDeterminations: { label: 'Service Contract Act wage determinations (SAM.gov)', url: 'https://sam.gov/content/wage-determinations' },
  coWage: { label: '2026 COMPS Order poster: Colorado minimum wage (CDLE)', url: 'https://cdle.colorado.gov/sites/cdle/files/2026_comps_order_poster_english_%5Baccessible%5D.pdf' },
  blsState: { label: 'May 2025 state occupational employment and wage estimates (BLS)', url: 'https://www.bls.gov/oes/2025/may/oessrcst.htm' },
  // 2027 rates announced in August 2026 (CDLE for the state, the City and County of Denver for Denver);
  // Denver Labor's own page did not list 2027 yet on 2026-11-19. Swap for the official pages when posted.
  coWage2027: { label: 'Colorado minimum wage to rise to $15.71 in 2027 (ColoradoBiz)', url: 'https://coloradobiz.com/colorado-minimum-wage-rise-15-71-2027/' },
  denverWage2027: { label: 'Denver minimum wage rising to $19.84 in 2027 (Denver Gazette)', url: 'https://www.denvergazette.com/?p=572677' },
  gsaScls: { label: 'Service Contract Labor Standards and GSA Schedule Orders (GSA)', url: 'https://www.gsa.gov/system/files/Service_Contract_Labor_Standards_and_GSA_Schedule_Orders.pdf' },
  denverWage: { label: 'Denver citywide minimum wage (Denver Labor)', url: 'https://denvergov.org/Government/Agencies-Departments-Offices/Agencies-Departments-Offices-Directory/Auditors-Office/Denver-Labor/Citywide-Minimum-Wage' },
  denverGuards: { label: 'Denver security guard licensing FAQ (City and County of Denver)', url: 'https://www.denvergov.org/Government/Agencies-Departments-Offices/Agencies-Departments-Offices-Directory/Business-Licensing/Business-licenses/Security-services/Frequently-asked-questions-security-guards' },
  denverSecurity: { label: 'Denver security services licenses (City and County of Denver)', url: 'https://www.denvergov.org/Government/Agencies-Departments-Offices/Agencies-Departments-Offices-Directory/Business-Licensing/Business-licenses/Security-services' },
  cosAgency: { label: 'Contract Security Agency License (City of Colorado Springs)', url: 'https://coloradosprings.gov/node/47636' },
  puebloGuard: { label: 'Security guard license application (Pueblo Police Department)', url: 'https://www.pueblo.us/DocumentCenter/View/29092/Security-Guard--Hack-License-Application' },
};

const D = { date: '2026-10-08', dateLabel: 'October 8, 2026' };

export const INSIGHTS: Insight[] = [
  {
    // Access control (owner, 2026-11-19): picked from Search Console, where "onsite access control
    // officers" and "access control security guards" showed impressions on pages 4 to 6 next to the
    // escort cluster that already ranks. Federal rules from TSA's REAL ID final-rule release
    // (enforcement May 7, 2025), Offutt AFB's REAL ID notice for installations, DoDM 5200.08 Vol. 3,
    // FIPS 201-3 (PIV), and CISA's page on the ISC Risk Management Process. Ares facts as on
    // /services/access-control and the escort article: no badges issued, trained on the site's systems,
    // restricted areas on military installations alongside base security forces, the base unnamed, no
    // clearance claims (DESIGN.md, Clearances).
    slug: 'what-does-an-access-control-officer-do',
    title: 'What an access control officer does, and when a site needs one.',
    category: 'Operations',
    date: '2026-11-19',
    dateLabel: 'November 19, 2026',
    summary: 'Badges and card readers set the rules for who gets in. An access control officer applies them at the door or gate, handles what the system cannot, and logs who came and went. What the post covers, and when a site needs one.',
    body: [
      { p: 'An access control officer decides who and what gets into a site. Badges, card readers, and visitor software set the rules; the officer is the person at the door or gate who applies them, handles everything the system cannot, and keeps a record of who came and went.' },
      { h: 'What an access control officer does' },
      { list: [
        'Checks every person against the access list or a valid credential before entry, and does not wave anyone through on a familiar face.',
        'Signs in visitors: confirms who they are and who they are there to see, issues a temporary pass if the site uses them, and logs the visit.',
        'Checks vehicles and deliveries against the schedule or the site’s delivery list, and sends them to the right gate, dock, or door.',
        'Watches for tailgating, when someone follows an authorized person through a door or gate without using their own credential.',
        'Turns away anyone who does not meet the rules, and calls the contact the post orders name.',
        'Logs every entry, exit, denial, and incident, so the site can audit them later.',
      ] },
      { h: 'Access control officer, site officer, or patrol?' },
      { p: 'A site or lobby officer watches an area and responds to what happens in it. A patrol officer moves between places on a schedule. An access control officer holds an entry point and controls what passes through it. Many posts combine the roles, so the post orders should say which comes first. When a line forms at the gate, the gate is the job.' },
      { h: 'Why badges alone are not enough' },
      { p: 'Card readers and visitor software do a lot, but each leaves a gap a person has to cover:' },
      { list: [
        'A card reader confirms a badge, not the person holding it, and it cannot stop someone from following them through the door.',
        'Visitors, vendors, and new contractors often arrive without a badge, and someone has to decide whether they get in.',
        'A truck has to be matched to a delivery and a dock, not just let through a gate.',
        'When a reader fails or the power goes out, someone has to control the door by hand.',
        'Some contracts, leases, insurers, and regulations call for a staffed post at certain entry points.',
      ] },
      { h: 'When a site needs a staffed post' },
      { list: [
        'The site holds high-value goods, hazardous materials, or critical equipment.',
        'Many visitors, vendors, or contractors arrive every day, especially around shift changes.',
        'Trucks and deliveries come through a gate or dock that has to be checked.',
        'Part of the site is restricted, and only some people may enter it.',
        'A contract, lease, insurer, or regulation requires one.',
        'An entry point has had trespass, theft, or tailgating problems.',
      ] },
      { h: 'Federal buildings and military installations' },
      { p: 'Federal sites add rules of their own. Since May 7, 2025, a state driver’s license or ID card used to enter a federal facility that checks identification must be REAL ID compliant. A passport or another acceptable document works instead. Federal employees and contractors carry a PIV card, the credential the federal standard (FIPS 201) sets for physical access to federally controlled facilities.' },
      { p: 'On military installations, unescorted access takes proof of identity, a determination of fitness from a review of the person’s records, and an official purpose, under the Defense Department’s installation access manual (DoDM 5200.08, Volume 3). Installations turn visitors away at the gate when their ID is not REAL ID compliant and they have no other acceptable document. Restricted areas inside a base have entry rules of their own, and people who do not meet them may enter only as the installation allows, often under escort.' },
      { p: 'Nonmilitary federal facilities set their protection through the Interagency Security Committee’s Risk Management Process, the standard for deciding a facility’s security level and the countermeasures that go with it. The access rules an officer enforces there come from that process and the agency’s own policy.' },
      { h: 'What to put in the post orders' },
      { list: [
        'Every entry point the post covers, and its hours.',
        'Who may enter, how they prove it, and where the current access list lives.',
        'How visitors sign in, who may sponsor them, and whether they need an escort.',
        'How vehicles and deliveries are checked, and where they go.',
        'What the officer does when someone is turned away, a reader fails, or someone tailgates, and who they call.',
        'What gets logged, in what form, and who reviews the log.',
      ] },
      { h: 'Armed or unarmed?' },
      { p: 'Most access control posts are unarmed. An armed post is usually for a site where the officer may have to stop a serious threat at the entry point, or where the contract or the site’s own rules call for one.' },
      { h: 'How Ares staffs access control' },
      { p: 'Ares staffs access control in Colorado Springs, the Denver metro area, and Pueblo, where we are licensed and bonded for armed and unarmed security: gates and docks at data centers, utilities, and construction sites, building entries, and restricted areas on military installations, where we work alongside base security forces. Since 2025, Ares has provided restricted-area escort and access control on a Space Force base in Colorado, as a subcontractor on a federal construction program.' },
      { p: 'We write your access rules into the post orders, and train each officer on your entry points and your site’s own systems, such as card readers, visitor software, and intercoms, before the first shift. Every check is logged, so you can audit who came and went. Badges stay yours to issue; our officers enforce them. Every contract has on-call coverage behind it.' },
    ],
    faq: [
      { q: 'What does an access control officer do?', a: 'Checks every person, vehicle, and delivery against the site’s access list or credentials before entry, signs in visitors, watches for tailgating, turns away anyone who does not meet the rules, and logs who came and went.' },
      { q: 'What is tailgating in security?', a: 'Tailgating is when someone follows an authorized person through a controlled door or gate without using their own credential. A card reader cannot stop it; an officer at the entry point can.' },
      { q: 'Do I need a REAL ID to enter a federal building or military base?', a: 'Since May 7, 2025, a state driver’s license or ID card used to enter a federal facility that checks identification must be REAL ID compliant. A passport or another acceptable document works instead. Check the facility’s or installation’s own list before you go.' },
      { q: 'Do access control officers issue badges?', a: 'That depends on the site. Many sites keep badging with their own security or facilities team, and the officers check badges and enforce the rules. Ares officers enforce the site’s badges; issuing them stays with the site.' },
    ],
    sources: [
      { label: 'TSA publishes final rule on REAL ID enforcement beginning May 7, 2025 (TSA)', url: 'https://tsa.gov/news/press/releases/2025/01/13/tsa-publishes-final-rule-real-id-enforcement-beginning-may-7-2025' },
      { label: 'REAL ID compliance for federal installations (Offutt Air Force Base)', url: 'https://www.offutt.af.mil/News/Article-Display/Article/4196916/real-id-compliance-for-federal-installations/' },
      { label: 'DoDM 5200.08, Volume 3: Physical Security Program: Access to DoD Installations', url: 'https://www.esd.whs.mil/Portals/54/Documents/DD/issuances/dodm/520008_vol3.pdf' },
      { label: 'FIPS 201-3, Personal Identity Verification (PIV) of Federal Employees and Contractors (NIST)', url: 'https://pages.nist.gov/FIPS201/FIPS201.html' },
      { label: 'ISC Standard: Risk Management Process (CISA)', url: 'https://www.cisa.gov/publication/risk-management-process' },
    ],
    related: [
      { label: 'Access Control Officers', to: '/services/access-control' },
      { label: 'Escorts for contractors on military bases: how they work', to: '/insights/contractor-escorts-military-bases' },
      { label: 'What a security post order is, with an example', to: '/insights/what-is-a-post-order' },
      { label: 'Armed or unarmed security: how to decide', to: '/insights/armed-or-unarmed-security' },
      { label: 'Critical & High-Liability Sites', to: '/industries/critical-infrastructure' },
    ],
  },
  {
    // Topic 6 of the copy audit's Insights list (owner picked it, 2026-11-09): what primes check before
    // naming a security subcontractor. Rules from the FAR as published on Acquisition.gov (FAC 2026-01):
    // 19.702 (plan thresholds), 52.219-9 (goals, eSRS, good faith, relying on representations), 52.219-14
    // and 19.001 (limitations on subcontracting, similarly situated), 52.222-41 (SCA flow-down); the 5%
    // goal from SBA's WOSB page; Denver's goals from DSBO. Ares facts as on /teaming and the Capability
    // Statement; the base stays unnamed and there are no clearance claims (DESIGN.md, Clearances).
    slug: 'what-primes-look-for-security-subcontractor',
    title: 'What prime contractors look for in a small-business security subcontractor.',
    category: 'Federal & teaming',
    date: '2026-11-09',
    dateLabel: 'November 9, 2026',
    summary: 'Primes bring in a security subcontractor to staff posts and to meet small-business goals. What they check before naming one in a proposal: whether the work counts, whether the status can be verified, and whether the posts will be covered.',
    body: [
      { p: 'Prime contractors bring in a security subcontractor for two reasons: to staff posts they cannot cover with their own people, and to meet the small-business goals in their contract. A good subcontractor does both, and a prime checks both before it names one in a proposal.' },
      { h: 'Does the work count toward the prime’s goals?' },
      { p: 'On a federal contract expected to exceed $900,000 ($2 million for construction), a prime that is not a small business must have a small-business subcontracting plan. The plan sets separate goals for small businesses and for women-owned, small disadvantaged, HUBZone, veteran-owned, and service-disabled veteran-owned small businesses. The prime reports what it actually paid them in the Electronic Subcontracting Reporting System (eSRS).' },
      { p: 'The goals carry weight. Failing to make a good-faith effort to meet the plan is a material breach of the contract, and it can count against the prime in past performance evaluations. A women-owned small business counts toward both the small-business goal and the women-owned goal. Government-wide, the goal is to award at least 5% of federal contracting dollars to women-owned small businesses.' },
      { h: 'When the prime is a small business' },
      { p: 'On a small-business set-aside the rule runs the other way. A small prime on a services contract may not pay more than 50% of what the government pays it to subcontractors that are not similarly situated. A similarly situated subcontractor has the same small-business status that qualified the prime for the award, and is small under the NAICS code the prime assigns to the subcontract.' },
      { list: [
        'On a small-business set-aside, any small business is similarly situated.',
        'On a women-owned small business set-aside, a women-owned small business is.',
        'Work a similarly situated subcontractor passes on to another company still counts toward the prime’s 50%.',
      ] },
      { h: 'Can its status be checked?' },
      { p: 'A prime takes a subcontractor’s status on its word only as far as the rules allow. It may rely on a current written representation or on the subcontractor’s representations in SAM.gov, and a prime acting in good faith is not liable for a subcontractor’s misrepresentation. Most primes check anyway:' },
      { list: [
        'SAM.gov, for an active registration, the UEI, and the size and status the company represents.',
        'SBA’s Small Business Search, for the company’s profile, NAICS codes, and SBA certifications such as WOSB.',
        'The certifier itself for other certifications: WBENC for a Women’s Business Enterprise, the City and County of Denver for Denver M/WBE and SBE.',
      ] },
      { h: 'Commercial and city work' },
      { p: 'Outside federal contracts, the goals come from the client. Companies with supplier-diversity programs may ask for certified women- or minority-owned suppliers. The City and County of Denver sets M/WBE participation goals on projects funded with city dollars or on city land, including contracts for goods and services.' },
      { h: 'Can it staff the posts?' },
      { p: 'Credit does not help a prime whose posts go empty. Before naming a security subcontractor, primes look for:' },
      { list: [
        'Licenses in the city where the work is. Colorado has no statewide security license, so the subcontractor needs that city’s license, and armed posts need the city’s armed endorsement or license.',
        'Past performance on similar work, and references the prime can call.',
        'Officers it can put on the posts, and the date they can start.',
        'Relief for call-outs, so a missing officer does not become the prime’s problem.',
        'Insurance that meets what the prime’s contract requires of its subcontractors.',
      ] },
      { h: 'Will it work under the prime’s contract?' },
      { p: 'A subcontractor works to the prime’s contract, not its own habits. On a federal service contract, the Service Contract Labor Standards clause goes into every subcontract the statute covers, so the subcontractor pays the wages and benefits in the contract’s wage determination. Primes also look for a subcontractor that writes the post orders with them, trains its officers on the post, keeps the logs the contract calls for, and will sign a mutual non-solicitation agreement for the people on the shared contract.' },
      { h: 'Can it answer before the proposal is due?' },
      { p: 'Teaming often happens on a proposal deadline. A subcontractor that can send its capability statement, identifiers, past performance, and pricing for the posts in time is easier to name in a bid.' },
      { h: 'How Ares answers these' },
      { p: 'Ares is a minority woman-owned small business: SBA-certified as a woman-owned small business (WOSB250470), WBENC-certified as a Women’s Business Enterprise (WBE2303571), and certified by Denver as an M/WBE and SBE (B2G vendor 21353671). We are active on SAM.gov (UEI XQXDN6E33SF4, CAGE 9KL18) and hold GSA MAS contract 47QSMS25D009Q under SIN 561612.' },
      { p: 'Since 2025, Ares has provided restricted-area escort and access control on a Space Force base in Colorado, as a subcontractor on a federal construction program. We are licensed and bonded for armed and unarmed security in Colorado Springs, Denver, and Pueblo. We write the post orders with the prime, a member of our leadership trains each officer on the post before the first shift, and every contract has on-call coverage behind it. Since 2021 we have missed fewer than 1% of shifts, and we are open to a mutual non-solicitation agreement on a shared contract.' },
    ],
    faq: [
      { q: 'When does a prime contractor need a small-business subcontracting plan?', a: 'On a federal contract expected to exceed $900,000 ($2 million for construction), unless the prime is itself a small business. The plan sets goals for small businesses and for women-owned, small disadvantaged, HUBZone, veteran-owned, and service-disabled veteran-owned small businesses.' },
      { q: 'Does a woman-owned security subcontractor count toward a prime’s goals?', a: 'Yes. Work subcontracted to a women-owned small business counts toward both the small-business goal and the women-owned small business goal in the prime’s subcontracting plan.' },
      { q: 'How much of a set-aside services contract can a small prime subcontract?', a: 'A small prime on a set-aside services contract may not pay more than 50% of what the government pays it to subcontractors that are not similarly situated. A small-business subcontractor is similarly situated on a small-business set-aside, and a women-owned small business on a women-owned set-aside.' },
      { q: 'How does a prime check a subcontractor’s small-business status?', a: 'It may rely on the subcontractor’s current representations in writing or in SAM.gov. Most primes also look the company up on SAM.gov and SBA’s Small Business Search, and confirm other certifications, such as WBENC or Denver M/WBE, with the certifier.' },
    ],
    sources: [
      { label: 'FAR 19.702, Statutory requirements (subcontracting plans) (Acquisition.gov)', url: 'https://www.acquisition.gov/far/19.702' },
      { label: 'FAR 52.219-9, Small Business Subcontracting Plan (Acquisition.gov)', url: 'https://www.acquisition.gov/far/52.219-9' },
      { label: 'FAR 52.219-14, Limitations on Subcontracting (Acquisition.gov)', url: 'https://www.acquisition.gov/far/52.219-14' },
      { label: 'FAR 19.001, Definitions: similarly situated entity (Acquisition.gov)', url: 'https://www.acquisition.gov/far/19.001' },
      { label: 'FAR 52.222-41, Service Contract Labor Standards (Acquisition.gov)', url: 'https://www.acquisition.gov/far/52.222-41' },
      { label: 'Women-Owned Small Business Federal Contract program (SBA)', url: 'https://www.sba.gov/federal-contracting/contracting-assistance-programs/women-owned-small-business-federal-contract-program' },
      { label: 'Prime and subcontracting (SBA)', url: 'https://www.sba.gov/federal-contracting/contracting-guide/prime-subcontracting' },
      { label: 'Small Business Search (SBA)', url: 'https://search.certifications.sba.gov/' },
      { label: 'Certified Business Utilization (City and County of Denver)', url: 'https://www.denvergov.org/Government/Agencies-Departments-Offices/Agencies-Departments-Offices-Directory/Economic-Development-Opportunity/Business-Support/Navigate-City-Services-and-Requirements/Do-Business-With-the-City/Certified-Business-Utilization' },
      SRC.sam,
    ],
    related: [
      { label: 'Teaming & subcontracting', to: '/teaming' },
      { label: 'Restricted-Area Escort', to: '/services/restricted-area-escort' },
      { label: 'Escorts for contractors on military bases: how they work', to: '/insights/contractor-escorts-military-bases' },
      { label: 'Capability Statement', to: '/capability-statement' },
    ],
  },
  {
    // Fourth monthly article (2026-10-26): contractor escorts on military installations, the work
    // Ares is growing toward. Rules from DoDM 5200.08 Volume 3 (installation access, escorts) and
    // AFFARS 5352.242-9000 (contractor access to Air Force and Space Force installations). Ares
    // facts as on the site: a Space Force base in Colorado (never named), alongside installation
    // security, as a subcontractor on a federal construction program, since 2025. No clearance
    // levels and no "cleared officers" (DESIGN.md, Clearances).
    slug: 'contractor-escorts-military-bases',
    title: 'Escorts for contractors on military bases: how they work.',
    category: 'Federal & teaming',
    date: '2026-10-26',
    dateLabel: 'October 26, 2026',
    ...U2,
    summary: 'Contractors who cannot get unescorted access to a base, or to a restricted area inside it, can often still do the work with an escort. Who may escort, what an escort does on a shift, and what to line up before a crew mobilizes.',
    body: [
      { p: 'Contractors working on a military installation need two things before the work starts: access to the installation, and permission to be where the work is. Workers who cannot get unescorted access, or who need to enter a restricted area they are not authorized for, can often still do the work with an escort. On a construction or maintenance job, that can mean escorted crews every day, and someone has to provide the escorts.' },
      { h: 'Why contractors need escorts' },
      { p: 'Under the Defense Department’s installation access manual (DoDM 5200.08, Volume 3), unescorted access to an installation takes three things: proof of identity, a determination of fitness (that the person is not likely a risk to the installation, from a review of their records), and an acceptable purpose. People who do not meet those requirements but are visiting for an official purpose may be escorted instead.' },
      { p: 'Restricted areas inside a base have rules of their own. On Department of the Air Force installations, which include the Space Force’s, contract work that needs unescorted entry to controlled or restricted areas must follow the Air Force’s personnel security and integrated defense rules. Anyone who does not meet them enters only as the installation allows, often under escort.' },
      { h: 'Who can serve as an escort' },
      { p: 'The same manual sets the baseline. An escort:' },
      { list: [
        'Holds an acceptable credential and meets the requirements for unescorted access to the installation.',
        'Comes from the organization being visited. People with no DoD affiliation cannot escort others onto an installation.',
        'Stays within reasonable visual contact of the people they escort at all times.',
      ] },
      { p: 'Installations add rules of their own, such as how many people one escort may take and what training escorts need, so the installation’s security office is the place to start.' },
      { h: 'What an escort does on a shift' },
      { list: [
        'Meets the crew or delivery at entry and checks who is coming in against the access list.',
        'Keeps every escorted person in line of sight for the whole time inside the area.',
        'Keeps the crew to the areas and routes the work allows.',
        'Logs who came in, with whom, and when they left.',
        'Reports anything outside the rules to installation security right away.',
      ] },
      { h: 'Why contractors hire escort officers' },
      { p: 'Escorting takes people off the work. A crew lead who is escorting cannot also run the crew, and a job with several crews, shifts, or restricted areas can need several escorts at once. Many prime contractors staff escorts as a security post instead, with post orders built around the installation’s rules, so the trades keep working and the escort ratio holds. On a federal contract, a small-business escort subcontractor can also count toward the prime’s small-business subcontracting goals.' },
      { h: 'What to line up before a crew mobilizes' },
      { list: [
        'The installation’s access process for every worker: base passes, the visitor control center, and who sponsors the request. On Air Force and Space Force installations, the contractor requests passes in writing through the contracting officer.',
        'The escort ratio and any escort training the installation requires.',
        'Which areas need escorts, and for whom: the whole site, or only its restricted areas.',
        'Shift times, start dates, and how far ahead the escort schedule has to be set.',
        'Who the escorts report to on site, and who they call when something is outside the rules.',
        'Relief for call-outs, so a missing escort does not stop the crew.',
      ] },
      { p: 'Those answers become the escort post order. Ours is a sample of one, with the installation’s values left blank: who may enter, how items are inspected and kept in custody, when the escort stops work, and what gets reported.' },
      { doc: SAMPLE_POST_ORDER },
      { h: 'Colorado installations' },
      { p: 'Colorado’s Front Range has a dense cluster of military installations, among them Peterson, Schriever, and Buckley Space Force Bases, Cheyenne Mountain Space Force Station, Fort Carson, and the U.S. Air Force Academy. Each sets its own access and escort rules within DoD and service policy, so the escort plan starts with the installation’s security office.' },
      { h: 'Ares on military installations' },
      { p: 'Since 2025, Ares has provided restricted-area escort and access control on a Space Force base in Colorado, alongside installation security, as a subcontractor on a federal construction program. We build the post orders around the installation’s rules, train each officer on the post before the first shift, and back every contract with on-call scheduling.' },
      { p: 'Ares is an SBA-certified woman-owned small business (WOSB250470) and a WBENC-certified Women’s Business Enterprise (WBE2303571), and holds GSA MAS contract 47QSMS25D009Q.' },
    ],
    faq: [
      { q: 'Do contractors need an escort on a military base?', a: 'Not always. Contractors with unescorted access to the installation can work without one, outside any restricted area they are not authorized for. Workers who do not meet the identity, fitness, and purpose requirements for unescorted access may be escorted if they are there for an official purpose, and restricted areas have entry rules of their own.' },
      { q: 'Who can be an escort on a DoD installation?', a: 'Under DoDM 5200.08, Volume 3, someone who holds an acceptable credential and meets the requirements for installation access, from the organization being visited. People with no DoD affiliation cannot escort. The escort must stay within reasonable visual contact of the people they escort at all times.' },
      { q: 'How many people can one escort take?', a: 'It depends on the installation. Ask its security office about escort ratios and any escort training before you plan crews and shifts.' },
      { q: 'Can a security company provide escorts for a construction contractor?', a: 'Yes. Escorts are often staffed by a security subcontractor as a post, under post orders built around the installation’s rules, so the trades keep working.' },
    ],
    sources: [
      { label: 'DoDM 5200.08, Volume 3: Physical Security Program: Access to DoD Installations', url: 'https://www.esd.whs.mil/Portals/54/Documents/DD/issuances/dodm/520008_vol3.pdf' },
      { label: 'AFFARS 5352.242-9000, Contractor Access to Department of the Air Force Installations (Acquisition.gov)', url: 'https://www.acquisition.gov/node/57328/printable/print' },
      { label: 'DoD Installation Access Guide (U.S. Army)', url: 'https://api.army.mil/e2/c/downloads/2025/08/19/a79c298c/dod-installation-access-guide.pdf' },
    ],
    related: [
      { label: 'Restricted-Area Escort', to: '/services/restricted-area-escort' },
      { label: 'Government & Defense', to: '/industries/government-defense' },
      { label: 'Teaming & subcontracting', to: '/teaming' },
      { label: 'What an access control officer does, and when a site needs one', to: '/insights/what-does-an-access-control-officer-do' },
      { label: 'Who covers the post when an officer calls out?', to: '/insights/relief-surge-coverage' },
    ],
  },
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
      { q: 'Does a security company need a state license in Colorado?', a: 'No. Colorado has no statewide license for security companies or officers. Cities such as Denver, Colorado Springs, and Pueblo license them instead, so check the license for the city where your site is.' },
      { q: 'What insurance should a security company carry?', a: 'Ask for a certificate of insurance before the first shift showing general liability and workers’ compensation, with coverage for armed work on an armed post, and limits that meet what your own contracts and insurer require.' },
      { q: 'Should a security company see my site before quoting?', a: 'Yes. A quote sent without a site walk is a guess. A good company walks the site first, then sends a proposal scoped to its posts, hours, and duties.' },
    ],
    sources: [SRC.sam, SRC.elibrary, SRC.denverSecurity, SRC.cosAgency],
    related: [
      { label: 'Security guard licensing in Colorado', to: '/insights/colorado-security-licensing' },
      { label: 'Who covers the post when an officer calls out?', to: '/insights/relief-surge-coverage' },
      { label: 'Capability Statement', to: '/capability-statement' },
    ],
  },
  {
    // Topic 1 of the copy audit's Insights list (2026-10-19): what drives the price, with no
    // rates (the audit's note). Every Ares fact is already on the site: the site walk before
    // anything is signed, the scoped proposal, training on the post, on-call relief, the GSA
    // schedule, and the city licenses. The rest is general, checkable practice.
    // Refreshed 2026-11-19 (owner): 2027 minimum wages (Colorado $15.71, Denver $19.84, from August 2026 reports; Denver Labor's page did not show 2027 yet), a short answer up top for the 'how much' searches it ranks for (position ~7, no clicks), the city firearm endorsements, and federal price transparency (eLibrary price lists; GSA's SCLS guidance for orders).
    slug: 'security-guard-cost-colorado',
    title: 'How much do security guards cost in Colorado in 2027?',
    category: 'Buying security',
    date: '2026-10-19',
    dateLabel: 'October 19, 2026',
    ...U2,
    summary: 'Officer pay starts at the minimum wage where the post is: $15.71 an hour in Colorado and $19.84 in Denver from January 1, 2027. What a 24/7 post costs in pay alone, what else is in the rate, and what drives the price up or down.',
    body: [
      { p: 'The price of security comes down to a handful of choices: how many hours the post is staffed, whether the officer is armed, whether the site needs a fixed post or a patrol, and what the site asks of the officer. Two posts with the same title can differ on most of them, which is why we quote each site rather than publish rates.' },
      { p: 'The short answer is that officer pay starts at the minimum wage for the city where the post is. From January 1, 2027, that is $15.71 an hour across Colorado and $19.84 in Denver. The rate a security company bills is higher, because it also covers payroll taxes, insurance, training, supervision, and the relief that keeps the post covered.' },
      { h: 'Hours are the biggest factor' },
      { p: 'A post is billed by the hour it is staffed, so the schedule sets most of the cost. A post staffed around the clock is 168 hours a week, the work of more than four full-time officers. Holidays, overnight shifts, and overtime can raise the cost of the same hours.' },
      { p: 'Before asking for a quote, decide which hours actually need an officer. Many sites need a full post only at night and on weekends.' },
      { h: 'Wage rules set a floor' },
      { p: 'Officer pay is most of the price, and the law sets its floor. In 2026 Colorado’s minimum wage is $15.16 an hour and Denver’s is $19.29. On January 1, 2027, they rise to $15.71 and $19.84, so the same post costs more inside Denver. At Denver’s 2027 minimum, the officer pay alone for a post staffed around the clock is more than $3,300 a week, before payroll taxes, insurance, overtime, training, and supervision.' },
      { p: 'Market pay sits above the minimum. The Bureau of Labor Statistics’ May 2025 estimates put the average Colorado security guard at $45,870 a year, about $22 an hour, against $20.42 an hour nationally. Minimum wages change every January 1, so check the current figure for the city where your site is.' },
      { h: 'Armed or unarmed' },
      { p: 'Armed officers cost more. They need firearms training and current qualifications, and they carry more liability. In Denver and Colorado Springs an armed officer also needs a firearm endorsement on their city license, and Pueblo issues a separate armed license. Most sites are well served by unarmed officers; some contracts, insurers, and risks call for armed ones.' },
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
      { h: 'Federal posts' },
      { p: 'On federal work, prices are easier to see. Every GSA Schedule holder’s price list is public on GSA eLibrary. Federal service contracts usually fall under the Service Contract Act, so on a security order the agency puts the Department of Labor wage determination for the place of performance into the order, and the contractor pays at least those wages and benefits. Schedule prices are nationwide, and GSA tells agencies to seek a price reduction when the work is in an area with lower rates.' },
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
    faq: [
      { q: 'How much does a security guard cost in Colorado?', a: 'It depends on the hours, armed or unarmed coverage, and the duties, so most companies quote each site. Officer pay starts at the minimum wage where the post is, $15.71 an hour in Colorado and $19.84 in Denver from January 1, 2027, and the billed rate also covers payroll taxes, insurance, training, supervision, and relief.' },
      { q: 'What is the minimum wage for a security guard in Denver?', a: 'Denver’s citywide minimum wage applies to security officers working in Denver: $19.29 an hour in 2026, rising to $19.84 on January 1, 2027. The statewide minimum rises from $15.16 to $15.71.' },
      { q: 'How much more does armed security cost?', a: 'There is no set premium, but armed officers cost more than unarmed ones. They need firearms training, current qualifications, and in Denver and Colorado Springs a firearm endorsement on their city license, and they carry more liability. Ask vendors to quote the same post both ways.' },
      { q: 'How much do security guards make in Colorado?', a: 'The Bureau of Labor Statistics’ May 2025 estimates put the average Colorado security guard at $45,870 a year, about $22 an hour, against $20.42 an hour nationally.' },
      { q: 'How many officers does a 24/7 security post take?', a: 'A post staffed around the clock is 168 hours a week, the work of more than four full-time officers, before relief for call-outs and vacations.' },
      { q: 'Do federal security contracts set officer wages?', a: 'Usually. Federal service contracts generally fall under the Service Contract Act, which sets wages and benefits for each area from the Department of Labor’s wage determination. On a GSA Schedule order, the agency names the wage determination for the place of performance.' },
    ],
    // Each source backs a claim in the article (2026-10-26): the state and Denver minimum wages, the
    // BLS pay estimates, the Service Contract Act wage determinations, and GSA's schedule prices.
    sources: [SRC.coWage, SRC.coWage2027, SRC.denverWage, SRC.denverWage2027, SRC.blsState, SRC.wageDeterminations, SRC.gsaScls, SRC.elibrary, SRC.denverGuards],
    related: [
      { label: 'Mobile Patrol', to: '/services/mobile-patrol' },
      { label: 'Commercial & Retail', to: '/industries/commercial-property' },
      { label: 'Armed or unarmed security: how to decide', to: '/insights/armed-or-unarmed-security' },
      { label: 'How to choose a security company in Colorado', to: '/insights/how-to-choose-a-security-company-colorado' },
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
    ...U,
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
    faq: [
      { q: 'How fast can Ares cover a call-out?', a: 'Posts we already staff are covered the same shift from our relief schedule. A new post usually takes about a week, because every officer trains on the site first.' },
      { q: 'What is the difference between relief and surge coverage?', a: 'Relief covers a regular post when its officer is out. Surge staffs a short, busy stretch, such as an inspection, an outage or storm event, a construction phase, or a contract transition.' },
      { q: 'Can a prime contractor subcontract relief coverage?', a: 'Yes. Check that the subcontractor is licensed in the city where the site is, will work under your post orders, and counts toward your small-business goals.' },
    ],
    related: [
      { label: 'Relief & Surge Coverage', to: '/services/relief-surge-coverage' },
      { label: 'Construction, Industrial & Logistics', to: '/industries/construction-industrial' },
      { label: 'Teaming & subcontracting', to: '/teaming' },
      { label: 'What a security post order is, with an example', to: '/insights/what-is-a-post-order' },
    ],
  },
  {
    // Refreshed 2026-11-19 (owner): each city's firearm rules spelled out, from the licensing article's sources (Denver's guard licensing FAQ, the Colorado Springs Contract Security Agency License page, the Pueblo PD application).
    slug: 'armed-or-unarmed-security',
    title: 'Armed or unarmed security: how to decide.',
    category: 'Buying security',
    ...D,
    ...U2,
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
      { p: 'Colorado has no statewide security license, so the city where the post is sets the rules for armed officers:' },
      { list: [
        'Denver: a firearm endorsement on the officer’s security guard license. It takes at least five hours of classroom instruction and three hours of live fire from a POST- or NRA-certified instructor, with a range score of at least 80% within the last six months, and it renews every year.',
        'Colorado Springs: a firearm endorsement on the officer’s Private Security Officer license, backed by a firearm safety and familiarization course. Concealed carry takes its own endorsement, and any discharge must be reported by the end of the next business day.',
        'Pueblo: an armed license from the Pueblo Police Department, which adds a firearms training certificate to the basic training.',
      ] },
      { p: 'Ask any vendor for its license in the city where your site is, and confirm that each armed officer’s endorsement and firearms qualification are current at the time of post.' },
      { h: 'If you are not sure' },
      { p: 'Walk the site with the security company before anything is signed. A good vendor will tell you when unarmed coverage is enough.' },
    ],
    faq: [
      { q: 'Do most sites need armed security?', a: 'No. Lobbies, offices, most retail, and construction sites are usually well served by trained, visible unarmed officers. Armed coverage is usually considered for cash handling, high-value or regulated goods, isolated night posts, or a history of violence.' },
      { q: 'Who decides whether a post must be armed?', a: 'Often the contract, the lease, or the insurer. Some federal posts specify armed officers, and some properties and insurers prohibit firearms on site. Either requirement settles the question.' },
      { q: 'What does an armed security officer need in Colorado?', a: 'It depends on the city. Denver requires a firearm endorsement on the officer’s license, with at least five hours of classroom instruction, three hours of live fire, and a range score of at least 80%, renewed every year. Colorado Springs requires a firearm endorsement backed by a firearm safety and familiarization course. Pueblo issues an armed license that adds a firearms training certificate to the basic training.' },
      { q: 'Do armed security guards need a separate license in Denver?', a: 'Yes. Beyond the individual security guard license, an armed officer in Denver needs a firearm endorsement, which takes classroom and live-fire training and a qualifying range score, and renews every year.' },
    ],
    sources: [SRC.denverGuards, SRC.cosAgency, SRC.puebloGuard],
    related: [
      { label: 'Armed Security Officers', to: '/services/armed-security-officers' },
      { label: 'Unarmed Security Officers', to: '/services/unarmed-security-officers' },
      { label: 'Security guard licensing in Colorado', to: '/insights/colorado-security-licensing' },
      { label: 'How much do security guards cost in Colorado in 2027?', to: '/insights/security-guard-cost-colorado' },
    ],
  },
  {
    // Refreshed 2026-11-19 (owner): it was the thinnest article (about 200 words) and ranks around 28 for 'post orders', 'what does post security mean', and 'security guard post orders example' (around 70). Added what 'post' means, general orders, a sample outline, an example entry, and paper versus electronic post orders.
    slug: 'what-is-a-post-order',
    title: 'What a security post order is, with an example.',
    category: 'Operations',
    ...D,
    ...U2,
    summary: 'A post order is the written instruction set for one security post. What “post” means, what a good post order covers, a sample outline with an example entry, and how to keep it current on paper or on a device.',
    body: [
      { p: 'A post order is the written instruction set for one security post. It is how a site gets the same coverage on every shift, whoever is standing the post.' },
      { h: 'What “post” means in security' },
      { p: 'A post is the place an officer is assigned to work from: a gate, a lobby desk, a loading dock, a control room, or a patrol route. Post orders are the instructions for that one post. Many sites also have general orders, the rules that apply to every officer at every post, such as conduct, uniforms, and how to report an emergency. Post orders add what is specific to the post.' },
      { h: 'What a good post order covers' },
      { list: [
        'The post itself: location, hours, and whether it is fixed or patrol.',
        'Its purpose: what the post is there to protect or control.',
        'Duties, in the order they happen on a shift.',
        'Access rules: who may enter, what they must show, and what to do when someone does not qualify.',
        'Patrol routes and checkpoints, and how each is logged.',
        'Who to call, in order, for each kind of problem.',
        'What to write down, and where the reports go.',
        'When the order was last revised, and who approved it.',
      ] },
      { h: 'A sample post order outline' },
      { p: 'Here is how those sections read for a single gate post. The details are an example; every site’s are its own.' },
      { list: [
        'Post and hours: North gate, fixed post, weekdays 6:00 a.m. to 6:00 p.m.',
        'Purpose: control vehicle and pedestrian entry to the north lot and the loading dock.',
        'Start of shift: open the gate at 6:00, test the radio, read the pass-down log, and check today’s delivery list.',
        'Access: badge holders enter; visitors sign in and wait at the gate for their host.',
        'Deliveries: match the driver and company to the delivery list, send trucks to dock 3, and log the time in and out.',
        'Patrol: walk the north fence line at 10:00 and 2:00 and log each checkpoint.',
        'Contacts, in order: 911 for any emergency, then the site supervisor, then the facilities manager, then the security company’s on-call supervisor.',
        'Reports: log every entry and denial; write an incident report before the end of the shift.',
        'End of shift: brief the relief officer, write the pass-down log, and lock the gate at 6:00.',
        'Last revised: the date, and who approved it.',
      ] },
      { h: 'An example entry' },
      { p: 'Each duty should say exactly what the officer does, in order. For example, a visitor without an appointment: do not admit them. Ask for their name, company, and who they are there to see. Call the host at the number on the contact list. If the host approves, sign the visitor in, issue a visitor pass, and log the time and the host’s name. If the host does not answer, the visitor waits outside the gate, and the officer notes it in the log.' },
      { h: 'A full sample post order' },
      { p: 'Here is a complete one, the kind of post order Ares writes for a contractor escort post on a military installation: post information, who does what, start of shift, entry and inspection, custody of items, stop-work, emergencies, reporting, and the officer’s acknowledgment. Values that differ from site to site, such as the escort ratio and the entry point, are left blank in yellow. It is a sample, not the post order for any real site.' },
      { doc: SAMPLE_POST_ORDER },
      { h: 'Who writes it' },
      { p: 'The security company writes it with the client. The client knows the site and its rules. The security company knows how to turn them into instructions an officer can follow at three in the morning.' },
      { h: 'Paper or electronic post orders' },
      { p: 'Post orders used to live in a binder at the post. Many sites now keep them in a guard management app or a shared document on the officer’s device, which makes it easier to push a change to every shift at once, add photos and maps, and record that each officer has read the latest version. Either way the rule is the same: one current version, at the post, that every officer has read. Keep a printed copy as a backup for when a device or the network fails.' },
      { h: 'Keep it current' },
      { p: 'A post order is only as good as its last update. Change it when gates, hours, tenants, or contacts change, and retrain the officers who stand the post.' },
      { p: 'At Ares we write the post orders for every post with the client, and a member of our leadership trains each officer on them, on the post, before the first shift.' },
    ],
    faq: [
      { q: 'What is a security post order?', a: 'The written instruction set for one security post: its location and hours, its purpose, the duties in order, access rules, patrol routes and checkpoints, who to call for each kind of problem, and what to report.' },
      { q: 'What does “post” mean in security?', a: 'A post is the place an officer is assigned to work from, such as a gate, a lobby desk, a loading dock, or a patrol route. Post orders are the instructions for that one post; general orders apply to every post at a site.' },
      { q: 'What is the difference between general orders and post orders?', a: 'General orders apply to every officer at every post, such as conduct, uniforms, and emergency reporting. Post orders add what is specific to one post: its hours, duties, access rules, and contacts.' },
      { q: 'Who writes post orders?', a: 'The security company writes them with the client. The client knows the site and its rules; the security company turns them into instructions an officer can follow on any shift.' },
      { q: 'How often should post orders be updated?', a: 'Whenever gates, hours, tenants, or contacts change, with the officers who stand the post retrained on the change. Each version should show when it was revised and who approved it.' },
    ],
    related: [
      { label: 'Unarmed Security Officers', to: '/services/unarmed-security-officers' },
      { label: 'Access Control Officers', to: '/services/access-control' },
      { label: 'Who covers the post when an officer calls out?', to: '/insights/relief-surge-coverage' },
      { label: 'What an access control officer does, and when a site needs one', to: '/insights/what-does-an-access-control-officer-do' },
    ],
  },
  {
    // Refreshed 2026-11-19 (owner): its search title promised a checklist the page did not have. Added the checklist and building on a military installation or federal site (DoDM 5200.08 Vol. 3, as in the escort article), with Ares' facts as on the site.
    slug: 'construction-site-security',
    title: 'Construction site security: a checklist for every phase of a build.',
    category: 'Operations',
    ...D,
    ...U2,
    summary: 'An active build is open in ways a finished building is not. A checklist for the gate, the perimeter, and after hours, how coverage should change as the site does, and what changes on a military installation or federal site.',
    body: [
      { p: 'An active build is open in ways a finished building is not. Fences move, gates change, and equipment and materials sit on the ground overnight. Most theft and trespass happen in the hours nobody is there.' },
      { h: 'The gate' },
      { p: 'Every person, vehicle, and delivery that enters should be checked against a list and logged. A staffed gate is also the simplest deterrent a site has.' },
      { h: 'The perimeter' },
      { p: 'Rounds on a set schedule catch cut fences, open gates, and damage before they become losses. Each checkpoint should be logged with a time.' },
      { h: 'After hours' },
      { p: 'Sites that close at night need either an officer on post or a patrol that checks the site on a schedule and responds when an alarm trips. Many builds use both at different phases.' },
      { h: 'A construction site security checklist' },
      { list: [
        'One controlled entry for people and one for deliveries, each logged.',
        'A current list of who may be on site, updated when trades come and go.',
        'A delivery schedule the gate can check trucks against.',
        'Lighting on the gate, the laydown yard, and tool storage.',
        'Equipment keys locked away, and machines disabled or blocked in at night.',
        'Copper, wire, tools, and fuel stored out of sight or under watch.',
        'Perimeter checkpoints, logged with a time on every round.',
        'After-hours coverage: an officer on post, a patrol on a schedule, or both.',
        'Alarms or cameras, with a named person who responds when one trips.',
        'Post orders that say who to call, in order, for a break-in, an injury, or a fire.',
        'A date to review coverage at each change of phase.',
      ] },
      { h: 'Change coverage as the site changes' },
      { p: 'A build at excavation needs different coverage than a build at fit-out. Revisit the post orders and staffing whenever gates, hours, or the value on site change.' },
      { h: 'Building on a military installation or federal site' },
      { p: 'Federal construction adds access rules of its own. Every worker needs the installation’s pass before the first day, and restricted areas inside a base have their own entry rules. Workers who do not meet them may enter only as the installation allows, often under escort. On a busy job that can mean escorts every shift, and many general contractors staff escorts and gate control as a security post so the trades keep working. On a federal contract, a small-business security subcontractor can also count toward the prime’s subcontracting goals.' },
      { p: 'Ares is licensed for armed and unarmed security in Colorado Springs, Denver, and Pueblo. Since 2025, Ares has provided restricted-area escort and access control on a Space Force base in Colorado, as a subcontractor on a federal construction program.' },
    ],
    faq: [
      { q: 'What should a construction site security checklist include?', a: 'A controlled gate with a log, a current list of who may be on site, a delivery schedule, lighting, locked equipment keys, secured materials, logged perimeter rounds, after-hours coverage, alarms with someone to respond, post orders with a call list, and a review of coverage at each phase.' },
      { q: 'When does construction site theft usually happen?', a: 'Most theft and trespass on a build happen after hours, when nobody is on site. That is when an officer on post or a scheduled patrol matters most.' },
      { q: 'Does a construction site need a guard or a patrol?', a: 'It depends on the phase and the value on site. A staffed gate controls who enters during work hours; after hours, a site needs an officer on post or a patrol that checks it on a schedule and responds to alarms. Many builds use both at different phases.' },
      { q: 'What should a construction gate officer log?', a: 'Every person, vehicle, and delivery that enters, checked against a list, with the time.' },
      { q: 'Do construction workers need an escort on a military base?', a: 'Workers without unescorted access to the installation, or to a restricted area inside it, may enter only as the installation allows, often under escort. Many contractors staff escorts as a security post.' },
    ],
    sources: [{ label: 'DoDM 5200.08, Volume 3: Physical Security Program: Access to DoD Installations', url: 'https://www.esd.whs.mil/Portals/54/Documents/DD/issuances/dodm/520008_vol3.pdf' }],
    related: [
      { label: 'Construction, Industrial & Logistics', to: '/industries/construction-industrial' },
      { label: 'Mobile Patrol', to: '/services/mobile-patrol' },
      { label: 'What a security post order is, with an example', to: '/insights/what-is-a-post-order' },
      { label: 'Escorts for contractors on military bases: how they work', to: '/insights/contractor-escorts-military-bases' },
      { label: 'What prime contractors look for in a small-business security subcontractor', to: '/insights/what-primes-look-for-security-subcontractor' },
    ],
  },
  {
    // Refreshed 2026-11-19 (owner): ranks around 11. Added how to find schedule holders on eLibrary by SIN, and how Service Contract Labor Standards wage determinations work on schedule orders (GSA's SCLS guidance).
    slug: 'buying-security-through-gsa',
    title: 'How agencies can buy security services through a GSA Schedule.',
    category: 'Federal & teaming',
    ...D,
    ...U2,
    summary: 'The GSA Multiple Award Schedule lets agencies order security services at pre-negotiated ceiling prices through streamlined procedures. How ordering works, how to find schedule holders in Colorado, how wage determinations apply, and how to check a vendor.',
    body: [
      { p: 'The GSA Multiple Award Schedule (MAS) is a set of long-term, government-wide contracts with pre-negotiated ceiling prices. Security guard and patrol services sit under SIN 561612.' },
      { h: 'How ordering works' },
      { p: 'Agencies place orders against a vendor’s schedule contract using the ordering procedures in FAR subpart 8.4, often by sending a request for quotes to schedule holders through GSA eBuy. There is no need to open a new full and open competition, and agencies can still ask for a price reduction on a specific order.' },
      { h: 'Set-asides' },
      { p: 'Agencies may set aside orders under the schedule for small businesses, including women-owned small businesses, at their discretion.' },
      { h: 'How to find schedule holders' },
      { list: [
        'Search GSA eLibrary for SIN 561612 to list every contractor on it, with each one’s city and state.',
        'Open a contractor’s page for its socioeconomic status, contract period, and price list.',
        'Send a request for quotes through GSA eBuy to the schedule holders you choose, or set the order aside for small businesses.',
      ] },
      { h: 'Wage determinations on security orders' },
      { p: 'Security services fall under the Service Contract Labor Standards, and the Department of Labor’s wage determinations are built into every schedule contract that offers services. When an agency places a security order, its ordering contracting officer identifies the place of performance and names the wage determination for that location in the order, and the contractor pays at least those wages and benefits. Wage determinations differ by area, so a post in Denver and a post in Pueblo can carry different minimums.' },
      { p: 'Schedule prices are nationwide. GSA tells agencies to seek a price reduction when the work is in an area with lower wage rates, and after the annual wage determination update a contractor may ask for an order price adjustment, at the ordering contracting officer’s discretion.' },
      { h: 'How to check a vendor' },
      { list: [
        'Look up the contract number on GSA eLibrary to confirm the schedule and SIN.',
        'Look up the vendor’s UEI on SAM.gov to confirm the registration is active.',
        'Ask for the vendor’s licenses in the city where the work is, since Colorado has no statewide security license.',
      ] },
      { h: 'Ares on the schedule' },
      { p: 'Ares holds GSA MAS contract 47QSMS25D009Q under SIN 561612, is active on SAM.gov (UEI XQXDN6E33SF4, CAGE 9KL18), and is an SBA-certified woman-owned small business (WOSB250470).' },
    ],
    faq: [
      { q: 'Which GSA Schedule SIN covers security guard services?', a: 'SIN 561612 under the GSA Multiple Award Schedule covers security guard and patrol services.' },
      { q: 'Does an agency need full and open competition to order from a GSA Schedule?', a: 'No. Orders follow the procedures in FAR subpart 8.4, often through a request for quotes sent to schedule holders on GSA eBuy, and agencies can still ask for a price reduction on a specific order.' },
      { q: 'Can GSA Schedule orders be set aside for small businesses?', a: 'Yes. Agencies may set aside orders under the schedule for small businesses, including women-owned small businesses, at their discretion.' },
      { q: 'How do I find GSA Schedule security contractors in Colorado?', a: 'Search GSA eLibrary for SIN 561612. The list shows each contractor’s city and state, and each contractor’s page shows its socioeconomic status, contract period, and price list.' },
      { q: 'Do Service Contract Act wages apply to GSA Schedule security orders?', a: 'Yes. Security services are covered by the Service Contract Labor Standards. The ordering contracting officer names the wage determination for the place of performance in the order, and the contractor must pay at least those wages and benefits.' },
    ],
    sources: [SRC.far84, SRC.elibrary, SRC.gsaScls, SRC.wageDeterminations, SRC.sam],
    related: [
      { label: 'Government & Defense', to: '/industries/government-defense' },
      { label: 'Capability Statement', to: '/capability-statement' },
      { label: 'How to choose a security company in Colorado', to: '/insights/how-to-choose-a-security-company-colorado' },
    ],
  },
  {
    // Expanded 2026-10-26 for AI search: the article now answers what each city requires of
    // companies and officers, from the cities' own pages, and settles the statewide question with
    // the state's 2023 sunrise review and HB25-1262 (postponed indefinitely, April 7, 2025). The
    // slug stays; the title now names the guard license, the way people search for it.
    slug: 'colorado-security-licensing',
    title: 'Security guard licensing in Colorado: what each city requires.',
    category: 'Licensing',
    ...D,
    ...U,
    summary: 'Colorado has no statewide security license. Denver, Colorado Springs, and Pueblo license security companies and individual officers themselves. What each city requires, including for armed officers, and how to check.',
    body: [
      { p: 'Colorado has no statewide license for security companies or security officers. Cities license them instead, so the rules that apply depend on where the post is. Denver, Colorado Springs, and Pueblo each license the individual officer, and each has its own training, background, and firearm rules.' },
      { h: 'Is there a statewide security license?' },
      { p: 'No. In 2023 the state’s Office of Policy, Research and Regulatory Reform studied a request to license security guards statewide. It did not recommend a state license; it recommended standard minimum training instead. A 2025 bill to create state licenses, HB25-1262, was postponed indefinitely in committee in April 2025 and did not become law. For now, the city is the licensing authority.' },
      { h: 'Denver' },
      { list: [
        'Security companies need a Private Security Employer license. A guard’s firearm, plainclothes, or explosive-detection canine endorsement needs a letter from the guard’s employer, signed by both.',
        'Each officer needs an individual security guard license before starting work.',
        'A new license takes a 16-hour course from an eligible training provider, and each renewal an 8-hour refresher. Both cover a guard’s duties, communication, working with law enforcement, and use of force.',
        'Applicants need an FBI background check, five years of employment or education history, and a certificate of physical and mental fitness from a physician, physician assistant, or registered nurse.',
        'An armed officer needs a firearm endorsement: at least five hours of classroom instruction and three hours of live fire, taught by a POST- or NRA-certified instructor, with a range score of at least 80% within the last six months. It renews every year.',
      ] },
      { h: 'Colorado Springs' },
      { list: [
        'Companies that provide officers on contract need a Contract Security Agency license, renewed every year. The agency must carry commercial general liability of $1,000,000/$2,000,000, workers’ compensation and employer’s liability of $1,000,000, and automobile liability of $1,000,000, with the city as certificate holder.',
        'Each officer needs a Private Security Officer license, renewed every year, with a background check, a certificate from a security officer training program, and a request for issuance from the agency.',
        'Carrying a firearm takes a firearm endorsement, backed by a firearm safety and familiarization course. Concealed carry and conducted energy weapons each take their own endorsement.',
        'Any firearm or conducted energy weapon discharge must be reported by the end of the next business day.',
      ] },
      { h: 'Pueblo' },
      { list: [
        'The Pueblo Police Department licenses security guards, with separate unarmed and armed licenses.',
        'An unarmed license takes a basic security guard training certificate from an approved training company, two reference letters from local residents, fingerprints, and a records check. A felony in the last 10 years is grounds for denial.',
        'An armed license adds a firearms training certificate.',
        'Licenses expire on December 31 of the year they are issued, so Pueblo guards renew every year.',
      ] },
      { h: 'Other cities' },
      { p: 'The state’s 2023 review also found Greeley licensing security guards. Other cities may license security too, or change their rules, so check with the city where your site is before you hire.' },
      { h: 'What to ask a vendor' },
      { list: [
        'Its company license number in the city where your site is, and where you can verify it.',
        'Whether every officer it would send holds an individual license in that city.',
        'For an armed post, whether each officer holds a current firearm endorsement or armed license.',
        'Whether it is bonded and insured for armed or unarmed work, as your post requires.',
        'Who trains its officers, and whether it is an approved training provider in that city.',
      ] },
      { h: 'For officers: do you need a license to work security in Colorado?' },
      { p: 'In Denver, Colorado Springs, and Pueblo, yes. You need the city’s individual license before you stand a post there, and a firearm endorsement or armed license to carry on duty. The training comes first, from a provider the city approves; some security companies, Ares included, are approved providers.' },
      { h: 'Ares’ licenses' },
      { p: 'Ares is licensed and bonded for armed and unarmed security in Colorado Springs (Contract Security Agency license 0850744L), Denver (Private Security Employer license 2021-BFN-0001984), and Pueblo (merchant patrol and security license 26422, through the Pueblo Police Department), and is an approved training provider for armed and unarmed officers in all three cities. Each license is listed on our city pages, with a way to verify it or request a copy.' },
    ],
    faq: [
      { q: 'Does Colorado have a statewide security guard license?', a: 'No. Colorado has no statewide license for security companies or officers. A 2025 bill to create one, HB25-1262, was postponed indefinitely in committee and did not become law. Cities such as Denver, Colorado Springs, and Pueblo license security themselves.' },
      { q: 'How many training hours does a Denver security guard license take?', a: 'A 16-hour course from an eligible training provider for a new license, and an 8-hour refresher for each renewal. An armed officer’s firearm endorsement adds at least five hours of classroom instruction and three hours of live fire.' },
      { q: 'What insurance does Colorado Springs require of a security company?', a: 'A contract security agency must carry commercial general liability of $1,000,000/$2,000,000, workers’ compensation and employer’s liability of $1,000,000, and automobile liability of $1,000,000, with the City of Colorado Springs as certificate holder.' },
      { q: 'Who issues security guard licenses in Pueblo?', a: 'The Pueblo Police Department, with separate unarmed and armed licenses. Licenses expire on December 31 of the year they are issued.' },
    ],
    sources: [
      SRC.denverGuards,
      SRC.denverSecurity,
      SRC.cosAgency,
      SRC.puebloGuard,
      { label: '2023 Sunrise Review: Private Security Guards (Colorado DORA, COPRRR)', url: 'https://coprrr.colorado.gov/sites/coprrr/files/documents/2023-Sunrise-Private-Security-Guards.pdf' },
      { label: 'HB25-1262, Regulate Private Security Officers & Agencies (Colorado General Assembly)', url: 'https://leg.colorado.gov/bills/hb25-1262' },
    ],
    related: [
      { label: 'Colorado Springs', to: '/locations/colorado-springs' },
      { label: 'Denver', to: '/locations/denver' },
      { label: 'Pueblo', to: '/locations/pueblo' },
      { label: 'Armed or unarmed security: how to decide', to: '/insights/armed-or-unarmed-security' },
      { label: 'How to choose a security company in Colorado', to: '/insights/how-to-choose-a-security-company-colorado' },
      { label: 'Careers', to: '/careers' },
    ],
  },
];

export const insightBySlug = (slug?: string) => INSIGHTS.find((i) => i.slug === slug);
