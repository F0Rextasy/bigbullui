"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface ForgotPasswordProps extends React.HTMLAttributes<HTMLDivElement> {
  onSend?: (email: string) => void;
}

/** Forgot password flow: email submission to confirmation state. */
export function ForgotPassword({ onSend, className, ...props }: ForgotPasswordProps) {
  const [email, setEmail] = React.useState("");
  const [sent, setSent] = React.useState(false);
  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  return (
    <div className={cn("w-full max-w-sm", className)} {...props}>
      <style>{`
        @keyframes forgotSwap {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes forgotCheck {
          from { stroke-dashoffset: 24; }
          to { stroke-dashoffset: 0; }
        }
      `}</style>

      {!sent ? (
        <div className="space-y-4 animate-[forgotSwap_0.3s_ease-out_both] motion-reduce:animate-none">
          <div>
            <h2 className="text-lg font-semibold tracking-tight">Forgot your password?</h2>
            <p className="mt-1 text-sm text-muted-foreground">Enter your email address and we will send a reset link.</p>
          </div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ornek@mail.com"
            aria-label="E-posta adresi"
            className={cn(
              "w-full rounded-md border border-input bg-background px-3 py-2 text-sm",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-colors motion-reduce:transition-none",
              email.length > 0 && !valid && "border-destructive"
            )}
          />
          <button
            onClick={() => { if (valid) { setSent(true); onSend?.(email); } }}
            disabled={!valid}
            className={cn(
              "w-full rounded-md bg-accent px-4 py-2.5 text-sm font-semibold uppercase tracking-widest text-accent-foreground",
              "transition-all duration-150 hover:bg-accent/90 active:scale-[0.98]",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none",
              "disabled:pointer-events-none disabled:opacity-40"
            )}
          >
            Send reset link
          </button>
        </div>
      ) : (
        <div className="space-y-4 text-center animate-[forgotSwap_0.3s_ease-out_both] motion-reduce:animate-none">
          <div className="mx-auto flex size-14 items-center justify-center rounded-full border-2 border-emerald-500 bg-emerald-500/10">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-500">
              <path d="M20 6L9 17l-5-5" style={{ strokeDasharray: 24, animation: "forgotCheck 0.4s ease-out 0.15s both" }} />
            </svg>
          </div>
          <div>
            <h2 className="text-lg font-semibold tracking-tight">Check your email</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              <span className="font-medium text-foreground">{email}</span> has been sent a password reset link. Check your inbox.
            </p>
          </div>
          <button
            onClick={() => { setSent(false); setEmail(""); }}
            className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring rounded-sm motion-reduce:transition-none"
          >
            ← Try another email
          </button>
        </div>
      )}
    </div>
  );
}
