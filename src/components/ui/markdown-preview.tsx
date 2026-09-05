"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface MarkdownPreviewProps extends React.HTMLAttributes<HTMLDivElement> {
  source: string;
}

/** Pure markdown to JSX renderer: headings, lists, inline code, links, bold. */
export function MarkdownPreview({ source, className, ...props }: MarkdownPreviewProps) {
  return (
    <div className={cn("max-w-none text-sm", className)} {...props}>
      {render(source)}
    </div>
  );
}

function inline(text: string): React.ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) return <strong key={i}>{part.slice(2, -2)}</strong>;
    if (part.startsWith("`") && part.endsWith("`")) return <code key={i} className="rounded-sm bg-secondary px-1 font-mono text-[0.9em]">{part.slice(1, -1)}</code>;
    const link = part.match(/\[([^\]]+)\]\(([^)]+)\)/);
    if (link) return <a key={i} href={link[2]} className="text-accent hover:underline">{link[1]}</a>;
    return part;
  });
}

function render(src: string): React.ReactNode {
  const lines = src.split("\n");
  const out: React.ReactNode[] = [];
  let list: string[] = [];
  let inCode = false;
  let codeLines: string[] = [];

  const flushList = () => {
    if (list.length) {
      out.push(<ul key={`ul-${out.length}`} className="my-2 list-disc space-y-0.5 pl-5">{list.map((li, i) => <li key={i}>{inline(li)}</li>)}</ul>);
      list = [];
    }
  };

  for (const line of lines) {
    if (line.trim().startsWith("```")) {
      if (inCode) {
        out.push(<pre key={`c-${out.length}`} className="my-2 overflow-x-auto rounded-md border border-border bg-secondary/50 p-3 font-mono text-xs"><code>{codeLines.join("\n")}</code></pre>);
        codeLines = []; inCode = false;
      } else { inCode = true; flushList(); }
      continue;
    }
    if (inCode) { codeLines.push(line); continue; }
    const h = line.match(/^(#{1,4})\s+(.*)/);
    if (h) { flushList(); const sz = ["text-xl font-bold", "text-lg font-bold", "text-base font-semibold", "text-sm font-semibold"][h[1].length - 1]; out.push(<p key={`h-${out.length}`} className={cn("mt-3 first:mt-0", sz)}>{inline(h[2])}</p>); continue; }
    if (/^[-*]\s+/.test(line)) { list.push(line.replace(/^[-*]\s+/, "")); continue; }
    flushList();
    if (line.trim() === "") { out.push(<div key={`s-${out.length}`} className="h-2" />); continue; }
    out.push(<p key={`p-${out.length}`} className="leading-relaxed">{inline(line)}</p>);
  }
  flushList();
  return out;
}
