"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface Reaction {
  emoji: string;
  count: number;
  active?: boolean;
}

export interface ReactionBarProps extends React.HTMLAttributes<HTMLDivElement> {
  reactions?: Reaction[];
  onReact?: (emoji: string) => void;
}

export const ReactionBar = React.forwardRef<HTMLDivElement, ReactionBarProps>(function ReactionBar(
  { reactions = [], onReact, className, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cn("flex flex-wrap gap-2", className)}
      role="group"
      aria-label="Reactions"
      {...props}
    >
      {reactions.map((reaction) => (
        <button
          key={reaction.emoji}
          type="button"
          onClick={() => onReact?.(reaction.emoji)}
          aria-pressed={Boolean(reaction.active)}
          aria-label={`${reaction.emoji} reaction, ${reaction.count} votes`}
          className={cn(
            "group relative flex shrink-0 cursor-pointer flex-col items-center gap-0.5 rounded-md border border-border px-3 py-1.5 transition-colors duration-150 hover:bg-accent/10 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none",
            reaction.active && "border-accent bg-accent/15 text-accent-strong",
          )}
        >
          <span className="text-lg" aria-hidden="true">
            {reaction.emoji}
          </span>
          <span className="font-mono text-[10px] uppercase text-muted-foreground" aria-hidden="true">
            {reaction.count}
          </span>
        </button>
      ))}
    </div>
  );
});
ReactionBar.displayName = "ReactionBar";
