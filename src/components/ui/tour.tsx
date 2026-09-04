"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface TourStep {
  title: string;
  description: string;
}

export interface TourProps extends React.HTMLAttributes<HTMLDivElement> {
  steps: TourStep[];
  currentStep?: number;
  onStepChange?: (step: number) => void;
  onComplete?: () => void;
  onSkip?: () => void;
  className?: string;
}

export function Tour({
  steps,
  currentStep: controlledStep,
  onStepChange,
  onComplete,
  onSkip,
  className,
  ...props
}: TourProps) {
  const [internalStep, setInternalStep] = React.useState(0);
  const isControlled = controlledStep !== undefined;
  const stepIdx = isControlled ? controlledStep : internalStep;

  const current = steps[stepIdx] || steps[0];
  const isLast = stepIdx === steps.length - 1;

  const handleNext = () => {
    if (isLast) {
      onComplete?.();
    } else {
      const next = stepIdx + 1;
      if (!isControlled) setInternalStep(next);
      onStepChange?.(next);
    }
  };

  const handlePrev = () => {
    if (stepIdx > 0) {
      const prev = stepIdx - 1;
      if (!isControlled) setInternalStep(prev);
      onStepChange?.(prev);
    }
  };

  if (!current) return null;

  return (
    <div
      role="dialog"
      aria-modal="false"
      className={cn(
        "relative w-full max-w-sm rounded-xl border-2 border-foreground bg-card p-5 shadow-xl outline-1 outline-dashed outline-offset-[-5px] font-mono select-none animate-[scale-in_0.15s_ease-out_both]",
        className
      )}
      {...props}
    >
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-dashed border-border pb-2">
        <span className="text-[10px] font-bold uppercase tracking-widest text-accent">
          TICKET TOUR · STEP {stepIdx + 1}/{steps.length}
        </span>
        <button
          type="button"
          onClick={onSkip}
          className="text-[10px] uppercase text-muted-foreground hover:text-foreground cursor-pointer font-bold"
        >
          SKIP
        </button>
      </div>

      {/* Content */}
      <div className="py-3">
        <h4 className="text-sm font-bold text-foreground uppercase">{current.title}</h4>
        <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{current.description}</p>
      </div>

      {/* Footer Controls */}
      <div className="flex items-center justify-between pt-2 border-t border-dashed border-border">
        {/* Step Dots */}
        <div className="flex items-center gap-1">
          {steps.map((_, i) => (
            <div
              key={i}
              className={cn(
                "size-1.5 rounded-full transition-all",
                i === stepIdx ? "w-4 bg-accent" : "bg-muted"
              )}
            />
          ))}
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-2">
          {stepIdx > 0 && (
            <button
              type="button"
              onClick={handlePrev}
              className="rounded-sm border border-border bg-secondary px-2.5 py-1 text-[10px] font-bold uppercase text-foreground hover:bg-muted cursor-pointer"
            >
              PREV
            </button>
          )}
          <button
            type="button"
            onClick={handleNext}
            className="rounded-sm bg-foreground px-3 py-1 text-[10px] font-bold uppercase text-background hover:bg-accent hover:text-accent-foreground cursor-pointer transition-colors"
          >
            {isLast ? "FINISH" : "NEXT →"}
          </button>
        </div>
      </div>
    </div>
  );
}
