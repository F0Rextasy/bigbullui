"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface UserCardProps {
  initials?: string;
  name?: string;
  role?: string;
  meta?: string[];
  className?: string;
  onAction?: () => void;
}

const FadeUp = "animate-fade-in-up-0s fade-in-up-1";

export function UserCard({
  initials = "JD",
  name = "John Doe",
  role = "Developer",
  meta = [],
  className,
  onAction,
}: UserCardProps) {
  return (
    <div
      className={cn(
        "group relative w-full rounded-lg border border-foreground bg-card text-card-foreground p-6 transition-all duration-300 hover:translate-y-1 hover:shadow-lg motion-reduce:transition-none motion-reduce:translate-y-0 motion-reduce:shadow-none",
        className
      )}
    >
      {/* Avatar with dashed ring */}
      <div className="relative flex-shrink-0 w-16 h-16 rounded-full bg-secondary flex items-center justify-center">
        <span className={cn(
          "text-xl font-bold",
          initials
        )} />
        <div
          className={cn(
            "absolute -inset-0.5 rounded-full border border-dashed border-border opacity-50"
          )}
        />
      </div>

      <div className="flex-1 mt-4">
        <h4 className="font-medium line-clamp-2">{name}</h4>
        <p className="text-sm text-muted-foreground line-clamp-2">{role}</p>
      </div>

      {/* Meta chips */}
      <div className="mt-4 flex flex-wrap gap-1.5">
        {meta.map((tag, i) => (
          <span
            key={i}
            className={cn(
              "inline-flex items-center rounded-full border border-border bg-secondary/20 text-xs font-mono uppercase tracking-widest px-2 py-0.5 text-muted-foreground",
              "animate-fade-in-up-1"
            )}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Action button */}
      {onAction && (
        <button
          onClick={onAction}
          className={cn(
            "mt-4 inline-flex cursor-pointer rounded-md bg-accent text-accent-foreground px-3 py-1.5 text-xs font-semibold uppercase tracking-widest hover:bg-accent/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent transition-colors duration-150 motion-reduce:transition-none motion-reduce:focus-visible:ring-0"
          )}
        >
          Take Action
        </button>
      )}
    </div>
  );
}