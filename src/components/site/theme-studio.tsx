"use client";

import * as React from "react";
import { CodeBox } from "@/components/site/code-box";
import { cn } from "@/components/ui/lib/utils";

type AccentPreset = { name: string; light: string; dark: string };
type SurfacePreset = { name: string; lightBg: string; lightCard: string; lightBorder: string; darkBg: string; darkCard: string; darkBorder: string };

const ACCENT_PRESETS: AccentPreset[] = [
  { name: "Stamp Red", light: "#b53524", dark: "#c34a31" },
  { name: "Cobalt Ink", light: "#1d4ed8", dark: "#60a5fa" },
  { name: "Pine Ticket", light: "#15803d", dark: "#4ade80" },
  { name: "Amber Press", light: "#b45309", dark: "#f59e0b" },
  { name: "Plum Ink", light: "#7e22ce", dark: "#c084fc" },
];

const SURFACE_PRESETS: SurfacePreset[] = [
  {
    name: "Cream Paper",
    lightBg: "#f6f0e0",
    lightCard: "#fffdf5",
    lightBorder: "#8c7a5b",
    darkBg: "#16120b",
    darkCard: "#1e1810",
    darkBorder: "#7a6a50",
  },
  {
    name: "Newsprint",
    lightBg: "#f3f4f6",
    lightCard: "#ffffff",
    lightBorder: "#6b7280",
    darkBg: "#111827",
    darkCard: "#1f2937",
    darkBorder: "#6b7280",
  },
  {
    name: "Stark White",
    lightBg: "#ffffff",
    lightCard: "#fafafa",
    lightBorder: "#737373",
    darkBg: "#09090b",
    darkCard: "#18181b",
    darkBorder: "#52525b",
  },
];

function hexToRgb(hex: string): [number, number, number] {
  const clean = hex.replace("#", "").trim();
  const full = clean.length === 3 ? clean.split("").map((c) => c + c).join("") : clean;
  const num = Number.parseInt(full.slice(0, 6), 16);
  if (Number.isNaN(num)) return [0, 0, 0];
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
}

function luminance(hex: string): number {
  const [r, g, b] = hexToRgb(hex).map((c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrastRatio(hexA: string, hexB: string): number {
  const l1 = luminance(hexA);
  const l2 = luminance(hexB);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

function bestTextColor(bgHex: string): string {
  return contrastRatio("#ffffff", bgHex) >= contrastRatio("#111111", bgHex) ? "#ffffff" : "#111111";
}

export function ThemeStudio() {
  const [mode, setMode] = React.useState<"light" | "dark">("light");
  const [accentLight, setAccentLight] = React.useState("#b53524");
  const [accentDark, setAccentDark] = React.useState("#c34a31");
  const [surfaceIdx, setSurfaceIdx] = React.useState(0);
  const [radius, setRadius] = React.useState(0.5);

  const surface = SURFACE_PRESETS[surfaceIdx] ?? SURFACE_PRESETS[0];
  const activeBg = mode === "light" ? surface.lightBg : surface.darkBg;
  const activeCard = mode === "light" ? surface.lightCard : surface.darkCard;
  const activeFg = mode === "light" ? "#17130c" : "#f3ead3";
  const activeBorder = mode === "light" ? surface.lightBorder : surface.darkBorder;
  const activeAccent = mode === "light" ? accentLight : accentDark;
  const activeAccentFg = bestTextColor(activeAccent);

  const ratioOnCard = contrastRatio(activeAccent, activeCard);
  const ratioBtnText = contrastRatio(activeAccentFg, activeAccent);

  const generatedCss = React.useMemo(() => {
    const lightAccentFg = bestTextColor(accentLight);
    const darkAccentFg = bestTextColor(accentDark);
    return `/* Paste after @import "bigbullui/css"; in globals.css */
:root {
  --background: ${surface.lightBg};
  --card: ${surface.lightCard};
  --border: ${surface.lightBorder};
  --accent: ${accentLight};
  --accent-strong: ${accentLight};
  --accent-foreground: ${lightAccentFg};
  --ring: ${accentLight};
  --radius: ${radius}rem;
}

.dark {
  --background: ${surface.darkBg};
  --card: ${surface.darkCard};
  --border: ${surface.darkBorder};
  --accent: ${accentDark};
  --accent-strong: ${accentDark};
  --accent-foreground: ${darkAccentFg};
  --ring: ${accentDark};
}`;
  }, [accentLight, accentDark, surface, radius]);

  const handleDownload = () => {
    const blob = new Blob([generatedCss], { type: "text/css;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "bigbullui-theme.css";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <section aria-labelledby="theme-studio-heading" className="space-y-6 rounded-xl border-2 border-foreground bg-card p-5 shadow-xs sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-dashed border-border pb-4">
        <div>
          <h2 id="theme-studio-heading" className="font-mono text-base font-black uppercase tracking-wider text-foreground">
            Interactive Theme Studio
          </h2>
          <p className="mt-1 text-xs text-muted-foreground">
            Tune Paper &amp; Night tokens with live WCAG AA contrast verification, then copy or download CSS overrides.
          </p>
        </div>
        <div className="flex items-center gap-1.5 rounded-md border border-border bg-secondary/50 p-1 font-mono text-[11px]" role="group" aria-label="Preview mode">
          {(["light", "dark"] as const).map((m) => (
            <button
              key={m}
              type="button"
              aria-pressed={mode === m}
              onClick={() => setMode(m)}
              className={cn(
                "cursor-pointer rounded px-2.5 py-1 uppercase transition-colors",
                mode === m ? "bg-primary font-semibold text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              )}
            >
              {m === "light" ? "Paper" : "Night"}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)]">
        {/* Controls */}
        <div className="space-y-4">
          <div className="space-y-2">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              Accent Stamp Presets
            </p>
            <div className="flex flex-wrap gap-1.5">
              {ACCENT_PRESETS.map((preset) => {
                const selected = preset.light.toLowerCase() === accentLight.toLowerCase();
                return (
                  <button
                    key={preset.name}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => {
                      setAccentLight(preset.light);
                      setAccentDark(preset.dark);
                    }}
                    className={cn(
                      "inline-flex cursor-pointer items-center gap-1.5 rounded-md border px-2.5 py-1 font-mono text-[11px] transition-colors",
                      selected ? "border-foreground bg-secondary font-semibold text-foreground" : "border-border bg-background text-muted-foreground hover:border-foreground"
                    )}
                  >
                    <span className="size-2.5 rounded-full" style={{ backgroundColor: mode === "light" ? preset.light : preset.dark }} />
                    {preset.name}
                  </button>
                );
              })}
            </div>
            <div className="grid grid-cols-2 gap-3 pt-1">
              <label className="flex items-center justify-between rounded-md border border-border bg-background px-2.5 py-1.5 font-mono text-[11px]">
                <span>Light accent</span>
                <input
                  type="color"
                  aria-label="Light mode accent color"
                  value={accentLight}
                  onChange={(e) => setAccentLight(e.target.value)}
                  className="size-6 cursor-pointer border-0 bg-transparent p-0"
                />
              </label>
              <label className="flex items-center justify-between rounded-md border border-border bg-background px-2.5 py-1.5 font-mono text-[11px]">
                <span>Dark accent</span>
                <input
                  type="color"
                  aria-label="Dark mode accent color"
                  value={accentDark}
                  onChange={(e) => setAccentDark(e.target.value)}
                  className="size-6 cursor-pointer border-0 bg-transparent p-0"
                />
              </label>
            </div>
          </div>

          <div className="space-y-2">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              Paper &amp; Surface Palette
            </p>
            <div className="flex flex-wrap gap-1.5">
              {SURFACE_PRESETS.map((s, idx) => (
                <button
                  key={s.name}
                  type="button"
                  aria-pressed={surfaceIdx === idx}
                  onClick={() => setSurfaceIdx(idx)}
                  className={cn(
                    "cursor-pointer rounded-md border px-2.5 py-1 font-mono text-[11px] transition-colors",
                    surfaceIdx === idx ? "border-foreground bg-primary font-semibold text-primary-foreground" : "border-border bg-background text-muted-foreground hover:border-foreground"
                  )}
                >
                  {s.name}
                </button>
              ))}
            </div>
          </div>

          <label className="block space-y-1.5">
            <span className="flex items-center justify-between font-mono text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              <span>Corner radius</span>
              <span className="text-foreground">{radius}rem</span>
            </span>
            <input
              type="range"
              min={0}
              max={1}
              step={0.125}
              value={radius}
              onChange={(e) => setRadius(Number(e.target.value))}
              aria-label="Corner radius"
              className="w-full accent-accent-strong"
            />
          </label>

          {/* WCAG Live Readout */}
          <div className="grid grid-cols-2 gap-2 pt-1 font-mono text-[11px]">
            <div className="rounded-md border border-border bg-background p-2.5">
              <div className="text-muted-foreground">Accent on card</div>
              <div className="mt-1 flex items-center justify-between font-bold">
                <span>{ratioOnCard.toFixed(2)}:1</span>
                <span className={ratioOnCard >= 4.5 ? "text-emerald-800 dark:text-emerald-300" : ratioOnCard >= 3 ? "text-amber-900 dark:text-amber-300" : "text-destructive"}>
                  {ratioOnCard >= 4.5 ? "AA PASS" : ratioOnCard >= 3 ? "AA LARGE" : "LOW"}
                </span>
              </div>
            </div>
            <div className="rounded-md border border-border bg-background p-2.5">
              <div className="text-muted-foreground">Button label</div>
              <div className="mt-1 flex items-center justify-between font-bold">
                <span>{ratioBtnText.toFixed(2)}:1</span>
                <span className={ratioBtnText >= 4.5 ? "text-emerald-800 dark:text-emerald-300" : "text-destructive"}>
                  {ratioBtnText >= 4.5 ? "AA PASS" : "CHECK"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Live Ticket Preview */}
        <div
          className="flex flex-col justify-between gap-4 border-2 border-dashed p-5 transition-colors"
          style={{
            backgroundColor: activeBg,
            color: activeFg,
            borderColor: activeBorder,
            borderRadius: `${radius}rem`,
          }}
        >
          <div
            className="space-y-4 border-2 p-4 shadow-xs"
            style={{
              backgroundColor: activeCard,
              borderColor: activeFg,
              borderRadius: `${radius}rem`,
            }}
          >
            <div className="flex items-center justify-between border-b border-dashed pb-3" style={{ borderColor: activeBorder }}>
              <div>
                <span
                  className="inline-block px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-widest"
                  style={{
                    backgroundColor: activeAccent,
                    color: activeAccentFg,
                    borderRadius: `${Math.max(0.125, radius / 2)}rem`,
                  }}
                >
                  ADMIT ONE
                </span>
                <h3 className="mt-1.5 text-lg font-semibold tracking-tight">Row C · Seat 12</h3>
              </div>
              <span className="font-mono text-xs">№ 00481</span>
            </div>

            <p className="text-xs">
              Previewing {mode === "light" ? "Paper" : "Night"} theme with custom accent, border contrast, and {radius}rem radius.
            </p>

            <div className="flex flex-wrap items-center gap-2">
              <span
                className="inline-flex items-center px-3 py-1.5 font-mono text-xs font-semibold uppercase tracking-wider"
                style={{
                  backgroundColor: activeAccent,
                  color: activeAccentFg,
                  borderRadius: `${radius}rem`,
                }}
              >
                Confirm Ticket
              </span>
              <span
                className="inline-flex items-center border px-3 py-1.5 font-mono text-xs uppercase tracking-wider"
                style={{
                  borderColor: activeBorder,
                  borderRadius: `${radius}rem`,
                }}
              >
                Secondary
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between gap-2">
            <span className="font-mono text-[10px] uppercase tracking-wider">
              Generated CSS Variables
            </span>
            <button
              type="button"
              onClick={handleDownload}
              className="cursor-pointer rounded-md border border-foreground bg-primary px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-primary-foreground transition-opacity hover:opacity-90"
            >
              Download .css
            </button>
          </div>
        </div>
      </div>

      <CodeBox code={generatedCss} block language="css" filename="bigbullui-theme.css" />
    </section>
  );
}
