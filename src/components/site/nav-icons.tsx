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
  | "contribute";

const PATHS: Record<NavIconName, React.ReactNode> = {
  home: <path d="M4 11.5 12 4l8 7.5M6.5 10v9.5h11V10" />,
  components: <path d="M4 7.5 12 3l8 4.5v9L12 21l-8-4.5v-9ZM4 7.5l8 4.5 8-4.5M12 12v9" />,
  blocks: <path d="M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z" />,
  showcase: <path d="M12 3.5 14.7 9l6.3.7-4.7 4.2 1.3 6.1L12 16.8 6.4 20l1.3-6.1L3 9.7 9.3 9 12 3.5Z" />,
  install: <path d="M13 2 5.5 13.5H11L10 22l7.5-11.5H12L13 2Z" />,
  design: <path d="M12 3.5a8.5 8.5 0 1 0 8.5 8.5c0-2-1.5-3-3-3h-2.6a2.4 2.4 0 0 1-2.4-2.4V4.5c0-.6-.5-1-.5-1ZM7 12h.01M10 9.5h.01M14.5 9.5h.01M9 16.5h.01" />,
  agents: <path d="M5 4h14v11H9l-4 4V4ZM9 9h.01M12.5 9h.01M16 9h.01M8.5 13.5h7" />,
  contribute: <path d="M12 20s-7-4.3-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.7-7 10-7 10ZM7 10h.01" />,
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
