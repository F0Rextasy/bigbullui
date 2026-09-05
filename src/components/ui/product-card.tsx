"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface ProductCardProps {
  title: string;
  price: string;
  originalPrice?: string;
  image?: string;
  discount?: number;
  className?: string;
  onAddToWishlist?: () => void;
}

const Entrance = "animate-fade-in-up fade-in-up-0s";
const Pulse = "wishlist-heart-corner-pulse";

const badgeClass = "absolute -top-1.5 -right-1.5 rounded-xs bg-destructive text-destructive-foreground text-xs font-bold uppercase tracking-widest px-1.5 py-0.5";

export function ProductCard({
  title,
  price,
  originalPrice,
  image,
  discount = 0,
  className,
  onAddToWishlist,
}: ProductCardProps) {
  return (
    <div
      className={cn(
        "group relative w-full rounded-lg border border-foreground bg-card text-card-foreground overflow-hidden hover:translate-y-1 hover:shadow-lg transition-all duration-300 motion-reduce:transition-none motion-reduce:translate-y-0 motion-reduce:shadow-none",
        className
      )}
    >
      {/* Image with entrance and hover scale */}
      <div className="relative aspect-[4/3] overflow-hidden">
        {image && (
          <img
            src={image}
            alt={title}
            className={cn(
              "object-cover w-full h-full transition-transform group-hover:scale-105 motion-reduce:transition-none group-hover:scale-1",
              discount > 0 && "brightness-90"
            )}
            loading="lazy"
          />
        )}
        {discount > 0 && (
          <div
            className={cn(
              badgeClass,
              "border-2 border-destructive border-opacity-80"
            )}
          >
            {discount}%
          </div>
        )}
      </div>

      <div className="p-4 flex flex-col gap-2.5 flex-1">
        <h4 className="font-mono text-sm font-bold uppercase tracking-widest text-foreground group-hover:underline group-hover:underline-offset-4 transition-colors">{title}</h4>

        <div className="flex items-baseline gap-1.5">
          <span className="font-mono text-[15px] font-semibold">{price}</span>
          {originalPrice && (
            <span className="line-through text-muted-foreground text-xs opacity-60">{originalPrice}</span>
          )}
        </div>

        <button
          onClick={onAddToWishlist}
          className={cn(
            "mt-1.5 inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-full border-2 border-accent text-accent px-3 py-1.5 text-xs font-semibold uppercase tracking-widest hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent motion-reduce:transition-none motion-reduce:scale-100",
            Pulse
          )}
        >
          <svg
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
            className={cn("transition-transform duration-200", Pulse)}
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 5 16.5 5 17.33 5 19 6.34 19 8.5 0 3.43-.79 1.42-2.19-1.11L12 21.35z" />
          </svg>
          Wishlist
        </button>
      </div>
    </div>
  );
}