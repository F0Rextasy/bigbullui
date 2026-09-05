"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface IdCardProps {
  name: string;
  role: string;
  department: string;
  badgeNumber: string;
  className?: string;
}

const Entrance = "id-card-entrance";
const ScaleIn = "id-card-scale-in";

export function IdCard({
  name,
  role,
  department,
  badgeNumber,
  className,
}: IdCardProps) {
  return (
    <div
      className={cn(
        "rounded-lg border border-foreground bg-card text-card-foreground p-6 relative overflow-hidden transition-all duration-300 hover:translate-y-1 hover:shadow-lg motion-reduce:transition-none motion-reduce:translate-y-0 motion-reduce:shadow-none",
        className
      )}
    >
      {/* Top accent bar */}
      <div
        className={cn(
          "absolute -inset-1 bg-accent opacity-10",
          ScaleIn
        )}
      />

      {/* Avatar */}
      <div className="relative w-16 h-16 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4">
        <span className={cn("text-xl font-bold")}>{name.split(" ")[0].charAt(0)}</span>
      </div>

      {/* Name */}
      <h3 className="font-medium text-center text-lg line-clamp-2 mb-1">{name}</h3>

      {/* Role */}
      <p className="text-sm text-muted-foreground text-center mb-3">{role}</p>

      {/* Department */}
      <p className="text-xs uppercase tracking-wider text-muted-foreground text-center">
        {department}
      </p>

      {/* Badge number */}
      <div className="mt-4 pt-4 border-t border-border/50">
        <span className="font-mono text-sm font-bold">Badge: {badgeNumber}</span>
      </div>
    </div>
  );
}