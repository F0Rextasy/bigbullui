"use client";

import * as React from "react";
import { cn } from "./lib/utils";

interface HoverCardContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  openDelay: number;
  closeDelay: number;
  handleTriggerEnter: () => void;
  handleTriggerLeave: () => void;
  handleContentEnter: () => void;
  handleContentLeave: () => void;
  handleFocus: () => void;
  handleBlur: () => void;
  triggerId: string;
  contentId: string;
}

const HoverCardContext = React.createContext<HoverCardContextValue | null>(null);

function useHoverCardContext() {
  const ctx = React.useContext(HoverCardContext);
  if (!ctx) {
    throw new Error("HoverCard subcomponents must be used within a HoverCard root");
  }
  return ctx;
}

export interface HoverCardProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  openDelay?: number;
  closeDelay?: number;
  children: React.ReactNode;
}

export function HoverCard({
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  openDelay = 200,
  closeDelay = 250,
  children,
}: HoverCardProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : uncontrolledOpen;

  const openTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const triggerId = React.useId();
  const contentId = React.useId();

  const setOpen = React.useCallback(
    (nextOpen: boolean) => {
      if (!isControlled) {
        setUncontrolledOpen(nextOpen);
      }
      onOpenChange?.(nextOpen);
    },
    [isControlled, onOpenChange]
  );

  const clearTimers = React.useCallback(() => {
    if (openTimerRef.current) {
      clearTimeout(openTimerRef.current);
      openTimerRef.current = null;
    }
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }, []);

  const handleTriggerEnter = React.useCallback(() => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    openTimerRef.current = setTimeout(() => {
      setOpen(true);
    }, openDelay);
  }, [openDelay, setOpen]);

  const handleTriggerLeave = React.useCallback(() => {
    if (openTimerRef.current) {
      clearTimeout(openTimerRef.current);
      openTimerRef.current = null;
    }
    closeTimerRef.current = setTimeout(() => {
      setOpen(false);
    }, closeDelay);
  }, [closeDelay, setOpen]);

  const handleContentEnter = React.useCallback(() => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }, []);

  const handleContentLeave = React.useCallback(() => {
    if (openTimerRef.current) {
      clearTimeout(openTimerRef.current);
      openTimerRef.current = null;
    }
    closeTimerRef.current = setTimeout(() => {
      setOpen(false);
    }, closeDelay);
  }, [closeDelay, setOpen]);

  const handleFocus = React.useCallback(() => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    openTimerRef.current = setTimeout(() => {
      setOpen(true);
    }, Math.min(openDelay, 100));
  }, [openDelay, setOpen]);

  const handleBlur = React.useCallback(() => {
    if (openTimerRef.current) {
      clearTimeout(openTimerRef.current);
      openTimerRef.current = null;
    }
    closeTimerRef.current = setTimeout(() => {
      setOpen(false);
    }, closeDelay);
  }, [closeDelay, setOpen]);

  React.useEffect(() => {
    return () => clearTimers();
  }, [clearTimers]);

  React.useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, setOpen]);

  return (
    <HoverCardContext.Provider
      value={{
        open,
        setOpen,
        openDelay,
        closeDelay,
        handleTriggerEnter,
        handleTriggerLeave,
        handleContentEnter,
        handleContentLeave,
        handleFocus,
        handleBlur,
        triggerId,
        contentId,
      }}
    >
      <div className="relative inline-block">{children}</div>
    </HoverCardContext.Provider>
  );
}

export interface HoverCardTriggerProps extends React.HTMLAttributes<HTMLElement> {
  asChild?: boolean;
  children: React.ReactNode;
}

export function HoverCardTrigger({
  asChild = false,
  children,
  className,
  ...props
}: HoverCardTriggerProps) {
  const ctx = useHoverCardContext();

  if (asChild && React.isValidElement(children)) {
    const child = children as React.ReactElement<React.HTMLAttributes<HTMLElement>>;
    return React.cloneElement(child, {
      id: ctx.triggerId,
      "aria-haspopup": "dialog",
      "aria-expanded": ctx.open,
      "aria-controls": ctx.open ? ctx.contentId : undefined,
      onMouseEnter: (e: React.MouseEvent<HTMLElement>) => {
        child.props.onMouseEnter?.(e);
        ctx.handleTriggerEnter();
      },
      onMouseLeave: (e: React.MouseEvent<HTMLElement>) => {
        child.props.onMouseLeave?.(e);
        ctx.handleTriggerLeave();
      },
      onFocus: (e: React.FocusEvent<HTMLElement>) => {
        child.props.onFocus?.(e);
        ctx.handleFocus();
      },
      onBlur: (e: React.FocusEvent<HTMLElement>) => {
        child.props.onBlur?.(e);
        ctx.handleBlur();
      },
    });
  }

  return (
    <span
      id={ctx.triggerId}
      role="button"
      tabIndex={0}
      aria-haspopup="dialog"
      aria-expanded={ctx.open}
      aria-controls={ctx.open ? ctx.contentId : undefined}
      onMouseEnter={ctx.handleTriggerEnter}
      onMouseLeave={ctx.handleTriggerLeave}
      onFocus={ctx.handleFocus}
      onBlur={ctx.handleBlur}
      className={cn(
        "inline-flex items-center cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

export interface HoverCardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  align?: "start" | "center" | "end";
  side?: "top" | "bottom";
  showBeak?: boolean;
  children: React.ReactNode;
  className?: string;
}

export function HoverCardContent({
  align = "center",
  side = "bottom",
  showBeak = true,
  children,
  className,
  ...props
}: HoverCardContentProps) {
  const ctx = useHoverCardContext();
  const contentRef = React.useRef<HTMLDivElement>(null);

  if (!ctx.open) return null;

  return (
    <div
      ref={contentRef}
      role="dialog"
      id={ctx.contentId}
      aria-labelledby={ctx.triggerId}
      onMouseEnter={ctx.handleContentEnter}
      onMouseLeave={ctx.handleContentLeave}
      className={cn(
        "absolute z-50 w-80 rounded-lg border-2 border-foreground bg-card text-card-foreground p-4 shadow-2xl outline-1 outline-dashed outline-offset-[-6px] outline-border animate-[scale-in_0.16s_ease-out_both] select-none",
        side === "top"
          ? "bottom-[calc(100%+10px)]"
          : "top-[calc(100%+10px)]",
        align === "start" && "left-0",
        align === "center" && "left-1/2 -translate-x-1/2",
        align === "end" && "right-0",
        className
      )}
      {...props}
    >
      {/* Pointer Beak Notch */}
      {showBeak && (
        <span
          className={cn(
            "pointer-events-none absolute size-3.5 rotate-45 bg-card z-10",
            side === "bottom"
              ? "-top-[8px] border-t-2 border-l-2 border-foreground"
              : "-bottom-[8px] border-b-2 border-r-2 border-foreground",
            align === "start" && "left-6",
            align === "center" && "left-1/2 -translate-x-1/2",
            align === "end" && "right-6"
          )}
          aria-hidden="true"
        />
      )}

      {/* Ticket Stub Side Punch Notches */}
      <span
        className="pointer-events-none absolute -left-2.5 top-1/2 -translate-y-1/2 size-4 rounded-full bg-background border-2 border-foreground z-10"
        aria-hidden="true"
      />
      <span
        className="pointer-events-none absolute -right-2.5 top-1/2 -translate-y-1/2 size-4 rounded-full bg-background border-2 border-foreground z-10"
        aria-hidden="true"
      />

      {children}
    </div>
  );
}

export interface HoverCardSeatSummaryProps extends React.HTMLAttributes<HTMLDivElement> {
  badge?: string;
  ticketNo?: string;
  attendeeName: string;
  attendeeRole?: string;
  avatarUrl?: string;
  avatarFallback?: string;
  eventTitle?: string;
  date?: string;
  venue?: string;
  tier?: string;
  section?: string;
  row?: string;
  seat?: string;
  barcode?: string;
  status?: "admitted" | "confirmed" | "vip" | "reserved";
  footerAction?: React.ReactNode;
}

export function HoverCardSeatSummary({
  badge = "ADMISSION PASS",
  ticketNo = "#TKT-0491",
  attendeeName,
  attendeeRole,
  avatarUrl,
  avatarFallback,
  eventTitle,
  date,
  venue,
  tier = "VIP GOLD",
  section = "A1",
  row = "04",
  seat = "18",
  barcode = "ADMIT-ONE",
  status = "confirmed",
  footerAction,
  className,
  children,
  ...props
}: HoverCardSeatSummaryProps) {
  const initials =
    avatarFallback ??
    attendeeName
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();

  return (
    <div className={cn("flex flex-col text-left", className)} {...props}>
      {/* Top micro metadata header */}
      <div className="flex items-center justify-between gap-2 border-b border-dashed border-border pb-2.5">
        <span className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-accent">
          {badge}
        </span>
        <span className="font-mono text-[10px] font-semibold text-muted-foreground">
          {ticketNo}
        </span>
      </div>

      {/* Attendee Profile Row */}
      <div className="mt-3 flex items-center gap-3">
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt={attendeeName}
            className="size-10 shrink-0 rounded-md border-[1.5px] border-foreground object-cover shadow-sm"
          />
        ) : (
          <div className="flex size-10 shrink-0 items-center justify-center rounded-md border-[1.5px] border-foreground bg-secondary font-mono text-xs font-bold text-foreground shadow-sm">
            {initials}
          </div>
        )}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <span className="truncate font-sans text-sm font-bold text-foreground">
              {attendeeName}
            </span>
            {status && (
              <span
                className={cn(
                  "shrink-0 rounded px-1 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider",
                  status === "vip" && "bg-accent text-accent-foreground",
                  status === "confirmed" &&
                    "border border-foreground/20 bg-secondary text-secondary-foreground",
                  status === "admitted" && "bg-foreground text-background",
                  status === "reserved" && "bg-muted text-muted-foreground"
                )}
              >
                {status}
              </span>
            )}
          </div>
          {attendeeRole && (
            <p className="truncate font-mono text-[11px] text-muted-foreground">
              {attendeeRole}
            </p>
          )}
        </div>
      </div>

      {/* Event Details */}
      {(eventTitle || date || venue) && (
        <div className="mt-2.5 rounded border border-border/70 bg-secondary/40 p-2 text-xs">
          {eventTitle && (
            <p className="truncate font-semibold text-foreground">{eventTitle}</p>
          )}
          <div className="mt-0.5 flex items-center justify-between font-mono text-[11px] text-muted-foreground">
            {date && <span>{date}</span>}
            {venue && <span className="max-w-[120px] truncate">{venue}</span>}
          </div>
        </div>
      )}

      {/* Seating Grid */}
      <div className="mt-3 grid grid-cols-4 gap-1.5 border-y-2 border-dashed border-border py-2 text-center">
        <div>
          <span className="block font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
            TIER
          </span>
          <span className="block truncate font-mono text-xs font-extrabold text-foreground">
            {tier}
          </span>
        </div>
        <div>
          <span className="block font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
            SEC
          </span>
          <span className="block font-mono text-xs font-extrabold text-foreground">
            {section}
          </span>
        </div>
        <div>
          <span className="block font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
            ROW
          </span>
          <span className="block font-mono text-xs font-extrabold text-foreground">
            {row}
          </span>
        </div>
        <div>
          <span className="block font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
            SEAT
          </span>
          <span className="block font-mono text-xs font-extrabold text-accent">
            {seat}
          </span>
        </div>
      </div>

      {/* Barcode Strip & Footer */}
      <div className="mt-2.5 flex items-center justify-between pt-1">
        <div className="flex flex-col">
          <div className="flex h-4 items-center gap-[2px] opacity-85" aria-hidden="true">
            <span className="h-full w-[2px] bg-foreground" />
            <span className="h-full w-[1px] bg-foreground" />
            <span className="h-full w-[3px] bg-foreground" />
            <span className="h-full w-[1px] bg-foreground" />
            <span className="h-full w-[2px] bg-foreground" />
            <span className="h-full w-[4px] bg-foreground" />
            <span className="h-full w-[1px] bg-foreground" />
            <span className="h-full w-[2px] bg-foreground" />
            <span className="h-full w-[3px] bg-foreground" />
            <span className="h-full w-[1px] bg-foreground" />
            <span className="h-full w-[2px] bg-foreground" />
            <span className="h-full w-[1px] bg-foreground" />
            <span className="h-full w-[3px] bg-foreground" />
            <span className="h-full w-[1px] bg-foreground" />
            <span className="h-full w-[2px] bg-foreground" />
          </div>
          <span className="mt-0.5 font-mono text-[8px] uppercase tracking-widest text-muted-foreground">
            {barcode}
          </span>
        </div>
        {footerAction}
      </div>

      {children}
    </div>
  );
}

export function HoverCardHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("mb-2 flex flex-col gap-1 text-left", className)} {...props} />;
}

export function HoverCardTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h4 className={cn("font-sans text-sm font-bold tracking-tight text-foreground", className)} {...props} />;
}

export function HoverCardDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("font-mono text-xs text-muted-foreground", className)} {...props} />;
}

export function HoverCardFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("mt-3 flex items-center justify-between border-t border-dashed border-border pt-2", className)}
      {...props}
    />
  );
}
