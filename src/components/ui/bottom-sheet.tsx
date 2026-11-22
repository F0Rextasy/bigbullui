"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { cn } from "./lib/utils";
import { getFocusable, lockBodyScroll, registerEscapeLayer, trapFocus } from "./lib/focus-trap";

export interface BottomSheetProps extends React.HTMLAttributes<HTMLDivElement> {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  title?: string;
  triggerLabel?: string;
  children?: React.ReactNode;
}

/** Mobile bottom sheet with pull handle, focus trap, and backdrop. */
export function BottomSheet({
  open: controlledOpen,
  onOpenChange,
  title = "Options",
  triggerLabel = "Open sheet",
  children,
  className,
  ...props
}: BottomSheetProps) {
  const [inner, setInner] = React.useState(false);
  const isControlled = controlledOpen !== undefined;
  const visible = isControlled ? controlledOpen : inner;

  const panelRef = React.useRef<HTMLDivElement>(null);
  const restoreRef = React.useRef<HTMLElement | null>(null);
  const onOpenChangeRef = React.useRef(onOpenChange);
  React.useEffect(() => {
    onOpenChangeRef.current = onOpenChange;
  });
  const titleId = React.useId();

  const setOpen = React.useCallback(
    (next: boolean) => {
      if (!isControlled) setInner(next);
      onOpenChangeRef.current?.(next);
    },
    [isControlled],
  );

  React.useEffect(() => {
    if (!visible) return;
    restoreRef.current = document.activeElement as HTMLElement | null;
    const panel = panelRef.current;
    const focusables = panel ? getFocusable(panel) : [];
    (focusables[0] ?? panel)?.focus();

    const releaseScroll = lockBodyScroll();
    const releaseEscape = registerEscapeLayer(() => setOpen(false));
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Tab" && panel) trapFocus(panel, event);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      releaseEscape();
      releaseScroll();
      restoreRef.current?.focus();
    };
  }, [visible, setOpen]);

  const sheetOverlay = visible ? (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center overflow-hidden overscroll-contain"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <div
        aria-hidden="true"
        onClick={() => setOpen(false)}
        className="absolute inset-0 bg-foreground/50 backdrop-blur-[2px] overscroll-contain motion-safe:animate-[fade-in_0.2s_ease-out_both]"
      />
      <div
        ref={panelRef}
        tabIndex={-1}
        className="relative z-10 w-full max-w-md rounded-t-xl border-2 border-b-0 border-foreground bg-card p-4 pb-6 text-card-foreground shadow-lg focus:outline-none motion-safe:animate-[sheet-up_0.25s_ease-out_both]"
      >
        <div className="mx-auto mb-3 h-1.5 w-12 rounded-full bg-border" aria-hidden="true" />
        <div className="flex items-center justify-between border-b border-dashed border-border pb-2">
          <h2 id={titleId} className="font-mono text-[11px] font-bold uppercase tracking-widest text-foreground">
            {title}
          </h2>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Dismiss"
            className="cursor-pointer rounded border border-border px-2 py-0.5 font-mono text-[11px] text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            ✕
          </button>
        </div>
        <div className="mt-3 min-h-24 text-sm text-foreground">{children}</div>
      </div>
    </div>
  ) : null;

  return (
    <div className={cn("w-full", className)} {...props}>
      {!isControlled ? (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="cursor-pointer rounded border border-foreground bg-primary px-3 py-1.5 font-mono text-[11px] font-bold uppercase text-primary-foreground active:scale-95 motion-reduce:active:scale-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {triggerLabel}
        </button>
      ) : null}
      {sheetOverlay && (typeof document !== "undefined" ? createPortal(sheetOverlay, document.body) : sheetOverlay)}
    </div>
  );
}
