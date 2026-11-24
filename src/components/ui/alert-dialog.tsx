"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { cn } from "./lib/utils";
import {
  getFocusable,
  hideBackgroundSiblings,
  lockBodyScroll,
  registerEscapeLayer,
  trapFocus,
} from "./lib/focus-trap";
import { useIsMounted } from "./lib/react-compat";

interface AlertDialogContextValue {
  titleId: string;
  descId: string;
  close: () => void;
  registerTitle: (customId?: string) => () => void;
  registerDescription: (customId?: string) => () => void;
}

const AlertDialogContext = React.createContext<AlertDialogContextValue | null>(null);

export type AlertDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
  /** Dual-mode: false renders instantly with no motion. Default true. */
  animated?: boolean;
  confirmLabel?: string;
  cancelLabel?: string;
  destructive?: boolean;
  onConfirm?: () => void;
  onCancel?: () => void;
  children?: React.ReactNode;
  className?: string;
};

export function AlertDialogHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("rounded-md p-4", className)} {...props} />;
}

export function AlertDialogTitle({ id, className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  const ctx = React.useContext(AlertDialogContext);
  React.useEffect(() => ctx?.registerTitle(id), [ctx, id]);
  return <h2 id={id ?? ctx?.titleId} className={cn("text-lg font-semibold tracking-tight", className)} {...props} />;
}

export function AlertDialogDescription({ id, className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  const ctx = React.useContext(AlertDialogContext);
  React.useEffect(() => ctx?.registerDescription(id), [ctx, id]);
  return <p id={id ?? ctx?.descId} className={cn("text-sm text-muted-foreground", className)} {...props} />;
}

export function AlertDialogFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("mt-4 flex flex-col-reverse justify-end gap-3 sm:flex-row", className)} {...props} />;
}

export const AlertDialogCancelButton = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(function AlertDialogCancelButton({ className, onClick, ...props }, ref) {
  const ctx = React.useContext(AlertDialogContext);
  return (
    <button
      ref={ref}
      type="button"
      onClick={(e) => {
        onClick?.(e);
        if (!e.defaultPrevented) ctx?.close();
      }}
      className={cn(
        "cursor-pointer rounded-md border border-input bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        className,
      )}
      {...props}
    />
  );
});
AlertDialogCancelButton.displayName = "AlertDialogCancelButton";

export const AlertDialogActionButton = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & { destructive?: boolean }
>(function AlertDialogActionButton({ className, destructive = false, onClick, ...props }, ref) {
  const ctx = React.useContext(AlertDialogContext);
  return (
    <button
      ref={ref}
      type="button"
      onClick={(e) => {
        onClick?.(e);
        if (!e.defaultPrevented) ctx?.close();
      }}
      className={cn(
        "cursor-pointer rounded-md border px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        destructive
          ? "border-destructive bg-destructive text-destructive-foreground hover:bg-destructive/90"
          : "border-primary bg-primary text-primary-foreground hover:bg-primary/90",
        className,
      )}
      {...props}
    />
  );
});
AlertDialogActionButton.displayName = "AlertDialogActionButton";

export function AlertDialog({
  open = false,
  onOpenChange,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  destructive = false,
  animated = true,
  onConfirm,
  onCancel,
  children,
  className,
}: AlertDialogProps) {
  const mounted = useIsMounted();
  const fallbackTitleId = React.useId();
  const fallbackDescId = React.useId();
  const rootRef = React.useRef<HTMLDivElement | null>(null);
  const panelRef = React.useRef<HTMLDivElement | null>(null);
  const onOpenChangeRef = React.useRef(onOpenChange);
  const onCancelRef = React.useRef(onCancel);
  React.useLayoutEffect(() => {
    onOpenChangeRef.current = onOpenChange;
    onCancelRef.current = onCancel;
  });
  const [titleIds, setTitleIds] = React.useState<string[]>([]);
  const [descIds, setDescIds] = React.useState<string[]>([]);

  const registerTitle = React.useCallback(
    (customId?: string) => {
      const id = customId ?? fallbackTitleId;
      setTitleIds((prev) => [...prev, id]);
      return () =>
        setTitleIds((prev) => {
          const idx = prev.indexOf(id);
          return idx === -1 ? prev : [...prev.slice(0, idx), ...prev.slice(idx + 1)];
        });
    },
    [fallbackTitleId],
  );

  const registerDescription = React.useCallback(
    (customId?: string) => {
      const id = customId ?? fallbackDescId;
      setDescIds((prev) => [...prev, id]);
      return () =>
        setDescIds((prev) => {
          const idx = prev.indexOf(id);
          return idx === -1 ? prev : [...prev.slice(0, idx), ...prev.slice(idx + 1)];
        });
    },
    [fallbackDescId],
  );

  const close = React.useCallback(() => {
    onOpenChangeRef.current?.(false);
  }, []);

  const ctxValue = React.useMemo(
    () => ({
      titleId: fallbackTitleId,
      descId: fallbackDescId,
      close,
      registerTitle,
      registerDescription,
    }),
    [fallbackTitleId, fallbackDescId, close, registerTitle, registerDescription],
  );

  React.useEffect(() => {
    if (!open || !mounted) return;
    const panel = panelRef.current;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const first = panel ? getFocusable(panel)[0] : undefined;
    (first ?? panel)?.focus();

    const releaseInert = hideBackgroundSiblings(rootRef.current);
    const releaseScroll = lockBodyScroll();
    const releaseEscape = registerEscapeLayer(() => {
      onOpenChangeRef.current?.(false);
      onCancelRef.current?.();
    });

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Tab" && panel) {
        trapFocus(panel, e);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      releaseEscape();
      releaseScroll();
      releaseInert();
      previouslyFocused?.focus?.();
    };
  }, [open, mounted]);

  if (!open) return null;

  const hasTitle = Boolean(title) || titleIds.length > 0;
  const hasDesc = Boolean(description) || descIds.length > 0;
  const activeTitleId = titleIds[0] ?? fallbackTitleId;
  const activeDescId = descIds[0] ?? fallbackDescId;

  const overlay = (
    <AlertDialogContext.Provider value={ctxValue}>
      <div
        ref={rootRef}
        className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden overscroll-contain bg-foreground/50 p-4 motion-reduce:animate-none"
      >
        <div
          ref={panelRef}
          role="alertdialog"
          aria-modal="true"
          aria-labelledby={hasTitle ? activeTitleId : undefined}
          aria-describedby={hasDesc ? activeDescId : undefined}
          tabIndex={-1}
          className={cn(
            "relative max-h-[90vh] w-full max-w-lg overflow-y-auto overscroll-contain rounded-lg border border-border bg-card p-6 text-card-foreground shadow-lg focus:outline-none",
            animated ? "animate-[scale-in_0.2s_ease-out_both] motion-reduce:animate-none" : "transition-none",
            className,
          )}
          onClick={(e) => e.stopPropagation()}
        >
          {children ? (
            children
          ) : (
            <>
              <div className="space-y-1.5">
                {title && (
                  <AlertDialogTitle id={fallbackTitleId} className="mb-1">
                    {title}
                  </AlertDialogTitle>
                )}
                {description && (
                  <AlertDialogDescription id={fallbackDescId}>
                    {description}
                  </AlertDialogDescription>
                )}
              </div>
              <AlertDialogFooter>
                <AlertDialogCancelButton onClick={() => onCancel?.()} className="flex-1">
                  {cancelLabel}
                </AlertDialogCancelButton>
                <AlertDialogActionButton
                  destructive={destructive}
                  onClick={() => onConfirm?.()}
                  className="mt-2 sm:mt-0"
                >
                  {confirmLabel}
                </AlertDialogActionButton>
              </AlertDialogFooter>
            </>
          )}
        </div>
      </div>
    </AlertDialogContext.Provider>
  );

  return mounted ? createPortal(overlay, document.body) : overlay;
}

const AlertDialogCancel = AlertDialogCancelButton;
const AlertDialogAction = AlertDialogActionButton;
export { AlertDialogCancel, AlertDialogAction };
