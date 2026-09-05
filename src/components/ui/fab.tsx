"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export type FabPosition = "bottom-right" | "bottom-left" | "top-right" | "top-left";

export type FabProps = {
  label: string;
  icon?: string;
  position?: FabPosition;
  onClick: () => void;
};

const positionClasses: Record<FabPosition, string> = {
  "bottom-right": "bottom-4 right-4",
  "bottom-left": "bottom-4 left-4",
  "top-right": "top-4 right-4",
  "top-left": "top-4 left-4",
};

export function Fab({ label, icon: iconProp, position = "bottom-right", onClick }: FabProps) {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const handleClick = () => setOpen((prev) => !prev);
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div>
      <style>{`
        @keyframes fabRipple {
          0% { opacity: 1; transform: scale(0); }
          100% { opacity: 0; transform: scale(1.5); }
        }
      `}</style>

      <div
        className={cn(
          "fixed ",
          positionClasses[position],
          " -translate-y-1/2 -translate-x-1/2",
          "z-50",
          "flex items-center justify-center w-14 h-14 rounded-full bg-accent text-accent-foreground shadow-lg hover:-translate-y-0.5 hover:shadow-xl transition-transform",
          "active:scale-[0.95] transition-transform",
          "motion-reduce:animate-none",
          "motion-reduce:transition-none",
        )}
        onClick={() => { onClick(); }}
        onMouseDown={() => setOpen(true)}
        aria-label={label}
        role="button"
        tabIndex={0}
      >
        {iconProp ? (
          <span className="w-6 h-6">{iconProp}</span>
        ) : (
          <>
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="13 2 3 14 12 14 11 22 21 10 14 13"></polygon>
            </svg>
          </>
        )}
      </div>

      {open && (
        <div
          className={cn(
            "fixed inset-0 z-40 bg-black/40 backdrop-blur-sm",
            "motion-reduce:animate-none",
          )}
        >
          <div
            className={cn(
              "fixed inset-0 z-50 bg-black/80 rounded-full w-20 h-20 scale-100 opacity-0 transition-all duration-300 ease-out",
              "motion-reduce:animate-none",
            )}
          >
            <span className="w-8 h-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-xs uppercase tracking-wider">
              {label.substring(0, 3).toUpperCase()}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}