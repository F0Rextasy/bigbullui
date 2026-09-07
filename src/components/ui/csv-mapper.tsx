"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface CsvMapperProps extends React.HTMLAttributes<HTMLDivElement> {
  columns?: string[];
  fields?: string[];
  onMap?: (mapping: Record<string, string>) => void;
}

/** CSV mapper stub: column-to-field select rows with count. */
export function CsvMapper({ columns = ["col_a", "col_b", "col_c"], fields = ["Name", "Email", "Seat", "Skip"], onMap, className, ...props }: CsvMapperProps) {
  const [mapping, setMapping] = React.useState<Record<string, string>>({ col_a: "Name", col_b: "Skip", col_c: "Seat" });
  const mapped = Object.values(mapping).filter((v) => v !== "Skip").length;
  return (
    <div className={cn("w-full max-w-md rounded-lg border border-border bg-card p-3", className)} {...props}>
      <div className="flex items-baseline justify-between">
        <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">CSV mapper</span>
        <span className="font-mono text-[11px] tabular-nums text-accent">{mapped}/{columns.length} mapped</span>
      </div>
      <ul className="mt-2 space-y-1.5">
        {columns.map((c) => (
          <li key={c} className="flex items-center gap-2">
            <span className="min-w-0 flex-1 truncate rounded border border-dashed border-border bg-background px-2 py-1.5 font-mono text-[11px] text-foreground">{c}</span>
            <span className="font-mono text-muted-foreground" aria-hidden="true">→</span>
            <select
              value={mapping[c] ?? "Skip"}
              onChange={(e) => { const n = { ...mapping, [c]: e.target.value }; setMapping(n); onMap?.(n); }}
              aria-label={`Map ${c}`}
              className="rounded-md border border-border bg-background px-2 py-1.5 font-mono text-[11px] text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {fields.map((f) => (
                <option key={f} value={f}>{f}</option>
              ))}
            </select>
          </li>
        ))}
      </ul>
    </div>
  );
}
