"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { cn } from "./lib/utils";
import { registerEscapeLayer } from "./lib/focus-trap";
import { mergeRefs, useIsMounted } from "./lib/react-compat";
import { Slot } from "./lib/slot";
import { useControllableState } from "./lib/use-controllable-state";
import { useFloating } from "./lib/floating";

interface DropdownMenuContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  menuId: string;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
  setTriggerEl: (el: HTMLButtonElement | null) => void;
  setOpenFocusTarget: (target: "first" | "last" | null) => void;
  consumeOpenFocusTarget: () => "first" | "last" | null;
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
  const [open, setOpenState] = useControllableState<boolean>({
    prop: controlledOpen,
    defaultProp: defaultOpen,
    onChange: onOpenChange,
  });
  const triggerRef = React.useRef<HTMLButtonElement | null>(null);
  const openFocusTargetRef = React.useRef<"first" | "last" | null>(null);
  const menuId = React.useId();

  const setOpen = React.useCallback(
    (nextOpen: boolean) => {
      if (!nextOpen) openFocusTargetRef.current = null;
      setOpenState(nextOpen);
    },
    [setOpenState],
  );

  const setTriggerEl = React.useCallback((el: HTMLButtonElement | null) => {
    triggerRef.current = el;
  }, []);

  const setOpenFocusTarget = React.useCallback((target: "first" | "last" | null) => {
    openFocusTargetRef.current = target;
  }, []);

  const consumeOpenFocusTarget = React.useCallback(() => {
    const val = openFocusTargetRef.current;
    openFocusTargetRef.current = null;
    return val;
  }, []);

  const ctxValue = React.useMemo(
    () => ({
      open,
      setOpen,
      menuId,
      triggerRef,
      setTriggerEl,
      setOpenFocusTarget,
      consumeOpenFocusTarget,
    }),
    [open, setOpen, menuId, setTriggerEl, setOpenFocusTarget, consumeOpenFocusTarget],
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
    onPointerDown?: React.PointerEventHandler;
    onClick?: React.MouseEventHandler;
    onKeyDown?: React.KeyboardEventHandler;
    "aria-haspopup"?: string;
    "aria-expanded"?: boolean;
    "aria-controls"?: string;
  }>;
}

export const DropdownMenuTrigger = React.forwardRef<HTMLButtonElement, DropdownMenuTriggerProps>(
  function DropdownMenuTrigger({ children }, forwardedRef) {
    const ctx = React.useContext(DropdownMenuCtx);
    if (!ctx) throw new Error("DropdownMenuTrigger must be used within DropdownMenu");

    return (
      <Slot
        ref={mergeRefs(forwardedRef, ctx.setTriggerEl)}
        aria-haspopup="menu"
        aria-expanded={ctx.open}
        aria-controls={ctx.open ? ctx.menuId : undefined}
        onPointerDown={(e: React.PointerEvent) => {
          ctx.setTriggerEl(e.currentTarget as HTMLButtonElement);
        }}
        onClick={(e: React.MouseEvent) => {
          ctx.setTriggerEl(e.currentTarget as HTMLButtonElement);
          ctx.setOpen(!ctx.open);
        }}
        onKeyDown={(e: React.KeyboardEvent) => {
          if ((e.key === "ArrowDown" || e.key === "ArrowUp") && !ctx.open) {
            e.preventDefault();
            ctx.setOpenFocusTarget(e.key === "ArrowUp" ? "last" : "first");
            ctx.setOpen(true);
          }
        }}
      >
        {children}
      </Slot>
    );
  },
);
DropdownMenuTrigger.displayName = "DropdownMenuTrigger";

export interface DropdownMenuContentProps extends React.HTMLAttributes<HTMLDivElement> {
  align?: "start" | "center" | "end";
  side?: "top" | "bottom" | "left" | "right";
  children?: React.ReactNode;
  className?: string;
  /** Dual-mode: false renders instantly with no motion. Default true. */
  animated?: boolean;
}

export function DropdownMenuContent({
  align = "start",
  side = "bottom",
  children,
  className,
  style,
  animated = true,
  ...props
}: DropdownMenuContentProps) {
  const ctx = React.useContext(DropdownMenuCtx);
  const mounted = useIsMounted();
  const contentRef = React.useRef<HTMLDivElement>(null);
  const open = Boolean(ctx?.open);
  const setOpen = ctx?.setOpen;
  const triggerRef = ctx?.triggerRef;
  const consumeOpenFocusTarget = ctx?.consumeOpenFocusTarget;
  const fallbackRef = React.useRef<HTMLButtonElement | null>(null);

  const pos = useFloating({
    open: open && mounted,
    referenceRef: triggerRef ?? fallbackRef,
    floatingRef: contentRef,
    side,
    align,
    offset: 6,
  });

  React.useEffect(() => {
    if (!open || !setOpen || !mounted) return;

    const getItems = () =>
      Array.from(
        contentRef.current?.querySelectorAll<HTMLButtonElement>(
          '[role="menuitem"]:not(:disabled):not([aria-disabled="true"])',
        ) ?? [],
      );

    const targetMode = consumeOpenFocusTarget?.();
    const focusRaf = requestAnimationFrame(() => {
      if (targetMode) {
        const items = getItems();
        if (targetMode === "last") items[items.length - 1]?.focus();
        else items[0]?.focus();
      }
    });

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

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Tab") {
        setOpen?.(false);
        return;
      }
      const items = getItems();
      if (items.length === 0) return;

      if (
        event.key === "ArrowDown" ||
        event.key === "ArrowUp" ||
        event.key === "Home" ||
        event.key === "End"
      ) {
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
      } else if (event.key.length === 1 && !event.metaKey && !event.ctrlKey && !event.altKey) {
        const ch = event.key.toLowerCase();
        const match = items.find((el) => el.textContent?.trim().toLowerCase().startsWith(ch));
        match?.focus();
      }
    }

    document.addEventListener("pointerdown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      cancelAnimationFrame(focusRaf);
      document.removeEventListener("pointerdown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
      releaseEscape();
    };
  }, [open, setOpen, triggerRef, consumeOpenFocusTarget, mounted]);

  if (!open) return null;

  const menu = (
    <div
      ref={contentRef}
      id={ctx?.menuId}
      role="menu"
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
        "z-50 min-w-[180px] overscroll-contain rounded-md border-[1.5px] border-foreground bg-card p-1 shadow-lg outline-1 outline-dashed outline-offset-[-5px]",
        animated && pos.ready && "motion-safe:animate-[scale-in_0.15s_ease-out_both]",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );

  return mounted ? createPortal(menu, document.body) : menu;
}

export interface DropdownMenuItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  shortcut?: string;
  children?: React.ReactNode;
  className?: string;
}

export const DropdownMenuItem = React.forwardRef<HTMLButtonElement, DropdownMenuItemProps>(
  function DropdownMenuItem({ shortcut, children, className, onClick, disabled, ...props }, ref) {
    const ctx = React.useContext(DropdownMenuCtx);

    return (
      <button
        ref={ref}
        type="button"
        role="menuitem"
        disabled={disabled}
        onClick={(e) => {
          onClick?.(e);
          if (!e.defaultPrevented) {
            ctx?.setOpen(false);
            ctx?.triggerRef.current?.focus();
          }
        }}
        className={cn(
          "flex w-full cursor-pointer items-center justify-between rounded-sm px-2.5 py-1.5 font-mono text-xs text-foreground transition-colors",
          "hover:bg-secondary hover:text-foreground focus-visible:bg-secondary focus-visible:outline-none",
          "disabled:cursor-not-allowed disabled:opacity-40",
          className,
        )}
        {...props}
      >
        <span>{children}</span>
        {shortcut ? (
          <span className="ms-3 font-mono text-[10px] tracking-wider text-muted-foreground">
            {shortcut}
          </span>
        ) : null}
      </button>
    );
  },
);
DropdownMenuItem.displayName = "DropdownMenuItem";

export function DropdownMenuSeparator({ className }: { className?: string }) {
  return <div role="separator" className={cn("my-1 border-t border-dashed border-border", className)} />;
}
