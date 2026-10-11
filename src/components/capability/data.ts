import type { Mark } from '../home/DocRail';

// Capability Statement content. Source: docs/capability-content.md (every item carries
// over); wording changes are logged in docs/copy-changes.md.

export const CAP_MARKS: readonly Mark[] = [
  { id: 'capabilities', n: '01', label: 'Capabilities' },
  { id: 'why', n: '02', label: 'Why Ares' },
  { id: 'buy', n: '03', label: 'How to buy' },
  { id: 'credentials', n: '04', label: 'Credentials' },
  { id: 'download', n: '05', label: 'Download' },
];

export const PDF_URL = '/files/Ares-Security-Capability-Statement-2026.pdf';
export const SAM_VERIFY = 'https://sam.gov/workspace/contract/opp/acdccc2e5c1f4416aee823f55dc5fa09/view';

// SAM.gov registration end date. Update this one line when the registration renews (each
// year); the footer and the Capability Statement both read it.
export const SAM_ACTIVE_THROUGH = 'March 26, 2027';

export const QUICK_FACTS: { label: string; value: string; note: string; verify?: boolean }[] = [
  { label: 'Primary NAICS', value: '561612', note: 'Security Guards & Patrol Services' },
  { label: 'Set-aside', value: 'WOSB eligible', note: 'Woman-Owned Small Business\nWBE certified' },
  { label: 'UEI', value: 'XQXDN6E33SF4', note: 'Unique Entity ID (SAM.gov)', verify: true },
  { label: 'CAGE code', value: '9KL18', note: 'Commercial & Government Entity' },
];

// Six core competencies (from the capability statement PDF and the old page). Each card
// opens to what the service includes. Lines marked DRAFT are new to the site (2026-10-05,
// owner asked for fuller detail) and are logged in docs/copy-changes.md for review.
export type Capability = {
  id: string;
  title: string;
  line: string;
  keys: string[];
  includes: { name: string; detail: string }[];
};

export const CAPABILITIES: Capability[] = [
  {
    id: 'armed',
    title: 'Armed Physical Security',
    line: 'Licensed, firearms-qualified officers for cash-handling, regulated, and high-liability posts.',
    keys: ['Armed', 'Cash-handling', 'Regulated'],
    includes: [
      { name: 'Fixed armed posts', detail: 'Officers on a set post every shift. Fewer than 1% missed shifts since 2021, with on-call scheduling in every contract.' },
      { name: 'Cash-handling sites', detail: 'Banks, retail cash rooms, and other sites where money changes hands.' },
      { name: 'Regulated and high-liability sites', detail: 'Posts with licensing, audit, or insurance requirements on who may stand them.' },
      { name: 'Firearms qualification', detail: 'Licensed, firearms-qualified officers, trained by our veteran NRA firearms instructor and current at time of post.' },
    ],
  },
  {
    id: 'unarmed',
    title: 'Unarmed Physical Security',
    line: 'Uniformed and plainclothes officers for lobbies, perimeters, and passenger areas.',
    keys: ['Uniformed', 'Plainclothes', '24/7'],
    includes: [
      { name: 'Lobby and front desk', detail: 'A visible first point of contact that screens and directs visitors.' },
      { name: 'Perimeter and foot patrol', detail: 'Interior and grounds rounds on a set schedule, with every checkpoint logged.' },
      { name: 'Passenger and public areas', detail: 'Coverage for terminals, transit, and other spaces open to the public.' },
      { name: 'Plainclothes and loss prevention', detail: 'Discreet officers where a uniform would change how a space feels.' },
      { name: 'Fire watch', detail: 'Dedicated rounds when alarm or sprinkler systems are down, with time-stamped logs.' },
    ],
  },
  {
    id: 'access',
    title: 'Access Control',
    line: 'Credential verification, visitor screening, and gate, dock, and lobby control.',
    keys: ['Credentials', 'Screening', 'Escort'],
    includes: [
      { name: 'Credential verification', detail: 'IDs, badges, and access lists checked at every entry point.' },
      { name: 'Visitor screening', detail: 'Sign-in, ID checks, and a visitor log you can audit.' },
      { name: 'Gate, dock, and lobby control', detail: 'People, vehicles, and deliveries checked against your post orders before they enter.' },
      { name: 'Restricted-area escort', detail: 'Personnel and vehicle checks, escort, and monitoring inside restricted areas.' },
    ],
  },
  {
    // Replaced Emergency Response (copy audit round 2, owner 2026-10-10); its content moved
    // into the officer pages' questions.
    id: 'escort',
    title: 'Restricted-Area Escort',
    line: 'Escort for crews, visitors, and deliveries inside controlled areas, with custody logs.',
    keys: ['Escort', 'Line of sight', 'Custody logs'],
    includes: [
      { name: 'Crew, visitor, and delivery escort', detail: 'People and deliveries escorted inside the controlled area, kept in the officer\u2019s line of sight.' },
      { name: 'Person and vehicle verification', detail: 'IDs, access lists, and vehicles checked before anyone enters.' },
      { name: 'Custody logs', detail: 'Who entered, when, with whom, and when they left, logged for every escort.' },
      { name: 'Coordination with installation security', detail: 'Officers who work to the site\u2019s rules, alongside its own security forces.' },
    ],
  },
  {
    // Replaced Event Security (copy audit round 2, owner 2026-10-10): the relief and
    // subcontract coverage every outreach email already sells.
    id: 'relief',
    title: 'Relief & Surge Coverage',
    line: 'Trained officers when a roster runs short: relief shifts, overflow posts, and surge staffing.',
    keys: ['Relief', 'Overflow', 'Surge'],
    includes: [
      { name: 'Relief shifts', detail: 'Call-outs, vacations, and training days covered from our roster.' },
      { name: 'Overflow posts', detail: 'Officers for the entrances, phases, or hours a site adds.' },
      { name: 'Surge staffing', detail: 'Inspections, outages and storm events, construction phases, and contract transitions.' },
      { name: 'Subcontract coverage', detail: 'Officers under your post orders, from a woman-owned small business.' },
    ],
  },
  {
    id: 'vehicle',
    // Was "Patrol Vehicle Security"; one name with Services (owner, 2026-10-10).
    title: 'Mobile Patrol',
    line: 'Marked mobile patrol across multi-building sites, yards, and campuses.',
    keys: ['Marked vehicles', 'Alarm response', 'GPS-verified'],
    includes: [
      { name: 'Marked-vehicle patrol', detail: 'Ares-marked vehicles as a visible deterrent on every pass.' },
      { name: 'Alarm response', detail: 'An officer on site to check the property when an alarm trips.' },
      { name: 'After-hours checks', detail: 'Door, gate, and perimeter checks once a site is closed.' },
      { name: 'Multi-property routes', detail: 'One patrol covering a portfolio, with GPS-verified routes and time-stamped reports per property.' },
    ],
  },
];

// Why Ares: the capability statement's three differentiators, plus restricted-area
// experience (owner, 2026-10-05). Each carries its proof.
export type Differentiator = { title: string; body: string; proof: string; href?: string };

export const DIFFERENTIATORS: Differentiator[] = [
  {
    title: 'Restricted-area experience',
    body: 'We have hands-on experience running access control for restricted areas on military installations, working alongside base security forces every day. We write the SOPs for these posts and train every officer on them.',
    proof: 'Restricted areas · Military installations · Veteran staff',
  },
  {
    title: 'Four-stage deployment',
    body: 'Every engagement runs in four stages: technical audit, compliance mapping, guard training, and deployment. Every officer is trained on the post by a member of leadership who has worked it, before the first shift.',
    proof: 'Trained on post by leadership',
  },
  {
    title: 'Rated Very Good or Exceptional by clients',
    body: 'Across five past performance evaluations since 2021, clients rated Ares Very Good or Exceptional on 43 of 45 criteria, with none below Satisfactory.',
    proof: '43 of 45 criteria',
  },
  {
    title: 'Rated 4.8 by our own employees',
    body: 'Our employees rate Ares 4.8 out of 5 on Indeed, with management and work-life balance the highest-scoring categories.',
    proof: '4.8 / 5 on Indeed',
    href: 'https://www.indeed.com/cmp/Ares-Security-1/reviews',
  },
];

export const GSA_SPECS: { label: string; value: string; mono?: boolean }[] = [
  { label: 'Contract number', value: '47QSMS25D009Q', mono: true },
  { label: 'SIN', value: '561612 · Security Services' },
  { label: 'Schedule', value: 'Multiple Award Schedule (MAS)' },
  { label: 'Period of performance', value: '5-year · optional extensions' },
];

export const PATHS: { name: string; status: 'Available' | 'On request'; to?: string }[] = [
  { name: 'Open market · FAR 13', status: 'Available' },
  { name: 'BPAs & IDIQs', status: 'On request' },
  { name: 'State of Colorado contracts', status: 'Available' },
  { name: 'Teaming and subcontracting with primes', status: 'Available', to: '/teaming' },
];

export type Cert = { src: string; alt: string; name: string; id?: string; tall?: boolean; color?: boolean };

export const CERTS: Cert[] = [
  { src: '/images/cert-gsa-footer.png', alt: 'GSA Contract Holder', name: 'GSA Schedule holder', id: '47QSMS25D009Q', color: true },
  { src: '/images/cert-sba-wosb.webp', alt: 'SBA WOSB certified', name: 'Woman-Owned Small Business', id: 'SBA · WOSB250470' },
  { src: '/images/cert-wbenc.png', alt: 'WBENC', name: "WBENC Women's Business Enterprise", id: 'WBE2303571' },
  { src: '/images/cert-sba-footer.png', alt: 'U.S. Small Business Administration', name: 'SBA small business', id: 'SAM-registered' },
  { src: '/images/cert-denver-edo.webp', alt: 'Denver Economic Development & Opportunity', name: 'Denver M/WBE · SBE certified', id: 'B2G vendor 21353671' },
  { src: '/images/cert-co-diverse.webp', alt: 'Colorado Verified Diverse Business', name: 'Colorado Verified Diverse Business' },
  { src: '/images/cert-co-small.webp', alt: 'Colorado Verified Small Business', name: 'Colorado Verified Small Business' },
];

export const CODES: { label: string; value: string; note: string; mono?: boolean }[] = [
  { label: 'UEI', value: 'XQXDN6E33SF4', note: 'Unique Entity Identifier (SAM.gov)', mono: true },
  { label: 'CAGE code', value: '9KL18', note: 'Commercial & Government Entity', mono: true },
  { label: 'DUNS number', value: '10-244-9635', note: 'Legacy. UEI is the SAM identifier going forward', mono: true },
  { label: 'SAM status', value: 'Active', note: `Through ${SAM_ACTIVE_THROUGH}` },
  { label: 'Primary NAICS', value: '561612', note: 'Security Guards & Patrol Services', mono: true },
  { label: 'PSC code', value: 'S206', note: 'Guard Services', mono: true },
  { label: 'Socioeconomic', value: 'Small Business · WOSB', note: 'Small Business · Woman-Owned Small Business' },
  { label: 'GSA Schedule', value: '47QSMS25D009Q', note: 'SIN 561612 · Security Services', mono: true },
  { label: 'SBA set-asides', value: 'WOSB set-aside eligible', note: 'Eligible for WOSB set-aside awards under NAICS 561612' },
  { label: 'Service area', value: 'Greater Colorado Area', note: 'Nationwide on request' },
  { label: 'Local license, Denver', value: '2021-BFN-0001984', note: 'Certified training provider · City of Denver', mono: true },
  { label: 'Local license, Colorado Springs', value: '0850744L', note: 'Certified training provider · City of Colorado Springs', mono: true },
  { label: 'Local license, Pueblo', value: '26422', note: 'Certified training provider · City of Pueblo', mono: true },
];
