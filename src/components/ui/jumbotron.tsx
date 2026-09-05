"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface JumbotronProps {
  title?: string;
  home?: string;
  away?: string;
  score?: [number, number];
  className?: string;
}

export function Jumbotron({ title, home, away, score, className }: JumbotronProps) {
  const [homeScore, awayScore] = score || [0, 0];

  return (
    <div
      className={cn(
        "relative rounded-lg border border-border bg-card p-8 motion-reduce:transition-none",
        className
      )}
    >
      <div className="font-mono text-[24px] font-bold uppercase tracking-widest text-foreground mb-2">
        {title || "SCOREBOARD"}
      </div>

      <div className="flex justify-between text-muted-foreground text-[10px] uppercase tracking-wider mb-4">
        <span>{home}</span>
        <span>{away}</span>
      </div>

      {score && (
        <div className="font-mono text-[48px] font-bold text-foreground tracking-wider">
          {homeScore}-{awayScore}
        </div>
      )}
    </div>
  );
}