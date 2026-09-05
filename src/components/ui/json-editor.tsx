"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface JsonEditorProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string, valid: boolean) => void;
  height?: string;
}

function format(src: string): string {
  try { return JSON.stringify(JSON.parse(src), null, 2); } catch { return src; }
}

function validate(src: string): { valid: boolean; error?: string } {
  if (src.trim() === "") return { valid: true };
  try { JSON.parse(src); return { valid: true }; } catch (e) { return { valid: false, error: (e as Error).message }; }
}

/** Girintili JSON düzenleme + canlı doğrulama + biçimlendir. */
export function JsonEditor({ value, defaultValue = '{\n  "ad": "bigbullui",\n  "surum": "0.1.0"\n}', onValueChange, height = "200px", className, ...props }: JsonEditorProps) {
  const [internal, setInternal] = React.useState(defaultValue);
  const src = value ?? internal;
  const { valid, error } = validate(src);

  const handleChange = (v: string) => {
    setInternal(v);
    const check = validate(v);
    onValueChange?.(v, check.valid);
  };

  return (
    <div className={cn("w-full overflow-hidden rounded-lg border bg-card transition-colors duration-200 motion-reduce:transition-none", valid ? "border-border" : "border-destructive", className)} {...props}>
      <style>{`@keyframes jeIn { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } }`}</style>
      <div className="flex items-center justify-between border-b border-border bg-secondary/60 px-3 py-1.5">
        <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">JSON</span>
        <div className="flex items-center gap-2">
          {valid ? (
            <span className="font-mono text-[9px] uppercase tracking-wider text-emerald-600">✓ Geçerli</span>
          ) : (
            <span className="font-mono text-[9px] uppercase tracking-wider text-destructive animate-[jeIn_0.2s_ease-out] motion-reduce:animate-none">✗ Geçersiz</span>
          )}
          <button
            onClick={() => handleChange(format(src))}
            disabled={!valid}
            className="rounded-sm border border-border px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-muted-foreground transition-colors hover:text-foreground disabled:opacity-40 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring motion-reduce:transition-none"
          >
            Biçimlendir
          </button>
        </div>
      </div>
      <textarea
        value={src}
        onChange={(e) => handleChange(e.target.value)}
        style={{ height }}
        aria-label="JSON düzenleyici"
        aria-invalid={!valid}
        spellCheck={false}
        className="w-full resize-none bg-transparent p-3 font-mono text-xs leading-5 text-foreground focus-visible:outline-none"
      />
      {!valid && error && (
        <p className="border-t border-destructive/30 bg-destructive/5 px-3 py-1.5 font-mono text-[10px] text-destructive">{error}</p>
      )}
    </div>
  );
}
