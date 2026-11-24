"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface SkipLinkProps extends React.HTMLAttributes<HTMLElement> {
  href: string;
  children?: React.ReactNode;
}

export function SkipLink({
  href,
  children = "Skip to main content", ...props
}: SkipLinkProps) {
  return (
    <a
      href={href}
      className={cn(
        "sr-only focus:not-sr-only focus:translate-x-0 focus:transition-transform focus:ring-2 focus-visible:ring-ring",
        "mx-2 mb-2 rounded-md bg-secondary text-secondary-foreground px-3 py-1 text-[10px] uppercase tracking-[0.15em]",
        "motion-safe:animate-[fade-in-up_0.3s_ease-out_both]"
      )} {...props}
    >
      {children}
    </a>
  );
}