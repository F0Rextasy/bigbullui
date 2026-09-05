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
  items,
  position = "bottom-right",
  onOpenChange,
  children,
}: {
  items: SpeedDialItem[];
  position?: SpeedDialPosition;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}) {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const backdropClassName = cn(
    "fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-200",
    "motion-reduce:animate-none",
    "motion-reduce:transition-none",
  );

  const itemContainerClassName = cn(
    "fixed inset-0 z-50 pointer-events-none",
    "motion-reduce:animate-none",
    "motion-reduce:transition-none",
  );

  return (
    <div>
      <style>{`
        @keyframes speedDialScaleIn {
          from { opacity: 0; transform: scale(0.8) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes speedDialFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
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
        <div
          className={cn(
            "relative cursor-pointer select-none",
            "group",
            "w-14 h-14 rounded-full bg-accent text-accent-foreground shadow-lg hover:-translate-y-0.5 hover:shadow-xl transition-transform",
            "active:scale-[0.95] transition-transform",
            "motion-reduce:animate-none",
            "motion-reduce:transition-none",
          )}
          onClick={() => setOpen((prev) => !prev)}
          onKeyDown={(e) => { if (e.key === "Escape") setOpen(false); }}
          aria-label={open ? "Close speed dial" : "Open speed dial"}
          role="button"
          tabIndex={0}
        >
          {children}
        </div>

        {open && (
          <div className={backdropClassName} onClick={() => setOpen(false)} />
        )}

        {open && (
          <div
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
                    "motion-reduce:animate-none",
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
                    onClick={() => { item.onClick(); setOpen(false); }}
                    className={cn(
                      "w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center",
                      "hover:bg-accent hover:text-accent-foreground transition-colors",
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