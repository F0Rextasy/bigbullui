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

interface SheetContextValue {
  titleId: string;
  descriptionId: string;
  registerTitle: (customId?: string) => () => void;
  registerDescription: (customId?: string) => () => void;
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
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  side?: "right" | "left" | "top" | "bottom";
  hideCloseButton?: boolean;
  children?: React.ReactNode;
  className?: string;
  "aria-label"?: string;
  /** Dual-mode: false renders instantly with no motion. Default true. */
  animated?: boolean;
}

export function Sheet({
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  side = "right",
  hideCloseButton = false,
  children,
  className,
  "aria-label": ariaLabel,
  animated = true,
}: SheetProps) {
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

  const hasTitle = titleIds.length > 0 || hasChildType(children, SheetTitle);
  const hasDescription = descIds.length > 0 || hasChildType(children, SheetDescription);
  const activeTitleId = titleIds[0] ?? fallbackTitleId;
  const activeDescId = descIds[0] ?? fallbackDescId;

  const sideClasses =
    side === "right"
      ? cn("inset-y-0 end-0 w-full max-w-md", animated && "motion-safe:animate-[hsRight_0.25s_ease-out_both]")
      : side === "left"
        ? cn("inset-y-0 start-0 w-full max-w-md", animated && "motion-safe:animate-[slide-in_0.25s_ease-out_both]")
        : side === "top"
          ? cn("inset-x-0 top-0 max-h-[85vh] w-full", animated && "motion-safe:animate-[csIn_0.25s_ease-out_both]")
          : cn("inset-x-0 bottom-0 max-h-[85vh] w-full", animated && "motion-safe:animate-[sheet-up_0.25s_ease-out_both]");

  const overlay = (
    <SheetContext.Provider value={ctxValue}>
      <div ref={rootRef} className="fixed inset-0 z-50 flex overflow-hidden overscroll-contain">
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
            "fixed z-50 flex flex-col overflow-y-auto overscroll-contain border-[1.5px] border-foreground bg-card p-6 text-card-foreground shadow-xl outline-1 outline-dashed outline-offset-[-7px] focus:outline-none",
            animated ? "transition-transform duration-200 ease-out" : "transition-none",
            sideClasses,
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
          )}
        </div>
      </div>
    </SheetContext.Provider>
  );

  return mounted ? createPortal(overlay, document.body) : overlay;
}

export function SheetHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("mb-4 flex flex-col gap-1.5 text-start", className)} {...props} />;
}

export function SheetTitle({ id, className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  const ctx = React.useContext(SheetContext);
  React.useEffect(() => ctx?.registerTitle(id), [ctx, id]);
  return <h2 id={id ?? ctx?.titleId} className={cn("text-lg font-semibold tracking-tight", className)} {...props} />;
}

export function SheetDescription({ id, className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  const ctx = React.useContext(SheetContext);
  React.useEffect(() => ctx?.registerDescription(id), [ctx, id]);
  return <p id={id ?? ctx?.descriptionId} className={cn("text-sm text-muted-foreground", className)} {...props} />;
}
