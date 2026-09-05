"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface CalloutProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  variant?: "info" | "success" | "warning" | "danger" | "neutral";
  icon?: React.ReactNode;
  dismissible?: boolean;
  onDismiss?: () => void;
  notched?: boolean;
  className?: string;
  children: React.ReactNode;
}

const VARIANT_STYLES = {
  info: "border-foreground bg-card text-foreground",
  success: "border-emerald-600 bg-emerald-500/10 text-emerald-950 dark:text-emerald-200",
  warning: "border-amber-500 bg-amber-500/10 text-amber-950 dark:text-amber-200",
  danger: "border-destructive bg-destructive/10 text-destructive",
  neutral: "border-border bg-secondary/50 text-foreground",
};

const VARIANT_BADGES = {
  info: "bg-foreground text-background",
  success: "bg-emerald-600 text-white",
  warning: "bg-amber-500 text-black",
  danger: "bg-destructive text-destructive-foreground",
  neutral: "bg-secondary text-foreground",
};

export function Callout({
  title,
  variant = "info",
  icon,
  dismissible = false,
  onDismiss,
  notched = true,
  className,
  children,
  ...props
}: CalloutProps) {
  const [dismissed, setDismissed] = React.useState(false);

  if (dismissed) return null;

  const handleDismiss = () => {
    setDismissed(true);
    onDismiss?.();
  };

  return (
    <div
      role="note"
      className={cn(
        "relative flex flex-col gap-2 rounded-lg border-2 border-dashed p-4 font-mono select-none shadow-xs",
        VARIANT_STYLES[variant],
        className
      )}
      {...props}
    >
      {notched && (
        <>
          <div
            aria-hidden="true"
            className="absolute -left-1.5 top-1/2 -translate-y-1/2 size-3 rounded-full border border-foreground bg-background"
          />
          <div
            aria-hidden="true"
            className="absolute -right-1.5 top-1/2 -translate-y-1/2 size-3 rounded-full border border-foreground bg-background"
          />
        </>
      )}

      {/* Header */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span
            className={cn(
              "rounded px-1.5 py-0.5 text-[9px] font-black uppercase tracking-wider",
              VARIANT_BADGES[variant]
            )}
          >
            {variant.toUpperCase()}
          </span>
          {title && (
            <span className="text-xs font-bold uppercase tracking-wide text-foreground">
              {title}
            </span>
          )}
        </div>

        {dismissible && (
          <button
            type="button"
            onClick={handleDismiss}
            aria-label="Dismiss callout"
            className="cursor-pointer rounded border border-current px-1.5 py-0.2 text-[10px] font-bold opacity-70 hover:opacity-100 transition-opacity"
          >
            ✕
          </button>
        )}
      </div>

      {/* Content */}
      <div className="text-xs font-sans leading-relaxed text-muted-foreground">
        {children}
      </div>
    </div>
  );
}
