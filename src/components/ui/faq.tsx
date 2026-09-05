"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqProps {
  items: FaqItem[];
  defaultOpen?: number;
  className?: string;
}

export function Faq({ items, defaultOpen = 0, className }: FaqProps) {
  const [openIndex, setOpenIndex] = React.useState<number | null>(defaultOpen);

  return (
    <div className={cn("divide-y divide-dashed divide-border", className)}>
      {items.map((item, index) => {
        const isOpen = openIndex === index;

        return (
          <div
            key={item.question}
            className="animate-[fade-in-up_0.3s_ease-out_both] motion-reduce:animate-none"
            style={{ animationDelay: `${index * 40}ms` }}
          >
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 py-4 text-left font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-foreground transition-colors duration-200 hover:text-accent-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none"
            >
              <span>{item.question}</span>
              <svg
                aria-hidden="true"
                viewBox="0 0 12 12"
                className={cn(
                  "size-3 shrink-0 text-muted-foreground transition-transform duration-300 ease-out motion-reduce:transition-none",
                  isOpen && "rotate-45"
                )}
              >
                <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
              </svg>
            </button>
            <div
              className={cn(
                "grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none",
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              )}
            >
              <div className="overflow-hidden">
                <p className="pb-4 text-sm text-muted-foreground">{item.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
