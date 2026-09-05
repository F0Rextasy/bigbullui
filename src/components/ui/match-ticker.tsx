"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface MatchTickerEntry {
  id: string;
  home: string;
  away: string;
  homeScore: number;
  awayScore: number;
  live?: boolean;
}

export interface MatchTickerProps extends React.HTMLAttributes<HTMLDivElement> {
  matches: MatchTickerEntry[];
}

/** Match ticker tape: live scores + LIVE indicator badge. */
export function MatchTicker({ matches, className, ...props }: MatchTickerProps) {
  const doubled = [...matches, ...matches];

  return (
    <div className={cn("w-full overflow-hidden rounded-md border border-border bg-card", className)} {...props}>
      <style>{`@keyframes mtScroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
      <div className="flex w-max gap-6 px-4 py-2" style={{ animation: matches.length > 2 ? "mtScroll 18s linear infinite" : undefined }}>
        {doubled.map((m, idx) => (
          <div key={`${m.id}-${idx}`} className="flex shrink-0 items-center gap-2 font-mono text-xs">
            {m.live && (
              <span className="inline-flex items-center gap-1 rounded-full bg-destructive/15 px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wider text-destructive">
                <span className="size-1 rounded-full bg-destructive animate-pulse motion-reduce:animate-none" /> LIVE
              </span>
            )}
            <span className="font-medium">{m.home}</span>
            <span className="rounded-sm bg-secondary px-1.5 py-0.5 font-bold tabular-nums text-foreground">
              {m.homeScore} – {m.awayScore}
            </span>
            <span className="font-medium">{m.away}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
