"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface ScreenshotFrameProps extends React.HTMLAttributes<HTMLDivElement> {
  url: string;
  children: React.ReactNode;
}

/** Tarayıcı çerçeveli ekran görüntüsü: URL bar + pencere kontrolleri. */
export function ScreenshotFrame({ url, children, className, ...props }: ScreenshotFrameProps) {
  return (
    <div className={cn("w-full overflow-hidden rounded-lg border border-border bg-card shadow-sm", className)} {...props}>
      <style>{`@keyframes sfIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }`}</style>
      {/* URL bar */}
      <div className="flex items-center gap-2 border-b border-border bg-secondary/60 px-3 py-2 animate-[sfIn_0.3s_ease-out_both] motion-reduce:animate-none">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="size-2.5 rounded-full bg-destructive/70" />
          <span className="size-2.5 rounded-full bg-amber-500/70" />
          <span className="size-2.5 rounded-full bg-emerald-500/70" />
        </span>
        <span className="min-w-0 flex-1 truncate rounded-sm bg-background px-2 py-0.5 font-mono text-[10px] text-muted-foreground">{url}</span>
      </div>
      <div className="bg-background">
        {children}
      </div>
    </div>
  );
}
