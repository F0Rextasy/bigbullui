import * as React from "react";
import { cn } from "./lib/utils";

export interface PageHeaderProps {
  title: string;
  description?: string;
  actions?: React.ReactNode;
  eyebrow?: string;
  className?: string;
}

export function PageHeader({
  title,
  description,
  actions,
  eyebrow,
  className,
}: PageHeaderProps) {
  const titleClasses = "font-mono text-[15px] font-bold uppercase tracking-[0.1em]";
  const descClasses = "mt-1 text-sm text-muted-foreground";

  return (
    <header
      className={cn(
        "flex flex-col sm:flex-row gap-4 mb-6",
        "motion-reduce:transition-none",
        className
      )}
    >
      <div className="flex-1">
        {eyebrow && (
          <div className="mb-2 mono-uppercase stamp">
            <span className="text-[9px] font-mono text-muted-foreground uppercase tracking-[0.15em]">
              {eyebrow}
            </span>
          </div>
        )}
        <h2 className={cn(titleClasses, "animate-[stamp_0.4s_ease-out_both]")}>
          {title}
        </h2>
        {description && (
          <p className={cn(descClasses, "animate-[fade-in_0.3s_ease-out_both]")}>
            {description}
          </p>
        )}
      </div>
      {actions ? (
        <div className="self-end sm:self-auto animate-[fade-in-up_0.3s_ease-out_both]">
          {actions}
        </div>
      ) : null}
    </header>
  );
}