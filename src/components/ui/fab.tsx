"use client";

import * as React from "react";
import { registerEscapeLayer } from "./lib/focus-trap";
import { cn } from "./lib/utils";

export type FabPosition = "bottom-right" | "bottom-left" | "top-right" | "top-left";

export type FabAction = {
  id: string;
  label: string;
  icon?: React.ReactNode;
  onSelect?: () => void;
};

export type FabProps = {
  label?: string;
  icon?: React.ReactNode;
  position?: FabPosition;
  actions?: FabAction[];
  onClick?: () => void;
  className?: string;
};

const positionClasses: Record<FabPosition, string> = {
  "bottom-right": "bottom-4 right-4",
  "bottom-left": "bottom-4 left-4",
  "top-right": "top-4 right-4",
  "top-left": "top-4 left-4",
};

export const Fab = React.forwardRef<HTMLButtonElement, FabProps>(function Fab(
  { label = "Action", icon: iconProp, position = "bottom-right", actions, onClick, className },
  ref
) {
  const [open, setOpen] = React.useState(false);
  const triggerRef = React.useRef<HTMLButtonElement | null>(null);

  const setMergedRef = React.useCallback(
    (node: HTMLButtonElement | null) => {
      triggerRef.current = node;
      if (typeof ref === "function") ref(node);
      else if (ref) ref.current = node;
    },
    [ref]
  );

  React.useEffect(() => {
    if (!open) return;
    return registerEscapeLayer(() => {
      setOpen(false);
      triggerRef.current?.focus();
    });
  }, [open]);

  const hasActions = Boolean(actions && actions.length > 0);

  return (
    <div>
      {open && hasActions && (
        <div
          aria-hidden="true"
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 bg-foreground/20 backdrop-blur-[1px]"
        />
      )}

      {open && hasActions && (
        <div
          role="menu"
          aria-label={label}
          className={cn(
            "fixed z-50 flex flex-col gap-2",
            position === "bottom-right" && "bottom-20 right-4 items-end",
            position === "bottom-left" && "bottom-20 left-4 items-start",
            position === "top-right" && "top-20 right-4 items-end",
            position === "top-left" && "top-20 left-4 items-start"
          )}
        >
          {actions?.map((act) => (
            <button
              key={act.id}
              type="button"
              role="menuitem"
              onClick={() => {
                setOpen(false);
                act.onSelect?.();
              }}
              className="flex cursor-pointer items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 font-mono text-xs text-foreground shadow-md hover:border-foreground/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {act.icon}
              <span>{act.label}</span>
            </button>
          ))}
        </div>
      )}

      <button
        ref={setMergedRef}
        type="button"
        onClick={() => {
          if (hasActions) setOpen((prev) => !prev);
          onClick?.();
        }}
        aria-label={label}
        aria-expanded={hasActions ? open : undefined}
        className={cn(
          "fixed z-50 flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-accent text-accent-foreground shadow-lg transition-transform hover:-translate-y-0.5 hover:shadow-xl active:scale-[0.95] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none motion-reduce:hover:translate-y-0 motion-reduce:active:scale-100",
          positionClasses[position],
          className
        )}
      >
        {iconProp ? (
          <span className="flex items-center justify-center">{iconProp}</span>
        ) : (
          <svg
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polygon points="13 2 3 14 12 14 11 22 21 10 14 13"></polygon>
          </svg>
        )}
      </button>
    </div>
  );
});
Fab.displayName = "Fab";