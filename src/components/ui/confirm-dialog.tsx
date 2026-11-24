"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { cn } from "./lib/utils";
import { getFocusable, lockBodyScroll, registerEscapeLayer, trapFocus } from "./lib/focus-trap";

export type ConfirmDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  confirmLabel?: string;
  destructive?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  className?: string;
};

export function ConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel = "OK",
  destructive = false,
  onConfirm,
  onCancel,
  className,
}: ConfirmDialogProps) {
  const dialogRef = React.useRef<HTMLDivElement>(null);
  const restoreRef = React.useRef<HTMLElement | null>(null);
  const onCancelRef = React.useRef(onCancel);
  const onOpenChangeRef = React.useRef(onOpenChange);
  React.useEffect(() => {
    onCancelRef.current = onCancel;
    onOpenChangeRef.current = onOpenChange;
  });

  const titleId = React.useId();
  const descId = React.useId();

  React.useEffect(() => {
    if (!open) return;
    restoreRef.current = document.activeElement as HTMLElement | null;
    const content = dialogRef.current;
    const focusables = content ? getFocusable(content) : [];
    (focusables[0] ?? content)?.focus();

    const releaseScroll = lockBodyScroll();
    const releaseEscape = registerEscapeLayer(() => {
      onCancelRef.current?.();
      onOpenChangeRef.current?.(false);
    });

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Tab" && content) {
        trapFocus(content, event);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      releaseEscape();
      releaseScroll();
      restoreRef.current?.focus();
    };
  }, [open]);

  if (!open) return null;

  const overlay = (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden overscroll-contain p-4">
      <div
        aria-hidden="true"
        onClick={() => {
          onCancelRef.current?.();
          onOpenChangeRef.current?.(false);
        }}
        className="fixed inset-0 bg-foreground/50 overscroll-contain motion-safe:animate-[fade-in_0.15s_ease-out_both]"
      />
      <div
        ref={dialogRef}
        role="alertdialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={description ? descId : undefined}
        tabIndex={-1}
        className={cn(
          "relative z-10 w-full max-w-sm rounded-lg border-[1.5px] border-foreground bg-card p-6 text-card-foreground shadow-lg outline-1 outline-dashed outline-offset-[-6px] focus:outline-none motion-safe:animate-[scale-in_0.15s_ease-out_both]",
          className,
        )}
      >
        <h2 id={titleId} className="text-lg font-semibold tracking-tight">
          {title}
        </h2>
        {description ? (
          <p id={descId} className="mt-2 text-sm text-muted-foreground">
            {description}
          </p>
        ) : null}
        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="cursor-pointer rounded-md border border-border px-4 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className={cn(
              "cursor-pointer rounded-md px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none",
              destructive
                ? "bg-destructive text-white hover:bg-destructive/90"
                : "bg-accent text-accent-foreground hover:bg-accent/90",
            )}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );

  return typeof document !== "undefined" ? createPortal(overlay, document.body) : overlay;
}
