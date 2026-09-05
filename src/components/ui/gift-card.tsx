"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface GiftCardProps {
  amount: string;
  recipient: string;
  message?: string;
  className?: string;
}

const RibbonEnter = "gift-card-ribbon-enter";
const FadeIn = "gift-card-fade-in";

export function GiftCard({
  amount,
  recipient,
  message = "Happy Birthday!",
  className,
}: GiftCardProps) {
  return (
    <div
      className={cn(
        "rounded-lg border border-foreground bg-card text-card-foreground p-6 relative overflow-hidden transition-all duration-300 hover:translate-y-1 hover:shadow-lg motion-reduce:transition-none motion-reduce:translate-y-0 motion-reduce:shadow-none",
        className
      )}
    >
      {/* Amount badge */}
      <div
        className={cn(
          "absolute -top-1 -right-1 rounded-xl bg-accent text-accent-foreground text-xs font-bold uppercase tracking-wider px-2 py-1",
          RibbonEnter
        )}
      >
        {amount}
      </div>

      {/* Recipient name */}
      <h4 className="font-medium line-clamp-2 mt-4">{recipient}</h4>

      {/* Message */}
      <p className="text-sm text-muted-foreground line-clamp-2 mt-2">{message}</p>

      {/* Decorative ribbon */}
      <div
        className={cn(
          "absolute -bottom-1 -left-1 w-12 h-0.5 bg-accent",
          RibbonEnter
        )}
      />
    </div>
  );
}