"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface Milestone {
  id: string;
  label: string;
  date: string;
  reached?: boolean;
}

export interface MilestoneChartProps extends React.HTMLAttributes<HTMLDivElement> {
  milestones: Milestone[];
}

/** Kilometre taşı grafiği: yatay çizgi üzerinde ulaşılan/aşılan noktalar. */
export function MilestoneChart({ milestones, className, ...props }: MilestoneChartProps) {
  const reachedCount = milestones.filter((m) => m.reached).length;
  const pct = Math.round((reachedCount / Math.max(1, milestones.length)) * 100);

  return (
    <div className={cn("w-full max-w-md px-2 py-4", className)} {...props}>
      <style>{`
        @keyframes mcLine { from { transform: scaleX(0); } }
        @keyframes mcPop { 0% { transform: scale(0); } 70% { transform: scale(1.25); } 100% { transform: scale(1); } }
      `}</style>
      <div className="relative">
        {/* Ana çizgi */}
        <div className="absolute left-0 right-0 top-2.5 h-0.5 rounded-full bg-border/60" aria-hidden="true" />
        {/* Dolu kısım */}
        <div
          className="absolute left-0 top-2.5 h-0.5 origin-left rounded-full bg-accent"
          style={{ width: `${pct}%`, animation: "mcLine 0.7s cubic-bezier(0.16,1,0.3,1) both" }}
          aria-hidden="true"
        />
        {/* Noktalar */}
        <div className="relative flex justify-between">
          {milestones.map((m, idx) => (
            <div key={m.id} className="flex flex-col items-center gap-1.5" style={{ width: `${100 / milestones.length}%` }}>
              <span
                className={cn(
                  "size-5 rounded-full border-2",
                  m.reached ? "border-accent bg-accent text-accent-foreground" : "border-border bg-card"
                )}
                style={{ animation: m.reached ? `mcPop 0.35s ease-out both` : undefined, animationDelay: `${idx * 120}ms` }}
                aria-hidden="true"
              >
                {m.reached && (
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mt-0.5"><path d="M20 6L9 17l-5-5" /></svg>
                )}
              </span>
              <span className="text-center">
                <span className={cn("block text-[11px] leading-tight", m.reached ? "font-medium text-foreground" : "text-muted-foreground")}>{m.label}</span>
                <span className="block font-mono text-[9px] text-muted-foreground">{m.date}</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
