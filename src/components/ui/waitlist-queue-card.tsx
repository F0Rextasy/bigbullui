"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface WaitlistQueueCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  position?: number;
  total?: number;
  code?: string;
  onInvite?: () => void;
  onLeave?: () => void;
}

export function WaitlistQueueCard({
  position = 42,
  total = 1200,
  code = "BB-EARLY-42",
  onInvite,
  onLeave,
  className,
  ...props
}: WaitlistQueueCardProps) {
  const [joined, setJoined] = React.useState(false);
  const pct = Math.min(100, Math.max(0, ((total - position) / Math.max(total, 1)) * 100));

  return (
    <div className={cn("w-full max-w-sm rounded-lg border-2 border-foreground bg-card p-4", className)} {...props}>
      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Early access</span>
        <span className="rounded bg-accent px-2 py-0.5 font-mono text-[10px] font-bold text-accent-foreground">
          #{position}
        </span>
      </div>
      <p className="mt-2 font-mono text-3xl font-bold tabular-nums">
        {position}
        <span className="text-base font-normal text-muted-foreground"> / {total}</span>
      </p>
      <div className="mt-2 h-2 overflow-hidden rounded-full bg-secondary" role="progressbar" aria-valuenow={Math.round(pct)} aria-valuemin={0} aria-valuemax={100} aria-label="Queue progress">
        <div className="h-full rounded-full bg-accent transition-all" style={{ width: `${pct}%` }} />
      </div>
      {!joined ? (
        <div className="mt-3 flex gap-2">
          <button
            type="button"
            onClick={() => {
              setJoined(true);
              onInvite?.();
            }}
            className="flex-1 cursor-pointer rounded-md bg-primary px-3 py-2 font-mono text-xs font-bold uppercase text-primary-foreground transition-transform hover:scale-[1.01] active:scale-[0.99]"
          >
            Invite friends to skip
          </button>
          <button
            type="button"
            onClick={onLeave}
            className="cursor-pointer rounded-md border border-border px-3 py-2 font-mono text-xs uppercase text-muted-foreground hover:text-foreground"
          >
            Leave
          </button>
        </div>
      ) : (
        <div className="mt-3 rounded-md border border-dashed border-border p-3 text-center">
          <p className="font-mono text-xs">Share this code to move up:</p>
          <p className="mt-1 font-mono text-sm font-bold tracking-widest text-accent">{code}</p>
        </div>
      )}
    </div>
  );
}
