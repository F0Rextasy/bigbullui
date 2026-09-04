import * as React from "react";
import { cn } from "./lib/utils";

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "animate-pulse rounded-md border border-dashed border-border bg-secondary/80",
        className
      )}
      {...props}
    />
  );
}
