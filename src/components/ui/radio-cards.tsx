"use client";

import * as React from "react";
import { cn } from "./lib/utils";

/* -------------------------------------------------------------------------
 * Context & Types
 * ----------------------------------------------------------------------- */

interface RadioCardsContextValue {
  value?: string;
  name?: string;
  disabled?: boolean;
  onSelect: (val: string) => void;
  registerItem: (id: string, element: HTMLDivElement | null) => void;
}

const RadioCardsContext = React.createContext<RadioCardsContextValue | null>(null);

function useRadioCards() {
  const context = React.useContext(RadioCardsContext);
  if (!context) {
    throw new Error("RadioCard components must be used within a RadioCards provider.");
  }
  return context;
}

export interface RadioCardsProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  name?: string;
  disabled?: boolean;
  orientation?: "horizontal" | "vertical" | "grid";
  columns?: 1 | 2 | 3 | 4;
  className?: string;
  children?: React.ReactNode;
}

/* -------------------------------------------------------------------------
 * Root: RadioCards
 * ----------------------------------------------------------------------- */

export function RadioCards({
  value,
  defaultValue,
  onValueChange,
  name,
  disabled = false,
  orientation = "grid",
  columns = 3,
  className,
  children,
  ...props
}: RadioCardsProps) {
  const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue ?? "");
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : uncontrolledValue;
  const generatedName = React.useId();
  const groupName = name || generatedName;

  const itemElementsRef = React.useRef<Map<string, HTMLDivElement>>(new Map());

  const registerItem = React.useCallback((id: string, element: HTMLDivElement | null) => {
    if (element) {
      itemElementsRef.current.set(id, element);
    } else {
      itemElementsRef.current.delete(id);
    }
  }, []);

  const handleSelect = React.useCallback(
    (nextValue: string) => {
      if (disabled) return;
      if (!isControlled) {
        setUncontrolledValue(nextValue);
      }
      onValueChange?.(nextValue);
    },
    [disabled, isControlled, onValueChange]
  );

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (disabled) return;

    // Collect all non-disabled cards in DOM order
    const cardElements = Array.from(
      event.currentTarget.querySelectorAll<HTMLDivElement>('[role="radio"]:not([aria-disabled="true"])')
    );

    if (cardElements.length === 0) return;

    const currentIndex = cardElements.findIndex((el) => el === document.activeElement);
    let nextIndex = currentIndex;

    switch (event.key) {
      case "ArrowDown":
      case "ArrowRight":
        event.preventDefault();
        nextIndex = currentIndex < cardElements.length - 1 ? currentIndex + 1 : 0;
        break;
      case "ArrowUp":
      case "ArrowLeft":
        event.preventDefault();
        nextIndex = currentIndex > 0 ? currentIndex - 1 : cardElements.length - 1;
        break;
      case "Home":
        event.preventDefault();
        nextIndex = 0;
        break;
      case "End":
        event.preventDefault();
        nextIndex = cardElements.length - 1;
        break;
      case " ":
      case "Enter":
        if (currentIndex >= 0 && currentIndex < cardElements.length) {
          event.preventDefault();
          const target = cardElements[currentIndex];
          const val = target.getAttribute("data-value");
          if (val) handleSelect(val);
        }
        return;
      default:
        return;
    }

    const nextCard = cardElements[nextIndex];
    if (nextCard) {
      nextCard.focus();
      const val = nextCard.getAttribute("data-value");
      if (val) {
        handleSelect(val);
      }
    }
  };

  const orientationStyles = {
    vertical: "flex flex-col gap-4",
    horizontal: "flex flex-row flex-wrap gap-4",
    grid: cn(
      "grid gap-4",
      columns === 1 && "grid-cols-1",
      columns === 2 && "grid-cols-1 md:grid-cols-2",
      columns === 3 && "grid-cols-1 md:grid-cols-3",
      columns === 4 && "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
    ),
  };

  return (
    <RadioCardsContext.Provider
      value={{
        value: currentValue,
        name: groupName,
        disabled,
        onSelect: handleSelect,
        registerItem,
      }}
    >
      <div
        role="radiogroup"
        aria-disabled={disabled}
        onKeyDown={handleKeyDown}
        className={cn(orientationStyles[orientation], className)}
        {...props}
      >
        {children}
      </div>
    </RadioCardsContext.Provider>
  );
}

/* -------------------------------------------------------------------------
 * Item: RadioCard
 * ----------------------------------------------------------------------- */

export interface RadioCardProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  title?: string;
  subtitle?: string;
  tier?: string;
  price?: string;
  period?: string;
  badge?: string;
  badgeVariant?: "accent" | "default" | "secondary" | "destructive";
  perks?: string[];
  disabled?: boolean;
  soldOut?: boolean;
  notched?: boolean;
  serial?: string;
  className?: string;
  children?: React.ReactNode;
}

export function RadioCard({
  value,
  title,
  subtitle,
  tier,
  price,
  period = "/pass",
  badge,
  badgeVariant = "accent",
  perks,
  disabled = false,
  soldOut = false,
  notched = true,
  serial,
  className,
  children,
  ...props
}: RadioCardProps) {
  const { value: groupValue, disabled: groupDisabled, onSelect, registerItem } = useRadioCards();

  const isChecked = groupValue === value;
  const isDisabled = disabled || groupDisabled || soldOut;
  const cardRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    registerItem(value, cardRef.current);
    return () => registerItem(value, null);
  }, [value, registerItem]);

  const handleClick = () => {
    if (!isDisabled) {
      onSelect(value);
    }
  };

  const badgeVariantStyles = {
    accent: "border-accent text-accent bg-accent/10",
    default: "border-foreground text-foreground bg-foreground/10",
    secondary: "border-border text-muted-foreground bg-secondary",
    destructive: "border-destructive text-destructive bg-destructive/10",
  };

  return (
    <div
      ref={cardRef}
      role="radio"
      aria-checked={isChecked}
      aria-disabled={isDisabled}
      tabIndex={isDisabled ? -1 : isChecked ? 0 : -1}
      data-value={value}
      onClick={handleClick}
      className={cn(
        // Base ticket frame geometry
        "relative flex flex-col justify-between rounded-lg border-2 p-5 text-left transition-all duration-200 select-none outline-none",
        "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        // Interactive state
        isDisabled
          ? "cursor-not-allowed opacity-55 border-dashed border-border bg-card/40"
          : "cursor-pointer hover:-translate-y-0.5",
        // Selection state
        !isDisabled && isChecked
          ? "border-solid border-foreground bg-card shadow-md scale-[1.01]"
          : !isDisabled && "border-dashed border-border bg-card/70 hover:border-foreground/60 hover:bg-card",
        className
      )}
      {...props}
    >
      {/* Inner Decorative Framing */}
      <div className="pointer-events-none absolute inset-1.5 rounded-[4px] border border-dashed border-border/40" />

      {/* Ticket Semicircular Punch Notches */}
      {notched && (
        <>
          <div
            aria-hidden="true"
            className="absolute -left-2 top-1/2 -translate-y-1/2 size-3.5 rounded-full border-2 border-foreground bg-background z-10"
          />
          <div
            aria-hidden="true"
            className="absolute -right-2 top-1/2 -translate-y-1/2 size-3.5 rounded-full border-2 border-foreground bg-background z-10"
          />
        </>
      )}

      {/* Sold Out Stamp Overlay */}
      {soldOut && (
        <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center">
          <span className="rotate-[-12deg] rounded border-2 border-destructive bg-background/95 px-3 py-1 font-mono text-xs font-black tracking-[0.25em] text-destructive shadow-sm animate-[stamp_0.3s_ease-out_both]">
            SOLD OUT
          </span>
        </div>
      )}

      {/* Card Header Section */}
      <div>
        <div className="flex items-start justify-between gap-2">
          {/* Tier Label or Serial */}
          <div className="flex flex-col">
            {tier && (
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-accent">
                {tier}
              </span>
            )}
            {serial && (
              <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
                {serial}
              </span>
            )}
          </div>

          {/* Stamped Badge & Custom Radio Indicator */}
          <div className="flex items-center gap-2">
            {badge && (
              <span
                className={cn(
                  "rotate-[-2deg] rounded-xs border px-1.5 py-0.5 font-mono text-[9px] font-extrabold uppercase tracking-widest",
                  badgeVariantStyles[badgeVariant]
                )}
              >
                {badge}
              </span>
            )}

            {/* Custom Ticket Stub Radio Button */}
            <div
              aria-hidden="true"
              className={cn(
                "flex size-5 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-200",
                isChecked
                  ? "border-foreground bg-accent text-accent-foreground shadow-xs scale-105"
                  : "border-dashed border-muted-foreground/60 bg-transparent hover:border-foreground"
              )}
            >
              {isChecked && (
                <div className="size-2 rounded-full bg-accent-foreground animate-[scale-in_0.15s_ease-out]" />
              )}
            </div>
          </div>
        </div>

        {/* Title and Subtitle */}
        {title && (
          <h3 className="mt-3 font-mono text-base font-bold uppercase tracking-wide text-foreground">
            {title}
          </h3>
        )}
        {subtitle && (
          <p className="mt-0.5 text-xs text-muted-foreground leading-relaxed">
            {subtitle}
          </p>
        )}

        {/* Ticket Price Readout */}
        {price && (
          <div className="mt-4 flex items-baseline gap-1.5 border-b border-dashed border-border pb-4">
            <span className="font-mono text-3xl font-black tracking-tight text-foreground">
              {price}
            </span>
            {period && (
              <span className="font-mono text-xs text-muted-foreground font-medium">
                {period}
              </span>
            )}
          </div>
        )}

        {/* Perks Checklist */}
        {perks && perks.length > 0 && (
          <ul className="mt-4 space-y-2">
            {perks.map((perk, idx) => (
              <li key={idx} className="flex items-start gap-2 font-mono text-xs text-foreground/80">
                <svg
                  aria-hidden="true"
                  className={cn(
                    "mt-0.5 size-3.5 shrink-0 transition-colors",
                    isChecked ? "text-accent" : "text-muted-foreground/60"
                  )}
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3.5 8.5l3 3 6.5-6.5" />
                </svg>
                <span>{perk}</span>
              </li>
            ))}
          </ul>
        )}

        {/* Custom Children Container */}
        {children && <div className="mt-3">{children}</div>}
      </div>

      {/* Bottom Perforation Footnote */}
      <div className="mt-5 flex items-center justify-between pt-3 border-t border-dashed border-border/60 text-[9px] font-mono text-muted-foreground uppercase tracking-widest">
        <span>STATUS: {soldOut ? "UNAVAILABLE" : isChecked ? "SELECTED" : "AVAILABLE"}</span>
        <span>ADMIT TIER</span>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------
 * Subcomponents for custom layout flexibility
 * ----------------------------------------------------------------------- */

export interface RadioCardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children?: React.ReactNode;
}

export function RadioCardHeader({ className, children, ...props }: RadioCardHeaderProps) {
  return (
    <div className={cn("flex flex-col space-y-1", className)} {...props}>
      {children}
    </div>
  );
}

export interface RadioCardPriceProps extends React.HTMLAttributes<HTMLDivElement> {
  price: string;
  period?: string;
  className?: string;
}

export function RadioCardPrice({ price, period = "/pass", className, ...props }: RadioCardPriceProps) {
  return (
    <div className={cn("mt-4 flex items-baseline gap-1 border-b border-dashed border-border pb-3", className)} {...props}>
      <span className="font-mono text-3xl font-black tracking-tight text-foreground">{price}</span>
      {period && <span className="font-mono text-xs text-muted-foreground font-medium">{period}</span>}
    </div>
  );
}

export interface RadioCardPerksProps extends React.HTMLAttributes<HTMLUListElement> {
  perks: string[];
  className?: string;
}

export function RadioCardPerks({ perks, className, ...props }: RadioCardPerksProps) {
  return (
    <ul className={cn("mt-4 space-y-2", className)} {...props}>
      {perks.map((perk, index) => (
        <li key={index} className="flex items-start gap-2 font-mono text-xs text-foreground/80">
          <svg
            aria-hidden="true"
            className="mt-0.5 size-3.5 shrink-0 text-accent"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3.5 8.5l3 3 6.5-6.5" />
          </svg>
          <span>{perk}</span>
        </li>
      ))}
    </ul>
  );
}
