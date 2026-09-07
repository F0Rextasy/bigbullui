"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface FeatureIdea {
  id: string;
  title: string;
  votes: number;
}

export interface FeatureVoteProps extends React.HTMLAttributes<HTMLDivElement> {
  initial?: FeatureIdea[];
}

/** Feature vote: idea rows with toggleable vote counts. */
export function FeatureVote({
  initial = [
    { id: "fv1", title: "Offline scanning mode", votes: 214 },
    { id: "fv2", title: "Group seat picker", votes: 167 },
    { id: "fv3", title: "Wallet pass export", votes: 89 },
  ],
  className,
  ...props
}: FeatureVoteProps) {
  const [ideas, setIdeas] = React.useState(initial);
  const [voted, setVoted] = React.useState<Set<string>>(new Set());
  const toggle = (id: string) => {
    setVoted((prev) => {
      const next = new Set(prev);
      const has = next.has(id);
      if (has) next.delete(id);
      else next.add(id);
      setIdeas((list) => list.map((i) => (i.id === id ? { ...i, votes: i.votes + (has ? -1 : 1) } : i)));
      return next;
    });
  };
  return (
    <div className={cn("w-full max-w-sm rounded-lg border-2 border-foreground bg-card p-4", className)} {...props}>
      <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Vote the board</p>
      <ul className="mt-2 space-y-1.5">
        {ideas.map((idea) => {
          const mine = voted.has(idea.id);
          return (
            <li key={idea.id} className={cn("flex items-center justify-between gap-2 rounded-md border px-2.5 py-2", mine ? "border-accent" : "border-dashed border-border")}>
              <span className="text-xs font-bold">{idea.title}</span>
              <button
                type="button"
                onClick={() => toggle(idea.id)}
                aria-pressed={mine}
                aria-label={`Vote for ${idea.title}`}
                className={cn(
                  "shrink-0 rounded border px-2 py-1 font-mono text-[11px] font-bold tabular-nums transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none",
                  mine ? "border-accent bg-accent text-accent-foreground" : "border-border hover:border-accent hover:text-accent"
                )}
              >
                ▲ {idea.votes}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
