"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface Error500Props extends React.HTMLAttributes<HTMLDivElement> {
  onRetry?: () => void;
}

/** Error 500: stamped server-error panel with retry action. */
export function Error500({ onRetry, className, ...props }: Error500Props) {
  return (
    <div className={cn("flex w-full max-w-sm flex-col items-center rounded-lg border-2 border-foreground bg-card p-8 text-center", className)} {...props}>
      <span className="rotate-[-6deg] rounded border-2 border-accent px-3 py-1 font-mono text-2xl font-black text-accent">500</span>
      <h3 className="mt-3 text-sm font-black">Curtain jammed backstage</h3>
      <p className="mt-1 font-mono text-xs text-muted-foreground">The server dropped the stub. Try the gate again.</p>
      <button
        type="button"
        onClick={onRetry}
        className="mt-4 rounded-md bg-primary px-4 py-2 font-mono text-[11px] font-bold uppercase tracking-wider text-primary-foreground transition-transform hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none"
      >
        Retry gate
      </button>
    </div>
  );
}
