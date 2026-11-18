"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface ConditionalFieldsProps extends React.HTMLAttributes<HTMLDivElement> {
  onModeChange?: (mode: string) => void;
}

/** Conditional fields: extra inputs appear based on ticket type. */
export function ConditionalFields({ onModeChange, className, ...props }: ConditionalFieldsProps) {
  const [mode, setMode] = React.useState("general");
  const uid = React.useId();
  const typeId = `${uid}-type`;
  const loungeId = `${uid}-lounge`;
  const sizeId = `${uid}-size`;
  return (
    <div className={cn("w-full max-w-sm space-y-2.5 rounded-lg border-2 border-foreground bg-card p-4", className)} {...props}>
      <label htmlFor={typeId} className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
        Ticket type
      </label>
      <select
        id={typeId}
        value={mode}
        onChange={(e) => {
          setMode(e.target.value);
          onModeChange?.(e.target.value);
        }}
        className="w-full rounded-md border-2 border-dashed border-border bg-background px-2.5 py-2 text-xs font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <option value="general">General admission</option>
        <option value="vip">VIP box</option>
        <option value="group">Group booking</option>
      </select>
      {mode === "vip" && (
        <div>
          <label htmlFor={loungeId} className="font-mono text-[10px] uppercase tracking-widest text-accent">Lounge choice</label>
          <input id={loungeId} placeholder="North lounge" className="mt-1 w-full rounded-md border border-border bg-background px-2.5 py-2 text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
        </div>
      )}
      {mode === "group" && (
        <div>
          <label htmlFor={sizeId} className="font-mono text-[10px] uppercase tracking-widest text-accent">Group size</label>
          <input id={sizeId} type="number" min={2} defaultValue={4} className="mt-1 w-full rounded-md border border-border bg-background px-2.5 py-2 font-mono text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
        </div>
      )}
      {mode === "general" && (
        <p className="rounded-md border border-dashed border-border px-2.5 py-2 font-mono text-[11px] text-muted-foreground">No extra fields needed.</p>
      )}
    </div>
  );
}
