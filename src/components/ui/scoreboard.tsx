"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface ScoreboardTeam {
  name: string;
  score: number;
  period?: string;
}

export interface ScoreboardProps extends React.HTMLAttributes<HTMLDivElement> {
  teams: ScoreboardTeam[];
  className?: string;
}

export function Scoreboard({
  teams,
  className,
  ...props
}: ScoreboardProps) {
  const scoreRollAnimals = teams.map((team, teamIdx) => {
    const [current, setCurrent] = React.useState(team.score);
    const target = team.score;

    React.useEffect(() => {
      let animationFrame: number;
      let start: number;
      const duration = 500;

      const animate = (timestamp: number) => {
        if (!start) start = timestamp;
        const progress = Math.min((timestamp - start) / duration, 1);
        // Easing function
        const eased = 1 - Math.pow(1 - progress, 3);
        setCurrent(Math.round(start + (target - start) * eased));
        if (progress < 1) {
          animationFrame = requestAnimationFrame(animate);
        } else {
          setCurrent(target);
          cancelAnimationFrame(animationFrame);
        }
      };

      animationFrame = requestAnimationFrame(animate);
    }, [target]);

    return { current, target, teamIdx };
  });

  return (
    <div
      className={cn(
        "w-full space-y-3",
        "motion-reduce:animate-none",
        className,
      )}
      {...props}
    >
      {teams.map((team, teamIdx) => {
        const { current, teamIdx: _ } = scoreRollAnimals[teamIdx];

        return (
          <div
            key={team.name}
            className={cn(
              "flex items-center justify-between",
              "motion-reduce:transition-none",
            )}
          >
            <span
              className={cn(
                "text-[10px] uppercase tracking-[0.15em] text-muted-foreground",
              )}
            >
              {team.name}
            </span>

            <div className="flex items-center gap-2">
              {/* Big rolling score digits */}
              <div className="relative">
                {(() => {
                  const digits = String(current).split("");
                  return (
                <div className="flex gap-1">
                  {digits.map((digit, dIdx) => (
                    <div
                      key={digit}
                      className={cn(
                        "w-8 h-8 rounded-md",
                        "border border-border/60 bg-card",
                        "flex items-center justify-center",
                        "font-mono text-3xl font-bold",
                        dIdx > 0 ? "scale-95" : "scale-100",
                        "motion-reduce:transition-none",
                        "animate-[scoreboardRoll_0.4s_ease-out_both]",
                      )}
                    >
                      {digit}
                    </div>
                  ))}
                </div>
                  );
                })()}
                {current > 0 && (
                  <span className="text-[10px] text-muted-foreground">&#8377;</span>
                )}
              </div>
            </div>

            <span
              className={cn(
                "text-[10px] uppercase tracking-[0.15em] text-muted-foreground",
              )}
            >
              {team.period || ""}
            </span>
          </div>
        );
      })}
    </div>
  );
}