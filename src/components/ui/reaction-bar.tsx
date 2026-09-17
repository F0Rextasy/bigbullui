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
    <div className="flex flex-wrap gap-2" role="group" aria-label="Reactions">
      {reactions.map((reaction) => (
        <button
          key={reaction.emoji}
          type="button"
          onClick={() => onReact?.(reaction.emoji)}
          aria-pressed={reaction.active}
          aria-label={`${reaction.emoji} reaction, ${reaction.count} votes`}
          className={cn(
            "relative flex-0 flex cursor-pointer flex-col items-center gap-1 rounded-md border border-border/30 px-3 py-1 transition-colors duration-200 hover:bg-accent/5 hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none",
            reaction.active && "bg-accent/20 text-accent-foreground"
          )}
        >
          <span
            className={cn(
              "text-lg",
              "motion-reduce:animate-none"
            )}
            aria-hidden="true"
          >
            {reaction.emoji}
          </span>
          <span
            className={cn(
              "text-[10px] mono uppercase text-muted-foreground",
              "motion-reduce:animate-none"
            )}
            aria-hidden="true"
          >
            {reaction.count}
          </span>

          {/* Active pop animation */}
          {reaction.active && (
            <span
              aria-hidden="true"
              className={cn(
                "absolute top-0 right-0 h-3 w-3 rounded-full bg-accent/30 animate-[scale_0.3s_ease-out] opacity-0"
              )}
            />
          )}

          {/* Hover tooltip */}
          <span
            aria-hidden="true"
            className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-[8px] mono uppercase text-muted-foreground opacity-0 transition-opacity duration-150 group-hover:opacity-100"
          >
            {reaction.emoji} reaction
          </span>
        </button>
      ))}
    </div>
  );
};

export { ReactionBar };