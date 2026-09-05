"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export type AvatarGroupProps = {
  names: string[];
  max?: number;
  size?: "sm" | "default" | "lg";
  className?: string;
};

const Avatar = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("rounded-full w-6 h-6 flex items-center justify-center font-medium text-xs", className)} {...props} />
);

const AvatarGroup = React.forwardRef<HTMLDivElement, AvatarGroupProps>(
  ({ names, max = 3, size = "default", className }, ref) => {
    const count = names.length;
    const displayed = max >= 0 && count > max ? max : count;
    const extra = count - displayed;

    const sizeMap = { sm: "w-5 h-5", default: "w-6 h-6", lg: "w-8 h-8" };

    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center gap-1",
          sizeMap[size],
          "motion-reduce:animate-none",
          className
        )}
      >
        {names.slice(0, displayed).map((name, index) => (
          <Avatar key={index} className="flex items-center justify-center" />
        ))}

        {extra > 0 && (
          <div
            className={cn(
              "relative -mt-1/2 rounded-full bg-border p-0.5",
              "flex items-center justify-center w-6 h-6 text-[10px]",
              "motion-reduce:transition-none"
            )}
          >
            {extra}
          </div>
        )}

        {displayed < count && count <= max && (
          <div
            className={cn(
              "absolute -top-1 -right-1 rounded-full w-2 h-2 bg-ring",
              "motion-reduce:transition-none"
            )}
          />
        )}
      </div>
    );
  }
);
AvatarGroup.displayName = "AvatarGroup";

export { AvatarGroup };

