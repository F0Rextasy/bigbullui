"use client";

import * as React from "react";
import { cn } from "./lib/utils";

/** Rough token estimate: one token per four characters. */
export function estimateTokens(text: string): number {
  return Math.max(0, Math.ceil(text.length / 4));
}

export interface TokenCounterProps extends React.HTMLAttributes<HTMLDivElement> {
  text?: string;
  tokens?: number;
  limit?: number;
  model?: string;
}

/** Mono token meter with usage bar against a context limit. */
export function TokenCounter({
  text = "",
  tokens,
  limit = 4096,
  model = "STUB-1",
  className,
  ...props
}: TokenCounterProps) {
  const used = tokens ?? estimateTokens(text);
  const pct = Math.min(100, Math.round((used / Math.max(1, limit)) * 100));
  const over = used > limit;
  return (
    <div
      className={cn("w-full rounded-lg border border-dashed border-border bg-card p-3", className)}
      role="meter"
      aria-valuenow={used}
      aria-valuemin={0}
      aria-valuemax={limit}
      aria-label="Token usage"
      {...props}
    >
      <div className="flex items-center justify-between gap-2">
        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
          Tokens · {model}
        </p>
        <p className={cn("font-mono text-[11px] font-bold", over ? "text-accent" : "text-foreground")}>
          {used.toLocaleString()} / {limit.toLocaleString()}
        </p>
      </div>
      <div className="mt-2 h-2.5 overflow-hidden rounded-full border border-border bg-secondary">
        <div
          className={cn(
            "h-full rounded-full transition-[width] duration-500 motion-reduce:transition-none",
            over ? "bg-accent" : "bg-primary",
          )}
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="mt-1.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
        {over ? "Over limit — trim prompt" : `${pct}% of context used`}
      </p>
    </div>
  );
}
