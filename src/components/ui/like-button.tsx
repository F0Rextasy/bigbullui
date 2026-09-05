"use client";

import * as React from "react";
import { cn } from "./lib/utils";

const likeBurstKeyframe = `
  @keyframes likeBurst {
    0% { opacity: 0; transform: scale(0); }
    50% { opacity: 1; transform: scale(1.2); }
    100% { opacity: 0; transform: scale(0); }
  }
`;

const LikeButton: React.FC<{ onClick?: () => void; initiallyActive?: boolean }> = ({
  onClick,
  initiallyActive = false,
}) => {
  const [active, setActive] = React.useState(initiallyActive);

  const handleClick = () => {
    setActive(true);
    onClick?.();
    // Reset after animation
    const timeout = setTimeout(() => setActive(false), 300);
    return () => clearTimeout(timeout);
  };

  return (
    <div
      className={cn(
        "relative inline-flex items-center justify-center rounded-full border border-border p-2 hover:bg-accent/5 hover:text-accent-foreground transition-colors duration-200",
        active && "bg-accent text-accent-foreground"
      )}
    >
      <svg
        className={cn("w-5 h-5", active && "text-accent-strong")}
        viewBox="0 0 24 24"
        fill={active ? "currentColor" : "none"}
      >
        <path d="M12 21.35l-1.45-1.32c-0.53-0.48-1.28-.41-1.66.09s-.81 1.19.59 1.7l7.19 6.59L12 17.28l-6.66 5.48c-0.52 0.45-1.27.74-2.06.74-.78 0-1.54-.28-2.06-.74L2.16 7.76c-0.77-0.7-1.03-1.81-.55-2.5l7.19-6.59L12 5.24l-6.82 5.46c-0.78 0.63-1.06 1.74-.55 2.5s1.28 1.12 2.06.74l7.19-6.59L12 21.35z" />
      </svg>
    </div>
  );
};

export { LikeButton };