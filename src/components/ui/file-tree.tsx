"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface FileTreeNode {
  id: string;
  name: string;
  kind: "file" | "folder";
  children?: FileTreeNode[];
}

export interface FileTreeProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  nodes: FileTreeNode[];
  selectedId?: string;
  defaultExpanded?: string[];
  onSelect?: (node: FileTreeNode) => void;
}

export function FileTree({ nodes, selectedId: controlledSelected, defaultExpanded = [], onSelect, className, ...props }: FileTreeProps) {
  const [innerSelected, setInnerSelected] = React.useState<string | null>(null);
  const selected = controlledSelected ?? innerSelected;
  const [expanded, setExpanded] = React.useState<Set<string>>(new Set(defaultExpanded));

  const toggle = (id: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const renderNode = (node: FileTreeNode, depth: number): React.ReactNode => {
    const isOpen = expanded.has(node.id);
    const isActive = selected === node.id;
    return (
      <div key={node.id}>
        <div
          role="treeitem"
          aria-expanded={node.kind === "folder" ? isOpen : undefined}
          aria-selected={isActive}
          tabIndex={0}
          onClick={() => {
            if (node.kind === "folder") toggle(node.id);
            setInnerSelected(node.id);
            onSelect?.(node);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              if (node.kind === "folder") toggle(node.id);
              setInnerSelected(node.id);
              onSelect?.(node);
            }
          }}
          style={{ paddingLeft: `${depth * 14 + 8}px` }}
          className={cn(
            "flex cursor-pointer items-center gap-1.5 rounded px-1 py-1 font-mono text-[13px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            isActive ? "bg-accent font-bold text-accent-foreground" : "hover:bg-secondary",
          )}
        >
          <span aria-hidden className="w-3 text-[10px] text-muted-foreground">
            {node.kind === "folder" ? (isOpen ? "▾" : "▸") : "·"}
          </span>
          <span aria-hidden className="text-xs">{node.kind === "folder" ? "📁" : "📄"}</span>
          <span className="truncate">{node.name}</span>
        </div>
        {node.kind === "folder" && isOpen ? (
          <div role="group">{(node.children ?? []).map((kid) => renderNode(kid, depth + 1))}</div>
        ) : null}
      </div>
    );
  };

  return (
    <div role="tree" aria-label="File tree" className={cn("w-full rounded-lg border border-border bg-card p-2", className)} {...props}>
      {nodes.map((node) => renderNode(node, 0))}
    </div>
  );
}
