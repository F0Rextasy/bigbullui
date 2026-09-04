"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface PasswordStrengthProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: string;
  className?: string;
  showCriteria?: boolean;
}

interface Criteria {
  label: string;
  met: boolean;
}

export function PasswordStrength({
  value = "",
  className,
  showCriteria = true,
  ...props
}: PasswordStrengthProps) {
  const criteria: Criteria[] = React.useMemo(() => [
    { label: "MIN 8 CHARACTERS", met: value.length >= 8 },
    { label: "UPPERCASE & LOWERCASE", met: /[A-Z]/.test(value) && /[a-z]/.test(value) },
    { label: "NUMERIC DIGIT (0-9)", met: /[0-9]/.test(value) },
    { label: "SPECIAL SYMBOL (#$@!)", met: /[^A-Za-z0-9]/.test(value) },
  ], [value]);

  const metCount = criteria.filter((c) => c.met).length;

  const strengthLevel = React.useMemo(() => {
    if (value.length === 0) return { label: "NO TICKET KEY", color: "bg-muted", width: "0%" };
    if (metCount <= 1) return { label: "REVOKED / WEAK", color: "bg-destructive", width: "25%" };
    if (metCount === 2) return { label: "STANDBY / FAIR", color: "bg-amber-500", width: "50%" };
    if (metCount === 3) return { label: "VALID / GOOD", color: "bg-amber-600", width: "75%" };
    return { label: "SECURE / ADMITTED", color: "bg-emerald-600", width: "100%" };
  }, [value, metCount]);

  return (
    <div className={cn("space-y-3 font-mono", className)} {...props}>
      {/* Header Info */}
      <div className="flex items-center justify-between text-xs">
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
          SECURITY METER
        </span>
        <span className="font-bold text-foreground transition-colors duration-300">
          {strengthLevel.label}
        </span>
      </div>

      {/* Segmented Meter Bar */}
      <div className="grid grid-cols-4 gap-1.5 p-1 rounded-md border border-border bg-secondary/50">
        {[0, 1, 2, 3].map((step) => {
          const isActive = step < metCount;
          return (
            <div
              key={step}
              className={cn(
                "h-2 rounded-sm transition-all duration-300",
                isActive ? strengthLevel.color : "bg-muted opacity-40",
                isActive && "shadow-xs"
              )}
            />
          );
        })}
      </div>

      {/* Criteria Checklist */}
      {showCriteria && (
        <div className="space-y-1.5 pt-1 border-t border-dashed border-border/80 text-[11px]">
          {criteria.map((c, i) => (
            <div
              key={i}
              className={cn(
                "flex items-center gap-2 transition-colors duration-200",
                c.met ? "text-foreground font-medium" : "text-muted-foreground/70"
              )}
            >
              <span
                className={cn(
                  "size-4 rounded-sm border flex items-center justify-center text-[10px] transition-all",
                  c.met
                    ? "border-accent bg-accent text-accent-foreground font-bold scale-110"
                    : "border-border bg-card text-transparent"
                )}
              >
                ✓
              </span>
              <span>{c.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
