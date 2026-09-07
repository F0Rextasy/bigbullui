"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface OnboardingPagerProps extends React.HTMLAttributes<HTMLDivElement> {
  steps?: { title: string; body: string }[];
}

const FALLBACK = [
  { title: "Claim a stub", body: "Pick a section and hold seats for ten minutes." },
  { title: "Pass the gate", body: "Scan the barcode at any turnstile lane." },
  { title: "Keep the stub", body: "Torn stubs unlock loyalty stamps and replays." },
];

/** Dotted onboarding pager with prev and next stamps. */
export function OnboardingPager({ steps = FALLBACK, className, ...props }: OnboardingPagerProps) {
  const [index, setIndex] = React.useState(0);
  const step = steps[Math.min(index, steps.length - 1)];
  return (
    <div className={cn("w-full rounded-lg border-2 border-foreground bg-card p-5 text-center shadow-md", className)} {...props}>
      <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-accent">Step {index + 1} of {steps.length}</p>
      <h3 className="mt-1 font-mono text-lg font-black uppercase text-foreground">{step.title}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{step.body}</p>
      <div className="mt-3 flex items-center justify-center gap-1.5" role="tablist" aria-label="Onboarding progress">
        {steps.map((s, i) => (
          <button
            key={s.title}
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-label={`Go to step ${i + 1}`}
            onClick={() => setIndex(i)}
            className={cn("h-2 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", i === index ? "w-6 bg-accent" : "w-2 bg-border hover:bg-muted-foreground")}
          />
        ))}
      </div>
      <div className="mt-4 flex justify-between">
        <button type="button" disabled={index === 0} onClick={() => setIndex((i) => Math.max(0, i - 1))} className="rounded border border-dashed border-border px-3 py-1 font-mono text-[11px] font-bold uppercase text-muted-foreground disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">Back</button>
        <button type="button" onClick={() => setIndex((i) => Math.min(steps.length - 1, i + 1))} className="rounded border border-foreground bg-primary px-3 py-1 font-mono text-[11px] font-bold uppercase text-primary-foreground active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
          {index === steps.length - 1 ? "Finish" : "Next"}
        </button>
      </div>
    </div>
  );
}
