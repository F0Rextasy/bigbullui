import * as React from "react";

export const SET_CORE_ICONS: Record<string, React.ReactNode> = {
  home: (
    <path d="M4 11.5 12 4l8 7.5M6.5 10v9.5h11V10" />
  ),
  components: (
    <path d="M4 7.5 12 3l8 4.5v9L12 21l-8-4.5v-9ZM4 7.5l8 4.5 8-4.5M12 12v9" />
  ),
  blocks: (
    <path d="M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z" />
  ),
  showcase: (
    <path d="M12 3.5 14.7 9l6.3.7-4.7 4.2 1.3 6.1L12 16.8 6.4 20l1.3-6.1L3 9.7 9.3 9 12 3.5Z" />
  ),
  install: (
    <path d="M13 2 5.5 13.5H11L10 22l7.5-11.5H12L13 2Z" />
  ),
  design: (
    <path d="M12 3.5a8.5 8.5 0 1 0 8.5 8.5c0-2-1.5-3-3-3h-2.6a2.4 2.4 0 0 1-2.4-2.4V4.5c0-.6-.5-1-.5-1ZM7 12h.01M10 9.5h.01M14.5 9.5h.01M9 16.5h.01" />
  ),
  agents: (
    <path d="M5 4h14v11H9l-4 4V4ZM9 9h.01M12.5 9h.01M16 9h.01M8.5 13.5h7" />
  ),
  contribute: (
    <path d="M12 20s-7-4.3-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.7-7 10-7 10ZM7 10h.01" />
  ),
  dashboard: (
    <path d="M4 4h9v9H4zM15 4h5v5h-5zM15 11h5v9h-5zM4 15h9v5H4z" />
  ),
  app: (
    <path d="M7 2.5h10v19H7zM10.5 18.5h3" />
  ),
  auth: (
    <path d="M6 10V7a6 6 0 0 1 12 0v3M5 10h14v10H5zM12 14v2.5" />
  ),
  system: (
    <path d="M12 8.5A3.5 3.5 0 1 0 12 15.5 3.5 3.5 0 0 0 12 8.5ZM12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.3 5.3l2.1 2.1M16.6 16.6l2.1 2.1M18.7 5.3l-2.1 2.1M7.4 16.6l-2.1 2.1" />
  ),
  marketing: (
    <path d="M4 20V10M10 20V4M16 20v-9M21 20H3" />
  ),
  content: (
    <path d="M6 2.5h9L20 7.5V21.5H6zM14.5 2.5v5.5H20M9 12h7M9 15.5h7" />
  ),
  operations: (
    <path d="M3 7h11v9H3zM14 10h4l3 3v3h-7zM7 19a1.8 1.8 0 1 0 0-.01M17.5 19a1.8 1.8 0 1 0 0-.01" />
  ),
  storefront: (
    <path d="M4 9.5 5.5 4h13L20 9.5M4 9.5h16v2.5a2.5 2.5 0 0 1-5 0 2.5 2.5 0 0 1-5 0 2.5 2.5 0 0 1-5 0M6.5 14.5V21M17.5 14.5V21" />
  ),
  service: (
    <path d="M4 12a8 8 0 0 1 14-5l2 2M20 12a8 8 0 0 1-14 5l-2-2M18 3v4h-4M6 21v-4h4" />
  ),
  pages: (
    <path d="M8 3.5h11v17H8zM4 7.5h4M4 12h3M4 16.5h4" />
  ),
  theme: (
    <path d="M12 3.5s6 6.6 6 11a6 6 0 0 1-12 0c0-4.4 6-11 6-11ZM9.5 14.5a2.5 2.5 0 0 0 2.5 2.5" />
  ),
  ticket: (
    <>
      <path d="M4 7.5h16v9H4zM4 7.5a2.5 2.5 0 0 0 0 9M20 7.5a2.5 2.5 0 0 1 0 9" />
      <path d="M14.5 7.5v9" strokeDasharray="2 2" />
      <circle cx="9" cy="12" r="1.4" />
    </>
  ),
  stub: (
    <>
      <path d="M6 3.5h12v17H6zM6 3.5 4.5 6l1.5 2.5L4.5 11l1.5 2.5L4.5 16l1.5 2.5L6 20.5" />
      <path d="M9.5 8h5M9.5 12h5" strokeDasharray="2 1.6" />
    </>
  ),
  perforation: (
    <>
      <path d="M3 12h2M7 12h1.6M10.6 12h1.6M14.2 12h1.6M17.8 12h1.6M21 12h0.01" strokeDasharray="0.1 2.4" strokeWidth="2.6" strokeLinecap="round" />
      <path d="M3 5.5h18M3 18.5h18" strokeWidth="1.2" opacity="0.55" />
    </>
  ),
  stamp: (
    <>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="5.2" strokeDasharray="2.4 1.8" />
      <path d="M12 8.5v7M8.5 12h7" />
    </>
  ),
  gate: (
    <>
      <path d="M4 21V11a8 8 0 0 1 16 0v10M4 21h16" />
      <path d="M12 11v10" />
      <circle cx="12" cy="8" r="1.6" />
    </>
  ),
  settings: (
    <>
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c0-4 3.6-6.5 8-6.5s8 2.5 8 6.5" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8" r="3.5" />
      <path d="M2.5 20c0-3.5 3-5.5 6.5-5.5s6.5 2 6.5 5.5M16 8.5a3 3 0 1 0-2-5.2M17.5 14.7c2 .7 4 2.2 4 4.3" />
    </>
  ),
  sparkles: (
    <>
      <path d="M12 4v3M12 17v3M4 12h3M17 12h3" />
      <path d="M12 9.5 14 12l-2 2.5L10 12l2-2.5Z" />
    </>
  ),
  plus: (
    <path d="M12 5v14M5 12h14" />
  ),
  check: (
    <path d="M4.5 12.5 10 18 19.5 6.5" />
  ),
  x: (
    <path d="M6 6l12 12M18 6 6 18" />
  ),
  menu: (
    <path d="M4 7h16M4 12h16M4 17h16" />
  ),
  "lock-open": (
    <>
      <path d="M6 11V8a6 6 0 0 1 11.5-2.5" />
      <path d="M5 11h14v9.5H5zM12 15v2.5" />
    </>
  ),
  "star-outline": (
    <path d="M12 3.5 14.7 9l6.3.7-4.7 4.2 1.3 6.1L12 16.8 6.4 20l1.3-6.1L3 9.7 9.3 9 12 3.5Z" />
  ),
  edit: (
    <path d="M4 20l1-4L16.5 4.5a2.1 2.1 0 0 1 3 3L8 19l-4 1ZM14.5 6.5l3 3" />
  ),
  download: (
    <path d="M12 4v11M7 11l5 5 5-5M4 20h16" />
  ),
  upload: (
    <path d="M12 15V4M7 8l5-5 5 5M4 20h16" />
  ),
  share: (
    <>
      <circle cx="7" cy="12" r="2.5" />
      <circle cx="16" cy="6" r="2.5" />
      <circle cx="16" cy="18" r="2.5" />
      <path d="M9.2 10.8 13.8 7.2M9.2 13.2l4.6 3.6" />
    </>
  ),
  link: (
    <path d="M10 14a4 4 0 0 0 6 0l3-3a4 4 0 0 0-6-6l-1.5 1.5M14 10a4 4 0 0 0-6 0l-3 3a4 4 0 0 0 6 6l1.5-1.5" />
  ),
  external: (
    <path d="M14 3.5h6.5V10M20.5 3.5 11 13M9 5H6.5A2.5 2.5 0 0 0 4 7.5V18.5A2.5 2.5 0 0 0 6.5 21H17.5A2.5 2.5 0 0 0 20 18.5V16" />
  ),
  "check-double": (
    <path d="M2.5 13 7.5 18 13.5 10M11.5 15.5 13 17 20.5 8" />
  ),
  info: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 11v5M12 7.5h.01" />
    </>
  ),
  "alert-triangle": (
    <path d="M12 4 2.5 20h19L12 4ZM12 10v4.5M12 17.5h.01" />
  ),
  help: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M9.5 9.5A2.5 2.5 0 0 1 12 8c1.4 0 2.5 1 2.5 2.2 0 1.7-2.2 2-2.5 3.3M12 17h.01" />
    </>
  ),
  filter: (
    <path d="M4 5h16l-6 7v6l-4 2v-8L4 5Z" />
  ),
  sort: (
    <path d="M8 5v14M8 19l-3.5-3.5M8 19l3.5-3.5M16 19V5M16 5l-3.5 3.5M16 5l3.5 3.5" />
  ),
  grid: (
    <path d="M6.5 6.5h.01M12 6.5h.01M17.5 6.5h.01M6.5 12h.01M12 12h.01M17.5 12h.01M6.5 17.5h.01M12 17.5h.01M17.5 17.5h.01" />
  ),
  list: (
    <path d="M9 6h11M9 12h11M9 18h11M4.5 6h.01M4.5 12h.01M4.5 18h.01" />
  ),
  more: (
    <path d="M5.5 12h.01M12 12h.01M18.5 12h.01" />
  ),
  undo: (
    <path d="M9 14 4 9l5-5M4 9h10a6 6 0 0 1 0 12h-3" />
  ),
  redo: (
    <path d="M15 14l5-5-5-5M20 9H10a6 6 0 0 0 0 12h3" />
  ),
  maximize: (
    <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
  ),
  minimize: (
    <path d="M4 14h6v6M20 10h-6V4M14 10l7 7M10 14l-7 7" />
  ),
  history: (
    <>
      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
      <path d="M12 7v5l4 2" />
    </>
  ),
  refresh: (
    <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8M21 3v5h-5" />
  ),
  "map-pin": (
    <>
      <path d="M12 21s-7-6-7-11a7 7 0 0 1 14 0c0 5-7 11-7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  phone: (
    <path d="M5 4h4l2 5-2.5 1.5a12 12 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />
  ),
  message: (
    <path d="M4 5.5h16V16H9.5L4 20.5V5.5Z" />
  ),
  send: (
    <path d="M20 4 10.5 13.5M20 4l-6.5 16-3-6.5L4 10.5 20 4Z" />
  ),
  archive: (
    <path d="M4 4h16v4H4zM6 8v12h12V8M10 12h4" />
  ),
  "bookmark-check": (
    <>
      <path d="M7 3.5h10v17l-5-3.5-5 3.5V3.5Z" />
      <path d="M10 12.5l2 2 3.5-3.8" />
    </>
  ),
  "bookmark-x": (
    <>
      <path d="M7 3.5h10v17l-5-3.5-5 3.5V3.5Z" />
      <path d="M10.5 12.5l3 3M13.5 12.5l-3 3" />
    </>
  ),
  "image-plus": (
    <>
      <rect x="4" y="5" width="16" height="14" rx="1.5" />
      <circle cx="9" cy="10" r="1.5" />
      <path d="M4 17l5-5 4 4M18 8v6M15 11h6" />
    </>
  ),
  mic: (
    <>
      <rect x="9" y="3" width="6" height="11" rx="3" />
      <path d="M6 11a6 6 0 0 0 12 0M12 17v4" />
    </>
  ),
  "mic-off": (
    <path d="M9 5.5A3 3 0 0 1 12 4.5a3 3 0 0 1 3 3V11M6 10.5a6 6 0 0 0 11 3.5M12 17v4M4 4l16 16" />
  ),
  volume: (
    <>
      <path d="M4 10v4h3l4 4V6l-4 4H4Z" />
      <path d="M15 9a4 4 0 0 1 0 6M17.5 6.5a8 8 0 0 1 0 11" />
    </>
  ),
  "volume-x": (
    <>
      <path d="M4 10v4h3l4 4V6l-4 4H4Z" />
      <path d="M15 9.5l5 5M20 9.5l-5 5" />
    </>
  ),
  alarm: (
    <>
      <circle cx="12" cy="13" r="7" />
      <path d="M12 10v3l2 1.5M5.5 4 4 2.5M18.5 4 20 2.5" />
    </>
  ),
  "phone-call": (
    <>
      <path d="M5 4h4l2 5-2.5 1.5a12 12 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />
      <path d="M14.5 8.5a3.5 3.5 0 0 1 0 5" />
    </>
  ),
  "phone-off": (
    <path d="M5 4h4l2 5-2.5 1.5a12 12 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2ZM4 4l16 16" />
  ),
  voicemail: (
    <>
      <rect x="3" y="6" width="18" height="12" rx="2" />
      <path d="M8 10v4M12 9v6M16 10v4" />
    </>
  ),
  video: (
    <>
      <rect x="3" y="7" width="12" height="10" rx="1.5" />
      <path d="M15 10.5 20.5 7v10L15 13.5" />
    </>
  ),
  "video-off": (
    <>
      <rect x="3" y="7" width="12" height="10" rx="1.5" />
      <path d="M15 10.5 20.5 7v10L15 13.5M3.5 3.5l17 17" />
    </>
  ),
  "message-circle": (
    <path d="M12 3.5c4.7 0 8.5 3.6 8.5 8s-3.8 8-8.5 8c-1 0-2-.2-2.9-.5L5 20l.9-3.4A7.6 7.6 0 0 1 3.5 11.5C3.5 7.1 7.3 3.5 12 3.5Z" />
  ),
  "message-square": (
    <>
      <path d="M4 4.5h16V16H9.5L4 20.5V4.5Z" />
      <path d="M8.5 9.5h.01M12 9.5h.01M15.5 9.5h.01" />
    </>
  ),
};
