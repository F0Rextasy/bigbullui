"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface DialogueBoxProps extends React.HTMLAttributes<HTMLDivElement> {
  speaker?: string;
  lines?: string[];
  onNext?: () => void;
  onSkip?: () => void;
}

/** Dialogue box: visual-novel speaker panel with paging. */
export function DialogueBox({ speaker = "Coach", lines, onNext, onSkip, className, ...props }: DialogueBoxProps) {
  const fallback = ["Welcome to the arena.", "Tap next to keep the briefing going."];
  const [idx, setIdx] = React.useState(0);
  const list = lines ?? fallback;
  const line = list[Math.min(idx, list.length - 1)];
  return (
    <div role="dialog" aria-label={`Dialogue with ${speaker}`} className={cn("w-full touch-none select-none rounded-md border-2 border-foreground bg-card p-3", className)} style={{ touchAction: "none" }} {...props}>
      <p className="w-fit rounded bg-foreground px-2 py-0.5 font-mono text-[10px] font-black uppercase tracking-[0.2em] text-background">{speaker}</p>
      <p className="mt-2 min-h-11 font-mono text-sm leading-relaxed text-foreground">{line}</p>
      <div className="mt-2 flex items-center justify-between gap-2">
        <span className="font-mono text-[10px] tabular-nums text-muted-foreground">{Math.min(idx + 1, list.length)}/{list.length}</span>
        <span className="flex gap-2">
          <button type="button" onClick={onSkip} className="min-h-11 touch-none rounded-md border border-dashed border-border px-3 font-mono text-[11px] font-bold uppercase focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" style={{ touchAction: "none" }}>Skip</button>
          <button
            type="button"
            onClick={() => {
              const next = Math.min(idx + 1, list.length - 1);
              setIdx(next);
              onNext?.();
            }}
            className="min-h-11 touch-none rounded-md border-2 border-foreground bg-primary px-4 font-mono text-[11px] font-black uppercase text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            style={{ touchAction: "none" }}
          >
            Next
          </button>
        </span>
      </div>
    </div>
  );
}
