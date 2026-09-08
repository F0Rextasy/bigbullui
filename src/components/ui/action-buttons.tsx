"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface ActionButton {
  id: string;
  label: string;
  glyph?: string;
  tone?: "default" | "accent" | "danger";
}

export interface ActionButtonsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  buttons?: ActionButton[];
  onAction?: (id: string) => void;
}

const tones: Record<string, string> = {
  default: "bg-card text-foreground",
  accent: "bg-accent text-accent-foreground border-accent",
  danger: "bg-destructive text-white border-destructive",
};

/** Action buttons: diamond cluster of large touch targets for primary game actions. */
export function ActionButtons({
  buttons = [
    { id: "a", label: "Attack", glyph: "A", tone: "accent" },
    { id: "b", label: "Block", glyph: "B" },
    { id: "x", label: "Interact", glyph: "X" },
    { id: "y", label: "Jump", glyph: "Y" },
  ],
  onAction,
  className,
  ...props
}: ActionButtonsProps) {
  const [pressed, setPressed] = React.useState<string | null>(null);
  return (
    <div
      role="group"
      aria-label="Action buttons"
      className={cn("grid w-fit touch-none select-none grid-cols-2 gap-2", className)}
      style={{ touchAction: "none" }}
      {...props}
    >
      {buttons.map((b) => (
        <button
          key={b.id}
          type="button"
          aria-label={b.label}
          title={b.label}
          style={{ touchAction: "none" }}
          className={cn(
            "flex size-11 touch-none flex-col items-center justify-center rounded-full border-2 border-foreground shadow-md transition-transform active:scale-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none",
            tones[b.tone ?? "default"],
            pressed === b.id && "scale-90"
          )}
          onPointerDown={() => {
            setPressed(b.id);
            onAction?.(b.id);
          }}
          onPointerUp={() => setPressed(null)}
          onPointerLeave={() => setPressed(null)}
        >
          <span aria-hidden="true" className="font-mono text-sm font-black leading-none">
            {b.glyph ?? b.label.slice(0, 1).toUpperCase()}
          </span>
        </button>
      ))}
    </div>
  );
}
