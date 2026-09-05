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

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      } else if (event.key === "ArrowDown") {
        setOpen(true);
      }
    },
    []
  );

  const handleBlur = React.useCallback(
    (event: React.FocusEvent) => {
      if (!event.relatedTarget?.closest(`.${cn("flyout-panel")}`)) {
        setOpen(false);
      }
    },
    []
  );

  React.useEffect(() => {
    return () => {
      // cleanup
    };
  }, []);

  return (
    <div className="relative inline-block" onBlur={handleBlur}>
      {trigger}

      {open && (
        <div
          className={cn(
            "absolute top-full left-0 mt-2 w-64 rounded-lg bg-card border border-border/60 shadow-lg p-2 sm:p-3 overflow-hidden animate-[scale-in_0.2s_ease-out_both]",
            "origin-top"
          )}
        >
          {items.map((item) => {
            const handleClick = React.useCallback(() => {
              onSelect?.(item.id);
              setOpen(false);
            }, [onSelect, item.id]);

            return (
              <button
                key={item.id}
                className={cn(
                  "flex items-center gap-2 rounded-sm px-2 py-1 text-sm text-foreground hover:bg-secondary/60 hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  "aria-disabled=" + item.id
                )}
                onClick={handleClick}
                onFocus={handleBlur}
                role="menuitem"
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.15em]">
                  {item.label}
                </span>
                {item.shortcut && (
                  <span className="ml-auto text-xs opacity-60">
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