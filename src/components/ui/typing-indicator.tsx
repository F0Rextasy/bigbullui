"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface TypingIndicatorProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
  showLabel?: boolean;
}

export const TypingIndicator = React.forwardRef<HTMLDivElement, TypingIndicatorProps>(
  function TypingIndicator(
    { label = "Typing...", showLabel = false, className, ...props },
    ref,
  ) {
    return (
      <div
        ref={ref}
        role="status"
        aria-label={label}
        className={cn("inline-flex items-center gap-2", className)}
        {...props}
      >
        <span className="inline-flex items-center gap-1 rounded-full border border-border bg-card px-2.5 py-1.5">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              aria-hidden="true"
              className="size-1.5 rounded-full bg-accent animate-[loadingDotsBounce_1.2s_ease-in-out_infinite] motion-reduce:animate-none"
              style={{ animationDelay: `${i * 160}ms` }}
            />
          ))}
        </span>
        {showLabel && (
          <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
            {label}
          </span>
        )}
      </div>
    );
  },
);
TypingIndicator.displayName = "TypingIndicator";
