"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface ConnectionStatusProps extends React.HTMLAttributes<HTMLSpanElement> {
  latencyMs?: number;
  /** Connection state; simulated or detects navigator.onLine */
  online?: boolean;
}

/** Network status badge: live ping pulse indicator + latency. */
export function ConnectionStatus({ latencyMs, online = true, className, ...props }: ConnectionStatusProps) {
  const tone = !online ? "text-destructive" : latencyMs === undefined ? "text-emerald-600" : latencyMs < 100 ? "text-emerald-600" : latencyMs < 300 ? "text-amber-600" : "text-destructive";

  return (
    <span
      className={cn("inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider", tone, className)}
      role="status"
      {...props}
    >
      <style>{`@keyframes csPing { 0% { transform: scale(1); opacity: 0.8; } 100% { transform: scale(2.2); opacity: 0; } }`}</style>
      <span className="relative flex size-1.5">
        {online && <span className="absolute inline-flex size-full rounded-full bg-current" style={{ animation: "csPing 1.6s ease-out infinite" }} aria-hidden="true" />}
        <span className={cn("relative inline-flex size-1.5 rounded-full", online ? "bg-current" : "bg-current")} aria-hidden="true" />
      </span>
      {!online ? "Offline" : latencyMs !== undefined ? `${latencyMs}ms` : "Online"}
    </span>
  );
}
