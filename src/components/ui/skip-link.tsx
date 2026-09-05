"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface SkipLinkProps {
  href: string;
  children?: React.ReactNode;
}

export function SkipLink({
  href,
  children = "Skip to main content",
}: SkipLinkProps) {
  return (
    <a
      href={href}
      className={cn(
        "hidden focus:not-sr-only focus:translate-x-0 focus:transition-transform focus:ring-2 focus-visible:ring-ring",
        "mx-2 mb-2 rounded-md bg-secondary text-secondary-foreground px-3 py-1 text-[10px] uppercase tracking-[0.15em]",
        "animate-[fade-in-up_0.3s_ease-out_both]"
      )}
    >
      {children}
    </a>
  );
}