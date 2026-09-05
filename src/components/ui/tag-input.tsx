"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface TagInputProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
  /** Controlled array of tag strings */
  value?: string[];
  /** Default array of tag strings for uncontrolled mode */
  defaultValue?: string[];
  /** Callback fired when tags array changes */
  onChange?: (tags: string[]) => void;
  /** Input placeholder text when empty */
  placeholder?: string;
  /** Maximum number of allowable tags */
  maxTags?: number;
  /** Whether duplicate tags are allowed (default: false) */
  allowDuplicates?: boolean;
  /** List of suggested tags rendered as quick clickable stubs */
  suggestions?: string[];
  /** Micro header label (default: "TICKET CATEGORIES & GENRES") */
  label?: string;
  /** Ticket stub serial identifier (default: "TAG-STUB #902") */
  serial?: string;
  /** Whether the input is disabled */
  disabled?: boolean;
  /** Whether to render ticket punch notches on side borders (default: true) */
  notched?: boolean;
  /** Visual chip variant style */
  tagVariant?: "default" | "accent" | "secondary" | "outline";
  /** Whether to automatically add tag when input loses focus (default: true) */
  addOnBlur?: boolean;
  /** Custom delimiter to split pasted text or typed text (default: ",") */
  delimiter?: string;
  /** Whether to play mechanical ticket punch click sound via Web Audio API (default: true) */
  enableSound?: boolean;
  /** Callback fired when a tag is clicked */
  onTagClick?: (tag: string) => void;
  /** Callback fired when a tag is removed */
  onTagRemove?: (tag: string, index: number) => void;
  /** Additional CSS class names */
  className?: string;
}

/**
 * Synthesizes a crisp paper ticket punch notch sound using the Web Audio API.
 * Zero external audio assets required.
 */
function playTagPunchSound(type: "add" | "remove" = "add"): void {
  if (typeof window === "undefined") return;
  try {
    const AudioCtx = window.AudioContext;
    if (!AudioCtx) return;

    const ctx = new AudioCtx();
    const now = ctx.currentTime;

    if (type === "add") {
      // Crisp mechanical punch & staple snap
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "square";
      osc.frequency.setValueAtTime(540, now);
      osc.frequency.exponentialRampToValueAtTime(160, now + 0.03);
      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.035);
    } else {
      // Paper tear / notch release snip
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(380, now);
      osc.frequency.exponentialRampToValueAtTime(110, now + 0.04);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.045);
    }
  } catch {
    // Graceful silence if audio context is blocked
  }
}

export function TagInput({
  value: controlledValue,
  defaultValue = [],
  onChange,
  placeholder = "Add category, genre, or artist...",
  maxTags,
  allowDuplicates = false,
  suggestions,
  label = "TICKET CATEGORIES & GENRES",
  serial = "TAG-STUB #902",
  disabled = false,
  notched = true,
  tagVariant = "default",
  addOnBlur = true,
  delimiter = ",",
  enableSound = true,
  onTagClick,
  onTagRemove,
  className,
  ...props
}: TagInputProps) {
  const [internalTags, setInternalTags] = React.useState<string[]>(defaultValue);
  const [inputValue, setInputValue] = React.useState("");
  const [pendingDeleteIndex, setPendingDeleteIndex] = React.useState<number | null>(null);

  const inputRef = React.useRef<HTMLInputElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const isControlled = controlledValue !== undefined;
  const tags = isControlled ? controlledValue : internalTags;

  const updateTags = React.useCallback(
    (nextTags: string[]) => {
      if (!isControlled) {
        setInternalTags(nextTags);
      }
      onChange?.(nextTags);
    },
    [isControlled, onChange]
  );

  const addTag = React.useCallback(
    (rawText: string) => {
      if (disabled) return;
      const trimmed = rawText.trim();
      if (!trimmed) return;

      if (maxTags && tags.length >= maxTags) return;

      if (!allowDuplicates && tags.some((t) => t.toLowerCase() === trimmed.toLowerCase())) {
        return;
      }

      const nextTags = [...tags, trimmed];
      updateTags(nextTags);
      setInputValue("");
      setPendingDeleteIndex(null);

      if (enableSound) {
        playTagPunchSound("add");
      }
    },
    [disabled, maxTags, tags, allowDuplicates, updateTags, enableSound]
  );

  const removeTag = React.useCallback(
    (indexToRemove: number) => {
      if (disabled) return;
      const tagToRemove = tags[indexToRemove];
      const nextTags = tags.filter((_, idx) => idx !== indexToRemove);
      updateTags(nextTags);
      setPendingDeleteIndex(null);
      onTagRemove?.(tagToRemove, indexToRemove);

      if (enableSound) {
        playTagPunchSound("remove");
      }
      inputRef.current?.focus();
    },
    [disabled, tags, updateTags, onTagRemove, enableSound]
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (disabled) return;

    if (e.key === "Enter" || e.key === delimiter) {
      e.preventDefault();
      addTag(inputValue);
    } else if (e.key === "Backspace") {
      if (inputValue === "" && tags.length > 0) {
        const lastIndex = tags.length - 1;
        if (pendingDeleteIndex === lastIndex) {
          // Second Backspace: delete highlighted tag
          removeTag(lastIndex);
        } else {
          // First Backspace: mark for deletion with visual highlight
          setPendingDeleteIndex(lastIndex);
        }
      }
    } else if (e.key === "Escape") {
      setPendingDeleteIndex(null);
      setInputValue("");
    } else {
      // Clear pending delete highlight when typing continues
      if (pendingDeleteIndex !== null) {
        setPendingDeleteIndex(null);
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (disabled) return;

    const pasted = e.clipboardData.getData("text");
    const parts = pasted
      .split(new RegExp(`[${delimiter}\n\r]+`))
      .map((p) => p.trim())
      .filter(Boolean);

    if (parts.length === 0) return;

    const current = [...tags];
    for (const part of parts) {
      if (maxTags && current.length >= maxTags) break;
      if (!allowDuplicates && current.some((t) => t.toLowerCase() === part.toLowerCase())) {
        continue;
      }
      current.push(part);
    }

    updateTags(current);
    setInputValue("");
    setPendingDeleteIndex(null);
    if (enableSound) {
      playTagPunchSound("add");
    }
  };

  const handleBlur = () => {
    if (addOnBlur && inputValue.trim()) {
      addTag(inputValue);
    }
    setPendingDeleteIndex(null);
  };

  const handleClearAll = () => {
    if (disabled || tags.length === 0) return;
    updateTags([]);
    setPendingDeleteIndex(null);
    setInputValue("");
    if (enableSound) {
      playTagPunchSound("remove");
    }
    inputRef.current?.focus();
  };

  const tagVariantStyles = (index: number) => {
    const isPendingDelete = pendingDeleteIndex === index;

    if (isPendingDelete) {
      return "border-destructive bg-destructive/15 text-destructive ring-2 ring-destructive/60 animate-pulse";
    }

    switch (tagVariant) {
      case "accent":
        return "border-accent/40 bg-accent/15 text-accent-strong hover:border-accent";
      case "secondary":
        return "border-border bg-secondary text-secondary-foreground hover:border-foreground/40";
      case "outline":
        return "border-dashed border-border bg-transparent text-foreground hover:border-foreground/60";
      default:
        return "border-border bg-card text-foreground hover:border-foreground/40 shadow-sm";
    }
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full rounded-xl border-2 border-dashed border-border bg-card p-3.5 font-mono shadow-sm transition-all focus-within:border-foreground/60 focus-within:ring-2 focus-within:ring-accent/20",
        disabled && "opacity-60 pointer-events-none cursor-not-allowed",
        className
      )}
      onClick={() => inputRef.current?.focus()}
      {...props}
    >
      {/* Ticket Punch Notches on Side Edges */}
      {notched && (
        <>
          <div
            aria-hidden="true"
            className="absolute -left-2 top-1/2 -translate-y-1/2 size-4 rounded-full border-2 border-border bg-background shadow-inner pointer-events-none"
          />
          <div
            aria-hidden="true"
            className="absolute -right-2 top-1/2 -translate-y-1/2 size-4 rounded-full border-2 border-border bg-background shadow-inner pointer-events-none"
          />
        </>
      )}

      {/* Ticket Stub Upper Micro Label Header Bar */}
      <div className="flex items-center justify-between border-b-2 border-dashed border-border pb-2 text-[10px] tracking-wider text-muted-foreground">
        <div className="flex items-center gap-1.5 font-bold uppercase text-foreground">
          <svg
            className="size-3 text-accent"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z" />
            <circle cx="7" cy="7" r=".5" fill="currentColor" />
          </svg>
          <span>{label}</span>
        </div>
        <div className="flex items-center gap-2 font-mono text-[9px]">
          <span className="rounded-sm border border-border/80 bg-secondary/60 px-1.5 py-0.5 text-muted-foreground">
            {tags.length}
            {maxTags !== undefined ? ` / ${maxTags}` : ""} TAGS
          </span>
          <span className="text-muted-foreground">{serial}</span>
          {tags.length > 0 && !disabled && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleClearAll();
              }}
              className="rounded-sm border border-border px-1.5 py-0.5 text-[9px] hover:border-destructive hover:bg-destructive/10 hover:text-destructive transition-colors text-muted-foreground"
              title="Clear all tags"
            >
              CLEAR
            </button>
          )}
        </div>
      </div>

      {/* Pill Chip Badges & Input Wrapping Area */}
      <div className="mt-2.5 flex flex-wrap items-center gap-2 min-h-[38px]">
        {tags.map((tag, index) => {
          const isPendingDelete = pendingDeleteIndex === index;

          return (
            <div
              key={`${tag}-${index}`}
              onClick={(e) => {
                e.stopPropagation();
                onTagClick?.(tag);
              }}
              className={cn(
                "group relative inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-xs font-mono select-none transition-all duration-100",
                tagVariantStyles(index)
              )}
            >
              {/* Miniature ticket punch registration notch on left */}
              <span
                aria-hidden="true"
                className="absolute -left-1 top-1/2 -translate-y-1/2 size-1.5 rounded-full border border-border/60 bg-background"
              />

              {/* Tag Prefix Symbol */}
              <span className="font-bold text-accent/80 text-[11px]" aria-hidden="true">
                #
              </span>

              {/* Tag Label */}
              <span className="font-semibold tracking-wide">{tag}</span>

              {/* Remove Notch Button */}
              {!disabled && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeTag(index);
                  }}
                  aria-label={`Remove tag ${tag}`}
                  className={cn(
                    "ml-0.5 flex size-4 items-center justify-center rounded-full border text-muted-foreground transition-all duration-150 focus:outline-none focus:ring-1 focus:ring-accent",
                    isPendingDelete
                      ? "border-destructive bg-destructive text-white"
                      : "border-border/80 bg-secondary/80 hover:border-destructive hover:bg-destructive hover:text-white active:scale-90"
                  )}
                >
                  <svg
                    className="size-2.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              )}

              {/* Miniature ticket punch registration notch on right */}
              <span
                aria-hidden="true"
                className="absolute -right-1 top-1/2 -translate-y-1/2 size-1.5 rounded-full border border-border/60 bg-background"
              />
            </div>
          );
        })}

        {/* Dashed Flexible Input */}
        {(!maxTags || tags.length < maxTags) && (
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              setPendingDeleteIndex(null);
            }}
            onKeyDown={handleKeyDown}
            onPaste={handlePaste}
            onBlur={handleBlur}
            disabled={disabled}
            placeholder={tags.length === 0 ? placeholder : "Add another..."}
            className="flex-1 min-w-[140px] bg-transparent py-1 px-1 font-mono text-xs text-foreground placeholder:text-muted-foreground/60 focus:outline-none disabled:cursor-not-allowed"
          />
        )}
      </div>

      {/* Quick Suggested Stubs */}
      {suggestions && suggestions.length > 0 && (!maxTags || tags.length < maxTags) && (
        <div className="mt-3 border-t border-dashed border-border/80 pt-2">
          <div className="mb-1.5 flex items-center justify-between text-[9px] uppercase tracking-wider text-muted-foreground">
            <span>QUICK TICKET PRESETS:</span>
            <span>CLICK TO STAMP</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {suggestions.map((sug) => {
              const alreadyAdded = tags.some((t) => t.toLowerCase() === sug.toLowerCase());
              return (
                <button
                  key={sug}
                  type="button"
                  disabled={disabled || alreadyAdded}
                  onClick={(e) => {
                    e.stopPropagation();
                    addTag(sug);
                  }}
                  className={cn(
                    "flex items-center gap-1 rounded-sm border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider transition-all",
                    alreadyAdded
                      ? "border-border/40 bg-secondary/30 text-muted-foreground/40 cursor-default"
                      : "border-dashed border-border bg-secondary/40 text-muted-foreground hover:border-foreground/50 hover:bg-secondary hover:text-foreground active:scale-95"
                  )}
                >
                  <span className="text-[10px] text-accent font-bold" aria-hidden="true">
                    {alreadyAdded ? "✓" : "+"}
                  </span>
                  <span>{sug}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Backspace Deletion Guidance Notice */}
      {pendingDeleteIndex !== null && (
        <div className="mt-2 text-right font-mono text-[9px] uppercase tracking-wider text-destructive animate-pulse">
          PRESS BACKSPACE AGAIN TO REMOVE &apos;{tags[pendingDeleteIndex]}&apos;
        </div>
      )}
    </div>
  );
}
