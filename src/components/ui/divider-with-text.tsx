"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export type DividerWithTextProps = {
  children: React.ReactNode;
  align?: "left" | "center" | "right";
  className?: string;
};

const dividerWithTextShake = `
  @keyframes dividerGrow {
    from { transform: scaleX(0); }
    to { transform: scaleX(1); }
  }
`;
<style>{dividerWithTextShake}</style>;

const DividerWithText = React.forwardRef<HTMLDivElement, DividerWithTextProps>(
  ({ children, align = "center", className }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col items-center gap-2",
          className
        )}
      >
        <div className="flex-1 flex items-center justify-center">
          <div
            className={cn(
              "relative w-full max-w-md",
              "motion-reduce:animate-none"
            )}
          >
            <div
              className={cn(
                "absolute inset-0 pointer-events-none opacity-30",
                "motion-reduce:transition-none"
              )}
            />
            <hr
              className={cn(
                "relative border-2 border-dashed border-border/50",
                "motion-reduce:transition-none"
              )}
            />
            <span
              className={cn(
                "absolute -top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xs font-medium uppercase text-muted-foreground whitespace-nowrap",
                "motion-reduce:transition-none"
              )}
            >
              {children}
            </span>
          </div>
        </div>

        <div className="relative group/horizontal">
          <div
            className={cn(
              "absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 group-hover:transition-all duration-300 motion-reduce:animate-none",
              "motion-reduce:transition-none"
            )}
          />
          <hr
            className={cn(
              "relative border-2 border-dashed border-border/50 group-hover:scale-x-110 group-hover:transition-transform duration-300 ease-out motion-reduce:transition-none",
              "motion-reduce:transition-none"
            )}
          />
        </div>
      </div>
    );
  }
);
DividerWithText.displayName = "DividerWithText";

export { DividerWithText };

