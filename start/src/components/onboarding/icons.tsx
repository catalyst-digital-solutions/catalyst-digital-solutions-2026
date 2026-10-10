/* Inline SVG icons from the approved prototype. */
type P = { className?: string; size?: number };

export const Check = ({ size = 14, stroke = 2.6, className }: P & { stroke?: number }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true" className={className}>
    <path d="M4.5 10.4l3.6 3.6L15.5 6.6" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const CircleCheck = ({ className }: P) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true" className={className}>
    <circle cx="10" cy="10" r="9" stroke="#1E6FE6" strokeWidth="1.5" />
    <path d="M6 10.2l2.6 2.6L14 7.4" stroke="#1E6FE6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const ArrowRight = ({ w = 14, h = 12 }: { w?: number; h?: number }) => (
  <svg width={w} height={h} viewBox="0 0 16 14" fill="none" aria-hidden="true">
    <path d="M1 7h13M9 2l5 5-5 5" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const ArrowLeft = ({ w = 14, h = 12 }: { w?: number; h?: number }) => (
  <svg width={w} height={h} viewBox="0 0 16 14" fill="none" aria-hidden="true">
    <path d="M15 7H2M7 2L2 7l5 5" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const Chevron = ({ open = false }: { open?: boolean }) => (
  <svg width="12" height="8" viewBox="0 0 12 8" fill="none" aria-hidden="true" style={{ transition: "transform .2s", transform: open ? "rotate(180deg)" : "none" }}>
    <path d="M1 1.5l5 5 5-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const Pencil = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M10.5 2.5l3 3L5 14H2v-3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
  </svg>
);

export const Info = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true" className="mt-px">
    <circle cx="10" cy="10" r="8.5" stroke="currentColor" strokeWidth="1.5" />
    <path d="M10 9v5M10 6.2v.1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

export const Lock = ({ w = 12, h = 14, stroke = 1.4, className }: { w?: number; h?: number; stroke?: number; className?: string }) => (
  <svg width={w} height={h} viewBox="0 0 12 14" fill="none" aria-hidden="true" className={className}>
    <rect x="1" y="6" width="10" height="7" rx="1.5" stroke="currentColor" strokeWidth={stroke} />
    <path d="M3.5 6V4.2a2.5 2.5 0 0 1 5 0V6" stroke="currentColor" strokeWidth={stroke} />
  </svg>
);

export const Close = ({ size = 12 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 12 12" fill="none" aria-hidden="true">
    <path d="M1.5 1.5l9 9M10.5 1.5l-9 9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

export const Plus = () => (
  <svg width="13" height="13" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="M10 4v12M4 10h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const Mic = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
    <rect x="6" y="1.5" width="6" height="10" rx="3" stroke="currentColor" strokeWidth="1.6" />
    <path d="M3.5 8.5a5.5 5.5 0 0 0 11 0M9 14v2.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

export const Stop = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
    <rect x="2" y="2" width="10" height="10" rx="2" fill="currentColor" />
  </svg>
);

export const Dots = () => (
  <svg width="20" height="6" viewBox="0 0 20 6" aria-hidden="true">
    <circle cx="3" cy="3" r="2.2" fill="currentColor" />
    <circle cx="10" cy="3" r="2.2" fill="currentColor" opacity="0.6" />
    <circle cx="17" cy="3" r="2.2" fill="currentColor" opacity="0.3" />
  </svg>
);

export const UploadIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="M10 13V3M5.5 7.5L10 3l4.5 4.5" stroke="#1558B8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M3 13v3.5h14V13" stroke="#1558B8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const FileIcon = () => (
  <svg width="18" height="20" viewBox="0 0 16 18" fill="none" aria-hidden="true" className="flex-none">
    <path d="M3 1.5h6.5L13 5v11.5H3z" stroke="#1558B8" strokeWidth="1.4" strokeLinejoin="round" />
    <path d="M9.5 1.5V5H13" stroke="#1558B8" strokeWidth="1.4" strokeLinejoin="round" />
  </svg>
);

export const ListIcon = () => (
  <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M2 3.5h12M2 8h12M2 12.5h7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);
