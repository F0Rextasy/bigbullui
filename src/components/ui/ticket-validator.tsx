"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface TicketValidatorProps extends React.HTMLAttributes<HTMLDivElement> {
  onValidate?: (code: string) => void;
  /** null: bekliyor, true: geçerli, false: geçersiz */
  result?: boolean | null;
}

/** Bileti doğrulama cihazı: kod girişi + yeşil/kırmızı sonuç ışığı. */
export function TicketValidator({ onValidate, result, className, ...props }: TicketValidatorProps) {
  const [code, setCode] = React.useState("");
  const [internal, setInternal] = React.useState<boolean | null>(null);
  const state = result !== undefined ? result : internal;

  const submit = () => {
    if (!code.trim()) return;
    // demo: çift uzunluk geçerli
    setInternal(code.trim().length % 2 === 0);
    onValidate?.(code.trim());
    setTimeout(() => setInternal(null), 2500);
  };

  return (
    <div className={cn("w-full max-w-xs rounded-lg border border-border bg-card p-4", className)} {...props}>
      <style>{`
        @keyframes tvBlink { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
        @keyframes tvShake { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-4px); } 75% { transform: translateX(4px); } }
      `}</style>
      <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">Bilet doğrulama</p>

      {/* Işık */}
      <div className="mt-3 flex justify-center">
        <span
          className={cn(
            "flex size-14 items-center justify-center rounded-full border-4 transition-colors duration-300 motion-reduce:transition-none",
            state === null && "border-border bg-secondary",
            state === true && "border-emerald-500 bg-emerald-500/20",
            state === false && "border-destructive bg-destructive/20 animate-[tvShake_0.3s_ease-out] motion-reduce:animate-none"
          )}
          role="status"
        >
          <span
            className={cn(
              "size-5 rounded-full",
              state === null && "bg-border",
              state === true && "bg-emerald-500 animate-[tvBlink_0.8s_ease-in-out_2] motion-reduce:animate-none",
              state === false && "bg-destructive animate-[tvBlink_0.5s_ease-in-out_3] motion-reduce:animate-none"
            )}
          />
        </span>
      </div>

      <input
        value={code}
        onChange={(e) => setCode(e.target.value)}
        onKeyDown={(e) => { if (e.key === "Enter") submit(); }}
        placeholder="Bilet kodu…"
        className="mt-3 w-full rounded-md border border-input bg-background px-3 py-2 text-center font-mono text-sm uppercase tracking-widest focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-colors motion-reduce:transition-none"
        aria-label="Bilet kodu"
      />
      <button
        onClick={submit}
        disabled={!code.trim()}
        className="mt-2 w-full rounded-md bg-accent px-4 py-2 text-xs font-semibold uppercase tracking-widest text-accent-foreground transition-all duration-150 hover:bg-accent/90 active:scale-[0.97] disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none"
      >
        Doğrula
      </button>
      <p className={cn("mt-2 text-center font-mono text-[10px] uppercase tracking-wider", state === true ? "text-emerald-600" : state === false ? "text-destructive" : "text-muted-foreground")}>
        {state === null ? "Bekleniyor" : state ? "✓ GEÇERLİ" : "✗ GEÇERSİZ"}
      </p>
    </div>
  );
}
