"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface KpiStripTile {
  label: string;
  value: string | number;
  delta?: { value: string; up: boolean };
  spark?: number[];
}

export interface KpiStripProps extends React.HTMLAttributes<HTMLDivElement> {
  tiles: KpiStripTile[];
}

/** Horizontal KPI summary strip: responsive grid of metric tiles with delta and spark bars. */
export function KpiStrip({ tiles, className, ...props }: KpiStripProps) {
  return (
    <div
      role="list"
      aria-label="Key metrics"
      className={cn("grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4", className)}
      {...props}
    >
      <style>{`@keyframes kpiRise { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }`}</style>
      {tiles.map((tile, i) => (
        <div
          key={tile.label}
          role="listitem"
          className="rounded-lg border-2 border-foreground bg-card p-4 shadow-xs outline-1 outline-dashed outline-offset-[-5px] outline-border animate-[kpiRise_0.4s_ease-out_both] motion-reduce:animate-none"
          style={{ animationDelay: `${i * 80}ms` }}
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">{tile.label}</p>
          <div className="mt-1.5 flex items-end justify-between gap-2">
            <span className="font-mono text-2xl font-bold tabular-nums text-foreground">{tile.value}</span>
            {tile.spark && tile.spark.length > 0 && (
              <span className="flex h-6 items-end gap-0.5" aria-hidden="true">
                {tile.spark.map((v, j) => (
                  <span
                    key={j}
                    className="w-1 rounded-t-sm bg-accent/70"
                    style={{ height: `${Math.max(10, Math.min(100, v))}%` }}
                  />
                ))}
              </span>
            )}
          </div>
          {tile.delta && (
            <p
              className={cn(
                "mt-1 inline-flex items-center gap-1 font-mono text-[10px] tabular-nums",
                tile.delta.up ? "text-success" : "text-destructive"
              )}
            >
              <span aria-hidden="true">{tile.delta.up ? "▲" : "▼"}</span> {tile.delta.value}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
