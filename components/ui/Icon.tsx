/**
 * FRAD icon system: a single hand-curated set so every icon on the platform
 * shares one 24px grid, one 1.5 stroke weight, and round joins. Icons render
 * in currentColor and are decorative by default (aria-hidden), with labels
 * carried by adjacent text.
 */

const ICONS = {
  /* Programme sectors */
  'heart-pulse': (
    <>
      <path d="M12 20C6.4 15.7 3.2 12.2 3.2 8.9 3.2 6.2 5.2 4 7.8 4c1.7 0 3.2 1 4.2 2.5C13 5 14.5 4 16.2 4c2.6 0 4.6 2.2 4.6 4.9 0 3.3-3.2 6.8-8.8 11.1z" />
      <path d="M7.2 12h2.3l1.3-2.4 2.4 4.8 1.3-2.4h2.3" />
    </>
  ),
  droplet: <path d="M12 3.5c3.5 4.4 6 7.7 6 10.6a6 6 0 1 1-12 0c0-2.9 2.5-6.2 6-10.6z" />,
  shield: <path d="M12 3l7 2.8v5.5c0 4.3-2.9 8.1-7 9.7-4.1-1.6-7-5.4-7-9.7V5.8L12 3z" />,
  'book-open': (
    <>
      <path d="M12 6.4C10 5 7 4.6 3 5.2v13.2c4-.6 7-.2 9 1.2 2-1.4 5-1.8 9-1.2V5.2c-4-.6-7-.2-9 1.2z" />
      <path d="M12 6.4v13.2" />
    </>
  ),
  sprout: (
    <>
      <path d="M12 21v-9" />
      <path d="M12 12C12 8.7 9.3 6 6 6c0 3.3 2.7 6 6 6z" />
      <path d="M12 12c0-3.3 2.7-6 6-6 0 3.3-2.7 6-6 6z" />
    </>
  ),
  rings: (
    <>
      <circle cx="9" cy="12" r="5.25" />
      <circle cx="15" cy="12" r="5.25" />
    </>
  ),
  zap: <path d="M13 2L3.8 13.8h6.4L9.2 22l9-11.8h-6.4L13 2z" />,
  cpu: (
    <>
      <rect x="7" y="7" width="10" height="10" rx="1.5" />
      <rect x="10.75" y="10.75" width="2.5" height="2.5" rx="0.5" />
      <path d="M9.5 3.5V7M14.5 3.5V7M9.5 17v3.5M14.5 17v3.5M3.5 9.5H7M3.5 14.5H7M17 9.5h3.5M17 14.5h3.5" />
    </>
  ),

  /* Identity and institutional */
  flag: (
    <>
      <path d="M5.5 21V3.5" />
      <path d="M5.5 4.5c2.9-1.4 5.8-1.4 8.6 0 1.5.7 3 .7 4.4 0v9.2c-1.4.7-2.9.7-4.4 0-2.8-1.4-5.7-1.4-8.6 0" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8" r="3.25" />
      <path d="M3.5 20c0-3 2.5-5.5 5.5-5.5s5.5 2.5 5.5 5.5" />
      <path d="M15.5 5.3a3 3 0 0 1 0 5.4M17.5 14.9c1.8.9 3 2.8 3 5.1" />
    </>
  ),
  link: (
    <>
      <path d="M10.2 13.8a3.6 3.6 0 0 0 5.1 0l3.6-3.6a3.6 3.6 0 0 0-5.1-5.1L12.4 6.5" />
      <path d="M13.8 10.2a3.6 3.6 0 0 0-5.1 0l-3.6 3.6a3.6 3.6 0 0 0 5.1 5.1l1.4-1.4" />
    </>
  ),

  /* Meta and interface */
  'map-pin': (
    <>
      <path d="M12 21.25S5 16.2 5 10.25a7 7 0 1 1 14 0c0 5.95-7 11-7 11z" />
      <circle cx="12" cy="10.25" r="2.5" />
    </>
  ),
  calendar: (
    <>
      <rect x="4" y="5" width="16" height="15.5" rx="2" />
      <path d="M4 10h16M8.5 3v4M15.5 3v4" />
    </>
  ),
  briefcase: (
    <>
      <rect x="3.5" y="7" width="17" height="13" rx="2" />
      <path d="M8.5 7V5.5a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2V7" />
    </>
  ),
  building: (
    <>
      <rect x="5.5" y="3.5" width="13" height="17.5" rx="1" />
      <path d="M9.5 7.5h1.5M13 7.5h1.5M9.5 11h1.5M13 11h1.5M9.5 14.5h1.5M13 14.5h1.5M10.5 21v-3h3v3" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
  download: <path d="M12 3.5v11.5M7 10.5l5 5 5-5M4.5 20.5h15" />,
  'file-text': (
    <>
      <path d="M13.5 3.5H7a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V9l-5.5-5.5z" />
      <path d="M13.5 3.5V9H19M9 13.5h6M9 17h6" />
    </>
  ),
  'chevron-right': <path d="M9.5 6l6 6-6 6" />,
  'chevron-down': <path d="M6 9.5l6 6 6-6" />,
  'alert-triangle': (
    <>
      <path d="M12 4L2.9 19.5h18.2L12 4z" />
      <path d="M12 10v4.25M12 17.25h.01" />
    </>
  ),
} as const;

export type IconName = keyof typeof ICONS;

export default function Icon({
  name,
  className = 'h-5 w-5',
  strokeWidth = 1.5,
}: {
  name: IconName;
  className?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {ICONS[name]}
    </svg>
  );
}
