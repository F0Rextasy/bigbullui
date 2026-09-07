"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface QuestTrackerProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  hint?: string;
  progress?: number;
  goal?: number;
}

/** Quest tracker: pinned HUD objective chip with mini bar. */
export function QuestTracker({ title = "Win 3 matches", hint = "Queue ranked", progress = 2, goal = 3, className, ...props }: QuestTrackerProps) {
  const pct = Math.max(0, Math.min(100, (progress / Math.max(1, goal)) * 100));
  return (
    <div role="status" aria-label={`${title} ${progress} of ${goal}`} className={cn("w-full touch-none select-none rounded-md border border-dashed border-border bg-card/95 p-2.5", className)} style={{ touchAction: "none" }} {...props}>
      <p className="font-mono text-[9px] font-bold uppercase tracking-[0.25em] text-accent">Tracked Quest</p>
      <p className="mt-0.5 truncate font-mono text-xs font-black uppercase text-foreground">{title}</p>
      <p className="truncate font-mono text-[11px] text-muted-foreground">{hint}</p>
      <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-secondary" role="progressbar" aria-valuemin={0} aria-valuemax={goal} aria-valuenow={progress} aria-label={title}>
        <div className="h-full bg-accent transition-[width] duration-500 motion-reduce:transition-none" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
