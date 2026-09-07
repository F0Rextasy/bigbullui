"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface BulkActionsProps extends React.HTMLAttributes<HTMLDivElement> {
  count?: number;
  onAction?: (action: string) => void;
  onClear?: () => void;
}

/** Bulk actions stub: selection count bar with stamp actions. */
export function BulkActions({ count = 3, onAction, onClear, className, ...props }: BulkActionsProps) {
  if (count === 0) return null;
  const actions = ["Admit", "Void", "Export"];
  return (
    <div className={cn("flex w-full max-w-lg flex-wrap items-center gap-2 rounded-lg border border-accent/50 bg-card px-3 py-2 outline-1 outline-dashed outline-offset-[-5px] outline-accent/40", className)} role="toolbar" aria-label="Bulk actions" {...props}>
      <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-foreground">{count} selected</span>
      <span className="hidden h-4 w-px bg-border sm:block" aria-hidden="true" />
      {actions.map((a) => (
        <button
          key={a}
          type="button"
          onClick={() => onAction?.(a)}
          className="rounded-md border border-dashed border-border bg-background px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-foreground hover:border-accent/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {a}
        </button>
      ))}
      <button type="button" onClick={onClear} className="ml-auto font-mono text-[10px] uppercase text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
        Clear
      </button>
    </div>
  );
}
