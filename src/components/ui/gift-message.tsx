"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface GiftMessageProps extends React.HTMLAttributes<HTMLDivElement> {
  from: string;
  message: string;
  onOpen?: () => void;
}

/** Hediye mesajı kartı: kurdele + zarf açma animasyonu. */
export function GiftMessage({ from, message, onOpen, className, ...props }: GiftMessageProps) {
  const [opened, setOpened] = React.useState(false);

  return (
    <div className={cn("w-full max-w-xs", className)} {...props}>
      <style>{`
        @keyframes gmPop { 0% { transform: scale(0.85) rotate(-3deg); opacity: 0; } 70% { transform: scale(1.05) rotate(1deg); } 100% { transform: scale(1) rotate(0); opacity: 1; } }
        @keyframes gmRibbon { 0%, 100% { transform: rotate(-4deg); } 50% { transform: rotate(4deg); } }
      `}</style>

      {!opened ? (
        <button
          onClick={() => { setOpened(true); onOpen?.(); }}
          className="group relative w-full overflow-hidden rounded-lg border-2 border-dashed border-accent/60 bg-card p-6 text-center transition-transform duration-200 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none"
          aria-label="Hediyeyi aç"
        >
          <span className="mx-auto mb-3 block w-max animate-[gmRibbon_2s_ease-in-out_infinite] motion-reduce:animate-none text-3xl" aria-hidden="true">🎁</span>
          <span className="block font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">{from} tarafaından hediye</span>
          <span className="mt-1 block text-sm font-medium text-accent">Açmak için dokun</span>
        </button>
      ) : (
        <div className="rounded-lg border border-accent/50 bg-gradient-to-br from-accent/10 to-card p-5 animate-[gmPop_0.4s_cubic-bezier(0.34,1.56,0.64,1)_both] motion-reduce:animate-none">
          <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">From: {from}</p>
          <p className="mt-2 text-sm leading-relaxed">{message}</p>
        </div>
      )}
    </div>
  );
}
