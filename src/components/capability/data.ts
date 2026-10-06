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

export const QUICK_FACTS: { label: string; value: string; note: string; verify?: boolean }[] = [
  { label: 'Primary NAICS', value: '561612', note: 'Security Guards & Patrol Services' },
  { label: 'Set-aside', value: 'WOSB eligible', note: 'Woman-Owned Small Business · WBE certified' },
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
    title: 'Armed physical security',
    line: 'For sites where an armed officer is required by policy, insurance, or risk.',
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
    title: 'Unarmed physical security',
    line: 'Uniformed and plainclothes officers for lobbies, perimeters, and campuses, 24/7.',
    keys: ['Uniformed', 'Plainclothes', '24/7'],
    includes: [
      { name: 'Lobby and front desk', detail: 'A visible first point of contact that screens and directs visitors.' },
      { name: 'Campus and facility coverage', detail: 'Interior and perimeter coverage across one building or many.' },
      { name: 'Plainclothes officers', detail: 'Discreet coverage where a uniform would change how a space feels.' },
      { name: 'Loss prevention', detail: 'Visible deterrence that scales with foot traffic in retail and hospitality.' },
    ],
  },
  {
    id: 'patrol',
    title: 'Patrol services',
    line: 'Foot and mobile patrol with documented checkpoints across one site or a whole portfolio.',
    keys: ['Foot', 'Mobile', 'Fire watch'],
    includes: [
      { name: 'Foot patrol', detail: 'Interior and grounds rounds on a set schedule, with every checkpoint logged.' },
      { name: 'Checkpoint logs', detail: 'Documented checkpoints and auditable logs for every round.' },
      { name: 'Fire watch', detail: 'Dedicated rounds when alarm or sprinkler systems are down, with time-stamped logs.' },
      { name: 'Multi-property routes', detail: 'One patrol covering a portfolio, with reports per property.' },
    ],
  },
  {
    id: 'access',
    title: 'Access control',
    line: 'Screening, credential checks, and visitor control at gates, docks, and lobbies.',
    keys: ['Screening', 'Credentials', 'Escort'],
    includes: [
      { name: 'Entry screening', detail: 'People and bags checked against your post orders before they enter.' },
      { name: 'Credential verification', detail: 'IDs, badges, and access lists checked at every entry point.' },
      { name: 'Visitor management', detail: 'Sign-in, badging, and a visitor log you can audit.' },
      { name: 'Restricted-area escort', detail: 'Escort officers for restricted areas, including TS/SCI-cleared escorts at Buckley SFB.' },
    ],
  },
  {
    id: 'vehicle',
    title: 'Patrol vehicle security',
    line: 'For properties that need a visible presence and a fast response after hours.',
    keys: ['Marked vehicles', 'Alarm response', 'GPS-verified'],
    includes: [
      { name: 'Marked-vehicle patrol', detail: 'Ares-marked vehicles as a visible deterrent on every pass.' },
      { name: 'Alarm response', detail: 'An officer on site to check the property when an alarm trips.' },
      { name: 'After-hours checks', detail: 'Door, gate, and perimeter checks once a site is closed.' },
      { name: 'Verified reporting', detail: 'GPS-verified routes and time-stamped reports for every visit.' },
    ],
  },
  {
    id: 'events',
    title: 'Event & emergency response',
    line: 'For events, institutions, and venues that need trained people when a situation turns.',
    keys: ['Events', 'Crowds', 'Incident response'],
    includes: [
      { name: 'Event security', detail: 'Crowd management, entry screening, and coordinated coverage for public and private events.' },
      { name: 'Emergency response', detail: 'Rapid on-site response and incident containment.' },
      { name: 'Coordination', detail: 'Officers who work alongside your staff and first responders during an incident.' },
      { name: 'Post-incident reporting', detail: 'A written report of what happened and what was done.' },
    ],
  },
];

// Why Ares: the capability statement's three differentiators, plus restricted-area
// experience (owner, 2026-10-05). Each carries its proof.
export type Differentiator = { title: string; body: string; proof: string; href?: string };

export const DIFFERENTIATORS: Differentiator[] = [
  {
    title: 'Restricted-area experience',
    body: 'Our officers stand restricted posts at Buckley Space Force Base, including TS/SCI-cleared escort duty. We work to the badging, escort, and documentation rules high-compliance sites require, and our post orders and reports are written for contracting officers.',
    proof: 'Buckley SFB · DoW-vetted · TS/SCI escorts',
  },
  {
    title: 'Four-stage deployment',
    body: 'Every engagement runs in four stages: technical audit, compliance mapping, guard training, and deployment. Every officer is trained on the post by a member of leadership who has worked it, before the first shift.',
    proof: 'Trained on post by leadership',
  },
  {
    title: 'Rated Exceptional by clients',
    body: 'Clients rate Ares Exceptional on 16 of 18 criteria across multi-year contracts, including quality of services, overall performance, and repeat business, over 2+ years of monitored performance.',
    proof: '16 of 18 criteria · questionnaires on request',
  },
  {
    title: 'Rated 4.8 by our own officers',
    body: 'Our officers rate Ares 4.8 out of 5 on Indeed, with management and work-life balance the highest-scoring categories.',
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

export const PATHS: { name: string; status: 'Available' | 'On request' }[] = [
  { name: 'Open market · FAR 13', status: 'Available' },
  { name: 'BPAs & IDIQs', status: 'On request' },
  { name: 'State of Colorado contracts', status: 'Available' },
  { name: 'Subcontracting to primes', status: 'Available' },
];

export type Cert = { src: string; alt: string; name: string; id?: string; tall?: boolean; color?: boolean };

export const CERTS: Cert[] = [
  { src: '/images/cert-gsa-footer.png', alt: 'GSA Contract Holder', name: 'GSA Schedule holder', id: '47QSMS25D009Q', color: true },
  { src: '/images/cert-wosb.png', alt: 'SBA WOSB certified', name: 'Woman-Owned Small Business', id: 'SBA · WOSB250470', tall: true, color: true },
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
  { label: 'SAM status', value: 'Active', note: 'Through March 26, 2027' },
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
