"use client";

import * as React from "react";
import { cn } from "./lib/utils";

type Size = "sm" | "md" | "lg";

export type AvatarProps = {
  name: string;
  src?: string;
  size?: Size;
  className?: string;
};

const sizes: Record<Size, string> = {
  sm: "size-8 text-xs",
  md: "size-10 text-sm",
  lg: "size-12 text-base",
};

function initialsOf(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0] ?? "")
    .join("")
    .toUpperCase();
}

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ name, src, size = "md", className }, ref) => {
    const [failed, setFailed] = React.useState(false);

    return (
      <div
        ref={ref}
        role="img"
        aria-label={name}
        className={cn(
          "inline-flex shrink-0 items-center justify-center overflow-hidden rounded-md border-2 border-dashed border-foreground/50 bg-secondary font-mono font-bold text-secondary-foreground",
          sizes[size],
          className
        )}
      >
        {src && !failed ? (
          <img src={src} alt={name} className="size-full object-cover" onError={() => setFailed(true)} />
        ) : (
          <span aria-hidden>{initialsOf(name)}</span>
        )}
      </div>
    );
  }
);
Avatar.displayName = "Avatar";

export { Avatar };
