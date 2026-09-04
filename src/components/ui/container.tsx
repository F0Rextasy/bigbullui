"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg" | "xl" | "full";
  notched?: boolean;
  className?: string;
  children: React.ReactNode;
}

const SIZE_MAP = {
  sm: "max-w-screen-sm",
  md: "max-w-screen-md",
  lg: "max-w-screen-lg",
  xl: "max-w-screen-xl",
  full: "max-w-full",
};

export function Container({
  size = "lg",
  notched = true,
  className,
  children,
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn(
        "relative mx-auto w-full px-4 sm:px-6 lg:px-8",
        SIZE_MAP[size],
        className
      )}
      {...props}
    >
      {notched && (
        <>
          <div
            aria-hidden="true"
            className="absolute -left-2 top-1/2 -translate-y-1/2 size-4 rounded-full border-2 border-foreground bg-background"
          />
          <div
            aria-hidden="true"
            className="absolute -right-2 top-1/2 -translate-y-1/2 size-4 rounded-full border-2 border-foreground bg-background"
          />
        </>
      )}
      {children}
    </div>
  );
}
