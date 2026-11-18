"use client";

import * as React from "react";
import { cn } from "../ui/lib/utils";
import { GalleryGrid } from "../ui/gallery-grid";
import { Badge } from "../ui/badge";

const SHOTS = [
  { id: "doors", src: "/logo.svg", alt: "Doors poster" },
  { id: "stage", src: "/logo.svg", alt: "Stage poster" },
  { id: "stub", src: "/logo.svg", alt: "Stub close-up" },
  { id: "crowd", src: "/logo.svg", alt: "Crowd poster" },
  { id: "booth", src: "/logo.svg", alt: "Booth poster" },
  { id: "night", src: "/logo.svg", alt: "Night poster" },
];

export interface BlockGalleryProps extends React.HTMLAttributes<HTMLDivElement> {
  onAction?: (action: string) => void;
}

export function BlockGallery({ className, onAction, ...props }: BlockGalleryProps) {
  void onAction;
  return (
    <div className={cn("w-full space-y-4", className)} {...props}>
      <div className="flex flex-wrap items-end justify-between gap-2">
        <h2 className="font-mono text-2xl font-black uppercase tracking-tight">Night archive</h2>
        <Badge variant="outline">6 PRINTS</Badge>
      </div>
      <GalleryGrid images={SHOTS} columns={3} />
    </div>
  );
}
