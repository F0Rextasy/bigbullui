"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { cn } from "./lib/utils";
import { getFocusable, lockBodyScroll, registerEscapeLayer, trapFocus } from "./lib/focus-trap";

interface SheetContextValue {
  titleId: string;
  descriptionId: string;
  registerTitle: () => () => void;
  registerDescription: () => () => void;
}

const SheetContext = React.createContext<SheetContextValue | null>(null);

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

export interface SheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  side?: "right" | "left";
  children?: React.ReactNode;
  className?: string;
  "aria-label"?: string;
  /** Dual-mode: false renders instantly with no motion. Default true. */
  animated?: boolean;
}

export function Sheet({
  open = false,
  onOpenChange,
  side = "right",
  children,
  className,
  "aria-label": ariaLabel,
  animated = true,
}: SheetProps) {
  const contentRef = React.useRef<HTMLDivElement>(null);
  const restoreRef = React.useRef<HTMLElement | null>(null);
  const onOpenChangeRef = React.useRef(onOpenChange);
  onOpenChangeRef.current = onOpenChange;

  const titleId = React.useId();
  const descriptionId = React.useId();
  const [titleCount, setTitleCount] = React.useState(0);
  const [descCount, setDescCount] = React.useState(0);

  const registerTitle = React.useCallback(() => {
    setTitleCount((c) => c + 1);
    return () => setTitleCount((c) => Math.max(0, c - 1));
  }, []);

  const registerDescription = React.useCallback(() => {
    setDescCount((c) => c + 1);
    return () => setDescCount((c) => Math.max(0, c - 1));
  }, []);

  const ctxValue = React.useMemo(
    () => ({ titleId, descriptionId, registerTitle, registerDescription }),
    [titleId, descriptionId, registerTitle, registerDescription]
  );

  React.useEffect(() => {
    if (!open) return;
    restoreRef.current = document.activeElement as HTMLElement | null;
    const content = contentRef.current;
    const focusables = content ? getFocusable(content) : [];
    (focusables[0] ?? content)?.focus();

    const releaseScroll = lockBodyScroll();
    const releaseEscape = registerEscapeLayer(() => {
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

  const hasTitle = titleCount > 0 || hasChildType(children, SheetTitle);
  const hasDescription = descCount > 0 || hasChildType(children, SheetDescription);

  const overlay = (
    <SheetContext.Provider value={ctxValue}>
      <div className="fixed inset-0 z-50 flex overflow-hidden overscroll-contain">
        <div
          aria-hidden="true"
          onClick={() => onOpenChange?.(false)}
          className={cn(
            "fixed inset-0 bg-foreground/50 backdrop-blur-[2px] overscroll-contain",
            animated && "motion-safe:animate-[fade-in_0.2s_ease-out_both]"
          )}
        />
        <div
          ref={contentRef}
          role="dialog"
          aria-modal="true"
          aria-label={ariaLabel}
          aria-labelledby={hasTitle ? titleId : undefined}
          aria-describedby={hasDescription ? descriptionId : undefined}
          tabIndex={-1}
          className={cn(
            "fixed inset-y-0 z-50 flex w-full max-w-md flex-col overflow-y-auto overscroll-contain border-[1.5px] border-foreground bg-card p-6 text-card-foreground shadow-xl outline-1 outline-dashed outline-offset-[-7px] focus:outline-none",
            animated ? "transition-transform duration-200 ease-out" : "transition-none",
            side === "right"
              ? cn("right-0", animated && "motion-safe:animate-[fade-in-up_0.25s_ease-out]")
              : cn("left-0", animated && "motion-safe:animate-[fade-in_0.25s_ease-out]"),
            className
          )}
        >
          {children}
          <button
            type="button"
            aria-label="Close"
            onClick={() => onOpenChange?.(false)}
            className="absolute right-4 top-4 cursor-pointer rounded-sm opacity-70 transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </SheetContext.Provider>
  );

  return typeof document !== "undefined" ? createPortal(overlay, document.body) : overlay;
}

export function SheetHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("mb-4 flex flex-col gap-1.5 text-start", className)} {...props} />;
}

export function SheetTitle({
  id,
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  const ctx = React.useContext(SheetContext);
  React.useEffect(() => ctx?.registerTitle(), [ctx]);
  return <h2 id={id ?? ctx?.titleId} className={cn("text-lg font-semibold tracking-tight", className)} {...props} />;
}

export function SheetDescription({
  id,
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  const ctx = React.useContext(SheetContext);
  React.useEffect(() => ctx?.registerDescription(), [ctx]);
  return <p id={id ?? ctx?.descriptionId} className={cn("text-sm text-muted-foreground", className)} {...props} />;
}
