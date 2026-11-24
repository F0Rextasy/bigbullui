"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export type NavigationMenuItem = {
  id: string;
  label: string;
  panel?: React.ReactNode;
};

export type NavigationMenuProps = {
  items: NavigationMenuItem[];
  className?: string;
};

const NavigationMenu = React.forwardRef<HTMLElement, NavigationMenuProps>(
  ({ items = [], className }, forwardedRef) => {
    const [activeIndex, setActiveIndex] = React.useState<number | null>(null);
    const navRef = React.useRef<HTMLElement>(null);

    const assignRef = React.useCallback(
      (node: HTMLElement | null) => {
        navRef.current = node;
        if (typeof forwardedRef === "function") forwardedRef(node);
        else if (forwardedRef) forwardedRef.current = node;
      },
      [forwardedRef]
    );

    React.useEffect(() => {
      if (activeIndex === null) return;
      const onDown = (e: MouseEvent) => {
        if (navRef.current && !navRef.current.contains(e.target as Node)) setActiveIndex(null);
      };
      const onKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") setActiveIndex(null);
      };
      document.addEventListener("mousedown", onDown);
      document.addEventListener("keydown", onKey);
      return () => {
        document.removeEventListener("mousedown", onDown);
        document.removeEventListener("keydown", onKey);
      };
    }, [activeIndex]);

    const activeItem = activeIndex !== null ? items[activeIndex] : undefined;

    return (
      <nav
        ref={assignRef}
        aria-label="Primary navigation"
        className={cn("relative space-y-2", className)}
      >
        {/* Horizontal menu bar */}
        <div className="flex flex-wrap gap-1 border-b border-border/60 pb-1">
          {items.map((item, idx) => {
            const isOpen = activeIndex === idx;
            return (
              <button
                type="button"
                key={item.id}
                aria-expanded={item.panel ? isOpen : undefined}
                onClick={() => setActiveIndex((curr) => (curr === idx ? null : idx))}
                onKeyDown={(e) => {
                  if (e.key === "ArrowRight") {
                    e.preventDefault();
                    setActiveIndex((idx + 1) % Math.max(1, items.length));
                  } else if (e.key === "ArrowLeft") {
                    e.preventDefault();
                    setActiveIndex((idx - 1 + Math.max(1, items.length)) % Math.max(1, items.length));
                  } else if (e.key === "Escape") {
                    setActiveIndex(null);
                  }
                }}
                className={cn(
                  "cursor-pointer rounded-sm px-3 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  "motion-reduce:transition-none",
                  isOpen
                    ? "bg-secondary text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        {/* Active panel */}
        {activeItem?.panel ? (
          <div
            role="region"
            aria-label={activeItem.label}
            className="rounded-md border border-border bg-card p-3 shadow-sm animate-[fade-in_0.15s_ease-out_both] motion-reduce:animate-none!"
          >
            {activeItem.panel}
          </div>
        ) : null}
      </nav>
    );
  }
);
NavigationMenu.displayName = "NavigationMenu";

export { NavigationMenu };

