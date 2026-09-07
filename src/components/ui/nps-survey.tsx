"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface NpsSurveyProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSubmit"> {
  onScore?: (score: number) => void;
}

/** NPS survey: 0-10 score buttons with grouped tone zones. */
export function NpsSurvey({ onScore, className, ...props }: NpsSurveyProps) {
  const [score, setScore] = React.useState<number | null>(null);
  const [sent, setSent] = React.useState(false);
  return (
    <div className={cn("w-full max-w-md rounded-lg border-2 border-foreground bg-card p-5 text-center", className)} {...props}>
      <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Rate the night</p>
      <h3 className="mt-1 text-sm font-black">How likely to return?</h3>
      <div className="mt-3 grid grid-cols-11 gap-1" role="radiogroup" aria-label="Score from 0 to 10">
        {Array.from({ length: 11 }).map((_, n) => (
          <button
            key={n}
            type="button"
            role="radio"
            aria-checked={score === n}
            onClick={() => {
              setScore(n);
              setSent(false);
            }}
            className={cn(
              "rounded border py-1.5 font-mono text-xs font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none",
              score === n
                ? "border-accent bg-accent text-accent-foreground scale-110"
                : "border-dashed border-border hover:border-foreground"
            )}
          >
            {n}
          </button>
        ))}
      </div>
      <div className="mt-2 flex justify-between font-mono text-[10px] uppercase text-muted-foreground">
        <span>Skip next time</span>
        <span>Front row forever</span>
      </div>
      <button
        type="button"
        disabled={score === null}
        onClick={() => {
          if (score !== null) {
            onScore?.(score);
            setSent(true);
          }
        }}
        className="mt-3 w-full rounded-md bg-primary py-2 font-mono text-[11px] font-bold uppercase tracking-wider text-primary-foreground disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        {sent ? `Filed · ${score}/10 ✓` : "Send score"}
      </button>
    </div>
  );
}
