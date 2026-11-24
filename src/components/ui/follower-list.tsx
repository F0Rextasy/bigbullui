"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface Follower {
  id: string;
  avatar: string;
  name: string;
  handle: string;
  isFollowing?: boolean;
}

export interface FollowerListProps extends React.HTMLAttributes<HTMLDivElement> {
  followers?: Follower[];
  onToggleFollow?: (id: string, following: boolean) => void;
}

function FollowButton({
  defaultFollowing = false,
  followerName,
  onToggle,
}: {
  defaultFollowing?: boolean;
  followerName: string;
  onToggle?: (following: boolean) => void;
}) {
  const [isActive, setIsActive] = React.useState(defaultFollowing);

  const handleClick = () => {
    const next = !isActive;
    setIsActive(next);
    onToggle?.(next);
  };

  return (
    <button
      type="button"
      aria-pressed={isActive}
      aria-label={isActive ? `Unfollow ${followerName}` : `Follow ${followerName}`}
      onClick={handleClick}
      className={cn(
        "inline-flex shrink-0 cursor-pointer items-center gap-1 rounded-md border border-dashed border-border px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        isActive && "border-solid border-accent bg-accent text-accent-foreground hover:bg-accent/90 hover:text-accent-foreground",
      )}
    >
      {isActive ? (
        <>
          <span>Following</span>
          <svg
            className="size-3"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </>
      ) : (
        <>
          <span>Follow</span>
          <svg
            className="size-3"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M12 5v14M5 12h14" />
          </svg>
        </>
      )}
    </button>
  );
}

export const FollowerList = React.forwardRef<HTMLDivElement, FollowerListProps>(function FollowerList(
  { followers = [], onToggleFollow, className, ...props },
  ref,
) {
  return (
    <div ref={ref} className={cn("space-y-1.5", className)} {...props}>
      {followers.map((follower) => (
        <div
          key={follower.id}
          className="flex items-center gap-3 rounded-sm border border-border/60 bg-card px-2.5 py-2 motion-safe:animate-[fade-in-up_0.3s_ease-out_both] motion-reduce:animate-none"
        >
          <span
            aria-hidden="true"
            className="flex size-7 shrink-0 items-center justify-center rounded-full bg-secondary font-mono text-[10px] font-bold uppercase text-secondary-foreground"
          >
            {follower.avatar || "U"}
          </span>
          <div className="min-w-0 flex-1">
            <span className="block truncate font-mono text-xs font-semibold uppercase text-foreground">
              {follower.name}
            </span>
            <span className="block truncate font-mono text-[10px] text-muted-foreground">
              {follower.handle}
            </span>
          </div>
          <FollowButton
            key={`${follower.id}-${Boolean(follower.isFollowing)}`}
            defaultFollowing={Boolean(follower.isFollowing)}
            followerName={follower.name}
            onToggle={(next) => onToggleFollow?.(follower.id, next)}
          />
        </div>
      ))}
    </div>
  );
});
FollowerList.displayName = "FollowerList";
