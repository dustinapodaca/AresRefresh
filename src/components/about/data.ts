import type { Mark } from '../home/DocRail';
import { GSA_ELIBRARY } from '../home/links';

// About content. Source: docs/about-content.md; copy changes: docs/copy-changes.md.

// 01 replaced "How we work" (the process lives on Services); 02 merged the officer commitments
// and the traits into one section (owner, 2026-10-18).
export const ABOUT_MARKS: readonly Mark[] = [
  { id: 'founder', n: '01', label: 'Why Ares exists' },
  { id: 'heard', n: '02', label: 'What clients told us' },
  { id: 'people', n: '03', label: 'Who stands your post' },
];

export type Credential = { src: string; alt: string; label: string; id?: string; href?: string; tall?: boolean };

export const CREDENTIALS: Credential[] = [
  { src: '/images/cert-gsa-footer.png', alt: 'GSA Contract Holder', label: 'GSA Multiple Award Schedule', id: '47QSMS25D009Q', href: GSA_ELIBRARY },
  { src: '/images/cert-sba-footer.png', alt: 'U.S. Small Business Administration', label: 'SBA woman-owned small business', id: 'WOSB250470' },
  { src: '/images/cert-women-owned.png', alt: 'Women Owned', label: 'Minority woman-owned' },
  { src: '/images/cert-wbenc.png', alt: "Certified WBENC Women's Business Enterprise", label: 'WBENC certified', id: 'WBE2303571', tall: true },
];

// 02 What clients told us (owner, 2026-10-18): what clients said about their last guard
// company, paraphrased (not testimonials: no quotation marks, no names), and what Ares does
// instead. Heard.tsx.
export type HeardItem = { heard: string; answer: string };

export const HEARD: HeardItem[] = [
  {
    heard: 'The guard didn’t show, and no one called.',
    answer: 'Every contract has on-call coverage behind it. Our officers call the site with anything, down to an ETA, because not knowing is worse than bad news.',
  },
  {
    heard: 'We only heard from them when the invoice came.',
    answer: 'We email you when staffing changes or something happens on a shift, and the line runs both ways.',
  },
  {
    heard: 'It was a new face every week.',
    answer: 'We keep the same officers on your site whenever we can. When someone new steps in, they get your SOPs and train on site before their first shift.',
  },
  {
    heard: 'When something went wrong, nobody picked up.',
    answer: 'A member of our leadership answers, owns it, and tells you what we’re changing.',
  },
];

export type Commitment = { name: string; line: string };

// 03 Who stands your post (owner, 2026-10-18): the standards every officer meets, each one a
// buyer can check. Replaced FOR_PEOPLE (the commitments to officers, now the section's closing
// line) and TRAITS (five adjectives: Approachable, Licensed, Experienced, Local, Steady).
export const STANDARDS: Commitment[] = [
  { name: 'Screened', line: 'Background-checked before hire.' },
  { name: 'Licensed', line: 'Licensed by the city they work in: Colorado Springs, Denver, or Pueblo.' },
  { name: 'Trained', line: 'On your site, by a member of our leadership, before the first shift.' },
  { name: 'Qualified', line: 'On armed posts, firearms-qualified by our veteran NRA firearms instructor.' },
  { name: 'Supervised', line: 'A chain of command on every shift.' },
];
