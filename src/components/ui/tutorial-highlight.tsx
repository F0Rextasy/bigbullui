"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface TutorialHighlightProps extends React.HTMLAttributes<HTMLDivElement> {
  step?: number;
  total?: number;
  hint?: string;
  onNext?: () => void;
}

/** Tutorial highlight: coach-mark ring with hint capsule. */
export function TutorialHighlight({ step = 1, total = 4, hint = "Drag the stick to move", onNext, className, children, ...props }: TutorialHighlightProps) {
  return (
    <div className={cn("relative w-full touch-none select-none", className)} style={{ touchAction: "none" }} {...props}>
      <style>{`@keyframes tutRing { 0%, 100% { opacity: 0.5; } 50% { opacity: 1; } }`}</style>
      <div className="relative rounded-md border-2 border-dashed border-accent p-3" role="group" aria-label={`Tutorial step ${step} of ${total}`}>
        <span aria-hidden="true" className="pointer-events-none absolute -inset-1 rounded-md border-2 border-accent/50 animate-[tutRing_1.4s_ease-in-out_infinite] motion-reduce:animate-none" />
        {children ?? <p className="flex min-h-11 items-center justify-center font-mono text-xs text-muted-foreground">TARGET CONTROL</p>}
        <div className="mt-2 flex items-center justify-between gap-2 rounded-md bg-foreground px-2.5 py-2 text-background">
          <p className="font-mono text-[11px] font-bold">{hint}</p>
          <button
            type="button"
            onClick={onNext}
            aria-label={`Next tutorial step, ${step} of ${total}`}
            className="min-h-11 shrink-0 touch-none rounded border border-background/40 px-3 font-mono text-[11px] font-black uppercase focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            style={{ touchAction: "none" }}
          >
            {step}/{total} Next
          </button>
        </div>
      </div>
    </div>
  );
}
