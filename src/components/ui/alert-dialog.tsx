"use client";

import * as React from "react";
import { cn } from "./lib/utils";

type Tone = "default" | "destructive";

export type AlertDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  destructive?: boolean;
  onConfirm?: () => void;
  onCancel?: () => void;
  className?: string;
};

export function AlertDialogHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("rounded-md p-4", className)} {...props} />;
}

export function AlertDialogTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h2 className={cn("text-lg font-semibold tracking-tight", className)} {...props} />;
}

export function AlertDialogDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-sm text-muted-foreground", className)} {...props} />;
}

export function AlertDialogFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("mt-4 flex flex-col-reverse sm:flex-row gap-3 justify-end", className)} {...props} />;
}

export function AlertDialogCancelButton({ className, ...props }: React.HTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(
        "rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-colors",
        className
      )}
      {...props}
    />
  );
}

export function AlertDialogActionButton({ className, ...props }: React.HTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(
        "rounded-md border border-primary bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-colors",
        className
      )}
      {...props}
    />
  );
}

export function AlertDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  destructive = false,
  onConfirm,
  onCancel,
  className,
}: AlertDialogProps) {
  React.useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onOpenChange(false);
        onCancel?.();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onOpenChange, onCancel]);

  if (!open) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center bg-black/40",
        "motion-reduce:animate-none",
        className
      )}
    >
      <div
        className={cn(
          "relative w-full max-w-lg bg-card rounded-lg border border-border p-6 shadow-lg transition-all duration-300",
          "motion-reduce:transition-none",
          className
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0 rounded-md p-1" />
          <div className="flex-pt-1 space-y-1">
            {title && <AlertDialogTitle className="mb-1">{title}</AlertDialogTitle>}
            {description && <AlertDialogDescription>{description}</AlertDialogDescription>}
          </div>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancelButton onClick={() => { onOpenChange(false); onCancel?.(); }} className="flex-1">
            {cancelLabel}
          </AlertDialogCancelButton>
          <AlertDialogActionButton onClick={() => { onOpenChange(false); onConfirm?.(); }} className="mt-2 sm:mt-0">
            {confirmLabel}
          </AlertDialogActionButton>
        </AlertDialogFooter>
      </div>
    </div>
  );
}

const AlertDialogCancel = AlertDialogCancelButton;
const AlertDialogAction = AlertDialogActionButton;
export { AlertDialogCancel, AlertDialogAction };
