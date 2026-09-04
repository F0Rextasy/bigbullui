"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface AudioMiniProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  artist?: string;
  duration?: string;
  src?: string;
  className?: string;
}

export function AudioMini({
  title = "STAGE LIVE RECORDING",
  artist = "ORCHESTRA ROW C",
  duration = "03:45",
  src,
  className,
  ...props
}: AudioMiniProps) {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [progress, setProgress] = React.useState(25);
  const audioRef = React.useRef<HTMLAudioElement>(null);

  React.useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      timer = setInterval(() => {
        setProgress((prev) => (prev >= 100 ? 0 : prev + 2));
      }, 500);
    }
    return () => clearInterval(timer);
  }, [isPlaying]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div
      className={cn(
        "inline-flex w-full max-w-sm flex-col gap-2.5 rounded-xl border-2 border-foreground bg-card p-4 shadow-sm outline-1 outline-dashed outline-offset-[-5px] font-mono select-none",
        className
      )}
      {...props}
    >
      {src && <audio ref={audioRef} src={src} onEnded={() => setIsPlaying(false)} />}

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 truncate">
          <button
            type="button"
            onClick={togglePlay}
            aria-label={isPlaying ? "Pause audio" : "Play audio"}
            className="flex size-8 shrink-0 items-center justify-center rounded-sm border border-foreground bg-accent text-accent-foreground shadow-xs transition-transform hover:scale-105 active:scale-95 cursor-pointer"
          >
            <span className="text-xs font-bold">{isPlaying ? "❚❚" : "▶"}</span>
          </button>

          <div className="truncate">
            <h4 className="truncate text-xs font-bold text-foreground uppercase">{title}</h4>
            <span className="text-[10px] text-muted-foreground uppercase">{artist}</span>
          </div>
        </div>

        {/* Equalizer Sound Waves */}
        <div className="flex items-end gap-1 h-5 pl-2">
          {[40, 80, 55, 100, 70].map((h, i) => (
            <div
              key={i}
              style={{ height: isPlaying ? `${h}%` : "20%" }}
              className={cn(
                "w-1 rounded-xs bg-accent transition-all duration-300",
                isPlaying && "animate-pulse"
              )}
            />
          ))}
        </div>
      </div>

      {/* Progress Track */}
      <div className="space-y-1">
        <div className="relative h-1.5 w-full overflow-hidden rounded-xs bg-secondary border border-border">
          <div
            style={{ width: `${progress}%` }}
            className="h-full bg-foreground transition-all duration-300"
          />
        </div>
        <div className="flex justify-between text-[9px] text-muted-foreground">
          <span>01:12</span>
          <span>{duration}</span>
        </div>
      </div>
    </div>
  );
}
