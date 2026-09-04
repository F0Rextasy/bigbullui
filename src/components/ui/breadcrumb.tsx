import * as React from "react";
import { cn } from "./lib/utils";

export interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
  className?: string;
  separator?: React.ReactNode;
}

export function Breadcrumb({
  children,
  className,
  separator = "/",
  ...props
}: BreadcrumbProps) {
  const items = React.Children.toArray(children);

  return (
    <nav aria-label="Breadcrumb" className={cn("flex items-center", className)} {...props}>
      <ol className="flex flex-wrap items-center gap-2 font-mono text-xs text-muted-foreground">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <React.Fragment key={index}>
              {item}
              {!isLast ? (
                <li aria-hidden="true" className="select-none text-muted-foreground/60">
                  {separator}
                </li>
              ) : null}
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
}

export interface BreadcrumbItemProps extends React.LiHTMLAttributes<HTMLLIElement> {
  href?: string;
  current?: boolean;
  children?: React.ReactNode;
  className?: string;
}

export function BreadcrumbItem({
  href,
  current = false,
  children,
  className,
  ...props
}: BreadcrumbItemProps) {
  return (
    <li className={cn("inline-flex items-center", className)} {...props}>
      {href && !current ? (
        <a
          href={href}
          className="transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {children}
        </a>
      ) : (
        <span
          aria-current={current ? "page" : undefined}
          className={cn(current ? "font-semibold text-foreground" : "text-muted-foreground")}
        >
          {children}
        </span>
      )}
    </li>
  );
}
