"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface FeedbackVoteProps extends React.HTMLAttributes<HTMLDivElement> {
  upLabel?: string;
  downLabel?: string;
  onVote?: (vote: "up" | "down") => void;
}

/** Up and down vote pair with live tally stamp. */
export function FeedbackVote({ upLabel = "Useful", downLabel = "Off", onVote, className, ...props }: FeedbackVoteProps) {
  const [vote, setVote] = React.useState<"up" | "down" | null>(null);
  const [tally, setTally] = React.useState(42);
  const cast = (v: "up" | "down") => {
    if (vote === v) return;
    setTally((t) => t + (v === "up" ? 1 : -1) - (vote === "up" ? 1 : vote === "down" ? -1 : 0));
    setVote(v);
    onVote?.(v);
  };
  return (
    <div className={cn("flex items-center gap-2", className)} {...props}>
      <button
        type="button"
        aria-pressed={vote === "up"}
        onClick={() => cast("up")}
        className={cn(
          "rounded-md border-2 border-dashed px-3 py-1 font-mono text-xs font-bold uppercase focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          vote === "up" ? "border-solid border-foreground bg-primary text-primary-foreground" : "border-border bg-card text-muted-foreground hover:text-foreground"
        )}
      >
        Approve {upLabel}
      </button>
      <span className="rounded bg-secondary px-2 py-1 font-mono text-xs font-bold text-accent" aria-live="polite">{tally}</span>
      <button
        type="button"
        aria-pressed={vote === "down"}
        onClick={() => cast("down")}
        className={cn(
          "rounded-md border-2 border-dashed px-3 py-1 font-mono text-xs font-bold uppercase focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          vote === "down" ? "border-solid border-destructive bg-destructive text-white" : "border-border bg-card text-muted-foreground hover:text-foreground"
        )}
      >
        Reject {downLabel}
      </button>
    </div>
  );
}
