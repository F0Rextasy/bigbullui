"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface StatsOverviewProps extends React.HTMLAttributes<HTMLDivElement> {
  tiles?: { label: string; value: string | number; delta?: { value: string; up: boolean }; spark?: number[] }[];
  tableTitle?: string;
  tableRows?: { label: string; value: string }[];
}

/** Dashboard overview layout: top KPI tiles + mini table + chart slot. */
export function StatsOverview({ tiles = [], tableTitle = "Recent records", tableRows = [], className, ...props }: StatsOverviewProps) {
  return (
    <div className={cn("space-y-4", className)} {...props}>
      <style>{`@keyframes soFade { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }`}</style>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {tiles.map((t, i) => (
          <div
            key={t.label}
            className="rounded-lg border border-border bg-card p-4 animate-[soFade_0.35s_ease-out_both] motion-reduce:animate-none transition-colors hover:border-foreground/30 motion-reduce:transition-none"
            style={{ animationDelay: `${i * 70}ms` }}
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">{t.label}</p>
            <div className="mt-1.5 flex items-end justify-between gap-2">
              <span className="font-mono text-xl font-bold tabular-nums">{t.value}</span>
              {t.delta && (
                <span className={cn("font-mono text-[10px] tabular-nums", t.delta.up ? "text-emerald-600" : "text-destructive")}>
                  {t.delta.up ? "▲" : "▼"} {t.delta.value}
                </span>
              )}
            </div>
            {t.spark && (
              <div className="mt-2 flex h-6 items-end gap-0.5" aria-hidden="true">
                {t.spark.map((v, j) => (
                  <span key={j} className="w-1 rounded-t-sm bg-accent/60" style={{ height: `${Math.max(12, v)}%`, transitionDelay: `${j * 30}ms` }} />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="rounded-lg border border-border bg-card animate-[soFade_0.35s_ease-out_0.2s_both] motion-reduce:animate-none">
          <div className="border-b border-border px-4 py-2.5">
            <h3 className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">{tableTitle}</h3>
          </div>
          <ul className="divide-y divide-border/60">
            {tableRows.slice(0, 5).map((r, i) => (
              <li key={r.label} className="flex items-center justify-between px-4 py-2 text-sm transition-colors hover:bg-secondary/30 motion-reduce:transition-none">
                <span className="truncate">{r.label}</span>
                <span className="font-mono text-xs tabular-nums text-muted-foreground">{r.value}</span>
              </li>
            ))}
            {tableRows.length === 0 && <li className="px-4 py-4 text-center text-xs text-muted-foreground">No records found</li>}
          </ul>
        </div>

        <div className="rounded-lg border border-dashed border-border bg-secondary/30 p-6 animate-[soFade_0.35s_ease-out_0.28s_both] motion-reduce:animate-none">
          <h3 className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">Analytics Overview</h3>
          <div className="mt-4 flex h-24 items-end gap-1.5" aria-hidden="true">
            {[35, 55, 42, 70, 58, 85, 64, 92, 78, 60, 88, 74].map((v, i) => (
              <span
                key={i}
                className="flex-1 rounded-t-sm bg-accent/50 transition-all duration-500 ease-out hover:bg-accent motion-reduce:transition-none"
                style={{ height: `${v}%`, transitionDelay: `${i * 40}ms` }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
