"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface BadgePrinterProps extends React.HTMLAttributes<HTMLDivElement> {
  name?: string;
  role?: string;
  company?: string;
  onPrint?: () => void;
}

export function BadgePrinter({
  name = "ADA BULL",
  role = "SPEAKER",
  company = "BIGBULL CONF",
  onPrint,
  className,
  ...props
}: BadgePrinterProps) {
  const [printing, setPrinting] = React.useState(false);
  const [done, setDone] = React.useState(false);

  const print = () => {
    if (printing) return;
    setPrinting(true);
    setDone(false);
    setTimeout(() => {
      setPrinting(false);
      setDone(true);
      onPrint?.();
    }, 1600);
  };

  return (
    <div className={cn("w-full max-w-xs", className)} {...props}>
      <div className="rounded-t-lg border-2 border-b-0 border-foreground bg-card px-4 py-2">
        <p className="text-center font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          Badge printer · Thermal
        </p>
      </div>
      <div className="overflow-hidden border-2 border-foreground bg-card">
        <div
          className="bg-secondary transition-all duration-1000 motion-reduce:transition-none"
          style={{ height: printing || done ? 8 : 0 }}
        />
        <div
          className={cn(
            "mx-6 my-0 border-x-2 border-dashed border-border bg-background p-4 text-center transition-all duration-1000 motion-reduce:transition-none",
            printing || done ? "max-h-48 opacity-100" : "max-h-0 overflow-hidden opacity-0",
          )}
          aria-live="polite"
        >
          <p className="text-lg font-bold">{name}</p>
          <p className="mt-0.5 inline-block rounded bg-accent px-2 py-0.5 font-mono text-[10px] font-bold uppercase text-accent-foreground">
            {role}
          </p>
          <p className="mt-1 font-mono text-[11px] text-muted-foreground">{company}</p>
        </div>
        <div className="flex items-center justify-center gap-1 border-t border-dashed border-border py-2" aria-hidden>
          {Array.from({ length: 24 }).map((_, i) => (
            <span key={i} className={cn("h-2 w-0.5", i % 2 === 0 ? "bg-foreground" : "bg-border")} />
          ))}
        </div>
      </div>
      <button
        type="button"
        onClick={print}
        disabled={printing}
        className="w-full cursor-pointer rounded-b-lg border-2 border-t-0 border-foreground bg-primary px-4 py-2.5 font-mono text-xs font-bold uppercase text-primary-foreground transition-transform hover:scale-[1.01] active:scale-[0.99] disabled:cursor-wait disabled:opacity-60"
      >
        {printing ? "Printing…" : done ? "Print again" : "Print badge"}
      </button>
    </div>
  );
}
