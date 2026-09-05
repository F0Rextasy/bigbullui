"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export type BillingCycle = "monthly" | "annual";

export interface PricingFeature {
  text: string;
  included?: boolean;
  hint?: string;
  isNew?: boolean;
}

export interface PricingTier {
  id: string;
  name: string;
  subtitle?: string;
  badge?: string;
  monthlyPrice: number | string;
  annualPrice: number | string;
  currency?: string;
  priceInterval?: string;
  annualBillingNote?: string;
  popular?: boolean;
  popularLabel?: string;
  serial?: string;
  features: (string | PricingFeature)[];
  cta: {
    label: string;
    href?: string;
    onClick?: () => void;
    variant?: "accent" | "primary" | "outline";
    disabled?: boolean;
  };
  footerText?: string;
}

export interface PricingTableProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  subtitle?: string;
  badge?: string;
  tiers?: PricingTier[];
  billingCycle?: BillingCycle;
  defaultBillingCycle?: BillingCycle;
  onBillingCycleChange?: (cycle: BillingCycle) => void;
  annualDiscountBadge?: string;
  currencySymbol?: string;
  className?: string;
}

const DEFAULT_TIERS: PricingTier[] = [
  {
    id: "starter",
    name: "STARTER PASS",
    subtitle: "Essential admission for solo creators & prototype projects.",
    serial: "TCK-ST-001",
    monthlyPrice: 19,
    annualPrice: 15,
    features: [
      { text: "1 Admin seat & unlimited viewers", included: true },
      { text: "10,000 monthly API ticket verifications", included: true },
      { text: "Standard SVG barcode & QR generator", included: true },
      { text: "Community Discord & email support", included: true },
      { text: "Custom ticket stub branding & watermark removal", included: false },
      { text: "Dedicated turnstile webhook pipelines", included: false },
    ],
    cta: {
      label: "CLAIM STARTER PASS",
      variant: "outline",
    },
    footerText: "No credit card required · 14-day trial",
  },
  {
    id: "pro",
    name: "PRO ALL-ACCESS",
    subtitle: "High-throughput access for fast scaling products & engineering teams.",
    badge: "BEST VALUE",
    popular: true,
    popularLabel: "★ RECOMMENDED STUB",
    serial: "TCK-PR-042",
    monthlyPrice: 49,
    annualPrice: 39,
    features: [
      { text: "Up to 5 team seats with RBAC roles", included: true },
      { text: "250,000 monthly API ticket verifications", included: true },
      { text: "Custom stub branding & thermal print CSS", included: true },
      { text: "Priority turnstile webhook delivery (99.9% SLA)", included: true, isNew: true },
      { text: "Real-time admissions telemetry dashboard", included: true },
      { text: "Audit log retention (90 days)", included: true },
    ],
    cta: {
      label: "GET ALL-ACCESS PASS",
      variant: "accent",
    },
    footerText: "Instant automated provisioning",
  },
  {
    id: "enterprise",
    name: "VIP ENTERPRISE",
    subtitle: "Bespoke box office infrastructure, custom SLAs, and dedicated security.",
    badge: "UNLIMITED",
    serial: "TCK-EN-999",
    monthlyPrice: 149,
    annualPrice: 119,
    features: [
      { text: "Unlimited team seats & single sign-on (SSO)", included: true },
      { text: "Millions of API admissions with custom rate limits", included: true },
      { text: "Custom thermal printer hardware bridges", included: true },
      { text: "Dedicated 24/7 box office engineer & SLA", included: true },
      { text: "SOC2 Type II & HIPAA compliance docs", included: true },
      { text: "Custom invoicing & purchase orders", included: true },
    ],
    cta: {
      label: "CONTACT BOX OFFICE",
      variant: "primary",
    },
    footerText: "Billed annually or wire transfer",
  },
];

export function PricingTable({
  title = "ADMISSION TIERS",
  subtitle = "Choose your admission pass level. Upgrade or cancel anytime.",
  badge = "BOX OFFICE TARIFFS",
  tiers = DEFAULT_TIERS,
  billingCycle: controlledCycle,
  defaultBillingCycle = "annual",
  onBillingCycleChange,
  annualDiscountBadge = "SAVE 20%",
  currencySymbol = "$",
  className,
  ...props
}: PricingTableProps) {
  const [internalCycle, setInternalCycle] = React.useState<BillingCycle>(defaultBillingCycle);
  const cycle = controlledCycle ?? internalCycle;

  const handleCycleChange = (nextCycle: BillingCycle) => {
    if (controlledCycle === undefined) {
      setInternalCycle(nextCycle);
    }
    onBillingCycleChange?.(nextCycle);
  };

  return (
    <div className={cn("w-full space-y-10", className)} {...props}>
      {/* Header & Billing Cycle Controls */}
      <div className="flex flex-col items-center text-center space-y-4">
        {badge && (
          <div className="inline-flex items-center gap-1.5 rounded-sm border-2 border-dashed border-accent/60 bg-accent/10 px-3 py-0.5 font-mono text-[11px] font-bold uppercase tracking-widest text-accent">
            <span className="inline-block size-1.5 rounded-full bg-accent animate-ping" />
            {badge}
          </div>
        )}

        {title && (
          <h2 className="font-mono text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            {title}
          </h2>
        )}

        {subtitle && (
          <p className="max-w-xl text-sm text-muted-foreground font-mono">
            {subtitle}
          </p>
        )}

        {/* Turnstile Billing Switcher */}
        <div className="pt-2">
          <div
            role="radiogroup"
            aria-label="Billing frequency selection"
            className="relative inline-flex items-center rounded-lg border-2 border-foreground bg-card p-1 shadow-sm"
          >
            <button
              type="button"
              role="radio"
              aria-checked={cycle === "monthly"}
              onClick={() => handleCycleChange("monthly")}
              className={cn(
                "relative rounded-md px-4 py-1.5 font-mono text-xs font-bold uppercase tracking-wider transition-all duration-150 cursor-pointer select-none",
                cycle === "monthly"
                  ? "bg-foreground text-background shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
              )}
            >
              MONTHLY PASS
            </button>

            <button
              type="button"
              role="radio"
              aria-checked={cycle === "annual"}
              onClick={() => handleCycleChange("annual")}
              className={cn(
                "relative flex items-center gap-2 rounded-md px-4 py-1.5 font-mono text-xs font-bold uppercase tracking-wider transition-all duration-150 cursor-pointer select-none",
                cycle === "annual"
                  ? "bg-foreground text-background shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
              )}
            >
              <span>ANNUAL PASS</span>
              {annualDiscountBadge && (
                <span
                  className={cn(
                    "inline-block rotate-[-2deg] rounded-sm border border-dashed px-1.5 py-0.2 text-[9px] font-black uppercase tracking-tight",
                    cycle === "annual"
                      ? "border-accent bg-accent text-accent-foreground"
                      : "border-accent text-accent bg-accent/15"
                  )}
                >
                  {annualDiscountBadge}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* 3-Tier Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8 items-stretch pt-2">
        {tiers.map((tier) => {
          const isPopular = Boolean(tier.popular);
          const price = cycle === "annual" ? tier.annualPrice : tier.monthlyPrice;
          const interval = tier.priceInterval ?? "/mo";

          return (
            <div
              key={tier.id}
              className={cn(
                "relative flex flex-col rounded-xl border-2 bg-card transition-all duration-300 overflow-hidden select-none",
                isPopular
                  ? "border-accent shadow-xl ring-2 ring-accent/20 lg:-translate-y-2"
                  : "border-foreground shadow-sm hover:shadow-md hover:-translate-y-1"
              )}
            >
              {/* Popular Stamp Seal Badge */}
              {isPopular && (
                <div className="absolute -top-3 right-6 z-20 rotate-[-4deg] rounded border-2 border-dashed border-accent bg-accent px-3 py-0.5 font-mono text-[10px] font-black uppercase tracking-widest text-accent-foreground shadow-md">
                  {tier.popularLabel || "RECOMMENDED"}
                </div>
              )}

              {/* Top Ticket Header Section */}
              <div className="p-6 pb-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                    {tier.serial || `TCK-${tier.id.toUpperCase()}`}
                  </span>
                  {tier.badge && !isPopular && (
                    <span className="font-mono text-[9px] font-extrabold uppercase tracking-wider rounded border border-dashed border-border px-2 py-0.5 text-muted-foreground bg-secondary/50">
                      {tier.badge}
                    </span>
                  )}
                </div>

                <h3 className="mt-3 font-mono text-xl font-black uppercase tracking-tight text-foreground">
                  {tier.name}
                </h3>

                {tier.subtitle && (
                  <p className="mt-1 text-xs text-muted-foreground font-mono min-h-[32px] leading-relaxed">
                    {tier.subtitle}
                  </p>
                )}

                {/* Price Display */}
                <div className="mt-5 flex items-baseline gap-1.5 border-t-2 border-dashed border-border/80 pt-4">
                  {typeof price === "number" && (
                    <span className="font-mono text-2xl font-bold text-muted-foreground">
                      {currencySymbol}
                    </span>
                  )}
                  <span className="font-mono text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground">
                    {price}
                  </span>
                  <span className="font-mono text-xs font-semibold text-muted-foreground">
                    {interval}
                  </span>
                </div>

                {/* Annual Savings Readout */}
                <div className="mt-1 h-5 text-[11px] font-mono text-muted-foreground">
                  {cycle === "annual" ? (
                    tier.annualBillingNote ? (
                      <span>{tier.annualBillingNote}</span>
                    ) : typeof tier.monthlyPrice === "number" && typeof tier.annualPrice === "number" ? (
                      <span className="text-accent font-semibold">
                        Billed annually (Save {currencySymbol}{(tier.monthlyPrice - tier.annualPrice) * 12}/yr)
                      </span>
                    ) : (
                      <span>Billed annually</span>
                    )
                  ) : (
                    <span>Billed on a monthly cycle</span>
                  )}
                </div>
              </div>

              {/* Perforation Divider with Punch Notches */}
              <div className="relative flex items-center justify-between py-1">
                {/* Left Cutout Notch */}
                <div
                  className={cn(
                    "size-5 rounded-full bg-background border-2 -ml-2.5 shrink-0 transition-colors",
                    isPopular ? "border-accent" : "border-foreground"
                  )}
                  aria-hidden="true"
                />

                {/* Dashed Tear Line */}
                <div className="h-0 flex-1 border-t-2 border-dashed border-border" />

                {/* Right Cutout Notch */}
                <div
                  className={cn(
                    "size-5 rounded-full bg-background border-2 -mr-2.5 shrink-0 transition-colors",
                    isPopular ? "border-accent" : "border-foreground"
                  )}
                  aria-hidden="true"
                />
              </div>

              {/* Bottom Features & CTA Section */}
              <div className="flex flex-1 flex-col justify-between p-6 pt-3 bg-card">
                <div>
                  <div className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground mb-3 flex items-center gap-2">
                    <span>INCLUDED ADMISSIONS</span>
                    <span className="flex-1 border-t border-dashed border-border/70" />
                  </div>

                  <ul className="space-y-2.5" role="list">
                    {tier.features.map((feature, idx) => {
                      const featObj: PricingFeature =
                        typeof feature === "string"
                          ? { text: feature, included: true }
                          : feature;
                      const included = featObj.included !== false;

                      return (
                        <li key={idx} className="flex items-start gap-2.5 text-xs font-mono">
                          {included ? (
                            <svg
                              className="mt-0.5 size-4 shrink-0 text-accent"
                              viewBox="0 0 16 16"
                              fill="currentColor"
                              aria-hidden="true"
                            >
                              <path
                                fillRule="evenodd"
                                d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.739a.75.75 0 0 1 1.04-.208Z"
                                clipRule="evenodd"
                              />
                            </svg>
                          ) : (
                            <svg
                              className="mt-0.5 size-4 shrink-0 text-muted-foreground/30"
                              viewBox="0 0 16 16"
                              fill="currentColor"
                              aria-hidden="true"
                            >
                              <path d="M3.75 7.25h8.5a.75.75 0 0 1 0 1.5h-8.5a.75.75 0 0 1 0-1.5Z" />
                            </svg>
                          )}

                          <div className="flex-1 leading-snug">
                            <span
                              className={cn(
                                included
                                  ? "text-foreground font-medium"
                                  : "text-muted-foreground/50 line-through"
                              )}
                            >
                              {featObj.text}
                            </span>
                            {featObj.isNew && (
                              <span className="ml-1.5 rounded-xs border border-dashed border-accent px-1 py-0.2 text-[8px] font-extrabold uppercase tracking-tight text-accent bg-accent/10">
                                NEW
                              </span>
                            )}
                            {featObj.hint && (
                              <span className="block text-[10px] text-muted-foreground/70">
                                {featObj.hint}
                              </span>
                            )}
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                {/* Call to Action and Footer Note */}
                <div className="mt-8 space-y-3 pt-4 border-t-2 border-dashed border-border/80">
                  {tier.cta.href ? (
                    <a
                      href={tier.cta.href}
                      className={cn(
                        "w-full flex items-center justify-center gap-2 rounded-lg py-3 px-4 font-mono text-xs font-bold uppercase tracking-wider transition-all duration-150 cursor-pointer active:translate-y-0.5 border-2 text-center",
                        tier.cta.variant === "accent" || isPopular
                          ? "border-accent bg-accent text-accent-foreground hover:brightness-110 shadow-sm"
                          : tier.cta.variant === "primary"
                          ? "border-foreground bg-foreground text-background hover:bg-foreground/90 shadow-sm"
                          : "border-foreground/50 border-dashed bg-transparent text-foreground hover:bg-secondary hover:border-foreground"
                      )}
                    >
                      <span>{tier.cta.label}</span>
                      <span aria-hidden="true">→</span>
                    </a>
                  ) : (
                    <button
                      type="button"
                      disabled={tier.cta.disabled}
                      onClick={tier.cta.onClick}
                      className={cn(
                        "w-full flex items-center justify-center gap-2 rounded-lg py-3 px-4 font-mono text-xs font-bold uppercase tracking-wider transition-all duration-150 cursor-pointer active:translate-y-0.5 border-2 text-center disabled:opacity-50 disabled:cursor-not-allowed",
                        tier.cta.variant === "accent" || (isPopular && tier.cta.variant !== "primary")
                          ? "border-accent bg-accent text-accent-foreground hover:brightness-110 shadow-sm"
                          : tier.cta.variant === "primary"
                          ? "border-foreground bg-foreground text-background hover:bg-foreground/90 shadow-sm"
                          : "border-foreground/50 border-dashed bg-transparent text-foreground hover:bg-secondary hover:border-foreground"
                      )}
                    >
                      <span>{tier.cta.label}</span>
                      <span aria-hidden="true">→</span>
                    </button>
                  )}

                  {/* Micro Barcode & Guarantee Footer */}
                  <div className="flex items-center justify-between text-[10px] font-mono text-muted-foreground/80 px-1 pt-1">
                    <span>{tier.footerText || "Admit one · Guaranteed SLA"}</span>
                    {/* Mini SVG barcode */}
                    <svg
                      className="h-4 w-12 text-muted-foreground/60 shrink-0"
                      viewBox="0 0 48 16"
                      fill="currentColor"
                      aria-label="Stub barcode"
                      role="img"
                    >
                      <rect x="0" y="0" width="2" height="16" />
                      <rect x="4" y="0" width="1" height="16" />
                      <rect x="7" y="0" width="3" height="16" />
                      <rect x="12" y="0" width="1" height="16" />
                      <rect x="15" y="0" width="2" height="16" />
                      <rect x="19" y="0" width="4" height="16" />
                      <rect x="25" y="0" width="1" height="16" />
                      <rect x="28" y="0" width="2" height="16" />
                      <rect x="32" y="0" width="3" height="16" />
                      <rect x="37" y="0" width="1" height="16" />
                      <rect x="40" y="0" width="2" height="16" />
                      <rect x="44" y="0" width="4" height="16" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
