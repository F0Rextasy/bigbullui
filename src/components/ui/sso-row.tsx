"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface SsoRowProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  providers?: string[];
  onSelect?: (provider: string) => void;
}

/** SSO row stub: provider buttons with dashed dividers. */
export function SsoRow({ providers = ["Google", "GitHub", "Apple"], onSelect, className, ...props }: SsoRowProps) {
  return (
    <div className={cn("w-full max-w-sm", className)} {...props}>
      <div className="flex items-center gap-2" role="group" aria-label="Single sign on">
        {providers.map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => onSelect?.(p)}
            className="flex-1 rounded-md border border-border bg-card px-2 py-2 font-mono text-[11px] font-bold uppercase tracking-wide text-foreground transition-colors hover:border-accent/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {p}
          </button>
        ))}
      </div>
      <div className="mt-2 flex items-center gap-2" aria-hidden="true">
        <span className="h-px flex-1 border-t border-dashed border-border" />
        <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">or</span>
        <span className="h-px flex-1 border-t border-dashed border-border" />
      </div>
    </div>
  );
}
