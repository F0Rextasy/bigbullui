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
 * RichTextEditor - minimal contentEditable editor with toolbar and paste sanitization
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
    const savedRangeRef = React.useRef<Range | null>(null);

    const [linkOpen, setLinkOpen] = React.useState(false);
    const [linkUrl, setLinkUrl] = React.useState("");
    const [linkError, setLinkError] = React.useState<string | null>(null);
    const linkInputRef = React.useRef<HTMLInputElement>(null);

    // Sync initial and external sanitized HTML into the contentEditable DOM node
    // without overwriting DOM while the user is actively typing.
    React.useEffect(() => {
      const el = editorRef.current;
      if (!el) return;
      if (isControlled && controlledValue === "" && el.innerHTML !== "") {
        el.replaceChildren();
        return;
      }
      if (document.activeElement === el) return;
      if (el.innerHTML !== value) {
        applySanitizedHtml(el, value);
      }
    }, [value, isControlled, controlledValue]);

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
      [disabled, syncFromDom],
    );

    const openLinkBar = React.useCallback(() => {
      if (disabled) return;
      const el = editorRef.current;
      const sel = el?.ownerDocument.defaultView?.getSelection();
      if (el && sel && sel.rangeCount > 0 && el.contains(sel.anchorNode)) {
        savedRangeRef.current = sel.getRangeAt(0).cloneRange();
      } else {
        savedRangeRef.current = null;
      }
      setLinkUrl("");
      setLinkError(null);
      setLinkOpen((prev) => !prev);
    }, [disabled]);

    React.useEffect(() => {
      if (linkOpen) linkInputRef.current?.focus();
    }, [linkOpen]);

    const applyLink = React.useCallback(() => {
      if (disabled) return;
      const trimmed = linkUrl.trim();
      if (!isSafeUrl(trimmed)) {
        setLinkError("Use a valid http(s), mailto, tel, /, or # link.");
        return;
      }
      const el = editorRef.current;
      if (!el) return;
      const doc = el.ownerDocument;
      el.focus();
      const sel = doc.defaultView?.getSelection();
      const anchor = doc.createElement("a");
      anchor.setAttribute("href", trimmed);
      anchor.setAttribute("rel", "noopener noreferrer");

      if (savedRangeRef.current && el.contains(savedRangeRef.current.startContainer)) {
        const range = savedRangeRef.current;
        if (range.collapsed) {
          anchor.textContent = trimmed;
          range.insertNode(anchor);
        } else {
          const fragment = range.extractContents();
          anchor.appendChild(fragment);
          range.insertNode(anchor);
        }
        if (sel) {
          const after = doc.createRange();
          after.setStartAfter(anchor);
          after.collapse(true);
          sel.removeAllRanges();
          sel.addRange(after);
        }
      } else {
        anchor.textContent = trimmed;
        el.appendChild(anchor);
      }

      savedRangeRef.current = null;
      setLinkOpen(false);
      setLinkUrl("");
      setLinkError(null);
      syncFromDom();
    }, [disabled, linkUrl, syncFromDom]);

    const handlePaste = React.useCallback(
      (e: React.ClipboardEvent<HTMLDivElement>) => {
        if (disabled) return;
        e.preventDefault();
        const el = editorRef.current;
        if (!el) return;
        const html = e.clipboardData.getData("text/html");
        const text = e.clipboardData.getData("text/plain");
        const doc = el.ownerDocument;
        const frag = doc.createDocumentFragment();
        if (html) {
          const parsed = new DOMParser().parseFromString(html, "text/html");
          appendSanitizedNodes(parsed.body, frag, doc);
        } else if (text) {
          frag.appendChild(doc.createTextNode(text));
        } else {
          return;
        }
        const sel = doc.defaultView?.getSelection();
        if (sel && sel.rangeCount > 0 && el.contains(sel.anchorNode)) {
          const range = sel.getRangeAt(0);
          range.deleteContents();
          const lastInserted = frag.lastChild;
          range.insertNode(frag);
          if (lastInserted) {
            range.setStartAfter(lastInserted);
            range.collapse(true);
            sel.removeAllRanges();
            sel.addRange(range);
          }
        } else {
          el.appendChild(frag);
        }
        syncFromDom();
      },
      [disabled, syncFromDom],
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
      { label: "Link", title: "Insert link", onClick: openLinkBar },
      { label: '"', title: "Quote", onClick: () => runCmd("formatBlock", "blockquote") },
      { label: "C", title: "Code block", onClick: () => runCmd("formatBlock", "pre") },
    ];

    return (
      <div
        ref={ref}
        className={cn(
          "relative w-full motion-reduce:transition-none",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          className,
        )}
      >
        <div className="mb-2 border border-border bg-card">
          <div className="flex flex-wrap gap-1 p-1">
            {toolbarItems.map((item) => (
              <button
                key={item.title}
                type="button"
                disabled={disabled}
                onMouseDown={(e) => e.preventDefault()}
                onClick={item.onClick}
                className="cursor-pointer rounded-sm px-2 py-1 font-mono text-xs hover:bg-secondary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-40"
                title={item.title}
                aria-label={item.title}
              >
                {item.label}
              </button>
            ))}
          </div>

          {linkOpen ? (
            <div className="flex flex-wrap items-center gap-2 border-t border-dashed border-border px-2 py-1.5">
              <input
                ref={linkInputRef}
                type="url"
                aria-label="Link URL"
                placeholder="https://example.com"
                value={linkUrl}
                onChange={(e) => {
                  setLinkUrl(e.target.value);
                  if (linkError) setLinkError(null);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    applyLink();
                  } else if (e.key === "Escape") {
                    e.preventDefault();
                    setLinkOpen(false);
                    setLinkError(null);
                    editorRef.current?.focus();
                  }
                }}
                className="min-w-44 flex-1 rounded border border-input bg-background px-2 py-1 font-mono text-xs text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
              <button
                type="button"
                onClick={applyLink}
                className="cursor-pointer rounded bg-primary px-2.5 py-1 font-mono text-[11px] font-bold uppercase text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                Apply
              </button>
              <button
                type="button"
                onClick={() => {
                  setLinkOpen(false);
                  setLinkError(null);
                  editorRef.current?.focus();
                }}
                className="cursor-pointer rounded border border-border px-2 py-1 font-mono text-[11px] uppercase text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                Cancel
              </button>
              {linkError ? <span className="w-full font-mono text-[11px] text-destructive">{linkError}</span> : null}
            </div>
          ) : null}
        </div>

        <div
          ref={editorRef}
          className={cn(
            "min-h-[200px] break-words border border-border bg-background p-3 text-sm text-foreground outline-none",
            "motion-reduce:transition-none",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            disabled && "cursor-not-allowed opacity-50",
          )}
          contentEditable={!disabled}
          suppressContentEditableWarning
          onPaste={handlePaste}
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

        <div className="mt-1 font-mono text-xs text-muted-foreground">
          {value.replace(/<[^>]*>/g, "").length} chars
        </div>
      </div>
    );
  },
);
RichTextEditor.displayName = "RichTextEditor";
