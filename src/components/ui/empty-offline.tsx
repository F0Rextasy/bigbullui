"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface EmptyOfflineProps extends React.HTMLAttributes<HTMLDivElement> {
  onRetry?: () => void;
}

/** Empty offline: disconnected state with retry action. */
export function EmptyOffline({ onRetry, className, ...props }: EmptyOfflineProps) {
  const [retrying, setRetrying] = React.useState(false);
  return (
    <div className={cn("flex w-full max-w-sm flex-col items-center rounded-lg border-2 border-dashed border-border bg-card p-8 text-center", className)} {...props}>
      <span className="relative flex size-3" aria-hidden="true">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60 motion-reduce:animate-none" />
        <span className="relative inline-flex size-3 rounded-full bg-accent" />
      </span>
      <h3 className="mt-3 text-sm font-black">You are offline</h3>
      <p className="mt-1 font-mono text-xs text-muted-foreground">Stubs will sync when the line is back.</p>
      <button
        type="button"
        onClick={() => {
          setRetrying(true);
          onRetry?.();
          setTimeout(() => setRetrying(false), 1200);
        }}
        className="mt-4 rounded-md border px-3 py-1.5 font-mono text-[11px] font-bold uppercase tracking-wider transition-colors hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none"
      >
        {retrying ? "Retrying..." : "Retry connection"}
      </button>
    </div>
  );
}
