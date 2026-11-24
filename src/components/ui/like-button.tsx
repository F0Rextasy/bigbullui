"use client";

import * as React from "react";
import { cn } from "./lib/utils";
import { useControllableState } from "./lib/use-controllable-state";

export interface LikeButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onClick"> {
  active?: boolean;
  defaultActive?: boolean;
  initiallyActive?: boolean;
  count?: number;
  onActiveChange?: (active: boolean) => void;
  onClick?: (active: boolean) => void;
}

export const LikeButton = React.forwardRef<HTMLButtonElement, LikeButtonProps>(function LikeButton(
  {
    active: controlledActive,
    defaultActive,
    initiallyActive = false,
    count,
    onActiveChange,
    onClick,
    className,
    type = "button",
    "aria-label": ariaLabel = "Like",
    ...props
  },
  ref,
) {
  const [active, setActive] = useControllableState<boolean>({
    prop: controlledActive,
    defaultProp: defaultActive ?? initiallyActive,
    onChange: onActiveChange,
  });

  const handleClick = () => {
    const next = !active;
    setActive(next);
    onClick?.(next);
  };

  return (
    <button
      ref={ref}
      type={type}
      aria-label={ariaLabel}
      aria-pressed={active}
      onClick={handleClick}
      className={cn(
        "relative inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-full border border-border px-2.5 py-2 text-foreground transition-colors duration-150 hover:bg-accent/10 hover:text-accent-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none",
        active && "border-accent bg-accent text-accent-foreground hover:bg-accent/90 hover:text-accent-foreground",
        className,
      )}
      {...props}
    >
      <svg
        className={cn(
          "size-4 transition-transform duration-150 motion-reduce:transition-none",
          active && "scale-110 motion-reduce:scale-100",
        )}
        viewBox="0 0 24 24"
        fill={active ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
      </svg>
      {count !== undefined && (
        <span className="font-mono text-xs tabular-nums">{count}</span>
      )}
    </button>
  );
});
LikeButton.displayName = "LikeButton";
