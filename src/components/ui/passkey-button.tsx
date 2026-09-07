"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface PasskeyButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
}

/** Passkey button stub: stamp-framed passwordless sign-in trigger. */
export function PasskeyButton({ loading = false, className, children, ...props }: PasskeyButtonProps) {
  return (
    <button
      type="button"
      className={cn(
        "inline-flex w-full max-w-sm items-center justify-center gap-2 rounded-lg border-2 border-foreground bg-card px-4 py-2.5 font-mono text-xs font-bold uppercase tracking-wider text-foreground shadow-sm outline-1 outline-dashed outline-offset-[-5px] outline-border/60 transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:scale-[0.98] motion-reduce:transition-none",
        loading && "opacity-70",
        className
      )}
      {...props}
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><rect x="4" y="10" width="16" height="10" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /><circle cx="12" cy="15" r="1.5" fill="currentColor" /></svg>
      {loading ? "Verifying…" : (children ?? "Continue with passkey")}
    </button>
  );
}
