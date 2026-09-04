import * as React from "react";
import { cn } from "./lib/utils";

type Variant = "default" | "secondary" | "outline" | "accent";

export type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & { variant?: Variant };

const variants: Record<Variant, string> = {
  default: "border-transparent bg-primary text-primary-foreground",
  secondary: "border-transparent bg-secondary text-secondary-foreground",
  outline: "border-border text-foreground",
  accent: "border-transparent bg-accent text-accent-foreground",
};

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium animate-[fade-in-up_0.3s_ease-out_both]",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}

export { Badge };
