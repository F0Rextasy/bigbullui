"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface HistoryEntry {
  id: string;
  label: string;
}

export interface HistoryNavProps extends React.HTMLAttributes<HTMLElement> {
  entries: HistoryEntry[];
  onBack?: () => void;
  onForward?: () => void;
}

/** Geri/ileri gezinme şeridi: geçmiş kırıntıları + ok butonları. */
export function HistoryNav({ entries, onBack, onForward, className, ...props }: HistoryNavProps) {
  return (
    <nav className={cn("inline-flex items-center gap-1 rounded-md border border-border bg-card px-1.5 py-1", className)} aria-label="Gezinme geçmişi" {...props}>
      <button
        onClick={onBack}
        className="rounded-sm p-1 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring motion-reduce:transition-none"
        aria-label="Geri"
      >
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
      </button>
      <ol className="flex min-w-0 items-center gap-0.5">
        {entries.slice(-3).map((e, idx, arr) => (
          <li key={e.id} className="flex min-w-0 items-center gap-0.5">
            {idx > 0 && <span className="text-muted-foreground/50" aria-hidden="true">/</span>}
            <span
              className={cn(
                "truncate rounded-sm px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider",
                idx === arr.length - 1 ? "font-bold text-foreground" : "text-muted-foreground"
              )}
              style={{ animation: "fade-in 0.25s ease-out both", animationDelay: `${idx * 60}ms` }}
            >
              {e.label}
            </span>
          </li>
        ))}
      </ol>
      <button
        onClick={onForward}
        className="rounded-sm p-1 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring motion-reduce:transition-none"
        aria-label="İleri"
      >
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
      </button>
    </nav>
  );
}
