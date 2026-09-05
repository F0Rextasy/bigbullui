"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface BulletChartProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  /** gerçekleşen değer */
  value: number;
  /** hedef değeri */
  target: number;
  max: number;
  unit?: string;
}

/** Hedef vs gerçekleşme çubuğu: değer çubuğu + hedef işareti. */
export function BulletChart({ label, value, target, max, unit = "", className, ...props }: BulletChartProps) {
  const vpct = Math.min(100, (value / max) * 100);
  const tpct = Math.min(100, (target / max) * 100);
  const hit = value >= target;

  return (
    <div className={cn("w-full max-w-md", className)} {...props}>
      <style>{`@keyframes bltGrow { from { width: 0; } }`}</style>
      <div className="flex items-baseline justify-between">
        <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">{label}</span>
        <span className="font-mono text-xs tabular-nums">
          <span className={hit ? "text-emerald-600" : "text-amber-600"}>{value.toLocaleString("tr-TR")}{unit}</span>
          <span className="text-muted-foreground"> / {target.toLocaleString("tr-TR")}{unit} hedef</span>
        </span>
      </div>
      <div className="relative mt-2 h-4 overflow-hidden rounded-sm border border-border bg-secondary/50">
        {/* Aralık çubukları */}
        <div className="absolute inset-y-0 left-0 w-1/3 bg-secondary/60" aria-hidden="true" />
        <div className="absolute inset-y-0 left-1/3 w-1/3 bg-secondary/40" aria-hidden="true" />
        {/* Değer çubuğu */}
        <div
          className={cn("absolute inset-y-0 left-0 rounded-r-sm transition-all duration-700 ease-out motion-reduce:transition-none", hit ? "bg-emerald-500/70" : "bg-accent/70")}
          style={{ width: `${vpct}%`, animation: "bltGrow 0.7s cubic-bezier(0.16,1,0.3,1) both" }}
        />
        {/* Hedef işareti */}
        <div className="absolute inset-y-0 w-0.5 bg-foreground" style={{ left: `${tpct}%` }} aria-hidden="true" />
      </div>
      {!hit && (
        <p className="mt-1 font-mono text-[9px] text-amber-600">
          Hedefe {(target - value).toLocaleString("tr-TR")}{unit} kaldı
        </p>
      )}
    </div>
  );
}
