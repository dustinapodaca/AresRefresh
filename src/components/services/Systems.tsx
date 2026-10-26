// The systems officers learn before their first shift, as tags in stage 03 Guard training (owner,
// 2026-10-16; they were the section "Trained on your systems.", tagged services-systems-option).
// Each system with a small authored icon (owner, 2026-10-09): 16px, 1.5px strokes with round
// caps, like the site's arrows. Decorative; the words carry the meaning.
// `short` is the name on phones and tablets, where the tags sit in the stages' swipe row and the
// full names stacked one per line (owner, 2026-10-16).
export const SYSTEMS: { name: string; short: string; icon: JSX.Element }[] = [
  {
    name: 'Card readers and access panels',
    short: 'Card readers',
    icon: (
      <>
        <rect x="4.5" y="1.75" width="7" height="12.5" rx="1.5" />
        <circle cx="8" cy="5.5" r="1.25" />
        <path d="M6.5 10h3M6.5 12h3" />
      </>
    ),
  },
  {
    name: 'CCTV monitors',
    short: 'CCTV',
    icon: (
      <>
        <path d="M2 4.6 11.2 2.4l1.1 4.3-9.2 2.2Z" />
        <path d="M12.6 4.2 14.5 3.8M5.5 8.4l.6 2.6H2.5M2.5 9.5v3" />
      </>
    ),
  },
  {
    name: 'Visitor management software',
    short: 'Visitor software',
    icon: (
      <>
        <rect x="1.75" y="2.75" width="12.5" height="10.5" rx="1.5" />
        <circle cx="6" cy="7" r="1.5" />
        <path d="M3.75 11c.4-1.2 1.2-1.8 2.25-1.8s1.85.6 2.25 1.8M10 6.5h2.25M10 9h2.25" />
      </>
    ),
  },
  {
    name: 'Intercoms and radios',
    short: 'Radios',
    icon: (
      <>
        <rect x="4.75" y="4.5" width="6.5" height="10" rx="1.5" />
        <path d="M6.5 4.5V1.5M7 7.5h2M7 9.5h2M7 11.5h2" />
      </>
    ),
  },
  {
    name: 'Gate and dock controls',
    short: 'Gates and docks',
    icon: (
      <>
        <path d="M3 14.25V4M1.5 14.25h3" />
        <rect x="3" y="5.25" width="11.25" height="2.75" rx="0.5" />
        <path d="M6.75 5.25 5.5 8M9.75 5.25 8.5 8M12.75 5.25 11.5 8" />
      </>
    ),
  },
  {
    name: 'Alarm panels',
    short: 'Alarms',
    icon: (
      <>
        <path d="M8 2.25A3.5 3.5 0 0 0 4.5 5.75v3L3 11.25h10l-1.5-2.5v-3A3.5 3.5 0 0 0 8 2.25Z" />
        <path d="M6.75 13.25a1.25 1.25 0 0 0 2.5 0" />
      </>
    ),
  },
];

// One system's icon, for the Services page's four stages (owner, 2026-10-25).
export function SystemIcon({ name, size = 16 }: { name: string; size?: number }) {
  const icon = SYSTEMS.find((s) => s.name === name)?.icon;
  if (!icon) return null;
  return (
    <svg className="ds-sys-icon" width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {icon}
    </svg>
  );
}

export default function SystemTags() {
  return (
    <ul className="ds-svc-sys" aria-label="Systems officers learn, such as">
      {SYSTEMS.map((s) => (
        <li key={s.name}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            {s.icon}
          </svg>
          <span className="ds-svc-sys-long">{s.name}</span>
          <span className="ds-svc-sys-short">{s.short}</span>
        </li>
      ))}
    </ul>
  );
}
