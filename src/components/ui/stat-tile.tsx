"use client";

import * as React from "react";
import { cn } from "./lib/utils";
import { TiltCard } from "./tilt-card";

export interface StatTileProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  value: string | number;
  delta?: { value: string; up: boolean };
  spark?: number[];
}

/** Tek istatistik kutusu: büyük sayı + delta + mini spark çubukları. */
export function StatTile({ label, value, delta, spark, className, ...props }: StatTileProps) {
  return (
    <TiltCard maxTilt={4} glare={false} className={cn("p-4", className)} {...props}>
      <style>{`@keyframes statRise { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }`}</style>
      <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">{label}</p>
      <div className="mt-1.5 flex items-end justify-between gap-2">
        <span className="font-mono text-2xl font-bold tabular-nums animate-[statRise_0.4s_ease-out_both] motion-reduce:animate-none">{value}</span>
        {spark && (
          <span className="flex h-6 items-end gap-0.5" aria-hidden="true">
            {spark.map((v, i) => (
              <span
                key={i}
                className="w-1 rounded-t-sm bg-accent/70 transition-all duration-300 motion-reduce:transition-none"
                style={{ height: `${Math.max(10, v)}%`, animationDelay: `${i * 40}ms` }}
              />
            ))}
          </span>
        )}
      </div>
      {delta && (
        <p className={cn("mt-1 inline-flex items-center gap-1 font-mono text-[10px] tabular-nums", delta.up ? "text-emerald-600" : "text-destructive")}>
          <span aria-hidden="true">{delta.up ? "▲" : "▼"}</span> {delta.value}
        </p>
      )}
    </TiltCard>
  );
}

export interface KpiStripProps extends React.HTMLAttributes<HTMLDivElement> {
  tiles: Omit<StatTileProps, "className" | "style">[];
}

/** 3-5 metrik yatay şeridi. */
export function KpiStrip({ tiles, className, ...props }: KpiStripProps) {
  return (
    <div className={cn("grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4", className)} {...props}>
      {tiles.map((t, i) => (
        <div key={t.label} style={{ animationDelay: `${i * 80}ms` }}>
          <StatTile {...t} />
        </div>
      ))}
    </div>
  );
}
