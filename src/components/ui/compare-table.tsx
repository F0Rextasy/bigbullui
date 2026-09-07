"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface CompareColumn {
  id: string;
  label: string;
  values: string[];
  highlight?: boolean;
}

export interface CompareTableProps extends React.HTMLAttributes<HTMLDivElement> {
  rows?: string[];
  columns?: CompareColumn[];
}

const FALLBACK_ROWS = ["Price", "Sections", "Refund window", "Lounge"];
const FALLBACK_COLS: CompareColumn[] = [
  { id: "ga", label: "General", values: ["$30", "Balcony", "24 hours", "No"] },
  { id: "vip", label: "VIP", values: ["$120", "Orchestra + Box", "7 days", "Yes"], highlight: true },
];

/** Side by side plan comparison with highlighted column. */
export function CompareTable({ rows = FALLBACK_ROWS, columns = FALLBACK_COLS, className, ...props }: CompareTableProps) {
  return (
    <div className={cn("w-full overflow-x-auto rounded-lg border-2 border-foreground bg-card shadow-md", className)} {...props}>
      <table className="w-full font-mono text-xs">
        <thead>
          <tr className="border-b-2 border-foreground">
            <th className="px-3 py-2 text-left text-[10px] uppercase text-muted-foreground">Feature</th>
            {columns.map((c) => (
              <th key={c.id} className={cn("px-3 py-2 text-center text-[11px] font-black uppercase", c.highlight ? "bg-accent text-accent-foreground" : "bg-secondary text-foreground")}>{c.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={r} className="border-b border-dashed border-border last:border-0">
              <td className="px-3 py-2 font-bold uppercase text-muted-foreground">{r}</td>
              {columns.map((c) => (
                <td key={c.id} className={cn("px-3 py-2 text-center text-foreground", c.highlight && "bg-accent/10 font-bold")}>{c.values[i] ?? "-"}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
