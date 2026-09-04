"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface VideoFrameProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  reelNumber?: string;
  duration?: string;
  poster?: string;
  src?: string;
  autoPlay?: boolean;
  className?: string;
}

export function VideoFrame({
  title = "MIDNIGHT CINEMA ARCHIVE",
  reelNumber = "REEL-04",
  duration = "02:14:00",
  poster,
  src,
  autoPlay = false,
  className,
  ...props
}: VideoFrameProps) {
  const [isPlaying, setIsPlaying] = React.useState(autoPlay);
  const videoRef = React.useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl border-2 border-foreground bg-black shadow-lg font-mono select-none",
        className
      )}
      {...props}
    >
      {/* Top Film Sprocket Strip */}
      <div className="flex h-5 items-center justify-between bg-foreground/90 px-3">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={`sprocket-top-${i}`} className="h-2.5 w-1.5 rounded-[1px] bg-background/90" />
        ))}
      </div>

      {/* Frame Header */}
      <div className="flex items-center justify-between border-b border-white/20 bg-black/60 px-4 py-2 text-[11px] text-white/80">
        <div className="flex items-center gap-2">
          <span className="text-accent font-bold">●</span>
          <span className="font-bold uppercase tracking-wider">{title}</span>
        </div>
        <div className="flex items-center gap-3 text-[10px] text-white/60">
          <span>[{reelNumber}]</span>
          <span>{duration}</span>
        </div>
      </div>

      {/* Screen Area */}
      <div
        onClick={togglePlay}
        className="group relative flex aspect-video w-full cursor-pointer items-center justify-center bg-zinc-950"
      >
        {src ? (
          <video
            ref={videoRef}
            src={src}
            poster={poster}
            className="size-full object-cover"
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-900/80">
            {/* Visual ticket projector backdrop */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-800/40 via-zinc-950/80 to-black" />
            <div className="relative z-10 text-center text-white/50">
              <span className="text-3xl">🎞️</span>
              <p className="mt-2 text-xs uppercase tracking-widest">SCREENING ROOM 01</p>
            </div>
          </div>
        )}

        {/* Big Play Button Overlay */}
        {!isPlaying && (
          <div className="absolute z-20 flex size-14 items-center justify-center rounded-full border-2 border-accent bg-accent/90 text-white shadow-xl transition-transform group-hover:scale-110 active:scale-95 animate-pulse">
            <span className="ml-1 text-lg font-bold">▶</span>
          </div>
        )}
      </div>

      {/* Bottom Film Sprocket Strip */}
      <div className="flex h-5 items-center justify-between bg-foreground/90 px-3">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={`sprocket-bot-${i}`} className="h-2.5 w-1.5 rounded-[1px] bg-background/90" />
        ))}
      </div>
    </div>
  );
}
