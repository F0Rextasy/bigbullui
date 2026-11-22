"use client";

import * as React from "react";
import { cn, escapeRegExp } from "./lib/utils";

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
  const stripSep = React.useCallback(
    (s: string) => {
      const stripped = separator ? s.replace(new RegExp(escapeRegExp(separator), "g"), "") : s;
      return stripped.toUpperCase().slice(0, totalLength);
    },
    [separator, totalLength]
  );

  const [internal, setInternal] = React.useState(() => stripSep(defaultValue));
  const raw = value !== undefined ? stripSep(value) : internal;
  const slots = React.useMemo(
    () =>
      Array.from({ length: totalLength }, (_, k) => {
        const ch = raw[k];
        return ch && ch !== " " ? ch : "";
      }),
    [raw, totalLength]
  );
  const refs = React.useRef<(HTMLInputElement | null)[]>([]);

  const emitSlots = (nextSlots: string[]) => {
    const serialized = nextSlots.map((c) => c || " ").join("").replace(/\s+$/, "");
    if (value === undefined) setInternal(serialized);
    onValueChange?.(serialized);
    if (nextSlots.every((c) => c !== "")) {
      onComplete?.(nextSlots.join(""));
    }
  };

  const handleSlotChange = (charIdx: number, input: string) => {
    const clean = stripSep(input).replace(/[^A-Z0-9]/gi, "").toUpperCase();
    const nextSlots = [...slots];
    if (!clean) {
      nextSlots[charIdx] = "";
      emitSlots(nextSlots);
      return;
    }
    const existingChar = slots[charIdx];
    const insertText =
      clean.length > 1 && existingChar && clean.startsWith(existingChar)
        ? clean.slice(1)
        : clean;
    for (let k = 0; k < insertText.length && charIdx + k < totalLength; k++) {
      nextSlots[charIdx + k] = insertText[k];
    }
    emitSlots(nextSlots);
    const nextFocus = Math.min(charIdx + insertText.length, totalLength - 1);
    if (charIdx + insertText.length < totalLength) {
      refs.current[nextFocus]?.focus();
    }
  };

  const renderGroups = () => {
    const nodes: React.ReactNode[] = [];
    for (let g = 0; g < groups; g++) {
      if (g > 0) nodes.push(<span key={`sep-${g}`} className="font-mono text-lg text-muted-foreground" aria-hidden="true">{separator}</span>);
      for (let i = 0; i < groupLength; i++) {
        const charIdx = g * groupLength + i;
        const charVal = slots[charIdx];
        nodes.push(
          <input
            key={charIdx}
            ref={(el) => { refs.current[charIdx] = el; }}
            value={charVal}
            onChange={(e) => handleSlotChange(charIdx, e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Backspace" && !charVal && charIdx > 0) refs.current[charIdx - 1]?.focus();
            }}
            onPaste={(e) => {
              e.preventDefault();
              handleSlotChange(charIdx, e.clipboardData.getData("text"));
            }}
            inputMode="text"
            maxLength={2}
            aria-label={`Group ${g + 1} character ${i + 1}`}
            className={cn(
              "size-9 rounded-md border border-dashed border-border bg-card text-center font-mono text-sm font-bold uppercase",
              "transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none",
              charVal && "border-accent"
            )}
          />
        );
      }
    }
    return nodes;
  };

  return (
    <div className={cn("inline-flex items-center gap-0.5", className)} {...props}>
      {renderGroups()}
    </div>
  );
}
