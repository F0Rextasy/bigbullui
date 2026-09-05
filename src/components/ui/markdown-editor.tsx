"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface MarkdownEditorProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}

/** Markdown yaz + önizleme sekmesi: basit renderer (başlık, liste, kod, link, kalın). */
function renderMarkdown(src: string): React.ReactNode {
  const lines = src.split("\n");
  const out: React.ReactNode[] = [];
  let listItems: string[] = [];
  let inCode = false;
  let codeLines: string[] = [];

  const flushList = () => {
    if (listItems.length) {
      out.push(
        <ul key={`ul-${out.length}`} className="my-2 list-disc space-y-0.5 pl-5">
          {listItems.map((li, i) => <li key={i}>{inline(li)}</li>)}
        </ul>
      );
      listItems = [];
    }
  };

  const inline = (text: string): React.ReactNode => {
    const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g);
    return parts.map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**")) return <strong key={i}>{part.slice(2, -2)}</strong>;
      if (part.startsWith("`") && part.endsWith("`")) return <code key={i} className="rounded-sm bg-secondary px-1 font-mono text-[0.9em]">{part.slice(1, -1)}</code>;
      const link = part.match(/\[([^\]]+)\]\(([^)]+)\)/);
      if (link) return <a key={i} href={link[2]} className="text-accent hover:underline">{link[1]}</a>;
      return part;
    });
  };

  for (const line of lines) {
    if (line.trim().startsWith("```")) {
      if (inCode) {
        out.push(
          <pre key={`code-${out.length}`} className="my-2 overflow-x-auto rounded-md border border-border bg-secondary/50 p-3 font-mono text-xs">
            <code>{codeLines.join("\n")}</code>
          </pre>
        );
        codeLines = [];
        inCode = false;
      } else { inCode = true; flushList(); }
      continue;
    }
    if (inCode) { codeLines.push(line); continue; }

    const heading = line.match(/^(#{1,4})\s+(.*)/);
    if (heading) {
      flushList();
      const level = heading[1].length;
      const sizes = ["text-xl font-bold", "text-lg font-bold", "text-base font-semibold", "text-sm font-semibold"];
      out.push(<p key={`h-${out.length}`} className={cn("mt-3 first:mt-0", sizes[level - 1])}>{inline(heading[2])}</p>);
      continue;
    }
    if (/^[-*]\s+/.test(line)) { listItems.push(line.replace(/^[-*]\s+/, "")); continue; }
    flushList();
    if (line.trim() === "") { out.push(<div key={`sp-${out.length}`} className="h-2" />); continue; }
    out.push(<p key={`p-${out.length}`} className="text-sm leading-relaxed">{inline(line)}</p>);
  }
  flushList();
  return out;
}

/** Markdown yaz + önizleme sekmeleri. */
export function MarkdownEditor({ value, defaultValue = "# Başlık\n\n**kalın** ve `kod`.\n\n- madde 1\n- madde 2", onValueChange, className, ...props }: MarkdownEditorProps) {
  const [internal, setInternal] = React.useState(defaultValue);
  const [tab, setTab] = React.useState<"write" | "preview">("write");
  const src = value ?? internal;

  return (
    <div className={cn("w-full overflow-hidden rounded-lg border border-border bg-card", className)} {...props}>
      <style>{`@keyframes mdIn { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } }`}</style>
      <div className="flex border-b border-border bg-secondary/60">
        {(["write", "preview"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            role="tab"
            aria-selected={tab === t}
            className={cn(
              "px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider transition-colors motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
              tab === t ? "border-b-2 border-accent text-accent" : "text-muted-foreground hover:text-foreground"
            )}
          >
            {t === "write" ? "Yaz" : "Önizle"}
          </button>
        ))}
      </div>
      <div className="min-h-40" key={tab}>
        {tab === "write" ? (
          <textarea
            value={src}
            onChange={(e) => { setInternal(e.target.value); onValueChange?.(e.target.value); }}
            aria-label="Markdown düzenleyici"
            spellCheck={false}
            className="min-h-40 w-full resize-y bg-transparent p-4 font-mono text-xs leading-5 text-foreground focus-visible:outline-none"
          />
        ) : (
          <div className="min-h-40 p-4 animate-[mdIn_0.25s_ease-out_both] motion-reduce:animate-none">
            {renderMarkdown(src)}
          </div>
        )}
      </div>
    </div>
  );
}
