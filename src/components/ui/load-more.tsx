"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export type LoadMoreProps = {
  items?: React.ReactNode[];
  onLoadMore?: () => void;
};

export function LoadMore({ items, onLoadMore }: LoadMoreProps) {
  const [expanded, setExpanded] = React.useState(false);

  const handleClick = () => {
    setExpanded(true);
    onLoadMore?.();
  };

  const delayClass = (index: number) => `${index * 40}ms`;

  return (
    <div className="relative">
      <button
        onClick={handleClick}
        className={cn(
          "w-full py-3 px-4 text-left text-sm font-medium text-primary uppercase tracking-wider",
          "hover:bg-primary/10 transition-colors",
          "motion-reduce:transition-none",
          "motion-reduce:animate-none",
        )}
      >
        LOAD MORE
      </button>

      {expanded && (
        <div
          className={cn(
            "mt-4 space-y-2",
            "motion-reduce:animate-none",
            "motion-reduce:transition-none",
          )}
        >
          {items?.map((item, index) => (
            <div
              key={index}
              className={cn(
                "p-3 bg-muted rounded-md",
                "animate-fade-in-up",
                "motion-reduce:animate-none",
                "motion-reduce:transition-none",
              )}
              style={{ animationDelay: delayClass(index) }}
            >
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}