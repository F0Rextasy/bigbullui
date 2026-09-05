import * as React from "react";
import { cn } from "./lib/utils";

export interface TextProps {
  as?: "p" | "span" | "div";
  variant?: "default" | "muted" | "small" | "lead" | "mono";
  size?: "sm" | "md" | "lg";
  className?: string;
  children?: React.ReactNode;
}

const variantClasses: Record<"default" | "muted" | "small" | "lead" | "mono", string> = {
  default: "text-foreground",
  muted: "text-muted-foreground",
  small: "text-xs text-muted-foreground",
  lead: "text-lg leading-relaxed text-foreground",
  mono: "font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground",
};

const sizeClasses: Record<"sm" | "md" | "lg", string> = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base",
};

export function Text({ as = "p", variant = "default", size, className, children }: TextProps) {
  const Tag = as;

  return (
    <Tag
      className={cn(
        "animate-[fade-in_0.3s_ease-out_both] motion-reduce:animate-none",
        variantClasses[variant],
        size && sizeClasses[size],
        className
      )}
    >
      {children}
    </Tag>
  );
}
