"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface LeaderboardEntry {
  rank: number;
  name: string;
  score: number;
  avatarInitials?: string;
}

export interface LeaderboardProps extends React.HTMLAttributes<HTMLDivElement> {
  entries: LeaderboardEntry[];
  className?: string;
}

export function Leaderboard({
  entries = [],
  className,
  ...props
}: LeaderboardProps) {
  return (
    <div
      className={cn(
        "w-full space-y-3",
        "motion-reduce:animate-none",
        className,
      )}
      {...props}
    >
      {entries.map((entry, idx) => {
        const medalClass =
          entry.rank === 1
            ? "bg-accent text-accent-foreground rounded-md font-bold"
            : entry.rank === 2
              ? "bg-secondary text-secondary-foreground rounded-md font-bold"
              : entry.rank === 3
                ? "bg-accent/15 text-accent-strong rounded-md font-bold"
                : "bg-card text-foreground rounded-md";

        const delay = idx * 60;

        return (
          <div
            key={entry.name}
            style={{ animationDelay: `${delay}ms` }}
            className="flex items-center gap-3 p-3 rounded-md border border-border/60 bg-card motion-reduce:transition-none motion-safe:animate-[stamp_0.3s_ease-out_both] motion-reduce:animate-none!"
          >
            {/* Rank badge */}
            <span
              className={cn(
                "w-8 h-8 flex items-center justify-center",
                medalClass,
                "text-[10px] uppercase font-medium",
              )}
            >
              {entry.rank}
            </span>

            {/* Avatar initials */}
            <span
              className={cn(
                "w-8 h-8 rounded-full",
                "bg-muted",
                "flex items-center justify-center text-[10px] font-medium",
              )}
            >
              {entry.avatarInitials || entry.name.split(" ").map(w => w[0]).join("")}
            </span>

            {/* Name */}
            <span
              className={cn(
                "font-mono text-[11px]",
                "text-foreground",
                "truncate",
                "w-32",
              )}
            >
              {entry.name}
            </span>

            {/* Score - count-up animation */}
            <span
              className={cn(
                "font-mono text-[10px] uppercase text-muted-foreground",
                "transition-all duration-500",
              )}
            >
              {entry.score}
            </span>
          </div>
        );
      })}
    </div>
  );
}