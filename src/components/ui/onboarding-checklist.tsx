"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface OnboardingChecklistProps extends React.HTMLAttributes<HTMLDivElement> {
  steps?: { id: string; label: string; hint?: string }[];
  onComplete?: () => void;
}

/** Onboarding checklist stub: stampable steps with progress rail. */
export function OnboardingChecklist({ steps = [{ id: "s1", label: "Create venue", hint: "Name and city" }, { id: "s2", label: "Invite team", hint: "2 seats free" }, { id: "s3", label: "Publish event", hint: "Go live" }], onComplete, className, ...props }: OnboardingChecklistProps) {
  const [done, setDone] = React.useState<string[]>([]);
  const pct = Math.round((done.length / Math.max(1, steps.length)) * 100);
  const toggle = (id: string) => setDone((d) => { const n = d.includes(id) ? d.filter((x) => x !== id) : [...d, id]; if (n.length === steps.length) onComplete?.(); return n; });
  return (
    <div className={cn("w-full max-w-sm rounded-lg border border-border bg-card p-4", className)} {...props}>
      <div className="flex items-baseline justify-between">
        <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">Onboarding</span>
        <span className="font-mono text-xs font-bold tabular-nums text-accent">{pct}%</span>
      </div>
      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-border/50" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} aria-label="Onboarding progress">
        <div className="h-full rounded-full bg-accent transition-all duration-500 motion-reduce:transition-none" style={{ width: `${pct}%` }} />
      </div>
      <ul className="mt-3 space-y-1.5">
        {steps.map((s) => {
          const isDone = done.includes(s.id);
          return (
            <li key={s.id}>
              <button
                type="button"
                aria-pressed={isDone}
                onClick={() => toggle(s.id)}
                className="flex w-full items-center gap-2.5 rounded-md border border-dashed border-border px-2.5 py-2 text-start focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <span className={cn("flex size-5 shrink-0 items-center justify-center rounded-full border font-mono text-[10px]", isDone ? "border-accent bg-accent text-accent-foreground" : "border-border text-transparent")} aria-hidden="true">✓</span>
                <span className="min-w-0 flex-1">
                  <span className={cn("block font-mono text-xs font-bold", isDone ? "text-muted-foreground line-through" : "text-foreground")}>{s.label}</span>
                  {s.hint && <span className="block font-mono text-[10px] text-muted-foreground">{s.hint}</span>}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
