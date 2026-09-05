"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface Reaction {
  emoji: string;
  count: number;
  active?: boolean;
}

export interface ReactionBarProps {
  reactions: Reaction[];
  onReact?: (emoji: string) => void;
}

const ReactionBar: React.FC<ReactionBarProps> = ({ reactions, onReact }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {reactions.map((reaction, idx) => (
        <div
          key={reaction.emoji}
          className={cn(
            "relative flex-0 flex flex-col items-center gap-1 px-3 py-1 rounded-md border border-border/30 hover:bg-accent/5 hover:text-accent-foreground transition-colors duration-200",
            reaction.active && "bg-accent/20 text-accent-foreground"
          )}
        >
          <span
            className={cn(
              "text-lg",
              "motion-reduce:animate-none"
            )}
          >
            {reaction.emoji}
          </span>
          <span
            className={cn(
              "text-[10px] mono uppercase text-muted-foreground",
              "motion-reduce:animate-none"
            )}
          >
            {reaction.count}
          </span>

          {/* Active pop animation */}
          {reaction.active && (
            <div
              className={cn(
                "absolute top-0 right-0 w-3 h-3 rounded-full bg-accent/30 animate-[scale_0.3s_ease-out] opacity-0"
              )}
            />
          )}

          {/* Hover tooltip */}
          <span
            className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-[8px] mono uppercase text-muted-foreground opacity-0 transition-opacity duration-150 group-hover:opacity-100"
          >
            {reaction.emoji} reaction
          </span>
        </div>
      ))}
    </div>
  );
};

export { ReactionBar };