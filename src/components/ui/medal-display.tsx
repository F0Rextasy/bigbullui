"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface MedalDisplayEntry {
  id: string;
  label: string;
  tier: "gold" | "silver" | "bronze";
  count?: number;
}

export interface MedalDisplayProps extends React.HTMLAttributes<HTMLDivElement> {
  medals: MedalDisplayEntry[];
}

const TIER = {
  gold: { bg: "bg-amber-400/20", border: "border-amber-400/60", text: "text-amber-600", icon: "🥇" },
  silver: { bg: "bg-slate-400/15", border: "border-slate-400/50", text: "text-slate-500", icon: "🥈" },
  bronze: { bg: "bg-orange-400/15", border: "border-orange-400/50", text: "text-orange-600", icon: "🥉" },
};

/** Madalya panosu: altın/gümüş/bronz şeritler + parıltı. */
export function MedalDisplay({ medals, className, ...props }: MedalDisplayProps) {
  return (
    <div className={cn("w-full max-w-sm space-y-2", className)} {...props}>
      <style>{`@keyframes mdShine { 0% { transform: translateX(-120%); } 100% { transform: translateX(220%); } }`}</style>
      {medals.map((m, idx) => {
        const t = TIER[m.tier];
        return (
          <div
            key={m.id}
            className={cn(
              "relative flex items-center gap-3 overflow-hidden rounded-lg border p-3",
              t.bg, t.border
            )}
            style={{ animation: `fade-in-up 0.35s ease-out both`, animationDelay: `${idx * 90}ms` }}
          >
            <span className="relative text-2xl" aria-hidden="true">
              {t.icon}
              <span className="absolute inset-0 overflow-hidden">
                <span className="absolute inset-y-0 w-4 bg-white/30" style={{ animation: "mdShine 2.8s ease-in-out infinite", animationDelay: `${idx * 300}ms` }} />
              </span>
            </span>
            <span className="min-w-0 flex-1">
              <span className={cn("block truncate text-sm font-semibold", t.text)}>{m.label}</span>
            </span>
            {m.count !== undefined && (
              <span className={cn("shrink-0 font-mono text-lg font-bold tabular-nums", t.text)}>×{m.count}</span>
            )}
          </div>
        );
      })}
    </div>
  );
}
