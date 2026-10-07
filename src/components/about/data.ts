import type { Mark } from '../home/DocRail';
import { GSA_ELIBRARY } from '../home/links';

// About content. Source: docs/about-content.md; copy changes: docs/copy-changes.md.

export const ABOUT_MARKS: readonly Mark[] = [
  { id: 'company', n: '01', label: 'Company' },
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

export const FACTS: { label: string; value: string; mono?: boolean }[] = [
  { label: 'Established', value: 'February 2021, Colorado Springs' },
  { label: 'Ownership', value: 'Minority woman-owned' },
  { label: 'Licensed', value: 'Licensed and bonded armed and unarmed security and training provider in Denver, Colorado Springs, and Pueblo' },
  { label: 'Primary NAICS', value: '561612', mono: true },
];

// How we staff a post (moved from Home, owner 2026-10-06).
export const STAFFING_STEPS: { title: string; body: string }[] = [
  {
    title: 'Plan the site before anything is signed.',
    body: 'We take the time to fully understand your site, operations, and risks before anything is signed. This upfront work prevents surprises and delivers a solution that actually fits the way your facility runs.',
  },
  {
    title: 'Write it down precisely.',
    body: 'Our proposals, post orders, and documentation are consistently praised for their clarity and detail. We treat every deliverable with the same care our clients expect from top-tier technical submittals.',
  },
  {
    title: 'Keep you informed.',
    body: 'You’ll always know what’s happening. We provide timely updates, direct access to the team managing your account, and professional reporting that keeps everyone aligned.',
  },
  {
    title: 'Train every officer on the post itself.',
    body: 'Every guard receives hands-on, site-specific training from a member of our leadership team who has personally worked that exact post. Your protection is prepared from the very first shift.',
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
  { name: 'Livable schedules', line: 'Posted far enough ahead to plan a life around. No endless doubles.' },
  { name: 'Real support', line: 'A chain of command on every shift. When you call, someone answers.' },
];

// Five traits whose initials read ALERT, in that order (owner, 2026-10-05; were Diverse,
// Experienced, Composed, Cleared, Courteous; lines kept, two words trimmed).
export const TRAITS: Commitment[] = [
  { name: 'Approachable', line: 'People who treat clients and the public with respect.' },
  { name: 'Licensed', line: 'Background-checked and state-licensed before they reach your post.' },
  { name: 'Experienced', line: 'Seasoned officers who have stood the hard posts before.' },
  { name: 'Rooted', line: 'Backgrounds and perspectives that reflect the communities we protect.' },
  { name: 'Tempered', line: 'Calm and clear when a situation turns.' },
];

