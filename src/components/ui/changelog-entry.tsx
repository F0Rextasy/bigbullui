"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface ChangelogChange {
  tone: "added" | "fixed" | "breaking";
  text: string;
}

export interface ChangelogEntryProps extends React.HTMLAttributes<HTMLDivElement> {
  version?: string;
  date?: string;
  changes?: ChangelogChange[];
}

/** Changelog entry: version badge with tone-coded change rows. */
export function ChangelogEntry({
  version = "v2.4.0",
  date = "2026-08-30",
  changes = [
    { tone: "added", text: "Split-flap board controls" },
    { tone: "fixed", text: "Turnstile counter drift" },
    { tone: "breaking", text: "Renamed gate prop" },
  ],
  className,
  ...props
}: ChangelogEntryProps) {
  const toneCls: Record<ChangelogChange["tone"], string> = {
    added: "bg-primary/10 text-foreground border-primary/40",
    fixed: "bg-secondary text-secondary-foreground border-border",
    breaking: "bg-accent/10 text-accent border-accent/50",
  };
  return (
    <div className={cn("w-full max-w-sm rounded-lg border-2 border-foreground bg-card p-4", className)} {...props}>
      <div className="flex items-center justify-between">
        <span className="rounded bg-primary px-2 py-0.5 font-mono text-xs font-black text-primary-foreground">{version}</span>
        <span className="font-mono text-[11px] tabular-nums text-muted-foreground">{date}</span>
      </div>
      <ul className="mt-3 space-y-1.5">
        {changes.map((c, i) => (
          <li key={i} className="flex items-start gap-2 text-xs">
            <span className={cn("rounded border px-1.5 py-0.5 font-mono text-[10px] font-bold uppercase", toneCls[c.tone])}>
              {c.tone}
            </span>
            <span className="pt-0.5">{c.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
