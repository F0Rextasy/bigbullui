"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface BattlePassTrackProps extends React.HTMLAttributes<HTMLDivElement> {
  tier?: number;
  total?: number;
  xp?: number;
  xpMax?: number;
}

/** Battle pass track: tier rail with progress fill. */
export function BattlePassTrack({ tier = 7, total = 20, xp = 640, xpMax = 1000, className, ...props }: BattlePassTrackProps) {
  const pct = Math.max(0, Math.min(100, (xp / Math.max(1, xpMax)) * 100));
  return (
    <div
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={xpMax}
      aria-valuenow={xp}
      aria-label={`Battle pass tier ${tier} of ${total}`}
      className={cn("w-full touch-none select-none rounded-md border-2 border-foreground bg-card p-2.5", className)}
      style={{ touchAction: "none" }}
      {...props}
    >
      <div className="flex items-center justify-between font-mono text-[10px] font-bold uppercase tracking-[0.2em]">
        <span className="text-muted-foreground">Pass</span>
        <span className="tabular-nums text-foreground">Tier {tier}/{total}</span>
      </div>
      <div className="mt-2 flex gap-1" aria-hidden="true">
        {Array.from({ length: total }).map((_, i) => (
          <span key={i} className={cn("h-11 min-w-2 flex-1 rounded-[2px]", i < tier ? "bg-accent" : "bg-secondary")} />
        ))}
      </div>
      <div className="mt-2 h-2 overflow-hidden rounded-full bg-secondary" aria-hidden="true">
        <div className="h-full bg-primary transition-[width] duration-500 motion-reduce:transition-none" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
