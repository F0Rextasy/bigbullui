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

interface DropdownMenuContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
  openFocusTargetRef: React.MutableRefObject<"first" | "last" | null>;
}

const DropdownMenuCtx = React.createContext<DropdownMenuContextValue | null>(null);

export interface DropdownMenuProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: React.ReactNode;
}

export function DropdownMenu({
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  children,
}: DropdownMenuProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : uncontrolledOpen;
  const triggerRef = React.useRef<HTMLButtonElement | null>(null);
  const openFocusTargetRef = React.useRef<"first" | "last" | null>(null);
  const onOpenChangeRef = React.useRef(onOpenChange);
  onOpenChangeRef.current = onOpenChange;

  const setOpen = React.useCallback(
    (nextOpen: boolean) => {
      if (!nextOpen) openFocusTargetRef.current = null;
      if (!isControlled) {
        setUncontrolledOpen(nextOpen);
      }
      onOpenChangeRef.current?.(nextOpen);
    },
    [isControlled]
  );

  const ctxValue = React.useMemo(
    () => ({ open, setOpen, triggerRef, openFocusTargetRef }),
    [open, setOpen]
  );

  return (
    <DropdownMenuCtx.Provider value={ctxValue}>
      <div className="relative inline-block">{children}</div>
    </DropdownMenuCtx.Provider>
  );
}

export interface DropdownMenuTriggerProps {
  children: React.ReactElement<{
    ref?: React.Ref<HTMLButtonElement>;
    onMouseDown?: React.MouseEventHandler;
    onClick?: React.MouseEventHandler;
    onKeyDown?: React.KeyboardEventHandler;
    "aria-haspopup"?: string;
    "aria-expanded"?: boolean;
  }>;
}

export function DropdownMenuTrigger({ children }: DropdownMenuTriggerProps) {
  const ctx = React.useContext(DropdownMenuCtx);
  if (!ctx) throw new Error("DropdownMenuTrigger must be used within DropdownMenu");
  const childRef = (children.props as { ref?: React.Ref<HTMLButtonElement> }).ref;

  return React.cloneElement(children, {
    ref: (node: HTMLButtonElement | null) => {
      ctx.triggerRef.current = node;
      assignRef(childRef, node);
    },
    "aria-haspopup": "menu",
    "aria-expanded": ctx.open,
    onMouseDown: (e: React.MouseEvent) => {
      ctx.triggerRef.current = e.currentTarget as HTMLButtonElement;
      children.props.onMouseDown?.(e);
    },
    onClick: (e: React.MouseEvent) => {
      ctx.triggerRef.current = e.currentTarget as HTMLButtonElement;
      children.props.onClick?.(e);
      ctx.setOpen(!ctx.open);
    },
    onKeyDown: (e: React.KeyboardEvent) => {
      children.props.onKeyDown?.(e);
      if ((e.key === "ArrowDown" || e.key === "ArrowUp") && !ctx.open) {
        e.preventDefault();
        ctx.openFocusTargetRef.current = e.key === "ArrowUp" ? "last" : "first";
        ctx.setOpen(true);
      }
    },
  });
}

export interface DropdownMenuContentProps extends React.HTMLAttributes<HTMLDivElement> {
  align?: "start" | "center" | "end";
  children?: React.ReactNode;
  className?: string;
  /** Dual-mode: false renders instantly with no motion. Default true. */
  animated?: boolean;
}

export function DropdownMenuContent({
  align = "start",
  children,
  className,
  style,
  animated = true,
  ...props
}: DropdownMenuContentProps) {
  const ctx = React.useContext(DropdownMenuCtx);
  const contentRef = React.useRef<HTMLDivElement>(null);
  const [coords, setCoords] = React.useState<{ top: number; left: number } | null>(null);
  const open = Boolean(ctx?.open);
  const setOpen = ctx?.setOpen;

  React.useEffect(() => {
    if (!open || !setOpen) {
      setCoords(null);
      return;
    }

    const updatePosition = () => {
      const rect = ctx?.triggerRef.current?.getBoundingClientRect();
      if (!rect || (rect.width === 0 && rect.height === 0)) {
        setCoords(null);
        return;
      }
      const left =
        align === "start" ? rect.left : align === "end" ? rect.right : rect.left + rect.width / 2;
      setCoords({ top: rect.bottom + 6, left });
    };

    updatePosition();

    const targetMode = ctx?.openFocusTargetRef.current;
    let rafId = 0;
    if (targetMode && ctx) {
      ctx.openFocusTargetRef.current = null;
      rafId = requestAnimationFrame(() => {
        const items = Array.from(
          contentRef.current?.querySelectorAll<HTMLButtonElement>('[role="menuitem"]:not(:disabled)') ?? []
        );
        if (targetMode === "last") items[items.length - 1]?.focus();
        else items[0]?.focus();
      });
    }

    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;
      if (
        contentRef.current &&
        !contentRef.current.contains(target) &&
        !ctx?.triggerRef.current?.contains(target)
      ) {
        setOpen?.(false);
      }
    }

    const releaseEscape = registerEscapeLayer(() => {
      setOpen(false);
      ctx?.triggerRef.current?.focus();
    });

    function handleKeyDown(event: KeyboardEvent) {
      if (
        event.key === "ArrowDown" ||
        event.key === "ArrowUp" ||
        event.key === "Home" ||
        event.key === "End"
      ) {
        const items = Array.from(
          contentRef.current?.querySelectorAll<HTMLButtonElement>('[role="menuitem"]:not(:disabled)') ?? []
        );
        if (items.length === 0) return;
        event.preventDefault();
        const currentIndex = items.indexOf(document.activeElement as HTMLButtonElement);
        let nextIndex = 0;
        if (event.key === "Home") {
          nextIndex = 0;
        } else if (event.key === "End") {
          nextIndex = items.length - 1;
        } else if (event.key === "ArrowDown") {
          nextIndex = currentIndex < 0 ? 0 : (currentIndex + 1) % items.length;
        } else if (event.key === "ArrowUp") {
          nextIndex = currentIndex <= 0 ? items.length - 1 : currentIndex - 1;
        }
        items[nextIndex]?.focus();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    window.addEventListener("scroll", updatePosition, true);
    window.addEventListener("resize", updatePosition);
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("scroll", updatePosition, true);
      window.removeEventListener("resize", updatePosition);
      releaseEscape();
    };
  }, [open, setOpen, ctx, align]);

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

  const menu = (
    <div
      ref={contentRef}
      role="menu"
      style={portalStyle}
      className={cn(
        "z-50 min-w-[180px] overscroll-contain rounded-md border-[1.5px] border-foreground bg-card p-1 shadow-lg outline-1 outline-dashed outline-offset-[-5px]",
        !coords && "absolute mt-1.5",
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

  return coords && typeof document !== "undefined" ? createPortal(menu, document.body) : menu;
}

export interface DropdownMenuItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  shortcut?: string;
  children?: React.ReactNode;
  className?: string;
}

export function DropdownMenuItem({
  shortcut,
  children,
  className,
  onClick,
  ...props
}: DropdownMenuItemProps) {
  const ctx = React.useContext(DropdownMenuCtx);

  return (
    <button
      type="button"
      role="menuitem"
      onClick={(e) => {
        onClick?.(e);
        ctx?.setOpen(false);
      }}
      className={cn(
        "flex w-full cursor-pointer items-center justify-between rounded-sm px-2.5 py-1.5 font-mono text-xs text-foreground transition-colors",
        "hover:bg-secondary hover:text-foreground focus-visible:bg-secondary focus-visible:outline-none",
        className
      )}
      {...props}
    >
      <span>{children}</span>
      {shortcut ? (
        <span className="font-mono text-[10px] text-muted-foreground ms-3 tracking-wider">
          {shortcut}
        </span>
      ) : null}
    </button>
  );
}

export function DropdownMenuSeparator({ className }: { className?: string }) {
  return <div className={cn("my-1 border-t border-dashed border-border", className)} />;
}
