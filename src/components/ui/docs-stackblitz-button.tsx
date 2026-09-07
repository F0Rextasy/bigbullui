"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface DocsStackblitzButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  componentName?: string;
  files?: Record<string, string>;
}

/** Docs button opening the stub example in StackBlitz. */
export function DocsStackblitzButton({ componentName = "button", files, className, ...props }: DocsStackblitzButtonProps) {
  const open = () => {
    const code = files?.["App.tsx"] ?? `import { Button } from "./${componentName}";\n\nexport default function App() {\n  return <Button>Admit one</Button>;\n}`;
    const params = new URLSearchParams({ "file": "App.tsx", "code": code });
    window.open(`https://stackblitz.com/fork/react?${params.toString()}`, "_blank", "noopener");
  };
  return (
    <div className={cn("flex items-center gap-2", className)} {...props}>
      <button
        type="button"
        onClick={open}
        className="rounded-md border-2 border-foreground bg-accent px-3 py-1.5 font-mono text-[11px] font-bold uppercase text-accent-foreground shadow-md transition-transform hover:-translate-y-px active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        Open in StackBlitz
      </button>
      <span className="font-mono text-[10px] uppercase text-muted-foreground">Try {componentName} live</span>
    </div>
  );
}
