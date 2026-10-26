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
  /** The hero scene: generated (assets/generated/market/) or a real photo (owner, 2026-10-12).
   *  `position` frames the page's wide strip (default 50% 60%); `card` frames Home's tall card
   *  (object-position, plus an optional zoom toward `origin`; default centered, no zoom). */
  image: {
    src: string;
    alt: string;
    position?: string;
    /** Phones (below 768px) only: the strip's framing, with an optional zoom toward `origin`. */
    mobile?: { position: string; zoom?: number; origin?: string };
    card?: { position: string; zoom?: number; origin?: string; /** From 1024px, if it differs (owner, 2026-10-18). */ desktopPosition?: string };
  };
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
    // Government & Defense (owner, 2026-10-16; was Government & Military): federal agencies,
    // military installations, and defense contractors, pitched the way CenCore pitches its
    // defense page (security as part of the mission), without its clearance claims. The slug stays.
    slug: 'government-defense',
    name: 'Government & Defense',
    // Owner, 2026-10-25: agencies, bases, and defense contractors directly, and also any company with
    // work on a base (construction, power, water) that needs escorts or posts. No client or base names.
    short: 'Federal agencies, military bases, and defense contractors, through GSA, and security escorts for any crew working on base.',
    title: 'Security for government, military bases, defense contractors, and crews on base.',
    lead: 'Officers for federal, state, and local agencies, military installations, and the defense contractors that support them: restricted-area escort, access control, and armed posts, available to agencies through our GSA Multiple Award Schedule. Construction, utility, and other companies with work on a base hire us directly for security escorts and posts.',
    // A real photo (owner, 2026-10-16): radomes behind a barbed-wire fence on a Space Force base in
    // Colorado. The strip sits low (whole radomes, the mountains, the fence line along its foot);
    // Home's card shows the left radome and the low buildings behind the fence.
    image: {
      src: '/images/market/government-military.webp',
      alt: '',
      position: '50% 90%',
      // Desktop sits a little further right in the photo, so the radome moves left in the card (owner, 2026-10-18).
      card: { position: '0% 50%', zoom: 1.35, origin: '22% 88%', desktopPosition: '29% 50%' },
    },
    stake: [
      'On a military installation or a defense contractor’s site, security is part of the mission. One missed check at a gate, or one unescorted visitor in a restricted area, becomes a finding, a stop-work, or a delay to the program.',
      'The same goes for a contractor’s crew working inside the fence, on power, water, or a new building. Every worker in a restricted area needs an escort, and a crew without one does not work that day.',
      'Agencies and primes also need a contracting path that already exists. Ares holds a GSA Multiple Award Schedule contract, is active on SAM.gov, and is an SBA-certified woman-owned small business, so an agency can order directly and a prime can count our work toward its small-business subcontracting goals.',
    ],
    deliver: [
      { role: 'restricted-area-escort', line: 'Escort for crews, visitors, and deliveries inside restricted areas on installations and contractor sites, with custody logs.' },
      { role: 'access-control', line: 'Gate and entry control, credential and vehicle checks, and visitor screening, alongside base security forces.' },
      { role: 'unarmed-security-officers', line: 'Uniformed officers for agency buildings, contractor offices, and public areas, working to the facility’s post orders.' },
      { role: 'armed-security-officers', line: 'Armed posts where the facility or the contract requires them.' },
    ],
    why: [
      GSA,
      { label: 'SAM.gov', value: `Active through ${SAM_ACTIVE_THROUGH}`, href: SAM_VERIFY, external: true },
      { label: 'WOSB', value: 'WOSB250470, set-aside eligible under NAICS 561612' },
      { label: 'Restricted areas', value: 'Escort and access control on a Space Force base in Colorado', href: '/services/restricted-area-escort' },
      { label: 'Primes', value: 'Subcontracting credit as a woman-owned small business, under your contract', href: '/teaming' },
      // General, not a count (owner, 2026-10-10: never "veteran-heavy").
      { label: 'Veterans', value: 'We hire veterans, and veterans hold leadership roles, including supervision and firearms training' },
    ],
    // The detail half of the prime panel's two-tone line (the claim is in IndustryPage.tsx).
    primes: 'Subcontracting credit, restricted-area escorts, and relief, overflow, and surge coverage under your contract.',
    ask: 'Send us the installation, facility, or project on base, the post requirements, and the period of performance. We will come back with a staffing plan, under our GSA Schedule or your contract.',
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
        q: 'Do you work with defense contractors?',
        a: 'Yes. We can post officers for access control, visitor screening, and escorts at contractor facilities and on the installations where they work, and we team with primes as a woman-owned small business subcontractor for relief, overflow, and surge coverage under their contracts.',
      },
      {
        q: 'Can a contractor working on a base hire you directly?',
        a: 'Yes. Construction, utility, environmental, and other companies doing work on a base hire us directly for escorts into restricted areas and posts at their work sites, for as long as the project runs. We work alongside base security forces, on post procedures we write.',
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
    // Hospitals moved here from Institutional & Community (owner, 2026-10-16): their security is
    // about liability and documented entry, like the rest of this page.
    short: 'Data centers, utilities, hospitals, cash-handling, and other sites where every entry is documented.',
    title: 'Security for critical and high-liability sites.',
    lead: 'Access control, posted officers, and armed posts where required, for data centers, utilities, hospitals, cash-handling, and other regulated sites where every entry has to be documented.',
    // A real photo (owner, 2026-10-12): a data center campus under snowy peaks. The wide strip
    // can't hold both, so it frames on the building; phones and Home's card show both.
    image: { src: '/images/market/data-centers.webp', alt: '', position: '50% 80%' },
    stake: [
      'Critical and high-liability sites are judged on who was allowed in. A missed check at a dock or a gate is the gap an audit, an insurer, or an incident will find.',
      'Some hold equipment a business depends on, some hold cash or regulated goods, some never close, like a hospital, and some are still being built. Each needs officers who follow the access list exactly, write everything down, and are armed only where the post calls for it.',
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
        a: 'Yes. We staff surge coverage at substations, yards, and other utility sites from our relief schedule during outages and storm events, on top of the posts already in place.',
      },
      {
        q: 'Do you provide armed officers for cash-handling and regulated sites?',
        a: 'Yes, where the post calls for it. Armed officers are licensed and firearms-qualified by Ares, and the post orders say when and why the post is armed.',
      },
      {
        q: 'Do you staff hospitals?',
        a: 'Yes: officers at main and emergency entrances, visitor screening and check-in, and patrol of parking and grounds, with every entry logged. Officers are trained to calm a situation before anything else, and are armed only where the post calls for it.',
      },
      {
        q: 'Will your officers learn our systems and rules?',
        a: 'Yes. Before their first shift they are trained on your access list, your post orders, and the systems at your site, such as card readers, visitor software, and intercoms.',
      },
      {
        q: 'Where in Colorado do you work?',
        a: 'The Denver metro area, including Aurora and the DIA corridor, Colorado Springs, and Pueblo. Ares is licensed and bonded for armed and unarmed security in Denver, Colorado Springs, and Pueblo.',
      },
      // The GSA question was cut here (design review, owner 2026-10-13): agencies aren't the
      // usual buyer for critical and high-liability sites; the Government page carries it.
    ],
  },
  {
    slug: 'construction-industrial',
    name: 'Construction, Industrial & Logistics',
    short: 'Gate control, perimeter rounds, and after-hours patrol for builds and yards.',
    title: 'Security for construction and industrial sites.',
    lead: 'Gate control, perimeter rounds, and after-hours patrol for active builds, yards, warehouses, and industrial sites, while the site is being built and after.',
    // A real photo (owner, 2026-10-12): framed high so the crane and roofline show.
    image: { src: '/images/market/construction-industrial.webp', alt: '', position: '50% 35%' },
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
    // A real photo (owner, 2026-10-12): the terminal sits low in the frame. Desktop frames near the
    // foot so the terminal rides above the bottom fade; phones zoom toward the terminal's right
    // end and the climbing jet.
    image: {
      src: '/images/market/airport-transportation.webp',
      alt: '',
      position: '50% 96%',
      mobile: { position: '78% 80%', zoom: 1.6, origin: '72% 110%' },
    },
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
      // Airport: restricted-area experience is enough; the base is named on Government (design
      // review, owner 2026-10-13).
      { label: 'Restricted areas', value: 'Restricted-area escort and access control experience', href: '/services/restricted-area-escort' },
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
    // Businesses, stores, and loss prevention (owner, 2026-10-16).
    short: 'Retail stores, grocery, shopping centers, banks, hotels, and offices.',
    title: 'Security for commercial property and retail.',
    lead: 'Officers for stores, grocery, shopping centers, banks, hotels, and corporate and tech offices: loss prevention and a visible, courteous presence that deters, screens, and helps.',
    // A real photo (owner, 2026-10-16): the Denver Pavilions sign, framed on the D and the tower.
    image: { src: '/images/market/commercial-property.webp', alt: '', position: '50% 50%' },
    stake: [
      'In a lobby, on a sales floor, or at a store entrance, the officer is the first person many visitors meet. They have to deter theft and trouble without making the space feel guarded.',
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
      // Owner, 2026-10-10: true; the client is not named.
      { label: 'Longest client', value: 'On post continuously since 2022, through multiple renewals' },
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
        a: 'Yes. We staff extra posts from our relief schedule for busy seasons, renovations, and dates that outgrow your normal staffing, with each officer trained on your site first.',
      },
    ],
  },
  {
    // New (owner, 2026-10-10).
    slug: 'institutional-community',
    name: 'Institutional & Community',
    // Apartments, schools, campuses, and local community sites (owner, 2026-10-16); hospitals moved
    // to Critical & High-Liability Sites.
    short: 'Apartment communities, HOAs, schools, campuses, and community centers.',
    title: 'Security for apartments, schools, campuses, and communities.',
    lead: 'Officers for apartment communities, HOAs, schools, campuses, community centers, and places of worship: a calm, consistent presence, trained on the site and its daily rhythm before the first shift.',
    // A real photo (owner, 2026-10-16): apartments at blue hour, framed low on the lit windows.
    image: { src: '/images/market/institutional-community.webp', alt: '', position: '50% 72%' },
    stake: [
      'At a school, an apartment community, or a place of worship, the officer is part of daily life. Students, staff, residents, and visitors need to feel safe without feeling watched, and a person in distress needs an officer who stays calm.',
      'These sites have many doors, steady visitor traffic, and quiet hours when few people are around. They need officers who know the entry points and the daily rhythm, and the same faces on post from shift to shift.',
    ],
    deliver: [
      { role: 'unarmed-security-officers', line: 'Uniformed or plainclothes officers at entrances, front desks, and public areas.' },
      { role: 'access-control', line: 'Visitor check-in and entry control, with every entry logged.' },
      { role: 'mobile-patrol', line: 'Patrol across a campus or several buildings, with after-hours checks.' },
    ],
    why: [
      { label: 'Officer rating', value: '4.8 / 5 from our employees on Indeed', href: INDEED_REVIEWS, external: true },
      // Owner, 2026-10-10: de-escalation first is how Ares trains. (Ares is not an AASC member.)
      { label: 'De-escalation', value: 'Officers trained to calm a situation before anything else' },
      { label: 'Uniform', value: 'Uniformed or plainclothes, as the setting calls for' },
      { label: 'First shift', value: 'A member of leadership works the first shift on every new post' },
    ],
    ask: 'Send us the site, its entry points, and the hours you need covered. We will come back with a staffing plan and post orders.',
    faq: [
      {
        q: 'Can officers be plainclothes in a school or on a campus?',
        a: 'Yes. Uniformed officers deter at entrances, and plainclothes officers work where a uniform would change how the space feels. Many sites use both.',
      },
      {
        q: 'Will we see the same officers?',
        a: 'As much as schedules allow. Each post is staffed with officers trained on that site, and on-call relief is written into every contract, so a shift is never left open.',
      },
      {
        q: 'Do you cover apartment communities and HOAs?',
        a: 'Yes: posted officers, patrol across buildings and grounds, and after-hours checks, with a report for each property.',
      },
      {
        q: 'Do you cover places of worship and community centers?',
        a: 'Yes: a calm, respectful presence during services and events, and patrol of parking and grounds.',
      },
      {
        q: 'Where in Colorado do you work?',
        a: 'The Denver metro area, Colorado Springs, and Pueblo. Ares is licensed and bonded for armed and unarmed security in Denver, Colorado Springs, and Pueblo.',
      },
    ],
  },
];

export const industryBySlug = (slug?: string) => INDUSTRY_PAGES.find((i) => i.slug === slug);
