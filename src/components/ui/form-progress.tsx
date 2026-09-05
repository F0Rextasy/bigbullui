"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface FormProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  total: number;
  completed: number;
  label?: string;
}

/** Form doldurma ilerlemesi: kesikli parça çubuklar + yüzde. */
export function FormProgress({ total, completed, label = "Tamamlanan", className, ...props }: FormProgressProps) {
  const pct = Math.min(100, Math.round((completed / Math.max(1, total)) * 100));

  return (
    <div className={cn("w-full", className)} {...props}>
      <style>{`@keyframes fpFill { from { transform: scaleX(0); } }`}</style>
      <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
        <span>{label}</span>
        <span className="tabular-nums">{completed}/{total} · %{pct}</span>
      </div>
      <div className="mt-1.5 flex gap-1" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} aria-label={label}>
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            className={cn(
              "h-1.5 flex-1 origin-left rounded-full border border-dashed transition-colors duration-300 motion-reduce:transition-none",
              i < completed ? "border-accent/60 bg-accent" : "border-border bg-transparent"
            )}
            style={i < completed ? { animation: "fpFill 0.4s cubic-bezier(0.16,1,0.3,1) both", animationDelay: `${i * 60}ms` } : undefined}
          />
        ))}
      </div>
    </div>
  );
}
