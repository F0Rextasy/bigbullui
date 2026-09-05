"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface SyncStatusProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** idle | syncing | synced | error */
  status?: "idle" | "syncing" | "synced" | "error";
  lastSync?: string;
}

/** Sync status badge: spinning sync icon + last synced timestamp. */
export function SyncStatus({ status = "idle", lastSync, className, ...props }: SyncStatusProps) {
  const meta = {
    idle: { text: "Ready", icon: "text-muted-foreground", spin: false },
    syncing: { text: "Senkronize ediliyor…", icon: "text-accent", spin: true },
    synced: { text: "Senkronize", icon: "text-emerald-600", spin: false },
    error: { text: "Sync error", icon: "text-destructive", spin: false },
  }[status];

  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground", className)} role="status" {...props}>
      <svg
        width="11"
        height="11"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={cn(meta.icon, meta.spin && "animate-spin motion-reduce:animate-none")}
        aria-hidden="true"
      >
        {status === "synced"
          ? <path d="M20 6L9 17l-5-5" />
          : <><path d="M21 12a9 9 0 1 1-2.64-6.36" /><path d="M21 3v6h-6" /></>}
      </svg>
      {meta.text}
      {lastSync && status !== "syncing" && <span className="opacity-60">· {lastSync}</span>}
    </span>
  );
}
