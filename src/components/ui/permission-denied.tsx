"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface PermissionDeniedProps extends React.HTMLAttributes<HTMLDivElement> {
  resource?: string;
  onRequestAccess?: () => void;
  requested?: boolean;
}

/** Permission denied state panel: lock icon + request access. */
export function PermissionDenied({ resource = "bu kaynak", onRequestAccess, requested, className, ...props }: PermissionDeniedProps) {
  const [sent, setSent] = React.useState(false);
  const isSent = requested ?? sent;

  return (
    <div className={cn("flex w-full max-w-sm flex-col items-center gap-4 rounded-lg border border-dashed border-border p-8 text-center", className)} {...props}>
      <style>{`@keyframes pdShake { 0%, 100% { transform: rotate(0deg); } 25% { transform: rotate(-8deg); } 75% { transform: rotate(8deg); } }`}</style>
      <span
        className="flex size-14 items-center justify-center rounded-full border-2 border-dashed border-border bg-secondary/50 text-muted-foreground"
        style={{ animation: "pdShake 0.5s ease-in-out 0.3s" }}
        aria-hidden="true"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="11" width="16" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></svg>
      </span>
      <div>
        <h2 className="text-base font-semibold">Access Denied</h2>
        <p className="mt-1 text-sm text-muted-foreground">You do not have permission to access {resource}.</p>
      </div>
      {!isSent ? (
        <button
          onClick={() => { setSent(true); onRequestAccess?.(); }}
          className={cn(
            "rounded-md border-2 border-dashed border-border px-4 py-2 font-mono text-xs uppercase tracking-widest",
            "transition-colors hover:border-accent hover:text-accent",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none"
          )}
        >
          Request Access
        </button>
      ) : (
        <span className="rounded-full border border-accent/50 bg-accent/10 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-accent animate-[pdShake_0.4s_ease-out] motion-reduce:animate-none">
          Request Sent
        </span>
      )}
    </div>
  );
}
