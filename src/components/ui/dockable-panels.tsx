"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface DockablePanelsProps extends React.HTMLAttributes<HTMLDivElement> {
  panels?: string[];
}

/** Dockable panels stub: toggleable side panels around a stage. */
export function DockablePanels({ panels = ["Inspector", "Layers"], className, children, ...props }: DockablePanelsProps) {
  const [open, setOpen] = React.useState<string[]>(panels.slice(0, 1));
  const toggle = (p: string) => setOpen((o) => (o.includes(p) ? o.filter((x) => x !== p) : [...o, p]));
  return (
    <div className={cn("flex w-full gap-2 rounded-lg border border-border bg-card p-2", className)} {...props}>
      <div className="flex min-w-0 flex-1 items-center justify-center rounded-md border border-dashed border-border bg-background p-4 font-mono text-[11px] text-muted-foreground">
        {children ?? "Stage"}
      </div>
      <div className="flex shrink-0 flex-col gap-1.5" role="group" aria-label="Panels">
        {panels.map((p) => (
          <button
            key={p}
            type="button"
            aria-pressed={open.includes(p)}
            onClick={() => toggle(p)}
            className={cn("rounded-md border px-2 py-1 font-mono text-[10px] font-bold uppercase focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", open.includes(p) ? "border-accent bg-accent/10 text-accent" : "border-dashed border-border text-muted-foreground")}
          >
            {p}
          </button>
        ))}
      </div>
    </div>
  );
}
