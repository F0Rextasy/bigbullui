"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface PromptBoxProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSubmit"> {
  placeholder?: string;
  defaultValue?: string;
  onSubmit?: (value: string) => void;
}

/** Ticket stub prompt composer with mono label and stamp submit. */
export function PromptBox({ placeholder = "Describe the stub to generate...", defaultValue = "", onSubmit, className, ...props }: PromptBoxProps) {
  const [value, setValue] = React.useState(defaultValue);
  return (
    <div className={cn("w-full rounded-lg border-2 border-foreground bg-card p-3 shadow-md outline-1 outline-dashed outline-offset-[-5px] outline-border", className)} {...props}>
      <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Prompt console</p>
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        rows={3}
        className="mt-2 w-full resize-none bg-transparent font-mono text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
      />
      <div className="mt-2 flex items-center justify-between border-t border-dashed border-border pt-2">
        <span className="font-mono text-[10px] uppercase text-muted-foreground">{value.length} chars</span>
        <button
          type="button"
          onClick={() => onSubmit?.(value)}
          className="rounded border border-foreground bg-primary px-3 py-1 font-mono text-[11px] font-bold uppercase text-primary-foreground transition-transform hover:-translate-y-px active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          Stamp prompt
        </button>
      </div>
    </div>
  );
}
