"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface EnvSwitcherProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: string;
  envs?: string[];
  onValueChange?: (v: string) => void;
}

/** Env switcher stub: segmented production vs staging ticket. */
export function EnvSwitcher({ value = "production", envs = ["production", "staging", "preview"], onValueChange, className, ...props }: EnvSwitcherProps) {
  const [v, setV] = React.useState(value);
  return (
    <div className={cn("inline-flex items-center gap-1 rounded-md border border-border bg-card p-1", className)} role="group" aria-label="Environment" {...props}>
      <span className={cn("size-2 rounded-full", v === "production" ? "bg-success" : "bg-warning")} aria-hidden="true" />
      {envs.map((e) => (
        <button
          key={e}
          type="button"
          aria-pressed={v === e}
          onClick={() => { setV(e); onValueChange?.(e); }}
          className={cn("rounded px-2 py-1 font-mono text-[10px] font-bold uppercase tracking-wider focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", v === e ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground")}
        >
          {e}
        </button>
      ))}
    </div>
  );
}
