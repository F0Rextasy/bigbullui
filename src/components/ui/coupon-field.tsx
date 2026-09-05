"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface CouponFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  onApply?: (code: string) => void;
  placeholder?: string;
}

/** Kupon kodu alanı: doğrulama + indirim uygulama animasyonu. */
export function CouponField({ onApply, placeholder = "KUPON KODU", className, ...props }: CouponFieldProps) {
  const [code, setCode] = React.useState("");
  const [state, setState] = React.useState<"idle" | "checking" | "valid" | "invalid">("idle");

  const apply = () => {
    if (code.trim().length < 4) return;
    setState("checking");
    setTimeout(() => {
      // demo: 4+ karakterli kodlar geçerli
      const ok = code.trim().length >= 4;
      setState(ok ? "valid" : "invalid");
      if (ok) onApply?.(code.trim().toUpperCase());
    }, 700);
  };

  return (
    <div className={cn("w-full max-w-sm", className)} {...props}>
      <style>{`
        @keyframes cfShake { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-5px); } 75% { transform: translateX(5px); } }
        @keyframes cfCheck { from { stroke-dashoffset: 20; } to { stroke-dashoffset: 0; } }
      `}</style>
      <div className="flex gap-2">
        <div className="relative min-w-0 flex-1">
          <input
            value={code}
            onChange={(e) => { setCode(e.target.value.toUpperCase()); if (state !== "idle") setState("idle"); }}
            onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); apply(); } }}
            placeholder={placeholder}
            disabled={state === "valid"}
            aria-label="Kupon kodu"
            aria-invalid={state === "invalid"}
            className={cn(
              "w-full rounded-md border border-dashed border-border bg-background px-3 py-2 font-mono text-sm uppercase tracking-widest",
              "transition-colors motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              state === "invalid" && "border-destructive animate-[cfShake_0.3s_ease-out] motion-reduce:animate-none",
              state === "valid" && "border-emerald-500"
            )}
          />
          {state === "valid" && (
            <span className="absolute right-2 top-1/2 -translate-y-1/2 text-emerald-500" aria-hidden="true">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" style={{ strokeDasharray: 20, animation: "cfCheck 0.3s ease-out both" }} /></svg>
            </span>
          )}
        </div>
        <button
          onClick={apply}
          disabled={code.trim().length < 4 || state === "checking" || state === "valid"}
          className={cn(
            "shrink-0 rounded-md border-2 border-dashed px-4 font-mono text-[10px] uppercase tracking-wider transition-colors motion-reduce:transition-none",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            "disabled:pointer-events-none disabled:opacity-40",
            state === "valid" ? "border-emerald-500 text-emerald-600" : "border-border hover:border-foreground hover:text-foreground"
          )}
        >
          {state === "checking" ? "…" : state === "valid" ? "✓ Uygulandı" : "Uygula"}
        </button>
      </div>
      {state === "invalid" && <p className="mt-1 text-xs text-destructive">Kod geçersiz veya süresi dolmuş.</p>}
      {state === "valid" && <p className="mt-1 text-xs text-emerald-600">İndirim sepete uygulandı!</p>}
    </div>
  );
}
