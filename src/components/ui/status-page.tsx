"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface StatusPageProps extends React.HTMLAttributes<HTMLDivElement> {
  services?: { name: string; status: "up" | "degraded" | "down" }[];
}

/** Status page stub: service rows with radar dots and summary stamp. */
export function StatusPage({ services = [{ name: "Box office", status: "up" }, { name: "Gates API", status: "up" }, { name: "Print queue", status: "degraded" }], className, ...props }: StatusPageProps) {
  const dot = { up: "bg-emerald-500", degraded: "bg-amber-500", down: "bg-destructive" } as const;
  const allUp = services.every((s) => s.status === "up");
  return (
    <div className={cn("w-full max-w-md rounded-lg border border-border bg-card p-4", className)} role="status" {...props}>
      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">System status</span>
        <span className={cn("rounded-full px-2 py-0.5 font-mono text-[10px] font-bold uppercase", allUp ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400" : "bg-amber-500/10 text-amber-600")}>{allUp ? "All up" : "Partial"}</span>
      </div>
      <ul className="mt-2 divide-y divide-dashed divide-border">
        {services.map((s) => (
          <li key={s.name} className="flex items-center gap-2 py-1.5">
            <span className={cn("size-2 rounded-full", dot[s.status])} aria-hidden="true" />
            <span className="flex-1 font-mono text-xs text-foreground">{s.name}</span>
            <span className="font-mono text-[10px] uppercase text-muted-foreground">{s.status}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
