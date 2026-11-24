"use client";

import * as React from "react";
import { CodeBox, type CodeLanguage } from "@/components/site/code-box";
import { cn } from "@/components/ui/lib/utils";

export type SourceFileEntry = {
  path: string;
  code: string;
  language?: CodeLanguage;
};

export function SourceFileTabs({ files }: { files: SourceFileEntry[] }) {
  const [selected, setSelected] = React.useState(0);
  if (files.length === 0) return null;

  const active = files[selected] ?? files[0];

  if (files.length === 1) {
    return (
      <CodeBox
        code={active.code}
        block
        maxHeight="420px"
        filename={active.path}
        language={active.language ?? (active.path.endsWith(".ts") ? "ts" : "tsx")}
      />
    );
  }

  return (
    <div className="space-y-2">
      <div
        role="tablist"
        aria-label="Component source files"
        className="flex flex-wrap gap-1.5"
      >
        {files.map((file, idx) => (
          <button
            key={file.path}
            type="button"
            role="tab"
            aria-selected={idx === selected}
            onClick={() => setSelected(idx)}
            className={cn(
              "cursor-pointer rounded-md border px-2.5 py-1 font-mono text-[11px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              idx === selected
                ? "border-foreground bg-primary font-semibold text-primary-foreground"
                : "border-border bg-card text-muted-foreground hover:border-foreground/60 hover:text-foreground"
            )}
          >
            {file.path}
          </button>
        ))}
      </div>
      <CodeBox
        code={active.code}
        block
        maxHeight="420px"
        filename={active.path}
        language={active.language ?? (active.path.endsWith(".ts") ? "ts" : "tsx")}
      />
    </div>
  );
}
