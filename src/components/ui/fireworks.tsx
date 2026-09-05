"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface FireworksProps {
  active?: boolean;
  bursts?: number;
}

/** Deterministic pseudo-random from an index (stable across renders, SSR-safe). */
function seeded(index: number, salt: number): number {
  const x = Math.sin(index * 127.1 + salt * 311.7) * 43758.5453;
  return x - Math.floor(x);
}

export function Fireworks({ active = true, bursts = 5 }: FireworksProps) {
  const count = Math.max(1, bursts);
  return (
    <div
      className={cn("relative size-64 overflow-hidden motion-reduce:animate-none", !active && "opacity-40")}
      aria-hidden="true"
    >
      <style>{`
        @keyframes fireworkRise {
          0% { transform: translate(-50%, 0) scale(0.4); opacity: 0; }
          15% { opacity: 1; }
          60% { transform: translate(-50%, -140px) scale(1); opacity: 1; }
          100% { transform: translate(-50%, -170px) scale(0.8); opacity: 0; }
        }
        @keyframes fireworkSpread {
          0% { transform: translate(-50%, -50%) translate(0, 0) scale(1); opacity: 1; }
          100% { transform: translate(-50%, -50%) translate(var(--dx), var(--dy)) scale(0.3); opacity: 0; }
        }
      `}</style>

      {/* Rockets */}
      {Array.from({ length: count }, (_, i) => {
        const delay = i * 0.6;
        return (
          <div
            key={`rocket-${i}`}
            className="absolute bottom-2 size-2 rounded-full bg-accent motion-reduce:animate-none"
            style={{
              left: `${15 + (i * 70) / count}%`,
              animation: active ? `fireworkRise 1.8s ease-out ${delay}s infinite` : "none",
            }}
          />
        );
      })}

      {/* Burst particles per rocket, deterministic offsets via CSS vars */}
      {Array.from({ length: count }, (_, rocket) => {
        const delay = rocket * 0.6;
        return (
          <div
            key={`burst-${rocket}`}
            className="absolute bottom-[168px] size-1.5 rounded-full motion-reduce:animate-none"
            style={{
              left: `${15 + (rocket * 70) / count}%`,
              background: rocket % 2 === 0 ? "var(--accent)" : "var(--destructive)",
              opacity: 0,
              ["--dx" as string]: `${Math.cos(seeded(rocket, 1) * Math.PI * 2) * 60}px`,
              ["--dy" as string]: `${Math.sin(seeded(rocket, 2) * Math.PI * 2) * 60}px`,
              animation: active ? `fireworkSpread 0.9s ease-out ${delay + 1.1}s infinite` : "none",
            }}
          />
        );
      })}
    </div>
  );
}
