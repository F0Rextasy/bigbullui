"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface FiltersDrawerProps extends React.HTMLAttributes<HTMLDivElement> {
  onApply?: (filters: string[]) => void;
}

/** Filters drawer stub: inline collapsible filter panel with counts. */
export function FiltersDrawer({ onApply, className, ...props }: FiltersDrawerProps) {
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<string[]>(["VIP"]);
  const options = ["VIP", "Orchestra", "Balcony", "Standby"];
  const toggle = (o: string) => setSelected((s) => (s.includes(o) ? s.filter((x) => x !== o) : [...s, o]));
  return (
    <div className={cn("w-full max-w-sm rounded-lg border border-border bg-card", className)} {...props}>
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between p-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">Filters{selected.length > 0 && ` · ${selected.length}`}</span>
        <span className="font-mono text-xs text-accent" aria-hidden="true">{open ? "−" : "+"}</span>
      </button>
      {open && (
        <div className="space-y-1.5 border-t border-dashed border-border p-3">
          {options.map((o) => (
            <label key={o} className="flex cursor-pointer items-center gap-2 rounded-md border border-dashed border-border px-2.5 py-1.5 font-mono text-xs text-foreground has-checked:border-accent">
              <input type="checkbox" checked={selected.includes(o)} onChange={() => toggle(o)} className="size-3.5 accent-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
              {o}
            </label>
          ))}
          <button
            type="button"
            onClick={() => onApply?.(selected)}
            className="mt-1 w-full rounded-md bg-primary px-3 py-1.5 font-mono text-[11px] font-bold uppercase tracking-wider text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Apply {selected.length} filters
          </button>
        </div>
      )}
    </div>
  );
}
