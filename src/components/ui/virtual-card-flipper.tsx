"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface VirtualCardFlipperProps extends React.HTMLAttributes<HTMLDivElement> {
  number?: string;
  holder?: string;
  expiry?: string;
  issuer?: string;
}

export function VirtualCardFlipper({
  number = "4242424242424242",
  holder = "ADA BULL",
  expiry = "12/28",
  issuer = "BIGBULL BANK",
  className,
  ...props
}: VirtualCardFlipperProps) {
  const [flipped, setFlipped] = React.useState(false);
  const groups = (number.replace(/\D/g, "").match(/.{1,4}/g) ?? []).join("  ");

  return (
    <div className={cn("w-full max-w-sm [perspective:800px]", className)} {...props}>
      <button
        type="button"
        onClick={() => setFlipped((v) => !v)}
        aria-pressed={flipped}
        aria-label={flipped ? "Show card front" : "Show card back"}
        className="block w-full cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <div
          className="relative h-52 w-full transition-transform duration-500 motion-reduce:transition-none [transform-style:preserve-3d]"
          style={{ transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
        >
          <div className="absolute inset-0 flex flex-col justify-between rounded-xl border-2 border-foreground bg-card p-5 shadow-md [backface-visibility:hidden]">
            <div className="flex items-start justify-between">
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{issuer}</span>
              <span aria-hidden className="h-8 w-11 rounded border border-accent/60 bg-accent/20" />
            </div>
            <p className="font-mono text-lg tracking-[0.15em] tabular-nums">{groups}</p>
            <div className="flex items-end justify-between font-mono text-xs">
              <span className="uppercase text-muted-foreground">{holder}</span>
              <span className="tabular-nums">{expiry}</span>
            </div>
          </div>
          <div
            className="absolute inset-0 flex flex-col rounded-xl border-2 border-foreground bg-card shadow-md [backface-visibility:hidden]"
            style={{ transform: "rotateY(180deg)" }}
          >
            <div className="mt-5 h-9 w-full bg-foreground" aria-hidden />
            <div className="mx-5 mt-4 flex items-center justify-end rounded bg-secondary px-3 py-1.5">
              <span className="font-mono text-sm italic tabular-nums">··· 123</span>
            </div>
            <p className="mt-auto p-4 font-mono text-[10px] uppercase text-muted-foreground">
              Authorized signature — not transferable
            </p>
          </div>
        </div>
      </button>
      <p className="mt-2 text-center font-mono text-[11px] text-muted-foreground">
        Click card to {flipped ? "see front" : "see CVC"}
      </p>
    </div>
  );
}
