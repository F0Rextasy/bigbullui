import * as React from "react";
import { cn } from "./lib/utils";

export interface SeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical";
  dashed?: boolean;
  className?: string;
}

export function Separator({
  orientation = "horizontal",
  dashed = true,
  className,
  ...props
}: SeparatorProps) {
  const isHorizontal = orientation === "horizontal";

  return (
    <div
      role="separator"
      aria-orientation={orientation}
      className={cn(
        "shrink-0",
        dashed ? "border-dashed" : "border-solid",
        isHorizontal
          ? "h-0 w-full border-t border-border"
          : "h-full min-h-4 w-0 border-l border-border",
        className
      )}
      {...props}
    />
  );
}
