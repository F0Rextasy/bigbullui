import * as React from "react";
import { cn } from "./lib/utils";

export interface TestimonialProps extends React.HTMLAttributes<HTMLElement> {
  avatarInitials?: string;
  name?: string;
  role?: string;
  stars?: number;
  quote?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
}

export function Testimonial({
  avatarInitials = "AB",
  name = "Customer Name",
  role = "Role",
  stars = 5,
  quote,
  className,
  children,
  ...props
}: TestimonialProps) {
  return (
    <blockquote
      className={cn(
        "relative rounded-lg border border-border bg-card p-6 outline-1 outline-dashed outline-offset-[-6px] animate-[fade-in-up_0.3s_ease-out_both] motion-reduce:animate-none",
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-1" aria-label={`${stars} out of 5 stars`}>
        {Array.from({ length: 5 }, (_, i) => (
          <svg
            key={i}
            aria-hidden="true"
            viewBox="0 0 16 16"
            className={cn(
              "size-4 animate-[scale-in_0.15s_ease-out_both] motion-reduce:animate-none",
              i < stars ? "text-accent" : "text-muted-foreground/40"
            )}
            style={{ animationDelay: `${150 + i * 60}ms` }}
          >
            <path
              d="M8 1.5l1.9 4 4.4.5-3.3 3 .9 4.3L8 11.1l-3.9 2.2.9-4.3-3.3-3 4.4-.5z"
              fill="currentColor"
            />
          </svg>
        ))}
      </div>
      <p className="mt-4 text-sm text-foreground">
        {quote ?? children ?? "Best ticket stub interface we have ever shipped. Fast, sharp and effortless."}
      </p>
      <footer className="mt-5 flex items-center gap-3 border-t border-dashed border-border pt-4">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-border bg-secondary font-mono text-xs font-bold text-secondary-foreground">
          {avatarInitials}
        </span>
        <span>
          <span className="block font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-foreground">{name}</span>
          <span className="block font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">{role}</span>
        </span>
      </footer>
    </blockquote>
  );
}
