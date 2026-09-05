"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface WizardStep {
  id: string;
  title: string;
  description?: string;
  /** adım doğrulaması — false dönerse ilerlenmez */
  validate?: () => boolean;
}

export interface WizardProps extends React.HTMLAttributes<HTMLDivElement> {
  steps: WizardStep[];
  onFinish?: () => void;
  children: React.ReactNode[];
}

/** Tam sayfa sihirbaz: ileri/geri + adım doğrulama + ilerleme göstergesi. */
export function Wizard({ steps, onFinish, children, className, ...props }: WizardProps) {
  const [current, setCurrent] = React.useState(0);
  const [error, setError] = React.useState(false);
  const step = steps[current];
  const isLast = current === steps.length - 1;

  const next = () => {
    if (step.validate && !step.validate()) {
      setError(true);
      setTimeout(() => setError(false), 600);
      return;
    }
    setError(false);
    if (isLast) { onFinish?.(); return; }
    setCurrent((c) => Math.min(steps.length - 1, c + 1));
  };

  const back = () => setCurrent((c) => Math.max(0, c - 1));

  return (
    <div className={cn("w-full max-w-lg rounded-lg border border-border bg-card p-6", className, error && "border-destructive")} {...props}>
      <style>{`
        @keyframes wzIn { from { opacity: 0; transform: translateX(16px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes wzShake { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-5px); } 75% { transform: translateX(5px); } }
      `}</style>

      {/* Adım göstergesi */}
      <ol className="flex items-center gap-2" aria-label="Adımlar">
        {steps.map((s, i) => (
          <li key={s.id} className="flex flex-1 items-center gap-2">
            <span
              className={cn(
                "flex size-6 shrink-0 items-center justify-center rounded-full border-2 font-mono text-[10px] font-bold transition-colors duration-300 motion-reduce:transition-none",
                i < current && "border-accent bg-accent text-accent-foreground",
                i === current && "border-accent text-accent",
                i > current && "border-border text-muted-foreground"
              )}
              aria-current={i === current ? "step" : undefined}
            >
              {i < current ? <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg> : i + 1}
            </span>
            {i < steps.length - 1 && <span className={cn("h-0.5 flex-1 rounded-full transition-colors duration-300 motion-reduce:transition-none", i < current ? "bg-accent" : "bg-border")} aria-hidden="true" />}
          </li>
        ))}
      </ol>

      {/* İçerik */}
      <div key={step.id} className={cn("mt-6 min-h-32", error && "animate-[wzShake_0.3s_ease-out] motion-reduce:animate-none")}>
        <h3 className="text-base font-semibold animate-[wzIn_0.3s_ease-out_both] motion-reduce:animate-none">{step.title}</h3>
        {step.description && <p className="mt-1 text-sm text-muted-foreground">{step.description}</p>}
        <div className="mt-4">{children[current]}</div>
      </div>

      {/* Butonlar */}
      <div className="mt-6 flex items-center justify-between border-t border-dashed border-border pt-4">
        <button
          onClick={back}
          disabled={current === 0}
          className="rounded-md border border-border px-4 py-1.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground transition-colors hover:border-foreground/40 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-30 motion-reduce:transition-none"
        >
          ← Geri
        </button>
        <span className="font-mono text-[10px] tabular-nums text-muted-foreground">{current + 1}/{steps.length}</span>
        <button
          onClick={next}
          className={cn(
            "rounded-md bg-accent px-4 py-1.5 font-mono text-[10px] uppercase tracking-wider text-accent-foreground",
            "transition-all duration-150 hover:bg-accent/90 active:scale-[0.97]",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none"
          )}
        >
          {isLast ? "Tamamla" : "İleri →"}
        </button>
      </div>
    </div>
  );
}
