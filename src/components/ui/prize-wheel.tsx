"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface PrizeWheelSegment {
  label: string;
  tint?: "accent" | "destructive" | "foreground" | "muted";
}

export interface PrizeWheelProps {
  segments: PrizeWheelSegment[];
  spinTo?: number;
  onResult?: (label: string) => void;
}

export function PrizeWheel({ segments, spinTo, onResult }: PrizeWheelProps) {
  return (
    <svg
      className="relative size-48 rounded-full bg-card border border-border"
      viewBox="0 0 100 100"
    >
      {segments.map((segment, i) => {
        const tintClass = segment.tint === "accent" ? "text-accent" :
          segment.tint === "destructive" ? "text-destructive" :
          segment.tint === "foreground" ? "text-foreground" : "text-muted-foreground";
        return (
          <polygon
            key={i}
            points="50,10 95,50 50,90 5,50"
            style={{ clipPath: "circle(50 at 50 50)" }}
          />
        );
      })}

      <polygon
        points="0,0 10,20 0,40"
        fill="currentColor"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "rotate(0deg) translate(-50%, -50%)",
          transition: "transform 1s cubic-bezier(0.16,1,0.3,1)"
        }}
      />

      <circle cx={50} cy={50} r={8} fill="currentColor" />
    </svg>
  );
}