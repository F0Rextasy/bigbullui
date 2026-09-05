import * as React from "react";
import { cn } from "./lib/utils";

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterColumn {
  title: string;
  links: FooterLink[];
}

export interface FooterProps {
  columns?: FooterColumn[];
  className?: string;
}

export function Footer({
  columns,
  className,
}: FooterProps) {
  return (
    <footer
      className={cn(
        "border-t border-dashed border-border/20 py-8 mt-8",
        "motion-reduce:transition-none",
        className
      )}
    >
      {columns && columns.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {columns.map((column, colIndex) => (
            <div
              key={colIndex}
              className="space-y-3"
            >
              <h4 className="font-mono text-[10px] font-bold uppercase tracking-[0.15em]">
                {column.title}
              </h4>
              <ul className="space-y-1">
                {column.links.map((link, liIndex) => (
                  <li key={liIndex}>
                    <a
                      href={link.href}
                      className={cn(
                        "font-mono text-[9px] text-muted-foreground uppercase hover:underline hover:underline-offset-4",
                        "transition-colors"
                      )}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center">
          <p className="font-mono text-[9px] text-muted-foreground uppercase tracking-[0.15em]">
            © 2026 bigbullui. All rights reserved.
          </p>
        </div>
      )}
    </footer>
  );
}