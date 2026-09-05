"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface CommentNode {
  id: string;
  author: string;
  initials: string;
  body: string;
  time?: string;
  children?: CommentNode[];
}

export interface CommentThreadProps {
  comments: CommentNode[];
  maxDepth?: number;
}

const CommentThread: React.FC<CommentThreadProps> = ({
  comments,
  maxDepth = 3,
}) => {
  const renderComment = (
    node: CommentNode,
    depth: number
  ): React.ReactNode => {
    if (depth > maxDepth) return null;

    const isLast = depth === 0; // simplified

    return (
      <div
        key={node.id}
        className={cn(
          "flex flex-col gap-1",
          depth > 0 && "pl-4 border-l-2 border-border/40"
        )}
      >
        <div className="flex items-start gap-2">
          <span
            className={cn(
              "rounded-full bg-border/20 p-1 text-[10px] mono uppercase text-muted-foreground",
              "w-6 h-6"
            )}
          >
            {node.initials}
          </span>
          <div className="flex-1 min-w-0">
            <div className="flex items-baseline gap-1 text-sm">
              <span className="mono uppercase text-muted-foreground">
                {node.author}
              </span>
              <span className="text-[10px] mono uppercase text-muted-foreground">
                {node.time || ""}
              </span>
            </div>
            <p className="text-sm break-words">{node.body}</p>
          </div>
        </div>

        {node.children && node.children.length > 0 && depth < maxDepth && (
          <div
            className={cn(
              "mt-2 pl-1 border-l-2 border-dashed border-border/30",
              "motion-reduce:transition-none"
            )}
          >
            {node.children.map((child) => renderComment(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-2">
      {comments.map((comment) => renderComment(comment, 0))}
    </div>
  );
};

export { CommentThread };