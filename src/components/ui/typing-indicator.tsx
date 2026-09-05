"use client";

import * as React from "react";
import { cn } from "./lib/utils";

const dotKeyframe = `
  @keyframes typingDotBounce {
    0%, 60%, 100% { transform: translateY(0); }
    30% { transform: translateY(-8px); }
  }
`;

const TypingIndicator: React.FC = () => {
  const [dots, setDots] = React.useState< number[]>([0, 0, 0]);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => {
        const next = [...prev];
        next[0] = 1 - next[0];
        next[1] = 1 - next[1];
        next[2] = 1 - next[2];
        return next;
      });
    }, 300);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={cn(
        "flex items-baseline gap-1",
        "motion-reduce:animate-none"
      )}
    >
      <span
        className={cn(
          "w-2 h-2 rounded-full bg-accent",
          "animate-[typingDotBounce_1.2s_ease-in_out_both]",
          "motion-reduce:animate-none"
        )}
        style={{ animationDelay: `${dots[0] * 120}ms` }}
      />
      <span
        className={cn(
          "w-2 h-2 rounded-full bg-accent",
          "animate-[typingDotBounce_1.2s_ease-in_out_both]",
          "motion-reduce:animate-none"
        )}
        style={{ animationDelay: `${dots[1] * 120}ms` }}
      />
      <span
        className={cn(
          "w-2 h-2 rounded-full bg-accent",
          "animate-[typingDotBounce_1.2s_ease-in_out_both]",
          "motion-reduce:animate-none"
        )}
        style={{ animationDelay: `${dots[2] * 120}ms` }}
      />
      {dots[0] === 1 && dots[1] === 1 && dots[2] === 1 && (
        <span className="text-[10px] mono uppercase text-muted-foreground">ADA is typing</span>
      )}
    </div>
  );
};

export { TypingIndicator };