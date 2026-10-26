import type { Mark } from '../home/DocRail';

// Capability Statement content. Source: docs/capability-content.md (every item carries
// over); wording changes are logged in docs/copy-changes.md.

export const CAP_MARKS: readonly Mark[] = [
  { id: 'capabilities', n: '01', label: 'Capabilities' },
  { id: 'why', n: '02', label: 'Why Ares' },
  { id: 'past', n: '03', label: 'Past performance' },
  { id: 'buy', n: '04', label: 'How to buy' },
  { id: 'credentials', n: '05', label: 'Credentials' },
  { id: 'download', n: '06', label: 'Download' },
];

// Past performance (owner, 2026-10-11): a selection, not a full count (owner: never worded as
// if these are all the contracts Ares has had), clients unnamed (no evaluator names or numbers here; those stay in proposals). Never name the base
// or the clients; the completed contracts and the Denver client are cannabis dispensaries,
// and the site carries no cannabis references. The Pueblo retail client is not named until
// Deidre approves it.
// The redesigned Capability Statement (owner, 2026-10-24) drops the revenue line: revenue is company
// data, not past performance, so the contracts lead there (`leadNext`, the featured row). The
// revenue sentence in `lead` is kept only for the earlier page (components/capability/Sections.tsx,
// what aressecurity.co runs) until the owner signs off on removing it there too.
export type PastRow = {
  scope: string;
  where: string;
  term: string;
  status?: 'current' | 'completed';
  role?: 'Prime' | 'Subcontractor';
  /** e.g. '$400K+'. Leave unset until Deidre supplies it. Never estimate. */
  value?: string;
  featured?: boolean;
};
export const PAST_PERFORMANCE: { lead: string; leadNext: string; rows: PastRow[] } = {
  // $2.1M is Ares revenue 2021 to 2025 from the tax returns (owner), so it reads as revenue,
  // not as a combined contract value.
  lead: 'Selected contracts since 2021. Ares earned more than $2.1 million in revenue from 2021 through 2025. Clients are not named here; references are available on request.',
  // "References are available on request" is the footnote under the list on the redesigned page.
  leadNext: 'Selected contracts since 2021. Clients are not named here.',
  // TODO(owner): Deidre to supply the role (prime or subcontractor) for the last three rows and an
  // approximate value for each contract; once set here they render on the redesigned page.
  rows: [
    { scope: 'Restricted-area escort and access control', where: 'A Space Force base in Colorado, as a subcontractor on a federal construction program', term: '2025 to 2027', status: 'current', role: 'Subcontractor', featured: true },
    { scope: 'Armed multi-site security', where: 'Denver metro', term: 'Since 2022, through multiple renewals', status: 'current' },
    { scope: 'Retail security', where: 'Pueblo', term: 'Two years, ongoing', status: 'current' },
    { scope: 'Seven completed armed security contracts', where: 'Colorado', term: '2021 to 2025', status: 'completed' },
  ],
};

export const PDF_URL = '/files/Ares-Security-Capability-Statement-2026.pdf';
export const SAM_VERIFY = 'https://sam.gov/workspace/contract/opp/acdccc2e5c1f4416aee823f55dc5fa09/view';

// SAM.gov registration end date. Update this one line when the registration renews (each
// year); the footer and the Capability Statement both read it.
export const SAM_ACTIVE_THROUGH = 'March 26, 2027';

export const QUICK_FACTS: { label: string; value: string; note: string; verify?: boolean; copy?: boolean }[] = [
  { label: 'Primary NAICS', value: '561612', note: 'Security Guards & Patrol Services' },
  { label: 'Set-aside', value: 'WOSB eligible', note: 'Woman-Owned Small Business\nWBE certified' },
  { label: 'UEI', value: 'XQXDN6E33SF4', note: 'Unique Entity ID (SAM.gov)', verify: true, copy: true },
  { label: 'CAGE code', value: '9KL18', note: 'Commercial & Government Entity', copy: true },
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
    // Card names match the service pages (owner, 2026-10-10; were "Armed Physical Security",
    // "Unarmed Physical Security", "Access Control"). The owner updates the PDF to match.
    title: 'Armed Security Officers',
    line: 'Licensed, firearms-qualified officers for cash-handling, regulated, and high-liability posts.',
    keys: ['Armed', 'Cash-handling', 'Regulated'],
    includes: [
      // The missed-shift figure lives in Why Ares and the PDF (design review, owner 2026-10-13).
      { name: 'Fixed armed posts', detail: 'Officers on a set post every shift, with on-call scheduling in every contract.' },
      { name: 'Cash-handling sites', detail: 'Banks, retail cash rooms, and other sites where money changes hands.' },
      { name: 'Regulated and high-liability sites', detail: 'Posts with licensing, audit, or insurance requirements on who may stand them.' },
      { name: 'Firearms qualification', detail: 'Licensed, firearms-qualified officers, trained by our veteran NRA firearms instructor and current at time of post.' },
    ],
  },
  {
    id: 'unarmed',
    title: 'Unarmed Security Officers',
    line: 'Uniformed and plainclothes officers for lobbies, perimeters, and public areas.',
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
    title: 'Access Control Officers',
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
      { name: 'Relief shifts', detail: 'Call-outs, vacations, and training days covered from our relief schedule.' },
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
    // Owner, 2026-10-25: no alarm response; lead with the patrol cars.
    keys: ['Patrol cars', 'Routes', 'GPS-verified'], // short enough for one line on every card (owner)
    includes: [
      { name: 'Marked-vehicle patrol', detail: 'Ares-marked patrol cars, a visible deterrent on every pass.' },
      { name: 'After-hours checks', detail: 'Door, gate, and perimeter checks once a site is closed.' },
      { name: 'Multi-property routes', detail: 'One patrol covering a portfolio, with GPS-verified routes and time-stamped reports per property.' },
    ],
  },
];

// Why Ares: the capability statement's three differentiators, plus restricted-area
// experience (owner, 2026-10-05). Each carries its proof.
// `phoneBreak`: the words before a line break on narrow phones, so the title wraps to two lines like
// the others there (owner, 2026-10-15).
export type Differentiator = { title: string; body: string; proof: string; href?: string; phoneBreak?: string };

export const DIFFERENTIATORS: Differentiator[] = [
  {
    title: 'Restricted-area experience',
    body: 'We have hands-on experience running access control for restricted areas on military installations, working alongside base security forces every day. We write the SOPs for these posts and train every officer on them.',
    proof: 'Restricted areas · Military installations · Veterans in leadership',
  },
  {
    title: 'Four-stage deployment',
    phoneBreak: 'Four-stage',
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

export const GSA_SPECS: { label: string; value: string; mono?: boolean; copy?: boolean }[] = [
  { label: 'Contract number', value: '47QSMS25D009Q', mono: true, copy: true },
  { label: 'SIN', value: '561612 · Security Services' },
  { label: 'Schedule', value: 'Multiple Award Schedule (MAS)' },
  { label: 'Period of performance', value: '5-year · optional extensions' },
];

export const PATHS: { name: string; status: 'Available' | 'On request'; to?: string }[] = [
  { name: 'Open market · FAR 13', status: 'Available' },
  { name: 'BPAs & IDIQs', status: 'On request' },
  { name: 'State of Colorado contracts', status: 'Available' },
  { name: 'Teaming & subcontracting with primes', status: 'Available', to: '/teaming' },
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

// Certifications and codes as one table, each identifier once (copy audit round 2; the
// owner chose it, 2026-10-11). The marks-then-listing layout (?creds=marks) was removed at launch
// (owner, 2026-10-19). SAM-registered "Small business" was dropped: the WOSB
// certification already says it (owner).
export type CredRow = { label: string; value: string; note?: string; mono?: boolean; live?: boolean; copy?: boolean; mark?: Cert };
const mark = (src: string) => CERTS.find((c) => c.src === src);

export const CRED_GROUPS: { name: string; rows: CredRow[] }[] = [
  {
    name: 'Contract vehicle',
    rows: [{ label: 'GSA Multiple Award Schedule', value: '47QSMS25D009Q', note: 'SIN 561612 · Security Services', mono: true, copy: true, mark: { src: '/images/cert-gsa-square.png', alt: 'GSA', name: 'GSA', color: true } }],
  },
  {
    name: 'Registration',
    rows: [
      { label: 'SAM status', value: 'Active', note: `Through ${SAM_ACTIVE_THROUGH}`, live: true },
      { label: 'UEI', value: 'XQXDN6E33SF4', note: 'Unique Entity Identifier (SAM.gov)', mono: true, copy: true },
      { label: 'CAGE code', value: '9KL18', note: 'Commercial & Government Entity', mono: true, copy: true },
      { label: 'DUNS number', value: '10-244-9635', note: 'Legacy. UEI is the SAM identifier going forward', mono: true },
      { label: 'Primary NAICS', value: '561612', note: 'Security Guards & Patrol Services', mono: true },
      { label: 'PSC code', value: 'S206', note: 'Guard Services', mono: true },
    ],
  },
  {
    name: 'Certifications',
    rows: [
      { label: 'Woman-Owned Small Business', value: 'WOSB250470', note: 'SBA certified. Eligible for WOSB set-aside awards under NAICS 561612', mono: true, mark: mark('/images/cert-sba-wosb.webp') },
      { label: "WBENC Women's Business Enterprise", value: 'WBE2303571', mono: true, mark: mark('/images/cert-wbenc.png') },
      { label: 'Denver M/WBE · SBE certified', value: '21353671', note: 'B2G vendor number', mono: true, mark: mark('/images/cert-denver-edo.webp') },
      { label: 'Colorado Verified Diverse Business', value: 'Verified', mark: mark('/images/cert-co-diverse.webp') },
      { label: 'Colorado Verified Small Business', value: 'Verified', mark: mark('/images/cert-co-small.webp') },
    ],
  },
  {
    name: 'Licenses and service area',
    rows: [
      { label: 'Local license, Denver', value: '2021-BFN-0001984', note: 'Certified training provider · City of Denver', mono: true },
      { label: 'Local license, Colorado Springs', value: '0850744L', note: 'Certified training provider · City of Colorado Springs', mono: true },
      { label: 'Local license, Pueblo', value: '26422', note: 'Certified training provider · City of Pueblo', mono: true },
      { label: 'Service area', value: 'Greater Colorado Area', note: 'Other locations through teaming partners' },
    ],
  },
];

// Formal third person (copy audit round 2: the Capability Statement and the PDF speak as
// Ares, not "we"; the owner chose it, 2026-10-11). Each line on the page that says we, our,
// us, or you, with its third-person version. The first-person lines stay at
// /capability-statement?voice=first. New copy on this page is written in third person.
export const THIRD_PERSON: Record<string, string> = {
  'Six services, each staffed by officers trained on your post before their first shift. Open one to see what it includes.':
    'Six services, each staffed by officers trained on the post before their first shift. Open one to see what it includes.',
  'Licensed, firearms-qualified officers, trained by our veteran NRA firearms instructor and current at time of post.':
    'Licensed, firearms-qualified officers, trained by the Ares veteran NRA firearms instructor and current at time of post.',
  'Sign-in, ID checks, and a visitor log you can audit.': 'Sign-in, ID checks, and a visitor log the client can audit.',
  'People, vehicles, and deliveries checked against your post orders before they enter.':
    'People, vehicles, and deliveries checked against the site\u2019s post orders before they enter.',
  'Call-outs, vacations, and training days covered from our relief schedule.': 'Call-outs, vacations, and training days covered from the Ares relief schedule.',
  'Officers under your post orders, from a woman-owned small business.': 'Officers under the prime\u2019s post orders, from a woman-owned small business.',
  'We have hands-on experience running access control for restricted areas on military installations, working alongside base security forces every day. We write the SOPs for these posts and train every officer on them.':
    'Ares has hands-on experience running access control for restricted areas on military installations, working alongside base security forces every day. Ares writes the SOPs for these posts and trains every officer on them.',
  'Rated 4.8 by our own employees': 'Rated 4.8 by its own employees',
  'Our employees rate Ares 4.8 out of 5 on Indeed, with management and work-life balance the highest-scoring categories.':
    'Ares employees rate the company 4.8 out of 5 on Indeed, with management and work-life balance the highest-scoring categories.',
  'How to buy from us.': 'How to buy from Ares.',
  'Contact us to confirm scope and pricing for any vehicle above.': 'Contact Ares to confirm scope and pricing for any vehicle above.',
  'All data matches our SAM.gov registration.': 'All data matches the Ares SAM.gov registration.',
};
