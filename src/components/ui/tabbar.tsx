"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface TabBarProps {
  items: { id: string; label: string; icon?: string; badge?: number }[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  className?: string;
}

export function TabBar({
  items,
  value,
  defaultValue,
  onValueChange,
  className,
  ...props
}: TabBarProps) {
  const [internal, setInternal] = React.useState(defaultValue ?? items[0]?.id ?? "");
  const current = value ?? internal;

  const handleChange = React.useCallback(
    (id: string) => {
      setInternal(id);
      onValueChange?.(id);
    },
    [onValueChange]
  );

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border/50",
        "p-2 sm:p-4 space-x-2",
        className
      )}
      {...props}
    >
      {items.map((item) => {
        const isActive = current === item.id;
        const badge = item.badge ?? undefined;

        return (
          <button
            key={item.id}
            className={cn(
              "flex-1 flex flex-col items-center gap-1 rounded-sm px-2 py-1 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              isActive
                ? "text-foreground selected:bg-secondary"
                : "text-muted-foreground hover:text-foreground",
              isActive && "shadow-sm"
            )}
            onClick={() => handleChange(item.id)}
            aria-pressed={isActive}
            role="tab"
          >
            {item.icon && (
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="currentColor"
                focusable="false"
              >
                <path d="M{item.icon}" />
              </svg>
            )}
            <span className="text-[10px] uppercase tracking-[0.15em]">
              {item.label}
            </span>
            {badge !== undefined && (
              <span
                className={cn(
                  "absolute -top-0.5 right-2.5 rounded-full bg-accent text-xs text-accent-foreground w-5 h-5 flex items-center justify-center",
                  "animate-[stamp_0.4s_ease-out_both]"
                )}
              >
                {badge}
              </span>
            )}
          </button>
        );
      })}
      {/* Active indicator pill */}
      <div
        className={cn(
          "absolute -bottom-1 left-1/2 -translate-x-1/2 h-1 w-6 rounded-full bg-accent/60 transition-transform duration-300 ease-out motion-reduce:transition-none"
        )}
      />
    </div>
  );
}