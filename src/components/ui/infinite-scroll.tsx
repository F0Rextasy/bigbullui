"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export type InfiniteScrollProps = {
  onLoadMore: () => void;
  hasMore: boolean;
  loader?: React.ReactNode;
  children?: React.ReactNode;
} & React.HTMLAttributes<HTMLElement>;

export function InfiniteScroll({ onLoadMore, hasMore, loader, children, ...props }: InfiniteScrollProps) {

  const sentinelRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          onLoadMore();
        }
      },
      { rootMargin: "100px" },
    );

    if (sentinelRef.current) {
      observer.observe(sentinelRef.current);
    }

    return () => observer.disconnect();
  }, [onLoadMore]);

  return (
    <div className="relative" {...props}>
      {children}
      {hasMore && (
        <div
          ref={sentinelRef}
          className={cn(
            "py-6 text-center",
            "motion-reduce:animate-none",
          )}
        >
          {loader || (
            <span className="text-sm font-mono uppercase tracking-[0.15em] text-muted-foreground">
              Loading more...
            </span>
          )}
        </div>
      )}
    </div>
  );
}