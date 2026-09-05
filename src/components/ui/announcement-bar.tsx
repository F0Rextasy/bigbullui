"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export type AnnouncementBarVariant = "festival" | "urgent" | "accent" | "default";

export interface AnnouncementBarProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  /** Visual theme variant */
  variant?: AnnouncementBarVariant;
  /** Micro uppercase category eyebrow tag */
  badgeLabel?: string;
  /** Main announcement headline */
  title?: React.ReactNode;
  /** Secondary announcement text or details */
  description?: React.ReactNode;
  /** Target expiration date for live ticking countdown urgency */
  targetDate?: Date | string;
  /** Total countdown duration in seconds if no fixed date is used */
  countdownSeconds?: number;
  /** Prefix label for countdown badge (e.g. 'ENDS IN' or 'PASS SALE') */
  countdownLabel?: string;
  /** Static urgency badge text if no countdown date is specified */
  urgencyText?: string;
  /** Text label for the ticket CTA action button */
  actionLabel?: string;
  /** Optional href link destination for the CTA button */
  actionHref?: string;
  /** Click handler for the CTA button */
  onAction?: () => void;
  /** Whether the announcement can be closed by the user */
  dismissible?: boolean;
  /** Callback fired when the announcement is dismissed */
  onDismiss?: () => void;
  /** Controlled visibility state */
  open?: boolean;
  /** Initial visibility state when uncontrolled */
  defaultOpen?: boolean;
  /** Whether to stick to the top of the viewport */
  sticky?: boolean;
  /** Custom leading icon element */
  icon?: React.ReactNode;
  /** Additional custom class names */
  className?: string;
  /** Children content replacing default text layout */
  children?: React.ReactNode;
}

const variantStyles: Record<AnnouncementBarVariant, {
  container: string;
  badge: string;
  urgency: string;
  button: string;
}> = {
  festival: {
    container: "bg-card text-card-foreground border-border",
    badge: "border-border bg-secondary text-secondary-foreground",
    urgency: "border-accent/40 bg-accent/10 text-accent font-bold",
    button: "border-foreground/20 bg-accent text-accent-foreground hover:bg-accent/90",
  },
  urgent: {
    container: "bg-destructive/10 text-foreground border-destructive/40",
    badge: "border-destructive/50 bg-destructive/20 text-destructive",
    urgency: "border-destructive bg-destructive text-primary-foreground font-black animate-pulse",
    button: "border-destructive bg-destructive text-primary-foreground hover:bg-destructive/90",
  },
  accent: {
    container: "bg-accent/10 text-foreground border-accent/40",
    badge: "border-accent/40 bg-accent/20 text-accent font-bold",
    urgency: "border-accent bg-accent text-accent-foreground font-bold",
    button: "border-foreground/20 bg-foreground text-background hover:bg-foreground/90",
  },
  default: {
    container: "bg-card text-foreground border-border",
    badge: "border-border bg-muted text-muted-foreground",
    urgency: "border-border bg-secondary text-foreground font-medium",
    button: "border-border bg-primary text-primary-foreground hover:bg-primary/90",
  },
};

export function AnnouncementBar({
  variant = "festival",
  badgeLabel = "FESTIVAL ALERT",
  title = "MIDNIGHT GALA PASS RELEASE",
  description = "Tier 1 admission tickets are now live. Maximum 4 stubs per turnstile holder.",
  targetDate,
  countdownSeconds,
  countdownLabel = "CLOSES IN",
  urgencyText,
  actionLabel = "CLAIM STUB",
  actionHref,
  onAction,
  dismissible = true,
  onDismiss,
  open: controlledOpen,
  defaultOpen = true,
  sticky = false,
  icon,
  className,
  children,
  ...props
}: AnnouncementBarProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen);
  const isOpen = controlledOpen !== undefined ? controlledOpen : uncontrolledOpen;

  // Countdown timer calculation
  const calculateRemaining = React.useCallback(() => {
    if (targetDate) {
      const diff = +new Date(targetDate) - +new Date();
      if (diff <= 0) {
        return { hours: 0, minutes: 0, seconds: 0, expired: true };
      }
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);
      return { hours, minutes, seconds, expired: false };
    }
    return null;
  }, [targetDate]);

  const [timeLeft, setTimeLeft] = React.useState<{
    hours: number;
    minutes: number;
    seconds: number;
    expired: boolean;
  } | null>(null);

  const [secondsRemaining, setSecondsRemaining] = React.useState<number | null>(
    countdownSeconds ?? null
  );

  React.useEffect(() => {
    if (targetDate) {
      setTimeLeft(calculateRemaining());
      const interval = setInterval(() => {
        const remaining = calculateRemaining();
        setTimeLeft(remaining);
        if (remaining?.expired) {
          clearInterval(interval);
        }
      }, 1000);
      return () => clearInterval(interval);
    }
    return undefined;
  }, [targetDate, calculateRemaining]);

  React.useEffect(() => {
    if (countdownSeconds && !targetDate) {
      setSecondsRemaining(countdownSeconds);
      const interval = setInterval(() => {
        setSecondsRemaining((prev) => {
          if (prev === null || prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
    return undefined;
  }, [countdownSeconds, targetDate]);

  const handleDismiss = () => {
    setUncontrolledOpen(false);
    onDismiss?.();
  };

  if (!isOpen) return null;

  const currentVariant = variantStyles[variant];

  // Format countdown string
  let formattedCountdown: string | null = null;
  if (timeLeft) {
    const hh = String(timeLeft.hours).padStart(2, "0");
    const mm = String(timeLeft.minutes).padStart(2, "0");
    const ss = String(timeLeft.seconds).padStart(2, "0");
    formattedCountdown = `${hh}:${mm}:${ss}`;
  } else if (secondsRemaining !== null) {
    const hh = String(Math.floor(secondsRemaining / 3600)).padStart(2, "0");
    const mm = String(Math.floor((secondsRemaining % 3600) / 60)).padStart(2, "0");
    const ss = String(secondsRemaining % 60).padStart(2, "0");
    formattedCountdown = `${hh}:${mm}:${ss}`;
  }

  const displayUrgency = formattedCountdown
    ? `${countdownLabel} ${formattedCountdown}`
    : urgencyText || "LIMITED PASSES";

  return (
    <div
      role="banner"
      aria-label="Festival announcement ribbon"
      className={cn(
        "relative w-full border-y-2 border-dashed font-mono select-none transition-all shadow-xs",
        sticky && "sticky top-0 z-50 backdrop-blur-md",
        currentVariant.container,
        className
      )}
      {...props}
    >
      {/* Ticket Perforation Notch Cutouts - Left */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-1.5 -left-1.5 size-3 rounded-full border border-border bg-background z-10"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-1.5 -left-1.5 size-3 rounded-full border border-border bg-background z-10"
      />

      {/* Ticket Perforation Notch Cutouts - Right */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-1.5 -right-1.5 size-3 rounded-full border border-border bg-background z-10"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-1.5 -right-1.5 size-3 rounded-full border border-border bg-background z-10"
      />

      {/* Inner double-frame container */}
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-2.5 sm:px-6">
        {/* Left / Center Content Section */}
        <div className="flex flex-1 flex-wrap items-center gap-2.5 sm:gap-4 min-w-[260px]">
          {/* Default or Custom Ticket Stamp Icon */}
          <div className="flex items-center gap-2 shrink-0">
            {icon ? (
              icon
            ) : (
              <span
                aria-hidden="true"
                className="flex size-6 items-center justify-center rounded-xs border border-dashed border-border bg-secondary/60 text-xs font-bold"
              >
                ★
              </span>
            )}

            {/* Category / Eyebrow Badge */}
            {badgeLabel && (
              <span
                className={cn(
                  "rounded-xs border px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.2em] shadow-2xs",
                  currentVariant.badge
                )}
              >
                {badgeLabel}
              </span>
            )}
          </div>

          {/* Countdown / Urgency Badge */}
          {displayUrgency && (
            <div
              className={cn(
                "inline-flex items-center gap-1.5 rounded-xs border px-2 py-0.5 text-[10px] tracking-wider uppercase shrink-0",
                currentVariant.urgency
              )}
            >
              <span className="relative flex size-1.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-current opacity-75" />
                <span className="relative inline-flex size-1.5 rounded-full bg-current" />
              </span>
              <span>{displayUrgency}</span>
            </div>
          )}

          {/* Headline and Description or Children */}
          {children ? (
            children
          ) : (
            <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5 text-xs">
              {title && (
                <span className="font-bold tracking-tight text-foreground">
                  {title}
                </span>
              )}
              {description && (
                <span className="text-muted-foreground hidden md:inline">
                  — {description}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Right Action CTA & Dismiss Section */}
        <div className="flex items-center gap-2 shrink-0">
          {actionLabel && (
            actionHref ? (
              <a
                href={actionHref}
                onClick={onAction}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-xs border px-3 py-1 text-xs font-bold uppercase tracking-wider transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer shadow-xs",
                  currentVariant.button
                )}
              >
                <span>{actionLabel}</span>
                <span aria-hidden="true" className="font-mono text-xs font-bold">→</span>
              </a>
            ) : (
              <button
                type="button"
                onClick={onAction}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-xs border px-3 py-1 text-xs font-bold uppercase tracking-wider transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer shadow-xs",
                  currentVariant.button
                )}
              >
                <span>{actionLabel}</span>
                <span aria-hidden="true" className="font-mono text-xs font-bold">→</span>
              </button>
            )
          )}

          {/* Dismiss Action Button */}
          {dismissible && (
            <button
              type="button"
              onClick={handleDismiss}
              aria-label="Dismiss announcement ribbon"
              className="flex size-7 items-center justify-center rounded-xs border border-transparent text-muted-foreground transition-colors hover:border-dashed hover:border-border hover:bg-secondary/80 hover:text-foreground cursor-pointer"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
