"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface PollOption {
  id: string;
  label: string;
  /** Vote count used to calculate percentage */
  votes: number;
}

export interface PollProps extends React.HTMLAttributes<HTMLDivElement> {
  question: string;
  options: PollOption[];
  /** ID of the voted option if already cast */
  votedId?: string;
  onVote?: (optionId: string) => void;
}

/** Interactive poll: options + percentage breakdown + vote animation. */
export function Poll({ question, options, votedId, onVote, className, ...props }: PollOptionProps2) {
  const [selected, setSelected] = React.useState<string | null>(votedId ?? null);
  const total = options.reduce((s, o) => s + o.votes, 0);
  const hasVoted = selected !== null;

  return (
    <div className={cn("w-full max-w-sm rounded-lg border border-border bg-card p-4", className)} {...props}>
      <style>{`@keyframes pollGrow { from { width: 0; } }`}</style>
      <h3 className="text-sm font-semibold">{question}</h3>

      <div className="mt-3 space-y-1.5">
        {options.map((opt, idx) => {
          const pct = total > 0 ? Math.round((opt.votes / total) * 100) : 0;
          const isMine = selected === opt.id;
          return (
            <button
              key={opt.id}
              onClick={() => { if (!hasVoted) { setSelected(opt.id); onVote?.(opt.id); } }}
              disabled={hasVoted}
              aria-pressed={isMine}
              className={cn(
                "relative w-full overflow-hidden rounded-md border px-3 py-2 text-left transition-colors duration-200 motion-reduce:transition-none",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                hasVoted ? "cursor-default" : "hover:border-foreground/40",
                isMine ? "border-accent" : "border-border"
              )}
              style={{ animationDelay: `${idx * 50}ms` }}
            >
              {hasVoted && (
                <span
                  className={cn("absolute inset-y-0 left-0 transition-all duration-700 ease-out motion-reduce:transition-none", isMine ? "bg-accent/20" : "bg-secondary")}
                  style={{ width: `${pct}%`, animation: hasVoted ? "pollGrow 0.6s cubic-bezier(0.16,1,0.3,1) both" : undefined }}
                  aria-hidden="true"
                />
              )}
              <span className="relative flex items-center justify-between gap-2">
                <span className={cn("text-sm", isMine && "font-medium text-accent")}>
                  {isMine && <span className="mr-1" aria-hidden="true">✓</span>}
                  {opt.label}
                </span>
                {hasVoted && <span className="font-mono text-xs tabular-nums text-muted-foreground">%{pct}</span>}
              </span>
            </button>
          );
        })}
      </div>
      <p className="mt-2.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
        {hasVoted ? `${total + (votedId ? 0 : 1)} votes` : "Select an option to vote"}
      </p>
    </div>
  );
}

// alias for exported prop type safety:
type PollOptionProps2 = React.HTMLAttributes<HTMLDivElement> & {
  question: string;
  options: PollOption[];
  votedId?: string;
  onVote?: (optionId: string) => void;
};
