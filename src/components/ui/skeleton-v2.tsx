import * as React from "react";
import { cn } from "./lib/utils";

export interface SkeletonV2Props extends React.HTMLAttributes<HTMLDivElement> {
  /** Shimmer sweep animation effect (default enabled) */
  shimmer?: boolean;
}

/** Skeleton box v2: shimmer sweep + pulse animation. */
export function SkeletonV2({ className, shimmer = true, ...props }: SkeletonV2Props) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "relative overflow-hidden rounded-md border border-dashed border-border bg-secondary/80 animate-pulse",
        className
      )}
      {...props}
    >
      {shimmer && (
        <div
          className={cn(
            "absolute inset-0 -translate-x-full",
            "bg-[linear-gradient(90deg,transparent,var(--muted-foreground)_12%,transparent_24%)] opacity-[0.07]",
            "animate-[skeletonV2Sweep_1.8s_ease-in-out_infinite]",
            "motion-reduce:animate-none"
          )}
        />
      )}
      <style>{`@keyframes skeletonV2Sweep { 100% { transform: translateX(100%); } }`}</style>
    </div>
  );
}

/** Monospace text skeleton: clamp lines with varying widths. */
export function SkeletonText({
  lines = 3,
  className,
  ...props
}: SkeletonV2Props & { lines?: number }) {
  return (
    <div className={cn("space-y-2", className)} aria-hidden="true" {...props}>
      {Array.from({ length: lines }).map((_, i) => (
        <SkeletonV2
          key={i}
          className={cn("h-3", i === lines - 1 ? "w-2/3" : "w-full")}
          style={{ animationDelay: `${i * 120}ms` }}
        />
      ))}
    </div>
  );
}

/** Card skeleton layout: image slot + title + text lines. */
export function SkeletonCard({ className, ...props }: SkeletonV2Props) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "rounded-lg border border-border bg-card p-3 outline-1 outline-dashed outline-offset-[-6px]",
        className
      )}
      {...props}
    >
      <SkeletonV2 className="aspect-[16/9] w-full rounded-sm" />
      <div className="space-y-2 pt-3">
        <SkeletonV2 className="h-4 w-3/4" />
        <SkeletonText lines={2} />
        <div className="flex gap-2 pt-1">
          <SkeletonV2 className="h-6 w-20 rounded-sm" />
          <SkeletonV2 className="h-6 w-14 rounded-sm" />
        </div>
      </div>
    </div>
  );
}
