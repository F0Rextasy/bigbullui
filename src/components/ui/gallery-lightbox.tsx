"use client";

import * as React from "react";
import { getFocusable, lockBodyScroll, registerEscapeLayer, trapFocus } from "./lib/focus-trap";
import { cn } from "./lib/utils";

export interface GalleryLightboxProps extends React.HTMLAttributes<HTMLDivElement> {
  items?: string[];
}

/** Gallery lightbox stub: thumb grid with keyboard-paged viewer. */
export function GalleryLightbox({ items = ["STAGE A", "CROWD", "VIP BOX", "ENCORE"], className, ...props }: GalleryLightboxProps) {
  const [index, setIndex] = React.useState<number | null>(null);
  const isOpen = index !== null;
  const panelRef = React.useRef<HTMLDivElement>(null);
  const restoreRef = React.useRef<HTMLElement | null>(null);
  const close = React.useCallback(() => setIndex(null), []);
  React.useEffect(() => {
    if (!isOpen) return;
    restoreRef.current = document.activeElement as HTMLElement | null;
    const releaseScroll = lockBodyScroll();
    const releaseEscape = registerEscapeLayer(close);
    const onKey = (e: KeyboardEvent) => {
      if (panelRef.current) trapFocus(panelRef.current, e);
      if (e.key === "ArrowRight") setIndex((i) => (i === null ? i : (i + 1) % items.length));
      if (e.key === "ArrowLeft") setIndex((i) => (i === null ? i : (i - 1 + items.length) % items.length));
    };
    window.addEventListener("keydown", onKey);
    if (panelRef.current) {
      const focusables = getFocusable(panelRef.current);
      (focusables[0] ?? panelRef.current).focus();
    }
    return () => {
      window.removeEventListener("keydown", onKey);
      releaseEscape();
      releaseScroll();
      restoreRef.current?.focus();
    };
  }, [isOpen, items.length, close]);
  return (
    <div className={cn("w-full max-w-md", className)} {...props}>
      <div className="grid grid-cols-4 gap-1.5" role="list" aria-label="Gallery">
        {items.map((t, i) => (
          <button
            key={t}
            type="button"
            onClick={() => setIndex(i)}
            className="flex aspect-square items-center justify-center rounded-md border border-dashed border-border bg-card p-1 text-center font-mono text-[9px] font-bold uppercase text-foreground hover:border-accent/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {t}
          </button>
        ))}
      </div>
      {index !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-background/90" onClick={close} aria-hidden="true" />
          <div ref={panelRef} tabIndex={-1} role="dialog" aria-modal="true" aria-label={items[index]} className="relative z-10 w-full max-w-sm rounded-lg border-2 border-foreground bg-card p-8 text-center outline-1 outline-dashed outline-offset-[-6px] outline-border/60 focus:outline-none">
            <p className="font-mono text-lg font-black uppercase text-foreground">{items[index]}</p>
            <p className="mt-1 font-mono text-[11px] tabular-nums text-muted-foreground">{index + 1} / {items.length}</p>
            <div className="mt-3 flex justify-center gap-2">
              <button type="button" onClick={() => setIndex((index - 1 + items.length) % items.length)} aria-label="Previous" className="rounded border border-border px-2.5 py-1 font-mono text-xs text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">‹</button>
              <button type="button" onClick={close} className="rounded bg-primary px-3 py-1 font-mono text-[11px] font-bold uppercase text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">Close</button>
              <button type="button" onClick={() => setIndex((index + 1) % items.length)} aria-label="Next" className="rounded border border-border px-2.5 py-1 font-mono text-xs text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">›</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
