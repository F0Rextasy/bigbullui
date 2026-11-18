"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export type DropdownMenuItem = DropdownMenuV2Item;
export type DropdownMenuV2Item = {
  id: string;
  label: string;
  disabled?: boolean;
  shortcut?: string;
  separator?: boolean;
  submenu?: DropdownMenuV2Item[];
  checkbox?: boolean;
  checked?: boolean;
  radioGroup?: string;
  radioValue?: string;
  danger?: boolean;
  onSelect?: () => void;
};

export type DropdownMenuV2Props = {
  items: DropdownMenuV2Item[];
  onSelect?: (item: DropdownMenuV2Item) => void;
  className?: string;
};

const DropdownMenuV2 = React.forwardRef<HTMLDivElement, DropdownMenuV2Props>(
  ({ items = [], onSelect, className }, ref) => {
    const [openSubmenuId, setOpenSubmenuId] = React.useState<string | null>(null);
    const [checkedIds, setCheckedIds] = React.useState<Record<string, boolean>>({});
    const [radioValues, setRadioValues] = React.useState<Record<string, string>>({});

    return (
      <div
        ref={ref}
        role="menu"
        onKeyDown={(e) => {
          if (e.key === "Escape") setOpenSubmenuId(null);
        }}
        className={cn(
          "w-56 rounded-md bg-card border border-input p-1 shadow-sm",
          "motion-reduce:transition-none",
          className
        )}
      >
        <div className="flex flex-col space-y-0.5">
          {items.map((item) => {
            if (item.separator) {
              return (
                <div
                  key={item.id}
                  role="separator"
                  className="my-1.5 h-px border-t border-border/60"
                />
              );
            }

            if (item.submenu && item.submenu.length > 0) {
              const subOpen = openSubmenuId === item.id;
              return (
                <div
                  key={item.id}
                  className="relative"
                  onMouseEnter={() => !item.disabled && setOpenSubmenuId(item.id)}
                  onMouseLeave={() => setOpenSubmenuId((curr) => (curr === item.id ? null : curr))}
                >
                  <button
                    type="button"
                    role="menuitem"
                    disabled={item.disabled}
                    aria-haspopup="menu"
                    aria-expanded={subOpen}
                    onClick={() => setOpenSubmenuId((curr) => (curr === item.id ? null : item.id))}
                    className={cn(
                      "flex w-full items-center justify-between rounded-sm px-2 py-1.5 text-start text-sm text-foreground hover:bg-secondary cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-40 disabled:cursor-not-allowed",
                      "motion-reduce:transition-none"
                    )}
                  >
                    <span>{item.label}</span>
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      aria-hidden="true"
                      className="ms-2 shrink-0 text-muted-foreground"
                    >
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </button>
                  {subOpen ? (
                    <div className="absolute left-full top-0 z-50 ms-1 origin-top-left">
                      <DropdownMenuV2 items={item.submenu} onSelect={onSelect} />
                    </div>
                  ) : null}
                </div>
              );
            }

            if (item.checkbox) {
              const isChecked = checkedIds[item.id] ?? Boolean(item.checked);
              return (
                <button
                  key={item.id}
                  type="button"
                  role="menuitemcheckbox"
                  aria-checked={isChecked}
                  disabled={item.disabled}
                  onClick={() => {
                    if (item.disabled) return;
                    setCheckedIds((prev) => ({ ...prev, [item.id]: !isChecked }));
                    item.onSelect?.();
                    onSelect?.(item);
                  }}
                  className={cn(
                    "flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-start text-sm text-foreground select-none hover:bg-secondary cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-40 disabled:cursor-not-allowed",
                    "motion-reduce:transition-none"
                  )}
                >
                  <span
                    aria-hidden="true"
                    className={cn(
                      "flex h-4 w-4 shrink-0 items-center justify-center rounded-xs border text-[10px]",
                      isChecked ? "border-accent bg-accent text-accent-foreground" : "border-input bg-background"
                    )}
                  >
                    {isChecked ? "✓" : ""}
                  </span>
                  <span className="flex-1">{item.label}</span>
                </button>
              );
            }

            if (item.radioGroup) {
              const group = item.radioGroup;
              const val = item.radioValue ?? item.id;
              const isSelected = radioValues[group] === val;
              return (
                <button
                  key={item.id}
                  type="button"
                  role="menuitemradio"
                  aria-checked={isSelected}
                  disabled={item.disabled}
                  onClick={() => {
                    if (item.disabled) return;
                    setRadioValues((prev) => ({ ...prev, [group]: val }));
                    item.onSelect?.();
                    onSelect?.(item);
                  }}
                  className={cn(
                    "flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-start text-sm text-foreground hover:bg-secondary cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-40 disabled:cursor-not-allowed",
                    "motion-reduce:transition-none"
                  )}
                >
                  <span
                    aria-hidden="true"
                    className={cn(
                      "flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full border",
                      isSelected ? "border-accent" : "border-input"
                    )}
                  >
                    {isSelected ? <span className="h-1.5 w-1.5 rounded-full bg-accent" /> : null}
                  </span>
                  <span className="flex-1">{item.label}</span>
                </button>
              );
            }

            return (
              <button
                key={item.id}
                type="button"
                role="menuitem"
                disabled={item.disabled}
                className={cn(
                  "flex w-full items-center justify-between rounded-sm px-2 py-1.5 text-start text-sm cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-40 disabled:cursor-not-allowed",
                  item.danger
                    ? "text-destructive hover:bg-destructive/10"
                    : "text-foreground hover:bg-secondary",
                  "motion-reduce:transition-none"
                )}
                onClick={() => {
                  if (item.disabled) return;
                  item.onSelect?.();
                  onSelect?.(item);
                }}
              >
                <span>{item.label}</span>
                {item.shortcut ? (
                  <span className="ms-2 font-mono text-xs text-muted-foreground">{item.shortcut}</span>
                ) : null}
              </button>
            );
          })}
        </div>
      </div>
    );
  }
);
DropdownMenuV2.displayName = "DropdownMenuV2";

export { DropdownMenuV2 };

