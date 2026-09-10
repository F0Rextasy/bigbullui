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

export interface ThemeOpts {
  radius?: string;
  font?: string;
}

export function buildCss(vars: ThemeVars, opts: ThemeOpts = {}): string {
  const radius = opts.radius ?? "0.5rem";
  const font = opts.font ?? "'Inter Tight', system-ui, sans-serif";
  return `:root {\n  --background: ${vars.background};\n  --foreground: ${vars.foreground};\n  --accent: ${vars.accent};\n  --muted: ${vars.muted};\n  --card: ${vars.card};\n  --radius: ${radius};\n}\n\nbody {\n  font-family: ${font};\n}\n\n@theme inline {\n  --color-background: var(--background);\n  --color-foreground: var(--foreground);\n  --color-accent: var(--accent);\n  --color-muted: var(--muted);\n  --color-card: var(--card);\n}`;
}

const RADII = ["0rem", "0.25rem", "0.5rem", "0.75rem", "1rem"];

export const FONTS: { id: string; label: string; css: string }[] = [
  { id: "tight", label: "Tight grotesk", css: "'Inter Tight', system-ui, sans-serif" },
  { id: "system", label: "System sans", css: "system-ui, sans-serif" },
  { id: "serif", label: "News serif", css: "Georgia, 'Times New Roman', serif" },
  { id: "mono", label: "Mono ledger", css: "'JetBrains Mono', ui-monospace, monospace" },
];

function hslToHex(h: number, s: number, l: number): string {
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const c = l - a * Math.max(-1, Math.min(k - 3, 9 - k, 1));
    return Math.round(255 * c).toString(16).padStart(2, "0");
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

function normColor(raw: string): string | null {
  const v = raw.trim().replace(/;$/, "");
  const hex = v.match(/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/);
  if (hex) {
    const h = hex[1];
    return h.length === 3 ? `#${h.split("").map((c) => c + c).join("")}` : `#${h}`;
  }
  const hsl = v.match(/^hsl\(\s*([\d.]+)\s+([\d.]+)%\s+([\d.]+)%\s*\)$/i) || v.match(/^([\d.]+)\s+([\d.]+)%\s+([\d.]+)%$/);
  if (hsl) return hslToHex(Number(hsl[1]), Number(hsl[2]) / 100, Number(hsl[3]) / 100);
  return null;
}

export function parseThemeVars(input: string): Partial<ThemeVars> & { radius?: string } {
  const out: Partial<ThemeVars> & { radius?: string } = {};
  const keyMap: Record<string, keyof ThemeVars | "radius"> = {
    background: "background",
    foreground: "foreground",
    card: "card",
    muted: "muted",
    accent: "accent",
    primary: "accent",
    radius: "radius",
  };
  for (const m of input.matchAll(/--([a-z-]+)\s*:\s*([^;}\n]+)/g)) {
    const key = keyMap[m[1]];
    if (!key) continue;
    if (key === "radius") {
      const r = m[2].trim();
      if (/^[\d.]+(rem|px|em)$/.test(r)) out.radius = r;
      continue;
    }
    const c = normColor(m[2]);
    if (c) out[key] = c;
  }
  return out;
}

export function ThemeStudio() {
  const [vars, setVars] = React.useState<ThemeVars>(PRESETS[0].vars);
  const [activePreset, setActivePreset] = React.useState<string>(PRESETS[0].id);
  const [radius, setRadius] = React.useState("0.5rem");
  const [fontId, setFontId] = React.useState(FONTS[0].id);
  const [tab, setTab] = React.useState<"tune" | "import">("tune");
  const [paste, setPaste] = React.useState("");
  const [imported, setImported] = React.useState(0);
  const font = FONTS.find((f) => f.id === fontId) ?? FONTS[0];
  const css = React.useMemo(() => buildCss(vars, { radius, font: font.css }), [vars, radius, font]);

  const set = (key: keyof ThemeVars) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setVars((prev) => ({ ...prev, [key]: event.target.value }));
    setActivePreset("custom");
  };

  const doImport = () => {
    const parsed = parseThemeVars(paste);
    const { radius: r, ...colors } = parsed;
    const n = Object.keys(colors).length;
    if (n > 0) setVars((prev) => ({ ...prev, ...colors }));
    if (r) setRadius(r);
    setImported(n + (r ? 1 : 0));
    setActivePreset("custom");
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="space-y-4">
        <div className="flex gap-1.5" role="group" aria-label="Studio mode">
          {(["tune", "import"] as const).map((m) => (
            <button
              key={m}
              type="button"
              aria-pressed={tab === m}
              onClick={() => setTab(m)}
              className={`rounded-sm border px-3 py-1 font-mono text-[11px] uppercase transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${tab === m ? "border-accent bg-accent font-bold text-accent-foreground" : "border-dashed border-border text-muted-foreground hover:border-foreground hover:text-foreground"}`}
            >
              {m === "tune" ? "Fine tune" : "Import theme"}
            </button>
          ))}
        </div>
        {tab === "tune" ? (
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
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Colors</p>
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
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Radius</p>
                <div className="mt-2 flex flex-wrap gap-1.5" role="group" aria-label="Corner radius">
                  {RADII.map((r) => (
                    <button
                      key={r}
                      type="button"
                      aria-pressed={radius === r}
                      onClick={() => { setRadius(r); setActivePreset("custom"); }}
                      className={`rounded-sm border px-2 py-1 font-mono text-[11px] tabular-nums transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${radius === r ? "border-accent bg-accent font-bold text-accent-foreground" : "border-dashed border-border text-muted-foreground hover:border-foreground hover:text-foreground"}`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Typeface</p>
                <div className="mt-2 flex flex-wrap gap-1.5" role="group" aria-label="Typeface">
                  {FONTS.map((f) => (
                    <button
                      key={f.id}
                      type="button"
                      aria-pressed={fontId === f.id}
                      onClick={() => { setFontId(f.id); setActivePreset("custom"); }}
                      className={`rounded-sm border px-2 py-1 font-mono text-[11px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${fontId === f.id ? "border-accent bg-accent font-bold text-accent-foreground" : "border-dashed border-border text-muted-foreground hover:border-foreground hover:text-foreground"}`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Paste shadcn / tweakcn variables</p>
            <textarea
              value={paste}
              onChange={(e) => setPaste(e.target.value)}
              placeholder={"--background: 0 0% 100%;\n--primary: 220 90% 56%;\n--radius: 0.5rem;"}
              aria-label="Paste theme CSS variables"
              rows={6}
              spellCheck={false}
              className="w-full rounded-md border border-dashed border-border bg-card p-3 font-mono text-xs leading-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
            <div className="flex items-center gap-3">
              <Button size="sm" onClick={doImport}>Import theme</Button>
              {imported > 0 && (
                <span role="status" className="font-mono text-[11px] uppercase tracking-wider text-accent">{imported} tokens applied</span>
              )}
            </div>
          </div>
        )}
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
              fontFamily: font.css,
              "--background": vars.background,
              "--foreground": vars.foreground,
              "--accent": vars.accent,
              "--muted": vars.muted,
              "--card": vars.card,
              "--radius": radius,
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
