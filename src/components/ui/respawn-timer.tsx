"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface RespawnTimerProps extends React.HTMLAttributes<HTMLDivElement> {
  seconds?: number;
  total?: number;
  onDone?: () => void;
}

/** Respawn timer: circular countdown ring with skip button. */
export function RespawnTimer({ seconds = 5, total = 10, onDone, className, ...props }: RespawnTimerProps) {
  const [left, setLeft] = React.useState(seconds);
  const pct = Math.max(0, Math.min(100, (left / Math.max(1, total)) * 100));
  React.useEffect(() => {
    setLeft(seconds);
  }, [seconds]);
  React.useEffect(() => {
    if (left <= 0) {
      onDone?.();
      return;
    }
    const t = setTimeout(() => setLeft((v) => v - 1), 1000);
    return () => clearTimeout(t);
  }, [left, onDone]);
  return (
    <div
      role="timer"
      aria-label={`Respawn in ${left} seconds`}
      className={cn("flex touch-none select-none items-center gap-3 rounded-md border-2 border-dashed border-border bg-card p-2", className)}
      style={{ touchAction: "none" }}
      {...props}
    >
      <span className="relative flex size-11 shrink-0 items-center justify-center rounded-full border-2 border-foreground font-mono text-sm font-black tabular-nums" aria-hidden="true">
        {left}
        <span className="absolute inset-0 rounded-full border-2 border-transparent border-t-accent transition-transform motion-reduce:transition-none" style={{ transform: `rotate(${(100 - pct) * 3.6}deg)` }} />
      </span>
      <div className="min-w-0 flex-1">
        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Respawning</p>
        <div className="mt-1 h-2 overflow-hidden rounded-full bg-secondary" aria-hidden="true">
          <div className="h-full bg-accent transition-[width] duration-500 motion-reduce:transition-none" style={{ width: `${pct}%` }} />
        </div>
      </div>
      <button
        type="button"
        onClick={() => setLeft(0)}
        className="min-h-11 shrink-0 touch-none rounded-md border border-foreground px-3 font-mono text-xs font-bold uppercase focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        style={{ touchAction: "none" }}
      >
        Skip
      </button>
    </div>
  );
}
