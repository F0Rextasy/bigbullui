"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface RecipeIngredient {
  id: string;
  amount: string;
  name: string;
}

export interface RecipeCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  /** dakika */
  minutes: number;
  servings: number;
  ingredients: RecipeIngredient[];
  steps: string[];
}

/** Recipe guide card: ingredients + step breakdown + duration. */
export function RecipeCard({ title, minutes, servings, ingredients, steps, className, ...props }: RecipeCardProps) {
  const [tab, setTab] = React.useState<"ingredients" | "steps">("ingredients");

  return (
    <div className={cn("w-full max-w-sm overflow-hidden rounded-lg border border-border bg-card", className)} {...props}>
      <style>{`@keyframes rcIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }`}</style>

      <div className="flex items-start justify-between border-b border-dashed border-border p-4">
        <div>
          <h3 className="text-base font-bold">{title}</h3>
          <div className="mt-1 flex gap-3 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
            <span className="inline-flex items-center gap-1"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="size-3.5"><circle cx="12" cy="13.2" r="6.8" /><path d="M12 9.8v3.4l2.4 1.5M10 3.5h4M12 3.5V6.4" /></svg> {minutes} dk</span>
            <span className="inline-flex items-center gap-1"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="size-3.5"><path d="M4 16.5h16M5.8 16.5a6.2 6.2 0 0 1 12.4 0M12 10.3V8.8M11 8.8h2M3.5 19.5h17" /></svg> {servings} porsiyon</span>
          </div>
        </div>
        <span aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="size-6"><path d="M8 20.5v-4.6c-2 0-3.4-1.4-3.4-3.1 0-1.4.8-2.5 2-2.9.3-1.7 1.8-3.2 3.9-3.2.5 0 1 .1 1.5.3.5-.2 1-.3 1.5-.3 2.1 0 3.6 1.5 3.9 3.2 1.2.4 2 1.5 2 2.9 0 1.7-1.4 3.1-3.4 3.1v4.6z" /><path d="M8 20.5h8" /></svg></span>
      </div>

      <div className="flex border-b border-border">
        {(["ingredients", "steps"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            role="tab"
            aria-selected={tab === t}
            className={cn(
              "flex-1 py-2 font-mono text-[10px] uppercase tracking-wider transition-colors motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
              tab === t ? "border-b-2 border-accent text-accent" : "text-muted-foreground hover:text-foreground"
            )}
          >
            {t === "ingredients" ? `Ingredients (${ingredients.length})` : `Steps (${steps.length})`}
          </button>
        ))}
      </div>

      <div className="max-h-56 overflow-y-auto p-4" key={tab}>
        {tab === "ingredients" ? (
          <ul className="space-y-1.5">
            {ingredients.map((ing, i) => (
              <li key={ing.id} className="flex items-center justify-between gap-3 text-sm animate-[rcIn_0.25s_ease-out_both] motion-reduce:animate-none" style={{ animationDelay: `${i * 40}ms` }}>
                <span className="truncate">{ing.name}</span>
                <span className="shrink-0 font-mono text-xs tabular-nums text-muted-foreground">{ing.amount}</span>
              </li>
            ))}
          </ul>
        ) : (
          <ol className="space-y-2.5">
            {steps.map((step, i) => (
              <li key={i} className="flex gap-2.5 text-sm animate-[rcIn_0.25s_ease-out_both] motion-reduce:animate-none" style={{ animationDelay: `${i * 50}ms` }}>
                <span className="flex size-5 shrink-0 items-center justify-center rounded-full border border-dashed border-accent/60 font-mono text-[9px] font-bold text-accent">{i + 1}</span>
                <span className="leading-snug">{step}</span>
              </li>
            ))}
          </ol>
        )}
      </div>
    </div>
  );
}
