"use client";

import * as React from "react";
import { cn } from "./lib/utils";

/**
 * OrgNode for org chart hierarchy
 */
export interface OrgNode {
  id: string;
  label: string;
  role?: string;
  children?: OrgNode[];
}

/**
 * OrgChart - hierarchical boxes tree with connector lines and expand/collapse
 */
interface OrgChartProps {
  root: OrgNode[];
  expanded?: Set<string>;
  onToggle?: (id: string) => void;
}

/**
 * Recursively render org chart nodes
 */
const OrgChartInner = ({
  root,
  expanded = new Set(),
  onToggle,
}: {
  root: OrgNode[];
  expanded?: Set<string>;
  onToggle?: (id: string) => void;
}) => {
  const renderNode = (node: OrgNode, depth: number) => {
    const isExpanded = expanded.has(node.id);
    const childrenList = node.children || [];

    return (
      <g key={node.id} style={{ display: "flex", flexDirection: "column" }}>
        {/* Expand/collapse button for nodes with children */}
        {childrenList.length > 0 && (
          <button
            onClick={() => onToggle?.(node.id)}
            className={cn(
              "p-1 rounded-sm hover:bg-secondary/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              "motion-reduce:transition-none",
              "flex-shrink-0",
              isExpanded && "rotate-180",
            )}
            aria-label={isExpanded ? "Collapse" : "Expand"}
          >
            <svg
              width={12}
              height={12}
              viewBox="0 0 12 12"
              className={cn("fill-current")}
            >
              <path d="M6 2l-4 4 4 4 1-2z" />
            </svg>
          </button>
        )}

        {/* Node box */}
        <div
          className={cn(
            "relative w-full rounded-md border border-border bg-card p-2 mb-2",
            "motion-reduce:transition-none",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            "group",
          )}
          onMouseEnter={() => {}}
          onMouseLeave={() => {}}
        >
          {/* Avatar initials */}
          <div
            className={cn(
              "absolute -inset-0 flex items-center justify-center pointer-events-none",
              "bg-secondary/10",
              "motion-reduce:animate-none",
            )}
          >
            <span
              className={cn(
                "text-xxs font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground",
                "select-none",
              )}
            >
              {node.label
                .split(" ")
                .map(w => w[0])
                .join("")}
            </span>
          </div>

          {/* Node label */}
          <span
            className={cn(
              "block text-sm font-medium text-foreground",
              "motion-reduce:transition-none",
            )}
          >
            {node.label}
          </span>

          {/* Role if present */}
          {node.role && (
            <span
              className={cn(
                "text-xxs text-muted-foreground",
                "mt-0.5",
                "motion-reduce:transition-none",
              )}
            >
              {node.role}
            </span>
          )}

          {/* Connectors to children */}
          {childrenList.map((child, childIndex) => {
            const isLast = childIndex === childrenList.length - 1;

            return (
              <div
                key={child.id}
                className={cn(
                  "flex items-center",
                  "motion-reduce:transition-none",
                )}
              >
                {/* Connector line */}
                <svg
                  width={40}
                  height={20}
                  viewBox="0 0 40 20"
                  className={cn("transition-opacity duration-200", "group-hover:opacity-100")}
                >
                  <path
                    d="M4 0 L20 0 L20 20 L4 20"
                    stroke="currentColor"
                    strokeWidth={1}
                    fill="none"
                    opacity={isLast ? 0.5 : 1}
                  />
                </svg>

                {/* Child node */}
                {renderNode(child, depth + 1)}
              </div>
            );
          })}

          {/* Bottom connector line (except for last child at this level) */}
          {!isExpanded && childrenList.length > 0 && (
            <div
              className={cn(
                "absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-border",
                "motion-reduce:transition-none",
              )}
            />
          )}
        </div>
      </g>
    );
  };

  return (
    <svg
      width={500}
      height={250}
      viewBox="0 0 500 250"
      className={cn(
        "relative w-full",
        "motion-reduce:animate-none",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
      )}
    >
      {/* Render root nodes */}
      {root.map((node, i) => (
        <g key={node.id} style={{ display: "flex", flexDirection: "column" }}>
          {renderNode(node, 0)}
        </g>
      ))}

      {/* Stagger entrance animation */}
      {/* Nodes animate in sequence via mount order */}
    </svg>
  );
};

export const OrgChart = React.forwardRef<HTMLElement, OrgChartProps>(
  function OrgChartComponent(props, ref) {
    const { root, expanded, onToggle } = props;

    return <OrgChartInner root={root} expanded={expanded} onToggle={onToggle} />;
  },
);
OrgChart.displayName = "OrgChart";
