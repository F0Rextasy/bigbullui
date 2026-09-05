import * as React from "react";
import { cn } from "./lib/utils";

export interface DescriptionListItem {
  term: string;
  description: React.ReactNode;
}

export interface DescriptionListProps {
  items?: DescriptionListItem[];
  className?: string;
}

export function DescriptionList({
  items,
  className,
}: DescriptionListProps) {
  if (!items) {
    return <div className={cn("grid grid-cols-2 gap-4", className)} />;
  }

  const rowClasses = "border-b border-dashed border-border/20";

  return (
    <div
      className={cn(
        "grid grid-cols-2 gap-4 md:grid-cols-3 motion-reduce:transition-none",
        className
      )}
    >
      {items.map((item, index) => (
        <div
          key={item.term}
          className={cn(
            "row-span-2",
            `animate-[fade-in-up_0.3s_ease-out_both]`,
            `animation-delay: ${index * 40}ms`,
            className
          )}
        >
          <dt className="font-mono text-[9px] text-muted-foreground uppercase tracking-[0.1em]">
            {item.term}
          </dt>
          <dd className="mt-1 text-sm text-muted-foreground line-clamp-2">
            {item.description}
          </dd>
        </div>
      ))}
    </div>
  );
}