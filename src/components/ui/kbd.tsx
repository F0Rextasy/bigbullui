import * as React from "react";
import { cn } from "./lib/utils";

export interface KbdProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
  className?: string;
}

export function Kbd({ children, className, ...props }: KbdProps) {
  return (
    <kbd
      className={cn(
        "inline-flex items-center justify-center rounded-sm border border-border border-b-2 border-b-foreground/30 bg-secondary px-1.5 py-0.5 font-mono text-[11px] font-semibold text-secondary-foreground shadow-xs",
        className
      )}
      {...props}
    >
      {children}
    </kbd>
  );
}
