import * as React from "react";
import { cn } from "./lib/utils";

export interface MediaObjectProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  title?: string;
  description?: string;
  meta?: React.ReactNode;
  children?: React.ReactNode;
}

export function MediaObject({
  src,
  alt = "Media",
  title,
  description,
  meta,
  children,
  className,
  ...props
}: MediaObjectProps) {
  const media = src ? (
    <img src={src} alt={alt} className="size-20 shrink-0 rounded-md border border-border object-cover" />
  ) : (
    <span className="flex size-20 shrink-0 items-center justify-center rounded-md border border-dashed border-border bg-muted font-mono text-sm font-bold text-muted-foreground">
      {alt.slice(0, 2).toUpperCase()}
    </span>
  );

  return (
    <div
      className={cn(
        "flex items-start gap-4 rounded-md p-3 transition-transform duration-200 hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:hover:translate-y-0 animate-[fade-in-up_0.3s_ease-out_both] motion-reduce:animate-none",
        className
      )}
      {...props}
    >
      {media}
      <div className="min-w-0 flex-1">
        {title && (
          <p className="font-mono text-[12px] font-bold uppercase tracking-[0.12em] text-foreground">{title}</p>
        )}
        {description && (
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        )}
        {children}
        {meta && <div className="mt-2 flex flex-wrap gap-1.5">{meta}</div>}
      </div>
    </div>
  );
}
