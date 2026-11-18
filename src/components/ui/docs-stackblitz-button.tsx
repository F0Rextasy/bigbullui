"use client";

import * as React from "react";
import { cn } from "./lib/utils";

const STARTER_URL =
  "https://stackblitz.com/fork/github/F0Rextasy/bigbullui/tree/main/packages/create-app/template?file=app%2Fpage.tsx";

export interface DocsStackblitzButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  componentName?: string;
  files?: Record<string, string>;
}

/** Docs button opening the stub example in StackBlitz via POST project form or template fork. */
export function DocsStackblitzButton({ componentName = "button", files, className, ...props }: DocsStackblitzButtonProps) {
  const formRef = React.useRef<HTMLFormElement>(null);
  const open = () => {
    if (files && Object.keys(files).length > 0 && formRef.current) {
      formRef.current.submit();
      return;
    }
    window.open(STARTER_URL, "_blank", "noopener,noreferrer");
  };
  return (
    <div className={cn("flex items-center gap-2", className)} {...props}>
      {files && Object.keys(files).length > 0 ? (
        <form ref={formRef} action="https://stackblitz.com/run" method="POST" target="_blank" className="hidden" aria-hidden="true">
          <input type="hidden" name="project[template]" value="create-react-app" />
          <input type="hidden" name="project[title]" value={`bigbullui — ${componentName}`} />
          {Object.entries(files).map(([name, contents]) => (
            <input key={name} type="hidden" name={`project[files][${name}]`} value={contents} />
          ))}
        </form>
      ) : null}
      <button
        type="button"
        onClick={open}
        className="rounded-md border-2 border-foreground bg-accent px-3 py-1.5 font-mono text-[11px] font-bold uppercase text-accent-foreground shadow-md transition-transform hover:-translate-y-px active:scale-95 motion-reduce:transition-none motion-reduce:hover:translate-y-0 motion-reduce:active:scale-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        Open in StackBlitz
      </button>
      <span className="font-mono text-[10px] uppercase text-muted-foreground">Try {componentName} live</span>
    </div>
  );
}
