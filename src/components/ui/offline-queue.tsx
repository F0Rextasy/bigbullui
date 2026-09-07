"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface OfflineQueueProps extends React.HTMLAttributes<HTMLDivElement> {
  items?: { id: string; label: string; state: "queued" | "sending" | "failed" }[];
  onRetry?: () => void;
}

/** Offline queue stub: pending action rows with retry stamp. */
export function OfflineQueue({ items = [{ id: "q1", label: "Scan #99201", state: "queued" }, { id: "q2", label: "Scan #99202", state: "failed" }], onRetry, className, ...props }: OfflineQueueProps) {
  const tone = { queued: "text-muted-foreground", sending: "text-accent", failed: "text-destructive" } as const;
  return (
    <div className={cn("w-full max-w-sm rounded-lg border border-dashed border-border bg-card p-3", className)} {...props}>
      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">Offline queue · {items.length}</span>
        <button type="button" onClick={onRetry} className="rounded font-mono text-[10px] font-bold uppercase text-accent hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">Retry all</button>
      </div>
      <ul className="mt-2 space-y-1">
        {items.map((q) => (
          <li key={q.id} className="flex items-center gap-2 rounded-md border border-border bg-background px-2.5 py-1.5">
            <span className={cn("font-mono text-[10px] font-bold uppercase", tone[q.state])} aria-hidden="true">●</span>
            <span className="flex-1 font-mono text-xs text-foreground">{q.label}</span>
            <span className="font-mono text-[10px] uppercase text-muted-foreground">{q.state}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
