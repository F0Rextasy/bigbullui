"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface InlineEditProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  value?: string;
  defaultValue?: string;
  onSave?: (newValue: string) => void;
  placeholder?: string;
  label?: string;
  className?: string;
}

export function InlineEdit({
  value: controlledValue,
  defaultValue = "",
  onSave,
  placeholder = "Click to edit...",
  label,
  className,
  ...props
}: InlineEditProps) {
  const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue);
  const isControlled = controlledValue !== undefined;
  const currentVal = isControlled ? controlledValue : uncontrolledValue;

  const [isEditing, setIsEditing] = React.useState(false);
  const [draft, setDraft] = React.useState(currentVal);
  const [justSaved, setJustSaved] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [isEditing]);

  const handleStartEdit = () => {
    setDraft(currentVal);
    setIsEditing(true);
  };

  const handleCommit = () => {
    setIsEditing(false);
    if (draft !== currentVal) {
      if (!isControlled) {
        setUncontrolledValue(draft);
      }
      onSave?.(draft);
      setJustSaved(true);
      setTimeout(() => setJustSaved(false), 1500);
    }
  };

  const handleCancel = () => {
    setDraft(currentVal);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleCommit();
    } else if (e.key === "Escape") {
      e.preventDefault();
      handleCancel();
    }
  };

  return (
    <div className={cn("inline-flex flex-col gap-1 font-mono select-none", className)} {...props}>
      {label && (
        <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
          {label}
        </span>
      )}

      {isEditing ? (
        <div className="flex items-center gap-1.5">
          <input
            ref={inputRef}
            type="text"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onBlur={handleCommit}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="rounded-md border-2 border-accent bg-card px-2 py-1 text-xs text-foreground focus:outline-none shadow-xs"
          />
          <button
            type="button"
            onMouseDown={(e) => {
              e.preventDefault();
              handleCommit();
            }}
            className="size-6 rounded-xs bg-accent text-accent-foreground flex items-center justify-center text-xs font-bold cursor-pointer"
            aria-label="Save changes"
          >
            ✓
          </button>
          <button
            type="button"
            onMouseDown={(e) => {
              e.preventDefault();
              handleCancel();
            }}
            className="size-6 rounded-xs border border-border bg-secondary text-muted-foreground flex items-center justify-center text-xs hover:text-foreground cursor-pointer"
            aria-label="Cancel editing"
          >
            ✕
          </button>
        </div>
      ) : (
        <div
          onClick={handleStartEdit}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              handleStartEdit();
            }
          }}
          className={cn(
            "group flex items-center gap-2 cursor-pointer rounded-md border border-dashed border-border/80 px-2 py-1 text-xs text-foreground transition-all hover:border-foreground/50 hover:bg-secondary/40",
            justSaved && "border-accent bg-accent/10"
          )}
        >
          <span className={cn(!currentVal && "text-muted-foreground italic")}>
            {currentVal || placeholder}
          </span>
          <span className="text-[10px] text-muted-foreground opacity-60 group-hover:opacity-100 transition-opacity">
            ✎
          </span>
          {justSaved && (
            <span className="text-[9px] font-bold uppercase tracking-wider text-accent animate-[fade-in_0.2s_ease-out]">
              SAVED
            </span>
          )}
        </div>
      )}
    </div>
  );
}
