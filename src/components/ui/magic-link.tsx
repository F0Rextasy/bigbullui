"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface MagicLinkProps extends React.HTMLAttributes<HTMLDivElement> {
  onSend?: (email: string) => void;
}

/** Magic link stub: email field with sent-state confirmation. */
export function MagicLink({ onSend, className, ...props }: MagicLinkProps) {
  const [email, setEmail] = React.useState("");
  const [sent, setSent] = React.useState(false);
  const send = () => { if (!email.includes("@")) return; setSent(true); onSend?.(email); };
  return (
    <div className={cn("w-full max-w-sm rounded-lg border border-border bg-card p-4", className)} {...props}>
      <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">Magic link sign in</span>
      {sent ? (
        <div className="mt-2 rounded-md border border-dashed border-accent/60 bg-accent/10 p-3 text-center" role="status">
          <p className="font-mono text-xs font-bold text-foreground">Check your inbox</p>
          <p className="mt-0.5 font-mono text-[11px] text-muted-foreground">Link sent to {email}</p>
          <button type="button" onClick={() => setSent(false)} className="mt-1 font-mono text-[10px] uppercase text-accent hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">Resend</button>
        </div>
      ) : (
        <div className="mt-2 flex gap-1.5">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") send(); }}
            placeholder="you@arena.com"
            aria-label="Email address"
            className="min-w-0 flex-1 rounded-md border border-dashed border-border bg-background px-2.5 py-1.5 font-mono text-xs text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
          <button
            type="button"
            onClick={send}
            className="shrink-0 rounded-md bg-accent px-3 py-1.5 font-mono text-[11px] font-bold uppercase text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Send
          </button>
        </div>
      )}
    </div>
  );
}
