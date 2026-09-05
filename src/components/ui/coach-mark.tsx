"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export type CoachMarkProps = {
  trigger: React.ReactNode;
  title: string;
  description?: string;
  onDismiss: () => void;
};

export function CoachMark({ trigger, title, description, onDismiss }: CoachMarkProps) {
  const mountRef = React.useRef<HTMLDivElement>(null);

  const springKeyframes = `
    @keyframes coachMarkSpring {
      0% { transform: scale(0.8); opacity: 0; }
      100% { transform: scale(1); opacity: 1; }
    }
  `;

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onDismiss();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onDismiss]);

  return (
    <div>
      <style>{springKeyframes}</style>

      <div
        ref={mountRef}
        className={cn(
          "absolute z-50",
          "motion-reduce:animate-none",
        )}
      >
        {trigger}

        {mountRef.current && (
          <div
            className={cn(
              "fixed z-50 max-w-md w-full",
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
                  onClick={onDismiss}
                  className={cn(
                    "w-100 py-2 text-sm font-medium rounded-md bg-accent text-accent-foreground",
                    "hover:bg-accent-200 transition-colors",
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
    </div>
  );
}