"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface TrophyShelfProps extends React.HTMLAttributes<HTMLDivElement> {
  trophies: { id: string; label: string; year: string; earned?: boolean }[];
}

/** Kupa rafı: kazanılan kupalar + parıltı + boş slotlar. */
export function TrophyShelf({ trophies, className, ...props }: TrophyShelfProps) {
  return (
    <div className={cn("w-full max-w-sm", className)} {...props}>
      <style>{`@keyframes trIn { 0% { transform: translateY(-14px) scale(0.8); opacity: 0; } 70% { transform: translateY(2px) scale(1.05); opacity: 1; } 100% { transform: translateY(0) scale(1); opacity: 1; } }`}</style>
      <div className="rounded-lg border-2 border-dashed border-border bg-card p-4">
        <div className="flex items-end justify-around gap-2">
          {trophies.map((t, idx) => (
            <div key={t.id} className="flex flex-col items-center gap-1" style={{ width: `${100 / trophies.length}%` }}>
              <span
                className={cn("text-3xl", !t.earned && "opacity-25 grayscale")}
                style={t.earned ? { animation: `trIn 0.5s cubic-bezier(0.34,1.56,0.64,1) both`, animationDelay: `${idx * 120}ms` } : undefined}
                aria-hidden="true"
              >
                🏆
              </span>
              <span className={cn("h-1 w-full rounded-full", t.earned ? "bg-accent" : "bg-border/40")} aria-hidden="true" />
              <span className={cn("text-center text-[9px] font-medium leading-tight", t.earned ? "text-foreground" : "text-muted-foreground")}>{t.label}</span>
              <span className="font-mono text-[8px] text-muted-foreground">{t.year}</span>
            </div>
          ))}
        </div>
        <p className="mt-2 text-center font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
          {trophies.filter((t) => t.earned).length}/{trophies.length} kazanılan
        </p>
      </div>
    </div>
  );
}
