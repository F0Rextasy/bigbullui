"use client";

import * as React from "react";
import { cn } from "./lib/utils";

type Variant = "default" | "secondary" | "outline" | "ghost" | "link";
type Size = "default" | "sm" | "lg" | "icon";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
};

const variants: Record<Variant, string> = {
  default: "border-2 border-dashed border-foreground bg-card text-foreground hover:border-solid hover:bg-primary hover:text-primary-foreground",
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
  ({ className, variant = "default", size = "default", ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-md font-mono uppercase tracking-[0.15em] transition-all duration-150 hover:scale-[1.02] active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:transition-none [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 motion-reduce:transition-none motion-reduce:hover:scale-100 motion-reduce:active:scale-100",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    />
  )
);
Button.displayName = "Button";

export { Button };
