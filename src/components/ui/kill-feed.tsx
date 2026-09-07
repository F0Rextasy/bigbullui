"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface KillFeedEntry {
  id: string;
  killer: string;
  victim: string;
  weapon?: string;
}

export interface KillFeedProps extends React.HTMLAttributes<HTMLDivElement> {
  entries?: KillFeedEntry[];
  max?: number;
}

/** Kill feed: stacked elimination log with mono names. */
export function KillFeed({ entries, max = 5, className, ...props }: KillFeedProps) {
  const fallback: KillFeedEntry[] = [
    { id: "k1", killer: "ADA", victim: "REX", weapon: "RAIL" },
    { id: "k2", killer: "ROW C", victim: "VIPER", weapon: "BLAST" },
    { id: "k3", killer: "MAX", victim: "GOLEM", weapon: "DAGGER" },
  ];
  const rows = (entries ?? fallback).slice(0, max);
  return (
    <div
      role="log"
      aria-label="Kill feed"
      className={cn("w-full touch-none select-none space-y-1", className)}
      style={{ touchAction: "none" }}
      {...props}
    >
      {rows.map((e) => (
        <div key={e.id} className="flex min-h-11 items-center gap-2 rounded-md border border-border bg-card px-2.5 py-1.5 font-mono text-[11px]">
          <span className="font-bold text-foreground">{e.killer}</span>
          <span className="rounded bg-destructive px-1.5 py-0.5 text-[9px] font-black uppercase text-destructive-foreground" aria-hidden="true">
            {e.weapon ?? "HIT"}
          </span>
          <span className="text-muted-foreground" aria-hidden="true">→</span>
          <span className="font-bold text-muted-foreground">{e.victim}</span>
        </div>
      ))}
    </div>
  );
}
