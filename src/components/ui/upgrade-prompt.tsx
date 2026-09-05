"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface UpgradePromptProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  features?: string[];
  price?: string;
  onUpgrade?: () => void;
  onDismiss?: () => void;
}

/** Plan upgrade callout card: features + pricing + dismiss. */
export function UpgradePrompt({
  title = "Ready for unlimited power?",
  description = "Upgrade to Pro to remove all limits and empower your team.",
  features = ["Unlimited projects", "Priority support", "Advanced analytics"],
  price = "₺149/ay",
  onUpgrade,
  onDismiss,
  className,
  ...props
}: UpgradePromptProps) {
  const [dismissed, setDismissed] = React.useState(false);
  if (dismissed) return null;

  return (
    <div className={cn("relative w-full max-w-sm overflow-hidden rounded-lg border border-accent/40 bg-gradient-to-br from-accent/10 via-card to-card p-5", className)} {...props}>
      <style>{`
        @keyframes upShine { 0% { transform: translateX(-100%); } 60%, 100% { transform: translateX(220%); } }
        @keyframes upIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
      <div className="pointer-events-none absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-accent/10 to-transparent" style={{ animation: "upShine 3.5s ease-in-out infinite" }} aria-hidden="true" />
      <button
        onClick={() => { setDismissed(true); onDismiss?.(); }}
        className="absolute right-2 top-2 rounded-sm p-1 text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring motion-reduce:transition-none"
        aria-label="Kapat"
      >
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M18 6L6 18M6 6l12 12" /></svg>
      </button>

      <div className="relative animate-[upIn_0.35s_ease-out_both] motion-reduce:animate-none">
        <span className="rounded-full border border-accent/60 bg-accent/10 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-accent">Upgrade to Pro</span>
        <h3 className="mt-2 text-base font-semibold">{title}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        <ul className="mt-3 space-y-1">
          {features.map((f, i) => (
            <li key={f} className="flex items-center gap-2 text-sm animate-[upIn_0.3s_ease-out_both] motion-reduce:animate-none" style={{ animationDelay: `${0.1 + i * 0.06}s` }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-500" aria-hidden="true"><path d="M20 6L9 17l-5-5" /></svg>
              {f}
            </li>
          ))}
        </ul>
        <div className="mt-4 flex items-center justify-between gap-3">
          <span className="font-mono text-sm font-bold tabular-nums">{price}</span>
          <button
            onClick={onUpgrade}
            className={cn(
              "rounded-md bg-accent px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-accent-foreground",
              "transition-all duration-150 hover:bg-accent/90 active:scale-[0.97]",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none"
            )}
          >
            Upgrade
          </button>
        </div>
      </div>
    </div>
  );
}
