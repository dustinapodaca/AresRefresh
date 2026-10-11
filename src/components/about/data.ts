import type { Mark } from '../home/DocRail';
import { GSA_ELIBRARY } from '../home/links';

// About content. Source: docs/about-content.md; copy changes: docs/copy-changes.md.

export const ABOUT_MARKS: readonly Mark[] = [
  { id: 'staffing', n: '01', label: 'How we work' },
  { id: 'commitments', n: '02', label: 'Commitments' },
  { id: 'people', n: '03', label: 'People' },
];

export type Credential = { src: string; alt: string; label: string; id?: string; href?: string; tall?: boolean };

export const CREDENTIALS: Credential[] = [
  { src: '/images/cert-gsa-footer.png', alt: 'GSA Contract Holder', label: 'GSA Multiple Award Schedule', id: '47QSMS25D009Q', href: GSA_ELIBRARY },
  { src: '/images/cert-sba-footer.png', alt: 'U.S. Small Business Administration', label: 'SBA woman-owned small business', id: 'WOSB250470' },
  { src: '/images/cert-women-owned.png', alt: 'Women Owned', label: 'Minority woman-owned' },
  { src: '/images/cert-wbenc.png', alt: "Certified WBENC Women's Business Enterprise", label: 'WBENC certified', id: 'WBE2303571', tall: true },
];

// How we work (moved from Home, owner 2026-10-06; renamed from "How we staff a post" and
// trimmed to plain sentences, copy audit 2026-10-10). The process itself lives on Services.
export const STAFFING_STEPS: { title: string; body: string }[] = [
  {
    title: 'Plan before we sign.',
    body: 'We walk your site and learn its risks before any contract is signed.',
  },
  {
    title: 'Write it down.',
    body: 'Post orders, proposals, and reports are written for your site.',
  },
  {
    title: 'Keep you informed.',
    body: 'You get direct access to the people managing your account, and reports on a set schedule.',
  },
  {
    title: 'Train on the post.',
    body: 'Every officer learns your post from a leader who has worked it.',
  },
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
  { name: 'Real support', line: 'A chain of command on every shift. When you call, someone answers.' },
];

// Five traits (owner, 2026-10-05; were Diverse, Experienced, Composed, Cleared, Courteous).
// Their initials read ALERT until the copy audit's plainer words (owner, 2026-10-10):
// Rooted became Local, Tempered became Steady.
export const TRAITS: Commitment[] = [
  { name: 'Approachable', line: 'People who treat clients and the public with respect.' },
  // Colorado has no statewide license; cities license security (was "state-licensed").
  { name: 'Licensed', line: 'Background-checked and licensed before they reach your post.' },
  { name: 'Experienced', line: 'Seasoned officers who have stood the hard posts before.' },
  { name: 'Local', line: 'People who live in the communities they protect.' },
  { name: 'Steady', line: 'Calm and clear when a situation turns.' },
];

