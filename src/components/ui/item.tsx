"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export type ItemMediaProps = React.HTMLAttributes<HTMLDivElement> & {
  className?: string;
};

export type ItemTitleProps = React.HTMLAttributes<HTMLHeadingElement> & {
  className?: string;
};

export type ItemDescriptionProps = React.HTMLAttributes<HTMLParagraphElement> & {
  className?: string;
};

export type ItemActionsProps = React.HTMLAttributes<HTMLDivElement> & {
  className?: string;
};

export type ItemProps = {
  media?: React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
};

const Item = React.forwardRef<HTMLDivElement, ItemProps>(
  ({ media, title, description, actions, className }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "group rounded-md border border-border/50 bg-card p-4 hover:bg-accent/5 hover:transition-all duration-200",
          "motion-reduce:transition-none",
          "cursor-pointer",
          className
        )}
      >
        {media && (
          <div className={cn("relative w-full h-24 mb-3 rounded-md overflow-hidden", "motion-reduce:transition-none")}>
            {media}
          </div>
        )}

        <h3 className={cn("font-medium text-foreground line-clamp-2", "motion-reduce:transition-none")}>{title}</h3>

        <p className={cn("text-sm text-muted-foreground line-clamp-2", "motion-reduce:transition-none")}>{description}</p>

        {actions && (
          <div className={cn("flex items-center justify-between mt-2", "motion-reduce:transition-none")}>
            {actions}
          </div>
        )}
      </div>
    );
  }
);
Item.displayName = "Item";

export function ItemMedia({ className, ...props }: ItemMediaProps) {
  return <div className={cn("relative w-full h-24 mb-3 rounded-md overflow-hidden", className)} {...props} />;
}

export function ItemTitle({ className, ...props }: ItemTitleProps) {
  return <h3 className={cn("font-medium text-foreground", className)} {...props} />;
}

export function ItemDescription({ className, ...props }: ItemDescriptionProps) {
  return <p className={cn("text-sm text-muted-foreground", className)} {...props} />;
}

export function ItemActions({ className, ...props }: ItemActionsProps) {
  return <div className={cn("flex items-center justify-between", className)} {...props} />;
}

export { Item };

