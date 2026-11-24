"use client";

import * as React from "react";
import { cn } from "./lib/utils";
import { Slot } from "./lib/slot";

type Variant = "default" | "destructive" | "secondary" | "outline" | "ghost" | "link";
type Size = "default" | "sm" | "lg" | "icon";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
  asChild?: boolean;
  /** Dual-mode: false renders instantly with no motion. Default true. */
  animated?: boolean;
};

const variants: Record<Variant, string> = {
  default: "border-2 border-dashed border-foreground bg-card text-foreground hover:border-solid hover:bg-primary hover:text-primary-foreground",
  destructive: "border border-destructive bg-destructive text-destructive-foreground hover:bg-destructive/90",
  secondary: "border border-border bg-secondary text-secondary-foreground hover:bg-secondary/70",
  outline: "border border-foreground bg-transparent hover:bg-secondary",
  ghost: "hover:bg-secondary",
  link: "text-accent-strong underline-offset-4 hover:underline",
};

const sizes: Record<Size, string> = {
  default: "h-9 px-4 text-[13px]",
  sm: "h-8 px-3 text-xs",
  lg: "h-11 px-7 text-sm",
  icon: "size-9",
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "default",
      size = "default",
      asChild = false,
      animated = true,
      type = "button",
      className,
      children,
      ...props
    },
    ref
  ) => {
    const classes = cn(
      "inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-md font-mono font-semibold uppercase tracking-[0.08em] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
      animated ? "transition-colors motion-reduce:transition-none" : "transition-none",
      variants[variant],
      sizes[size],
      className
    );

    if (asChild && React.isValidElement(children)) {
      return (
        <Slot ref={ref} className={classes} {...props}>
          {children}
        </Slot>
      );
    }

    return (
      <button
        ref={ref}
        type={type}
        className={classes}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button };
