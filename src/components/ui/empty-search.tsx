"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface EmptySearchProps extends React.HTMLAttributes<HTMLDivElement> {
  query?: string;
  onClear?: () => void;
}

/** Empty search: zero-result state echoing the query with clear action. */
export function EmptySearch({ query = "balcony box", onClear, className, ...props }: EmptySearchProps) {
  return (
    <div className={cn("flex w-full max-w-sm flex-col items-center rounded-lg border-2 border-dashed border-border bg-card p-8 text-center", className)} {...props}>
      <span aria-hidden="true" className="flex size-11 items-center justify-center rounded-full border-2 border-dashed border-border font-mono text-lg text-muted-foreground">
        ?
      </span>
      <h3 className="mt-3 text-sm font-black">No stubs found</h3>
      <p className="mt-1 font-mono text-xs text-muted-foreground">
        Nothing matched <span className="font-bold text-foreground">{query}</span>
      </p>
      <button
        type="button"
        onClick={onClear}
        className="mt-4 rounded-md border px-3 py-1.5 font-mono text-[11px] font-bold uppercase tracking-wider transition-colors hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none"
      >
        Clear search
      </button>
    </div>
  );
}
