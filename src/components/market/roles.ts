// Role pages (/services/<slug>): one page per service, named as buyers search for it
// (docs/market-concepts.md, 2026-10-08). The six services are the capability statement's
// six (Restricted-area escort replaced Emergency response, and Relief and surge coverage
// replaced Event security, 2026-10-10), and each page's
// duties reuse its approved lines (src/components/capability/data.ts).
// FAQs state only what the site already says. No clearance, badging, or response-time
// claims.
import { CAPABILITIES } from '../capability/data';

export type Faq = { q: string; a: string };
export type SheetRow = { label: string; value: string; href?: string; external?: boolean };

export type RolePageData = {
  slug: string;
  capabilityId: string;
  /** Short name for lists and links. */
  name: string;
  /** H1, the search phrase. */
  title: string;
  lead: string;
  /** The first spec-sheet row, specific to the role. */
  sheet: SheetRow;
  /** "How it works at your site." (copy audit service template, 2026-10-10): 80 to 120
   *  words written only for this service, from facts already on the site. */
  how: string;
  /** The ask before the questions. */
  ask: string;
  /** Industry slugs this role is most asked for. */
  industries: string[];
  faq: Faq[];
};

const GSA_ROW: SheetRow = {
  label: 'Order through',
  value: 'GSA MAS 47QSMS25D009Q',
  href: 'https://www.gsaelibrary.gsa.gov/ElibMain/contractorInfo.do?contractNumber=47QSMS25D009Q&contractorName=ARES+SECURITY+LLC&executeQuery=YES',
  external: true,
};

/** The rows every role shares, after its own (copy audit, 2026-10-10: three rows; the rows
 *  identical on every page moved to SHEET_NOTE). */
export const SHARED_SHEET: SheetRow[] = [
  { label: 'Training', value: 'On the post, by a member of leadership who has worked it' },
  GSA_ROW,
];

/** One shared line under the sheet. */
export const SHEET_NOTE = 'Licensed and bonded in Colorado Springs, Denver, and Pueblo. On-call relief in every contract.';

const GSA_FAQ: Faq = {
  q: 'Can federal agencies order this through GSA?',
  a: 'Yes. Ares holds GSA Multiple Award Schedule contract 47QSMS25D009Q under SIN 561612, so agencies can order at pre-negotiated ceiling prices using the streamlined FAR 8.4 procedures, usually a request for quotes to schedule holders on GSA eBuy, instead of a new open-market solicitation.',
};

export const ROLE_PAGES: RolePageData[] = [
  {
    slug: 'armed-security-officers',
    capabilityId: 'armed',
    name: 'Armed security officers',
    title: 'Armed security officers.',
    lead: 'Licensed, firearms-qualified officers for cash-handling, regulated, and high-liability posts.',
    sheet: { label: 'Firearms', value: 'Qualified by our NRA-certified instructor, a veteran' },
    how: 'An armed post starts with the reason it needs to be armed: cash on site, regulated goods, an isolated night post, or a contract requirement. We write the post orders around that reason, including who the officer calls first and when the post is armed. Our veteran NRA-certified firearms instructor qualifies each officer, and qualifications are current at the time of post. A member of our leadership who has worked the post then trains each officer on your site before the first shift, and on-call relief is written into the contract, so the post is never left empty.',
    ask: 'Tell us the site, the hours, and why the post needs to be armed.',
    industries: ['government-military', 'commercial-property', 'critical-infrastructure'],
    faq: [
      {
        q: 'What do officers do if something happens on site?',
        a: 'They secure the area, keep people safe, contact your designated staff and emergency services, work alongside first responders when they arrive, and write a report of what happened and what was done.',
      },
      {
        q: 'When does a site need armed officers instead of unarmed?',
        a: 'When the risk, the assets on site, or a contract or insurance requirement calls for it: cash handling, regulated materials, high-liability sites, and some federal posts. If you are not sure, we walk the site before anything is signed and recommend what the post actually needs.',
      },
      {
        q: 'Do you provide armed officers in Denver and Pueblo?',
        a: 'Yes. Ares is licensed and bonded for armed security in Colorado Springs, Denver, and Pueblo, and is an approved armed training provider in each. Colorado has no statewide license, so each city licenses security companies itself; the license numbers are on each city\u2019s page.',
      },
      {
        q: 'Who trains them?',
        a: 'Firearms training comes from our NRA-certified firearms instructor, a veteran. Every officer is also trained on the post itself, before the first shift, by a member of our leadership who has worked it.',
      },
      GSA_FAQ,
    ],
  },
  {
    slug: 'unarmed-security-officers',
    capabilityId: 'unarmed',
    name: 'Unarmed security officers',
    title: 'Unarmed security officers.',
    lead: 'A visible, trained presence for lobbies, perimeters, and public areas, in uniform or plainclothes.',
    sheet: { label: 'Uniform', value: 'Uniformed or plainclothes, as the site calls for' },
    how: 'An unarmed post is built around what the site needs from the person standing it: a front desk that screens and directs visitors, rounds on a set schedule, or a discreet presence on a sales floor. We walk the site first and write the post orders for it. Each officer is trained on the post by a member of our leadership before the first shift, logs every checkpoint, and writes up anything out of the ordinary. Uniformed or plainclothes is your call, and on-call relief keeps the post covered when an officer cannot make a shift.',
    ask: 'Tell us the site, the hours, and how many officers you need on post.',
    industries: ['commercial-property', 'construction-industrial', 'government-military'],
    faq: [
      {
        q: 'What do officers do if something happens on site?',
        a: 'They secure the area, keep people safe, contact your designated staff and emergency services, work alongside first responders when they arrive, and write a report of what happened and what was done.',
      },
      {
        q: 'What does an unarmed officer do on a typical post?',
        a: 'Controls who comes in, patrols on a set schedule, logs every checkpoint, writes up incidents, and acts as the first point of contact for visitors and staff, all to the post orders written for your site.',
      },
      {
        q: 'Uniformed or plainclothes?',
        a: 'Either. Uniformed officers are a visible deterrent. Plainclothes officers suit sites where a uniform would change how the space feels, such as retail loss prevention.',
      },
      {
        q: 'Do you provide unarmed officers in Colorado Springs, Denver, and Pueblo?',
        a: 'Yes. Ares is based in Colorado Springs and licensed and bonded for unarmed and armed security in Colorado Springs, Denver, and Pueblo, with officers trained on each post before the first shift. Sites elsewhere on the Front Range can ask; we will tell you plainly whether we can staff them.',
      },
      GSA_FAQ,
    ],
  },
  {
    slug: 'access-control',
    capabilityId: 'access',
    name: 'Access control officers',
    title: 'Access control officers.',
    lead: 'Officers who decide who and what gets in, with a log you can audit.',
    sheet: { label: 'Logs', value: 'Visitor and checkpoint logs you can audit' },
    how: 'Access control starts with your access list and the rules behind it: who may enter, when, through which door or gate, and who signs for visitors and deliveries. We write those rules into the post orders, then train each officer on your entry points and your site\u2019s own systems, such as card readers, visitor software, and intercoms, before the first shift. Every person, vehicle, and delivery is checked before entry, and every check is logged, so you can audit who came and went. Badges stay yours to issue; our officers enforce them.',
    ask: 'Tell us the entry points, the hours, and who is allowed in.',
    industries: ['critical-infrastructure', 'government-military', 'construction-industrial'],
    faq: [
      {
        q: 'What does an access control officer do?',
        a: 'Checks every person, vehicle, and delivery against your access list and post orders before they enter, screens and signs in visitors, and keeps a log of who came and went.',
      },
      {
        q: 'Do you issue badges?',
        a: 'No. Our officers check the credentials your site issues and enforce your access rules. Issuing badges stays with you.',
      },
      {
        q: 'Where in Colorado do you staff access control?',
        a: 'In Colorado Springs, the Denver metro area, and Pueblo, where Ares is licensed and bonded for armed and unarmed security. That includes gates and docks at data centers, utilities, and construction sites, and restricted areas on military installations, where we work alongside base security forces.',
      },
      {
        q: 'Will officers use our access system?',
        a: 'Yes. Officers are trained on your site’s own systems, such as card readers, visitor software, and intercoms, before their first shift.',
      },
      GSA_FAQ,
    ],
  },
  {
    // Replaced Emergency response (copy audit round 2, owner 2026-10-10). No clearance
    // wording here: clearance requirements live on Careers only (owner).
    slug: 'restricted-area-escort',
    capabilityId: 'escort',
    name: 'Restricted-area escort',
    title: 'Restricted-area escort.',
    lead: 'Escorts for crews, visitors, and deliveries inside restricted and controlled areas: people and vehicles verified at entry, every escort kept in line of sight, and custody logged, on the site\u2019s own rules.',
    sheet: { label: 'Experience', value: 'Restricted-area escort and access control on a Space Force base in Colorado' },
    how: 'Escort work starts with the site\u2019s own rules: who may enter the controlled area, who must be escorted, and how many people one officer can keep in sight. We build the post orders around those rules and work alongside installation or site security. Officers verify people and vehicles at entry, keep every escorted crew, visitor, or delivery in line of sight, and log who came in, with whom, and when they left. On an active build, coverage changes as the work moves, and our relief roster keeps every escort post staffed.',
    ask: 'Send us the site, its access rules, and the crews or deliveries that need escort. We will come back with a staffing plan and post orders.',
    industries: ['government-military', 'critical-infrastructure', 'construction-industrial'],
    faq: [
      {
        q: 'What does a restricted-area escort do?',
        a: 'Keeps every escorted person, crew, or delivery in line of sight inside the controlled area, verifies people and vehicles at entry, and logs who came in, with whom, and when they left.',
      },
      {
        q: 'Have your officers escorted on a military installation?',
        a: 'Yes. Ares provides restricted-area escort and access control on a Space Force base in Colorado, alongside installation security, as a subcontractor on a federal construction program.',
      },
      {
        q: 'Can you escort construction crews and deliveries?',
        a: 'Yes. Escorting trades and deliveries on an active build is the core of our restricted-area work, and coverage changes as the build does.',
      },
      {
        q: 'Where do you provide restricted-area escorts?',
        a: 'Along Colorado’s Front Range: the Denver metro area, Colorado Springs, and Pueblo, where Ares is licensed and bonded for armed and unarmed security. Tell us the site and its access rules, and we will tell you plainly what we can staff and when.',
      },
      GSA_FAQ,
    ],
  },
  {
    // Replaced Event security (copy audit round 2, owner 2026-10-10). No fill time is
    // stated until the owner confirms one Ares can stand behind.
    slug: 'relief-surge-coverage',
    capabilityId: 'relief',
    name: 'Relief and surge coverage',
    title: 'Relief and surge coverage.',
    lead: 'Trained officers when your roster runs short: relief shifts, overflow posts, and surge staffing for inspections, outages, construction phases, and contract transitions.',
    sheet: { label: 'Who it is for', value: 'Site owners, prime contractors, and other security companies' },
    how: 'Relief works best when it is lined up before you need it. Tell us the posts, the post orders, and the dates that are hard to cover, and we find officers who can stand them. Each one is trained on the post by a member of our leadership before the first shift, so a relief officer arrives knowing the entry points and the rules. For surge work, such as an inspection, an outage, a construction phase, or a contract transition, we staff to your dates and step back when the work is done.',
    ask: 'Send us the site, the posts, and the dates you need covered. We will tell you plainly who we can staff and when.',
    industries: ['construction-industrial', 'critical-infrastructure', 'government-military'],
    faq: [
      {
        // Owner, 2026-10-10: "it depends, but within a week usually".
        q: 'How fast can you fill a shift?',
        a: 'It depends on the post, the hours, and what the site requires, but usually within a week.',
      },
      {
        q: 'Can your officers work under our post orders?',
        a: 'Yes. Officers work to your post orders and are trained on the post before their first shift. Uniforms are agreed with you up front.',
      },
      {
        q: 'Does this count toward our small-business goals?',
        a: 'It can. Ares is an SBA-certified woman-owned small business (WOSB250470) and a WBENC-certified Women\u2019s Business Enterprise (WBE2303571), so subcontracted work can count toward small-business and supplier-diversity goals.',
      },
      {
        q: 'Do officers train on the site first?',
        a: 'Yes. A member of our leadership trains each officer on the post before the first shift, relief and surge officers included.',
      },
      {
        q: 'Where in Colorado can you cover shifts?',
        a: 'Colorado Springs, the Denver metro area, and Pueblo, where Ares is licensed and bonded for armed and unarmed security. Guard companies and primes elsewhere on the Front Range can ask; we will tell you plainly which posts and dates we can staff.',
      },

    ],
  },
  {
    slug: 'mobile-patrol',
    capabilityId: 'vehicle',
    name: 'Mobile patrol',
    title: 'Mobile patrol.',
    lead: 'Marked vehicles on set routes, alarm response, and a time-stamped report for every property.',
    sheet: { label: 'Vehicles', value: 'Ares-marked patrol vehicles' },
    how: 'A patrol is planned around your properties and what needs checking: doors, gates, perimeters, and the hours a site is most exposed. We set the route and the schedule with you, run it in Ares-marked vehicles, and verify each pass by GPS. Every property gets its own time-stamped report, so one patrol across a portfolio still gives each site manager a record of their own property. When an alarm trips, an officer goes to the site, checks it, and reports what was found.',
    ask: 'Tell us the properties, when you want them checked, and what to check.',
    industries: ['commercial-property', 'construction-industrial'],
    faq: [
      {
        q: 'Mobile patrol or a posted officer?',
        a: 'A posted officer stays on one site. A patrol covers one or more sites on a schedule. Patrol suits sites that need regular checks and a visible presence rather than an officer on post every hour.',
      },
      {
        q: 'Do you respond to alarms?',
        a: 'Yes. When an alarm trips, an officer goes to the site, checks the property, and reports what was found.',
      },
      {
        q: 'How do we know the patrol happened?',
        a: 'Every property gets a time-stamped report, and routes are GPS-verified.',
      },
      {
        q: 'Can one patrol cover several properties?',
        a: 'Yes. One route can cover a portfolio, with a separate report for each property.',
      },
      {
        q: 'Where do your patrols run?',
        a: 'Across Colorado Springs, the Denver metro area, and Pueblo, where Ares is licensed and bonded. Tell us the addresses and the hours you want checked, and we will tell you plainly whether a route can cover them and how often each property can be visited.',
      },
    ],
  },
];

export const roleBySlug = (slug?: string) => ROLE_PAGES.find((r) => r.slug === slug);
export const capabilityFor = (r: RolePageData) => CAPABILITIES.find((c) => c.id === r.capabilityId)!;
