import type { Mark } from '../home/DocRail';
import { GSA_ELIBRARY } from '../home/links';

// About content. Source: docs/about-content.md; copy changes: docs/copy-changes.md.

export const ABOUT_MARKS: readonly Mark[] = [
  { id: 'company', n: '01', label: 'Company' },
  { id: 'commitments', n: '02', label: 'Commitments' },
  { id: 'people', n: '03', label: 'People' },
  { id: 'statement', n: '04', label: 'Statement' },
];

export type Credential = { src: string; alt: string; label: string; id?: string; href?: string; tall?: boolean };

export const CREDENTIALS: Credential[] = [
  { src: '/images/cert-gsa-footer.png', alt: 'GSA Contract Holder', label: 'GSA Multiple Award Schedule', id: '47QSMS25D009Q', href: GSA_ELIBRARY },
  { src: '/images/cert-sba-footer.png', alt: 'U.S. Small Business Administration', label: 'SBA woman-owned small business', id: 'WOSB250470' },
  { src: '/images/cert-women-owned.png', alt: 'Women Owned', label: 'Minority woman-owned' },
  { src: '/images/cert-wbenc.png', alt: "Certified WBENC Women's Business Enterprise", label: 'WBENC certified', id: 'WBE2303571', tall: true },
];

export const FACTS: { label: string; value: string; mono?: boolean }[] = [
  { label: 'Established', value: 'February 2021, Colorado Springs' },
  { label: 'Ownership', value: 'Minority woman-owned' },
  { label: 'Licensed', value: 'Armed security and training provider in Denver, Colorado Springs, and Pueblo' },
  { label: 'Primary NAICS', value: '561612', mono: true },
];

export type Commitment = { name: string; line: string };

export const FOR_CLIENTS: Commitment[] = [
  { name: 'Presence', line: 'Leadership stands up each new post and trains officers on site.' },
  { name: 'Consistency', line: 'Retained, familiar teams who know your site.' },
  { name: 'Reachability', line: 'Supervisors stay reachable long after the start date.' },
  { name: 'Accountability', line: 'When something goes wrong, we own it and resolve it fast.' },
];

export const FOR_PEOPLE: Commitment[] = [
  { name: 'Fair pay', line: 'What the post demands, on time and in full, with overtime honored.' },
  { name: 'Trained first', line: 'Trained on the specific site before the first shift.' },
  { name: 'Livable schedules', line: 'Posted far enough ahead to plan a life around. No endless doubles.' },
  { name: 'Real support', line: 'A chain of command on every shift. When you call, someone answers.' },
];

export const TRAITS: Commitment[] = [
  { name: 'Diverse', line: 'Backgrounds and perspectives that reflect the communities we protect.' },
  { name: 'Experienced', line: 'Seasoned officers who have stood the hard posts before.' },
  { name: 'Composed', line: 'Calm and clear when a situation turns.' },
  { name: 'Cleared', line: 'Background-checked and licensed before they reach your post.' },
  { name: 'Courteous', line: 'Approachable people who treat clients and the public with respect.' },
];

export const PDF_URL = '/files/Ares-Security-Capability-Statement-2026.pdf';
