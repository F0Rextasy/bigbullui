"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface TreeNode {
  id: string;
  label: string;
  value?: string;
  children?: TreeNode[];
}

export interface TreeTableProps extends React.HTMLAttributes<HTMLDivElement> {
  nodes: TreeNode[];
}

/** Tree table with expandable rows and connecting lineage branches. */
export function TreeTable({ nodes, className, ...props }: TreeTableProps) {
  const [expanded, setExpanded] = React.useState<Set<string>>(new Set());

  const toggle = (id: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const renderRows = (list: TreeNode[], depth: number): React.ReactNode =>
    list.map((node, idx) => (
      <React.Fragment key={node.id}>
        <tr
          className={cn(
            "border-b border-border/40 last:border-0 transition-colors hover:bg-secondary/40 motion-reduce:transition-none animate-[ttIn_0.25s_ease-out_both] motion-reduce:animate-none"
          )}
          style={{ animationDelay: `${idx * 35}ms` }}
        >
          <td className="px-3 py-2" style={{ paddingLeft: `${12 + depth * 20}px` }}>
            <div className="flex items-center gap-1.5">
              {node.children && node.children.length > 0 ? (
                <button
                  onClick={() => toggle(node.id)}
                  aria-expanded={expanded.has(node.id)}
                  className="rounded-sm p-0.5 text-muted-foreground transition-transform duration-200 hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring motion-reduce:transition-none"
                >
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={cn("transition-transform duration-200 motion-reduce:transition-none", expanded.has(node.id) && "rotate-90")} aria-hidden="true">
                    <path d="M9 6l6 6-6 6" />
                  </svg>
                </button>
              ) : (
                <span className="size-[11px] shrink-0" />
              )}
              <span className="text-sm">{node.label}</span>
            </div>
          </td>
          <td className="px-3 py-2 text-right font-mono text-xs tabular-nums text-muted-foreground">{node.value ?? "—"}</td>
        </tr>
        {node.children && expanded.has(node.id) && renderRows(node.children, depth + 1)}
      </React.Fragment>
    ));

  return (
    <div className={cn("w-full max-w-md overflow-hidden rounded-lg border border-border", className)} {...props}>
      <style>{`@keyframes ttIn { from { opacity: 0; transform: translateX(-6px); } to { opacity: 1; transform: translateX(0); } }`}</style>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border bg-secondary/60 font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
            <th className="px-3 py-2 text-left font-medium">Ad</th>
            <th className="px-3 py-2 text-right font-medium">Value</th>
          </tr>
        </thead>
        <tbody>{renderRows(nodes, 0)}</tbody>
      </table>
    </div>
  );
}
