"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface CountryValue {
  /** ISO 2 harf kod */
  code: string;
  value: number;
}

export interface WorldMapProps extends React.HTMLAttributes<SVGSVGElement> {
  data: CountryValue[];
  /** Maximum density value for color scaling */
  height?: number;
  onCountryHover?: (code: string | null) => void;
}

/**
 * Simplified world map: 6 continental grid blocks with value density coloring.
 * Stylized regional blocks instead of full GeoJSON paths for lightweight size.
 */
export function WorldMap({ data, height = 220, onCountryHover, className, ...props }: WorldMapProps) {
  const [hover, setHover] = React.useState<string | null>(null);
  const max = Math.max(...data.map((d) => d.value), 1);
  const byCode = new Map(data.map((d) => [d.code, d.value]));

  // Stylized region grid blocks
  const regions = [
    { code: "NA", x: 8, y: 12, w: 26, h: 22, label: "K. Amerika" },
    { code: "SA", x: 22, y: 42, w: 14, h: 30, label: "G. Amerika" },
    { code: "EU", x: 42, y: 10, w: 18, h: 18, label: "Avrupa" },
    { code: "AF", x: 44, y: 34, w: 18, h: 30, label: "Afrika" },
    { code: "AS", x: 64, y: 10, w: 26, h: 28, label: "Asya" },
    { code: "OC", x: 74, y: 56, w: 16, h: 16, label: "Okyanusya" },
  ];

  const valueFor = (code: string): number | null => {
    // Check direct match for region code, or compute maximum across countries
    const direct = byCode.get(code);
    if (direct !== undefined) return direct;
    const regionPrefix = code.slice(0, 2);
    const candidates = data.filter((d) => d.code.startsWith(regionPrefix)).map((d) => d.value);
    return candidates.length ? Math.max(...candidates) : null;
  };

  return (
    <svg
      viewBox="0 0 100 78"
      style={{ height }}
      className={cn("w-full", className)}
      role="img"
      aria-label="World map data visualization"
      onMouseLeave={() => { setHover(null); onCountryHover?.(null); }}
      {...props}
    >
      <style>{`@keyframes wmIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }`}</style>
      <rect x="0" y="0" width="100" height="78" fill="var(--card)" rx="2" />
      {regions.map((r, idx) => {
        const val = valueFor(r.code);
        const intensity = val === null ? 0 : val / max;
        return (
          <g
            key={r.code}
            onMouseEnter={() => { setHover(r.code); onCountryHover?.(r.code); }}
            style={{ animation: `wmIn 0.4s ease-out both`, animationDelay: `${idx * 80}ms`, transformOrigin: "center" }}
          >
            <rect
              x={r.x} y={r.y} width={r.w} height={r.h} rx="2"
              fill="var(--accent)"
              opacity={val === null ? 0.08 : 0.12 + intensity * 0.75}
              stroke="var(--border)"
              strokeWidth={hover === r.code ? 0.8 : 0.3}
              className="cursor-pointer transition-opacity duration-200 motion-reduce:transition-none"
            />
            <text x={r.x + r.w / 2} y={r.y + r.h / 2} textAnchor="middle" dominantBaseline="middle" fontSize="3" fill="var(--foreground)" opacity={0.7} className="select-none pointer-events-none font-mono">
              {r.code}
            </text>
            {val !== null && (
              <text x={r.x + r.w / 2} y={r.y + r.h / 2 + 5} textAnchor="middle" fontSize="2.6" fill="var(--muted-foreground)" className="select-none pointer-events-none font-mono">
                {val.toLocaleString("tr-TR")}
              </text>
            )}
          </g>
        );
      })}
      {hover && (
        <text x="50" y="74" textAnchor="middle" fontSize="3.2" fill="var(--foreground)" className="font-mono">
          {regions.find((r) => r.code === hover)?.label}: {valueFor(hover)?.toLocaleString("tr-TR") ?? "veri yok"}
        </text>
      )}
    </svg>
  );
}
