"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface WizardStep {
  id: string;
  title: string;
  description?: string;
}

export interface StepperV2Props extends React.HTMLAttributes<HTMLOListElement> {
  steps: WizardStep[];
  current: number;
  /** dikey düzen */
  vertical?: boolean;
}

/** Açıklamalı dikey/yatay stepper. */
export function StepperV2({ steps, current, vertical = true, className, ...props }: StepperV2Props) {
  if (vertical) {
    return (
      <ol className={cn("relative space-y-0", className)} {...props}>
        <style>{`@keyframes stvIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }`}</style>
        {steps.map((s, i) => {
          const state = i < current ? "done" : i === current ? "active" : "upcoming";
          const last = i === steps.length - 1;
          return (
            <li key={s.id} className={cn("relative flex gap-3 pb-6 last:pb-0 animate-[stvIn_0.3s_ease-out_both] motion-reduce:animate-none")} style={{ animationDelay: `${i * 80}ms` }}>
              {!last && (
                <span
                  className={cn("absolute left-[11px] top-6 h-full w-0.5 transition-colors duration-300 motion-reduce:transition-none", state === "done" ? "bg-accent" : "bg-border")}
                  aria-hidden="true"
                />
              )}
              <span
                className={cn(
                  "z-10 flex size-6 shrink-0 items-center justify-center rounded-full border-2 bg-card font-mono text-[10px] font-bold transition-colors duration-300 motion-reduce:transition-none",
                  state === "done" && "border-accent bg-accent text-accent-foreground",
                  state === "active" && "border-accent text-accent shadow-[0_0_0_4px_var(--accent-foreground)]/5 shadow-accent/20",
                  state === "upcoming" && "border-border text-muted-foreground"
                )}
                aria-current={state === "active" ? "step" : undefined}
              >
                {state === "done" ? (
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>
                ) : i + 1}
              </span>
              <div className={cn("pt-0.5", state === "upcoming" && "opacity-50")}>
                <p className={cn("text-sm font-medium leading-tight", state === "active" && "text-accent")}>{s.title}</p>
                {s.description && <p className="mt-0.5 text-xs text-muted-foreground">{s.description}</p>}
              </div>
            </li>
          );
        })}
      </ol>
    );
  }

  return (
    <ol className={cn("flex items-center gap-2", className)} {...props}>
      {steps.map((s, i) => (
        <li key={s.id} className="flex flex-1 items-center gap-2">
          <span
            className={cn(
              "flex size-6 shrink-0 items-center justify-center rounded-full border-2 font-mono text-[10px] font-bold",
              i < current && "border-accent bg-accent text-accent-foreground",
              i === current && "border-accent text-accent",
              i > current && "border-border text-muted-foreground"
            )}
            aria-current={i === current ? "step" : undefined}
          >
            {i < current ? "✓" : i + 1}
          </span>
          {i < steps.length - 1 && <span className={cn("h-0.5 flex-1 rounded-full", i < current ? "bg-accent" : "bg-border")} aria-hidden="true" />}
        </li>
      ))}
    </ol>
  );
}
