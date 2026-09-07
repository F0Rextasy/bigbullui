"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface ScratchCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  prize?: string;
  code?: string;
  coverText?: string;
  onReveal?: (code: string) => void;
}

export function ScratchCard({ prize = "20% OFF", code = "BB-SCRATCH-20", coverText = "SCRATCH HERE", className, ...props }: ScratchCardProps) {
  const [scratched, setScratched] = React.useState(0);
  const [revealed, setRevealed] = React.useState(false);
  const [copied, setCopied] = React.useState(false);
  const areaRef = React.useRef<HTMLDivElement>(null);

  const scratch = (clientX: number, clientY: number) => {
    const el = areaRef.current;
    if (!el || revealed) return;
    const rect = el.getBoundingClientRect();
    if (clientX < rect.left || clientX > rect.right || clientY < rect.top || clientY > rect.bottom) return;
    setScratched((s) => Math.min(s + 7, 100));
  };

  React.useEffect(() => {
    if (scratched >= 60 && !revealed) setRevealed(true);
  }, [scratched, revealed ]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
    } catch {
      /* ignore */
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  };

  React.useEffect(() => {
    if (revealed) return;
    const el = areaRef.current;
    if (!el) return;
    const onMove = (e: PointerEvent) => {
      if (e.buttons > 0) scratch(e.clientX, e.clientY);
    };
    el.addEventListener("pointermove", onMove);
    return () => el.removeEventListener("pointermove", onMove);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [revealed ]);

  return (
    <div className={cn("w-full max-w-xs overflow-hidden rounded-lg border-2 border-foreground bg-card", className)} {...props}>
      <p className="border-b border-dashed border-border px-4 py-2 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
        Lucky stub
      </p>
      <div
        ref={areaRef}
        onPointerDown={(e) => scratch(e.clientX, e.clientY)}
        role="button"
        tabIndex={0}
        aria-label={revealed ? `Revealed: ${prize}` : "Scratch to reveal prize"}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            setScratched(100);
            setRevealed(true);
          }
        }}
        className="relative m-4 flex h-32 cursor-crosshair touch-none items-center justify-center rounded-md bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <div className="text-center">
          <p className="text-2xl font-bold">{prize}</p>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              copy();
            }}
            className="mt-1 cursor-pointer rounded border border-dashed border-foreground/40 px-2 py-0.5 font-mono text-xs hover:border-foreground"
          >
            {copied ? "Copied!" : code}
          </button>
        </div>
        {!revealed ? (
          <div
            aria-hidden
            className="absolute inset-0 flex items-center justify-center rounded-md bg-muted transition-opacity"
            style={{ opacity: 1 - scratched / 70 }}
          >
            <span className="rounded border border-dashed border-foreground/50 bg-card px-3 py-1 font-mono text-xs font-bold uppercase">
              {coverText}
            </span>
          </div>
        ) : null}
      </div>
      <div className="mx-4 mb-4 h-1.5 overflow-hidden rounded-full bg-secondary" aria-hidden>
        <div className="h-full rounded-full bg-accent transition-all" style={{ width: `${scratched}%` }} />
      </div>
    </div>
  );
}
