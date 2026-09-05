"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface SplitScreenProps extends React.HTMLAttributes<HTMLDivElement> {
  /** sol taraf (genelde metin/form) */
  left: React.ReactNode;
  /** sağ taraf (genelde görsel/vurgu) */
  right: React.ReactNode;
  /** sağ tarafın genişlik oranı (0-1) */
  rightRatio?: number;
  /** mobilde sağ tarafı gizle */
  hideRightOnMobile?: boolean;
}

/** Yarı yarıya düzen: sol içerik + sağ vurgu paneli. */
export function SplitScreen({ left, right, rightRatio = 0.45, hideRightOnMobile = true, className, ...props }: SplitScreenProps) {
  const leftPct = Math.round((1 - rightRatio) * 100);
  const rightPct = Math.round(rightRatio * 100);

  return (
    <div className={cn("flex min-h-[420px] overflow-hidden rounded-lg border border-border", className)} {...props}>
      <style>{`@keyframes splitIn { from { opacity: 0; transform: translateX(-10px); } to { opacity: 1; transform: translateX(0); } }`}</style>
      <div
        className={cn("flex flex-col justify-center p-8 animate-[splitIn_0.4s_ease-out_both] motion-reduce:animate-none", hideRightOnMobile && "w-full lg:w-auto")}
        style={{ flexBasis: `${leftPct}%`, flexGrow: 1 }}
      >
        {left}
      </div>
      <div
        className={cn(
          "relative border-l border-border bg-secondary/40 p-8 animate-[splitIn_0.4s_ease-out_0.15s_both] motion-reduce:animate-none",
          hideRightOnMobile && "hidden lg:flex"
        )}
        style={{ flexBasis: `${rightPct}%` }}
      >
        {right}
      </div>
    </div>
  );
}
