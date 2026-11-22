"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface GiftCardProps {
  amount: string;
  recipient: string;
  message?: string;
  className?: string;
}

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
        className="absolute -top-1 -right-1 rounded-xl bg-accent px-2 py-1 text-xs font-bold uppercase tracking-wider text-accent-foreground"
      >
        {amount}
      </div>

      {/* Recipient name */}
      <h4 className="font-medium line-clamp-2 mt-4">{recipient}</h4>

      {/* Message */}
      <p className="text-sm text-muted-foreground line-clamp-2 mt-2">{message}</p>

      {/* Decorative ribbon */}
      <div
        className="absolute -bottom-1 -left-1 h-0.5 w-12 bg-accent"
      />
    </div>
  );
}