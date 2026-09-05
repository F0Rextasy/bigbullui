"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export type ZoomImageProps = {
  src: string;
  alt?: string;
  zoom?: number;
};

export function ZoomImage({ src, alt, zoom = 2 }: ZoomImageProps) {
  const [scale, setScale] = React.useState(1);
  const [offset, setOffset] = React.useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const target = e.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    const clientX = e.clientX - rect.left;
    const clientY = e.clientY - rect.top;
    const x = (clientX / rect.width - 0.5) * (zoom - 1) * 2;
    const y = (clientY / rect.height - 0.5) * (zoom - 1) * 2;
    setOffset({ x, y });
    setScale(zoom);
  };

  const handleMouseLeave = () => {
    setScale(1);
    setOffset({ x: 0, y: 0 });
  };

  const lensClass = cn(
    "absolute pointer-events-none w-24 h-24 rounded-full bg-white/50 transform-gpu blur-2xl",
    "motion-reduce:animate-none",
    "motion-reduce:transition-none",
  );

  return (
    <div
      className={cn(
        "relative inline-block rounded-md border border-border",
        "overflow-hidden",
        "motion-reduce:animate-none",
      )}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <img
        src={src}
        alt={alt}
        className={cn(
          "relative w-full h-auto transition-transform duration-300",
          "group-hover:scale-110 transition-transform",
          `transform: scale(${scale})`,
          "motion-reduce:animate-none",
          "motion-reduce:transition-none",
        )}
      />
      {scale > 1 && (
        <div
          className={lensClass}
          style={{
            left: offset.x,
            top: offset.y,
          }}
        />
      )}
    </div>
  );
}