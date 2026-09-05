"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export type ToggleVariant = "default" | "outline" | "accent";
export type ToggleSize = "sm" | "default" | "lg";

export type ToggleProps = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "pressed" | "onPressedChange"> & {
  pressed?: boolean;
  defaultPressed?: boolean;
  onPressedChange?: (pressed: boolean) => void;
  variant?: ToggleVariant;
  size?: ToggleSize;
};

const variants: Record<ToggleVariant, string> = {
  default: "bg-card border border-border",
  outline: "bg-transparent border border-primary hover:bg-primary hover:text-primary-foreground",
  accent: "bg-accent text-accent-foreground hover:bg-accent/90",
};

const sizes: Record<ToggleSize, string> = {
  sm: "h-8 px-3 text-xs",
  default: "h-10 px-4 text-sm",
  lg: "h-12 px-6 text-base",
};

const Toggle = React.forwardRef<HTMLButtonElement, ToggleProps>(
  ({ pressed = false, defaultPressed = false, onPressedChange, variant = "default", size = "default", className, children, ...props }, ref) => {
    const [internal, setInternal] = React.useState(defaultPressed);
    const isPressed = pressed ?? internal;

    const handleClick = () => {
      const next = !isPressed;
      setInternal(next);
      onPressedChange?.(next);
    };

    return (
      <button
        ref={ref}
        type="button"
        aria-pressed={isPressed}
        onClick={handleClick}
        className={cn(
          "inline-flex cursor-pointer items-center justify-center gap-2 rounded-md border transition-all duration-150",
          "motion-reduce:transition-none",
          variants[variant],
          sizes[size],
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          "active:scale-[0.97]",
          "transition-transform",
          className
        )}
        {...props}
      >
        {children || (isPressed ? "ON" : "OFF")}
      </button>
    );
  }
);
Toggle.displayName = "Toggle";

export { Toggle };

