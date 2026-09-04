import * as React from "react";
import { cn } from "./lib/utils";

export interface EmptyProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  action?: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}

export function Empty({
  title = "NOTHING HERE",
  description = "No stubs or records found in this section.",
  action,
  icon,
  className,
  ...props
}: EmptyProps) {
  return (
    <div
      className={cn(
        "flex min-h-[220px] w-full flex-col items-center justify-center rounded-lg border-2 border-dashed border-border bg-card/60 p-8 text-center",
        className
      )}
      {...props}
    >
      <div className="flex size-12 items-center justify-center rounded-md border border-dashed border-border bg-secondary text-muted-foreground">
        {icon ? (
          icon
        ) : (
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <rect width="18" height="18" x="3" y="3" rx="2" />
            <line x1="9" x2="9" y1="3" y2="21" strokeDasharray="2 2" />
            <circle cx="6" cy="12" r="1" fill="currentColor" />
          </svg>
        )}
      </div>

      <h3 className="mt-4 font-mono text-sm font-bold uppercase tracking-wider text-foreground">
        {title}
      </h3>

      {description ? (
        <p className="mt-1.5 max-w-sm font-mono text-xs text-muted-foreground leading-relaxed">
          {description}
        </p>
      ) : null}

      {action ? <div className="mt-5">{action}</div> : null}
    </div>
  );
}
