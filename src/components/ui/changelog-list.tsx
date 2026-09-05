"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface ChangelogEntry {
  id: string;
  version: string;
  date: string;
  added?: string[];
  fixed?: string[];
  breaking?: string[];
}

export interface ChangelogListProps extends React.HTMLAttributes<HTMLDivElement> {
  entries: ChangelogEntry[];
}

type Section = "added" | "fixed" | "breaking";

const SECTION_META: Record<Section, { label: string; tone: string; prefix: string }> = {
  added: { label: "Eklendi", tone: "text-emerald-600", prefix: "+" },
  fixed: { label: "Fixed", tone: "text-sky-600", prefix: "~" },
  breaking: { label: "Breaking", tone: "text-destructive", prefix: "!" },
};

/** Changelog feed: release version + date + category badges. */
export function ChangelogList({ entries, className, ...props }: ChangelogListProps) {
  return (
    <div className={cn("w-full max-w-md space-y-4", className)} {...props}>
      <style>{`@keyframes clIn { from { opacity: 0; transform: translateX(-8px); } to { opacity: 1; transform: translateX(0); } }`}</style>
      {entries.map((entry, idx) => (
        <article
          key={entry.id}
          className="rounded-lg border border-border bg-card p-4 animate-[clIn_0.3s_ease-out_both] motion-reduce:animate-none"
          style={{ animationDelay: `${idx * 80}ms` }}
        >
          <header className="flex items-baseline justify-between">
            <span className="font-mono text-sm font-bold text-accent">v{entry.version}</span>
            <time className="font-mono text-[10px] text-muted-foreground">{entry.date}</time>
          </header>
          <div className="mt-2 space-y-2">
            {(Object.keys(SECTION_META) as Section[]).map((section) => {
              const items = entry[section];
              if (!items || items.length === 0) return null;
              const meta = SECTION_META[section];
              return (
                <div key={section}>
                  <p className={cn("font-mono text-[9px] uppercase tracking-wider", meta.tone)}>{meta.label}</p>
                  <ul className="mt-0.5 space-y-0.5">
                    {items.map((item) => (
                      <li key={item} className="flex items-start gap-1.5 text-xs text-foreground/90">
                        <span className={cn("shrink-0 font-mono", meta.tone)} aria-hidden="true">{meta.prefix}</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </article>
      ))}
    </div>
  );
}
