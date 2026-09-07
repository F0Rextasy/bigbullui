"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface ThinkingBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  steps?: string[];
  defaultOpen?: boolean;
  elapsedMs?: number;
}

/** Collapsible reasoning trace stub with numbered steps and elapsed stamp. */
export function ThinkingBlock({
  title = "Reasoning trace",
  steps = ["Parsed seating request", "Checked gate availability", "Drafted stub response"],
  defaultOpen = false,
  elapsedMs = 1240,
  className,
  ...props
}: ThinkingBlockProps) {
  const [open, setOpen] = React.useState(defaultOpen);
  return (
    <div className={cn("w-full rounded-lg border-2 border-foreground bg-card", className)} {...props}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full cursor-pointer items-center gap-2 px-3 py-2 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <span className="relative flex size-2 shrink-0" aria-hidden="true">
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60 motion-reduce:animate-none" />
          <span className="relative inline-flex size-2 rounded-full bg-accent" />
        </span>
        <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
          {title}
        </span>
        <span className="ml-auto rounded border border-dashed border-border px-1.5 py-px font-mono text-[10px] text-muted-foreground">
          {elapsedMs} MS
        </span>
        <span aria-hidden="true" className={cn("font-mono text-xs text-muted-foreground transition-transform motion-reduce:transition-none", open && "rotate-90")}>
          {">"}
        </span>
      </button>
      {open && (
        <ol className="space-y-1.5 border-t border-dashed border-border px-3 py-2.5">
          {steps.map((step, i) => (
            <li key={i} className="flex items-start gap-2 text-xs text-foreground">
              <span className="mt-0.5 inline-flex size-4 shrink-0 items-center justify-center rounded-full border border-accent/50 bg-accent/10 font-mono text-[9px] font-bold text-accent">
                {i + 1}
              </span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
