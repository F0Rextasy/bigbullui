"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface ColorContrastProps extends React.HTMLAttributes<HTMLDivElement> {
  foreground?: string;
  background?: string;
}

function luminance(hex: string): number {
  const c = hex.replace("#", "").padEnd(6, "0").slice(0, 6);
  const rgb = [0, 2, 4].map((i) => {
    const v = parseInt(c.slice(i, i + 2), 16) / 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
}

/** WCAG contrast checker with pass stamps. */
export function ColorContrast({ foreground = "#17130C", background = "#F6F0E0", className, ...props }: ColorContrastProps) {
  const [fg, setFg] = React.useState(foreground);
  const [bg, setBg] = React.useState(background);
  const ratio = React.useMemo(() => {
    const l1 = luminance(fg);
    const l2 = luminance(bg);
    return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
  }, [fg, bg]);
  const aa = ratio >= 4.5;
  const aaa = ratio >= 7;
  return (
    <div className={cn("w-full rounded-lg border-2 border-foreground bg-card p-4 shadow-md", className)} {...props}>
      <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Contrast checker</p>
      <div className="mt-2 flex gap-2">
        {(["Ink", "Paper"] as const).map((label, i) => (
          <label key={label} className="flex flex-1 items-center gap-2 rounded-md border border-dashed border-border p-2 font-mono text-[11px] uppercase text-muted-foreground">
            {label}
            <input type="color" value={i === 0 ? fg : bg} onChange={(e) => (i === 0 ? setFg(e.target.value) : setBg(e.target.value))} className="h-7 w-10 cursor-pointer" aria-label={`${label} color`} />
            <span className="text-foreground">{i === 0 ? fg : bg}</span>
          </label>
        ))}
      </div>
      <div className="mt-2 rounded-md border border-border p-3 text-center font-mono text-sm font-bold" style={{ backgroundColor: bg, color: fg }}>
        ADMIT ONE SAMPLE TEXT
      </div>
      <div className="mt-2 flex items-center gap-2 font-mono text-[11px] font-bold uppercase">
        <span className="rounded bg-secondary px-2 py-1 text-foreground">{ratio.toFixed(2)}:1</span>
        <span className={cn("rounded px-2 py-1", aa ? "bg-primary text-primary-foreground" : "bg-destructive text-white")}>{aa ? "AA pass" : "AA fail"}</span>
        <span className={cn("rounded px-2 py-1", aaa ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground")}>{aaa ? "AAA pass" : "AAA fail"}</span>
      </div>
    </div>
  );
}
