import * as React from "react";
import { cn } from "./lib/utils";

export interface HeadingProps {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  size?: "lg" | "md" | "sm";
  eyebrow?: string;
  className?: string;
  children: React.ReactNode;
}

const levelClasses: Record<1 | 2 | 3 | 4 | 5 | 6, string> = {
  1: "text-3xl font-extrabold tracking-tight",
  2: "text-2xl font-bold tracking-tight",
  3: "text-xl font-bold",
  4: "text-lg font-semibold",
  5: "text-base font-semibold",
  6: "text-sm font-semibold uppercase tracking-[0.15em]",
};

const sizeOverride: Record<"lg" | "md" | "sm", string> = {
  lg: "text-4xl md:text-5xl",
  md: "text-2xl",
  sm: "text-lg",
};

export function Heading({ level = 1, size, eyebrow, className, children }: HeadingProps) {
  const Tag = `h${level}` as const;

  return (
    <Tag
      className={cn(
        "font-mono uppercase text-foreground animate-[fade-in-up_0.3s_ease-out_both] motion-reduce:animate-none",
        levelClasses[level],
        size && sizeOverride[size],
        className
      )}
      style={{ animationDelay: `${(level - 1) * 12}ms` }}
    >
      {eyebrow && (
        <span className="mb-2 block font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground animate-[stamp_0.4s_ease-out_both] motion-reduce:animate-none">
          {eyebrow}
        </span>
      )}
      {children}
    </Tag>
  );
}
