"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface SerialInputProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  groups?: number;
  groupLength?: number;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  onComplete?: (value: string) => void;
  separator?: string;
}

/** Serial license input: grouped slots, auto-advance, clipboard paste. */
export function SerialInput({
  groups = 3,
  groupLength = 4,
  value,
  defaultValue = "",
  onValueChange,
  onComplete,
  separator = "-",
  className,
  ...props
}: SerialInputProps) {
  const totalLength = groups * groupLength;
  const [internal, setInternal] = React.useState(defaultValue);
  const raw = (value ?? internal).replace(new RegExp(separator === "-" ? "-" : separator, "g"), "").toUpperCase().slice(0, totalLength);
  const refs = React.useRef<(HTMLInputElement | null)[]>([]);

  const emit = (rawValue: string) => {
    setInternal(rawValue);
    onValueChange?.(rawValue);
    if (rawValue.length === totalLength) onComplete?.(rawValue);
  };

  const handleChange = (groupIdx: number, input: string) => {
    const clean = input.replace(/[^A-Z0-9]/gi, "").toUpperCase();
    const chars = raw.split("");
    const start = groupIdx * groupLength;
    for (let i = 0; i < clean.length && start + i < totalLength; i++) {
      chars[start + i] = clean[i];
    }
    const next = chars.join("").slice(0, totalLength);
    emit(next);
    // otomatik ilerleme
    if (clean.length >= groupLength && groupIdx < groups - 1) {
      refs.current[(groupIdx + 1) * groupLength]?.focus();
    }
  };

  const renderGroups = () => {
    const nodes: React.ReactNode[] = [];
    for (let g = 0; g < groups; g++) {
      if (g > 0) nodes.push(<span key={`sep-${g}`} className="font-mono text-lg text-muted-foreground" aria-hidden="true">{separator}</span>);
      for (let i = 0; i < groupLength; i++) {
        const charIdx = g * groupLength + i;
        nodes.push(
          <input
            key={charIdx}
            ref={(el) => { refs.current[charIdx] = el; }}
            value={raw[charIdx] ?? ""}
            onChange={(e) => handleChange(g, e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Backspace" && !raw[charIdx] && charIdx > 0) refs.current[charIdx - 1]?.focus();
            }}
            inputMode="text"
            maxLength={2}
            aria-label={`${g + 1}. grup ${i + 1}. karakter`}
            className={cn(
              "size-9 rounded-md border border-dashed border-border bg-card text-center font-mono text-sm font-bold uppercase",
              "transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none",
              raw[charIdx] && "border-accent"
            )}
          />
        );
      }
    }
    return nodes;
  };

  return (
    <div className={cn("inline-flex items-center gap-0.5", className)} {...props}>
      <style>{`@keyframes serialPop { 0% { transform: scale(0.85); } 60% { transform: scale(1.08); } 100% { transform: scale(1); } }`}</style>
      {renderGroups()}
    </div>
  );
}
