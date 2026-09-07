"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface PathBreadcrumbProps extends React.HTMLAttributes<HTMLElement> {
  segments?: string[];
  onNavigate?: (index: number) => void;
}

/** Path breadcrumb stub: mono file-path trail with separators. */
export function PathBreadcrumb({ segments = ["events", "2026", "friday", "vip.csv"], onNavigate, className, ...props }: PathBreadcrumbProps) {
  return (
    <nav aria-label="File path" className={cn("w-full max-w-lg overflow-x-auto rounded-md border border-dashed border-border bg-card px-2.5 py-1.5", className)} {...props}>
      <ol className="flex min-w-max items-center gap-1">
        {segments.map((s, i) => {
          const last = i === segments.length - 1;
          return (
            <li key={`${s}-${i}`} className="flex items-center gap-1">
              {i > 0 && <span className="font-mono text-[11px] text-muted-foreground" aria-hidden="true">/</span>}
              {last ? (
                <span aria-current="page" className="font-mono text-[11px] font-bold text-accent">{s}</span>
              ) : (
                <button type="button" onClick={() => onNavigate?.(i)} className="rounded font-mono text-[11px] text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">{s}</button>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
