"use client";

import * as React from "react";
import { cn } from "./lib/utils";

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
  destructive: "border border-destructive bg-destructive text-white hover:bg-destructive/90",
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

function mergeRefs<T>(a: React.Ref<T> | undefined, b: React.Ref<T> | undefined): React.RefCallback<T> {
  return (node) => {
    for (const ref of [a, b]) {
      if (!ref) continue;
      if (typeof ref === "function") ref(node);
      else if (typeof ref === "object" && "current" in ref) {
        (ref as React.MutableRefObject<T | null>).current = node;
      }
    }
  };
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", asChild = false, animated = true, type = "button", children, ...props }, ref) => {
    const classes = cn(
      "inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-md font-mono uppercase tracking-[0.15em] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:transition-none [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
      animated
        ? "transition-all duration-150 hover:scale-[1.02] active:scale-[0.97] motion-reduce:transition-none motion-reduce:hover:scale-100 motion-reduce:active:scale-100"
        : "transition-none",
      variants[variant],
      sizes[size],
      className
    );

    if (asChild && React.isValidElement(children)) {
      const child = children as React.ReactElement<{ className?: string; ref?: React.Ref<HTMLButtonElement> }>;
      return React.cloneElement(child, {
        ...props,
        ref: mergeRefs(ref, child.props.ref),
        className: cn(classes, child.props.className),
      });
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
