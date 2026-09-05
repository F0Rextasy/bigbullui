"use client";

import * as React from "react";
import { cn } from "./lib/utils";

type JsonValue = string | number | boolean | null | JsonObject | JsonArray;
type JsonObject = { [key: string]: JsonValue };
type JsonArray = JsonValue[];

export interface JsonViewerProps extends React.HTMLAttributes<HTMLDivElement> {
  value: JsonValue;
  className?: string;
}

function renderJsonValue(
  value: JsonValue,
  depth: number,
): React.ReactNode {
  const indent = "  ".repeat(depth);

  if (value === null) {
    return (
      <span key="null" className="text-muted-foreground">
        {indent}null
      </span>
    );
  }

  if (typeof value === "boolean") {
    return (
      <span key="bool" className="text-destructive">
        {indent}{String(value)}
      </span>
    );
  }

  if (typeof value === "number") {
    return (
      <span key="num" className="text-primary-foreground">
        {indent}{String(value)}
      </span>
    );
  }

  if (typeof value === "string") {
    return (
      <span key="str" className="text-accent-foreground">
        {indent}&quot;{value.replace(/"/g, "&quot;")}&quot;
      </span>
    );
  }

  if (Array.isArray(value)) {
    return (
      <div key="arr" className={cn(
        "motion-reduce:transition-none",
        "collapse",
      )}>
        <button
          onClick={() => {/* toggle */}}
          className={cn(
            "cursor-pointer text-[10px] uppercase text-muted-foreground hover:text-foreground transition-colors",
            "flex items-center gap-1",
          )}
        >
          <svg
            width="8"
            height="8"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
          {depth > 0 ? " collapse" : ""}
        </button>
        <span className="ml-2 text-[10px] text-muted-foreground">{indent}[</span>
        {value.map((item, idx) => (
          <React.Fragment key={idx}>
            {renderJsonValue(item, depth + 1)}
          </React.Fragment>
        ))}
        <span className="ml-2 text-[10px] text-muted-foreground">{indent}]</span>
      </div>
    );
  }

  if (typeof value === "object") {
    const keys = Object.keys(value);
    return (
      <div key="obj" className={cn(
        "motion-reduce:transition-none",
        "collapse",
      )}>
        <button
          onClick={() => {/* toggle */}}
          className={cn(
            "cursor-pointer text-[10px] uppercase text-muted-foreground hover:text-foreground transition-colors",
            "flex items-center gap-1",
          )}
        >
          <svg
            width="8"
            height="8"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
          {depth > 0 ? " collapse" : ""}
        </button>
        <span className="ml-2 text-[10px] text-muted-foreground">{indent}{"{"}</span>
        {keys.map((key) => (
          <React.Fragment key={key}>
            <span className={cn("text-accent-foreground", "ml-2")}>{key}</span>
            <span className="ml-2 text-[10px] text-muted-foreground">{":"}</span>
            {renderJsonValue(value[key as keyof JsonObject], depth + 1)}
          </React.Fragment>
        ))}
        <span className="ml-2 text-[10px] text-muted-foreground">{indent}{"}"}</span>
      </div>
    );
  }

  return null;
}

export function JsonViewer({
  value,
  className,
  ...props
}: JsonViewerProps) {
  return (
    <div
      className={cn(
        "w-full rounded-md border border-border/60 bg-card p-4",
        "motion-reduce:transition-none",
        className,
      )}
      {...props}
    >
      {renderJsonValue(value, 0)}
    </div>
  );
}