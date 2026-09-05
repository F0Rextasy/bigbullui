"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface SummaryRow {
  id: string;
  label: string;
  value: string;
  /** Emphasized bold total summary row */
  bold?: boolean;
}

export interface TableSummaryProps extends React.HTMLAttributes<HTMLDivElement> {
  rows: SummaryRow[];
  caption?: string;
}

/** Table summary card: line items + bold total with dashed border. */
export function TableSummary({ rows, caption, className, ...props }: TableSummaryProps) {
  return (
    <div className={cn("w-full max-w-sm rounded-lg border-2 border-dashed border-border bg-card p-4", className)} {...props}>
      <style>{`@keyframes tsIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }`}</style>
      {caption && <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">{caption}</p>}
      <dl className="space-y-1.5">
        {rows.map((row, idx) => (
          <div
            key={row.id}
            className={cn(
              "flex items-center justify-between gap-4 animate-[tsIn_0.3s_ease-out_both] motion-reduce:animate-none",
              row.bold && "border-t border-dashed border-border pt-2"
            )}
            style={{ animationDelay: `${idx * 50}ms` }}
          >
            <dt className={cn("text-sm", row.bold ? "font-semibold text-foreground" : "text-muted-foreground")}>{row.label}</dt>
            <dd className={cn("font-mono text-sm tabular-nums", row.bold ? "font-bold text-accent" : "text-foreground")}>{row.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
