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
};
