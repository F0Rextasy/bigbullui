"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface PollResultOption {
  id: string;
  label: string;
  votes: number;
  mine?: boolean;
}

export interface PollResultsProps extends React.HTMLAttributes<HTMLDivElement> {
  question?: string;
  options?: PollResultOption[];
}

/** Poll results: read-only animated percentage bars with winner stamp. */
export function PollResults({
  question = "Best curtain time?",
  options = [
    { id: "p1", label: "19:30 Evening", votes: 142, mine: true },
    { id: "p2", label: "21:00 Late", votes: 98 },
    { id: "p3", label: "Matinee 14:00", votes: 61 },
  ],
  className,
  ...props
}: PollResultsProps) {
  const total = options.reduce((s, o) => s + o.votes, 0);
  const winner = options.reduce((a, b) => (b.votes > a.votes ? b : a), options[0]);
  return (
    <div className={cn("w-full max-w-sm rounded-lg border-2 border-foreground bg-card p-4", className)} {...props}>
      <style>{`@keyframes pollGrow { from { width: 0; } }`}</style>
      <h3 className="text-sm font-black">{question}</h3>
      <p className="mt-0.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{total} total votes</p>
      <div className="mt-3 space-y-2">
        {options.map((o) => {
          const pct = total > 0 ? Math.round((o.votes / total) * 100) : 0;
          const isWin = winner && o.id === winner.id;
          return (
            <div key={o.id} className={cn("rounded-md border px-3 py-2", isWin ? "border-accent" : "border-dashed border-border")}>
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-bold">
                  {o.mine && <span className="mr-1 text-accent" aria-hidden="true">✓</span>}
                  {o.label}
                </span>
                <span className="font-mono text-xs font-bold tabular-nums">{pct}%</span>
              </div>
              <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-secondary" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} aria-label={o.label}>
                <div
                  className={cn("h-full rounded-full", isWin ? "bg-accent" : "bg-foreground/60")}
                  style={{ width: `${pct}%`, animation: "pollGrow 0.6s cubic-bezier(0.16,1,0.3,1) both" }}
                />
              </div>
              <p className="mt-1 font-mono text-[10px] text-muted-foreground">
                {o.votes} votes{isWin ? " · WINNER" : ""}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
