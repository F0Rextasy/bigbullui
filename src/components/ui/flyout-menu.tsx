"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface FlyoutMenuItem {
  id: string;
  label: string;
  shortcut?: string;
}

export interface FlyoutMenuProps {
  trigger: React.ReactNode;
  items: FlyoutMenuItem[];
  onSelect?: (id: string) => void;
  className?: string;
}

export function FlyoutMenu({
  trigger,
  items,
  onSelect,
  className,
}: FlyoutMenuProps) {
  const [open, setOpen] = React.useState(false);
  const rootRef = React.useRef<HTMLDivElement>(null);

  const handleTriggerKeyDown = React.useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === "ArrowDown" || event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        setOpen(true);
      } else if (event.key === "Escape") {
        setOpen(false);
      }
    },
    []
  );

  const handleBlur = React.useCallback((event: React.FocusEvent) => {
    const next = event.relatedTarget as Node | null;
    if (next && rootRef.current?.contains(next)) return;
    setOpen(false);
  }, []);

  const handleRootKeyDown = React.useCallback((event: React.KeyboardEvent) => {
    if (event.key === "Escape") setOpen(false);
  }, []);

  const prevTriggerProps = React.isValidElement<React.HTMLAttributes<Element>>(trigger)
    ? trigger.props
    : undefined;

  const renderedTrigger = React.isValidElement<React.HTMLAttributes<Element>>(trigger)
    ? React.cloneElement(trigger, {
        onClick: (event: React.MouseEvent) => {
          prevTriggerProps?.onClick?.(event);
          if (!event.defaultPrevented) setOpen((o) => !o);
        },
        onKeyDown: (event: React.KeyboardEvent) => {
          prevTriggerProps?.onKeyDown?.(event);
          if (!event.defaultPrevented) handleTriggerKeyDown(event);
        },
        "aria-expanded": open,
        "aria-haspopup": "menu",
      })
    : trigger;

  return (
    <div
      ref={rootRef}
      className={cn("relative inline-block", className)}
      onBlur={handleBlur}
      onKeyDown={handleRootKeyDown}
    >
      {renderedTrigger}

      {open && (
        <div
          role="menu"
          className={cn(
            "flyout-panel absolute top-full left-0 mt-2 w-64 rounded-lg bg-card border border-border/60 shadow-lg p-2 sm:p-3 overflow-hidden animate-[scale-in_0.2s_ease-out_both]",
            "origin-top"
          )}
        >
          {items.map((item) => {
            const handleClick = () => {
              onSelect?.(item.id);
              setOpen(false);
            };

            return (
              <button
                key={item.id}
                className="flex items-center gap-2 rounded-sm px-2 py-1 text-sm text-foreground hover:bg-secondary/60 hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                onClick={handleClick}
                role="menuitem"
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.15em]">
                  {item.label}
                </span>
                {item.shortcut && (
                  <span className="ms-auto text-xs opacity-60">
                    {item.shortcut}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}