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

export type Capability = { title: string; body: string; keys: string[] };

export const CAPABILITIES: Capability[] = [
  {
    title: 'Armed physical security',
    body: 'Licensed, firearms-qualified officers for fixed posts in cash-handling, regulated, and high-liability environments, for insurable risk reduction.',
    keys: ['Armed', 'Cash-handling', 'Regulated'],
  },
  {
    title: 'Unarmed physical security',
    body: 'Uniformed and plainclothes officers providing visible deterrence, lobby coverage, and access oversight for facilities and campuses, 24/7.',
    keys: ['Uniformed', 'Lobby / campus', '24/7'],
  },
  {
    title: 'Patrol services',
    body: 'Foot and mobile patrol with documented checkpoints and auditable logs across single sites and multi-property portfolios.',
    keys: ['Foot patrol', 'Mobile patrol', 'Checkpoint logs'],
  },
  {
    title: 'Access control',
    body: 'Entry screening, credential verification, visitor management, and perimeter control for facilities, sites, and critical infrastructure.',
    keys: ['Screening', 'Credentialing', 'Perimeter'],
  },
  {
    title: 'Patrol vehicle security',
    body: 'Marked-vehicle patrol, alarm response, and after-hours property checks with GPS-verified routes and time-stamped reporting.',
    keys: ['Marked vehicle', 'Alarm response', 'GPS-verified'],
  },
  {
    title: 'Event & emergency response',
    body: 'Crowd management, incident response, and emergency coordination for events, institutions, and community venues, with a calm, trained presence.',
    keys: ['Crowd management', 'Incident response', 'Events'],
  },
];

export type Differentiator = { area: string; title: string; body: string };

export const DIFFERENTIATORS: Differentiator[] = [
  {
    area: 'Methodology',
    title: 'Four-stage deployment process',
    body: 'Technical audit, compliance mapping, guard training, deployment. Repeatable, documented, and audit-ready on day one. Every officer is trained on-post by leadership before their first shift.',
  },
  {
    area: 'Team',
    title: 'Cleared, licensed, and supervised on post',
    body: 'DoW-vetted personnel, including TS/SCI-cleared escort officers at Buckley SFB. State licensing and firearms qualifications current at time of post, with no liability gaps. Our supervisors include veterans.',
  },
  {
    area: 'Documentation',
    title: 'Technical submittals to federal standard',
    body: 'Proposals, post orders, briefings, and reporting built for contracting officers, not boilerplate. WOSB and WBE certified, GSA Schedule holder, SAM-registered through March 2027. Audit-ready records on request.',
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
];
