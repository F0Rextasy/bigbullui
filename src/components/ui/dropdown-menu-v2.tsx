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
  radioGroup?: string;
  radioValue?: string;
  danger?: boolean;
};

export type DropdownMenuV2Props = {
  items: DropdownMenuV2Item[];
  className?: string;
};

const dropdownMenuV2Shake = `
  @keyframes dropdownMenuV2Shake {
    0%, 100% { transform: translateX(0); }
    20%, 60%, 80% { transform: translateX(-4px); }
    40%, 100% { transform: translateX(4px); }
  }
`;
<style>{dropdownMenuV2Shake}</style>;

const DropdownMenuV2 = React.forwardRef<HTMLDivElement, DropdownMenuV2Props>(
  ({ items, className }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "w-sm rounded-md bg-card border border-input p-1 shadow-sm",
          "motion-reduce:transition-none",
          className
        )}
      >
        <div className="flex flex-col space-y-1">
          {items.map((item) => {
            if (item.separator) {
              return (
                <div
                  key={item.id}
                  className={cn("h-px my-2 border-t border-border/50", "motion-reduce:transition-none")}
                />
              );
            }

            if (item.submenu && item.submenu.length > 0) {
              return (
                <div key={item.id} className="group">
                  <div
                    onClick={() => {}}
                    role="button"
                    aria-haspopup="true"
                    aria-expanded="false"
                    className={cn(
                      "flex items-center rounded-md px-2 py-1.5 hover:bg-accent/10 hover:text-accent-foreground cursor-pointer",
                      "motion-reduce:transition-none"
                    )}
                  >
                    {item.label}
                    <svg
                      width="8"
                      height="8"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      className="mt-0.5 -ml-0.5 transition-transform group-open:rotate-180"
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </div>
                  <div
                    className={cn(
                      "absolute left-full w-48 mt-1.5 rounded-md bg-card border border-input shadow-origin origin-topRight origin-topRightAuto pt-1",
                      "motion-reduce:transition-none"
                    )}
                  >
                    <DropdownMenuV2 items={item.submenu} />
                  </div>
                </div>
              );
            }

            if (item.checkbox) {
              return (
                <div
                  key={item.id}
                  className={cn("flex items-center rounded-md px-2 py-1.5 cursor-select-none", "motion-reduce:transition-none")}
                >
                  <input
                    type="checkbox"
                    className={cn("w-4 h-4 rounded border border-primary bg-primary/10 cursor-pointer", "motion-reduce:transition-none")}
                  />
                  <span className="ml-2 text-sm">{item.label}</span>
                </div>
              );
            }

            if (item.radioGroup) {
              return (
                <div
                  key={item.id}
                  className={cn("flex items-center rounded-md px-2 py-1.5 cursor-pointer", "motion-reduce:transition-none")}
                >
                  <div
                    className={cn(
                      "w-3 h-3 rounded-full border border-primary bg-primary/10 flex-shrink-0",
                      "motion-reduce:transition-none"
                    )}
                  />
                  <span className="ml-2 text-sm flex-1">{item.label}</span>
                </div>
              );
            }

            return (
              <div
                key={item.id}
                className={cn(
                  "flex items-center rounded-md px-2 py-1.5 cursor-pointer select-none",
                  item.danger && "bg-accent/10 text-accent-foreground",
                  "motion-reduce:transition-none"
                )}
                onClick={() => {}}
              >
                {item.shortcut ? (
                  <>
                    <span className="ml-2 text-xs opacity-60">{item.shortcut}</span>
                    <span className="ml-2 text-sm">{item.label}</span>
                  </>
                ) : (
                  item.label
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
);
DropdownMenuV2.displayName = "DropdownMenuV2";

export { DropdownMenuV2 };

