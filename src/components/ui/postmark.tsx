"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface PostmarkProps {
  city: string;
  date?: string;
  serial?: string;
}

export function Postmark({ city, date = new Date().toLocaleDateString(), serial }: PostmarkProps) {
  return (
    <svg
      className="relative size-20"
      viewBox="0 0 100 100"
      fill="none"
    >
      <g stroke="currentColor" strokeWidth={1} strokeOpacity={0.85}>
        {Array.from({ length: 8 }, (_, i) => {
          const angle = (i / 8) * Math.PI * 2;
          const radius = 40;
          const x = 50 + Math.cos(angle) * radius;
          const y = 50 + Math.sin(angle) * radius;
          return <path key={i} d={`M 50 50 L ${x} ${y}`} />;
        })}
      </g>

      <text
        x={50}
        y={70}
        textAnchor="middle"
        fontFamily="monospace"
        fontSize={8}
        fill="currentColor"
        opacity={0.85}
      >
        {date}
      </text>

      <text
        x={50}
        y={85}
        textAnchor="middle"
        fontFamily="monospace"
        fontSize={7}
        fill="currentColor"
        opacity={0.7}
      >
        {city}
      </text>

      <g fill="currentColor" opacity={0.9}>
        <circle cx={20} cy={20} r={3} />
        <circle cx={80} cy={20} r={3} />
        <circle cx={20} cy={80} r={3} />
        <circle cx={80} cy={80} r={3} />
      </g>
    </svg>
  );
}