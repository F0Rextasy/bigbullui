"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  fanOnHover?: boolean;
  className?: string;
}

export function Stack({
  children,
  fanOnHover = true,
  className,
  ...props
}: StackProps) {
  const childArray = React.Children.toArray(children);

  return (
    <div
      className={cn(
        "group relative flex items-center justify-center p-6 select-none",
        className
      )}
      {...props}
    >
      {childArray.map((child, idx) => {
        const offset = idx - (childArray.length - 1) / 2;
        const rotateDeg = offset * 4;
        const translateX = offset * 12;

        return (
          <div
            key={idx}
            style={{
              zIndex: idx + 1,
              transform: `rotate(${rotateDeg}deg) translateX(${translateX}px)`,
            }}
            className={cn(
              "transition-transform duration-300 ease-out",
              fanOnHover && "group-hover:rotate-[calc(var(--offset)*8deg)] group-hover:scale-105"
            )}
          >
            {child}
          </div>
        );
      })}
    </div>
  );
}
