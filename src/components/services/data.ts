import type { Mark } from '../home/DocRail';

// Services content. Source: docs/services-content.md; copy changes: docs/copy-changes.md.

export const SERVICE_MARKS: readonly Mark[] = [
  // The services first (owner, 2026-10-18): the Capability Statement's cards replace "By role.".
  { id: 'capabilities', n: '01', label: 'Services' },
  { id: 'divisions', n: '02', label: 'Industries' },
  { id: 'process', n: '03', label: 'Process' },
  // "A security program, not a headcount." folded into the stages and split in two (owner,
  // 2026-10-15; the old section is tagged services-program-option).
  { id: 'relief', n: '04', label: 'Relief schedule' },
  // "Trained on your systems." folded into stage 03 (owner, 2026-10-16).
  { id: 'areas', n: '05', label: 'Areas' },
];

// `sharp`: a tighter, higher-resolution crop of the same photo, shown only in the tall
// panel of an opened card on desktop; the closed card keeps the wider framing.
type Photo = { src: string; width: number; height: number; position?: string };

export type Division = {
  id: string;
  n: string;
  title: string;
  body: string;
  // Each site type with one plain line. DRAFT copy (2026-10-05), built only from facts
  // already on the site; owner to review (docs/copy-changes.md).
  covers: { name: string; detail: string }[];
  photo: { src: string; width: number; height: number; position?: string; sharp?: Photo };
  /** The industry's full page (owner, 2026-10-10). */
  page?: { to: string; label: string };
};

// The six industries, one set (owner, 2026-10-10: the divisions and the industries were the
// same list shown twice). The owner's fixed order (2026-10-10): Government, Critical,
// Construction, Airport, Commercial, Institutional, everywhere the six appear. Each
// opens to its sites and links to the industry's own page.
export const DIVISIONS: Division[] = [
  {
    id: 'government',
    n: '01',
    // Government & Defense (owner, 2026-10-16; was Government & Military). "Without opening a new
    // competition" came out with it (the CenCore finish review called it overstated).
    title: 'Government & Defense',
    // Owner, 2026-10-25: agencies, bases, and defense contractors, and also any company with work on a base.
    body: 'Federal agencies, military bases, and defense contractors, through GSA, and security escorts for any crew working on base, plus access control and armed posts.',
    covers: [
      { name: 'Military bases', detail: 'Officers trained on the post by a member of our leadership who has worked it.' },
      { name: 'Defense contractors', detail: 'Access control, visitor screening, and escorts at contractor sites, and teaming with primes.' },
      { name: 'Contractors on base', detail: 'Escorts and posts for construction, utility, and other crews working on a base.' },
      { name: 'Federal buildings', detail: 'Agencies can order through our GSA Schedule.' },
      { name: 'Restricted areas', detail: 'Experienced in access control, escort, and vehicle inspection on military installations, alongside base security forces.' },
    ],
    photo: {
      src: '/images/matrix-government.jpg', width: 640, height: 427, position: '50% 40%',
      sharp: { src: '/images/matrix-government.webp', width: 862, height: 862 },
    },
    page: { to: '/industries/government-defense', label: 'government and defense' },
  },
  {
    id: 'critical',
    n: '02',
    title: 'Critical & High-Liability Sites',
    body: 'Officers for data centers, utilities, hospitals, cash-handling, and other regulated or high-liability sites, where every entry is documented, unarmed or armed as each post requires. Armed officers are licensed and firearms-qualified by Ares.',
    covers: [
      { name: 'Data centers', detail: 'Access control and checkpoint logs for controlled areas, from construction through operations.' },
      { name: 'Critical infrastructure', detail: 'Posted guards and auditable checkpoint logs where access must be documented.' },
      { name: 'Cash-handling and regulated sites', detail: 'Armed officers where the post requires them, qualified by our veteran NRA firearms instructor.' },
      // Hospitals moved here from Institutional & Community (owner, 2026-10-16).
      { name: 'Hospitals', detail: 'Main and emergency entrances, visitor screening, and grounds, with every entry logged.' },
    ],
    photo: { src: '/images/matrix-specialized.jpg', width: 640, height: 384 },
    page: { to: '/industries/critical-infrastructure', label: 'critical and high-liability site' },
  },
  {
    id: 'industrial',
    n: '03',
    title: 'Construction, Industrial & Logistics',
    // Two sentences and three or four site types per card (copy audit card summaries, 2026-10-10).
    body: 'Gate control, perimeter rounds, and after-hours patrol for builds, yards, and warehouses, with checkpoint logs you can audit. Coverage changes as a build moves from phase to phase, including escorts on military construction.',
    covers: [
      { name: 'Industrial sites', detail: 'Posted guards around the clock, with checkpoint logs you can audit.' },
      { name: 'Warehouses', detail: 'Mobile patrols and perimeter security for buildings and yards.' },
      { name: 'Construction', detail: 'Perimeter security and mobile patrols while the site is being built.' },
      { name: 'Military construction', detail: 'Escort and gate control for crews and deliveries on a restricted build.' },
    ],
    photo: { src: '/images/matrix-industrial.jpg', width: 640, height: 360 },
    page: { to: '/industries/construction-industrial', label: 'construction, industrial, and logistics' },
  },
  {
    id: 'airport',
    n: '04',
    title: 'Airport & Transportation',
    // Ready to staff, as the industry page says (copy audit, 2026-10-10: "around the clock"
    // and "staffed on every shift" read as current posts).
    body: 'Officers we are ready to staff for perimeters, public areas, baggage, and cargo operations, uniformed or plainclothes. The same documented access control we run in restricted areas applies to cargo and other controlled zones.',
    covers: [
      { name: 'Airports', detail: 'Perimeter, passenger-area, baggage, and cargo coverage, on the shifts the site needs.' },
      { name: 'Transportation hubs', detail: 'Uniformed or plainclothes officers, depending on what the site needs.' },
      { name: 'Aviation facilities', detail: 'Perimeter protection and cargo-area coverage.' },
    ],
    photo: { src: '/images/matrix-airport-denver.jpg', width: 1600, height: 1143, position: '50% 45%' },
    page: { to: '/industries/airport-transportation', label: 'airport and transportation' },
  },
  {
    id: 'commercial',
    n: '05',
    title: 'Commercial & Retail',
    body: 'Visible deterrence and loss prevention for stores, grocery, shopping centers, banks, hotels, and offices, scaled to foot traffic. Patrol can cover a whole portfolio, with one report per property.',
    covers: [
      { name: 'Retail, grocery, and shopping centers', detail: 'Visible deterrence and loss prevention on the sales floor.' },
      { name: 'Banks', detail: 'Officers for cash-handling and high-liability settings.' },
      { name: 'Hotels', detail: 'A presence that protects guests without getting in the way of their stay.' },
      { name: 'Corporate and tech offices', detail: 'Lobby officers, and patrol across several properties with a report for each.' },
    ],
    photo: { src: '/images/matrix-commercial.jpg', width: 1000, height: 667 },
    page: { to: '/industries/commercial-property', label: 'commercial and retail' },
  },
  {
    id: 'community',
    n: '06',
    title: 'Institutional & Community',
    // Apartments, schools, campuses, and local community sites; hospitals moved to Critical &
    // High-Liability Sites (owner, 2026-10-16). Health centers and clinics added (owner, 2026-10-26).
    body: 'A calm, trained presence for apartment communities, HOAs, schools, campuses, community health centers, places of worship, and community centers. Consistent officers people get to know, trained on each building\u2019s entry points and daily rhythm.',
    covers: [
      { name: 'Apartments and HOAs', detail: 'Consistent officers residents can get to know, and after-hours patrol of the grounds.' },
      { name: 'Schools and campuses', detail: 'Officers trained on the campus, its entry points, and its daily rhythm.' },
      { name: 'Places of worship', detail: 'A calm, respectful presence during services and events.' },
      { name: 'Health centers and clinics', detail: 'A calm presence at the entrance and waiting room, and staff walked to their cars at closing.' },
    ],
    photo: { src: '/images/matrix-community.jpg', width: 640, height: 427, position: '50% 30%' },
    page: { to: '/industries/institutional-community', label: 'institutional and community' },
  },
];

export type Stage = { n: string; title: string; covers: string; body: string; systems?: boolean };

export const STAGES: Stage[] = [
  {
    n: '01',
    title: 'Technical audit',
    covers: 'Scope · Risk · Site walk',
    body: 'We walk the site and map risks with your team before any contract is signed. That finds vulnerabilities early and gives you a plan that fits how your site actually runs, without costly gaps or changes down the road.',
  },
  {
    n: '02',
    title: 'Compliance mapping',
    covers: 'Regulations · Access rules · Post orders',
    // The program section's "Post orders and SOPs" folded in (owner, 2026-10-15).
    body: 'We check every regulation, access requirement, and SOP against your facility, whether it is federal, state, or commercial, and write the post orders and procedures for every post with you. That reduces compliance risk and gives you audit confidence from the moment we go live.',
  },
  {
    n: '03',
    title: 'Guard training',
    covers: 'On the post · Firearms · Drills',
    // Shortened to what is new here (copy audit, 2026-10-10); the training line is told elsewhere.
    // The post orders and training on the post came in from the program section (2026-10-15).
    // "Trained on your systems." folded in, its systems as tags under the body (owner, 2026-10-16).
    body: 'Officers learn your post orders, your entry points, the daily rhythm of the site, and the systems already there, trained on the post before their first shift.',
    systems: true,
  },
  {
    n: '04',
    title: 'Deployment',
    covers: 'Go-live · Supervision · Logs',
    // The program section's "Supervision" and "Records you can audit" folded in (owner, 2026-10-15).
    body: 'We deploy at full staffing with on-call relief behind every post, and a member of leadership works the first shift on every new post. Checkpoint, visitor, and incident logs are time-stamped and kept to your post orders, so the work can be checked after the fact. Quality checks and daily reporting start with the first shift.',
  },
];
