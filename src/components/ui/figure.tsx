import * as React from "react";
import { cn } from "./lib/utils";

export interface FigureProps extends React.HTMLAttributes<HTMLElement> {
  src?: string;
  alt?: string;
  caption?: React.ReactNode;
  children?: React.ReactNode;
}

export function Figure({ src, alt = "", caption, children, className, ...props }: FigureProps) {
  return (
    <figure
      className={cn(
        "rounded-lg border border-border bg-card p-1 outline-1 outline-dashed outline-offset-[-6px] animate-[fade-in-up_0.3s_ease-out_both] motion-reduce:animate-none",
        className
      )}
      {...props}
    >
      <div className="overflow-hidden rounded-md border border-dashed border-border/60">
        {src ? (
          <img src={src} alt={alt} className="aspect-video w-full object-cover" />
        ) : (
          <div className="flex aspect-video w-full items-center justify-center bg-muted text-sm text-muted-foreground">
            {children}
          </div>
        )}
      </div>
      {caption && (
        <figcaption
          className="border-t border-dashed border-border/60 px-3 py-2.5 text-center font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground animate-[fade-in_0.4s_ease-out_both] motion-reduce:animate-none"
          style={{ animationDelay: "250ms" }}
        >
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
