import * as React from "react";
import { cn } from "./lib/utils";

type Variant = "default" | "secondary" | "outline" | "accent";

export type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & { variant?: Variant };

const variants: Record<Variant, string> = {
  default: "border-2 border-dashed border-foreground bg-transparent text-foreground",
  secondary: "border-transparent bg-secondary text-secondary-foreground",
  outline: "border border-foreground/60 text-foreground",
  accent: "border-transparent bg-accent text-accent-foreground",
};

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-sm border px-2.5 py-0.5 font-mono text-[11px] font-bold uppercase tracking-[0.15em] animate-[fade-in-up_0.3s_ease-out_both]",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}

export { Badge };
