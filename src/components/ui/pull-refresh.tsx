"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface PullRefreshProps extends React.HTMLAttributes<HTMLDivElement> {
  onRefresh?: () => Promise<void> | void;
  children?: React.ReactNode;
}

/** Pull to refresh wrapper with stamp spinner. */
export function PullRefresh({ onRefresh, children, className, ...props }: PullRefreshProps) {
  const [spinning, setSpinning] = React.useState(false);
  const [flash, setFlash] = React.useState(0);
  const refresh = async () => {
    if (spinning) return;
    setSpinning(true);
    await onRefresh?.();
    setSpinning(false);
    setFlash((f) => f + 1);
  };
  return (
    <div className={cn("w-full rounded-lg border-2 border-dashed border-border bg-card", className)} {...props}>
      <div className="flex items-center justify-between border-b border-dashed border-border px-3 py-2">
        <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Feed gate</span>
        <button
          type="button"
          onClick={refresh}
          disabled={spinning}
          className="rounded border border-foreground bg-secondary px-2 py-0.5 font-mono text-[11px] font-bold uppercase text-foreground active:scale-95 disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <span className={cn("me-1 inline-block", spinning && "animate-spin motion-reduce:animate-none")} aria-hidden="true">O</span>
          {spinning ? "Syncing" : "Pull refresh"}
        </button>
      </div>
      <div key={flash} className="min-h-24 p-3 text-sm text-foreground motion-safe:animate-[fade-in_0.3s_ease-out] motion-reduce:animate-none">
        {children ?? "Gate 3 admissions are current as of 19:30."}
      </div>
    </div>
  );
}
