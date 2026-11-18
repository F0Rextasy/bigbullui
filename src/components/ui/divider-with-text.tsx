"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export type DividerWithTextProps = {
  children: React.ReactNode;
  align?: "left" | "center" | "right";
  className?: string;
};

const DividerWithText = React.forwardRef<HTMLDivElement, DividerWithTextProps>(
  ({ children, align = "center", className }, ref) => {
    return (
      <div
        ref={ref}
        role="separator"
        className={cn("flex w-full items-center gap-3", className)}
      >
        <div
          aria-hidden="true"
          className={cn(
            "h-px border-t-2 border-dashed border-border",
            align === "left" ? "w-6 shrink-0" : "flex-1"
          )}
        />
        <span className="shrink-0 font-mono text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {children}
        </span>
        <div
          aria-hidden="true"
          className={cn(
            "h-px border-t-2 border-dashed border-border",
            align === "right" ? "w-6 shrink-0" : "flex-1"
          )}
        />
      </div>
    );
  }
);
DividerWithText.displayName = "DividerWithText";

export { DividerWithText };

