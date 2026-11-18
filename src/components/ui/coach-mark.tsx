"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export type CoachMarkProps = {
  trigger: React.ReactNode;
  title: string;
  description?: string;
  open?: boolean;
  onDismiss?: () => void;
};

export function CoachMark({ trigger, title, description, open: controlledOpen, onDismiss }: CoachMarkProps) {
  const [internalOpen, setInternalOpen] = React.useState(true);
  const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen;

  const dismiss = React.useCallback(() => {
    if (controlledOpen === undefined) setInternalOpen(false);
    onDismiss?.();
  }, [controlledOpen, onDismiss]);

  React.useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") dismiss();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, dismiss]);

  return (
    <div className="relative inline-block">
      <div>{trigger}</div>

      {isOpen && (
        <div
          role="dialog"
          aria-label={title}
          className={cn(
            "relative z-50 mt-2 w-full max-w-md",
            "motion-reduce:animate-none",
          )}
        >
          <div
            className={cn(
              "bg-card rounded-md border border-border p-6 shadow-lg",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              "motion-reduce:animate-none",
              "motion-reduce:transition-none",
            )}
          >
            <div className="flex items-center gap-2 mb-4">
              <svg
                className="w-5 h-5 text-muted-foreground"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              <span className="text-sm font-medium">Coach Mark</span>
            </div>

            <h3 className={cn("text-lg font-semibold tracking-tight", "motion-reduce:animate-none")}>
              {title}
            </h3>
            {description && (
              <p className={cn("text-sm text-muted-foreground mt-2", "motion-reduce:animate-none")}>
                {description}
              </p>
            )}

            <div className="mt-6 pt-6 border-t border-border">
              <button
                type="button"
                onClick={dismiss}
                className={cn(
                  "w-full cursor-pointer py-2 text-sm font-medium rounded-md bg-accent text-accent-foreground",
                  "hover:bg-accent/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  "motion-reduce:transition-none",
                  "motion-reduce:animate-none",
                )}
              >
                Got it
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}