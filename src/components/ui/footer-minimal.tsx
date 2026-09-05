"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface FooterMinimalProps extends React.HTMLAttributes<HTMLElement> {
  brand?: string;
  links?: { label: string; href: string }[];
  copyright?: string;
}

/** Single-line minimal footer: branding + links + copyright. */
export function FooterMinimal({ brand = "bigbullui", links = [], copyright = "© 2026", className, ...props }: FooterMinimalProps) {
  return (
    <footer className={cn("flex flex-wrap items-center justify-between gap-3 border-t-2 border-dashed border-border px-4 py-3", className)} {...props}>
      <style>{`@keyframes fmIn { from { opacity: 0; } to { opacity: 1; } }`}</style>
      <span className="font-mono text-xs font-bold uppercase tracking-widest animate-[fmIn_0.4s_ease-out_both] motion-reduce:animate-none">{brand}</span>
      <nav className="flex flex-wrap items-center gap-4 animate-[fmIn_0.4s_ease-out_0.1s_both] motion-reduce:animate-none" aria-label="Footer links">
        {links.map((l) => (
          <a key={l.href} href={l.href} className="text-xs text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring rounded-sm motion-reduce:transition-none">
            {l.label}
          </a>
        ))}
      </nav>
      <span className="font-mono text-[10px] text-muted-foreground animate-[fmIn_0.4s_ease-out_0.2s_both] motion-reduce:animate-none">{copyright}</span>
    </footer>
  );
}
