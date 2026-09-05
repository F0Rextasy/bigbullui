"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export type ResultStatus = "success" | "error" | "warning" | "info";

export type ResultProps = {
  status: ResultStatus;
  title: string;
  description?: string;
  actions?: React.ReactNode;
};

function getIconClass(status: ResultStatus): string {
  switch (status) {
    case "success":
      return "bg-success/10 text-success border-border";
    case "error":
      return "bg-destructive/10 text-destructive border-destructive";
    case "warning":
      return "bg-warning/10 text-warning border-yellow-500/50";
    case "info":
      return "bg-primary/10 text-primary border-primary";
  }
}

function getLabel(status: ResultStatus): string {
  switch (status) {
    case "success":
      return "Done";
    case "error":
      return "Failed";
    case "warning":
      return "Warning";
    case "info":
      return "Info";
  }
}

export function Result({ status, title, description, actions }: ResultProps) {
  const iconClass = getIconClass(status);
  const label = getLabel(status);

  return (
    <div
      className={cn(
        "max-w-md mx-auto rounded-lg border border-border p-8 bg-card",
        "motion-reduce:animate-none",
      )}
    >
      <div className={cn("flex items-center justify-center mb-6", "motion-reduce:animate-none")}>
        <div
          className={cn(
            "w-14 h-14 rounded-full flex items-center justify-center",
            iconClass,
            "border-2 border-border",
            "motion-reduce:animate-none",
          )}
        >
          {status === "success" ? (
            <svg
              className={cn("w-6 h-6 text-success", "motion-reduce:animate-none")}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          ) : status === "error" ? (
            <svg
              className={cn("w-6 h-6 text-destructive", "motion-reduce:animate-none")}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          ) : status === "warning" ? (
            <svg
              className={cn("w-6 h-6 text-warning", "motion-reduce:animate-none")}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
          ) : (
            <svg
              className={cn("w-6 h-6 text-primary", "motion-reduce:animate-none")}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="15" y1="9" x2="9" y2="15"></line>
              <line x1="9" y1="15" x2="15" y2="9"></line>
            </svg>
          )}
        </div>
      </div>

      <h3 className={cn("text-xl font-semibold tracking-tight", "motion-reduce:animate-none")}>
        {title}
      </h3>
      {description && (
        <p className={cn("text-sm text-muted-foreground mt-2", "motion-reduce:animate-none")}>
          {description}
        </p>
      )}
      {actions && (
        <div className={cn("mt-6 flex justify-end", "motion-reduce:animate-none")}>
          {actions}
        </div>
      )}
    </div>
  );
}