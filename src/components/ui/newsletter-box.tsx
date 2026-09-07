"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface NewsletterBoxProps extends React.HTMLAttributes<HTMLDivElement> {
  onSubscribe?: (email: string) => void;
}

/** Newsletter box: email capture with validation and success stamp. */
export function NewsletterBox({ onSubscribe, className, ...props }: NewsletterBoxProps) {
  const [email, setEmail] = React.useState("");
  const [done, setDone] = React.useState(false);
  const [invalid, setInvalid] = React.useState(false);
  return (
    <div className={cn("w-full max-w-sm rounded-lg border-2 border-foreground bg-card p-5", className)} {...props}>
      <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Playbill mail</p>
      <h3 className="mt-1 text-base font-black">Never miss a show</h3>
      {done ? (
        <p className="mt-3 rounded-md border border-dashed border-accent bg-accent/10 px-3 py-2 text-center font-mono text-xs font-bold text-accent">
          Stamped in. See you at doors.
        </p>
      ) : (
        <form
          className="mt-3 flex gap-1.5"
          onSubmit={(e) => {
            e.preventDefault();
            if (!/^\S+@\S+\.\S+$/.test(email)) {
              setInvalid(true);
              return;
            }
            setInvalid(false);
            onSubscribe?.(email);
            setDone(true);
          }}
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@arena.com"
            aria-label="Email address"
            aria-invalid={invalid}
            className={cn(
              "min-w-0 flex-1 rounded-md border-2 border-dashed bg-background px-3 py-2 font-mono text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              invalid ? "border-accent" : "border-border"
            )}
          />
          <button
            type="submit"
            className="shrink-0 rounded-md bg-primary px-3 py-2 font-mono text-[11px] font-bold uppercase text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Join
          </button>
        </form>
      )}
      {invalid && !done && <p className="mt-1.5 font-mono text-[11px] text-accent" role="alert">Enter a valid email.</p>}
    </div>
  );
}
