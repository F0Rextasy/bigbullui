"use client";

import * as React from "react";
import { Badge } from "../ui/badge";

const STEPS = [
  { title: "Doors", text: "Tickets scanned, stubs torn, crowd seated.", tone: "DONE" },
  { title: "Support act", text: "Twenty minutes, house lights half down.", tone: "DONE" },
  { title: "Headliner", text: "Ninety minutes, full production.", tone: "NOW" },
  { title: "Curfew", text: "Lights up, ledger closed, refunds window opens.", tone: "NEXT" },
];

export function BlockTimeline() {
  return (
    <div className="w-full space-y-4">
      <h2 className="font-mono text-2xl font-black uppercase tracking-tight">Running order</h2>
      <ol className="relative space-y-5 before:absolute before:bottom-2 before:left-[15px] before:top-2 before:border-l-2 before:border-dashed before:border-border">
        {STEPS.map((step, index) => (
          <li key={step.title} className="relative flex gap-4 ps-1">
            <span aria-hidden="true" className="z-10 flex size-8 shrink-0 items-center justify-center rounded-full border-2 border-foreground bg-card font-mono text-xs font-black text-foreground">
              {index + 1}
            </span>
            <div className="min-w-0 rounded-lg border border-border bg-card p-4">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="font-mono text-sm font-black uppercase tracking-wider text-foreground">{step.title}</h3>
                <Badge variant={step.tone === "NOW" ? "accent" : "outline"}>{step.tone}</Badge>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{step.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
