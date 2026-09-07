"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface DailyRewardsProps extends React.HTMLAttributes<HTMLDivElement> {
  claimed?: number;
  total?: number;
  onClaim?: (day: number) => void;
}

/** Daily rewards: 7-day claim strip with current-day action. */
export function DailyRewards({ claimed = 3, total = 7, onClaim, className, ...props }: DailyRewardsProps) {
  const current = Math.min(total, claimed + 1);
  return (
    <div role="list" aria-label="Daily rewards" className={cn("grid touch-none grid-cols-7 gap-1 select-none", className)} style={{ touchAction: "none" }} {...props}>
      {Array.from({ length: total }).map((_, i) => {
        const day = i + 1;
        const done = day <= claimed;
        const isCurrent = day === current;
        return (
          <button
            key={day}
            type="button"
            role="listitem"
            disabled={done}
            onClick={() => onClaim?.(day)}
            aria-label={done ? `Day ${day} claimed` : `Claim day ${day}`}
            className={cn(
              "flex min-h-11 touch-none flex-col items-center justify-center rounded-md border px-1 py-1.5 font-mono focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              done ? "border-border bg-secondary text-muted-foreground" : isCurrent ? "border-accent bg-accent/10 text-foreground" : "border-dashed border-border bg-card text-muted-foreground"
            )}
            style={{ touchAction: "none" }}
          >
            <span className="text-[9px] font-bold uppercase">D{day}</span>
            <span className="text-sm" aria-hidden="true">{done ? "✓" : "◈"}</span>
          </button>
        );
      })}
    </div>
  );
}
