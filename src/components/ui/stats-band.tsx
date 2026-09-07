"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface StatBandItem {
  label: string;
  value: string;
  delta?: string;
}

export interface StatsBandProps extends React.HTMLAttributes<HTMLDivElement> {
  stats?: StatBandItem[];
}

/** Stats band: horizontal KPI strip with delta chips. */
export function StatsBand({
  stats = [
    { label: "Sold", value: "8,492", delta: "+12%" },
    { label: "Gates", value: "6", delta: "Live" },
    { label: "Revenue", value: "$214k", delta: "+8%" },
  ],
  className,
  ...props
}: StatsBandProps) {
  return (
    <div className={cn("grid w-full max-w-2xl grid-cols-1 divide-y divide-dashed divide-border rounded-lg border-2 border-foreground bg-card sm:grid-cols-3 sm:divide-x sm:divide-y-0", className)} {...props}>
      {stats.map((s) => (
        <div key={s.label} className="p-4 text-center">
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{s.label}</p>
          <p className="mt-0.5 font-mono text-xl font-black tabular-nums">{s.value}</p>
          {s.delta && (
            <span className="mt-1 inline-block rounded-full bg-accent/10 px-2 py-0.5 font-mono text-[10px] font-bold text-accent">
              {s.delta}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
