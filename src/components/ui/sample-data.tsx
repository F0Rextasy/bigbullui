"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface SampleDataProps extends React.HTMLAttributes<HTMLDivElement> {
  onLoad?: () => void;
  onClear?: () => void;
}

/** Sample data stub: one-click demo seed loader with state stamp. */
export function SampleData({ onLoad, onClear, className, ...props }: SampleDataProps) {
  const [loaded, setLoaded] = React.useState(false);
  return (
    <div className={cn("w-full max-w-sm rounded-lg border border-dashed border-border bg-card p-4 text-center", className)} {...props}>
      <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">Demo dataset</span>
      <p className="mt-1 font-mono text-xs text-foreground">{loaded ? "12 demo stubs loaded" : "Start with sample stubs"}</p>
      <button
        type="button"
        onClick={() => { loaded ? (setLoaded(false), onClear?.()) : (setLoaded(true), onLoad?.()); }}
        className={cn("mt-2 w-full rounded-md px-3 py-1.5 font-mono text-[11px] font-bold uppercase tracking-wider focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", loaded ? "border border-dashed border-border text-muted-foreground" : "bg-accent text-accent-foreground")}
      >
        {loaded ? "Clear sample data" : "Load sample data"}
      </button>
    </div>
  );
}
