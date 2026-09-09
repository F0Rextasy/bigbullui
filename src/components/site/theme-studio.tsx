"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { CopyButton } from "@/components/ui/copy-button";

export type ThemeVars = {
  background: string;
  foreground: string;
  accent: string;
  muted: string;
  card: string;
};

export const PRESETS: { id: string; label: string; vars: ThemeVars }[] = [
  {
    id: "classic-cream",
    label: "Classic Cream",
    vars: { background: "#F6F0E0", foreground: "#17130C", accent: "#BC3A28", muted: "#ECE3CC", card: "#FFFDF5" },
  },
  {
    id: "night-flight",
    label: "Night Flight",
    vars: { background: "#16120B", foreground: "#F3EAD3", accent: "#E0573D", muted: "#241E13", card: "#1E1810" },
  },
  {
    id: "blueprint",
    label: "Blueprint Archival",
    vars: { background: "#E9EFF7", foreground: "#16283F", accent: "#2F5DA3", muted: "#D3DEEA", card: "#F7FAFD" },
  },
  {
    id: "cyber-ledger",
    label: "Cyberpunk Ledger",
    vars: { background: "#0C0E12", foreground: "#E8E6DF", accent: "#4DE1FF", muted: "#1A1E26", card: "#141821" },
  },
  {
    id: "newsprint",
    label: "Vintage Newsprint",
    vars: { background: "#EFE6D0", foreground: "#2A241A", accent: "#8A2E20", muted: "#E0D3B8", card: "#F7F0DC" },
  },
];

const FIELDS: { key: keyof ThemeVars; label: string }[] = [
  { key: "background", label: "Paper" },
  { key: "foreground", label: "Ink" },
  { key: "accent", label: "Stamp" },
  { key: "muted", label: "Muted" },
  { key: "card", label: "Card" },
];

export function buildCss(vars: ThemeVars): string {
  return `:root {\n  --background: ${vars.background};\n  --foreground: ${vars.foreground};\n  --accent: ${vars.accent};\n  --muted: ${vars.muted};\n  --card: ${vars.card};\n}\n\n@theme inline {\n  --color-background: var(--background);\n  --color-foreground: var(--foreground);\n  --color-accent: var(--accent);\n  --color-muted: var(--muted);\n  --color-card: var(--card);\n}`;
}

export function ThemeStudio() {
  const [vars, setVars] = React.useState<ThemeVars>(PRESETS[0].vars);
  const [activePreset, setActivePreset] = React.useState<string>(PRESETS[0].id);
  const css = React.useMemo(() => buildCss(vars), [vars]);

  const set = (key: keyof ThemeVars) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setVars((prev) => ({ ...prev, [key]: event.target.value }));
    setActivePreset("custom");
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="space-y-4">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Presets</p>
          <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3">
            {PRESETS.map((preset) => (
              <button
                key={preset.id}
                type="button"
                onClick={() => {
                  setVars(preset.vars);
                  setActivePreset(preset.id);
                }}
                aria-pressed={activePreset === preset.id}
                className="rounded-md border border-border bg-card p-2 text-start transition-colors hover:border-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <span className="flex overflow-hidden rounded-sm border border-border" aria-hidden="true">
                  {[preset.vars.background, preset.vars.foreground, preset.vars.accent].map((color) => (
                    <span key={color} className="h-6 flex-1" style={{ backgroundColor: color }} />
                  ))}
                </span>
                <span className="mt-1.5 block font-mono text-[11px] font-bold uppercase text-foreground">{preset.label}</span>
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Fine tune</p>
          <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3">
            {FIELDS.map((field) => (
              <label key={field.key} className="rounded-md border border-dashed border-border bg-card p-2">
                <span className="block font-mono text-[10px] uppercase tracking-wider text-muted-foreground">{field.label}</span>
                <span className="mt-1.5 flex items-center gap-2">
                  <input
                    type="color"
                    value={vars[field.key]}
                    onChange={set(field.key)}
                    aria-label={`${field.label} color`}
                    className="size-8 cursor-pointer rounded border border-border bg-transparent"
                  />
                  <span className="font-mono text-[11px] uppercase text-foreground">{vars[field.key]}</span>
                </span>
              </label>
            ))}
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Copy CSS variables</p>
            <CopyButton value={css} />
          </div>
          <pre className="mt-2 overflow-x-auto rounded-md border-2 border-dashed border-foreground/30 bg-card p-4 font-mono text-xs leading-relaxed">
            {css}
          </pre>
        </div>
      </div>
      <div className="lg:sticky lg:top-24 lg:self-start">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Live preview</p>
        <div
          className="mt-2 rounded-xl border-2 border-foreground p-6 shadow-md"
          style={
            {
              backgroundColor: vars.background,
              color: vars.foreground,
              "--background": vars.background,
              "--foreground": vars.foreground,
              "--accent": vars.accent,
              "--muted": vars.muted,
              "--card": vars.card,
            } as React.CSSProperties
          }
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] opacity-70">Admit one</p>
          <p className="mt-1 font-mono text-2xl font-black uppercase">Night express</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <Badge>VIP</Badge>
            <Button size="sm">Claim stub</Button>
          </div>
          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Gate 3</CardTitle>
            </CardHeader>
            <CardContent>
              <Input placeholder="Stub serial" aria-label="Stub serial" />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
