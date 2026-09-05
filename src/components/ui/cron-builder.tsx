"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface CronBuilderProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (expression: string) => void;
}

const FIELDS = [
  { key: "minute", label: "Dakika", placeholder: "0-59" },
  { key: "hour", label: "Saat", placeholder: "0-23" },
  { key: "dom", label: "Ayın günü", placeholder: "1-31" },
  { key: "month", label: "Ay", placeholder: "1-12" },
  { key: "dow", label: "Haftanın günü", placeholder: "0-6" },
] as const;

const PRESETS = [
  { expr: "*/5 * * * *", label: "Her 5 dakika" },
  { expr: "0 * * * *", label: "Saatlik" },
  { expr: "0 9 * * *", label: "Her sabah 09:00" },
  { expr: "0 0 * * 1", label: "Pazartesi gece" },
];

function describe(expr: string): string {
  const parts = expr.trim().split(/\s+/);
  if (parts.length !== 5) return "5 alan bekleniyor: dakika saat gün ay haftagünü";
  const [min, hour, dom, month, dow] = parts;
  if (min.startsWith("*/")) return `Her ${min.slice(2)} dakikada bir`;
  if (hour === "*" && dom === "*" && month === "*" && dow === "*") return `Her saat başı ${min}. dakikada`;
  if (dom === "*" && month === "*" && dow === "*") return `Her gün ${hour.padStart(2, "0")}:${min.padStart(2, "0")}`;
  if (dow !== "*" && dom === "*") return `${dow}. günde ${hour}:${min}`;
  return `Özel zamanlama: ${expr}`;
}

/** Cron ifadesi oluşturucu: 5 alan + canlı açıklama + hazır ayarlar. */
export function CronBuilder({ value, defaultValue = "0 9 * * *", onValueChange, className, ...props }: CronBuilderProps) {
  const [expr, setExpr] = React.useState(value ?? defaultValue);
  const parts = expr.trim().split(/\s+/);

  const setField = (idx: number, v: string) => {
    const next = [...(parts.length === 5 ? parts : ["*", "*", "*", "*", "*"])];
    next[idx] = v || "*";
    const joined = next.join(" ");
    setExpr(joined);
    onValueChange?.(joined);
  };

  return (
    <div className={cn("w-full max-w-md space-y-3", className)} {...props}>
      <style>{`@keyframes crIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }`}</style>

      {/* Hazır ayarlar */}
      <div className="flex flex-wrap gap-1.5">
        {PRESETS.map((p) => (
          <button
            key={p.expr}
            onClick={() => { setExpr(p.expr); onValueChange?.(p.expr); }}
            className={cn(
              "rounded-full border px-2.5 py-1 font-mono text-[10px] transition-colors motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
              expr === p.expr ? "border-accent bg-accent/10 text-accent" : "border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground"
            )}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* 5 alan */}
      <div className="grid grid-cols-5 gap-1.5 animate-[crIn_0.3s_ease-out_both] motion-reduce:animate-none">
        {FIELDS.map((f, i) => (
          <div key={f.key} className="space-y-1">
            <label htmlFor={`cron-${f.key}`} className="block text-center font-mono text-[8px] uppercase tracking-wider text-muted-foreground">{f.label}</label>
            <input
              id={`cron-${f.key}`}
              value={parts[i] ?? "*"}
              onChange={(e) => setField(i, e.target.value)}
              placeholder={f.placeholder}
              className="w-full rounded-md border border-input bg-background px-1 py-1.5 text-center font-mono text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-colors motion-reduce:transition-none"
              spellCheck={false}
            />
          </div>
        ))}
      </div>

      <div className="rounded-md border border-dashed border-border bg-secondary/40 p-3">
        <code className="block font-mono text-sm text-accent">{expr}</code>
        <p className="mt-1 text-xs text-muted-foreground">{describe(expr)}</p>
      </div>
    </div>
  );
}
