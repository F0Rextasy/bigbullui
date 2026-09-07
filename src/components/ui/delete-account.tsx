"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface DeleteAccountProps extends React.HTMLAttributes<HTMLDivElement> {
  confirmText?: string;
  onDelete?: () => void;
}

/** Delete account stub: two-step stamp confirmation zone. */
export function DeleteAccount({ confirmText = "DELETE", onDelete, className, ...props }: DeleteAccountProps) {
  const [armed, setArmed] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [gone, setGone] = React.useState(false);
  if (gone) return <div className={cn("w-full max-w-sm rounded-lg border border-border bg-card p-4 text-center font-mono text-xs text-muted-foreground", className)} role="status" {...props}>Account removed</div>;
  return (
    <div className={cn("w-full max-w-sm rounded-lg border-2 border-destructive/60 bg-card p-4 outline-1 outline-dashed outline-offset-[-6px] outline-destructive/40", className)} {...props}>
      <p className="font-mono text-[11px] font-bold uppercase tracking-wider text-destructive">Danger zone</p>
      <p className="mt-1 font-mono text-[11px] text-muted-foreground">Type {confirmText} to remove the account stub.</p>
      {!armed ? (
        <button type="button" onClick={() => setArmed(true)} className="mt-2 w-full rounded-md border border-destructive/60 px-3 py-1.5 font-mono text-[11px] font-bold uppercase text-destructive focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">Delete account</button>
      ) : (
        <div className="mt-2 flex gap-1.5">
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={confirmText}
            aria-label="Type confirmation"
            className="min-w-0 flex-1 rounded-md border border-dashed border-destructive/60 bg-background px-2.5 py-1.5 font-mono text-xs uppercase text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
          <button
            type="button"
            disabled={value !== confirmText}
            onClick={() => { setGone(true); onDelete?.(); }}
            className="shrink-0 rounded-md bg-destructive px-3 py-1.5 font-mono text-[11px] font-bold uppercase text-white disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Confirm
          </button>
        </div>
      )}
    </div>
  );
}
