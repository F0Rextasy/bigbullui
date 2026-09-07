"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface DevicesListProps extends React.HTMLAttributes<HTMLDivElement> {
  devices?: { id: string; name: string; location: string; current?: boolean }[];
  onRevoke?: (id: string) => void;
}

/** Devices list stub: session rows with current badge and revoke. */
export function DevicesList({ devices = [{ id: "d1", name: "MacBook Pro", location: "Istanbul", current: true }, { id: "d2", name: "iPhone 15", location: "Ankara" }], onRevoke, className, ...props }: DevicesListProps) {
  const [list, setList] = React.useState(devices);
  return (
    <div className={cn("w-full max-w-md rounded-lg border border-border bg-card p-3", className)} {...props}>
      <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">Devices · {list.length}</span>
      <ul className="mt-2 space-y-1.5">
        {list.map((d) => (
          <li key={d.id} className="flex items-center gap-2 rounded-md border border-dashed border-border bg-background px-2.5 py-2">
            <span className="flex size-7 items-center justify-center rounded border border-border bg-card font-mono text-[10px] font-bold text-accent" aria-hidden="true">◈</span>
            <div className="min-w-0 flex-1">
              <p className="truncate font-mono text-xs font-bold text-foreground">{d.name} {d.current && <span className="ml-1 rounded bg-accent px-1 py-px text-[9px] uppercase text-accent-foreground">This device</span>}</p>
              <p className="font-mono text-[10px] uppercase text-muted-foreground">{d.location}</p>
            </div>
            {!d.current && (
              <button
                type="button"
                onClick={() => { setList((l) => l.filter((x) => x.id !== d.id)); onRevoke?.(d.id); }}
                className="rounded border border-destructive/50 px-2 py-0.5 font-mono text-[10px] font-bold uppercase text-destructive focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                Revoke
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
