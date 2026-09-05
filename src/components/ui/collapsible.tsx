"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export type CollapsibleStatus = "valid" | "admitted" | "void" | "pending" | "vip";

export interface CollapsibleContextValue {
  open: boolean;
  toggle: () => void;
  setOpen: (open: boolean) => void;
  disabled?: boolean;
  contentId: string;
}

const CollapsibleCtx = React.createContext<CollapsibleContextValue | null>(null);

export function useCollapsible(): CollapsibleContextValue {
  const context = React.useContext(CollapsibleCtx);
  if (!context) {
    throw new Error("useCollapsible must be used within a Collapsible");
  }
  return context;
}

export interface CollapsibleProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  disabled?: boolean;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  serial?: string;
  badge?: string;
  status?: CollapsibleStatus;
  stampText?: string;
  notch?: boolean;
}

export function Collapsible({
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  disabled = false,
  title,
  subtitle,
  serial = "STUB #08421",
  badge,
  status = "valid",
  stampText,
  notch = true,
  className,
  children,
  ...props
}: CollapsibleProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState<boolean>(defaultOpen);
  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : uncontrolledOpen;
  const contentId = React.useId();

  const setOpen = React.useCallback(
    (nextOpen: boolean) => {
      if (disabled) return;
      if (!isControlled) {
        setUncontrolledOpen(nextOpen);
      }
      onOpenChange?.(nextOpen);
    },
    [disabled, isControlled, onOpenChange]
  );

  const toggle = React.useCallback(() => {
    setOpen(!isOpen);
  }, [isOpen, setOpen]);

  const contextValue = React.useMemo<CollapsibleContextValue>(
    () => ({
      open: isOpen,
      toggle,
      setOpen,
      disabled,
      contentId,
    }),
    [isOpen, toggle, setOpen, disabled, contentId]
  );

  // Standalone disclosure card mode when title is provided
  if (title) {
    return (
      <CollapsibleCtx.Provider value={contextValue}>
        <div
          data-state={isOpen ? "open" : "closed"}
          className={cn(
            "group relative overflow-hidden rounded-lg border-2 border-foreground bg-card text-card-foreground shadow-sm transition-shadow duration-200 hover:shadow-md",
            isOpen && "ring-1 ring-border",
            className
          )}
          {...props}
        >
          {/* Ticket Header */}
          <div className="p-4 sm:p-5">
            {/* Meta micro row */}
            <div className="flex items-center justify-between gap-2">
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-accent">
                {serial}
              </span>
              {badge && (
                <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                  {badge}
                </span>
              )}
            </div>

            {/* Title & Action row */}
            <div className="mt-2.5 flex flex-wrap items-center justify-between gap-3">
              <div className="min-w-0 flex-1">
                <h3 className="font-mono text-sm sm:text-base font-bold uppercase tracking-wider text-foreground">
                  {title}
                </h3>
                {subtitle && (
                  <p className="mt-0.5 font-mono text-xs text-muted-foreground">
                    {subtitle}
                  </p>
                )}
              </div>

              {/* Stamp & Trigger */}
              <div className="flex items-center gap-2.5 shrink-0">
                {status && (
                  <CollapsibleStamp status={status}>
                    {stampText}
                  </CollapsibleStamp>
                )}
                <CollapsibleTrigger />
              </div>
            </div>
          </div>

          {/* Perforation Divider with Punch Notches */}
          {notch && (
            <div className="relative flex items-center w-full my-0" aria-hidden="true">
              <div className="absolute -left-3 size-5 rounded-full border-2 border-foreground bg-background shrink-0 z-10" />
              <div className="w-full border-t-2 border-dashed border-border" />
              <div className="absolute -right-3 size-5 rounded-full border-2 border-foreground bg-background shrink-0 z-10" />
            </div>
          )}

          {/* Animated Height Reveal Content */}
          <CollapsibleContent>
            <div className="p-4 sm:p-5 bg-secondary/15">
              {children}
            </div>
          </CollapsibleContent>
        </div>
      </CollapsibleCtx.Provider>
    );
  }

  // Compound component container mode
  return (
    <CollapsibleCtx.Provider value={contextValue}>
      <div
        data-state={isOpen ? "open" : "closed"}
        className={cn("relative", className)}
        {...props}
      >
        {children}
      </div>
    </CollapsibleCtx.Provider>
  );
}

export interface CollapsibleHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  notch?: boolean;
}

export function CollapsibleHeader({
  notch = false,
  className,
  children,
  ...props
}: CollapsibleHeaderProps) {
  return (
    <div className={cn("relative", className)} {...props}>
      {children}
      {notch && (
        <div className="relative flex items-center w-full my-0" aria-hidden="true">
          <div className="absolute -left-3 size-5 rounded-full border-2 border-foreground bg-background shrink-0 z-10" />
          <div className="w-full border-t-2 border-dashed border-border" />
          <div className="absolute -right-3 size-5 rounded-full border-2 border-foreground bg-background shrink-0 z-10" />
        </div>
      )}
    </div>
  );
}

export interface CollapsibleTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  showChevron?: boolean;
  showStateLabel?: boolean;
  expandedLabel?: string;
  collapsedLabel?: string;
}

export function CollapsibleTrigger({
  showChevron = true,
  showStateLabel = true,
  expandedLabel = "COLLAPSE",
  collapsedLabel = "EXPAND",
  className,
  children,
  onClick,
  ...props
}: CollapsibleTriggerProps) {
  const { open, toggle, disabled, contentId } = useCollapsible();

  return (
    <button
      type="button"
      aria-expanded={open}
      aria-controls={contentId}
      disabled={disabled}
      onClick={(event) => {
        toggle();
        onClick?.(event);
      }}
      className={cn(
        "inline-flex cursor-pointer items-center justify-center gap-1.5 rounded border border-border bg-secondary/80 px-2.5 py-1 font-mono text-[11px] font-bold uppercase tracking-wider text-secondary-foreground transition-all duration-150 select-none hover:bg-secondary hover:border-foreground active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
        className
      )}
      {...props}
    >
      {children ? (
        children
      ) : (
        <>
          {showStateLabel && (
            <span>{open ? expandedLabel : collapsedLabel}</span>
          )}
          {showChevron && (
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={cn(
                "shrink-0 transition-transform duration-300 ease-out",
                open && "rotate-180"
              )}
              aria-hidden="true"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          )}
        </>
      )}
    </button>
  );
}

export interface CollapsibleContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export function CollapsibleContent({
  className,
  children,
  ...props
}: CollapsibleContentProps) {
  const { open, contentId } = useCollapsible();

  return (
    <div
      id={contentId}
      role="region"
      aria-hidden={!open}
      data-state={open ? "open" : "closed"}
      className={cn(
        "grid transition-[grid-template-rows,opacity] duration-300 ease-out motion-reduce:transition-none",
        open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0 pointer-events-none",
        className
      )}
      {...props}
    >
      <div className="overflow-hidden">
        {children}
      </div>
    </div>
  );
}

export interface CollapsibleStampProps extends React.HTMLAttributes<HTMLSpanElement> {
  status?: CollapsibleStatus;
  rotate?: number;
}

export function CollapsibleStamp({
  status = "valid",
  rotate = -6,
  className,
  children,
  style,
  ...props
}: CollapsibleStampProps) {
  return (
    <span
      style={{
        transform: `rotate(${rotate}deg)`,
        ...style,
      }}
      className={cn(
        "inline-flex items-center justify-center rounded-sm border px-2 py-0.5 font-mono text-[10px] font-black uppercase tracking-widest select-none shadow-xs transition-transform duration-200 hover:scale-105",
        status === "valid" && "border-accent text-accent bg-accent/10",
        status === "admitted" && "border-primary text-primary bg-primary/10",
        status === "void" && "border-destructive text-destructive bg-destructive/10 line-through decoration-destructive/80",
        status === "pending" && "border-muted-foreground text-muted-foreground bg-muted/40",
        status === "vip" && "border-accent-strong text-accent-strong bg-accent-strong/15",
        className
      )}
      {...props}
    >
      {children ?? status.toUpperCase()}
    </span>
  );
}
