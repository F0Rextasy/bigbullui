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
            <span>⏱ {minutes} dk</span>
            <span>🍽 {servings} porsiyon</span>
          </div>
        </div>
        <span className="text-2xl" aria-hidden="true">👨‍🍳</span>
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
