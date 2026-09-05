"use client";

import * as React from "react";
import { cn } from "./lib/utils";

/**
 * RichTextEditor - minimal contentEditable editor with toolbar
 */
interface RichTextEditorProps {
  value?: string;
  defaultValue?: string;
  onValueChange?: (html: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

/**
 * Toolbar button interaction
 */
const useToolbarButton = (command: string, tag: keyof HTMLElementTagNameMap) => {
  const handleClick = () => {
    document.execCommand("command");
  };
  return { handleClick };
};

export const RichTextEditor = React.forwardRef<HTMLDivElement, RichTextEditorProps>(
  function RichTextEditor(props, ref) {
    const {
      value: controlledValue,
      defaultValue,
      onValueChange,
      placeholder,
      disabled,
    } = props;

    const [value, setValue] = React.useState<string>(defaultValue || "");

    // Sync controlled -> uncontrolled
    React.useEffect(() => {
      if (controlledValue !== undefined) {
        setValue(controlledValue);
      }
    }, [controlledValue]);

    // Handle input changes via selectionchange
    React.useEffect(() => {
      const handleSelection = () => {
        const selectedRange = document.getSelection()?.rangeCount
          ? document.getSelection()!.getRangeAt(0)
          : null;
        if (selectedRange) {
          const html = new XMLSerializer().serializeToString(selectedRange.cloneContents());
          onValueChange?.(html);
        }
      };
      window.addEventListener("selectionchange", handleSelection);
      return () => window.removeEventListener("selectionchange", handleSelection);
    }, [onValueChange]);

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
            {/* Bold */}
            <button
              onClick={boldHandler}
              className={cn(
                "p-1 rounded-sm hover:bg-secondary/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                "group",
              )}
              title="Bold (Ctrl+B)"
            >
              B
            </button>

            {/* Italic */}
            <button
              onClick={italicHandler}
              className={cn(
                "p-1 rounded-sm hover:bg-secondary/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                "group",
              )}
              title="Italic (Ctrl+I)"
            >
              I
            </button>

            {/* Underline */}
            <button
              onClick={underlineHandler}
              className={cn(
                "p-1 rounded-sm hover:bg-secondary/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                "group",
              )}
              title="Underline (Ctrl+U)"
            >
              U
            </button>

            {/* Strike */}
            <button
              onClick={strikeHandler}
              className={cn(
                "p-1 rounded-sm hover:bg-secondary/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                "group",
              )}
              title="Strike (Ctrl+S)"
            >
              S
            </button>

            {/* H2 */}
            <button
              onClick={heading2Handler}
              className={cn(
                "p-1 rounded-sm hover:bg-secondary/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                "group",
              )}
              title="Heading 2"
            >
              H2
            </button>

            {/* H3 */}
            <button
              onClick={heading3Handler}
              className={cn(
                "p-1 rounded-sm hover:bg-secondary/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                "group",
              )}
              title="Heading 3"
            >
              H3
            </button>

            {/* Bullet list */}
            <button
              onClick={bulletListHandler}
              className={cn(
                "p-1 rounded-sm hover:bg-secondary/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                "group",
              )}
              title="Bullet list"
            >
              •
            </button>

            {/* Numbered list */}
            <button
              onClick={numberedListHandler}
              className={cn(
                "p-1 rounded-sm hover:bg-secondary/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                "group",
              )}
              title="Numbered list"
            >
              1
            </button>

            {/* Link */}
            <button
              onClick={linkHandler}
              className={cn(
                "p-1 rounded-sm hover:bg-secondary/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                "group",
              )}
              title="Link (Ctrl+K)"
            >
              Link
            </button>

            {/* Quote */}
            <button
              onClick={quoteHandler}
              className={cn(
                "p-1 rounded-sm hover:bg-secondary/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                "group",
              )}
              title="Quote"
            >
              {'"'}
            </button>

            {/* Code */}
            <button
              onClick={codeHandler}
              className={cn(
                "p-1 rounded-sm hover:bg-secondary/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                "group",
              )}
              title="Code"
            >
              C
            </button>
          </div>
        </div>

        {/* Content editable area */}
        <div
          className={cn(
            "min-h-[200px] p-3 text-sm text-foreground break-words outline-none",
            "motion-reduce:transition-none",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            disabled && "opacity-50 cursor-not-allowed",
          )}
          contentEditable={!disabled}
          suppressContentEditableWarning
          onInput={(e) => {
            const html = (e.target as HTMLElement).innerHTML;
            setValue(html);
            onValueChange?.(html);
          }}
          data-placeholder={placeholder || ""}
          role="textbox"
          aria-multiline="true"
        >
          {value}
        </div>

        {/* Word/char counter */}
        <div className="text-xs text-muted-foreground mt-1 font-mono">
          {value.replace(/<[^>]*>/g, "").length} chars
        </div>
      </div>
    );
  },
);
RichTextEditor.displayName = "RichTextEditor";

