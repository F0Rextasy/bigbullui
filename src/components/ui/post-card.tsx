"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface PostCardProps {
  avatar: string;
  name: string;
  time: string;
  body: string;
  likes?: number;
  comments?: number;
  shares?: number;
}

const PostCard: React.FC<PostCardProps> = ({
  avatar,
  name,
  time,
  body,
  likes = 0,
  comments = 0,
  shares = 0,
}) => {
  return (
    <div className="group rounded-lg border border-border bg-card p-4 hover:border-accent/30 transition-colors duration-300">
      <div className="flex items-start gap-3">
        <span
          className={cn(
            "rounded-full bg-border/20 p-1 text-[10px] mono uppercase text-muted-foreground",
            "w-6 h-6 flex-shrink-0"
          )}
        >
          {avatar || "U"}
        </span>
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline gap-1 text-sm">
            <span className="font-mono uppercase text-muted-foreground">{name}</span>
            <span className="text-[10px] mono uppercase text-muted-foreground">
              {time}
            </span>
          </div>
          <p className="text-sm break-words">{body}</p>
        </div>
      </div>

      <div className="flex items-center gap-4 mt-3 pt-3 border-t border-border/30">
        <span className="text-[10px] font-mono uppercase text-muted-foreground">
          {likes} like{likes !== 1 && "s"}
        </span>
        <span className="text-[10px] font-mono uppercase text-muted-foreground">
          {comments} comment{comments !== 1 && "s"}
        </span>
        <span className="text-[10px] font-mono uppercase text-muted-foreground">
          {shares} share{shares !== 1 && "s"}
        </span>
      </div>
    </div>
  );
};

export { PostCard };