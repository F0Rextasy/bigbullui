"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface PivotRow {
  section: string;
  tier: string;
  sold: number;
}

export interface PivotLiteProps extends React.HTMLAttributes<HTMLDivElement> {
  rows?: PivotRow[];
}

const FALLBACK: PivotRow[] = [
  { section: "Orchestra", tier: "VIP", sold: 120 },
  { section: "Orchestra", tier: "Standard", sold: 340 },
  { section: "Balcony", tier: "VIP", sold: 60 },
  { section: "Balcony", tier: "Standard", sold: 410 },
];

/** Mini pivot table summing sales by section and tier. */
export function PivotLite({ rows = FALLBACK, className, ...props }: PivotLiteProps) {
  const sections = React.useMemo(() => [...new Set(rows.map((r) => r.section))], [rows]);
  const tiers = React.useMemo(() => [...new Set(rows.map((r) => r.tier))], [rows]);
  const cell = (s: string, t: string) => rows.filter((r) => r.section === s && r.tier === t).reduce((n, r) => n + r.sold, 0);
  const total = rows.reduce((n, r) => n + r.sold, 0);
  return (
    <div className={cn("w-full overflow-x-auto rounded-lg border-2 border-foreground bg-card shadow-md", className)} {...props}>
      <table className="w-full font-mono text-xs">
        <thead>
          <tr className="border-b-2 border-foreground bg-secondary">
            <th className="px-3 py-2 text-left text-[10px] uppercase text-muted-foreground">Section</th>
            {tiers.map((t) => <th key={t} className="px-3 py-2 text-right text-[10px] uppercase text-muted-foreground">{t}</th>)}
            <th className="px-3 py-2 text-right text-[10px] uppercase text-accent">Total</th>
          </tr>
        </thead>
        <tbody>
          {sections.map((s) => (
            <tr key={s} className="border-b border-dashed border-border last:border-0">
              <td className="px-3 py-2 font-bold uppercase text-foreground">{s}</td>
              {tiers.map((t) => <td key={t} className="px-3 py-2 text-right tabular-nums text-foreground">{cell(s, t)}</td>)}
              <td className="px-3 py-2 text-right font-bold tabular-nums text-accent">{rows.filter((r) => r.section === s).reduce((n, r) => n + r.sold, 0)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="bg-secondary/60">
            <td className="px-3 py-2 font-bold uppercase text-foreground">All</td>
            {tiers.map((t) => <td key={t} className="px-3 py-2 text-right font-bold tabular-nums text-foreground">{rows.filter((r) => r.tier === t).reduce((n, r) => n + r.sold, 0)}</td>)}
            <td className="px-3 py-2 text-right font-black tabular-nums text-accent">{total}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
