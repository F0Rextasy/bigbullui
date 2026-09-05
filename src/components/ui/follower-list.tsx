"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface Follower {
  id: string;
  avatar: string;
  name: string;
  handle: string;
}

export interface FollowerListProps {
  followers: Follower[];
}

const FollowButton: React.FC<{
  isFollowing?: boolean;
  onToggle?: (following: boolean) => void;
}> = ({ isFollowing = false, onToggle }) => {
  const [isActive, setIsActive] = React.useState(isFollowing);

  const handleClick = () => {
    setIsActive(!isActive);
    onToggle?.(!isActive);
  };

  return (
    <button
      onClick={handleClick}
      className={cn(
        "flex items-center gap-1 rounded-md border border-dashed border-border/30 px-2.5 py-1 text-[10px] mono uppercase text-muted-foreground",
        isActive && "bg-accent text-accent-foreground",
        isActive && "hover:bg-accent/90"
      )}
    >
      {isActive ? (
        <>
          FOLLOWING
          <svg
            className="w-3 h-3"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </>
      ) : (
        <>
          FOLLOW
          <svg
            className="w-3 h-3"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path d="M6.8 2.5a2.2 2.2 0 0 1 2.1-.2h7.6a2.2 2.2 0 0 1 2.1 2.2v5.6a2.2 2.2 0 0 1-2.1 2.2H9.2a2.2 2.2 0 0 1-2.1-2.2V5.3a2.2 2.2 0 0 1 1.4-1.9z" />
            <line x1="10" y1="7.5" x2="15.5" y2="7.5" />
          </svg>
        </>
      )}
    </button>
  );
};

const FollowerList: React.FC<FollowerListProps> = ({ followers }) => {
  return (
    <div className="space-y-1">
      {followers.map((follower, idx) => (
        <div
          key={follower.id}
          className={cn(
            "flex items-center gap-3 px-1 py-1 rounded-sm border border-border/30 motion-reduce:transition-none",
                        "animate-[fade-in-up_0.3s_ease-out_both]"
          )}
        >
          <span
            className={cn(
              "rounded-full bg-border/20 p-1 text-[10px] mono uppercase text-muted-foreground",
              "w-6 h-6 flex-shrink-0"
            )}
          >
            {follower.avatar || "U"}
          </span>
          <div className="flex-1 min-w-0">
            <span className="font-mono uppercase text-foreground">
              {follower.name}
            </span>
            <span className="text-[10px] mono uppercase text-muted-foreground">
              {follower.handle}
            </span>
          </div>
          <FollowButton
            isFollowing={false}
            onToggle={() => console.log("toggle")}
          />
        </div>
      ))}
    </div>
  );
};

export { FollowerList };