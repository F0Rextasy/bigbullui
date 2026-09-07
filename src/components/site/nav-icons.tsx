"use client";

import * as React from "react";

export type NavIconName =
  | "home"
  | "components"
  | "blocks"
  | "showcase"
  | "install"
  | "design"
  | "agents"
  | "contribute"
  | "dashboard"
  | "app"
  | "auth"
  | "system"
  | "marketing"
  | "content"
  | "operations"
  | "storefront"
  | "service"
  | "pages"
  | "theme";

const PATHS: Record<NavIconName, React.ReactNode> = {
  home: <path d="M4 11.5 12 4l8 7.5M6.5 10v9.5h11V10" />,
  components: <path d="M4 7.5 12 3l8 4.5v9L12 21l-8-4.5v-9ZM4 7.5l8 4.5 8-4.5M12 12v9" />,
  blocks: <path d="M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z" />,
  showcase: <path d="M12 3.5 14.7 9l6.3.7-4.7 4.2 1.3 6.1L12 16.8 6.4 20l1.3-6.1L3 9.7 9.3 9 12 3.5Z" />,
  install: <path d="M13 2 5.5 13.5H11L10 22l7.5-11.5H12L13 2Z" />,
  design: <path d="M12 3.5a8.5 8.5 0 1 0 8.5 8.5c0-2-1.5-3-3-3h-2.6a2.4 2.4 0 0 1-2.4-2.4V4.5c0-.6-.5-1-.5-1ZM7 12h.01M10 9.5h.01M14.5 9.5h.01M9 16.5h.01" />,
  agents: <path d="M5 4h14v11H9l-4 4V4ZM9 9h.01M12.5 9h.01M16 9h.01M8.5 13.5h7" />,
  contribute: <path d="M12 20s-7-4.3-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.7-7 10-7 10ZM7 10h.01" />,
  dashboard: <path d="M4 4h9v9H4zM15 4h5v5h-5zM15 11h5v9h-5zM4 15h9v5H4z" />,
  app: <path d="M7 2.5h10v19H7zM10.5 18.5h3" />,
  auth: <path d="M6 10V7a6 6 0 0 1 12 0v3M5 10h14v10H5zM12 14v2.5" />,
  system: <path d="M12 8.5A3.5 3.5 0 1 0 12 15.5 3.5 3.5 0 0 0 12 8.5ZM12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.3 5.3l2.1 2.1M16.6 16.6l2.1 2.1M18.7 5.3l-2.1 2.1M7.4 16.6l-2.1 2.1" />,
  marketing: <path d="M4 20V10M10 20V4M16 20v-9M21 20H3" />,
  content: <path d="M6 2.5h9L20 7.5V21.5H6zM14.5 2.5v5.5H20M9 12h7M9 15.5h7" />,
  operations: <path d="M3 7h11v9H3zM14 10h4l3 3v3h-7zM7 19a1.8 1.8 0 1 0 0-.01M17.5 19a1.8 1.8 0 1 0 0-.01" />,
  storefront: <path d="M4 9.5 5.5 4h13L20 9.5M4 9.5h16v2.5a2.5 2.5 0 0 1-5 0 2.5 2.5 0 0 1-5 0 2.5 2.5 0 0 1-5 0M6.5 14.5V21M17.5 14.5V21" />,
  service: <path d="M4 12a8 8 0 0 1 14-5l2 2M20 12a8 8 0 0 1-14 5l-2-2M18 3v4h-4M6 21v-4h4" />,
  pages: <path d="M8 3.5h11v17H8zM4 7.5h4M4 12h3M4 16.5h4" />,
  theme: <path d="M12 3.5s6 6.6 6 11a6 6 0 0 1-12 0c0-4.4 6-11 6-11ZM9.5 14.5a2.5 2.5 0 0 0 2.5 2.5" />,
};

export interface NavIconProps extends React.SVGAttributes<SVGSVGElement> {
  name: NavIconName;
  size?: number;
}

export function NavIcon({ name, size = 15, ...props }: NavIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {PATHS[name]}
    </svg>
  );
}
