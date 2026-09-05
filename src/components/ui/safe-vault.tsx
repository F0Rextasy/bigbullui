"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface SafeVaultProps extends React.HTMLAttributes<HTMLDivElement> {
  code?: string;
  onOpen?: () => void;
}

/** Kasa: dönen disk + kod girişi + kapak açılma. */
export function SafeVault({ code = "4815", onOpen, className, ...props }: SafeVaultProps) {
  const [input, setInput] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [shaking, setShaking] = React.useState(false);

  const submit = () => {
    if (input === code) {
      setOpen(true);
      onOpen?.();
    } else {
      setShaking(true);
      setTimeout(() => setShaking(false), 400);
    }
  };

  return (
    <div className={cn("w-52 rounded-lg border-2 border-dashed border-border bg-card p-4", shaking && "animate-[svShake_0.35s_ease-out] motion-reduce:animate-none", className)} {...props}>
      <style>{`
        @keyframes svShake { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-5px); } 75% { transform: translateX(5px); } }
        @keyframes svDial { from { transform: rotate(0); } to { transform: rotate(360deg); } }
        @keyframes svOpen { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }
      `}</style>
      <p className="text-center font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">Kasa</p>

      {/* Disk */}
      <div className="mx-auto mt-3 flex size-20 items-center justify-center rounded-full border-4 border-double border-border bg-secondary/40">
        <span className={cn("font-mono text-[9px] text-muted-foreground", !open && input.length > 0 && "animate-[svDial_1s_linear]")} style={{ display: "block" }} aria-hidden="true">
          ◆
        </span>
      </div>

      {!open ? (
        <>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value.replace(/\D/g, "").slice(0, 4))}
            onKeyDown={(e) => { if (e.key === "Enter") submit(); }}
            placeholder="••••"
            inputMode="numeric"
            aria-label="Kasa kodu"
            className="mt-3 w-full rounded-md border border-input bg-background px-3 py-2 text-center font-mono text-lg tracking-[0.4em] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-colors motion-reduce:transition-none"
          />
          <button
            onClick={submit}
            className="mt-2 w-full rounded-md bg-accent py-1.5 font-mono text-[10px] uppercase tracking-widest text-accent-foreground transition-all duration-150 hover:bg-accent/90 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none"
          >
            Aç
          </button>
        </>
      ) : (
        <div className="mt-3 rounded-md border border-emerald-500/50 bg-emerald-500/10 p-3 text-center animate-[svOpen_0.3s_cubic-bezier(0.34,1.56,0.64,1)] motion-reduce:animate-none">
          <span className="text-2xl" aria-hidden="true">💎</span>
          <p className="font-mono text-[10px] uppercase tracking-wider text-emerald-600">Kasa açık</p>
          <button
            onClick={() => { setOpen(false); setInput(""); }}
            className="mt-2 font-mono text-[9px] uppercase tracking-wider text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring rounded-sm motion-reduce:transition-none"
          >
            Kilitle
          </button>
        </div>
      )}
    </div>
  );
}
