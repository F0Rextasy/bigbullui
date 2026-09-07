"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface MaintenancePageProps extends React.HTMLAttributes<HTMLDivElement> {
  eta?: string;
}

/** Maintenance page: intermission notice with ETA chip. */
export function MaintenancePage({ eta = "Back at 21:00", className, ...props }: MaintenancePageProps) {
  return (
    <div className={cn("flex w-full max-w-md flex-col items-center rounded-lg border-2 border-foreground bg-card p-8 text-center", className)} {...props}>
      <p className="rounded-full border border-dashed border-border px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
        Intermission
      </p>
      <h3 className="mt-3 text-lg font-black">Polishing the brass rails</h3>
      <p className="mt-1 max-w-xs text-sm text-muted-foreground">The box office is on a short break. Your stubs are safe.</p>
      <span className="mt-4 rounded-md bg-accent/10 px-3 py-1.5 font-mono text-xs font-bold text-accent">{eta}</span>
    </div>
  );
}
