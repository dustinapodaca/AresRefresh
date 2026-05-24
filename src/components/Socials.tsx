type Variant = 'light' | 'dark';

const ICONS = {
  facebook: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5 3.66 9.14 8.44 9.94v-7H7.9V12.06h2.54v-2.2c0-2.51 1.5-3.9 3.78-3.9 1.1 0 2.25.2 2.25.2v2.46h-1.27c-1.24 0-1.63.78-1.63 1.58v1.9h2.78l-.44 2.94h-2.34v7c4.78-.8 8.44-4.94 8.44-9.94Z" />
    </svg>
  ),
  instagram: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2.5" y="2.5" width="19" height="19" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.4" cy="6.6" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  ),
  google: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M21.6 12.23c0-.74-.06-1.46-.18-2.15H12v4.07h5.39a4.6 4.6 0 0 1-2 3.02v2.5h3.23c1.89-1.74 2.98-4.3 2.98-7.44Z" />
      <path d="M12 22c2.7 0 4.96-.9 6.62-2.43l-3.23-2.5c-.9.6-2.05.95-3.39.95-2.6 0-4.81-1.76-5.6-4.12H3.06v2.58A10 10 0 0 0 12 22Z" />
      <path d="M6.4 13.9a6 6 0 0 1 0-3.8V7.52H3.06a10 10 0 0 0 0 8.96l3.34-2.58Z" />
      <path d="M12 6c1.47 0 2.78.5 3.82 1.5l2.86-2.87C16.95 3.05 14.7 2.13 12 2.13a10 10 0 0 0-8.94 5.4L6.4 10.1C7.19 7.74 9.4 6 12 6Z" />
    </svg>
  ),
  linkedin: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.95v5.66H9.36V9h3.41v1.56h.05c.47-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0Z" />
    </svg>
  ),
};

const ITEMS: { key: keyof typeof ICONS; label: string; href: string }[] = [
  { key: 'facebook', label: 'Facebook', href: '#' },
  { key: 'instagram', label: 'Instagram', href: '#' },
  { key: 'google', label: 'Google', href: '#' },
  { key: 'linkedin', label: 'LinkedIn', href: '#' },
];

export default function Socials({ variant = 'light', className = '' }: { variant?: Variant; className?: string }) {
  const linkColor =
    variant === 'dark'
      ? 'text-paper/55 hover:text-paper'
      : 'text-light hover:text-ink';
  return (
    <ul className={`m-0 flex list-none items-center gap-[18px] p-0 ${className}`} aria-label="Social media">
      {ITEMS.map((s) => (
        <li key={s.key}>
          <a
            href={s.href}
            aria-label={s.label}
            className={`flex h-9 w-9 items-center justify-center transition-[color,transform] duration-200 hover:-translate-y-px ${linkColor}`}
          >
            {ICONS[s.key]}
          </a>
        </li>
      ))}
    </ul>
  );
}
