"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface BugReportProps extends React.HTMLAttributes<HTMLDivElement> {
  onFile?: (title: string, severity: string) => void;
}

/** Bug report: mini filing form with severity chips and filed state. */
export function BugReport({ onFile, className, ...props }: BugReportProps) {
  const [title, setTitle] = React.useState("");
  const [severity, setSeverity] = React.useState("minor");
  const [filed, setFiled] = React.useState(false);
  return (
    <div className={cn("w-full max-w-sm rounded-lg border-2 border-foreground bg-card p-4", className)} {...props}>
      <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">File a bug</p>
      {filed ? (
        <p className="mt-3 rounded-md border border-dashed border-accent bg-accent/10 px-3 py-2 text-center font-mono text-xs font-bold text-accent">
          Ticket pinned to the board.
        </p>
      ) : (
        <form
          className="mt-2 space-y-2.5"
          onSubmit={(e) => {
            e.preventDefault();
            if (!title.trim()) return;
            onFile?.(title, severity);
            setFiled(true);
          }}
        >
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Scanner beeped twice..."
            aria-label="Bug title"
            className="w-full rounded-md border-2 border-dashed border-border bg-background px-2.5 py-2 text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
          <div className="flex gap-1.5" role="radiogroup" aria-label="Severity">
            {["minor", "major", "blocker"].map((s) => (
              <button
                key={s}
                type="button"
                role="radio"
                aria-checked={severity === s}
                onClick={() => setSeverity(s)}
                className={cn(
                  "flex-1 rounded border py-1.5 font-mono text-[10px] font-bold uppercase transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  severity === s ? "border-accent bg-accent/10 text-accent" : "border-dashed border-border text-muted-foreground hover:text-foreground"
                )}
              >
                {s}
              </button>
            ))}
          </div>
          <button
            type="submit"
            className="w-full rounded-md bg-primary py-2 font-mono text-[11px] font-bold uppercase tracking-wider text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            File report
          </button>
        </form>
      )}
    </div>
  );
}
