"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { cn } from "./lib/utils";
import { getFocusable, lockBodyScroll, registerEscapeLayer, trapFocus } from "./lib/focus-trap";

interface DrawerContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  titleId: string;
  descriptionId: string;
  contentId: string;
  hasTitle: boolean;
  hasDescription: boolean;
  registerTitle: () => () => void;
  registerDescription: () => () => void;
}

const DrawerContext = React.createContext<DrawerContextValue | null>(null);

function useDrawerContext() {
  const ctx = React.useContext(DrawerContext);
  if (!ctx) {
    throw new Error("Drawer subcomponents must be used within a Drawer root");
  }
  return ctx;
}

export interface DrawerProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: React.ReactNode;
}

export function Drawer({
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  children,
}: DrawerProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : uncontrolledOpen;

  const titleId = React.useId();
  const descriptionId = React.useId();
  const contentId = React.useId();
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

  const setOpen = React.useCallback(
    (nextOpen: boolean) => {
      if (!isControlled) {
        setUncontrolledOpen(nextOpen);
      }
      onOpenChange?.(nextOpen);
    },
    [isControlled, onOpenChange]
  );

  const ctxValue = React.useMemo(
    () => ({
      open,
      setOpen,
      titleId,
      descriptionId,
      contentId,
      hasTitle: titleCount > 0,
      hasDescription: descCount > 0,
      registerTitle,
      registerDescription,
    }),
    [open, setOpen, titleId, descriptionId, contentId, titleCount, descCount, registerTitle, registerDescription]
  );

  return (
    <DrawerContext.Provider value={ctxValue}>
      {children}
    </DrawerContext.Provider>
  );
}

export interface DrawerTriggerProps extends React.HTMLAttributes<HTMLElement> {
  asChild?: boolean;
  children?: React.ReactNode;
}

export function DrawerTrigger({
  asChild = false,
  children,
  className,
  ...props
}: DrawerTriggerProps) {
  const ctx = useDrawerContext();

  if (asChild && React.isValidElement(children)) {
    const child = children as React.ReactElement<React.HTMLAttributes<HTMLElement>>;
    return React.cloneElement(child, {
      "aria-haspopup": "dialog",
      "aria-expanded": ctx.open,
      "aria-controls": ctx.open ? ctx.contentId : undefined,
      onClick: (e: React.MouseEvent<HTMLElement>) => {
        child.props.onClick?.(e);
        ctx.setOpen(true);
      },
    });
  }

  return (
    <button
      type="button"
      aria-haspopup="dialog"
      aria-expanded={ctx.open}
      aria-controls={ctx.open ? ctx.contentId : undefined}
      onClick={() => ctx.setOpen(true)}
      className={cn(
        "inline-flex items-center justify-center font-mono text-xs font-bold uppercase tracking-wider",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export interface DrawerContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
  showCloseButton?: boolean;
  dismissThreshold?: number;
}

export function DrawerContent({
  children,
  className,
  showCloseButton = true,
  dismissThreshold = 80,
  ...props
}: DrawerContentProps) {
  const ctx = useDrawerContext();
  const contentRef = React.useRef<HTMLDivElement>(null);
  const restoreRef = React.useRef<HTMLElement | null>(null);
  const setOpenRef = React.useRef(ctx.setOpen);
  React.useEffect(() => {
    setOpenRef.current = ctx.setOpen;
  });

  const [dragOffset, setDragOffset] = React.useState(0);
  const [isDragging, setIsDragging] = React.useState(false);
  const startYRef = React.useRef<number>(0);
  const currentOffsetRef = React.useRef<number>(0);

  // Focus trap & escape key handler
  React.useEffect(() => {
    if (!ctx.open) return;
    restoreRef.current = document.activeElement as HTMLElement | null;
    const content = contentRef.current;
    const focusables = content ? getFocusable(content) : [];
    (focusables[0] ?? content)?.focus();

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
      restoreRef.current?.focus();
      currentOffsetRef.current = 0;
      setDragOffset(0);
      setIsDragging(false);
    };
  }, [ctx.open]);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    startYRef.current = e.clientY;
    currentOffsetRef.current = 0;
    setIsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const deltaY = e.clientY - startYRef.current;
    if (deltaY > 0) {
      // Dragging down to dismiss
      currentOffsetRef.current = deltaY;
      setDragOffset(deltaY);
    } else {
      // Dragging upward with elastic resistance
      const resisted = deltaY * 0.15;
      currentOffsetRef.current = resisted;
      setDragOffset(resisted);
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    setIsDragging(false);
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // Ignore if pointer capture was already released
    }

    if (currentOffsetRef.current > dismissThreshold) {
      ctx.setOpen(false);
    }
    setDragOffset(0);
    currentOffsetRef.current = 0;
  };

  if (!ctx.open) return null;

  const overlay = (
    <div className="fixed inset-0 z-50 overflow-hidden overscroll-contain">
      {/* Backdrop blur overlay */}
      <div
        aria-hidden="true"
        onClick={() => ctx.setOpen(false)}
        className="fixed inset-0 bg-foreground/60 backdrop-blur-sm overscroll-contain motion-safe:animate-[fade-in_0.2s_ease-out_both]"
      />

      {/* Slide-up ticket stub admission drawer */}
      <div
        ref={contentRef}
        role="dialog"
        aria-modal="true"
        id={ctx.contentId}
        aria-labelledby={ctx.hasTitle ? ctx.titleId : undefined}
        aria-describedby={ctx.hasDescription ? ctx.descriptionId : undefined}
        tabIndex={-1}
        style={{
          transform: `translateY(${Math.max(0, dragOffset)}px)`,
          transition: isDragging ? "none" : "transform 0.28s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
        className={cn(
          "fixed inset-x-0 bottom-0 z-50 flex max-h-[88vh] flex-col overscroll-contain rounded-t-2xl border-t-2 border-x-2 border-foreground bg-card text-card-foreground shadow-2xl outline-1 outline-dashed outline-offset-[-7px] outline-border focus:outline-none sm:max-w-xl sm:mx-auto motion-safe:animate-[fade-in-up_0.25s_ease-out]",
          className
        )}
        {...props}
      >
        {/* Pull Handle and Perforated Ticket Notch Rim Header */}
        <div
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          className="relative w-full cursor-grab active:cursor-grabbing select-none touch-none pt-3 pb-2 text-center"
        >
          {/* Touch pull handle pill */}
          <div className="mx-auto h-1.5 w-14 rounded-full bg-muted-foreground/35 hover:bg-muted-foreground/55 transition-colors" />

          {/* Micro Ticket Stub Admission Eyebrow */}
          <div className="mt-2 flex items-center justify-center gap-2">
            <span className="font-mono text-[9px] font-bold uppercase tracking-[0.25em] text-muted-foreground">
              ADMISSION STUB • TEAR ALONG NOTCH RIM
            </span>
          </div>

          {/* Scalloped Perforated Notch Rim */}
          <div
            className="relative mt-2 flex items-center justify-between px-0 overflow-hidden"
            aria-hidden="true"
          >
            {/* Left Deep Ticket Punch Notch */}
            <span className="absolute -left-3.5 top-1/2 -translate-y-1/2 size-7 rounded-full bg-background border-2 border-foreground shrink-0 z-20" />

            {/* Perforated dashed line with ticket hole punches */}
            <div className="flex w-full items-center justify-between border-y-2 border-dashed border-border py-1 px-4 bg-secondary/30">
              {Array.from({ length: 14 }).map((_, i) => (
                <span
                  key={i}
                  className="size-2 rounded-full bg-background border border-foreground/40 shrink-0"
                />
              ))}
            </div>

            {/* Right Deep Ticket Punch Notch */}
            <span className="absolute -right-3.5 top-1/2 -translate-y-1/2 size-7 rounded-full bg-background border-2 border-foreground shrink-0 z-20" />
          </div>
        </div>

        {/* Close Button */}
        {showCloseButton && (
          <button
            type="button"
            aria-label="Close drawer"
            onClick={() => ctx.setOpen(false)}
            className="absolute right-4 top-3.5 z-30 cursor-pointer rounded-sm p-1 text-muted-foreground opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring"
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

        {children}
      </div>
    </div>
  );

  return typeof document !== "undefined" ? createPortal(overlay, document.body) : overlay;
}

export function DrawerHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex flex-col gap-1.5 px-6 py-2 text-start", className)} {...props} />;
}

export function DrawerTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  const ctx = useDrawerContext();
  React.useEffect(() => ctx.registerTitle(), [ctx]);
  return (
    <h2
      id={ctx.titleId}
      className={cn("font-sans text-lg font-bold tracking-tight text-foreground", className)}
      {...props}
    />
  );
}

export type DrawerDescriptionProps = React.HTMLAttributes<HTMLParagraphElement>;

export function DrawerDescription({
  className,
  ...props
}: DrawerDescriptionProps) {
  const ctx = useDrawerContext();
  React.useEffect(() => ctx.registerDescription(), [ctx]);
  return (
    <p
      id={ctx.descriptionId}
      className={cn("font-mono text-xs text-muted-foreground", className)}
      {...props}
    />
  );
}

export function DrawerBody({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex-1 overflow-y-auto px-6 py-3 text-sm", className)}
      {...props}
    />
  );
}

export function DrawerFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "mt-auto flex flex-col-reverse gap-2 border-t-2 border-dashed border-border px-6 py-4 sm:flex-row sm:justify-end",
        className
      )}
      {...props}
    />
  );
}

export interface DrawerCloseProps extends React.HTMLAttributes<HTMLElement> {
  asChild?: boolean;
  children?: React.ReactNode;
}

export function DrawerClose({
  asChild = false,
  children,
  className,
  ...props
}: DrawerCloseProps) {
  const ctx = useDrawerContext();

  if (asChild && React.isValidElement(children)) {
    const child = children as React.ReactElement<React.HTMLAttributes<HTMLElement>>;
    return React.cloneElement(child, {
      onClick: (e: React.MouseEvent<HTMLElement>) => {
        child.props.onClick?.(e);
        ctx.setOpen(false);
      },
    });
  }

  return (
    <button
      type="button"
      onClick={() => ctx.setOpen(false)}
      className={cn(
        "inline-flex items-center justify-center font-mono text-xs font-bold uppercase tracking-wider",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
