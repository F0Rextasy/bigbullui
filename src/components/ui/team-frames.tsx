"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface TeamFramesMember {
  id: string;
  name: string;
  role?: string;
  hp: number;
  maxHp?: number;
  status?: "ready" | "down" | "buffed";
  active?: boolean;
}

export interface TeamFramesProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  members: TeamFramesMember[];
  onSelect?: (id: string) => void;
}

const statusTone: Record<string, string> = {
  ready: "bg-emerald-500",
  down: "bg-destructive",
  buffed: "bg-accent",
};

/** Team frames: party roster with mini HP tracks, status dots and 44px select targets. */
export function TeamFrames({ members, onSelect, className, ...props }: TeamFramesProps) {
  return (
    <div role="list" aria-label="Party members" className={cn("grid w-full grid-cols-1 gap-2 sm:grid-cols-2", className)} {...props}>
      {members.map((m) => {
        const max = Math.max(1, m.maxHp ?? 100);
        const pct = Math.max(0, Math.min(100, (m.hp / max) * 100));
        return (
          <button
            key={m.id}
            type="button"
            role="listitem"
            onClick={() => onSelect?.(m.id)}
            aria-label={`${m.name}, ${m.hp} of ${max} health${m.status ? `, ${m.status}` : ""}`}
            className={cn(
              "flex min-h-11 items-center gap-2.5 rounded-lg border-2 border-dashed border-border bg-card p-2 text-left transition-colors hover:border-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none",
              m.active && "border-solid border-accent"
            )}
          >
            <span className="flex size-11 shrink-0 items-center justify-center rounded-md border border-foreground bg-secondary font-mono text-sm font-black text-foreground" aria-hidden="true">
              {m.name.slice(0, 1).toUpperCase()}
            </span>
            <span className="min-w-0 flex-1">
              <span className="flex items-center gap-1.5">
                <span className="truncate font-mono text-xs font-bold text-foreground">{m.name}</span>
                {m.status && (
                  <span className={cn("size-1.5 shrink-0 rounded-full", statusTone[m.status])} aria-hidden="true" />
                )}
              </span>
              {m.role && (
                <span className="block truncate font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                  {m.role}
                </span>
              )}
              <span className="mt-1 block h-1.5 overflow-hidden rounded-full bg-secondary" aria-hidden="true">
                <span
                  className={cn("block h-full rounded-full", pct <= 25 ? "bg-destructive" : "bg-emerald-500")}
                  style={{ width: `${pct}%` }}
                />
              </span>
            </span>
            <span className="shrink-0 font-mono text-[10px] tabular-nums text-muted-foreground" aria-hidden="true">
              {m.hp}
            </span>
          </button>
        );
      })}
    </div>
  );
}
