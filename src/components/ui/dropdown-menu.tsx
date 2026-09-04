"use client";

import * as React from "react";
import { cn } from "./lib/utils";

interface DropdownMenuContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
}

const DropdownMenuCtx = React.createContext<DropdownMenuContextValue | null>(null);

export interface DropdownMenuProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
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

  const setOpen = React.useCallback(
    (nextOpen: boolean) => {
      if (!isControlled) {
        setUncontrolledOpen(nextOpen);
      }
      onOpenChange?.(nextOpen);
    },
    [isControlled, onOpenChange]
  );

  return (
    <DropdownMenuCtx.Provider value={{ open, setOpen, triggerRef }}>
      <div className="relative inline-block">{children}</div>
    </DropdownMenuCtx.Provider>
  );
}

export interface DropdownMenuTriggerProps {
  children: React.ReactElement<{
    onClick?: React.MouseEventHandler;
    "aria-haspopup"?: string;
    "aria-expanded"?: boolean;
  }>;
}

export function DropdownMenuTrigger({ children }: DropdownMenuTriggerProps) {
  const ctx = React.useContext(DropdownMenuCtx);
  if (!ctx) throw new Error("DropdownMenuTrigger must be used within DropdownMenu");

  return React.cloneElement(children, {
    "aria-haspopup": "menu",
    "aria-expanded": ctx.open,
    onClick: (e: React.MouseEvent) => {
      children.props.onClick?.(e);
      ctx.setOpen(!ctx.open);
    },
  });
}

export interface DropdownMenuContentProps extends React.HTMLAttributes<HTMLDivElement> {
  align?: "start" | "center" | "end";
  children: React.ReactNode;
  className?: string;
}

export function DropdownMenuContent({
  align = "start",
  children,
  className,
  ...props
}: DropdownMenuContentProps) {
  const ctx = React.useContext(DropdownMenuCtx);
  const contentRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!ctx?.open) return;

    function handleClickOutside(event: MouseEvent) {
      if (contentRef.current && !contentRef.current.contains(event.target as Node)) {
        ctx?.setOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        ctx?.setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [ctx]);

  if (!ctx?.open) return null;

  return (
    <div
      ref={contentRef}
      role="menu"
      className={cn(
        "absolute z-50 mt-1.5 min-w-[180px] rounded-md border-[1.5px] border-foreground bg-card p-1 shadow-lg outline-1 outline-dashed outline-offset-[-5px] animate-[scale-in_0.15s_ease-out_both]",
        align === "start" && "left-0",
        align === "center" && "left-1/2 -translate-x-1/2",
        align === "end" && "right-0",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export interface DropdownMenuItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  shortcut?: string;
  children: React.ReactNode;
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
        <span className="font-mono text-[10px] text-muted-foreground ml-3 tracking-wider">
          {shortcut}
        </span>
      ) : null}
    </button>
  );
}

export function DropdownMenuSeparator({ className }: { className?: string }) {
  return <div className={cn("my-1 border-t border-dashed border-border", className)} />;
}
