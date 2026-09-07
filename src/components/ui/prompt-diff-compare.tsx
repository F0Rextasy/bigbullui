"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface PromptDiffCompareProps extends React.HTMLAttributes<HTMLDivElement> {
  before: string;
  after: string;
  beforeLabel?: string;
  afterLabel?: string;
}

function words(text: string): string[] {
  return text.split(/\s+/).filter(Boolean);
}

/** Side-by-side prompt diff with added/removed word highlights. */
export function PromptDiffCompare({
  before,
  after,
  beforeLabel = "Before",
  afterLabel = "After",
  className,
  ...props
}: PromptDiffCompareProps) {
  const beforeWords = React.useMemo(() => words(before), [before]);
  const afterWords = React.useMemo(() => words(after), [after]);
  const afterSet = React.useMemo(() => new Set(afterWords), [afterWords]);
  const beforeSet = React.useMemo(() => new Set(beforeWords), [beforeWords]);
  const removed = beforeWords.filter((w) => !afterSet.has(w)).length;
  const added = afterWords.filter((w) => !beforeSet.has(w)).length;
  const pane = (label: string, list: string[], base: Set<string>, tone: "removed" | "added") => (
    <div className="flex-1 rounded border border-border bg-background p-2.5">
      <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">{label}</p>
      <p className="mt-1.5 text-xs leading-6 text-foreground">
        {list.map((w, i) => {
          const changed = !base.has(w);
          return (
            <span
              key={i}
              className={cn(
                "rounded px-0.5",
                changed && tone === "removed" && "bg-accent/20 text-accent line-through",
                changed && tone === "added" && "bg-primary/20 font-bold",
              )}
            >
              {w}{" "}
            </span>
          );
        })}
      </p>
    </div>
  );
  return (
    <div className={cn("w-full rounded-lg border-2 border-foreground bg-card p-3", className)} {...props}>
      <div className="mb-2 flex items-center justify-between">
        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
          Prompt diff
        </p>
        <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
          <span className="text-accent">-{removed}</span> / <span className="font-bold">+{added}</span>
        </p>
      </div>
      <div className="flex flex-col gap-2 sm:flex-row">
        {pane(beforeLabel, beforeWords, afterSet, "removed")}
        {pane(afterLabel, afterWords, beforeSet, "added")}
      </div>
    </div>
  );
}
