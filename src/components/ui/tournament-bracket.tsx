"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface BracketMatch {
  id: string;
  a: string;
  b: string;
  winner?: "a" | "b";
}

export interface TournamentBracketProps extends React.HTMLAttributes<HTMLDivElement> {
  rounds?: BracketMatch[][];
}

/** Tournament bracket: rounds of head to head match cards. */
export function TournamentBracket({ rounds, className, ...props }: TournamentBracketProps) {
  const fallback: BracketMatch[][] = [
    [
      { id: "q1", a: "ADA", b: "REX", winner: "a" },
      { id: "q2", a: "ROW C", b: "MAX", winner: "b" },
    ],
    [{ id: "f1", a: "ADA", b: "MAX" }],
  ];
  const data = rounds ?? fallback;
  return (
    <div role="tree" aria-label="Tournament bracket" className={cn("flex touch-none select-none gap-3 overflow-x-auto pb-1", className)} style={{ touchAction: "none" }} {...props}>
      {data.map((round, ri) => (
        <div key={ri} role="group" aria-label={`Round ${ri + 1}`} className="flex min-w-44 flex-1 flex-col gap-2">
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Round {ri + 1}</p>
          {round.map((m) => (
            <div key={m.id} className="overflow-hidden rounded-md border border-border bg-card">
              {([["a", m.a], ["b", m.b]] as const).map(([side, name]) => (
                <div
                  key={side}
                  className={cn(
                    "flex min-h-11 items-center justify-between border-b border-dashed border-border px-2.5 font-mono text-xs font-bold last:border-0",
                    m.winner === side ? "bg-accent/10 text-foreground" : "text-muted-foreground"
                  )}
                >
                  <span>{name}</span>
                  {m.winner === side && (
                    <span className="rounded bg-accent px-1 text-[9px] font-black text-accent-foreground">W</span>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
