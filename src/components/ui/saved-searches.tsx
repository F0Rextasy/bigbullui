"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface SavedSearchesProps extends React.HTMLAttributes<HTMLDivElement> {
  items?: { name: string; query: string }[];
  onRun?: (query: string) => void;
  onDelete?: (name: string) => void;
}

/** Saved searches stub: named query cards with run and delete. */
export function SavedSearches({ items = [{ name: "Friday VIP", query: "tier:vip fri" }, { name: "Cheap seats", query: "price<30" }], onRun, onDelete, className, ...props }: SavedSearchesProps) {
  const [list, setList] = React.useState(items);
  return (
    <div className={cn("w-full max-w-sm rounded-lg border border-border bg-card p-3", className)} {...props}>
      <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">Saved searches</span>
      <ul className="mt-2 space-y-1.5">
        {list.map((s) => (
          <li key={s.name} className="flex items-center gap-2 rounded-md border border-border bg-background px-2.5 py-1.5">
            <div className="min-w-0 flex-1">
              <p className="truncate font-mono text-xs font-bold text-foreground">{s.name}</p>
              <p className="truncate font-mono text-[10px] text-muted-foreground">{s.query}</p>
            </div>
            <button type="button" onClick={() => onRun?.(s.query)} className="rounded border border-accent/50 px-2 py-0.5 font-mono text-[10px] font-bold uppercase text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">Run</button>
            <button
              type="button"
              aria-label={`Delete ${s.name}`}
              onClick={() => { setList((l) => l.filter((x) => x.name !== s.name)); onDelete?.(s.name); }}
              className="rounded px-1 font-mono text-xs text-muted-foreground hover:text-destructive focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              ×
            </button>
          </li>
        ))}
        {list.length === 0 && <li className="py-2 text-center font-mono text-[11px] text-muted-foreground">No saved searches</li>}
      </ul>
    </div>
  );
}
