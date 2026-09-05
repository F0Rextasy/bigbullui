import * as React from "react";
import { cn } from "./lib/utils";

export interface LogoCloudProps {
  logos?: string[];
  scrolling?: boolean;
  className?: string;
}

export function LogoCloud({
  logos = [],
  scrolling = false,
  className,
}: LogoCloudProps) {
  const logoCount = logos.length || 6; // default set of placeholder logos
  const logoItems = Array.from({ length: logoCount }, (_, i) => `
    LOGO${i + 1}
  `.trim());

  return (
    <div
      className={cn(
        "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 motion-reduce:transition-none",
        className
      )}
    >
      {logoItems.map((logoText, i) => (
        <div
          key={i}
          className={cn(
            "group rounded-md border border-dashed border-border/60 p-3 text-center hover:opacity-90 hover transition-opacity",
            scrolling && "animate-[marquee_15s_linear_infinite]",
            className
          )}
        >
          <span className="text-[9px] font-mono text-muted-foreground uppercase tracking-[0.1em]">
            {logoText}
          </span>
        </div>
      ))}
    </div>
  );
}