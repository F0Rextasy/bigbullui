import * as React from "react";
import { cn } from "./lib/utils";

export interface DriveInScreenProps {
  intermission?: number;
  className?: string;
}

export function DriveInScreen({ intermission = 0, className }: DriveInScreenProps) {
  return (
    <div
      className={cn(
        "relative rounded-2xl border border-border bg-card p-8 motion-reduce:transition-none",
        className
      )}
    >
      <style>{`
        @keyframes driveInFlicker {
          0%, 100% { filter: brightness(1); }
          50% { filter: brightness(1.08); }
        }
        @keyframes driveInScan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
      `}</style>

      {/* Big screen frame */}
      <div className="relative aspect-video bg-secondary/50 rounded-xl overflow-hidden motion-reduce:animate-none">
        {/* Projection flicker */}
        <div className="absolute inset-0 bg-black/40 animate-[driveInFlicker_2s_ease-in-out_infinite] motion-reduce:animate-none" />

        {/* Intermission countdown */}
        {intermission > 0 && (
          <div className="absolute inset-0 flex items-center justify-center font-mono text-4xl font-bold text-destructive animate-[fade-in-up_0.3s_ease-out_both] motion-reduce:animate-none">
            {intermission}
          </div>
        )}
      </div>

      {/* Car silhouette row bottom */}
      <div className="absolute bottom-2 left-8 right-8 h-8">
        {Array.from({ length: 4 }, (_, i) => (
          <div
            key={i}
            className="absolute bottom-0 w-8 h-3 rounded-b bg-foreground/20"
            style={{ left: `${i * 25 + 4}%` }}
          />
        ))}
      </div>

      {/* Scanline overlay - animated sweep */}
      <div
        className="absolute inset-8 opacity-60 pointer-events-none overflow-hidden rounded-xl motion-reduce:animate-none"
      >
        <div className="w-full h-1/3 bg-gradient-to-b from-transparent via-foreground/5 to-transparent animate-[driveInScan_3s_linear_infinite]" />
      </div>
    </div>
  );
}