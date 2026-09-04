import * as React from "react";
import { cn } from "./lib/utils";

export interface BarChartItem {
  label: string;
  value: number;
  tone?: "default" | "accent";
}

export interface BarChartProps extends React.HTMLAttributes<HTMLDivElement> {
  data: BarChartItem[];
  height?: number;
  showValues?: boolean;
  className?: string;
}

export function BarChart({
  data,
  height = 160,
  showValues = true,
  className,
  ...props
}: BarChartProps) {
  const maxValue = Math.max(...data.map((d) => d.value), 1);

  return (
    <div className={cn("w-full space-y-2 select-none", className)} {...props}>
      <div
        style={{ height }}
        className="relative flex items-end justify-between gap-3 border-b-2 border-dashed border-border px-2 pb-2"
      >
        {/* Dashed background guide lines */}
        <div className="absolute inset-x-0 top-1/4 border-b border-dashed border-border/40 pointer-events-none" />
        <div className="absolute inset-x-0 top-2/4 border-b border-dashed border-border/40 pointer-events-none" />
        <div className="absolute inset-x-0 top-3/4 border-b border-dashed border-border/40 pointer-events-none" />

        {data.map((item, idx) => {
          const heightPercent = Math.max((item.value / maxValue) * 100, 4);
          const isAccent = item.tone === "accent";

          return (
            <div
              key={idx}
              className="group relative flex flex-1 flex-col items-center justify-end h-full"
            >
              {showValues ? (
                <span className="mb-1.5 font-mono text-[10px] text-muted-foreground transition-opacity group-hover:font-bold group-hover:text-foreground">
                  {item.value}
                </span>
              ) : null}

              <div
                style={{ height: `${heightPercent}%` }}
                className={cn(
                  "w-full max-w-[40px] rounded-t-sm border border-b-0 transition-all duration-200 group-hover:scale-x-105",
                  isAccent
                    ? "border-accent bg-accent text-accent-foreground"
                    : "border-foreground bg-primary text-primary-foreground"
                )}
              />
            </div>
          );
        })}
      </div>

      {/* X-axis labels */}
      <div className="flex justify-between gap-3 px-2">
        {data.map((item, idx) => (
          <div key={idx} className="flex-1 text-center font-mono text-[11px] text-muted-foreground truncate">
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
}
