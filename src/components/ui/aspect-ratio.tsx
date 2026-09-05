import * as React from "react";
import { cn } from "./lib/utils";

export type AspectRatioPreset = "16:9" | "3:1" | "2:1" | "1:1" | "4:3" | "21:9";

export const ASPECT_RATIO_PRESETS: Record<AspectRatioPreset, { ratio: number; label: string; description: string }> = {
  "16:9": { ratio: 16 / 9, label: "16:9 STAGE SCREEN", description: "Widescreen stage and cinema monitor" },
  "3:1": { ratio: 3 / 1, label: "3:1 BOARDING VOUCHER", description: "Elongated travel pass & wristband voucher" },
  "2:1": { ratio: 2 / 1, label: "2:1 ADMISSION PASS", description: "Classic arena ticket and concert stub" },
  "1:1": { ratio: 1 / 1, label: "1:1 BADGE", description: "Square accreditation pass and credential badge" },
  "4:3": { ratio: 4 / 3, label: "4:3 RETRO SCREEN", description: "Classic broadcast display" },
  "21:9": { ratio: 21 / 9, label: "21:9 ULTRA STAGE", description: "Panoramic arena backdrop display" },
};

export function isAspectRatioPreset(value: unknown): value is AspectRatioPreset {
  return typeof value === "string" && value in ASPECT_RATIO_PRESETS;
}

export interface AspectRatioProps extends React.HTMLAttributes<HTMLDivElement> {
  ratio?: number | AspectRatioPreset;
  perforated?: boolean;
  cornerGuides?: boolean;
  cornerNotches?: boolean;
  label?: string;
  serial?: string;
  variant?: "default" | "perforated" | "stub" | "screen";
  innerClassName?: string;
}

export function AspectRatio({
  ratio = "16:9",
  perforated = false,
  cornerGuides = false,
  cornerNotches = false,
  label,
  serial,
  variant = "default",
  className,
  innerClassName,
  style,
  children,
  ...props
}: AspectRatioProps) {
  const isPreset = isAspectRatioPreset(ratio);
  const preset = isPreset ? ASPECT_RATIO_PRESETS[ratio] : undefined;
  const resolvedRatio = typeof ratio === "number" ? ratio : preset?.ratio ?? 16 / 9;

  const displayLabel = label ?? preset?.label;
  const isPerforated = perforated || variant === "perforated";

  return (
    <div
      className={cn(
        "group relative w-full select-none overflow-hidden rounded-lg transition-all duration-200",
        // Surface variants
        variant === "default" && "border-2 border-foreground bg-card text-card-foreground shadow-sm",
        variant === "perforated" && "border-2 border-dashed border-foreground bg-card text-card-foreground shadow-sm",
        variant === "stub" && "border-2 border-foreground bg-card text-card-foreground shadow-[4px_4px_0_0_var(--color-border)]",
        variant === "screen" && "border-2 border-foreground bg-primary text-primary-foreground shadow-md",
        isPerforated && variant !== "perforated" && "border-dashed",
        className
      )}
      style={{
        aspectRatio: resolvedRatio,
        ...style,
      }}
      {...props}
    >
      {/* Inner Perforated Frame Guideline */}
      {isPerforated && (
        <div
          className="pointer-events-none absolute inset-1.5 z-10 rounded-md border border-dashed border-border/80"
          aria-hidden="true"
        />
      )}

      {/* Ticket Punch Cutout Notches (Left & Right) */}
      {cornerNotches && (
        <>
          <div
            className="pointer-events-none absolute left-0 top-1/2 z-20 size-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-foreground bg-background"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute right-0 top-1/2 z-20 size-4 translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-foreground bg-background"
            aria-hidden="true"
          />
        </>
      )}

      {/* Corner Punch Guides (L-brackets + Center Registration Target) */}
      {cornerGuides && (
        <>
          {/* Top-Left */}
          <div
            className="pointer-events-none absolute left-2 top-2 z-20 flex size-3 items-center justify-center border-l-2 border-t-2 border-foreground/60"
            aria-hidden="true"
          >
            <div className="size-0.5 rounded-full bg-foreground/70" />
          </div>

          {/* Top-Right */}
          <div
            className="pointer-events-none absolute right-2 top-2 z-20 flex size-3 items-center justify-center border-r-2 border-t-2 border-foreground/60"
            aria-hidden="true"
          >
            <div className="size-0.5 rounded-full bg-foreground/70" />
          </div>

          {/* Bottom-Left */}
          <div
            className="pointer-events-none absolute bottom-2 left-2 z-20 flex size-3 items-center justify-center border-b-2 border-l-2 border-foreground/60"
            aria-hidden="true"
          >
            <div className="size-0.5 rounded-full bg-foreground/70" />
          </div>

          {/* Bottom-Right */}
          <div
            className="pointer-events-none absolute bottom-2 right-2 z-20 flex size-3 items-center justify-center border-b-2 border-r-2 border-foreground/60"
            aria-hidden="true"
          >
            <div className="size-0.5 rounded-full bg-foreground/70" />
          </div>
        </>
      )}

      {/* Micro Info Label & Serial Banner */}
      {(displayLabel || serial) && (
        <div
          className="pointer-events-none absolute left-2.5 top-2.5 z-20 flex max-w-[calc(100%-20px)] items-center gap-1.5 truncate"
          aria-hidden="true"
        >
          {displayLabel && (
            <span className="truncate rounded border border-border/80 bg-background/90 px-1.5 py-0.5 font-mono text-[9px] font-bold uppercase tracking-widest text-foreground shadow-xs backdrop-blur-xs">
              {displayLabel}
            </span>
          )}
          {serial && (
            <span className="hidden truncate font-mono text-[9px] uppercase tracking-wider text-muted-foreground sm:inline-block">
              {serial}
            </span>
          )}
        </div>
      )}

      {/* Media & Content Slot */}
      <div
        className={cn(
          "absolute inset-0 size-full overflow-hidden [&>img]:size-full [&>img]:object-cover [&>video]:size-full [&>video]:object-cover",
          innerClassName
        )}
      >
        {children}
      </div>
    </div>
  );
}
