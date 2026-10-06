import type { Mark } from '../home/DocRail';

// Careers content. Source: docs/careers-content.md; wording changes are logged in
// docs/copy-changes.md.

export const CAREER_MARKS: readonly Mark[] = [
  { id: 'roles', n: '01', label: 'Roles' },
  { id: 'why', n: '02', label: 'Why people stay' },
  { id: 'apply', n: '03', label: 'Apply' },
];

export const CAREERS_EMAIL = 'careers@aressecurity.co';
export const INDEED_REVIEWS = 'https://www.indeed.com/cmp/Ares-Security-1/reviews';

export const applyHref = (role?: string) =>
  `mailto:${CAREERS_EMAIL}${role ? `?subject=${encodeURIComponent(`Application: ${role}`)}` : ''}`;

export type Role = { title: string; line: string; where: string };

export const ROLES: Role[] = [
  {
    title: 'Armed Security Officer',
    line: 'Licensed armed posts at commercial and public-sector sites. Range training provided for licensing.',
    where: 'Colorado Springs · Denver · Pueblo',
  },
  {
    title: 'Unarmed Security Officer',
    line: 'Posted and patrol coverage for retail, industrial, and institutional sites. A customer-facing role.',
    where: 'Colorado Springs · Denver · Pueblo',
  },
  {
    title: 'TS Cleared Security Escort',
    line: 'Restricted-access escort coverage for federal facilities. Requires an active TS clearance.',
    where: 'Denver',
  },
];

export const REASONS: { name: string; line: string }[] = [
  { name: 'A real voice on site', line: 'Officers brief leadership directly, and a concern about a post is heard the same day.' },
  { name: 'Schedules you can plan around', line: 'Shifts are posted far enough ahead to plan a life around, with no endless doubles.' },
  { name: 'Veterans welcome', line: 'Our supervisors include veterans, and our NRA firearms instructor is a veteran. Veterans are encouraged to apply.' },
  { name: 'Paid training and renewals', line: 'State certifications and firearms qualifications are kept current on company time, with no out-of-pocket renewals.' },
];
