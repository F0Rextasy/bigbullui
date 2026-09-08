"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface TimezoneOption {
  value: string;
  label: string;
  offset: string;
}

function buildTimezones(): TimezoneOption[] {
  const zones = [
    "UTC",
    "Europe/Istanbul",
    "Europe/London",
    "Europe/Berlin",
    "America/New_York",
    "America/Chicago",
    "America/Los_Angeles",
    "Asia/Dubai",
    "Asia/Karachi",
    "Asia/Dhaka",
    "Asia/Singapore",
    "Asia/Tokyo",
    "Australia/Sydney",
    "Pacific/Auckland",
  ];
  return zones.map((zone) => {
    let offset = "+00:00";
    try {
      const parts = new Intl.DateTimeFormat("en", {
        timeZone: zone,
        timeZoneName: "shortOffset",
      }).formatToParts(new Date());
      const tz = parts.find((p) => p.type === "timeZoneName")?.value ?? "";
      const m = tz.match(/GMT([+-]\d+)(?::(\d+))?/);
      if (m) offset = `${m[1].padStart(3, "+00")}:${m[2] ?? "00"}`;
    } catch {
      offset = "+00:00";
    }
    return { value: zone, label: zone.replace("_", " "), offset };
  });
}

export interface TimezoneSelectProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (zone: string) => void;
  label?: string;
}

export function TimezoneSelect({
  value: controlledValue,
  defaultValue = "UTC",
  onValueChange,
  label,
  className,
  ...props
}: TimezoneSelectProps) {
  const zones = React.useMemo(() => buildTimezones(), []);
  const [inner, setInner] = React.useState(defaultValue);
  const value = controlledValue ?? inner;
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const boxRef = React.useRef<HTMLDivElement>(null);

  const pick = (zone: string) => {
    setInner(zone);
    onValueChange?.(zone);
    setOpen(false);
    setQuery("");
  };

  React.useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open ]);

  const visible = zones.filter((z) => z.label.toLowerCase().includes(query.toLowerCase()));
  const selected = zones.find((z) => z.value === value);

  return (
    <div ref={boxRef} className={cn("relative w-full", className)} {...props}>
      {label ? (
        <span className="mb-1 block font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
          {label}
        </span>
      ) : null}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="listbox"
        className="flex w-full cursor-pointer items-center justify-between rounded-md border border-border bg-card px-3 py-2 font-mono text-sm transition-colors hover:border-foreground/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <span className="truncate">{selected ? `${selected.label} (${selected.offset})` : "Select timezone"}</span>
        <span aria-hidden className="ms-2 text-xs text-muted-foreground">▾</span>
      </button>
      {open ? (
        <div className="absolute inset-x-0 top-full z-50 mt-1 overflow-hidden rounded-md border border-border bg-card shadow-lg">
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Filter zones..."
            aria-label="Filter timezones"
            className="w-full border-b border-dashed border-border bg-transparent px-3 py-2 font-mono text-sm focus:outline-none"
          />
          <div role="listbox" className="max-h-56 overflow-y-auto p-1">
            {visible.map((z) => (
              <div
                key={z.value}
                role="option"
                aria-selected={z.value === value}
                onClick={() => pick(z.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    pick(z.value);
                  }
                }}
                tabIndex={0}
                className={cn(
                  "flex cursor-pointer items-center justify-between rounded px-3 py-2 font-mono text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  z.value === value ? "bg-accent font-bold text-accent-foreground" : "hover:bg-secondary",
                )}
              >
                <span className="truncate">{z.label}</span>
                <span className="ms-2 shrink-0 text-[11px] text-muted-foreground">{z.offset}</span>
              </div>
            ))}
            {visible.length === 0 ? (
              <p className="px-3 py-4 text-center font-mono text-xs text-muted-foreground">No zones</p>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}
