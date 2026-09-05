import * as React from "react";
import { cn } from "./lib/utils";

export interface LinkCardProps extends React.HTMLAttributes<HTMLAnchorElement> {
  href: string;
  title: string;
  description?: string;
  external?: boolean;
}

export function LinkCard({
  href,
  title,
  description,
  external = false,
  className,
  ...props
}: LinkCardProps) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      className={cn(
        "group flex items-start justify-between gap-4 rounded-md border border-border bg-card p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-foreground/40 hover:shadow-[4px_4px_0_0_var(--color-border)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none motion-reduce:hover:translate-y-0 motion-reduce:hover:shadow-none animate-[fade-in-up_0.3s_ease-out_both] motion-reduce:animate-none",
        className
      )}
      {...props}
    >
      <span className="min-w-0">
        <span className="block font-mono text-[12px] font-bold uppercase tracking-[0.12em] text-foreground">{title}</span>
        {description && (
          <span className="mt-1 block text-sm text-muted-foreground">{description}</span>
        )}
      </span>
      <svg
        aria-hidden="true"
        viewBox="0 0 16 16"
        className="mt-0.5 size-4 shrink-0 text-muted-foreground transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
      >
        {external ? (
          <path d="M6 3h7v7M13 3L7 9M11 13H3V5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        ) : (
          <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        )}
      </svg>
    </a>
  );
}
