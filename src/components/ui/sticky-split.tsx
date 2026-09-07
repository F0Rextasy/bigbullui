"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface StickySplitProps extends React.HTMLAttributes<HTMLDivElement> {
  left?: React.ReactNode;
  right?: React.ReactNode;
}

/** Sticky split stub: two-pane frame with sticky side rail. */
export function StickySplit({ left, right, className, children, ...props }: StickySplitProps) {
  return (
    <div className={cn("grid w-full gap-3 sm:grid-cols-[180px_1fr]", className)} {...props}>
      <aside className="sm:sticky sm:top-2 h-fit rounded-lg border border-dashed border-border bg-card p-3">
        <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">Rail</span>
        <div className="mt-1 font-mono text-xs text-foreground">{left ?? "Sticky nav stub"}</div>
      </aside>
      <div className="min-w-0 rounded-lg border border-border bg-card p-3">
        {right ?? children ?? <p className="font-mono text-xs text-muted-foreground">Main column stub</p>}
      </div>
    </div>
  );
}
