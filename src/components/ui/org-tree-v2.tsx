"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface OrgTreeV2Node {
  id: string;
  label: string;
  role?: string;
  children?: OrgTreeV2Node[];
}

export interface OrgTreeV2Props extends React.HTMLAttributes<HTMLDivElement> {
  root: OrgTreeV2Node[];
  orientation?: "vertical" | "horizontal";
}

function NodeCard({ node, onToggle, expanded, hasKids }: { node: OrgTreeV2Node; onToggle: () => void; expanded: boolean; hasKids: boolean }) {
  return (
    <div className="flex flex-col items-center">
      <div className="flex min-w-28 flex-col items-center rounded-lg border-2 border-foreground bg-card px-3 py-2 text-center shadow-sm">
        <span className="text-xs font-bold">{node.label}</span>
        {node.role ? (
          <span className="font-mono text-[10px] uppercase text-muted-foreground">{node.role}</span>
        ) : null}
        {hasKids ? (
          <button
            type="button"
            onClick={onToggle}
            aria-expanded={expanded}
            aria-label={expanded ? "Collapse" : "Expand"}
            className="mt-1 cursor-pointer rounded-full border border-border px-2 font-mono text-[10px] transition-colors hover:border-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {expanded ? "−" : "+"}
          </button>
        ) : null}
      </div>
    </div>
  );
}

export function OrgTreeV2({ root, orientation = "vertical", className, ...props }: OrgTreeV2Props) {
  const [collapsed, setCollapsed] = React.useState<Set<string>>(new Set());

  const toggle = (id: string) => {
    setCollapsed((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const renderNode = (node: OrgTreeV2Node): React.ReactNode => {
    const kids = collapsed.has(node.id) ? [] : (node.children ?? []);
    return (
      <div key={node.id} className={cn("flex", orientation === "vertical" ? "flex-col items-center" : "flex-row items-start")}>
        <NodeCard node={node} onToggle={() => toggle(node.id)} expanded={!collapsed.has(node.id)} hasKids={(node.children ?? []).length > 0} />
        {kids.length > 0 ? (
          <div className={cn("flex gap-4 pt-4", orientation === "vertical" ? "flex-row items-start border-t-2 border-dashed border-border/60" : "flex-col items-start border-l-2 border-dashed border-border/60 ps-4")}>
            {kids.map((kid) => (
              <div key={kid.id}>{renderNode(kid)}</div>
            ))}
          </div>
        ) : null}
      </div>
    );
  };

  return (
    <div className={cn("w-full overflow-x-auto", className)} {...props}>
      <div className="flex justify-start gap-6 p-2 sm:justify-center">
        {root.map((node) => (
          <div key={node.id}>{renderNode(node)}</div>
        ))}
      </div>
    </div>
  );
}
