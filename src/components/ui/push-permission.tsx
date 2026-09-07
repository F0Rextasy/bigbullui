"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface PushPermissionProps extends React.HTMLAttributes<HTMLDivElement> {
  onAllow?: () => void;
  onLater?: () => void;
}

/** Push permission: showtime alert opt-in card. */
export function PushPermission({ onAllow, onLater, className, ...props }: PushPermissionProps) {
  const [choice, setChoice] = React.useState<"allow" | "later" | null>(null);
  return (
    <div className={cn("w-full max-w-sm rounded-lg border-2 border-foreground bg-card p-5 text-center", className)} {...props}>
      <span aria-hidden="true" className="mx-auto flex size-11 items-center justify-center rounded-full border-2 border-dashed border-accent bg-accent/10">
        <span className="relative flex size-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60 motion-reduce:animate-none" />
          <span className="relative inline-flex size-2.5 rounded-full bg-accent" />
        </span>
      </span>
      <h3 className="mt-2.5 text-sm font-black">Showtime alerts?</h3>
      <p className="mt-1 font-mono text-xs text-muted-foreground">Gate changes and last calls, straight to you.</p>
      {choice ? (
        <p className="mt-3 rounded-md border border-dashed border-border px-3 py-2 font-mono text-xs text-muted-foreground" aria-live="polite">
          {choice === "allow" ? "Alerts on. Break a leg." : "Maybe later. No hard feelings."}
        </p>
      ) : (
        <div className="mt-3 flex gap-1.5">
          <button
            type="button"
            onClick={() => {
              setChoice("allow");
              onAllow?.();
            }}
            className="flex-1 rounded-md bg-primary py-2 font-mono text-[11px] font-bold uppercase text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Allow
          </button>
          <button
            type="button"
            onClick={() => {
              setChoice("later");
              onLater?.();
            }}
            className="flex-1 rounded-md border border-dashed border-border py-2 font-mono text-[11px] font-bold uppercase transition-colors hover:border-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none"
          >
            Later
          </button>
        </div>
      )}
    </div>
  );
}
