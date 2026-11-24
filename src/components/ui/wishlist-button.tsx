"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface WishlistButtonProps extends Omit<React.HTMLAttributes<HTMLElement>, "onToggle"> {
  active?: boolean;
  onToggle?: (active: boolean) => void;
  size?: "sm" | "md" | "lg";
  className?: string;
}


export function WishlistButton({
  active = false,
  onToggle,
  size = "md",
  className, ...props
}: WishlistButtonProps) {
  const [isActive, setIsActive] = React.useState(active);

  const handleToggle = () => {
    setIsActive(!isActive);
    onToggle?.(!isActive);
  };

  const sizeNum = size === "sm" ? 16 : size === "lg" ? 24 : 20;

  return (
    <div className="relative inline-flex flex-col items-start" {...props}>
    <button
      type="button"
      onClick={handleToggle}
      aria-pressed={isActive}
      className={cn(
        "inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-full border-2 border-foreground bg-card text-foreground transition-[transform,opacity,background-color,border-color,color] duration-200 hover:scale-105 motion-reduce:hover:scale-100 active:scale-95 motion-reduce:active:scale-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring mb-2",
        isActive && "bg-accent text-accent-foreground",
        !isActive && "hover:bg-accent hover:text-accent-foreground",
        className
      )}
    >
      <svg
        width={sizeNum}
        height={sizeNum}
        viewBox="0 0 24 24"
        fill={isActive ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth={2}
        aria-hidden="true"
        className="transition-transform duration-200"
      >
        <path
          d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
        />
      </svg>
      Wishlist
    </button>

    {/* Floating mini hearts burst - only when active */}
    {isActive && (
      <div
        className={cn(
          "absolute inset-0 pointer-events-none overflow-hidden motion-reduce:animate-none"
        )}
        aria-hidden="true"
      >
        {Array.from({ length: 6 }).map((_, i) => (
          <span
            key={i}
            className="absolute text-accent text-xs animate-[wishlistBurst_0.6s_ease-out_both] motion-reduce:animate-none"
            style={{ left: `${10 + i * 15}%`, animationDelay: `${i * 60}ms` }}
          >
            ✓
          </span>
        ))}
      </div>
    )}
    </div>
  );
}