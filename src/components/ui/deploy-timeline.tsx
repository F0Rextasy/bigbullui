"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface DeployTimelineProps extends React.HTMLAttributes<HTMLDivElement> {
  steps?: { label: string; state: "done" | "active" | "todo"; meta?: string }[];
}

/** Deploy timeline stub: horizontal stamp rail of release phases. */
export function DeployTimeline({ steps = [{ label: "Build", state: "done", meta: "2m" }, { label: "Preview", state: "done", meta: "1m" }, { label: "Release", state: "active", meta: "live" }, { label: "Verify", state: "todo" }], className, ...props }: DeployTimelineProps) {
  return (
    <div className={cn("w-full max-w-lg rounded-lg border border-border bg-card p-4", className)} {...props}>
      <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">Deploy timeline</span>
      <ol className="mt-3 flex items-start" aria-label="Deploy phases">
        {steps.map((s, i) => (
          <li key={s.label} className="relative flex-1 text-center">
            {i > 0 && <span className={cn("absolute left-[-50%] top-2.5 h-px w-full border-t border-dashed", s.state === "todo" ? "border-border" : "border-accent")} aria-hidden="true" />}
            <span className={cn(
              "relative mx-auto flex size-5 items-center justify-center rounded-full border font-mono text-[9px] font-bold",
              s.state === "done" && "border-accent bg-accent text-accent-foreground",
              s.state === "active" && "border-accent text-accent animate-pulse motion-reduce:animate-none",
              s.state === "todo" && "border-border text-muted-foreground"
            )}>
              {s.state === "done" ? "✓" : i + 1}
            </span>
            <span className="mt-1 block font-mono text-[10px] font-bold uppercase text-foreground">{s.label}</span>
            {s.meta && <span className="block font-mono text-[9px] uppercase text-muted-foreground">{s.meta}</span>}
          </li>
        ))}
      </ol>
    </div>
  );
}
