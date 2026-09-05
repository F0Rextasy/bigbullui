"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface ScoreboardTeam {
  id: string;
  name: string;
  score: number;
}

export interface ScoreKeeperProps extends React.HTMLAttributes<HTMLDivElement> {
  teams: [ScoreboardTeam, ScoreboardTeam];
  onScoreChange?: (teamId: string, delta: number) => void;
}

/** Skor tutucu: iki takım + +1/-1 butonları + rakam değişim animasyonu. */
export function ScoreKeeper({ teams, onScoreChange, className, ...props }: ScoreKeeperProps) {
  const [scores, setScores] = React.useState<[number, number]>([teams[0].score, teams[1].score]);
  const [pulse, setPulse] = React.useState<string | null>(null);

  const change = (teamIdx: 0 | 1, delta: number) => {
    const id = teams[teamIdx].id;
    setScores((prev) => {
      const next: [number, number] = [...prev];
      next[teamIdx] = Math.max(0, next[teamIdx] + delta);
      return next;
    });
    setPulse(`${id}-${delta}-${Date.now()}`);
    onScoreChange?.(id, delta);
  };

  return (
    <div className={cn("grid w-64 grid-cols-2 overflow-hidden rounded-lg border-2 border-dashed border-border bg-card divide-x-2 divide-dashed divide-border", className)} {...props}>
      <style>{`@keyframes skPulse { 0% { transform: scale(1.25); color: var(--accent); } 100% { transform: scale(1); } }`}</style>
      {teams.map((team, teamIdx) => (
        <div key={team.id} className="flex flex-col items-center gap-1 p-3">
          <p className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">{team.name}</p>
          <span
            key={`${team.id}-${scores[teamIdx]}`}
            className={cn("font-mono text-3xl font-black tabular-nums", pulse?.startsWith(team.id) && "animate-[skPulse_0.25s_ease-out] motion-reduce:animate-none")}
          >
            {scores[teamIdx]}
          </span>
          <div className="flex gap-1">
            <button
              onClick={() => change(teamIdx as 0 | 1, -1)}
              className="flex size-6 items-center justify-center rounded-sm border border-border font-mono text-xs text-muted-foreground transition-colors hover:border-destructive hover:text-destructive focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring motion-reduce:transition-none"
              aria-label={`${team.name} skoru azalt`}
            >
              −
            </button>
            <button
              onClick={() => change(teamIdx as 0 | 1, 1)}
              className="flex size-6 items-center justify-center rounded-sm border border-border font-mono text-xs text-muted-foreground transition-colors hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring motion-reduce:transition-none"
              aria-label={`${team.name} skoru artır`}
            >
              +
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
