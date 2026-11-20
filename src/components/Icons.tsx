type IconProps = { className?: string };

export function ChevronIcon({ className }: IconProps) {
  return (
    <svg className={className} width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
      <path
        d="M2.2 4.2 6 8l3.8-3.8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function InstagramIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
      <rect
        x="3.5"
        y="3.5"
        width="17"
        height="17"
        rx="5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" />
    </svg>
  );
}

export function FacebookIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M14.2 20v-6.2h2.1l.3-2.4h-2.4V9.7c0-.7.2-1.2 1.2-1.2H16.7V6.1c-.3 0-1.1-.1-2.1-.1-2.1 0-3.5 1.3-3.5 3.6v1.8H8.8v2.4h2.3V20h3.1Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function YouTubeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
      <rect x="2.5" y="6" width="19" height="12" rx="3.2" fill="currentColor" />
      <path d="M10.4 9.3v5.4L15.6 12l-5.2-2.7Z" fill="#fff" />
    </svg>
  );
}

export function HeartIcon({ filled }: { filled: boolean }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 19.2s-6.4-3.9-6.4-8.2A3.5 3.5 0 0 1 12 8.6a3.5 3.5 0 0 1 6.4 2.4c0 4.3-6.4 8.2-6.4 8.2Z"
        fill={filled ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function BagIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M6.2 8.5h11.6l-.8 10.2a2 2 0 0 1-2 1.8H9a2 2 0 0 1-2-1.8L6.2 8.5Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M9 8.4V7.2A3 3 0 0 1 12 4a3 3 0 0 1 3 3.2v1.2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="11" cy="11" r="6.2" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <path d="M15.8 15.8 20 20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function TrashIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M5 8h14M9.5 8V6.2A1.2 1.2 0 0 1 10.7 5h2.6a1.2 1.2 0 0 1 1.2 1.2V8M8 8l.7 10.2a1.5 1.5 0 0 0 1.5 1.4h3.6a1.5 1.5 0 0 0 1.5-1.4L16 8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M6 6l12 12M18 6 6 18"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}
