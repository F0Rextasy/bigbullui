import * as React from "react";
import { cn } from "./lib/utils";

export interface StepItem {
  title: string;
  description?: string;
}

export interface StepsProps extends React.HTMLAttributes<HTMLDivElement> {
  steps: StepItem[];
  current: number; // 0-indexed
  className?: string;
}

export function Steps({ steps, current, className, ...props }: StepsProps) {
  return (
    <div className={cn("w-full space-y-4", className)} {...props}>
      <ol className="flex items-start justify-between">
        {steps.map((step, idx) => {
          const isCompleted = idx < current;
          const isCurrent = idx === current;
          const isPending = idx > current;
          const isLast = idx === steps.length - 1;

          return (
            <li
              key={step.title}
              className={cn(
                "relative flex flex-1 flex-col items-center text-center",
                !isLast && "after:absolute after:top-4 after:left-[50%] after:h-[2px] after:w-full after:border-t-2 after:border-dashed after:border-border",
                !isLast && isCompleted && "after:border-primary"
              )}
            >
              <div
                className={cn(
                  "relative z-10 flex size-8 items-center justify-center rounded-full border-2 font-mono text-xs font-bold transition-colors",
                  isCompleted && "border-primary bg-primary text-primary-foreground",
                  isCurrent && "border-accent bg-accent text-accent-foreground shadow-xs",
                  isPending && "border-dashed border-border bg-card text-muted-foreground"
                )}
              >
                {isCompleted ? "✓" : idx + 1}
              </div>

              <div className="mt-2 flex flex-col items-center">
                <span
                  className={cn(
                    "font-mono text-xs font-semibold uppercase tracking-wider",
                    isCurrent ? "text-foreground" : "text-muted-foreground"
                  )}
                >
                  {step.title}
                </span>
                {step.description ? (
                  <span className="mt-0.5 max-w-[120px] text-[11px] text-muted-foreground">
                    {step.description}
                  </span>
                ) : null}
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
