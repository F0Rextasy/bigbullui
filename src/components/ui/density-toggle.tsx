"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface DensityToggleProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: "comfortable" | "compact";
  onValueChange?: (v: "comfortable" | "compact") => void;
}

/** Density toggle stub: comfortable vs compact segmented switch. */
export function DensityToggle({ value = "comfortable", onValueChange, className, ...props }: DensityToggleProps) {
  const [v, setV] = React.useState(value);
  const set = (next: "comfortable" | "compact") => { setV(next); onValueChange?.(next); };
  return (
    <div className={cn("inline-flex rounded-md border border-dashed border-border bg-card p-0.5", className)} role="group" aria-label="Density" {...props}>
      {(["comfortable", "compact"] as const).map((o) => (
        <button
          key={o}
          type="button"
          aria-pressed={v === o}
          onClick={() => set(o)}
          className={cn(
            "rounded px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-wider focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none",
            v === o ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
          )}
        >
          {o}
        </button>
      ))}
    </div>
  );
}
