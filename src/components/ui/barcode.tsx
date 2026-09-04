import * as React from "react";
import { cn } from "./lib/utils";

export interface BarcodeProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  height?: number;
  showValue?: boolean;
  className?: string;
}

export function Barcode({
  value,
  height = 48,
  showValue = true,
  className,
  ...props
}: BarcodeProps) {
  // Deterministic bar widths and gaps generated from the characters
  const bars = React.useMemo(() => {
    const result: { width: number; gap: number }[] = [];
    for (let i = 0; i < value.length; i++) {
      const code = value.charCodeAt(i);
      result.push({
        width: (code % 3) + 1.5,
        gap: ((code * 7) % 3) + 1.5,
      });
      result.push({
        width: ((code * 3) % 2) + 1,
        gap: ((code * 5) % 3) + 1,
      });
    }
    return result;
  }, [value]);

  const totalWidth = bars.reduce((acc, b) => acc + b.width + b.gap, 0);

  let currentX = 0;

  return (
    <div className={cn("inline-flex flex-col items-center select-none", className)} {...props}>
      <svg
        viewBox={`0 0 ${Math.max(totalWidth, 80)} ${height}`}
        className="w-full max-w-[240px] text-foreground"
        height={height}
        fill="currentColor"
        aria-label={`Barcode: ${value}`}
        role="img"
      >
        {bars.map((bar, idx) => {
          const x = currentX;
          currentX += bar.width + bar.gap;
          return (
            <rect
              key={idx}
              x={x}
              y={0}
              width={bar.width}
              height={height}
              fill="currentColor"
            />
          );
        })}
      </svg>
      {showValue ? (
        <span className="mt-1 font-mono text-[10px] tracking-[0.25em] text-muted-foreground">
          *{value.toUpperCase()}*
        </span>
      ) : null}
    </div>
  );
}
