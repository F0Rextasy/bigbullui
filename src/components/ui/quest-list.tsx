"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface Quest {
  id: string;
  title: string;
  progress: number;
  goal: number;
}

export interface QuestListProps extends React.HTMLAttributes<HTMLDivElement> {
  quests?: Quest[];
  onTrack?: (id: string) => void;
}

/** Quest list: objectives with progress bars and track buttons. */
export function QuestList({ quests, onTrack, className, ...props }: QuestListProps) {
  const fallback: Quest[] = [
    { id: "q1", title: "Win 3 matches", progress: 2, goal: 3 },
    { id: "q2", title: "Score 500 PTS", progress: 340, goal: 500 },
    { id: "q3", title: "Open 5 crates", progress: 5, goal: 5 },
  ];
  return (
    <div role="list" aria-label="Quest list" className={cn("w-full touch-none select-none space-y-2", className)} style={{ touchAction: "none" }} {...props}>
      {(quests ?? fallback).map((q) => {
        const pct = Math.max(0, Math.min(100, (q.progress / Math.max(1, q.goal)) * 100));
        const done = q.progress >= q.goal;
        return (
          <div key={q.id} role="listitem" className="rounded-md border border-border bg-card p-2.5">
            <div className="flex items-center justify-between gap-2">
              <p className="font-mono text-xs font-bold uppercase text-foreground">{q.title}</p>
              <button
                type="button"
                onClick={() => onTrack?.(q.id)}
                aria-label={`Track quest ${q.title}`}
                className="min-h-11 shrink-0 touch-none rounded-md border border-dashed border-border px-2.5 font-mono text-[10px] font-bold uppercase focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                style={{ touchAction: "none" }}
              >
                {done ? "Done" : "Track"}
              </button>
            </div>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-secondary" role="progressbar" aria-valuemin={0} aria-valuemax={q.goal} aria-valuenow={q.progress} aria-label={q.title}>
              <div className={cn("h-full transition-[width] duration-500 motion-reduce:transition-none", done ? "bg-emerald-500" : "bg-accent")} style={{ width: `${pct}%` }} />
            </div>
            <p className="mt-1 font-mono text-[10px] tabular-nums text-muted-foreground">{q.progress}/{q.goal}</p>
          </div>
        );
      })}
    </div>
  );
}
