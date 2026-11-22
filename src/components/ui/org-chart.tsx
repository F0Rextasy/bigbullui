"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface OrgNode {
  id: string;
  label: string;
  role?: string;
  children?: OrgNode[];
}

export interface OrgChartProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onToggle"> {
  root?: OrgNode[];
  expanded?: Set<string>;
  onToggle?: (id: string) => void;
}

function collectIds(nodes: OrgNode[], acc = new Set<string>()): Set<string> {
  for (const n of nodes) {
    if (n.children && n.children.length > 0) {
      acc.add(n.id);
      collectIds(n.children, acc);
    }
  }
  return acc;
}

function initialsOf(label: string): string {
  return label
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

export const OrgChart = React.forwardRef<HTMLDivElement, OrgChartProps>(
  function OrgChartComponent({ root = [], expanded: controlledExpanded, onToggle, className, ...props }, ref) {
    const [innerExpanded, setInnerExpanded] = React.useState<Set<string>>(() => collectIds(root));
    const activeExpanded = controlledExpanded ?? innerExpanded;

    const handleToggle = (id: string) => {
      if (controlledExpanded === undefined) {
        setInnerExpanded((prev) => {
          const next = new Set(prev);
          if (next.has(id)) next.delete(id);
          else next.add(id);
          return next;
        });
      }
      onToggle?.(id);
    };

    const renderNode = (node: OrgNode, depth: number) => {
      const childrenList = node.children ?? [];
      const hasChildren = childrenList.length > 0;
      const isExpanded = activeExpanded.has(node.id);

      return (
        <div key={node.id} className="flex flex-col">
          <div className="mb-2 flex items-start gap-2 rounded-md border border-border bg-card p-2.5 shadow-2xs">
            {hasChildren ? (
              <button
                type="button"
                aria-expanded={isExpanded}
                aria-label={isExpanded ? `Collapse ${node.label}` : `Expand ${node.label}`}
                onClick={() => handleToggle(node.id)}
                className="mt-0.5 shrink-0 cursor-pointer rounded-sm p-1 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none"
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  className={cn("transition-transform duration-150 motion-reduce:transition-none", isExpanded && "rotate-90")}
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </button>
            ) : (
              <span className="mt-0.5 inline-block size-5 shrink-0" aria-hidden="true" />
            )}

            <div className="flex size-7 shrink-0 items-center justify-center rounded-full border border-dashed border-border bg-secondary font-mono text-[10px] font-bold uppercase text-foreground">
              {initialsOf(node.label)}
            </div>

            <div className="min-w-0 flex-1">
              <span className="block truncate text-sm font-medium text-foreground">{node.label}</span>
              {node.role ? (
                <span className="mt-0.5 block truncate font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                  {node.role}
                </span>
              ) : null}
            </div>
          </div>

          {hasChildren && isExpanded ? (
            <div className="ms-5 border-s-2 border-dashed border-border ps-3">
              {childrenList.map((child) => renderNode(child, depth + 1))}
            </div>
          ) : null}
        </div>
      );
    };

    return (
      <div
        ref={ref}
        role="tree"
        aria-label="Organization hierarchy"
        className={cn("w-full", className)}
        {...props}
      >
        {root.map((node) => renderNode(node, 0))}
      </div>
    );
  },
);
OrgChart.displayName = "OrgChart";
