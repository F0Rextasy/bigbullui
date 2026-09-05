"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface TextareaAutosizeProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  minHeight?: number;
  maxHeight?: number;
}

/** İçeriğe göre büyüyen textarea. */
export function TextareaAutosize({ minHeight = 60, maxHeight = 300, className, ...props }: TextareaAutosizeProps) {
  const ref = React.useRef<HTMLTextAreaElement>(null);

  const resize = () => {
    const el = ref.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(maxHeight, Math.max(minHeight, el.scrollHeight))}px`;
  };

  React.useEffect(resize, [props.value, defaultValue_prop(props)]);

  return (
    <textarea
      ref={ref}
      onInput={resize}
      className={cn(
        "w-full resize-none rounded-md border border-input bg-background px-3 py-2 text-sm leading-relaxed",
        "transition-colors motion-reduce:transition-none",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        className
      )}
      style={{ minHeight, maxHeight: maxHeight, overflow: "auto" }}
      {...props}
    />
  );
}

function defaultValue_prop(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return props.defaultValue;
}
