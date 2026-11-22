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
        "group relative w-full rounded-lg border border-foreground bg-card p-6 text-card-foreground transition-all duration-300 hover:translate-y-1 hover:shadow-lg motion-reduce:transition-none motion-reduce:hover:translate-y-0 motion-reduce:shadow-none",
        className,
      )}
    >
      <div className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-secondary">
        <span className="font-mono text-xl font-bold text-foreground">{initials}</span>
        <div
          aria-hidden="true"
          className="absolute -inset-0.5 rounded-full border border-dashed border-border opacity-50"
        />
      </div>

      <div className="mt-4 flex-1">
        <h4 className="line-clamp-2 font-medium">{name}</h4>
        <p className="line-clamp-2 text-sm text-muted-foreground">{role}</p>
      </div>

      {meta.length > 0 ? (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {meta.map((tag, i) => (
            <span
              key={`${tag}-${i}`}
              className="inline-flex items-center rounded-full border border-border bg-secondary/40 px-2 py-0.5 font-mono text-xs uppercase tracking-widest text-muted-foreground motion-safe:animate-[fade-in-up_0.25s_ease-out_both]"
            >
              {tag}
            </span>
          ))}
        </div>
      ) : null}

      {onAction ? (
        <button
          type="button"
          onClick={onAction}
          className="mt-4 inline-flex cursor-pointer rounded-md bg-accent px-3 py-1.5 text-xs font-semibold uppercase tracking-widest text-accent-foreground transition-colors duration-150 hover:bg-accent/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none"
        >
          Take Action
        </button>
      ) : null}
    </div>
  );
}
