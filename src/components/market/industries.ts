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
};

const LICENSED: SheetRow = { label: 'Licensed and bonded', value: 'Armed and unarmed, in Denver, Colorado Springs, and Pueblo', href: '/locations/denver' };
const RELIEF: SheetRow = { label: 'Relief', value: 'On-call coverage written into every contract' };
const LOGS: SheetRow = { label: 'Records', value: 'Checkpoint, visitor, and incident logs you can audit' };
const GSA: SheetRow = { label: 'GSA MAS', value: '47QSMS25D009Q, SIN 561612', href: GSA_ELIBRARY, external: true };

export const INDUSTRY_PAGES: IndustryPageData[] = [
  {
    slug: 'data-centers',
    name: 'Data centers and critical infrastructure',
    short: 'Access control and documented entry, from construction through operations.',
    title: 'Security for data centers and critical infrastructure.',
    lead: 'Access control, posted officers, and checkpoint logs for data centers, utilities, and other sites where every entry has to be documented, from construction through operations.',
    image: { src: '/images/market/data-centers.webp', alt: '' },
    stake: [
      'Data centers and critical infrastructure are judged on who was allowed in. A missed check at a dock or a gate is the gap an audit, an insurer, or an incident will find.',
      'During construction the same site sees a steady flow of workers, contractors, and deliveries. In operation it holds the equipment the business depends on. Both need officers who follow the access list exactly and write everything down.',
    ],
    deliver: [
      { role: 'access-control', line: 'Credential checks at every entry, visitor screening, and dock and gate control, all logged.' },
      { role: 'unarmed-security-officers', line: 'Posted officers and perimeter rounds on a set schedule, with every checkpoint logged.' },
      { role: 'armed-security-officers', line: 'Armed posts where the risk, the assets, or the contract calls for them.' },
    ],
    why: [
      LOGS,
      { label: 'Restricted areas', value: 'Hands-on access control experience on military installations' },
      RELIEF,
      LICENSED,
      GSA,
    ],
    ask: 'Send us the site, its phase, and the hours you need covered. We will come back with a staffing plan and post orders.',
    faq: [
      {
        q: 'Can you staff a data center while it is being built?',
        a: 'Yes. A build needs gate and dock control, perimeter rounds, and contractor monitoring. A live site needs posted officers and documented entry. We can staff both, and the plan changes as the site does.',
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
    slug: 'government-military',
    name: 'Government and military facilities',
    short: 'Federal, state, and municipal facilities and military installations, through GSA.',
    title: 'Security for government and military facilities.',
    lead: 'Officers for federal, state, and municipal facilities and military installations, available to agencies through our GSA Multiple Award Schedule.',
    image: { src: '/images/market/government-military.webp', alt: '' },
    stake: [
      'Public-sector posts run on post orders, documentation, and the rules of the facility. The officer at the entrance represents the agency to everyone who walks through it.',
      'Agencies also need a contracting path that already exists. Ares holds a GSA Multiple Award Schedule contract, is active on SAM.gov, and is an SBA-certified woman-owned small business.',
    ],
    deliver: [
      { role: 'access-control', line: 'Entry control, visitor screening, and escort and monitoring inside restricted areas.' },
      { role: 'unarmed-security-officers', line: 'Uniformed officers for entrances, lobbies, and public areas, working to the facility’s post orders.' },
      { role: 'armed-security-officers', line: 'Armed posts where the facility or the contract requires them.' },
    ],
    why: [
      GSA,
      { label: 'SAM.gov', value: `Active through ${SAM_ACTIVE_THROUGH}`, href: SAM_VERIFY, external: true },
      { label: 'WOSB', value: 'WOSB250470, set-aside eligible under NAICS 561612' },
      { label: 'Restricted areas', value: 'Hands-on access control experience on military installations' },
      { label: 'Veterans', value: 'Veteran supervisors and a veteran NRA firearms instructor' },
    ],
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
    slug: 'construction-industrial',
    name: 'Construction and industrial sites',
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
      LOGS,
      { label: 'First shift', value: 'A member of leadership works the first shift on every new post' },
      RELIEF,
      LICENSED,
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
    slug: 'commercial-property',
    name: 'Commercial property and retail',
    short: 'Offices, retail, banks, hotels, and healthcare and campus sites.',
    title: 'Security for commercial property and retail.',
    lead: 'Officers for offices, retail, banks, hotels, and healthcare and campus sites: a visible, courteous presence that deters, screens, and helps.',
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
      { label: 'Client rating', value: 'Rated Exceptional on 16 of 18 client criteria', href: '/capability-statement' },
      { label: 'Officer rating', value: '4.8 / 5 from our employees on Indeed', href: INDEED_REVIEWS, external: true },
      RELIEF,
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
        q: 'Do you staff events at our property?',
        a: 'Yes. We provide event security with crowd management, entry screening, and one plan shared with your staff.',
      },
    ],
  },
];

export const industryBySlug = (slug?: string) => INDUSTRY_PAGES.find((i) => i.slug === slug);
