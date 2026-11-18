"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export type SpeedDialPosition = "bottom-right" | "bottom-left" | "top-right" | "top-left";

export type SpeedDialProps = {
  items: SpeedDialItem[];
  position?: SpeedDialPosition;
  onOpenChange?: (open: boolean) => void;
  children?: React.ReactNode;
};

export type SpeedDialItem = {
  id: string;
  label: string;
  onClick: () => void;
};

const positionClasses: Record<SpeedDialPosition, string> = {
  "bottom-right": "bottom-4 right-4",
  "bottom-left": "bottom-4 left-4",
  "top-right": "top-4 right-4",
  "top-left": "top-4 left-4",
};

function getDelay(index: number): string {
  return `${index * 40}ms`;
}

export function SpeedDial({
  items = [],
  position = "bottom-right",
  onOpenChange,
  children,
}: SpeedDialProps) {
  const [open, setOpen] = React.useState(false);

  const setOpenState = React.useCallback(
    (next: boolean) => {
      setOpen(next);
      onOpenChange?.(next);
    },
    [onOpenChange]
  );

  React.useEffect(() => {
    if (!open) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenState(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, setOpenState]);

  const backdropClassName = cn(
    "fixed inset-0 z-40 bg-foreground/40 backdrop-blur-sm transition-opacity duration-200",
    "motion-reduce:animate-none!",
    "motion-reduce:transition-none",
  );

  const itemContainerClassName = cn(
    "fixed inset-0 z-50 pointer-events-none",
    "motion-reduce:animate-none!",
    "motion-reduce:transition-none",
  );

  return (
    <div>
      <style>{`
        @keyframes speedDialScaleIn {
          from { opacity: 0; transform: scale(0.8) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>

      <div
        className={cn(
          "relative",
          positionClasses[position],
          "z-50",
          "motion-reduce:animate-none",
        )}
      >
        <button
          type="button"
          className={cn(
            "relative flex cursor-pointer items-center justify-center select-none",
            "group",
            "w-14 h-14 rounded-full bg-accent text-accent-foreground shadow-lg hover:-translate-y-0.5 hover:shadow-xl transition-transform",
            "active:scale-[0.95] transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            "motion-reduce:animate-none",
            "motion-reduce:transition-none motion-reduce:hover:translate-y-0 motion-reduce:active:scale-100",
          )}
          onClick={() => setOpenState(!open)}
          aria-label={open ? "Close speed dial" : "Open speed dial"}
          aria-expanded={open}
        >
          {children}
        </button>

        {open && (
          <div className={backdropClassName} onClick={() => setOpenState(false)} />
        )}

        {open && (
          <div
            role="menu"
            className={itemContainerClassName}
            style={{
              animationName: "speedDialScaleIn",
              animationDuration: "200ms",
              animationTimingFunction: "cubic-bezier(0.16,1,0.3,1)",
              animationFillMode: "forwards",
            }}
          >
            {items.map((item, index) => {
              const angle = index * (Math.PI / (items.length + 1));
              const radius = 60;
              const x = radius * Math.cos(angle) + radius;
              const y = radius * Math.sin(angle) + radius;

              return (
                <div
                  key={item.id}
                  className={cn(
                    "absolute pointer-events-auto transform transition-transform duration-300 ease-out",
                    "motion-reduce:animate-none!",
                    "motion-reduce:transition-none",
                  )}
                  style={{
                    left: x - 12,
                    top: y - 12,
                    animationDelay: getDelay(index),
                    animationName: "speedDialScaleIn",
                  }}
                >
                  <button
                    type="button"
                    onClick={() => { item.onClick(); setOpenState(false); }}
                    className={cn(
                      "w-10 h-10 cursor-pointer rounded-full bg-card border border-border flex items-center justify-center",
                      "hover:bg-accent hover:text-accent-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                      "motion-reduce:transition-none",
                      "motion-reduce:animate-none",
                    )}
                    aria-label={item.label}
                    role="menuitem"
                  >
                    {item.label.substring(0, 1).toUpperCase()}
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}