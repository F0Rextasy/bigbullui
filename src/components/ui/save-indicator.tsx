"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface SaveIndicatorProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** idle | saving | saved | error */
  status?: "idle" | "saving" | "saved" | "error";
  label?: string;
}

/** Autosave state indicator: smooth state transitions with checkmark. */
export function SaveIndicator({ status = "idle", label, className, ...props }: SaveIndicatorProps) {
  const meta: Record<string, { text: string; tone: string; icon: React.ReactNode }> = {
    idle: { text: "Kaydedildi", tone: "text-muted-foreground", icon: <span className="size-1.5 rounded-full bg-border" /> },
    saving: { text: "Kaydediliyor…", tone: "text-muted-foreground", icon: <span className="size-2.5 rounded-full border-2 border-border border-t-accent animate-spin motion-reduce:animate-none" /> },
    saved: { text: "✓ Kaydedildi", tone: "text-emerald-600", icon: <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse motion-reduce:animate-none" /> },
    error: { text: "Kaydedilemedi", tone: "text-destructive", icon: <span className="size-1.5 rounded-full bg-destructive animate-pulse motion-reduce:animate-none" /> },
  };
  const m = meta[status];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider",
        "transition-all duration-300 motion-reduce:transition-none",
        m.tone,
        className
      )}
      role="status"
      aria-live="polite"
      {...props}
    >
      {m.icon}
      {label ?? m.text}
    </span>
  );
}
