"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface TurnstileGateProps extends React.HTMLAttributes<HTMLDivElement> {
  gateName?: string;
  admittedCount?: number;
  locked?: boolean;
  onAdmit?: () => void;
  className?: string;
}

export function TurnstileGate({
  gateName = "GATE A-04",
  admittedCount = 384,
  locked = false,
  onAdmit,
  className,
  ...props
}: TurnstileGateProps) {
  const [isRotating, setIsRotating] = React.useState(false);
  const [count, setCount] = React.useState(admittedCount);

  const handlePush = () => {
    if (locked || isRotating) return;
    setIsRotating(true);
    setCount((c) => c + 1);
    onAdmit?.();
    setTimeout(() => {
      setIsRotating(false);
    }, 600);
  };

  return (
    <div
      className={cn(
        "relative flex flex-col items-center rounded-lg border-2 border-foreground bg-card p-5 font-mono select-none shadow-md",
        className
      )}
      {...props}
    >
      {/* Notches */}
      <div
        aria-hidden="true"
        className="absolute -left-1.5 top-1/2 -translate-y-1/2 size-3 rounded-full border border-foreground bg-background"
      />
      <div
        aria-hidden="true"
        className="absolute -right-1.5 top-1/2 -translate-y-1/2 size-3 rounded-full border border-foreground bg-background"
      />

      {/* Header */}
      <div className="flex w-full items-center justify-between border-b border-dashed border-border pb-2 text-[10px] tracking-widest text-muted-foreground">
        <span className="font-black text-foreground">{gateName}</span>
        <div className="flex items-center gap-1.5">
          <span
            className={cn(
              "size-2 rounded-full",
              locked ? "bg-destructive" : "bg-emerald-500 animate-pulse"
            )}
          />
          <span>{locked ? "LOCKED" : "READY"}</span>
        </div>
      </div>

      {/* Mechanical Turnstile Rotor Arms */}
      <div className="my-5 flex flex-col items-center justify-center">
        <div
          style={{
            transform: isRotating ? "rotate(120deg)" : "rotate(0deg)",
            transition: "transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}
          className="relative flex size-24 items-center justify-center"
        >
          {/* Center Hub */}
          <div className="size-7 rounded-full border-2 border-foreground bg-accent shadow-xs z-10" />

          {/* 3 Arms separated by 120deg */}
          <div className="absolute h-1 w-20 rounded bg-foreground -translate-y-4" />
          <div className="absolute h-20 w-1 rounded bg-foreground translate-x-4 rotate-45" />
          <div className="absolute h-20 w-1 rounded bg-foreground -translate-x-4 -rotate-45" />
        </div>

        <button
          type="button"
          disabled={locked || isRotating}
          onClick={handlePush}
          className="mt-3 cursor-pointer rounded-md border-2 border-foreground bg-foreground px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-background shadow-xs transition-transform hover:scale-105 active:scale-95 disabled:cursor-not-allowed disabled:opacity-30"
        >
          {locked ? "ACCESS DENIED" : isRotating ? "ADMITTING..." : "PUSH ROTOR →"}
        </button>
      </div>

      {/* Footer / Counter */}
      <div className="flex w-full items-center justify-between border-t border-dashed border-border pt-2 text-[10px] text-muted-foreground">
        <span>TALLY COUNT</span>
        <span className="font-bold tabular-nums text-foreground">
          {count.toLocaleString()} PASSES
        </span>
      </div>
    </div>
  );
}
