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
import { useControllableState } from "./lib/use-controllable-state";

interface DialogContextValue {
  titleId: string;
  descriptionId: string;
  registerTitle: (customId?: string) => () => void;
  registerDescription: (customId?: string) => () => void;
}

const DialogContext = React.createContext<DialogContextValue | null>(null);

export type DialogProps = {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: React.ReactNode;
  className?: string;
  "aria-label"?: string;
  hideCloseButton?: boolean;
  /** Dual-mode: false renders instantly with no motion. Default true. */
  animated?: boolean;
};

function hasChildType(children: React.ReactNode, target: unknown): boolean {
  let found = false;
  React.Children.forEach(children, (child) => {
    if (found || !React.isValidElement(child)) return;
    if (child.type === target) {
      found = true;
      return;
    }
    const props = child.props as { children?: React.ReactNode };
    if (props?.children && hasChildType(props.children, target)) {
      found = true;
    }
  });
  return found;
}

export function Dialog({
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  children,
  className,
  "aria-label": ariaLabel,
  hideCloseButton = false,
  animated = true,
}: DialogProps) {
  const [open, setOpen] = useControllableState<boolean>({
    prop: controlledOpen,
    defaultProp: defaultOpen,
    onChange: onOpenChange,
  });
  const mounted = useIsMounted();
  const rootRef = React.useRef<HTMLDivElement>(null);
  const contentRef = React.useRef<HTMLDivElement>(null);
  const restoreRef = React.useRef<HTMLElement | null>(null);
  const setOpenRef = React.useRef(setOpen);
  React.useLayoutEffect(() => {
    setOpenRef.current = setOpen;
  });

  const fallbackTitleId = React.useId();
  const fallbackDescId = React.useId();
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

  const ctxValue = React.useMemo(
    () => ({
      titleId: fallbackTitleId,
      descriptionId: fallbackDescId,
      registerTitle,
      registerDescription,
    }),
    [fallbackTitleId, fallbackDescId, registerTitle, registerDescription],
  );

  React.useEffect(() => {
    if (!open || !mounted) return;
    restoreRef.current = document.activeElement as HTMLElement | null;
    const content = contentRef.current;
    const focusables = content ? getFocusable(content) : [];
    (focusables[0] ?? content)?.focus();

    const releaseInert = hideBackgroundSiblings(rootRef.current);
    const releaseScroll = lockBodyScroll();
    const releaseEscape = registerEscapeLayer(() => {
      setOpenRef.current(false);
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
      releaseInert();
      restoreRef.current?.focus();
    };
  }, [open, mounted]);

  if (!open) return null;

  const hasTitle = titleIds.length > 0 || hasChildType(children, DialogTitle);
  const hasDescription = descIds.length > 0 || hasChildType(children, DialogDescription);
  const activeTitleId = titleIds[0] ?? fallbackTitleId;
  const activeDescId = descIds[0] ?? fallbackDescId;

  const overlay = (
    <DialogContext.Provider value={ctxValue}>
      <div ref={rootRef} className="fixed inset-0 z-50 overflow-hidden overscroll-contain">
        <div
          aria-hidden="true"
          onClick={() => setOpen(false)}
          className={cn(
            "fixed inset-0 bg-foreground/50 overscroll-contain",
            animated && "motion-safe:animate-[fade-in_0.2s_ease-out_both]",
          )}
        />
        <div
          ref={contentRef}
          role="dialog"
          aria-modal="true"
          aria-label={ariaLabel}
          aria-labelledby={hasTitle ? activeTitleId : undefined}
          aria-describedby={hasDescription ? activeDescId : undefined}
          tabIndex={-1}
          className={cn(
            "fixed start-1/2 top-1/2 max-h-[90vh] w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 overflow-y-auto overscroll-contain rounded-lg border-[1.5px] border-foreground bg-card p-6 text-card-foreground shadow-lg outline-1 outline-dashed outline-offset-[-7px] focus:outline-none rtl:translate-x-1/2",
            animated && "animate-[scale-in_0.2s_ease-out_both] motion-reduce:animate-none!",
            className,
          )}
        >
          {children}
          {!hideCloseButton && (
            <button
              type="button"
              aria-label="Close"
              onClick={() => setOpen(false)}
              className="absolute end-3 top-3 cursor-pointer rounded-sm p-1.5 opacity-70 transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </DialogContext.Provider>
  );

  return mounted ? createPortal(overlay, document.body) : overlay;
}

export function DialogHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("mb-4 flex flex-col gap-1.5 text-start", className)} {...props} />;
}

export function DialogTitle({ id, className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  const ctx = React.useContext(DialogContext);
  React.useEffect(() => ctx?.registerTitle(id), [ctx, id]);
  return <h2 id={id ?? ctx?.titleId} className={cn("text-lg font-semibold tracking-tight", className)} {...props} />;
}

export function DialogDescription({ id, className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  const ctx = React.useContext(DialogContext);
  React.useEffect(() => ctx?.registerDescription(id), [ctx, id]);
  return <p id={id ?? ctx?.descriptionId} className={cn("text-sm text-muted-foreground", className)} {...props} />;
}

export function DialogFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className)} {...props} />;
}
