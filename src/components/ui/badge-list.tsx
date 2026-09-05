"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface BadgeAward {
  id: string;
  label: string;
  icon?: React.ReactNode;
  earned?: boolean;
}

export interface BadgeListProps extends React.HTMLAttributes<HTMLDivElement> {
  badges: BadgeAward[];
}

/** Başarı rozetleri grid'i: kilitli/açık durumları + açılma animasyonu. */
export function BadgeList({ badges, className, ...props }: BadgeListProps) {
  return (
    <div className={cn("grid grid-cols-3 gap-3 sm:grid-cols-4", className)} {...props}>
      <style>{`
        @keyframes blPop { 0% { transform: scale(0.5); opacity: 0; } 70% { transform: scale(1.12); opacity: 1; } 100% { transform: scale(1); opacity: 1; } }
        @keyframes blShine { 0% { transform: translateX(-120%) rotate(25deg); } 100% { transform: translateX(220%) rotate(25deg); } }
      `}</style>
      {badges.map((b, idx) => (
        <div
          key={b.id}
          className={cn(
            "relative flex flex-col items-center gap-1.5 rounded-lg border p-3 text-center",
            b.earned ? "border-accent/50 bg-accent/5" : "border-dashed border-border bg-secondary/30 opacity-60"
          )}
          style={{ animation: b.earned ? "blPop 0.4s cubic-bezier(0.34,1.56,0.64,1) both" : undefined, animationDelay: `${idx * 80}ms` }}
        >
          {b.earned && (
            <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-lg" aria-hidden="true">
              <span className="absolute inset-y-0 w-8 bg-gradient-to-r from-transparent via-accent/15 to-transparent" style={{ animation: "blShine 2.5s ease-in-out infinite", animationDelay: `${idx * 200}ms` }} />
            </span>
          )}
          <span className={cn("flex size-9 items-center justify-center rounded-full", b.earned ? "bg-accent text-accent-foreground" : "bg-border/40 text-muted-foreground")}>
            {b.icon ?? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill={b.earned ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="8" r="6" /><path d="M15.5 13l1.5 8-5-3-5 3 1.5-8" />
              </svg>
            )}
          </span>
          <span className={cn("text-[10px] font-medium leading-tight", b.earned ? "text-foreground" : "text-muted-foreground")}>{b.label}</span>
        </div>
      ))}
    </div>
  );
}
