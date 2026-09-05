"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export type CodeBlockVariant = "default" | "terminal" | "ticket";

export type CodeBlockProps = Omit<React.HTMLAttributes<HTMLDivElement>, "onCopy"> & {
  /** The code string to display */
  code: string;
  /** Programming language or format (e.g. 'tsx', 'bash', 'json', 'rust') */
  language?: string;
  /** Filename or terminal title shown in the header tab */
  filename?: string;
  /** Whether to show line numbers initially (default: true) */
  showLineNumbers?: boolean;
  /** Whether user can click to toggle line numbers on/off (default: true) */
  allowToggleLineNumbers?: boolean;
  /** Specific 1-indexed line numbers to highlight */
  highlightLines?: number[];
  /** Visual variant: 'default' | 'terminal' | 'ticket' */
  variant?: CodeBlockVariant;
  /** Whether to wrap lines instead of horizontal scroll (default: false) */
  wordWrap?: boolean;
  /** Whether user can click to toggle word wrap (default: true) */
  allowToggleWordWrap?: boolean;
  /** Milliseconds before copied feedback reverts (default: 2000) */
  copyTimeout?: number;
  /** Optional max height for code content (e.g. '400px') */
  maxHeight?: string | number;
  /** Whether to render ticket punch notches on the perforation edge (default: true) */
  showNotches?: boolean;
  /** Ticket stub serial or reference label */
  serial?: string;
  /** Callback triggered when code is successfully copied */
  onCopy?: (code: string) => void;
}

/** Lightweight regex tokenizer (no parser dependency) for syntax highlighting */
function tokenizeLine(line: string, isTerminal: boolean): React.ReactNode {
  if (!line) {
    return " ";
  }

  // Terminal prompt highlighting
  if (isTerminal) {
    const promptMatch = line.match(/^(\$|>|#)\s+(.*)$/);
    if (promptMatch) {
      const [, promptSymbol, command] = promptMatch;
      return (
        <>
          <span className="select-none font-bold text-accent mr-2">{promptSymbol}</span>
          <span className="font-semibold text-foreground">{command}</span>
        </>
      );
    }
  }

  // Comments
  if (/^\s*(\/\/|#|\/\*)/.test(line)) {
    return <span className="italic text-muted-foreground/80">{line}</span>;
  }

  // Token pattern matching strings, keywords, numbers, and identifiers
  const tokenRegex = /("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`)|(\b(?:import|export|from|as|default|const|let|var|function|return|if|else|switch|case|break|for|while|do|continue|try|catch|finally|throw|new|class|extends|implements|interface|type|enum|public|private|protected|readonly|static|async|await|yield|typeof|instanceof|void|null|undefined|true|false|boolean|number|string|any|never|unknown|npm|pnpm|bun|yarn|npx|git|cd|docker|install|run|build)\b)|(\b\d+(?:\.\d+)?\b)|([{}()[\].,;:?+\-*/%<>!&|^~=]+)/g;

  const parts: React.ReactNode[] = [];
  let lastIdx = 0;
  let match: RegExpExecArray | null = null;
  let keyIndex = 0;

  while ((match = tokenRegex.exec(line)) !== null) {
    const [fullMatch, strToken, kwToken, numToken, punctToken] = match;
    const matchStart = match.index;

    // Plain text before token
    if (matchStart > lastIdx) {
      parts.push(
        <span key={`text-${keyIndex++}`} className="text-foreground">
          {line.substring(lastIdx, matchStart)}
        </span>
      );
    }

    if (strToken) {
      parts.push(
        <span key={`str-${keyIndex++}`} className="text-accent-strong dark:text-accent font-medium">
          {strToken}
        </span>
      );
    } else if (kwToken) {
      parts.push(
        <span key={`kw-${keyIndex++}`} className="font-bold text-foreground tracking-tight">
          {kwToken}
        </span>
      );
    } else if (numToken) {
      parts.push(
        <span key={`num-${keyIndex++}`} className="text-accent font-medium">
          {numToken}
        </span>
      );
    } else if (punctToken) {
      parts.push(
        <span key={`punct-${keyIndex++}`} className="text-muted-foreground font-semibold">
          {punctToken}
        </span>
      );
    }

    lastIdx = tokenRegex.lastIndex;
  }

  if (lastIdx < line.length) {
    parts.push(
      <span key={`tail-${keyIndex++}`} className="text-foreground">
        {line.substring(lastIdx)}
      </span>
    );
  }

  return parts;
}

export function CodeBlock({
  code,
  language = "tsx",
  filename,
  showLineNumbers = true,
  allowToggleLineNumbers = true,
  highlightLines = [],
  variant = "default",
  wordWrap = false,
  allowToggleWordWrap = true,
  copyTimeout = 2000,
  maxHeight,
  showNotches = true,
  serial = "STUB-DEV-01",
  onCopy,
  className,
  ...props
}: CodeBlockProps) {
  const [copied, setCopied] = React.useState(false);
  const [hasLineNumbers, setHasLineNumbers] = React.useState(showLineNumbers);
  const [isWordWrap, setIsWordWrap] = React.useState(wordWrap);

  const lines = React.useMemo(() => {
    return code ? code.replace(/\r\n/g, "\n").split("\n") : [""];
  }, [code]);

  const handleCopy = async () => {
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(code);
      }
      setCopied(true);
      onCopy?.(code);
      setTimeout(() => setCopied(false), copyTimeout);
    } catch {
      // Fallback if clipboard API unavailable
      setCopied(true);
      setTimeout(() => setCopied(false), copyTimeout);
    }
  };

  const isTerminal = variant === "terminal" || /^(bash|sh|zsh|shell|cmd|powershell)$/i.test(language);
  const displayTitle = filename || (isTerminal ? "terminal.sh" : `snippet.${language.toLowerCase()}`);

  return (
    <div
      className={cn(
        "relative flex flex-col overflow-hidden rounded-lg border-2 border-foreground bg-card text-card-foreground shadow-sm select-text",
        className
      )}
      {...props}
    >
      {/* Top Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-foreground bg-secondary/70 px-3 py-2 sm:px-4">
        {/* Left: Tab with Icon & Filename */}
        <div className="flex items-center gap-2 min-w-0">
          {/* Terminal / Stub LED Dots */}
          <div className="flex items-center gap-1.5 shrink-0" aria-hidden="true">
            <span className="size-2.5 rounded-full border border-foreground/40 bg-accent" />
            <span className="size-2.5 rounded-full border border-foreground/40 bg-foreground/20" />
            <span className="size-2.5 rounded-full border border-foreground/40 bg-foreground/20" />
          </div>

          {/* Filename Tab */}
          <div className="flex items-center gap-1.5 rounded-sm border border-dashed border-foreground/40 bg-card px-2 py-0.5 min-w-0">
            {isTerminal ? (
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="shrink-0 text-accent"
                aria-hidden="true"
              >
                <polyline points="4 17 10 12 4 7" />
                <line x1="12" y1="19" x2="20" y2="19" />
              </svg>
            ) : (
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="shrink-0 text-muted-foreground"
                aria-hidden="true"
              >
                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                <polyline points="14 2 14 8 20 8" />
              </svg>
            )}
            <span className="font-mono text-xs font-bold text-foreground truncate tracking-wide">
              {displayTitle}
            </span>
          </div>

          {/* Language Badge */}
          <span className="rounded-sm border border-border bg-secondary px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-widest text-muted-foreground shrink-0">
            {language}
          </span>
        </div>

        {/* Right: Actions Toolbar */}
        <div className="flex items-center gap-1.5 shrink-0">
          {/* Toggle Line Numbers */}
          {allowToggleLineNumbers && (
            <button
              type="button"
              onClick={() => setHasLineNumbers((prev) => !prev)}
              aria-label={hasLineNumbers ? "Hide line numbers" : "Show line numbers"}
              aria-pressed={hasLineNumbers}
              className={cn(
                "inline-flex cursor-pointer items-center gap-1 rounded-sm border px-2 py-1 font-mono text-[11px] font-medium transition-colors duration-150 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                hasLineNumbers
                  ? "border-foreground bg-card text-foreground"
                  : "border-border bg-secondary/50 text-muted-foreground hover:bg-card hover:text-foreground"
              )}
            >
              <span className="font-bold">#</span>
              <span className="hidden sm:inline">LINES</span>
            </button>
          )}

          {/* Toggle Word Wrap */}
          {allowToggleWordWrap && (
            <button
              type="button"
              onClick={() => setIsWordWrap((prev) => !prev)}
              aria-label={isWordWrap ? "Disable word wrap" : "Enable word wrap"}
              aria-pressed={isWordWrap}
              className={cn(
                "inline-flex cursor-pointer items-center gap-1 rounded-sm border px-2 py-1 font-mono text-[11px] font-medium transition-colors duration-150 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                isWordWrap
                  ? "border-foreground bg-card text-foreground"
                  : "border-border bg-secondary/50 text-muted-foreground hover:bg-card hover:text-foreground"
              )}
            >
              <svg
                width="11"
                height="11"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M3 6h18M3 12h15a3 3 0 1 1 0 6h-4M14 15l-3 3 3 3M3 18h7" />
              </svg>
              <span className="hidden sm:inline">WRAP</span>
            </button>
          )}

          {/* Copy Button */}
          <button
            type="button"
            onClick={handleCopy}
            aria-label={copied ? "Copied to clipboard" : "Copy code snippet"}
            className={cn(
              "inline-flex cursor-pointer items-center gap-1.5 rounded-sm border px-2.5 py-1 font-mono text-[11px] font-bold tracking-wider uppercase transition-all duration-150 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              copied
                ? "border-accent bg-accent text-accent-foreground shadow-xs animate-in zoom-in-95"
                : "border-foreground/80 bg-foreground text-card hover:bg-foreground/90"
            )}
          >
            {copied ? (
              <>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>COPIED</span>
              </>
            ) : (
              <>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                  <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                </svg>
                <span>COPY</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Perforation Divider with Punch Notches */}
      <div className="relative flex items-center justify-between border-b-2 border-dashed border-border bg-secondary/40 px-4 py-1">
        {showNotches && (
          <div
            className="absolute -left-2.5 top-1/2 -translate-y-1/2 size-4 rounded-full bg-background border-2 border-foreground z-10"
            aria-hidden="true"
          />
        )}
        <div className="flex items-center gap-2 font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
          <span>{serial}</span>
          <span className="opacity-40">/</span>
          <span>{lines.length} {lines.length === 1 ? "LINE" : "LINES"}</span>
        </div>
        <div className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
          STUB CODEPASS
        </div>
        {showNotches && (
          <div
            className="absolute -right-2.5 top-1/2 -translate-y-1/2 size-4 rounded-full bg-background border-2 border-foreground z-10"
            aria-hidden="true"
          />
        )}
      </div>

      {/* Code Body */}
      <div
        className="relative flex-1 overflow-auto font-mono text-xs sm:text-[13px] leading-relaxed p-4"
        style={maxHeight ? { maxHeight } : undefined}
        tabIndex={0}
        role="region"
        aria-label={`${displayTitle} code content`}
      >
        <pre
          className={cn(
            "m-0 font-mono",
            isWordWrap ? "whitespace-pre-wrap break-words" : "whitespace-pre overflow-x-auto"
          )}
        >
          <code>
            {lines.map((line, index) => {
              const lineNum = index + 1;
              const isHighlighted = highlightLines.includes(lineNum);

              return (
                <div
                  key={lineNum}
                  className={cn(
                    "flex items-baseline py-0.5 px-2 -mx-2 transition-colors duration-100",
                    isHighlighted && "bg-accent/15 border-l-2 border-accent text-accent-foreground font-medium",
                    !isHighlighted && "hover:bg-secondary/40"
                  )}
                >
                  {hasLineNumbers && (
                    <span
                      className="select-none min-w-[2.2rem] pr-3 text-right font-mono text-[11px] text-muted-foreground/60 border-r border-dashed border-border/80 mr-3 shrink-0"
                      aria-hidden="true"
                    >
                      {lineNum}
                    </span>
                  )}
                  <span className="flex-1 min-w-0">
                    {tokenizeLine(line, isTerminal)}
                  </span>
                </div>
              );
            })}
          </code>
        </pre>
      </div>

      {/* Ticket Footer Stub Receipt */}
      <div className="relative flex items-center justify-between border-t-2 border-dashed border-border bg-secondary/30 px-3 py-1.5 sm:px-4">
        {showNotches && (
          <div
            className="absolute -left-2.5 top-1/2 -translate-y-1/2 size-3.5 rounded-full bg-background border-2 border-foreground z-10"
            aria-hidden="true"
          />
        )}
        <div className="flex items-center gap-3 font-mono text-[10px] text-muted-foreground">
          <span className="flex items-center gap-1">
            <span className="size-1.5 rounded-full bg-accent" />
            UTF-8
          </span>
          <span className="hidden sm:inline opacity-60">·</span>
          <span className="hidden sm:inline">
            {code.length} CHARS
          </span>
        </div>

        {/* Mini Ticket Barcode Mark */}
        <div className="flex items-center gap-0.5 select-none opacity-70" aria-hidden="true">
          <span className="h-3 w-0.5 bg-foreground" />
          <span className="h-3 w-1 bg-foreground" />
          <span className="h-3 w-0.5 bg-foreground" />
          <span className="h-3 w-1.5 bg-foreground" />
          <span className="h-3 w-0.5 bg-foreground" />
          <span className="h-3 w-1 bg-foreground" />
          <span className="h-3 w-0.5 bg-foreground" />
        </div>
        {showNotches && (
          <div
            className="absolute -right-2.5 top-1/2 -translate-y-1/2 size-3.5 rounded-full bg-background border-2 border-foreground z-10"
            aria-hidden="true"
          />
        )}
      </div>
    </div>
  );
}
