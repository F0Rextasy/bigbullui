"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface HotkeyRecorderProps {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  className?: string;
}

export function HotkeyRecorder({
  value: controlledValue,
  defaultValue = "",
  onValueChange,
  className,
}: HotkeyRecorderProps) {
  const [internalValue, setInternalValue] = React.useState(defaultValue);
  const [recorded, setRecorded] = React.useState("");
  const [isListening, setIsListening] = React.useState(false);
  const [disabled, setDisabled] = React.useState(false);

  const isControlled = controlledValue !== undefined;
  const currentValue = isControlled ? controlledValue : internalValue;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (isListening || disabled) return;

    // Don't capture modifier keys alone or special keys that aren't useful
    if (e.key === "Control" || e.key === "Alt" || e.key === "Shift" || e.key === "Meta") {
      return;
    }

    setIsListening(true);
    const modifiers: string[] = [];
    const keys: string[] = [];

    const capture = (event: KeyboardEvent) => {
      if (event.key === "Control") {
        modifiers.push("Ctrl");
      } else if (event.key === "Alt") {
        modifiers.push("Alt");
      } else if (event.key === "Shift") {
        modifiers.push("Shift");
      } else if (event.key === " ") {
        keys.push("Space");
      } else if (event.key.length === 1) {
        keys.push(event.key);
      } else {
        // Special keys like ArrowUp, Enter, etc.
        keys.push(event.key);
      }

      // Build the combo string
      const combo = [...modifiers, ...keys].join("+");
      setRecorded(combo);
      setInternalValue(combo);
      setIsListening(false);
      document.removeEventListener("keydown", capture);
      document.removeEventListener("keyup", endCapture);
    };

    const endCapture = () => {
      setIsListening(false);
      document.removeEventListener("keydown", capture);
      document.removeEventListener("keyup", endCapture);
    };

    document.addEventListener("keydown", capture);
    document.addEventListener("keyup", endCapture);
  };

  const clearCombo = () => {
    setRecorded("");
    setInternalValue("");
    setDisabled(false);
    onValueChange?.("");
  };

  const classes = cn(
    "rounded-md border border-input bg-transparent px-3 py-2 font-mono text-sm transition-colors",
    !isListening && "ring-2 ring-ring focus-visible:outline-none focus-visible:ring-2",
    isListening && "opacity-50 cursor-not-allowed",
    className,
  );

  const buttonClass = cn(
    "flex items-center gap-2 rounded-md border border-transparent bg-secondary px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.15em] text-secondary-foreground",
    isListening && "bg-accent text-accent-foreground",
    !isListening && "hover:bg-accent/20 transition-colors"
  );

  return (
    <div className={cn("space-y-2", className)}>
      <div>
        <button
          onClick={() => setIsListening(true)}
          onMouseDown={(e) => e.preventDefault()}
          className={buttonClass}
        >
          {isListening ? (
            <>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="8" y1="6" x2="8" y2="14" />
                <line x1="12" y1="6" x2="12" y2="14" />
                <line x1="16" y1="6" x2="16" y2="14" />
              </svg>
              Recording...
            </>
          ) : (
            "Record hotkey"
          )}
        </button>
        {recorded && (
          <div className="mt-1 flex items-center gap-1.5">
            {recorded.split("+").map((part, idx) => (
              <span
                key={idx}
                className="font-mono text-[10px] uppercase tracking-[0.15em] text-accent-foreground"
              >
                {part}
              </span>
            ))}
          </div>
        )}
      </div>

      {!isListening && (
        <button
          onClick={clearCombo}
          className="mt-1 flex items-center gap-1.5 px-2 py-1 rounded-md border border-transparent bg-destructive text-[10px] uppercase tracking-[0.15em] text-destructive hover:bg-destructive/90 transition-colors"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="18" y2="18" />
            <line x1="6" y1="18" x2="18" y2="18" />
          </svg>
          Clear
        </button>
      )}
    </div>
  );
}

HotkeyRecorder.displayName = "HotkeyRecorder";

