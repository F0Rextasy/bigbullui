"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface TwoFactorProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Backup recovery codes; displays generated sample if omitted */
  recoveryCodes?: string[];
  onConfirm?: () => void;
}

/** Two-factor authentication setup: QR code + recovery backup codes. */
export function TwoFactor({ recoveryCodes, onConfirm, className, ...props }: TwoFactorProps) {
  const codes = recoveryCodes ?? [
    "4F7A-9K2M", "B3X8-QP1D", "M2VD-88ZL", "T9RC-55WN",
    "J6HB-33YF", "W4KN-77TS", "P8QX-21GB", "R5ZM-66JV",
  ];
  const [revealed, setRevealed] = React.useState(false);
  const [copied, setCopied] = React.useState(false);

  const copyAll = () => {
    try { void navigator.clipboard?.writeText(codes.join("\n")); } catch { /* yoksay */ }
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className={cn("w-full max-w-sm space-y-5", className)} {...props}>
      <style>{`
        @keyframes twofaScan {
          0% { top: 4%; opacity: 0.9; }
          50% { top: 92%; opacity: 1; }
          100% { top: 4%; opacity: 0.9; }
        }
        @keyframes twofaIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="text-center">
        <h3 className="text-lg font-semibold tracking-tight">Two-Factor Authentication</h3>
        <p className="mt-1 text-sm text-muted-foreground">Scan the QR code with your authenticator application.</p>
      </div>

      {/* QR simulator */}
      <div className="relative mx-auto size-40 overflow-hidden rounded-lg border-2 border-dashed border-border bg-card p-3">
        <div className="grid size-full grid-cols-8 gap-0.5" aria-hidden="true">
          {Array.from({ length: 64 }).map((_, i) => {
            const on = ((i * 7 + 13) % 17) % 3 !== 0;
            return <div key={i} className={cn("rounded-[1px]", on ? "bg-foreground" : "bg-transparent")} style={{ animationDelay: `${i * 12}ms` }} />;
          })}
        </div>
        <div className="absolute left-2 right-2 h-0.5 bg-destructive/80" style={{ animation: "twofaScan 2.4s ease-in-out infinite" }} aria-hidden="true" />
      </div>

      {/* Recovery codes */}
      <div className="rounded-md border border-border bg-secondary/40 p-3 animate-[twofaIn_0.3s_ease-out_0.15s_both] motion-reduce:animate-none">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">Recovery Codes</span>
          <button
            onClick={() => setRevealed((r) => !r)}
            className="font-mono text-[9px] uppercase tracking-wider text-accent hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring rounded-sm"
          >
            {revealed ? "HIDE" : "SHOW"}
          </button>
        </div>
        <div className={cn("mt-2 grid grid-cols-2 gap-1 transition-all duration-300 motion-reduce:transition-none", revealed ? "opacity-100" : "opacity-0 select-none blur-sm")}>
          {codes.map((c, i) => (
            <code key={c} className="font-mono text-[11px] text-foreground/80" style={{ animationDelay: `${i * 30}ms` }}>{c}</code>
          ))}
        </div>
        <button
          onClick={copyAll}
          className="mt-2 w-full rounded-sm border border-dashed border-border py-1 font-mono text-[9px] uppercase tracking-wider text-muted-foreground transition-colors hover:border-foreground/40 hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring motion-reduce:transition-none"
        >
          {copied ? "✓ COPIED" : "COPY ALL"}
        </button>
      </div>

      <button
        onClick={onConfirm}
        className={cn(
          "w-full rounded-md bg-accent px-4 py-2.5 text-sm font-semibold uppercase tracking-widest text-accent-foreground",
          "transition-all duration-150 hover:bg-accent/90 active:scale-[0.98]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none",
          "animate-[twofaIn_0.3s_ease-out_0.25s_both] motion-reduce:animate-none"
        )}
      >
        Enable 2FA
      </button>
    </div>
  );
}
