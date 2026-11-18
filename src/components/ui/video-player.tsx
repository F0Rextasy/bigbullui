"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface VideoPlayerProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  duration?: number;
  src?: string;
  poster?: React.ReactNode;
  className?: string;
}

export function VideoPlayer({
  title = "Video",
  duration = 120,
  src,
  poster,
  className,
  ...props
}: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [isMuted, setIsMuted] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [mediaDuration, setMediaDuration] = React.useState(duration);
  const [hovered, setHovered] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const videoElRef = React.useRef<HTMLVideoElement>(null);

  const effectiveDuration = Math.max(1, src ? mediaDuration : duration);

  React.useEffect(() => {
    if (src || !isPlaying) return;
    const timer = setInterval(() => {
      setProgress((p) => {
        if (p + 1 >= effectiveDuration) {
          setIsPlaying(false);
          return effectiveDuration;
        }
        return p + 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isPlaying, src, effectiveDuration]);

  const togglePlay = () => {
    if (src && videoElRef.current) {
      if (videoElRef.current.paused) {
        void videoElRef.current.play().catch(() => {});
        setIsPlaying(true);
      } else {
        videoElRef.current.pause();
        setIsPlaying(false);
      }
      return;
    }
    setIsPlaying((prev) => {
      if (!prev && progress >= effectiveDuration) setProgress(0);
      return !prev;
    });
  };

  const toggleMute = () => {
    setIsMuted((prev) => {
      const next = !prev;
      if (videoElRef.current) videoElRef.current.muted = next;
      return next;
    });
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setProgress(val);
    if (videoElRef.current) videoElRef.current.currentTime = val;
  };

  const toggleFullscreen = () => {
    const el = containerRef.current;
    if (!el) return;
    if (document.fullscreenElement) {
      void document.exitFullscreen?.();
    } else {
      void el.requestFullscreen?.();
    }
  };

  const formatTime = (seconds: number) => {
    const whole = Math.max(0, Math.floor(seconds));
    const mins = Math.floor(whole / 60);
    const secs = whole % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const showControls = hovered || !isPlaying;

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        "group relative rounded-lg overflow-hidden bg-card border border-border shadow-sm",
        className
      )}
      {...props}
    >
      {/* Video frame with sprocket styling */}
      <div className="relative h-52 w-full bg-foreground/95 text-background">
        {src ? (
          <video
            ref={videoElRef}
            src={src}
            poster={typeof poster === "string" ? poster : undefined}
            muted={isMuted}
            playsInline
            onLoadedMetadata={(e) => {
              if (Number.isFinite(e.currentTarget.duration) && e.currentTarget.duration > 0) {
                setMediaDuration(e.currentTarget.duration);
              }
            }}
            onTimeUpdate={(e) => setProgress(e.currentTarget.currentTime)}
            onEnded={() => setIsPlaying(false)}
            className="h-full w-full object-cover"
          />
        ) : poster ? (
          typeof poster === "string" ? (
            <img src={poster} alt={title} className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-muted text-muted-foreground">
              {poster}
            </div>
          )
        ) : (
          <div className="flex h-full w-full items-center justify-center font-mono text-xs uppercase tracking-widest text-background/70">
            {title}
          </div>
        )}

        {/* Sprocket frame */}
        <div aria-hidden="true" className="pointer-events-none absolute top-0 left-0 right-0 flex h-2 items-center justify-between bg-foreground/40 px-2">
          <div className="size-1 rounded-xs bg-background/60" />
          <div className="size-1 rounded-xs bg-background/60" />
          <div className="size-1 rounded-xs bg-background/60" />
        </div>

        {/* Center play/pause button */}
        <div
          className={cn(
            "absolute inset-0 flex items-center justify-center transition-opacity duration-200 motion-reduce:transition-none",
            showControls ? "opacity-100" : "opacity-0 group-focus-within:opacity-100"
          )}
        >
          <button
            type="button"
            onClick={togglePlay}
            aria-label={isPlaying ? `Pause ${title}` : `Play ${title}`}
            className="cursor-pointer rounded-full bg-background/85 p-3 text-foreground shadow-md transition-transform hover:scale-105 motion-reduce:transition-none motion-reduce:hover:scale-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {isPlaying ? (
              <svg className="size-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <rect x="6" y="4" width="4" height="16" rx="1" />
                <rect x="14" y="4" width="4" height="16" rx="1" />
              </svg>
            ) : (
              <svg className="size-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>
        </div>

        {/* Bottom control bar */}
        <div
          className={cn(
            "absolute inset-x-0 bottom-0 flex items-center gap-2 bg-foreground/80 px-3 py-2 text-xs font-mono text-background transition-opacity duration-200 motion-reduce:transition-none",
            showControls ? "opacity-100" : "opacity-0 group-focus-within:opacity-100"
          )}
        >
          <span className="tabular-nums">{formatTime(progress)}</span>
          <input
            type="range"
            min={0}
            max={effectiveDuration}
            value={Math.min(progress, effectiveDuration)}
            onChange={handleSeek}
            aria-label="Seek video"
            className="h-1 flex-1 cursor-pointer accent-accent"
          />
          <span className="tabular-nums">{formatTime(effectiveDuration)}</span>
          <button
            type="button"
            onClick={toggleMute}
            aria-label={isMuted ? "Unmute" : "Mute"}
            className="cursor-pointer rounded px-1.5 py-0.5 text-[10px] uppercase hover:bg-background/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {isMuted ? "Muted" : "Sound"}
          </button>
          <button
            type="button"
            onClick={toggleFullscreen}
            aria-label="Toggle fullscreen"
            className="cursor-pointer rounded px-1.5 py-0.5 text-[10px] uppercase hover:bg-background/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Full
          </button>
        </div>
      </div>
    </div>
  );
}