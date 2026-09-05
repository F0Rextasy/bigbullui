"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface QuizOption {
  id: string;
  label: string;
  correct?: boolean;
}

export interface QuizCardProps extends React.HTMLAttributes<HTMLDivElement> {
  question: string;
  options: QuizOption[];
  onAnswer?: (optionId: string, correct: boolean) => void;
}

/** Quiz flashcard: answer options + correct/incorrect feedback. */
export function QuizCard({ question, options, onAnswer, className, ...props }: QuizCardProps) {
  const [picked, setPicked] = React.useState<string | null>(null);

  const pick = (id: string) => {
    if (picked) return;
    setPicked(id);
    const opt = options.find((o) => o.id === id);
    onAnswer?.(id, !!opt?.correct);
  };

  return (
    <div className={cn("w-full max-w-sm rounded-lg border border-border bg-card p-4", className)} {...props}>
      <style>{`@keyframes qcPop { 0% { transform: scale(0.85); } 60% { transform: scale(1.06); } 100% { transform: scale(1); } }`}</style>
      <p className="text-sm font-semibold">{question}</p>
      <ul className="mt-3 space-y-1.5">
        {options.map((opt, idx) => {
          const isPicked = picked === opt.id;
          const showCorrect = picked !== null && opt.correct;
          const showWrong = isPicked && !opt.correct;
          return (
            <li key={opt.id}>
              <button
                onClick={() => pick(opt.id)}
                disabled={picked !== null}
                className={cn(
                  "flex w-full items-center gap-2 rounded-md border px-3 py-2 text-left text-sm transition-all duration-200 motion-reduce:transition-none",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  picked === null && "border-border hover:border-foreground/40",
                  showCorrect && "border-emerald-500 bg-emerald-500/10 text-emerald-700 animate-[qcPop_0.25s_ease-out] motion-reduce:animate-none",
                  showWrong && "border-destructive bg-destructive/10 text-destructive animate-[qcPop_0.25s_ease-out] motion-reduce:animate-none",
                  picked !== null && !showCorrect && !showWrong && "border-border opacity-50"
                )}
              >
                <span className="font-mono text-[10px] text-muted-foreground">{String.fromCharCode(65 + idx)}</span>
                {opt.label}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
