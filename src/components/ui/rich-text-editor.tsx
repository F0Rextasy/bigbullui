"use client";

import * as React from "react";
import { cn, isSafeUrl } from "./lib/utils";

const ALLOWED_TAGS = new Set([
  "B", "STRONG", "I", "EM", "U", "S", "STRIKE",
  "P", "BR", "DIV", "SPAN", "H1", "H2", "H3", "H4",
  "UL", "OL", "LI", "BLOCKQUOTE", "PRE", "CODE", "A",
]);

function appendSanitizedNodes(source: Node, target: Node, doc: Document): void {
  for (const child of Array.from(source.childNodes)) {
    if (child.nodeType === 3) {
      target.appendChild(doc.createTextNode(child.textContent ?? ""));
      continue;
    }
    if (child.nodeType !== 1) continue;
    const el = child as Element;
    const tag = el.tagName.toUpperCase();
    if (tag === "SCRIPT" || tag === "STYLE" || tag === "IFRAME" || tag === "OBJECT" || tag === "EMBED") {
      continue;
    }
    if (!ALLOWED_TAGS.has(tag)) {
      appendSanitizedNodes(el, target, doc);
      continue;
    }
    const clean = doc.createElement(tag.toLowerCase());
    if (tag === "A") {
      const href = el.getAttribute("href") ?? "";
      if (isSafeUrl(href)) {
        clean.setAttribute("href", href.trim());
        clean.setAttribute("rel", "noopener noreferrer");
      }
    }
    appendSanitizedNodes(el, clean, doc);
    target.appendChild(clean);
  }
}

function applySanitizedHtml(target: HTMLElement, rawHtml: string): void {
  const sanitizedHost = target as HTMLElement & { setHTML?: (html: string) => void };
  if ("setHTML" in Element.prototype && typeof sanitizedHost.setHTML === "function") {
    sanitizedHost.setHTML(rawHtml);
    return;
  }
  const doc = target.ownerDocument;
  const parsed = new DOMParser().parseFromString(rawHtml, "text/html");
  const frag = doc.createDocumentFragment();
  appendSanitizedNodes(parsed.body, frag, doc);
  target.replaceChildren(frag);
}

/**
 * RichTextEditor - minimal contentEditable editor with toolbar
 */
export interface RichTextEditorProps {
  value?: string;
  defaultValue?: string;
  onValueChange?: (html: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export const RichTextEditor = React.forwardRef<HTMLDivElement, RichTextEditorProps>(
  function RichTextEditor(props, ref) {
    const {
      value: controlledValue,
      defaultValue,
      onValueChange,
      placeholder,
      disabled,
      className,
    } = props;

    const [internalValue, setInternalValue] = React.useState<string>(defaultValue ?? "");
    const isControlled = controlledValue !== undefined;
    const value = isControlled ? controlledValue : internalValue;
    const editorRef = React.useRef<HTMLDivElement>(null);

    // Sync initial and external sanitized HTML into the contentEditable DOM node
    // without overwriting DOM while the user is actively typing.
    React.useEffect(() => {
      const el = editorRef.current;
      if (!el || document.activeElement === el) return;
      if (el.innerHTML !== value) {
        applySanitizedHtml(el, value);
      }
    }, [value]);

    const syncFromDom = React.useCallback(() => {
      const html = editorRef.current?.innerHTML ?? "";
      if (!isControlled) setInternalValue(html);
      onValueChange?.(html);
    }, [isControlled, onValueChange]);

    const runCmd = React.useCallback(
      (command: string, val?: string) => {
        if (disabled) return;
        editorRef.current?.focus();
        document.execCommand(command, false, val);
        syncFromDom();
      },
      [disabled, syncFromDom]
    );

    const toolbarItems: { label: string; title: string; onClick: () => void }[] = [
      { label: "B", title: "Bold (Ctrl+B)", onClick: () => runCmd("bold") },
      { label: "I", title: "Italic (Ctrl+I)", onClick: () => runCmd("italic") },
      { label: "U", title: "Underline (Ctrl+U)", onClick: () => runCmd("underline") },
      { label: "S", title: "Strike", onClick: () => runCmd("strikeThrough") },
      { label: "H2", title: "Heading 2", onClick: () => runCmd("formatBlock", "H2") },
      { label: "H3", title: "Heading 3", onClick: () => runCmd("formatBlock", "H3") },
      { label: "•", title: "Bullet list", onClick: () => runCmd("insertUnorderedList") },
      { label: "1", title: "Numbered list", onClick: () => runCmd("insertOrderedList") },
      {
        label: "Link",
        title: "Link",
        onClick: () => {
          if (disabled) return;
          const url = prompt("Enter URL");
          if (url && isSafeUrl(url)) {
            runCmd("createLink", url.trim());
          }
        },
      },
      { label: '"', title: "Quote", onClick: () => runCmd("formatBlock", "blockquote") },
      { label: "C", title: "Code block", onClick: () => runCmd("formatBlock", "pre") },
    ];

    return (
      <div
        ref={ref}
        className={cn(
          "relative w-full motion-reduce:transition-none",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          className
        )}
      >
        {/* Toolbar */}
        <div
          className={cn(
            "border border-border bg-card mb-2",
            "motion-reduce:transition-none",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          )}
        >
          <div className="flex flex-wrap gap-1 p-1">
            {toolbarItems.map((item) => (
              <button
                key={item.title}
                type="button"
                disabled={disabled}
                onMouseDown={(e) => e.preventDefault()}
                onClick={item.onClick}
                className="px-2 py-1 rounded-sm text-xs font-mono hover:bg-secondary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                title={item.title}
                aria-label={item.title}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content editable area */}
        <div
          ref={editorRef}
          className={cn(
            "min-h-[200px] p-3 text-sm text-foreground break-words outline-none border border-border bg-background",
            "motion-reduce:transition-none",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            disabled && "opacity-50 cursor-not-allowed",
          )}
          contentEditable={!disabled}
          suppressContentEditableWarning
          onInput={(e) => {
            const html = e.currentTarget.innerHTML;
            if (!isControlled) setInternalValue(html);
            onValueChange?.(html);
          }}
          data-placeholder={placeholder || ""}
          role="textbox"
          aria-multiline="true"
          aria-label={placeholder || "Rich text editor"}
        />

        {/* Word/char counter */}
        <div className="text-xs text-muted-foreground mt-1 font-mono">
          {value.replace(/<[^>]*>/g, "").length} chars
        </div>
      </div>
    );
  },
);
RichTextEditor.displayName = "RichTextEditor";
