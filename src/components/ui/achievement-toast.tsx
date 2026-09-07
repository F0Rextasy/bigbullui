"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface AchievementToastProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  detail?: string;
  open?: boolean;
  onClose?: () => void;
}

/** Achievement toast: unlock banner with stamp seal mark. */
export function AchievementToast({ title = "First Blood", detail = "Win an opening duel", open = true, onClose, className, ...props }: AchievementToastProps) {
  if (!open) return null;
  return (
    <div
      role="status"
      aria-label={`Achievement unlocked ${title}`}
      className={cn("flex min-h-11 w-full touch-none select-none items-center gap-3 rounded-md border-2 border-foreground bg-card p-2.5 shadow-md", className)}
      style={{ touchAction: "none" }}
      {...props}
    >
      <span className="flex size-11 shrink-0 items-center justify-center rounded-full border-2 border-dashed border-accent font-mono text-sm font-black text-accent" aria-hidden="true">
        ★
      </span>
      <span className="min-w-0 flex-1">
        <span className="block font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-accent">Unlocked</span>
        <span className="block truncate font-mono text-sm font-black uppercase text-foreground">{title}</span>
        <span className="block truncate font-mono text-[11px] text-muted-foreground">{detail}</span>
      </span>
      <button
        type="button"
        onClick={onClose}
        aria-label="Dismiss achievement"
        className="flex min-h-11 min-w-11 touch-none items-center justify-center rounded-md border border-border font-mono text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        style={{ touchAction: "none" }}
      >
        ✕
      </button>
    </div>
  );
}
