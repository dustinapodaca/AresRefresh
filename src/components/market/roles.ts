// Role pages (/services/<slug>): one page per service, named as buyers search for it
// (docs/market-concepts.md, 2026-10-08). The six services are the capability statement's
// six, and each page's duties reuse its approved lines (src/components/capability/data.ts).
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

/** The rows every role shares, after its own. */
export const SHARED_SHEET: SheetRow[] = [
  { label: 'Licensed and bonded', value: 'Colorado Springs, Denver, and Pueblo', href: '/locations/colorado-springs' },
  { label: 'Training', value: 'On the post, by a member of leadership who has worked it' },
  { label: 'Coverage', value: 'Any shift pattern, with on-call relief in every contract' },
  GSA_ROW,
];

const GSA_FAQ: Faq = {
  q: 'Can federal agencies order this through GSA?',
  a: 'Yes. Ares holds GSA Multiple Award Schedule contract 47QSMS25D009Q under SIN 561612, so agencies can order at pre-negotiated ceiling prices using the streamlined FAR 8.4 procedures, usually a request for quotes to schedule holders on GSA eBuy, instead of a new open-market solicitation.',
};
const RELIEF_FAQ: Faq = {
  q: 'What happens if an officer cannot make a shift?',
  a: 'On-call coverage is written into every contract, so a call-out is covered from our roster instead of leaving the post empty. We have missed fewer than 1% of shifts since 2021.',
};

export const ROLE_PAGES: RolePageData[] = [
  {
    slug: 'armed-security-officers',
    capabilityId: 'armed',
    name: 'Armed security officers',
    title: 'Armed security officers.',
    lead: 'Licensed, firearms-qualified officers for cash-handling, regulated, and high-liability posts across Colorado, from a company licensed and bonded for armed security in Colorado Springs, Denver, and Pueblo.',
    sheet: { label: 'Firearms', value: 'Qualified by our NRA-certified instructor, a veteran' },
    ask: 'Tell us the site, the hours, and why the post needs to be armed.',
    industries: ['government-military', 'commercial-property', 'data-centers'],
    faq: [
      {
        q: 'When does a site need armed officers instead of unarmed?',
        a: 'When the risk, the assets on site, or a contract or insurance requirement calls for it: cash handling, regulated materials, high-liability sites, and some federal posts. If you are not sure, we walk the site before anything is signed and recommend what the post actually needs.',
      },
      {
        q: 'Are your armed officers licensed?',
        a: 'Yes. Ares is licensed and bonded for armed security in Colorado Springs, Denver, and Pueblo, and firearms qualifications are current at time of post.',
      },
      {
        q: 'Who trains them?',
        a: 'Firearms training comes from our NRA-certified firearms instructor, a veteran. Every officer is also trained on the post itself, before the first shift, by a member of our leadership who has worked it.',
      },
      GSA_FAQ,
      RELIEF_FAQ,
    ],
  },
  {
    slug: 'unarmed-security-officers',
    capabilityId: 'unarmed',
    name: 'Unarmed security officers',
    title: 'Unarmed security officers.',
    lead: 'Uniformed and plainclothes officers for lobbies, perimeters, and public areas: a visible, trained presence that screens, directs, patrols, and reports.',
    sheet: { label: 'Uniform', value: 'Uniformed or plainclothes, as the site calls for' },
    ask: 'Tell us the site, the hours, and how many officers you need on post.',
    industries: ['commercial-property', 'construction-industrial', 'government-military'],
    faq: [
      {
        q: 'What does an unarmed officer do on a typical post?',
        a: 'Controls who comes in, patrols on a set schedule, logs every checkpoint, writes up incidents, and acts as the first point of contact for visitors and staff, all to the post orders written for your site.',
      },
      {
        q: 'Uniformed or plainclothes?',
        a: 'Either. Uniformed officers are a visible deterrent. Plainclothes officers suit sites where a uniform would change how the space feels, such as retail loss prevention.',
      },
      {
        q: 'Do you staff posts around the clock?',
        a: 'Yes, with on-call relief in every contract so a call-out never leaves the post empty.',
      },
      {
        q: 'How soon can you start?',
        a: 'It depends on the site and how many officers it needs. We start with a walk of your site and written post orders. Tell us your date in the quote request and we will tell you plainly whether we can meet it.',
      },
      GSA_FAQ,
    ],
  },
  {
    slug: 'access-control',
    capabilityId: 'access',
    name: 'Access control officers',
    title: 'Access control officers.',
    lead: 'Officers who decide who and what gets in: credential checks, visitor screening, and gate, dock, and lobby control, with a log you can audit.',
    sheet: { label: 'Logs', value: 'Visitor and checkpoint logs you can audit' },
    ask: 'Tell us the entry points, the hours, and who is allowed in.',
    industries: ['data-centers', 'government-military', 'construction-industrial'],
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
        q: 'Can your officers escort contractors and visitors?',
        a: 'Yes. We provide escort and monitoring inside restricted and controlled areas, and we have hands-on experience running access control for restricted areas on military installations, alongside base security forces.',
      },
      {
        q: 'Will officers use our access system?',
        a: 'Yes. Officers are trained on your site’s own systems, such as card readers, visitor software, and intercoms, before their first shift.',
      },
      GSA_FAQ,
    ],
  },
  {
    slug: 'mobile-patrol',
    capabilityId: 'vehicle',
    name: 'Mobile patrol',
    title: 'Mobile patrol.',
    lead: 'Marked Ares vehicles on a set route: after-hours checks, alarm response, and one patrol across several properties, with a time-stamped report for each.',
    sheet: { label: 'Vehicles', value: 'Ares-marked patrol vehicles' },
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
      RELIEF_FAQ,
    ],
  },
  {
    slug: 'event-security',
    capabilityId: 'event',
    name: 'Event security',
    title: 'Event security.',
    lead: 'Officers for public and private events: crowd management, entry screening, and one coverage plan shared with your staff and the venue.',
    sheet: { label: 'Plan', value: 'One written plan, shared with your staff and venue' },
    ask: 'Tell us the date, the venue, and how many people you expect.',
    industries: ['commercial-property', 'government-military'],
    faq: [
      {
        q: 'How far ahead should we book?',
        a: 'As early as you can. Tell us the date, the expected attendance, and the venue, and we will tell you plainly what we can staff.',
      },
      {
        q: 'What does the coverage plan include?',
        a: 'Where officers stand, how entry screening works, who they report to on your team, and what happens if something goes wrong. We write it with your staff and the venue.',
      },
      {
        q: 'Armed or unarmed?',
        a: 'Either, depending on the event and what the venue requires.',
      },
      {
        q: 'Do you cover one-day events?',
        a: 'Yes, along with recurring events and surge coverage for dates that outgrow your normal staffing.',
      },
    ],
  },
  {
    slug: 'emergency-response',
    capabilityId: 'emergency',
    name: 'Emergency response',
    title: 'Emergency response.',
    lead: 'When something happens on site: officers who respond, contain the incident, work with first responders, and write down what happened.',
    sheet: { label: 'Reporting', value: 'A written report after every incident' },
    ask: 'Tell us the site and what you need officers ready to handle.',
    industries: ['data-centers', 'commercial-property', 'government-military'],
    faq: [
      {
        q: 'What do officers do during an incident?',
        a: 'Secure the area, keep people safe, contact your designated staff and emergency services, and stay until the scene is handed over.',
      },
      {
        q: 'Do your officers work with police and fire?',
        a: 'Yes. They work alongside your staff and first responders during an incident and hand the scene over to them.',
      },
      {
        q: 'What do we get afterward?',
        a: 'A written report of what happened, what was done, and who was involved, for your records and your insurer.',
      },
    ],
  },
];

export const roleBySlug = (slug?: string) => ROLE_PAGES.find((r) => r.slug === slug);
export const capabilityFor = (r: RolePageData) => CAPABILITIES.find((c) => c.id === r.capabilityId)!;
