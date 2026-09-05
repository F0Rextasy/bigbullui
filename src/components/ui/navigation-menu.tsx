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

const navMenuReveal = `
  @keyframes navMenuReveal {
    from { opacity: 0; transform: translateY(-4px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;
<style>{navMenuReveal}</style>;

const NavigationMenu = React.forwardRef<HTMLDivElement, NavigationMenuProps>(
  ({ items, className }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "space-y-2",
          className
        )}
      >
        {/* Horizontal menu bar */}
        <div className="grid grid-cols-3 border-b border-border/50">
          {items.map((item) => (
            <button
              key={item.id}
              className={cn(
                "col-span-1 py-2 text-sm font-medium text-foreground hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                "motion-reduce:transition-none"
              )}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Panels */}
        <div className="grid grid-cols-3 pt-2">
          {items.map((item) => (
            <div
              key={item.id}
              className={cn(
                "hidden col-span-1 fade-in-up transition-opacity duration-300 group-hover:block group-focusVisible:block",
                "motion-reduce:animate-none"
              )}
            >
              {item.panel}
            </div>
          ))}
        </div>
      </div>
    );
  }
);
NavigationMenu.displayName = "NavigationMenu";

export { NavigationMenu };

