"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export type ButtonGroupItemProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string;
  asChild?: boolean;
};

export type ButtonGroupProps = {
  className?: string;
  children?: React.ReactNode;
};

const separator = "border-r border-border/50 h-[1px]";

const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(
  ({ className, children }, ref) => {
    const childArray = React.Children.toArray(children || []) as React.ReactElement[];

    const renderedChildren = childArray.map((child, index) => {
      const childProps = child.props as React.ButtonHTMLAttributes<HTMLButtonElement>;
      const isLast = index === childArray.length - 1;

      let childClassName = childProps.className;

      // Add separator to all children except the last
      if (!isLast) {
        childClassName = cn(childClassName, separator);
      }

      return React.cloneElement(child as React.ReactElement<{ className?: string; style?: React.CSSProperties }>, {
        className: cn(childClassName, "rounded-none flex-1"),
        style: { ...(childProps.style as React.CSSProperties | undefined) },
      });
    });

    return (
      <div
        ref={ref}
        className={cn(
          "flex rounded-md p-0.5 bg-card",
          "motion-reduce:transition-none",
          className
        )}
      >
        {renderedChildren}
      </div>
    );
  }
);
const ButtonGroupItem = ButtonGroup;
ButtonGroup.displayName = "ButtonGroup";

export { ButtonGroup, ButtonGroupItem };

