"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface CouponProps extends React.HTMLAttributes<HTMLDivElement> {
  code: string;
  discount: string;
  title: string;
  subtitle?: string;
  expires?: string;
  onApply?: (code: string) => void;
  className?: string;
}

export function Coupon({
  code,
  discount,
  title,
  subtitle,
  expires,
  onApply,
  className,
  ...props
}: CouponProps) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    onApply?.(code);
  };

  return (
    <div
      className={cn(
        "relative flex flex-col sm:flex-row overflow-hidden rounded-lg border-2 border-foreground bg-card shadow-sm select-none",
        className
      )}
      {...props}
    >
      {/* Left Discount Badge Area */}
      <div className="flex flex-col items-center justify-center bg-accent px-6 py-4 text-accent-foreground sm:w-36">
        <span className="font-mono text-xs uppercase tracking-widest opacity-90">OFF</span>
        <span className="font-mono text-3xl font-black tracking-tight">{discount}</span>
        <span className="font-mono text-[9px] uppercase tracking-wider opacity-80">COUPON</span>
      </div>

      {/* Center Perforation Cutout with Scissors */}
      <div className="relative flex sm:flex-col items-center justify-between">
        <div className="size-4 rounded-full bg-background border-2 border-foreground -ml-2 sm:ml-0 sm:-mt-2 shrink-0" />
        <div className="h-0 w-full sm:w-0 sm:h-full border-t-2 sm:border-t-0 sm:border-l-2 border-dashed border-border" />
        <div className="size-4 rounded-full bg-background border-2 border-foreground -mr-2 sm:mr-0 sm:-mb-2 shrink-0" />
      </div>

      {/* Right Content Area */}
      <div className="flex flex-1 flex-col justify-between p-4 sm:p-5">
        <div>
          <h3 className="font-mono text-sm font-bold uppercase tracking-wide text-foreground">
            {title}
          </h3>
          {subtitle ? (
            <p className="mt-1 text-xs text-muted-foreground">{subtitle}</p>
          ) : null}
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="rounded-sm border border-dashed border-foreground/40 bg-secondary px-2.5 py-1 font-mono text-xs font-bold tracking-wider text-foreground">
              {code}
            </span>
            <button
              type="button"
              onClick={handleCopy}
              className="cursor-pointer font-mono text-xs text-accent hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {copied ? "COPIED!" : "COPY"}
            </button>
          </div>
          {expires ? (
            <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider">
              EXP: {expires}
            </span>
          ) : null}
        </div>
      </div>
    </div>
  );
}
