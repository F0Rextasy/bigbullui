"use client";

import * as React from "react";
import { cn } from "./lib/utils";

/**
 * RichTextEditor - minimal contentEditable editor with toolbar
 */
export interface RichTextEditorProps {
  value?: string;
  defaultValue?: string;
  onValueChange?: (html: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

export const RichTextEditor = React.forwardRef<HTMLDivElement, RichTextEditorProps>(
  function RichTextEditor(props, ref) {
    const {
      value: controlledValue,
      defaultValue,
      onValueChange,
      placeholder,
      disabled,
    } = props;

    const [value, setValue] = React.useState<string>(
      controlledValue ?? defaultValue ?? "",
    );
    const editorRef = React.useRef<HTMLDivElement>(null);

    // Sync initial and external controlled HTML into the contentEditable DOM node
    // without overwriting innerHTML while the user is actively typing.
    React.useEffect(() => {
      const next = controlledValue !== undefined ? controlledValue : value;
      if (controlledValue !== undefined) {
        setValue(controlledValue);
      }
      const el = editorRef.current;
      if (el && document.activeElement !== el && el.innerHTML !== next) {
        el.innerHTML = next;
      }
    }, [controlledValue, value]);

    // Toolbar handlers
    const boldHandler = () => document.execCommand("bold");
    const italicHandler = () => document.execCommand("italic");
    const underlineHandler = () => document.execCommand("underline");
    const strikeHandler = () => document.execCommand("strikeThrough");
    const heading2Handler = () => document.execCommand("formatBlock", false, "H2");
    const heading3Handler = () => document.execCommand("formatBlock", false, "H3");
    const bulletListHandler = () => document.execCommand("insertUnorderedList");
    const numberedListHandler = () => document.execCommand("insertOrderedList");
    const linkHandler = () => {
      const url = prompt("Enter URL");
      if (url) document.execCommand("createLink", false, url);
    };
    const quoteHandler = () => document.execCommand("formatBlock", false, "blockquote");
    const codeHandler = () => document.execCommand("formatBlock", false, "code");

    return (
      <div
        ref={ref}
        className={cn(
          "relative w-full motion-reduce:transition-none",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
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
          <div className="flex space-x-2 p-1">
            <button
              type="button"
              onClick={boldHandler}
              className="p-1 rounded-sm hover:bg-secondary/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring group"
              title="Bold (Ctrl+B)"
            >
              B
            </button>
            <button
              type="button"
              onClick={italicHandler}
              className="p-1 rounded-sm hover:bg-secondary/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring group"
              title="Italic (Ctrl+I)"
            >
              I
            </button>
            <button
              type="button"
              onClick={underlineHandler}
              className="p-1 rounded-sm hover:bg-secondary/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring group"
              title="Underline (Ctrl+U)"
            >
              U
            </button>
            <button
              type="button"
              onClick={strikeHandler}
              className="p-1 rounded-sm hover:bg-secondary/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring group"
              title="Strike (Ctrl+S)"
            >
              S
            </button>
            <button
              type="button"
              onClick={heading2Handler}
              className="p-1 rounded-sm hover:bg-secondary/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring group"
              title="Heading 2"
            >
              H2
            </button>
            <button
              type="button"
              onClick={heading3Handler}
              className="p-1 rounded-sm hover:bg-secondary/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring group"
              title="Heading 3"
            >
              H3
            </button>
            <button
              type="button"
              onClick={bulletListHandler}
              className="p-1 rounded-sm hover:bg-secondary/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring group"
              title="Bullet list"
            >
              •
            </button>
            <button
              type="button"
              onClick={numberedListHandler}
              className="p-1 rounded-sm hover:bg-secondary/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring group"
              title="Numbered list"
            >
              1
            </button>
            <button
              type="button"
              onClick={linkHandler}
              className="p-1 rounded-sm hover:bg-secondary/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring group"
              title="Link (Ctrl+K)"
            >
              Link
            </button>
            <button
              type="button"
              onClick={quoteHandler}
              className="p-1 rounded-sm hover:bg-secondary/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring group"
              title="Quote"
            >
              {'"'}
            </button>
            <button
              type="button"
              onClick={codeHandler}
              className="p-1 rounded-sm hover:bg-secondary/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring group"
              title="Code"
            >
              C
            </button>
          </div>
        </div>

        {/* Content editable area */}
        <div
          ref={editorRef}
          className={cn(
            "min-h-[200px] p-3 text-sm text-foreground break-words outline-none",
            "motion-reduce:transition-none",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            disabled && "opacity-50 cursor-not-allowed",
          )}
          contentEditable={!disabled}
          suppressContentEditableWarning
          onInput={(e) => {
            const html = e.currentTarget.innerHTML;
            setValue(html);
            onValueChange?.(html);
          }}
          data-placeholder={placeholder || ""}
          role="textbox"
          aria-multiline="true"
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
