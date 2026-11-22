"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { cn } from "./lib/utils";
import { registerEscapeLayer } from "./lib/focus-trap";

function assignRef<T>(ref: React.Ref<T> | undefined, node: T | null) {
  if (!ref) return;
  if (typeof ref === "function") ref(node);
  else if (typeof ref === "object" && "current" in ref) {
    (ref as React.MutableRefObject<T | null>).current = node;
  }
}

interface PopoverContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  setTriggerEl: (el: HTMLButtonElement | null) => void;
  getTriggerEl: () => HTMLButtonElement | null;
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
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : uncontrolledOpen;
  const triggerRef = React.useRef<HTMLButtonElement | null>(null);
  const onOpenChangeRef = React.useRef(onOpenChange);

  React.useEffect(() => {
    onOpenChangeRef.current = onOpenChange;
  });

  const setOpen = React.useCallback(
    (nextOpen: boolean) => {
      if (!isControlled) {
        setUncontrolledOpen(nextOpen);
      }
      onOpenChangeRef.current?.(nextOpen);
    },
    [isControlled]
  );

  const setTriggerEl = React.useCallback((el: HTMLButtonElement | null) => {
    triggerRef.current = el;
  }, []);

  const getTriggerEl = React.useCallback(() => triggerRef.current, []);

  const ctxValue = React.useMemo(
    () => ({ open, setOpen, setTriggerEl, getTriggerEl }),
    [open, setOpen, setTriggerEl, getTriggerEl]
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
    onMouseDown?: React.MouseEventHandler;
    onClick?: React.MouseEventHandler;
    "aria-haspopup"?: string;
    "aria-expanded"?: boolean;
  }>;
}

export function PopoverTrigger({ children }: PopoverTriggerProps) {
  const ctx = React.useContext(PopoverCtx);
  if (!ctx) throw new Error("PopoverTrigger must be used within Popover");
  const childRef = (children.props as { ref?: React.Ref<HTMLButtonElement> }).ref;

  return React.cloneElement(children, {
    ref: (node: HTMLButtonElement | null) => {
      ctx.setTriggerEl(node);
      assignRef(childRef, node);
    },
    "aria-haspopup": "dialog",
    "aria-expanded": ctx.open,
    onMouseDown: (e: React.MouseEvent) => {
      ctx.setTriggerEl(e.currentTarget as HTMLButtonElement);
      children.props.onMouseDown?.(e);
    },
    onClick: (e: React.MouseEvent) => {
      ctx.setTriggerEl(e.currentTarget as HTMLButtonElement);
      children.props.onClick?.(e);
      ctx.setOpen(!ctx.open);
    },
  });
}

export interface PopoverContentProps extends React.HTMLAttributes<HTMLDivElement> {
  align?: "start" | "center" | "end";
  children?: React.ReactNode;
  className?: string;
  /** Dual-mode: false renders instantly with no motion. Default true. */
  animated?: boolean;
}

export function PopoverContent({
  align = "center",
  children,
  className,
  style,
  animated = true,
  ...props
}: PopoverContentProps) {
  const ctx = React.useContext(PopoverCtx);
  const contentRef = React.useRef<HTMLDivElement>(null);
  const [coords, setCoords] = React.useState<{ top: number; left: number } | null>(null);
  const open = Boolean(ctx?.open);
  const setOpen = ctx?.setOpen;
  const getTriggerEl = ctx?.getTriggerEl;

  React.useEffect(() => {
    if (!open || !setOpen) return;

    const updatePosition = () => {
      const rect = getTriggerEl?.()?.getBoundingClientRect();
      if (!rect || (rect.width === 0 && rect.height === 0)) {
        setCoords(null);
        return;
      }
      const left =
        align === "start" ? rect.left : align === "end" ? rect.right : rect.left + rect.width / 2;
      setCoords({ top: rect.bottom + 8, left });
    };

    const posRaf = requestAnimationFrame(updatePosition);

    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;
      const triggerEl = getTriggerEl?.();
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
      getTriggerEl?.()?.focus();
    });

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", updatePosition, true);
    window.addEventListener("resize", updatePosition);
    return () => {
      cancelAnimationFrame(posRaf);
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", updatePosition, true);
      window.removeEventListener("resize", updatePosition);
      releaseEscape();
    };
  }, [open, setOpen, getTriggerEl, align]);

  if (!open) return null;

  const portalStyle: React.CSSProperties | undefined = coords
    ? {
        position: "fixed",
        top: coords.top,
        left: coords.left,
        transform: align === "end" ? "translateX(-100%)" : align === "center" ? "translateX(-50%)" : undefined,
        ...style,
      }
    : style;

  const panel = (
    <div
      ref={contentRef}
      role="dialog"
      style={portalStyle}
      className={cn(
        "z-50 w-72 overscroll-contain rounded-lg border-[1.5px] border-foreground bg-card p-4 shadow-lg outline-1 outline-dashed outline-offset-[-6px]",
        !coords && "absolute mt-2",
        !coords && align === "start" && "left-0",
        !coords && align === "center" && "left-1/2 -translate-x-1/2",
        !coords && align === "end" && "right-0",
        animated && "motion-safe:animate-[scale-in_0.15s_ease-out_both]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );

  return coords && typeof document !== "undefined" ? createPortal(panel, document.body) : panel;
}
