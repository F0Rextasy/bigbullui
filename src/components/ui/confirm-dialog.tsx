"use client";

import * as React from "react";
import { cn } from "./lib/utils";

const FOCUSABLE = 'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

export type ConfirmDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  confirmLabel?: string;
  destructive?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
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
}: ConfirmDialogProps) {
  const dialogRef = React.useRef<HTMLDivElement>(null);
  const restoreRef = React.useRef<HTMLElement | null>(null);

  React.useEffect(() => {
    if (!open) return;
    restoreRef.current = document.activeElement as HTMLElement | null;
    const content = dialogRef.current;
    const focusables = content?.querySelectorAll<HTMLElement>(FOCUSABLE);
    (focusables?.[0] ?? content)?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.stopPropagation();
        onCancel();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
      if (restoreRef.current) {
        restoreRef.current.focus();
      }
    };
  }, [open, onOpenChange]);

  if (!open) return null;

  return (
    <div
      ref={dialogRef}
      className={cn(
        "fixed inset-0 z-50 items-center justify-center bg-black/50 backdrop-blur-sm",
        "motion-reduce:animate-none",
      )}
    >
      <div
        ref={dialogRef}
        className={cn(
          "bg-card rounded-md border border-border w-80 max-w-full shadow-lg",
          "motion-reduce:animate-none",
        )}
      >
        <div className={cn("p-6", "motion-reduce:animate-none")}>
          <h3 className={cn("text-lg font-semibold tracking-tight", "motion-reduce:animate-none")}>
            {title}
          </h3>
          {description && (
            <p className={cn("text-sm text-muted-foreground mt-2", "motion-reduce:animate-none")}>
              {description}
            </p>
          )}
          <div className={cn("mt-6 flex gap-3 justify-end", "motion-reduce:animate-none")}>
            <button
              onClick={onCancel}
              className={cn(
                "px-4 py-2 text-sm text-muted-foreground rounded-md hover:bg-muted hover:text-foreground transition-colors",
                "motion-reduce:transition-none",
                "motion-reduce:animate-none",
              )}
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className={cn(
                destructive
                  ? "px-4 py-2 text-sm font-medium rounded-md bg-destructive text-destructive hover:bg-destructive/90"
                  : "px-4 py-2 text-sm font-medium rounded-md bg-accent text-accent-foreground hover:bg-accent/90",
                "motion-reduce:transition-none",
                "motion-reduce:animate-none",
              )}
            >
              {confirmLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}