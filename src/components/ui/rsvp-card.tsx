"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface RsvpCardProps {
  eventTitle: string;
  attending?: boolean;
  onToggle?: (attending: boolean) => void;
  className?: string;
}

const CheckEnter = "rsvp-check-enter";
const FadeIn = "rsvp-fade-in";

export function RsvpCard({
  eventTitle,
  attending = false,
  onToggle,
  className,
}: RsvpCardProps) {
  return (
    <div
      className={cn(
        "rounded-lg border border-foreground bg-card text-card-foreground p-6 transition-all duration-300 hover:translate-y-1 hover:shadow-lg motion-reduce:transition-none motion-reduce:translate-y-0 motion-reduce:shadow-none",
        className
      )}
    >
      <div className="flex items-start gap-4">
        {/* Checkmark / toggle */}
        <button
          onClick={() => onToggle?.(!attending)}
          className={cn(
            "flex size-8 rounded-full border-2 border-dashed border-border items-center justify-center cursor-pointer transition-colors duration-150",
            attending && "bg-accent text-accent",
            !attending && "hover:bg-accent hover:text-accent-foreground",
            CheckEnter
          )}
        >
          {attending ? (
            <svg width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M9 16l6-6l6 6l-1.41-1.41L11 13.17l4.29-4.31L15 9l-6-6-6 6z" />
            </svg>
          ) : (
            <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <path d="M9 9V9m9 0h2" />
            </svg>
          )}
        </button>

        {/* Event info */}
        <div className="flex-1">
          <h3 className="font-medium line-clamp-1">{eventTitle}</h3>
          <p className="text-sm text-muted-foreground line-clamp-1 mt-1">
            Please confirm your attendance
          </p>
        </div>
      </div>
    </div>
  );
}