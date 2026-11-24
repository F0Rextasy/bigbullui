"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { cn } from "./lib/utils";
import { registerEscapeLayer } from "./lib/focus-trap";
import { mergeRefs, useIsMounted } from "./lib/react-compat";
import { Slot } from "./lib/slot";
import { useControllableState } from "./lib/use-controllable-state";
import { useFloating } from "./lib/floating";

interface PopoverContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  contentId: string;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
  setTriggerEl: (el: HTMLButtonElement | null) => void;
}

const PopoverCtx = React.createContext<PopoverContextValue | null>(null);

export interface PopoverProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: React.ReactNode;
}

export function Popover({
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  children,
}: PopoverProps) {
  const [open, setOpen] = useControllableState<boolean>({
    prop: controlledOpen,
    defaultProp: defaultOpen,
    onChange: onOpenChange,
  });
  const triggerRef = React.useRef<HTMLButtonElement | null>(null);
  const contentId = React.useId();

  const setTriggerEl = React.useCallback((el: HTMLButtonElement | null) => {
    triggerRef.current = el;
  }, []);

  const ctxValue = React.useMemo(
    () => ({ open, setOpen, contentId, triggerRef, setTriggerEl }),
    [open, setOpen, contentId, setTriggerEl],
  );

  return (
    <PopoverCtx.Provider value={ctxValue}>
      <div className="relative inline-block">{children}</div>
    </PopoverCtx.Provider>
  );
}

export interface PopoverTriggerProps {
  children: React.ReactElement<{
    ref?: React.Ref<HTMLButtonElement>;
    onPointerDown?: React.PointerEventHandler;
    onClick?: React.MouseEventHandler;
    "aria-haspopup"?: string;
    "aria-expanded"?: boolean;
    "aria-controls"?: string;
  }>;
}

export const PopoverTrigger = React.forwardRef<HTMLButtonElement, PopoverTriggerProps>(
  function PopoverTrigger({ children }, forwardedRef) {
    const ctx = React.useContext(PopoverCtx);
    if (!ctx) throw new Error("PopoverTrigger must be used within Popover");

    return (
      <Slot
        ref={mergeRefs(forwardedRef, ctx.setTriggerEl)}
        aria-haspopup="dialog"
        aria-expanded={ctx.open}
        aria-controls={ctx.open ? ctx.contentId : undefined}
        onPointerDown={(e: React.PointerEvent) => {
          ctx.setTriggerEl(e.currentTarget as HTMLButtonElement);
        }}
        onClick={(e: React.MouseEvent) => {
          ctx.setTriggerEl(e.currentTarget as HTMLButtonElement);
          ctx.setOpen(!ctx.open);
        }}
      >
        {children}
      </Slot>
    );
  },
);
PopoverTrigger.displayName = "PopoverTrigger";

export interface PopoverContentProps extends React.HTMLAttributes<HTMLDivElement> {
  align?: "start" | "center" | "end";
  side?: "top" | "bottom" | "left" | "right";
  children?: React.ReactNode;
  className?: string;
  /** Dual-mode: false renders instantly with no motion. Default true. */
  animated?: boolean;
}

export function PopoverContent({
  align = "center",
  side = "bottom",
  children,
  className,
  style,
  animated = true,
  ...props
}: PopoverContentProps) {
  const ctx = React.useContext(PopoverCtx);
  const mounted = useIsMounted();
  const contentRef = React.useRef<HTMLDivElement>(null);
  const open = Boolean(ctx?.open);
  const setOpen = ctx?.setOpen;
  const triggerRef = ctx?.triggerRef;
  const fallbackRef = React.useRef<HTMLButtonElement | null>(null);

  const pos = useFloating({
    open: open && mounted,
    referenceRef: triggerRef ?? fallbackRef,
    floatingRef: contentRef,
    side,
    align,
    offset: 8,
  });

  React.useEffect(() => {
    if (!open || !setOpen || !mounted) return;

    function handleClickOutside(event: PointerEvent) {
      const target = event.target as Node;
      const triggerEl = triggerRef?.current;
      if (
        contentRef.current &&
        !contentRef.current.contains(target) &&
        !triggerEl?.contains(target)
      ) {
        setOpen?.(false);
      }
    }

    const releaseEscape = registerEscapeLayer(() => {
      setOpen(false);
      triggerRef?.current?.focus();
    });

    document.addEventListener("pointerdown", handleClickOutside);
    return () => {
      document.removeEventListener("pointerdown", handleClickOutside);
      releaseEscape();
    };
  }, [open, setOpen, triggerRef, mounted]);

  if (!open) return null;

  const panel = (
    <div
      ref={contentRef}
      id={ctx?.contentId}
      role="dialog"
      style={
        mounted
          ? {
              position: "fixed",
              top: pos.top,
              left: pos.left,
              visibility: pos.ready ? "visible" : "hidden",
              ...style,
            }
          : style
      }
      className={cn(
        "z-50 w-72 overscroll-contain rounded-lg border-[1.5px] border-foreground bg-card p-4 shadow-lg outline-1 outline-dashed outline-offset-[-6px]",
        animated && pos.ready && "motion-safe:animate-[scale-in_0.15s_ease-out_both]",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );

  return mounted ? createPortal(panel, document.body) : panel;
}
