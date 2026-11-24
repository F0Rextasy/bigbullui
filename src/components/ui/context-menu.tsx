"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { cn } from "./lib/utils";
import { useIsMounted } from "./lib/react-compat";
import { registerEscapeLayer } from "./lib/focus-trap";

export interface ContextMenuItem {
  id: string;
  label: string;
  shortcut?: string;
  danger?: boolean;
  disabled?: boolean;
  onSelect?: () => void;
}

export interface ContextMenuProps extends React.HTMLAttributes<HTMLDivElement> {
  items: (ContextMenuItem | "separator")[];
  children: React.ReactNode;
  className?: string;
  /** Dual-mode: false renders instantly with no motion. Default true. */
  animated?: boolean;
}

export function ContextMenu({
  items,
  children,
  className,
  animated = true,
  onContextMenu,
  onTouchStart,
  onTouchMove,
  onTouchEnd,
  onTouchCancel,
  ...props
}: ContextMenuProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [anchorPoint, setAnchorPoint] = React.useState({ x: 0, y: 0 });
  const [coords, setCoords] = React.useState({ x: 0, y: 0 });

  const mounted = useIsMounted();
  const menuRef = React.useRef<HTMLDivElement>(null);
  const longPressTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const previousFocusRef = React.useRef<HTMLElement | null>(null);
  const typeaheadRef = React.useRef("");
  const typeaheadTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const openAt = React.useCallback((clientX: number, clientY: number) => {
    previousFocusRef.current = document.activeElement as HTMLElement | null;
    setAnchorPoint({ x: clientX, y: clientY });
    setCoords({ x: clientX, y: clientY });
    setIsOpen(true);
  }, []);

  const closeMenu = React.useCallback((restoreFocus = false) => {
    setIsOpen(false);
    if (restoreFocus) {
      requestAnimationFrame(() => previousFocusRef.current?.focus());
    }
  }, []);

  const handleContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
    onContextMenu?.(e);
    if (e.defaultPrevented) return;
    e.preventDefault();
    openAt(e.clientX, e.clientY);
  };

  const clearLongPress = () => {
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    onTouchStart?.(e);
    if (e.touches.length !== 1) return;
    const touch = e.touches[0];
    const x = touch.clientX;
    const y = touch.clientY;
    clearLongPress();
    longPressTimerRef.current = setTimeout(() => {
      openAt(x, y);
    }, 500);
  };

  React.useLayoutEffect(() => {
    if (!isOpen || !menuRef.current) return;
    const rect = menuRef.current.getBoundingClientRect();
    const pad = 8;
    const maxX = Math.max(pad, window.innerWidth - rect.width - pad);
    const maxY = Math.max(pad, window.innerHeight - rect.height - pad);
    setCoords({
      x: Math.min(Math.max(pad, anchorPoint.x), maxX),
      y: Math.min(Math.max(pad, anchorPoint.y), maxY),
    });
  }, [isOpen, anchorPoint]);

  React.useEffect(() => {
    return () => {
      clearLongPress();
      if (typeaheadTimerRef.current) clearTimeout(typeaheadTimerRef.current);
    };
  }, []);

  React.useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (e: PointerEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        closeMenu(false);
      }
    };

    const getEnabledButtons = () =>
      Array.from(
        menuRef.current?.querySelectorAll<HTMLButtonElement>(
          '[role="menuitem"]:not(:disabled):not([aria-disabled="true"])'
        ) ?? []
      );

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Tab") {
        closeMenu(false);
        return;
      }
      if (
        e.key === "ArrowDown" ||
        e.key === "ArrowUp" ||
        e.key === "Home" ||
        e.key === "End"
      ) {
        const btns = getEnabledButtons();
        if (btns.length === 0) return;
        e.preventDefault();
        const curr = btns.indexOf(document.activeElement as HTMLButtonElement);
        let next = 0;
        if (e.key === "Home") next = 0;
        else if (e.key === "End") next = btns.length - 1;
        else if (e.key === "ArrowDown") next = curr < 0 ? 0 : (curr + 1) % btns.length;
        else next = curr <= 0 ? btns.length - 1 : curr - 1;
        btns[next]?.focus();
        return;
      }
      if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
        typeaheadRef.current += e.key.toLowerCase();
        if (typeaheadTimerRef.current) clearTimeout(typeaheadTimerRef.current);
        typeaheadTimerRef.current = setTimeout(() => {
          typeaheadRef.current = "";
        }, 500);
        const btns = getEnabledButtons();
        const match = btns.find((btn) =>
          (btn.textContent ?? "").trim().toLowerCase().startsWith(typeaheadRef.current)
        );
        match?.focus();
      }
    };

    const rafId = requestAnimationFrame(() => {
      menuRef.current
        ?.querySelector<HTMLButtonElement>(
          '[role="menuitem"]:not(:disabled):not([aria-disabled="true"])'
        )
        ?.focus();
    });

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    const unregisterEscape = registerEscapeLayer(() => closeMenu(true));

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
      unregisterEscape();
    };
  }, [isOpen, closeMenu]);

  return (
    <div
      onContextMenu={handleContextMenu}
      onTouchStart={handleTouchStart}
      onTouchMove={(e) => {
        clearLongPress();
        onTouchMove?.(e);
      }}
      onTouchEnd={(e) => {
        clearLongPress();
        onTouchEnd?.(e);
      }}
      onTouchCancel={(e) => {
        clearLongPress();
        onTouchCancel?.(e);
      }}
      className={cn("relative", className)}
      {...props}
    >
      {children}

      {isOpen && mounted
        ? createPortal(
            <div
              ref={menuRef}
              role="menu"
              style={{
                position: "fixed",
                left: `${coords.x}px`,
                top: `${coords.y}px`,
              }}
              className={cn(
                "z-50 min-w-[180px] max-w-[calc(100vw-16px)] rounded-lg border-2 border-foreground bg-card p-1.5 shadow-xl outline-1 outline-dashed outline-offset-[-4px] font-mono text-xs select-none",
                animated && "motion-safe:animate-[scale-in_0.12s_ease-out_both]"
              )}
            >
              {items.map((item, idx) => {
                if (item === "separator") {
                  return (
                    <div
                      key={`sep-${idx}`}
                      role="separator"
                      className="my-1 border-t border-dashed border-border"
                    />
                  );
                }

                return (
                  <button
                    key={item.id}
                    type="button"
                    role="menuitem"
                    disabled={item.disabled}
                    aria-disabled={item.disabled || undefined}
                    onClick={() => {
                      if (item.disabled) return;
                      item.onSelect?.();
                      closeMenu(true);
                    }}
                    className={cn(
                      "flex w-full items-center justify-between rounded-sm px-2.5 py-1.5 text-start text-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                      item.danger
                        ? "text-destructive hover:bg-destructive hover:text-destructive-foreground focus-visible:bg-destructive focus-visible:text-destructive-foreground"
                        : "text-foreground hover:bg-accent hover:text-accent-foreground focus-visible:bg-accent focus-visible:text-accent-foreground",
                      item.disabled ? "opacity-40 pointer-events-none cursor-not-allowed" : "cursor-pointer"
                    )}
                  >
                    <span>{item.label}</span>
                    {item.shortcut ? (
                      <span className="ms-4 text-[10px] opacity-70 tracking-wider">
                        {item.shortcut}
                      </span>
                    ) : null}
                  </button>
                );
              })}
            </div>,
            document.body
          )
        : null}
    </div>
  );
}
