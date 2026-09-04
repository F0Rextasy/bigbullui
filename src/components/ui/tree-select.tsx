"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface TreeSelectNode {
  id: string;
  label: string;
  children?: TreeSelectNode[];
}

export interface TreeSelectProps {
  data: TreeSelectNode[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (val: string, node: TreeSelectNode) => void;
  placeholder?: string;
  className?: string;
}

export function TreeSelect({
  data,
  value: controlledValue,
  defaultValue = "",
  onValueChange,
  placeholder = "SELECT TICKET SEAT / ZONE",
  className,
}: TreeSelectProps) {
  const [internalVal, setInternalVal] = React.useState(defaultValue);
  const [isOpen, setIsOpen] = React.useState(false);
  const [expandedIds, setExpandedIds] = React.useState<string[]>([]);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const isControlled = controlledValue !== undefined;
  const currentVal = isControlled ? controlledValue : internalVal;

  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleExpand = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleSelect = (node: TreeSelectNode) => {
    if (!isControlled) setInternalVal(node.label);
    onValueChange?.(node.id, node);
    setIsOpen(false);
  };

  const renderNode = (node: TreeSelectNode, depth = 0) => {
    const hasChildren = node.children && node.children.length > 0;
    const isExpanded = expandedIds.includes(node.id);
    const isSelected = currentVal === node.label || currentVal === node.id;

    return (
      <div key={node.id} className="space-y-0.5">
        <div
          onClick={() => {
            if (hasChildren) {
              setExpandedIds((prev) =>
                prev.includes(node.id) ? prev.filter((i) => i !== node.id) : [...prev, node.id]
              );
            } else {
              handleSelect(node);
            }
          }}
          style={{ paddingLeft: `${depth * 14 + 6}px` }}
          className={cn(
            "flex cursor-pointer items-center justify-between rounded-md py-1 pr-2 text-xs transition-colors",
            isSelected
              ? "bg-accent font-bold text-accent-foreground shadow-xs"
              : "text-foreground hover:bg-secondary"
          )}
        >
          <div className="flex items-center gap-1.5 truncate">
            {hasChildren ? (
              <button
                type="button"
                onClick={(e) => toggleExpand(node.id, e)}
                className="size-3.5 flex items-center justify-center text-[10px] text-muted-foreground transition-transform"
              >
                {isExpanded ? "▼" : "▶"}
              </button>
            ) : (
              <span className="text-[10px] text-accent font-bold">●</span>
            )}
            <span className="truncate">{node.label}</span>
          </div>
        </div>

        {hasChildren && isExpanded && (
          <div className="border-l border-dashed border-border/80 ml-3 space-y-0.5 pl-1 animate-[fade-in_0.12s_ease-out]">
            {node.children!.map((child) => renderNode(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div ref={containerRef} className={cn("relative w-full max-w-sm font-mono select-none", className)}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={cn(
          "flex w-full cursor-pointer items-center justify-between rounded-lg border-2 border-foreground bg-card px-3 py-2 text-xs transition-all shadow-xs",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          isOpen ? "border-accent ring-1 ring-accent" : "hover:border-foreground/70"
        )}
      >
        <span className={cn("truncate font-bold uppercase", !currentVal && "text-muted-foreground font-normal")}>
          {currentVal || placeholder}
        </span>
        <span className="text-[10px] text-muted-foreground ml-2">
          {isOpen ? "▲" : "▼"}
        </span>
      </button>

      {isOpen && (
        <div className="absolute left-0 top-full z-50 mt-1 max-h-60 w-full overflow-y-auto rounded-lg border-2 border-foreground bg-card p-2 shadow-xl outline-1 outline-dashed outline-offset-[-4px] animate-[scale-in_0.12s_ease-out_both] text-xs">
          <div className="border-b border-dashed border-border pb-1.5 mb-1.5 text-[9px] font-bold uppercase tracking-widest text-muted-foreground">
            SELECT SEATING ZONE
          </div>
          {data.map((node) => renderNode(node))}
        </div>
      )}
    </div>
  );
}
