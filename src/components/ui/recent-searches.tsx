"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface RecentSearchesProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  items?: string[];
  onSelect?: (item: string) => void;
  onClear?: () => void;
}

/** Recent searches stub: mono history list with clear action. */
export function RecentSearches({ items = ["ticket stub", "vip pass", "gate 3"], onSelect, onClear, className, ...props }: RecentSearchesProps) {
  const [list, setList] = React.useState(items);
  return (
    <div className={cn("w-full max-w-sm rounded-lg border border-border bg-card p-3 outline-1 outline-dashed outline-offset-[-5px] outline-border/60", className)} {...props}>
      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">Recent searches</span>
        <button
          type="button"
          onClick={() => { setList([]); onClear?.(); }}
          className="rounded font-mono text-[10px] uppercase tracking-wider text-accent hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          Clear
        </button>
      </div>
      <ul className="mt-2 space-y-1">
        {list.map((item) => (
          <li key={item}>
            <button
              type="button"
              onClick={() => onSelect?.(item)}
              className="flex w-full items-center gap-2 rounded-md border border-dashed border-border bg-background px-2.5 py-1.5 text-start font-mono text-xs text-foreground transition-colors hover:border-accent/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" /></svg>
              {item}
            </button>
          </li>
        ))}
        {list.length === 0 && <li className="py-2 text-center font-mono text-[11px] text-muted-foreground">No recent searches</li>}
      </ul>
    </div>
  );
}
