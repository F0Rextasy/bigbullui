"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface WishlistButtonProps {
  active?: boolean;
  onToggle?: (active: boolean) => void;
  size?: "sm" | "md" | "lg";
  className?: string;
}


export function WishlistButton({
  active = false,
  onToggle,
  size = "md",
  className,
}: WishlistButtonProps) {
  const [isActive, setIsActive] = React.useState(active);

  const handleToggle = () => {
    setIsActive(!isActive);
    onToggle?.(!isActive);
  };

  const sizeClass = size === "sm" ? "size-4" : size === "lg" ? "size-6" : "size-5";

  return (
    <>
    <button
      onClick={handleToggle}
      className={cn(
        "inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-full border-2 border-foreground bg-card text-foreground transition-all duration-200 hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring mb-2",
        active && "bg-accent text-accent",
        !active && "hover:bg-accent hover:text-accent-foreground",
        className
      )}
    >
      <svg
        width={sizeClass}
        height={sizeClass}
        viewBox="0 0 24 24"
        fill={isActive ? "currentColor" : "none"}
        aria-hidden="true"
        className={cn("transition-transform duration-200")}
      >
        <path
          d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 5 16.5 5 17.33 5 19 6.34 19 8.5 0 3.43-.79 1.42-2.19-1.11L12 21.35z"
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
    <style>{`
      @keyframes wishlist-heart-pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.3); }
      }
      @keyframes wishlist-floating-hearts {
        0% { transform: translateY(0) scale(1); opacity: 1; }
        100% { transform: translateY(-100px) scale(0.8); opacity: 0; }
      }
    `}</style>
    </>
  );
}