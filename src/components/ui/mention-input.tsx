"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface MentionItem {
  id: string;
  name: string;
  category?: string;
}

export interface MentionInputProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "onChange"> {
  mentions?: MentionItem[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (val: string) => void;
  className?: string;
}

export function MentionInput({
  mentions = [
    { id: "vip", name: "VIP-Box", category: "Seating" },
    { id: "orch", name: "Orchestra-Tier", category: "Seating" },
    { id: "balc", name: "Balcony-Upper", category: "Seating" },
    { id: "gate", name: "Gate-3-Security", category: "Staff" },
  ],
  value: controlledValue,
  defaultValue = "",
  onValueChange,
  placeholder = "Type @ to mention ticket tiers or staff...",
  className,
  ...props
}: MentionInputProps) {
  const [internalVal, setInternalVal] = React.useState(defaultValue);
  const isControlled = controlledValue !== undefined;
  const currentVal = isControlled ? controlledValue : internalVal;

  const [popupOpen, setPopupOpen] = React.useState(false);
  const [filterText, setFilterText] = React.useState("");
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  const filteredMentions = React.useMemo(() => {
    return mentions.filter((m) =>
      m.name.toLowerCase().includes(filterText.toLowerCase())
    );
  }, [mentions, filterText]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    if (!isControlled) setInternalVal(val);
    onValueChange?.(val);

    const cursor = e.target.selectionStart;
    const textBefore = val.slice(0, cursor);
    const match = textBefore.match(/@([a-zA-Z0-9_-]*)$/);

    if (match) {
      setFilterText(match[1]);
      setSelectedIndex(0);
      setPopupOpen(true);
    } else {
      setPopupOpen(false);
    }
  };

  const insertMention = (item: MentionItem) => {
    if (!textareaRef.current) return;
    const cursor = textareaRef.current.selectionStart;
    const textBefore = currentVal.slice(0, cursor);
    const textAfter = currentVal.slice(cursor);

    const match = textBefore.match(/@([a-zA-Z0-9_-]*)$/);
    if (!match) return;

    const prefix = textBefore.slice(0, match.index);
    const updated = `${prefix}@${item.name} ${textAfter}`;

    if (!isControlled) setInternalVal(updated);
    onValueChange?.(updated);
    setPopupOpen(false);

    setTimeout(() => {
      textareaRef.current?.focus();
    }, 10);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (popupOpen && filteredMentions.length > 0) {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((i) => (i < filteredMentions.length - 1 ? i + 1 : 0));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((i) => (i > 0 ? i - 1 : filteredMentions.length - 1));
      } else if (e.key === "Enter" || e.key === "Tab") {
        e.preventDefault();
        insertMention(filteredMentions[selectedIndex]);
      } else if (e.key === "Escape") {
        setPopupOpen(false);
      }
    }
  };

  return (
    <div className={cn("relative w-full font-mono select-none", className)}>
      <textarea
        ref={textareaRef}
        value={currentVal}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        rows={3}
        className={cn(
          "w-full rounded-lg border-2 border-foreground bg-card p-3 text-xs text-foreground placeholder:text-muted-foreground outline-none transition-all shadow-sm",
          "focus:border-accent focus:ring-1 focus:ring-accent"
        )}
        {...props}
      />

      {popupOpen && filteredMentions.length > 0 && (
        <div className="absolute left-2 bottom-full z-50 mb-1 w-56 rounded-lg border-2 border-foreground bg-card p-1 shadow-xl outline-1 outline-dashed outline-offset-[-4px] animate-[scale-in_0.12s_ease-out_both]">
          <div className="border-b border-dashed border-border px-2 py-1 text-[9px] font-bold uppercase tracking-widest text-muted-foreground">
            SELECT TICKET MENTION
          </div>
          {filteredMentions.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => insertMention(item)}
              onMouseEnter={() => setSelectedIndex(idx)}
              className={cn(
                "flex cursor-pointer items-center justify-between rounded-sm px-2 py-1.5 text-xs transition-colors",
                idx === selectedIndex
                  ? "bg-accent font-bold text-accent-foreground"
                  : "text-foreground hover:bg-secondary"
              )}
            >
              <span>@{item.name}</span>
              {item.category && (
                <span className="text-[9px] uppercase opacity-70">
                  [{item.category}]
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
