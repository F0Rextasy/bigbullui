"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface PromptInputProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSubmit"> {
  placeholder?: string;
  defaultValue?: string;
  maxLength?: number;
  onSubmit?: (value: string) => void;
}

/** Ticket-stub prompt composer with token estimate and submit action. */
export function PromptInput({
  placeholder = "Describe the event stub to generate...",
  defaultValue = "",
  maxLength = 2000,
  onSubmit,
  className,
  ...props
}: PromptInputProps) {
  const [value, setValue] = React.useState(defaultValue);
  const tokens = Math.max(1, Math.ceil(value.length / 4));
  const submit = () => {
    const trimmed = value.trim();
    if (trimmed) onSubmit?.(trimmed);
  };
  return (
    <div className={cn("w-full rounded-lg border-2 border-foreground bg-card", className)} {...props}>
      <div className="border-b border-dashed border-border px-3 py-1.5">
        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
          Prompt desk
        </p>
      </div>
      <textarea
        value={value}
        maxLength={maxLength}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) submit();
        }}
        placeholder={placeholder}
        rows={3}
        aria-label="Prompt input"
        className="w-full resize-y bg-transparent px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
      />
      <div className="flex items-center gap-2 border-t border-dashed border-border px-3 py-2">
        <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
          {value.length}/{maxLength} chars
        </span>
        <span className="rounded border border-dashed border-border px-1.5 py-px font-mono text-[10px] text-muted-foreground">
          ~{tokens} tokens
        </span>
        <span className="hidden font-mono text-[10px] text-muted-foreground sm:inline">
          CTRL + ENTER to send
        </span>
        <button
          type="button"
          onClick={submit}
          disabled={!value.trim()}
          className="ml-auto cursor-pointer rounded border-2 border-foreground bg-primary px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-wider text-primary-foreground transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          Send
        </button>
      </div>
    </div>
  );
}
