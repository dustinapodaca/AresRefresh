// Industry pages (/industries/<slug>): the environment, what we deliver there, why Ares, a
// specific ask, and questions (docs/market-concepts.md, 2026-10-08; CenCore's sector pages
// on Mobbin's terms). Every proof row is a fact already on the site, with its route.
import { GSA_ELIBRARY } from '../home/links';
import { INDEED_REVIEWS } from '../careers/data';
import { SAM_ACTIVE_THROUGH, SAM_VERIFY } from '../capability/data';
import type { Faq, SheetRow } from './roles';

export type IndustryPageData = {
  slug: string;
  name: string;
  /** One line for lists. */
  short: string;
  title: string;
  lead: string;
  /** Generated demo image (assets/generated/market/), light and architecture only. */
  image: { src: string; alt: string };
  stake: string[];
  deliver: { role: string; line: string }[];
  why: SheetRow[];
  ask: string;
  faq: Faq[];
  /** A short block for prime contractors, linking to /teaming (owner, 2026-10-10). */
  primes?: string;
};

const LICENSED: SheetRow = { label: 'Licensed and bonded', value: 'Armed and unarmed, in Denver, Colorado Springs, and Pueblo', href: '/locations/denver' };
const RELIEF: SheetRow = { label: 'Relief', value: 'On-call coverage written into every contract' };
const LOGS: SheetRow = { label: 'Records', value: 'Checkpoint, visitor, and incident logs you can audit' };
const GSA: SheetRow = { label: 'GSA MAS', value: '47QSMS25D009Q, SIN 561612', href: GSA_ELIBRARY, external: true };

// The owner's fixed order (2026-10-10): Government, Critical, Construction, Airport,
// Commercial, Institutional.
export const INDUSTRY_PAGES: IndustryPageData[] = [
  {
    slug: 'government-military',
    name: 'Government & Military',
    short: 'Federal, state, and municipal facilities and military installations, through GSA.',
    title: 'Security for government and military facilities.',
    lead: 'Officers for federal, state, and municipal facilities and military installations, available to agencies through our GSA Multiple Award Schedule.',
    image: { src: '/images/market/government-military.webp', alt: '' },
    stake: [
      'Public-sector posts run on post orders, documentation, and the rules of the facility. The officer at the entrance represents the agency to everyone who walks through it.',
      'Agencies also need a contracting path that already exists. Ares holds a GSA Multiple Award Schedule contract, is active on SAM.gov, and is an SBA-certified woman-owned small business.',
    ],
    deliver: [
      { role: 'restricted-area-escort', line: 'Escort for crews, visitors, and deliveries inside restricted areas, with custody logs.' },
      { role: 'access-control', line: 'Entry control, visitor screening, and escort and monitoring inside restricted areas.' },
      { role: 'unarmed-security-officers', line: 'Uniformed officers for entrances, lobbies, and public areas, working to the facility’s post orders.' },
      { role: 'armed-security-officers', line: 'Armed posts where the facility or the contract requires them.' },
    ],
    why: [
      GSA,
      { label: 'SAM.gov', value: `Active through ${SAM_ACTIVE_THROUGH}`, href: SAM_VERIFY, external: true },
      { label: 'WOSB', value: 'WOSB250470, set-aside eligible under NAICS 561612' },
      { label: 'Restricted areas', value: 'Escort and access control on a Space Force base in Colorado', href: '/services/restricted-area-escort' },
      { label: 'Veterans', value: 'Veteran supervisors and a veteran NRA firearms instructor' },
    ],
    primes: 'Woman-owned subcontracting credit, restricted-area escorts, and relief, overflow, and surge coverage on federal work along the Front Range.',
    ask: 'Send us the facility, the post requirements, and the period of performance. We will come back with a staffing plan under our GSA Schedule.',
    faq: [
      {
        q: 'How can an agency buy from Ares?',
        a: 'Through our GSA Multiple Award Schedule contract 47QSMS25D009Q (SIN 561612): agencies can order at pre-negotiated ceiling prices using the streamlined FAR 8.4 procedures, usually a request for quotes to schedule holders on GSA eBuy, instead of a new open-market solicitation. Every procurement path is on our Capability Statement.',
      },
      {
        q: 'Are you a small business?',
        a: 'Yes. Ares is an SBA-certified woman-owned small business (WOSB250470), a WBENC-certified women’s business enterprise (WBE2303571), and minority woman-owned.',
      },
      {
        q: 'Where can we check your identifiers?',
        a: 'UEI XQXDN6E33SF4, CAGE 9KL18, and primary NAICS 561612. Every code is on our Capability Statement, with links to check them on SAM.gov and GSA eLibrary.',
      },
      {
        q: 'Have you worked on military installations?',
        a: 'Yes. We have hands-on experience running access control for restricted areas on military installations, alongside base security forces, on post procedures we write.',
      },
    ],
  },
  {
    // Was /industries/data-centers, "Data centers and critical infrastructure" (owner,
    // 2026-10-10: renamed so it names a kind of site, not a service; data centers are one
    // example among several). /industries/data-centers redirects here (public/_redirects).
    slug: 'critical-infrastructure',
    name: 'Critical & High-Liability Sites',
    short: 'Data centers, utilities, cash-handling, and other sites where every entry is documented.',
    title: 'Security for critical and high-liability sites.',
    lead: 'Access control, posted officers, and armed posts where required, for data centers, utilities, cash-handling, and other regulated sites where every entry has to be documented.',
    image: { src: '/images/market/data-centers.webp', alt: '' },
    stake: [
      'Critical and high-liability sites are judged on who was allowed in. A missed check at a dock or a gate is the gap an audit, an insurer, or an incident will find.',
      'Some hold equipment a business depends on, some hold cash or regulated goods, and some are still being built. Each needs officers who follow the access list exactly, write everything down, and are armed only where the post calls for it.',
    ],
    deliver: [
      { role: 'access-control', line: 'Credential checks at every entry, visitor screening, and dock and gate control, all logged.' },
      { role: 'unarmed-security-officers', line: 'Posted officers and perimeter rounds on a set schedule, with every checkpoint logged.' },
      { role: 'armed-security-officers', line: 'Armed posts where the risk, the assets, or the contract calls for them.' },
    ],
    why: [
      { label: 'Entry', value: 'Documented, from construction through operations' },
      { label: 'Restricted areas', value: 'Hands-on access control experience on military installations' },
      { label: 'Armed posts', value: 'Licensed officers, firearms-qualified by Ares, where the post requires it', href: '/services/armed-security-officers' },
      LOGS,
    ],
    ask: 'Send us the site, its phase, and the hours you need covered. We will come back with a staffing plan and post orders.',
    faq: [
      {
        q: 'Can you staff a data center while it is being built?',
        a: 'Yes. A build needs gate and dock control, perimeter rounds, and contractor monitoring. A live site needs posted officers and documented entry. We can staff both, and the plan changes as the site does.',
      },
      {
        // Copy audit round 2 (2026-10-10): the line the utility emails use.
        q: 'Can you add officers during an outage or storm event?',
        a: 'Yes. Our relief roster staffs surge coverage at substations, yards, and other utility sites during outages and storm events, on top of the posts already in place.',
      },
      {
        q: 'Do you provide armed officers for cash-handling and regulated sites?',
        a: 'Yes, where the post calls for it. Armed officers are licensed and firearms-qualified by Ares, and the post orders say when and why the post is armed.',
      },
      {
        q: 'Will your officers learn our systems and rules?',
        a: 'Yes. Before their first shift they are trained on your access list, your post orders, and the systems at your site, such as card readers, visitor software, and intercoms.',
      },
      {
        q: 'Where in Colorado do you work?',
        a: 'The Denver metro area, including Aurora and the DIA corridor, Colorado Springs, and Pueblo. Ares is licensed and bonded for armed and unarmed security in Denver, Colorado Springs, and Pueblo.',
      },
      {
        q: 'Can a federal agency order through GSA?',
        a: 'Yes. Ares holds GSA Multiple Award Schedule contract 47QSMS25D009Q under SIN 561612.',
      },
    ],
  },
  {
    slug: 'construction-industrial',
    name: 'Construction, Industrial & Logistics',
    short: 'Gate control, perimeter rounds, and after-hours patrol for builds and yards.',
    title: 'Security for construction and industrial sites.',
    lead: 'Gate control, perimeter rounds, and after-hours patrol for active builds, yards, warehouses, and industrial sites, while the site is being built and after.',
    image: { src: '/images/market/construction-industrial.webp', alt: '' },
    stake: [
      'An active build is open in ways a finished building is not: fences move, gates change, and equipment and materials sit on the ground overnight. Theft and trespass happen in the hours nobody is there.',
      'Warehouses and industrial sites run long hours, with trucks, contractors, and deliveries at every gate. Both need officers who check everything in and out and keep a record of it.',
    ],
    deliver: [
      { role: 'access-control', line: 'Gate and dock control: people, vehicles, and deliveries checked before they enter.' },
      { role: 'mobile-patrol', line: 'Marked-vehicle patrol and after-hours checks across yards and sites.' },
      { role: 'unarmed-security-officers', line: 'Posted officers and perimeter rounds, with every checkpoint logged.' },
    ],
    why: [
      { label: 'First shift', value: 'A member of leadership works the first shift on every new post' },
      { label: 'Build phases', value: 'Coverage that changes with each phase, including escorts on military construction', href: '/services/restricted-area-escort' },
      { label: 'After hours', value: 'Mobile patrol in Ares-marked vehicles, with time-stamped reports', href: '/services/mobile-patrol' },
      LOGS,
    ],
    ask: 'Send us the site, the phase of the build, and the hours you need covered. We will come back with a plan that changes as the site does.',
    faq: [
      {
        q: 'Patrol or a posted officer for a construction site?',
        a: 'A posted officer suits a site with a staffed gate or valuable materials on the ground. A patrol suits a site that needs after-hours checks and a visible presence. Many builds use both at different phases.',
      },
      {
        q: 'Can coverage change as the build moves along?',
        a: 'Yes. Gates, fences, and hours change through a build, and we update the post orders and staffing with them.',
      },
      {
        q: 'Do you cover warehouses and logistics yards?',
        a: 'Yes: posted officers at gates and docks, perimeter rounds, and mobile patrol for buildings and yards.',
      },
    ],
  },
  {
    // New (owner, 2026-10-10). "Ready to staff" wording; names no airport client until there
    // is a contract.
    slug: 'airport-transportation',
    name: 'Airport & Transportation',
    short: 'Airport-area sites, transit and parking facilities, and cargo operations.',
    title: 'Security for airport and transportation sites.',
    lead: 'Officers we are ready to staff at airport-area sites, transit and parking facilities, and cargo and logistics operations, uniformed or plainclothes, on every shift.',
    image: { src: '/images/market/airport-transportation.webp', alt: '' },
    stake: [
      'Transportation sites never close. Vehicles, cargo, and people move through them around the clock, and every gate, lot, and dock is a way in.',
      'Around an airport, access is controlled and procedures are set by the facility. Officers have to learn those rules before they stand the post, follow them exactly, and log what they check.',
    ],
    deliver: [
      { role: 'access-control', line: 'Credential checks and gate and dock control for vehicles, cargo, and people, all logged.' },
      { role: 'unarmed-security-officers', line: 'Uniformed or plainclothes officers for lobbies, platforms, and parking.' },
      { role: 'mobile-patrol', line: 'Patrol of lots, yards, and perimeters, with after-hours checks.' },
    ],
    why: [
      { label: 'Restricted areas', value: 'Escort and access control on a Space Force base in Colorado', href: '/services/restricted-area-escort' },
      { label: 'Uniform', value: 'Uniformed or plainclothes, as the site calls for' },
      LOGS,
      RELIEF,
    ],
    ask: 'Send us the site, its access rules, and the hours you need covered. We will come back with a staffing plan and post orders.',
    faq: [
      {
        q: 'Have your officers worked restricted areas?',
        a: 'Yes. Our officers have run access control, escort, and vehicle inspection for restricted areas on military installations, alongside base security forces.',
      },
      {
        q: 'Uniformed or plainclothes?',
        a: 'Both. Uniformed officers deter and direct; plainclothes officers watch without changing how a space feels. Many sites use both.',
      },
      {
        q: 'Do you cover parking and cargo areas?',
        a: 'Yes: posted officers at gates and docks, patrol of lots and yards, and a log of every vehicle and delivery checked.',
      },
      {
        q: 'Where in Colorado do you work?',
        a: 'The Denver metro area, including Aurora and the DIA corridor, Colorado Springs, and Pueblo. Ares is licensed and bonded for armed and unarmed security in Denver, Colorado Springs, and Pueblo.',
      },
    ],
  },
  {
    slug: 'commercial-property',
    name: 'Commercial & Retail',
    short: 'Offices, retail, banks, hotels, and property portfolios.',
    title: 'Security for commercial property and retail.',
    lead: 'Officers for offices, retail, banks, hotels, and property portfolios: a visible, courteous presence that deters, screens, and helps.',
    image: { src: '/images/market/commercial-property.webp', alt: '' },
    stake: [
      'In a lobby, on a sales floor, or at a hospital entrance, the officer is the first person many visitors meet. They have to deter trouble without making the space feel guarded.',
      'Property managers also need the work reported the same way across one building or a portfolio, so they can read one summary instead of chasing several.',
    ],
    deliver: [
      { role: 'unarmed-security-officers', line: 'Lobby, front desk, and foot patrol, uniformed or plainclothes.' },
      { role: 'mobile-patrol', line: 'One patrol across several properties, with a report for each.' },
      { role: 'armed-security-officers', line: 'Armed officers for banks and cash-handling sites.' },
    ],
    why: [
      { label: 'Client rating', value: 'Very Good or Exceptional on 43 of 45 client criteria', href: '/capability-statement' },
      { label: 'Officer rating', value: '4.8 / 5 from our employees on Indeed', href: INDEED_REVIEWS, external: true },
      { label: 'Portfolios', value: 'One patrol across several properties, with a report for each', href: '/services/mobile-patrol' },
      LICENSED,
    ],
    ask: 'Send us the properties, the hours, and what you want officers to watch for. We will come back with a staffing plan for one site or the whole portfolio.',
    faq: [
      {
        q: 'Do you provide retail loss prevention?',
        a: 'Yes. Uniformed officers deter on the sales floor, and plainclothes officers work where a uniform would change how the store feels.',
      },
      {
        q: 'Can you cover several properties under one contract?',
        a: 'Yes, with posted officers, a patrol route across the portfolio, or both, and a report for each property.',
      },
      {
        q: 'Can you cover extra posts during a busy season or a renovation?',
        a: 'Yes. Our relief roster staffs extra posts for busy seasons, renovations, and dates that outgrow your normal staffing, with each officer trained on your site first.',
      },
    ],
  },
  {
    // New (owner, 2026-10-10).
    slug: 'institutional-community',
    name: 'Institutional & Community',
    short: 'Hospitals, schools, campuses, and apartment communities.',
    title: 'Security for hospitals, schools, campuses, and communities.',
    lead: 'Officers for hospitals, schools, campuses, and apartment communities: a calm, consistent presence, trained on the site and its daily rhythm before the first shift.',
    image: { src: '/images/market/institutional-community.webp', alt: '' },
    stake: [
      'In a hospital, a school, or an apartment community, the officer is part of daily life. Patients, students, staff, and residents need to feel safe without feeling watched, and a visitor in distress needs someone calm.',
      'These sites have many doors, steady visitor traffic, and quiet hours when few people are around. They need officers who know the entry points and the daily rhythm, and the same faces on post from shift to shift.',
    ],
    deliver: [
      { role: 'unarmed-security-officers', line: 'Uniformed or plainclothes officers at entrances, front desks, and public areas.' },
      { role: 'access-control', line: 'Visitor check-in and entry control, with every entry logged.' },
      { role: 'mobile-patrol', line: 'Patrol across a campus or several buildings, with after-hours checks.' },
    ],
    why: [
      { label: 'Officer rating', value: '4.8 / 5 from our employees on Indeed', href: INDEED_REVIEWS, external: true },
      { label: 'Uniform', value: 'Uniformed or plainclothes, as the setting calls for' },
      { label: 'First shift', value: 'A member of leadership works the first shift on every new post' },
      LOGS,
    ],
    ask: 'Send us the site, its entry points, and the hours you need covered. We will come back with a staffing plan and post orders.',
    faq: [
      {
        q: 'Can officers be plainclothes in a school or hospital?',
        a: 'Yes. Uniformed officers deter at entrances, and plainclothes officers work where a uniform would change how the space feels. Many sites use both.',
      },
      {
        q: 'Will we see the same officers?',
        a: 'As much as schedules allow. Each post is staffed with officers trained on that site, and on-call relief is written into every contract, so a shift is never left open.',
      },
      {
        q: 'Do you cover apartment and residential communities?',
        a: 'Yes: posted officers, patrol across buildings and grounds, and after-hours checks, with a report for each property.',
      },
      {
        q: 'Where in Colorado do you work?',
        a: 'The Denver metro area, Colorado Springs, and Pueblo. Ares is licensed and bonded for armed and unarmed security in Denver, Colorado Springs, and Pueblo.',
      },
    ],
  },
];

export const industryBySlug = (slug?: string) => INDUSTRY_PAGES.find((i) => i.slug === slug);
