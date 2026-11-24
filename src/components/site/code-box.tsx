"use client";

import * as React from "react";
import { CopyButton } from "@/components/ui/copy-button";

export type CodeLanguage = "tsx" | "ts" | "css" | "bash" | "json" | "text";

type TokenKind = "plain" | "comment" | "string" | "keyword" | "tag" | "number" | "flag";
type Token = { kind: TokenKind; text: string };

const KEYWORDS = new Set([
  "import", "from", "export", "default", "function", "return", "const", "let", "var",
  "type", "interface", "extends", "implements", "async", "await", "if", "else",
  "for", "of", "in", "while", "switch", "case", "break", "new", "try", "catch",
  "finally", "throw", "true", "false", "null", "undefined", "as", "typeof", "void",
]);

const BASH_CMDS = new Set([
  "npx", "npm", "pnpm", "yarn", "bun", "bunx", "dlx", "add", "install", "init",
  "update", "diff", "remove", "info", "node", "git", "claude", "mcp", "echo",
]);

function inferLanguage(code: string): CodeLanguage {
  const t = code.trimStart();
  if (/^(npx|npm|pnpm|yarn|bun|bunx|claude|git|node|echo)\s/.test(t)) return "bash";
  if (/^(@import|:root|\.dark|\/\*[\s\S]*\*\/\s*(@import|:root))/.test(t)) return "css";
  if (t.startsWith("{") && !t.includes("return (") && /"\w+":/.test(t)) return "json";
  return "tsx";
}

function tokenizeLine(line: string, lang: CodeLanguage): Token[] {
  if (lang === "text") return [{ kind: "plain", text: line }];
  const tokens: Token[] = [];
  let i = 0;

  const push = (kind: TokenKind, text: string) => {
    if (!text) return;
    const prev = tokens[tokens.length - 1];
    if (prev && prev.kind === kind) prev.text += text;
    else tokens.push({ kind, text });
  };

  while (i < line.length) {
    // Line comments
    if ((lang !== "bash" && line.startsWith("//", i)) || (lang === "bash" && line[i] === "#" && (i === 0 || /\s/.test(line[i - 1])))) {
      push("comment", line.slice(i));
      break;
    }
    if (line.startsWith("/*", i)) {
      const end = line.indexOf("*/", i + 2);
      if (end !== -1) {
        push("comment", line.slice(i, end + 2));
        i = end + 2;
        continue;
      }
      push("comment", line.slice(i));
      break;
    }

    // Strings & template literals (single line slice)
    const ch = line[i];
    if (ch === '"' || ch === "'" || ch === "`") {
      let j = i + 1;
      while (j < line.length) {
        if (line[j] === "\\") {
          j += 2;
          continue;
        }
        if (line[j] === ch) {
          j += 1;
          break;
        }
        j += 1;
      }
      push("string", line.slice(i, j));
      i = j;
      continue;
    }

    // CLI flags (--flag / -f)
    if (lang === "bash" && ch === "-" && /[a-zA-Z0-9-]/.test(line[i + 1] ?? "") && (i === 0 || /\s/.test(line[i - 1]))) {
      const m = line.slice(i).match(/^--?[a-zA-Z0-9-]+/);
      if (m) {
        push("flag", m[0]);
        i += m[0].length;
        continue;
      }
    }

    // CSS custom property / @at-rule
    if (lang === "css" && (line.startsWith("--", i) || ch === "@")) {
      const m = line.slice(i).match(/^(?:--[a-zA-Z0-9-]+|@[a-zA-Z0-9-]+)/);
      if (m) {
        push(ch === "@" ? "keyword" : "tag", m[0]);
        i += m[0].length;
        continue;
      }
    }

    // JSX component or tag names (<Button, </Dialog>, etc.)
    if ((lang === "tsx" || lang === "ts") && ch === "<") {
      const m = line.slice(i).match(/^<\/?([A-Za-z][A-Za-z0-9_.]*)/);
      if (m) {
        push("plain", line[i + 1] === "/" ? "</" : "<");
        push("tag", m[1]);
        i += (line[i + 1] === "/" ? 2 : 1) + m[1].length;
        continue;
      }
    }

    // Hex colors in CSS / TSX
    if (ch === "#") {
      const m = line.slice(i).match(/^#[0-9a-fA-F]{3,8}\b/);
      if (m) {
        push("string", m[0]);
        i += m[0].length;
        continue;
      }
    }

    // Numbers
    if (/[0-9]/.test(ch) && (i === 0 || !/[a-zA-Z0-9_$]/.test(line[i - 1]))) {
      const m = line.slice(i).match(/^\d+(?:\.\d+)?(?:rem|px|ms|s|%|kb)?\b/);
      if (m) {
        push("number", m[0]);
        i += m[0].length;
        continue;
      }
    }

    // Identifiers & keywords
    if (/[A-Za-z_$]/.test(ch)) {
      const m = line.slice(i).match(/^[A-Za-z_$][A-Za-z0-9_$-]*/);
      if (m) {
        const word = m[0];
        if (lang === "bash") {
          push(BASH_CMDS.has(word) ? "keyword" : "plain", word);
        } else if (KEYWORDS.has(word)) {
          push("keyword", word);
        } else if (/^[A-Z][A-Za-z0-9_]*$/.test(word)) {
          push("tag", word);
        } else {
          push("plain", word);
        }
        i += word.length;
        continue;
      }
    }

    push("plain", ch);
    i += 1;
  }

  return tokens.length > 0 ? tokens : [{ kind: "plain", text: "" }];
}

const TOKEN_CLASSES: Record<TokenKind, string> = {
  plain: "text-foreground",
  comment: "italic text-muted-foreground",
  string: "text-emerald-800 dark:text-emerald-300",
  keyword: "font-medium text-accent-strong",
  tag: "text-sky-800 dark:text-sky-300",
  number: "text-amber-900 dark:text-amber-300",
  flag: "text-purple-800 dark:text-purple-300",
};

const COLLAPSE_THRESHOLD = 28;

export function CodeBox({
  code,
  maxHeight,
  block,
  language,
  showLineNumbers,
  collapsible = true,
  filename,
}: {
  code: string;
  maxHeight?: string;
  block?: boolean;
  language?: CodeLanguage;
  showLineNumbers?: boolean;
  collapsible?: boolean;
  filename?: string;
}) {
  const [expanded, setExpanded] = React.useState(false);
  const lang = language ?? inferLanguage(code);

  const lines = React.useMemo(() => code.replace(/\r\n/g, "\n").split("\n"), [code]);
  const isLong = Boolean(block && collapsible && lines.length > COLLAPSE_THRESHOLD);
  const visibleLines = isLong && !expanded ? lines.slice(0, 18) : lines;
  const withNumbers = showLineNumbers ?? Boolean(block);

  if (!block) {
    const tokens = tokenizeLine(code, lang);
    return (
      <span className="relative inline-flex min-w-0 max-w-full items-center gap-2 overflow-hidden rounded-md border-2 border-dashed border-foreground/30 bg-card px-3 py-2">
        <code className="min-w-0 flex-1 truncate font-mono text-[13px] text-foreground">
          {tokens.map((tok, idx) => (
            <span key={idx} className={TOKEN_CLASSES[tok.kind]}>
              {tok.text}
            </span>
          ))}
        </code>
        <CopyButton value={code} />
      </span>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-md border-2 border-dashed border-foreground/30 bg-card">
      <div className="flex items-center justify-between gap-2 border-b border-dashed border-border/80 bg-secondary/35 px-3 py-2">
        <div className="flex min-w-0 items-center gap-2">
          <span className="rounded border border-border bg-background px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
            {lang}
          </span>
          {filename ? (
            <span className="truncate font-mono text-[11px] text-foreground">{filename}</span>
          ) : null}
          <span className="font-mono text-[10px] tabular-nums text-muted-foreground">
            {lines.length} line{lines.length === 1 ? "" : "s"}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          {isLong ? (
            <button
              type="button"
              onClick={() => setExpanded((e) => !e)}
              className="cursor-pointer rounded border border-border bg-background px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground transition-colors hover:border-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {expanded ? "Collapse" : `Expand (${lines.length})`}
            </button>
          ) : null}
          <CopyButton value={code} />
        </div>
      </div>
      <pre
        tabIndex={0}
        aria-label={filename ? `${filename} code sample` : "Code sample, scrollable"}
        className="overflow-x-auto p-3 font-mono text-[13px] leading-relaxed text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
        style={maxHeight && (!isLong || expanded) ? { maxHeight, overflowY: "auto" } : undefined}
      >
        <code className="block min-w-max">
          {visibleLines.map((line, lineIdx) => {
            const tokens = tokenizeLine(line, lang);
            return (
              <span key={lineIdx} className="flex">
                {withNumbers ? (
                  <span
                    aria-hidden="true"
                    className="me-4 inline-block w-7 shrink-0 select-none text-end text-[11px] text-muted-foreground"
                  >
                    {lineIdx + 1}
                  </span>
                ) : null}
                <span className="whitespace-pre">
                  {tokens.map((tok, tokIdx) => (
                    <span key={tokIdx} className={TOKEN_CLASSES[tok.kind]}>
                      {tok.text}
                    </span>
                  ))}
                  {line.length === 0 ? " " : null}
                </span>
              </span>
            );
          })}
        </code>
      </pre>
      {isLong && !expanded ? (
        <div className="flex justify-center border-t border-dashed border-border bg-secondary/30 py-2">
          <button
            type="button"
            onClick={() => setExpanded(true)}
            className="cursor-pointer rounded-md border border-border bg-background px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-foreground transition-colors hover:border-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Show remaining {lines.length - visibleLines.length} lines
          </button>
        </div>
      ) : null}
    </div>
  );
}
