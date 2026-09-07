"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface LowHpPulseProps extends React.HTMLAttributes<HTMLDivElement> {
  active?: boolean;
  intensity?: number;
}

/** Low HP pulse: red edge glow that throbs while health is critical. */
export function LowHpPulse({ active = true, intensity = 1, className, children, ...props }: LowHpPulseProps) {
  return (
    <div
      role="status"
      aria-label={active ? "Low health warning" : "Health stable"}
      className={cn("relative w-full touch-none select-none overflow-hidden rounded-md border-2 border-destructive/70 bg-card", className)}
      style={{ touchAction: "none" }}
      {...props}
    >
      <style>{`@keyframes lowHp { 0%, 100% { opacity: 0.25; } 50% { opacity: 0.9; } }`}</style>
      {active && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 animate-[lowHp_1.1s_ease-in-out_infinite] bg-destructive/25 motion-reduce:animate-none"
          style={{ opacity: 0.25 * intensity + 0.25 }}
        />
      )}
      <div className="relative flex min-h-11 items-center justify-center gap-2 px-3 py-2 font-mono text-xs font-black uppercase tracking-[0.2em] text-destructive">
        <span aria-hidden="true" className="size-2 rounded-full bg-destructive" />
        Low HP
      </div>
      {children}
    </div>
  );
}
