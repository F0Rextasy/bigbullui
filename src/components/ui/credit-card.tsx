"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export type CardBrand =
  | "visa"
  | "mastercard"
  | "amex"
  | "discover"
  | "jcb"
  | "diners"
  | "generic";

export type CardVariant = "default" | "night" | "accent" | "gold" | "minimal";
export type CardSize = "sm" | "md" | "lg";

export interface CreditCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 15-19 digit card number, raw or formatted */
  cardNumber?: string;
  /** Cardholder name */
  cardHolder?: string;
  /** Expiry date string, e.g. "12/28" or "1228" */
  expiry?: string;
  /** 3 or 4 digit CVV/CVC security code */
  cvv?: string;
  /** Card brand override. Defaults to auto-detection from cardNumber */
  brand?: CardBrand | "auto";
  /** Controlled flip state (true shows the back of the card) */
  flipped?: boolean;
  /** Default flip state if uncontrolled */
  defaultFlipped?: boolean;
  /** Callback triggered when card flip state changes */
  onFlipChange?: (flipped: boolean) => void;
  /** Enables clicking or keyboard space/enter to flip card */
  interactive?: boolean;
  /** Visual style theme variant */
  variant?: CardVariant;
  /** Dimension scale of the card */
  size?: CardSize;
  /** Mask middle digits of the card number */
  maskNumber?: boolean;
  /** Bank / Issuer name printed on card */
  issuer?: string;
  /** Custom ticket stub tier label, e.g. "VIP PASS" */
  tier?: string;
  /** Show the metallic EMV chip graphic */
  showChip?: boolean;
  /** Show the contactless symbol */
  showContactless?: boolean;
  /** Custom class names */
  className?: string;
}

/**
 * Detect card brand from card number prefix.
 */
export function detectCardBrand(cardNumber: string): CardBrand {
  const clean = cardNumber.replace(/\D/g, "");
  if (/^4/.test(clean)) return "visa";
  if (/^(5[1-5]|2[2-7])/.test(clean)) return "mastercard";
  if (/^3[47]/.test(clean)) return "amex";
  if (/^(6011|65|64[4-9]|622)/.test(clean)) return "discover";
  if (/^35(2[89]|[3-8][0-9])/.test(clean)) return "jcb";
  if (/^(30[0-5]|36|38)/.test(clean)) return "diners";
  return "generic";
}

/**
 * Format raw card number with standard spacing by brand.
 */
export function formatCardNumber(cardNumber: string, brand?: CardBrand): string {
  const clean = cardNumber.replace(/\D/g, "");
  const targetBrand = brand && brand !== "generic" ? brand : detectCardBrand(clean);

  if (targetBrand === "amex") {
    // 4 - 6 - 5 format (15 digits)
    const p1 = clean.slice(0, 4);
    const p2 = clean.slice(4, 10);
    const p3 = clean.slice(10, 15);
    return [p1, p2, p3].filter(Boolean).join(" ");
  }

  if (targetBrand === "diners") {
    // 4 - 6 - 4 format (14 digits)
    const p1 = clean.slice(0, 4);
    const p2 = clean.slice(4, 10);
    const p3 = clean.slice(10, 14);
    return [p1, p2, p3].filter(Boolean).join(" ");
  }

  // Standard 4 - 4 - 4 - 4 format (up to 19 digits)
  const matches = clean.match(/.{1,4}/g);
  return matches ? matches.join(" ") : clean;
}

/**
 * Format expiry input into MM/YY format.
 */
export function formatExpiry(expiry: string): string {
  const clean = expiry.replace(/\D/g, "");
  if (clean.length >= 2) {
    return `${clean.slice(0, 2)}/${clean.slice(2, 4)}`;
  }
  return clean;
}

/**
 * Mask middle numbers while displaying first 4 and last 4 digits.
 */
export function maskCardNumber(formattedNumber: string, brand?: CardBrand): string {
  const clean = formattedNumber.replace(/\D/g, "");
  if (clean.length < 8) return formattedNumber;

  const targetBrand = brand && brand !== "generic" ? brand : detectCardBrand(clean);
  if (targetBrand === "amex") {
    const first4 = clean.slice(0, 4);
    const last5 = clean.slice(clean.length - 5);
    return `${first4} •••••• ${last5}`;
  }

  const first4 = clean.slice(0, 4);
  const last4 = clean.slice(clean.length - 4);
  return `${first4} •••• •••• ${last4}`;
}

const sizeClasses: Record<CardSize, string> = {
  sm: "w-[300px] h-[190px] text-xs",
  md: "w-[360px] h-[225px] text-sm",
  lg: "w-[420px] h-[265px] text-base",
};

const variantFaceClasses: Record<CardVariant, string> = {
  default: "bg-card text-foreground border-foreground",
  night: "bg-primary text-primary-foreground border-primary-foreground/30",
  accent: "bg-accent text-accent-foreground border-foreground",
  gold: "bg-secondary text-secondary-foreground border-foreground",
  minimal: "bg-background text-foreground border-foreground/50",
};

export function CreditCard({
  cardNumber = "",
  cardHolder = "",
  expiry = "",
  cvv = "",
  brand = "auto",
  flipped,
  defaultFlipped = false,
  onFlipChange,
  interactive = true,
  variant = "default",
  size = "md",
  maskNumber = false,
  issuer = "BIGBULL BANK",
  tier = "ADMISSION PASS",
  showChip = true,
  showContactless = true,
  className,
  ...props
}: CreditCardProps) {
  const [internalFlipped, setInternalFlipped] = React.useState(defaultFlipped);
  const isFlipped = flipped !== undefined ? flipped : internalFlipped;

  const detectedBrand: CardBrand =
    brand === "auto" || !brand ? detectCardBrand(cardNumber) : brand;

  const formattedNumber = formatCardNumber(cardNumber, detectedBrand);
  const displayExpiry = formatExpiry(expiry);
  const displayName = cardHolder.trim() || "TICKET HOLDER";
  const displayCvv = cvv.trim() || "•••";

  const toggleFlip = (event?: React.MouseEvent | React.KeyboardEvent) => {
    if (!interactive) return;
    event?.stopPropagation();
    const next = !isFlipped;
    if (flipped === undefined) {
      setInternalFlipped(next);
    }
    onFlipChange?.(next);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (!interactive) return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggleFlip(event);
    }
  };

  // Render formatted digits with placeholder dots for unentered numbers
  const renderCardDigits = () => {
    if (maskNumber && formattedNumber) {
      return <span>{maskCardNumber(formattedNumber, detectedBrand)}</span>;
    }

    if (!formattedNumber) {
      return (
        <span className="opacity-40 tracking-[0.2em] font-mono">
          •••• •••• •••• ••••
        </span>
      );
    }

    // Append ghost dots if number is in progress
    const cleanDigits = cardNumber.replace(/\D/g, "");
    const maxLen = detectedBrand === "amex" ? 15 : 16;
    if (cleanDigits.length < maxLen) {
      const remaining = maxLen - cleanDigits.length;
      const ghostDots = "•".repeat(remaining);
      const fullGhost = formatCardNumber(cleanDigits + ghostDots, detectedBrand);
      const enteredPart = fullGhost.slice(0, formattedNumber.length);
      const ghostPart = fullGhost.slice(formattedNumber.length);

      return (
        <span className="font-mono tracking-[0.18em]">
          <span>{enteredPart}</span>
          <span className="opacity-35 select-none">{ghostPart}</span>
        </span>
      );
    }

    return <span className="font-mono tracking-[0.18em]">{formattedNumber}</span>;
  };

  return (
    <div
      className={cn(
        "relative select-none [perspective:1000px] max-w-full",
        sizeClasses[size],
        className
      )}
      {...props}
    >
      <div
        role={interactive ? "button" : "region"}
        tabIndex={interactive ? 0 : undefined}
        aria-label={
          interactive
            ? `Payment card: click to flip to ${isFlipped ? "front" : "back"}`
            : "Payment card"
        }
        aria-roledescription="credit card"
        aria-pressed={interactive ? isFlipped : undefined}
        onClick={interactive ? toggleFlip : undefined}
        onKeyDown={interactive ? handleKeyDown : undefined}
        className={cn(
          "relative h-full w-full rounded-xl transition-transform duration-500 ease-out [transform-style:preserve-3d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none",
          isFlipped && "[transform:rotateY(180deg)]",
          interactive ? "cursor-pointer" : "cursor-default"
        )}
      >
        {/* =========================================================================
            FRONT FACE
           ========================================================================= */}
        <div
          className={cn(
            "absolute inset-0 h-full w-full rounded-xl border-2 p-4 sm:p-5 shadow-md [backface-visibility:hidden] flex flex-col justify-between overflow-hidden",
            variantFaceClasses[variant]
          )}
        >
          {/* Ticket Punch Notches on Left & Right */}
          <div
            className="absolute -left-2.5 top-1/2 -translate-y-1/2 size-5 rounded-full border-2 border-foreground bg-background z-20 pointer-events-none"
            aria-hidden="true"
          />
          <div
            className="absolute -right-2.5 top-1/2 -translate-y-1/2 size-5 rounded-full border-2 border-foreground bg-background z-20 pointer-events-none"
            aria-hidden="true"
          />

          {/* Inner Ticket Dashed Frame */}
          <div
            className="pointer-events-none absolute inset-1.5 rounded-lg border border-dashed border-current opacity-30"
            aria-hidden="true"
          />

          {/* Top Bar: Issuer & Interactive Flip Badge */}
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] sm:text-xs font-black uppercase tracking-[0.2em]">
                {issuer}
              </span>
              <span className="hidden sm:inline-block rounded-xs border border-dashed border-current/40 px-1 py-0.2 font-mono text-[8px] uppercase tracking-wider opacity-75">
                {tier}
              </span>
            </div>

            {interactive && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFlip(e);
                }}
                className="group flex items-center gap-1 rounded-xs border border-dashed border-current/50 bg-secondary/30 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider opacity-85 hover:opacity-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring cursor-pointer"
                aria-label="Flip card to CVV back"
              >
                <span>FLIP</span>
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-transform group-hover:rotate-180"
                  aria-hidden="true"
                >
                  <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
                </svg>
              </button>
            )}
          </div>

          {/* Middle Row: Metallic EMV Chip + Contactless Symbol + Brand Badge */}
          <div className="relative z-10 flex items-center justify-between pt-1">
            <div className="flex items-center gap-2.5">
              {showChip && (
                <div
                  className="relative size-9 sm:size-10 rounded-md border border-current/60 bg-secondary/80 p-0.5 shadow-xs overflow-hidden"
                  aria-label="EMV Smart Chip"
                >
                  {/* Metallic circuit trace lines */}
                  <svg
                    width="100%"
                    height="100%"
                    viewBox="0 0 40 32"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    className="text-foreground/80 dark:text-foreground/70"
                    aria-hidden="true"
                  >
                    <rect
                      x="1"
                      y="1"
                      width="38"
                      height="30"
                      rx="3"
                      fill="currentColor"
                      fillOpacity="0.1"
                      strokeWidth="1.5"
                    />
                    <path d="M1 10.5h12v11H1" />
                    <path d="M39 10.5h-12v11H39" />
                    <path d="M20 1v9.5" />
                    <path d="M20 21.5V31" />
                    <path d="M13 16h14" />
                    <rect
                      x="16"
                      y="12"
                      width="8"
                      height="8"
                      rx="1"
                      fill="currentColor"
                      fillOpacity="0.25"
                    />
                  </svg>
                </div>
              )}

              {showContactless && (
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  className="text-current opacity-70"
                  aria-label="Contactless"
                >
                  <path d="M8.5 6a10.5 10.5 0 0 1 0 12" />
                  <path d="M12 8.5a6.5 6.5 0 0 1 0 7" />
                  <path d="M15.5 11a2.5 2.5 0 0 1 0 2" />
                </svg>
              )}
            </div>

            {/* Brand Badge */}
            <BrandBadge brand={detectedBrand} />
          </div>

          {/* Card Number Section */}
          <div className="relative z-10 my-auto py-1">
            <span className="block font-mono text-[8px] sm:text-[9px] uppercase tracking-widest opacity-65">
              CARD NUMBER
            </span>
            <div className="font-mono text-base sm:text-lg md:text-xl font-bold tracking-[0.18em] truncate mt-0.5">
              {renderCardDigits()}
            </div>
          </div>

          {/* Bottom Row: Cardholder & Expiry */}
          <div className="relative z-10 flex items-end justify-between border-t border-dashed border-current/25 pt-2">
            <div className="max-w-[65%]">
              <span className="block font-mono text-[8px] sm:text-[9px] uppercase tracking-widest opacity-65">
                CARDHOLDER
              </span>
              <span className="block font-mono text-xs sm:text-sm font-semibold uppercase tracking-wider truncate">
                {displayName}
              </span>
            </div>

            <div className="text-right">
              <span className="block font-mono text-[8px] sm:text-[9px] uppercase tracking-widest opacity-65">
                EXPIRES
              </span>
              <span className="block font-mono text-xs sm:text-sm font-semibold tracking-wider">
                {displayExpiry || "MM/YY"}
              </span>
            </div>
          </div>
        </div>

        {/* =========================================================================
            BACK FACE (CVV / Magnetic Stripe / Signature Strip)
           ========================================================================= */}
        <div
          className={cn(
            "absolute inset-0 h-full w-full rounded-xl border-2 shadow-md [backface-visibility:hidden] [transform:rotateY(180deg)] flex flex-col justify-between overflow-hidden",
            variantFaceClasses[variant]
          )}
        >
          {/* Ticket Punch Notches on Left & Right */}
          <div
            className="absolute -left-2.5 top-1/2 -translate-y-1/2 size-5 rounded-full border-2 border-foreground bg-background z-20 pointer-events-none"
            aria-hidden="true"
          />
          <div
            className="absolute -right-2.5 top-1/2 -translate-y-1/2 size-5 rounded-full border-2 border-foreground bg-background z-20 pointer-events-none"
            aria-hidden="true"
          />

          {/* Inner Ticket Dashed Frame */}
          <div
            className="pointer-events-none absolute inset-1.5 rounded-lg border border-dashed border-current opacity-25"
            aria-hidden="true"
          />

          {/* Top: Magnetic Stripe */}
          <div className="relative z-10 mt-3 sm:mt-4 h-9 sm:h-11 w-full bg-foreground/90 border-y border-foreground flex items-center px-4">
            <div className="h-0.5 w-full border-t border-dashed border-background/30" />
          </div>

          {/* Middle: Signature Panel & CVV Box */}
          <div className="relative z-10 px-4 sm:px-6">
            <div className="flex items-center justify-between pb-1">
              <span className="font-mono text-[8px] sm:text-[9px] uppercase tracking-widest opacity-70">
                AUTHORIZED SIGNATURE
              </span>
              <span className="font-mono text-[8px] sm:text-[9px] uppercase tracking-widest opacity-70">
                SECURITY CODE (CVV)
              </span>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              {/* Signature Strip */}
              <div className="relative flex-1 h-8 sm:h-9 rounded-xs border border-foreground/30 bg-muted/90 flex items-center px-3 overflow-hidden">
                {/* Security background hatch dots */}
                <div
                  className="absolute inset-0 opacity-15 bg-[radial-gradient(circle_at_center,_var(--color-foreground)_1px,_transparent_1px)] [background-size:6px_6px]"
                  aria-hidden="true"
                />
                <span className="relative z-10 font-mono text-[10px] sm:text-xs italic tracking-widest text-foreground/80 truncate">
                  {displayName}
                </span>
              </div>

              {/* CVV Box */}
              <div
                className="rounded-xs border-2 border-foreground bg-card px-2.5 sm:px-3 py-1 text-center shrink-0 min-w-[50px] sm:min-w-[60px]"
                aria-label={`CVV ${displayCvv}`}
              >
                <span className="font-mono text-xs sm:text-sm font-black tracking-widest text-foreground">
                  {displayCvv}
                </span>
              </div>
            </div>
          </div>

          {/* Bottom: Hologram Seal & Return Trigger */}
          <div className="relative z-10 flex items-center justify-between px-4 sm:px-6 pb-3 sm:pb-4 border-t border-dashed border-current/25 pt-2">
            {/* Hologram / Security Stamp Seal */}
            <div className="flex items-center gap-2">
              <div className="size-7 rounded-full border border-dashed border-current/60 bg-secondary/40 flex items-center justify-center">
                <span className="text-[10px] font-bold text-accent">★</span>
              </div>
              <div className="flex flex-col">
                <span className="font-mono text-[7px] sm:text-[8px] font-bold uppercase tracking-widest">
                  BIGBULL SECURE
                </span>
                <span className="font-mono text-[6px] sm:text-[7px] uppercase tracking-wider opacity-60">
                  VERIFIED FINTECH STUB
                </span>
              </div>
            </div>

            {/* Brand Mini Mark & Flip Back Trigger */}
            <div className="flex items-center gap-2">
              <BrandBadge brand={detectedBrand} mini />
              {interactive && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFlip(e);
                  }}
                  className="rounded-xs border border-dashed border-current/50 bg-secondary/30 px-1.5 py-0.5 font-mono text-[8px] sm:text-[9px] uppercase tracking-wider opacity-85 hover:opacity-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring cursor-pointer"
                  aria-label="Flip card to front"
                >
                  FRONT ⟲
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Brand badge graphic renderer (Visa, Mastercard, Amex, Discover, JCB, Diners, Generic).
 */
function BrandBadge({ brand, mini = false }: { brand: CardBrand; mini?: boolean }) {
  if (brand === "visa") {
    return (
      <div
        className={cn(
          "rounded-xs border border-current/30 bg-secondary/30 px-1.5 py-0.5 flex items-center",
          mini && "px-1 py-0.2"
        )}
      >
        <span
          className={cn(
            "font-mono font-black italic tracking-tighter text-foreground",
            mini ? "text-[10px]" : "text-xs sm:text-sm"
          )}
        >
          VISA
        </span>
      </div>
    );
  }

  if (brand === "mastercard") {
    return (
      <div
        className={cn(
          "flex items-center rounded-xs border border-current/30 bg-secondary/30 px-1.5 py-0.5 gap-1",
          mini && "px-1 py-0.2"
        )}
        aria-label="Mastercard"
      >
        <div className="flex items-center">
          <div className="size-3.5 sm:size-4 rounded-full bg-accent" />
          <div className="-ml-2 size-3.5 sm:size-4 rounded-full bg-muted-foreground/60" />
        </div>
        {!mini && (
          <span className="hidden sm:inline font-mono text-[9px] font-black tracking-tight text-foreground">
            MC
          </span>
        )}
      </div>
    );
  }

  if (brand === "amex") {
    return (
      <div
        className={cn(
          "rounded-xs border border-current/40 bg-foreground/10 px-1.5 py-0.5 font-mono font-black uppercase tracking-wider text-foreground",
          mini ? "text-[8px]" : "text-[10px] sm:text-xs"
        )}
      >
        AMEX
      </div>
    );
  }

  if (brand === "discover") {
    return (
      <div
        className={cn(
          "flex items-center gap-0.5 rounded-xs border border-current/30 bg-secondary/30 px-1.5 py-0.5 font-mono font-extrabold uppercase tracking-tight text-foreground",
          mini ? "text-[8px]" : "text-[9px] sm:text-[10px]"
        )}
      >
        <span>DISC</span>
        <span className="inline-block size-1.5 rounded-full bg-accent" />
        <span>VER</span>
      </div>
    );
  }

  if (brand === "jcb") {
    return (
      <div
        className={cn(
          "rounded-xs border border-current/40 bg-foreground/10 px-1.5 py-0.5 font-mono font-extrabold tracking-widest text-foreground",
          mini ? "text-[8px]" : "text-[9px] sm:text-[10px]"
        )}
      >
        JCB
      </div>
    );
  }

  if (brand === "diners") {
    return (
      <div
        className={cn(
          "rounded-xs border border-current/40 bg-secondary/30 px-1.5 py-0.5 font-mono font-extrabold tracking-wider text-foreground",
          mini ? "text-[8px]" : "text-[9px] sm:text-[10px]"
        )}
      >
        DINERS
      </div>
    );
  }

  // Generic Ticket Stub Bank Mark
  return (
    <div
      className={cn(
        "flex items-center gap-1 rounded-xs border border-dashed border-current/40 bg-secondary/50 px-1.5 py-0.5 font-mono font-bold uppercase tracking-wider text-foreground",
        mini ? "text-[8px]" : "text-[9px] sm:text-[10px]"
      )}
    >
      <span>STUB</span>
      <span className="text-accent text-[9px]">★</span>
    </div>
  );
}
