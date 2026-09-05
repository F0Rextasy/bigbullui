"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface BackLinkProps {
  href: string;
  label?: string;
}

export function BackLink({
  href,
  label = "Back",
}: BackLinkProps) {
  return (
    <a
      href={href}
      className={cn(
        "flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        "group"
      )}
    >
      <svg
        className={cn(
          "h-4 w-4",
          "group-hover:translate-x-1 transition-transform",
          "group-focus-visible:translate-x-1"
        )}
        viewBox="0 0 24 24"
        fill="currentColor"
        focusable="false"
      >
        <path d="M15 18l-6-6 6-6" />
      </svg>
      <span className="text-[10px] uppercase tracking-[0.15em]">{label}</span>
    </a>
  );
}