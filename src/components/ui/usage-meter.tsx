"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface UsageMeterProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  used: number;
  limit: number;
  unit?: string;
}

/** Kota göstergesi: doluluk çubuğu + yüzde + aşım uyarısı. */
export function UsageMeter({ label, used, limit, unit = "", className, ...props }: UsageMeterProps) {
  const pct = Math.min(100, Math.round((used / Math.max(1, limit)) * 100));
  const tone = pct >= 100 ? "bg-destructive" : pct >= 80 ? "bg-amber-500" : "bg-accent";
  const over = used > limit;

  return (
    <div className={cn("w-full max-w-sm rounded-lg border border-border bg-card p-4", className)} {...props}>
      <style>{`
        @keyframes usageGrow { from { width: 0; } }
        @keyframes usagePulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
      `}</style>
      <div className="flex items-baseline justify-between">
        <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">{label}</span>
        <span className="font-mono text-xs tabular-nums text-foreground">
          {used.toLocaleString("tr-TR")}<span className="text-muted-foreground"> / {limit.toLocaleString("tr-TR")} {unit}</span>
        </span>
      </div>
      <div className="mt-2 h-2 overflow-hidden rounded-full bg-border/50" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} aria-label={label}>
        <div
          className={cn("h-full rounded-full transition-all duration-700 ease-out motion-reduce:transition-none", tone)}
          style={{ width: `${pct}%`, animation: "usageGrow 0.7s cubic-bezier(0.16,1,0.3,1) both" }}
        />
      </div>
      <div className="mt-1.5 flex items-center justify-between">
        <span className="font-mono text-[10px] tabular-nums text-muted-foreground">%{pct}</span>
        {over && (
          <span className="font-mono text-[10px] uppercase tracking-wider text-destructive animate-[usagePulse_1.2s_ease-in-out_infinite] motion-reduce:animate-none">
            Limit aşıldı
          </span>
        )}
        {!over && pct >= 80 && <span className="font-mono text-[10px] text-amber-600">Limite yaklaşıyorsun</span>}
      </div>
    </div>
  );
}
