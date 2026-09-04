"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface TreeNode {
  id: string;
  label: string;
  badge?: string;
  children?: TreeNode[];
}

export interface TreeNavProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  data: TreeNode[];
  selectedId?: string;
  onSelect?: (node: TreeNode) => void;
  className?: string;
}

function TreeItem({
  node,
  selectedId,
  onSelect,
  level = 0,
}: {
  node: TreeNode;
  selectedId?: string;
  onSelect?: (node: TreeNode) => void;
  level?: number;
}) {
  const [isOpen, setIsOpen] = React.useState(true);
  const hasChildren = node.children && node.children.length > 0;
  const isSelected = selectedId === node.id;

  return (
    <div className="space-y-0.5">
      <div
        onClick={() => {
          if (hasChildren) {
            setIsOpen(!isOpen);
          } else {
            onSelect?.(node);
          }
        }}
        style={{ paddingLeft: `${level * 14 + 6}px` }}
        className={cn(
          "flex cursor-pointer items-center justify-between rounded-md py-1 pr-2 text-xs transition-colors",
          isSelected
            ? "bg-accent font-bold text-accent-foreground shadow-xs"
            : "text-foreground hover:bg-secondary"
        )}
      >
        <div className="flex items-center gap-1.5 truncate">
          {hasChildren ? (
            <span
              className={cn(
                "size-3.5 flex items-center justify-center text-[10px] text-muted-foreground transition-transform duration-150",
                isOpen && "rotate-90"
              )}
            >
              ▶
            </span>
          ) : (
            <span className="text-[10px] text-accent font-bold">●</span>
          )}
          <span className="truncate">{node.label}</span>
        </div>

        {node.badge && (
          <span className="rounded-xs bg-secondary/80 px-1 text-[9px] uppercase tracking-wider text-muted-foreground">
            {node.badge}
          </span>
        )}
      </div>

      {hasChildren && isOpen && (
        <div className="relative border-l border-dashed border-border/80 ml-3 space-y-0.5 pl-1 animate-[fade-in_0.12s_ease-out]">
          {node.children!.map((child) => (
            <TreeItem
              key={child.id}
              node={child}
              selectedId={selectedId}
              onSelect={onSelect}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function TreeNav({
  data,
  selectedId,
  onSelect,
  className,
  ...props
}: TreeNavProps) {
  return (
    <div
      className={cn(
        "w-full max-w-xs rounded-xl border-2 border-foreground bg-card p-3 shadow-xs font-mono select-none",
        className
      )}
      {...props}
    >
      <div className="border-b border-dashed border-border pb-2 mb-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
        ARENA SEATING ZONES
      </div>
      <div className="space-y-0.5">
        {data.map((node) => (
          <TreeItem
            key={node.id}
            node={node}
            selectedId={selectedId}
            onSelect={onSelect}
          />
        ))}
      </div>
    </div>
  );
}
