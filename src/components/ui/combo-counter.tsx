"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface ComboCounterProps extends React.HTMLAttributes<HTMLDivElement> {
  count?: number;
  best?: number;
}

/** Combo counter: hit streak readout with heat scaling. */
export function ComboCounter({ count = 12, best = 48, className, ...props }: ComboCounterProps) {
  const hot = count >= 20;
  return (
    <div
      role="status"
      aria-label={`${count} hit combo, best ${best}`}
      className={cn("inline-flex touch-none select-none items-center gap-2 rounded-md border-2 border-foreground bg-card px-3 py-2", className)}
      style={{ touchAction: "none" }}
      {...props}
    >
      <style>{`@keyframes comboPop { 0% { transform: scale(0.85); } 60% { transform: scale(1.08); } 100% { transform: scale(1); } }`}</style>
      <span key={count} className="animate-[comboPop_0.25s_ease-out] font-mono text-2xl font-black tabular-nums motion-reduce:animate-none" aria-hidden="true">
        {count}x
      </span>
      <span className="flex min-h-11 flex-col justify-center">
        <span className={cn("font-mono text-[10px] font-black uppercase tracking-[0.2em]", hot ? "text-accent" : "text-muted-foreground")}>
          {hot ? "Blazing" : "Combo"}
        </span>
        <span className="font-mono text-[10px] tabular-nums text-muted-foreground">BEST {best}</span>
      </span>
    </div>
  );
}
