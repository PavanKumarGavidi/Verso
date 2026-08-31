type P = { size?: number; className?: string; strokeWidth?: number };

const base = ({ size = 20, className = "", strokeWidth = 1.5 }: P) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  className,
  "aria-hidden": true as const,
});

export const IconBag = (p: P) => (
  <svg {...base(p)}>
    <path d="M5.5 8h13l-1.1 12.2a1 1 0 0 1-1 .8H7.6a1 1 0 0 1-1-.8L5.5 8Z" />
    <path d="M9 10V6.5a3 3 0 0 1 6 0V10" />
  </svg>
);

export const IconHanger = (p: P) => (
  <svg {...base(p)}>
    <path d="M12 3.5a2.2 2.2 0 1 1 2.2 2.2c-1.1.4-2.2 1-2.2 2.3v1" />
    <path d="M12 9 3.8 14.9a1.4 1.4 0 0 0 .8 2.6h14.8a1.4 1.4 0 0 0 .8-2.6L12 9Z" />
  </svg>
);

export const IconSearch = (p: P) => (
  <svg {...base(p)}>
    <circle cx="10.5" cy="10.5" r="6.2" />
    <path d="m15.3 15.3 5.2 5.2" />
  </svg>
);

export const IconHeart = ({ filled, ...p }: P & { filled?: boolean }) => (
  <svg {...base(p)} fill={filled ? "currentColor" : "none"}>
    <path d="M12 20.2S4 15.1 4 9.6C4 6.9 6 5 8.4 5c1.5 0 2.9.8 3.6 2 .7-1.2 2.1-2 3.6-2C18 5 20 6.9 20 9.6c0 5.5-8 10.6-8 10.6Z" />
  </svg>
);

export const IconArrowR = (p: P) => (
  <svg {...base(p)}>
    <path d="M4 12h16" />
    <path d="m14 6 6 6-6 6" />
  </svg>
);

export const IconArrowUR = (p: P) => (
  <svg {...base(p)}>
    <path d="M6.5 17.5 17.5 6.5" />
    <path d="M8.5 6.5h9v9" />
  </svg>
);

export const IconClose = (p: P) => (
  <svg {...base(p)}>
    <path d="m5.5 5.5 13 13" />
    <path d="m18.5 5.5-13 13" />
  </svg>
);

export const IconPlus = (p: P) => (
  <svg {...base(p)}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);

export const IconMinus = (p: P) => (
  <svg {...base(p)}>
    <path d="M5 12h14" />
  </svg>
);

export const IconKey = (p: P) => (
  <svg {...base(p)}>
    <circle cx="8" cy="15.5" r="4.2" />
    <path d="m11.2 12.3 8.3-8.3" />
    <path d="M16.5 7.5 19 10M14 10l1.8 1.8" />
  </svg>
);

export const IconCheck = (p: P) => (
  <svg {...base(p)}>
    <path d="m4.5 12.5 5 5L19.5 6.5" />
  </svg>
);

export const IconStar = ({ filled = true, ...p }: P & { filled?: boolean }) => (
  <svg {...base({ strokeWidth: 1.2, ...p })} fill={filled ? "currentColor" : "none"}>
    <path d="m12 3.6 2.5 5.2 5.7.7-4.2 3.9 1.1 5.6L12 16.2 6.9 19l1.1-5.6-4.2-3.9 5.7-.7L12 3.6Z" />
  </svg>
);

export const IconTrash = (p: P) => (
  <svg {...base(p)}>
    <path d="M4.5 6.5h15M9.5 6.5V4.8a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v1.7" />
    <path d="M6.5 6.5 7.4 19a1.5 1.5 0 0 0 1.5 1.4h6.2a1.5 1.5 0 0 0 1.5-1.4l.9-12.5" />
    <path d="M10 10.5v6M14 10.5v6" />
  </svg>
);

export const IconCal = (p: P) => (
  <svg {...base(p)}>
    <rect x="4" y="5.5" width="16" height="15" rx="1" />
    <path d="M4 10h16M8.5 3.5v3.5M15.5 3.5v3.5" />
  </svg>
);

export const IconPin = (p: P) => (
  <svg {...base(p)}>
    <path d="M12 21s-6.5-5.6-6.5-10.4A6.5 6.5 0 0 1 12 4a6.5 6.5 0 0 1 6.5 6.6C18.5 15.4 12 21 12 21Z" />
    <circle cx="12" cy="10.5" r="2.2" />
  </svg>
);

export const IconPhone = (p: P) => (
  <svg {...base(p)}>
    <path d="M6.8 3.8 9 3.4a1 1 0 0 1 1.1.7l.9 2.6a1 1 0 0 1-.4 1.2l-1.5 1a12.5 12.5 0 0 0 6 6l1-1.5a1 1 0 0 1 1.2-.4l2.6.9a1 1 0 0 1 .7 1.1l-.4 2.2a1.6 1.6 0 0 1-1.6 1.3A16.8 16.8 0 0 1 5.5 5.4a1.6 1.6 0 0 1 1.3-1.6Z" />
  </svg>
);

export const IconMail = (p: P) => (
  <svg {...base(p)}>
    <rect x="3.5" y="5.5" width="17" height="13" rx="1" />
    <path d="m4.5 7 7.5 6 7.5-6" />
  </svg>
);

export const IconChevron = (p: P) => (
  <svg {...base(p)}>
    <path d="m6 9 6 6 6-6" />
  </svg>
);

export const IconScissors = (p: P) => (
  <svg {...base(p)}>
    <circle cx="6" cy="6.5" r="2.5" />
    <circle cx="6" cy="17.5" r="2.5" />
    <path d="M8.2 8 20 19.5M8.2 16 20 4.5M14.6 10.4l.9.9" />
  </svg>
);

export const IconNeedle = (p: P) => (
  <svg {...base(p)}>
    <path d="M19.5 4.5c1.2 1.2 1.2 2.4 0 3.6L8 19.6a3.4 3.4 0 0 1-4-4L15.9 4.5c1.2-1.2 2.4-1.2 3.6 0Z" />
    <path d="m17 7 1.8 1.8" />
    <path d="M4.6 19.4c2.5.6 4.6-1.5 4-4" />
  </svg>
);

export const IconUser = (p: P) => (
  <svg {...base(p)}>
    <circle cx="12" cy="8" r="3.6" />
    <path d="M4.8 20.2a7.6 7.6 0 0 1 14.4 0" />
  </svg>
);

export const IconLeaf = (p: P) => (
  <svg {...base(p)}>
    <path d="M5 19C4 9 10 4.5 19.5 4.5 19.5 14 14 20 5 19Z" />
    <path d="M5 19c3.5-5 7-8.5 11-11.5" />
  </svg>
);

export const IconGlobe = (p: P) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M3.5 12h17M12 3.5c2.7 2.3 4 5.2 4 8.5s-1.3 6.2-4 8.5c-2.7-2.3-4-5.2-4-8.5s1.3-6.2 4-8.5Z" />
  </svg>
);

export const IconSpark = (p: P) => (
  <svg {...base(p)}>
    <path d="M12 3.5 13.8 10 20.5 12 13.8 14 12 20.5 10.2 14 3.5 12l6.7-2L12 3.5Z" />
  </svg>
);

export const SERVICE_ICONS: Record<string, (p: P) => JSX.Element> = {
  hanger: IconHanger,
  needle: IconNeedle,
  scissors: IconScissors,
  user: IconUser,
};
