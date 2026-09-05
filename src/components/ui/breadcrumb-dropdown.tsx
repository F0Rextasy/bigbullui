"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface BreadcrumbItemData {
  label: string;
  href?: string;
  active?: boolean;
}

export interface BreadcrumbDropdownProps extends React.HTMLAttributes<HTMLElement> {
  items: BreadcrumbItemData[];
  maxVisible?: number;
  separator?: string;
  className?: string;
}

export function BreadcrumbDropdown({
  items,
  maxVisible = 3,
  separator = "/",
  className,
  ...props
}: BreadcrumbDropdownProps) {
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLLIElement | null>(null);

  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (items.length <= maxVisible) {
    return (
      <nav
        aria-label="Breadcrumb"
        className={cn("flex items-center gap-2 font-mono text-xs select-none", className)}
        {...props}
      >
        <ol className="flex items-center gap-2">
          {items.map((item, idx) => (
            <li key={idx} className="flex items-center gap-2">
              {idx > 0 && (
                <span className="text-muted-foreground font-bold" aria-hidden="true">
                  {separator}
                </span>
              )}
              {item.active ? (
                <span
                  aria-current="page"
                  className="rounded border border-foreground bg-secondary px-1.5 py-0.5 font-bold text-foreground shadow-xs"
                >
                  {item.label}
                </span>
              ) : item.href ? (
                <a
                  href={item.href}
                  className="text-muted-foreground transition-colors hover:text-foreground hover:underline underline-offset-4"
                >
                  {item.label}
                </a>
              ) : (
                <span className="text-muted-foreground">{item.label}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    );
  }

  // If items > maxVisible, collapse the middle items into a dropdown
  const firstItem = items[0];
  const lastItem = items[items.length - 1];
  const hiddenItems = items.slice(1, items.length - 1);

  return (
    <nav
      aria-label="Breadcrumb"
      className={cn("flex items-center gap-2 font-mono text-xs select-none", className)}
      {...props}
    >
      <ol className="flex items-center gap-2">
        {/* First Item */}
        <li className="flex items-center gap-2">
          {firstItem.href ? (
            <a
              href={firstItem.href}
              className="text-muted-foreground transition-colors hover:text-foreground hover:underline"
            >
              {firstItem.label}
            </a>
          ) : (
            <span className="text-muted-foreground">{firstItem.label}</span>
          )}
        </li>

        {/* Separator */}
        <span className="text-muted-foreground font-bold" aria-hidden="true">
          {separator}
        </span>

        {/* Collapsed Dropdown Item */}
        <li className="relative flex items-center" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setIsDropdownOpen((prev) => !prev)}
            aria-expanded={isDropdownOpen}
            className="flex cursor-pointer items-center gap-1 rounded border border-dashed border-border bg-card px-1.5 py-0.5 text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
          >
            <span>•••</span>
            <span className="text-[9px]">▾</span>
          </button>

          {isDropdownOpen && (
            <div className="absolute left-0 top-full z-50 mt-1 min-w-36 rounded-md border-2 border-foreground bg-card p-1 shadow-lg">
              {hiddenItems.map((hidden, hIdx) => (
                <a
                  key={hIdx}
                  href={hidden.href || "#"}
                  onClick={() => setIsDropdownOpen(false)}
                  className="block rounded px-2 py-1 text-[11px] font-bold text-foreground transition-colors hover:bg-secondary"
                >
                  {hidden.label}
                </a>
              ))}
            </div>
          )}
        </li>

        {/* Separator */}
        <span className="text-muted-foreground font-bold" aria-hidden="true">
          {separator}
        </span>

        {/* Last Active Item */}
        <li className="flex items-center">
          <span
            aria-current="page"
            className="rounded border border-foreground bg-secondary px-1.5 py-0.5 font-bold text-foreground shadow-xs"
          >
            {lastItem.label}
          </span>
        </li>
      </ol>
    </nav>
  );
}
