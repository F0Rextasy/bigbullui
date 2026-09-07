"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface StampFieldProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  approver?: string;
  defaultApprover?: string;
  onApprove?: (approver: string, date: string) => void;
  label?: string;
}

export function StampField({
  approver: controlledApprover,
  defaultApprover = "",
  onApprove,
  label = "Approved by",
  className,
  ...props
}: StampFieldProps) {
  const [inner, setInner] = React.useState(defaultApprover);
  const approver = controlledApprover ?? inner;
  const [stamped, setStamped] = React.useState(false);
  const today = new Date().toLocaleDateString(undefined, { dateStyle: "medium" }).toUpperCase();

  const stamp = () => {
    if (approver.trim().length === 0) return;
    setStamped(true);
    onApprove?.(approver.trim(), today);
  };

  return (
    <div className={cn("w-full rounded-lg border border-border bg-card p-4", className)} {...props}>
      <div className="flex items-center gap-3">
        <input
          value={approver}
          disabled={stamped}
          onChange={(e) => setInner(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") stamp();
          }}
          placeholder="Approver name"
          aria-label={label}
          className="min-w-0 flex-1 rounded-md border border-border bg-background px-3 py-2 font-mono text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-60"
        />
        <button
          type="button"
          onClick={() => (stamped ? setStamped(false) : stamp())}
          disabled={!stamped && approver.trim().length === 0}
          className="shrink-0 cursor-pointer rounded-md bg-primary px-4 py-2 font-mono text-xs font-bold uppercase text-primary-foreground transition-transform hover:scale-[1.02] active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {stamped ? "Reset" : "Stamp"}
        </button>
      </div>
      <div className="mt-3 flex items-center justify-between border-t border-dashed border-border pt-3">
        <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          {today}
        </span>
        <span
          aria-live="polite"
          className={cn(
            "inline-block rounded border-2 px-3 py-1 font-mono text-sm font-bold uppercase tracking-widest transition-all",
            stamped
              ? "rotate-[-6deg] border-accent text-accent"
              : "rotate-[-6deg] border-dashed border-border/60 text-muted-foreground/50",
          )}
        >
          {stamped ? `Approved · ${approver}` : "Awaiting stamp"}
        </span>
      </div>
    </div>
  );
}
