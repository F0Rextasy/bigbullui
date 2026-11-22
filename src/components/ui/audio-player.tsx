"use client";

import * as React from "react";
import { cn, isSafeUrl } from "./lib/utils";

export interface AudioPlayerProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  artist?: string;
  duration?: number;
  src?: string;
  cover?: React.ReactNode;
  className?: string;
}

function isSafeCoverSrc(src: string): boolean {
  const trimmed = src.trim();
  return isSafeUrl(trimmed) || /^data:image\/(?:png|jpe?g|webp|gif|svg\+xml)[;,]/i.test(trimmed);
}

export function AudioPlayer({
  title,
  artist = "Unknown Artist",
  duration = 180,
  src,
  cover,
  className,
  ...props
}: AudioPlayerProps) {
  const audioRef = React.useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [mediaDuration, setMediaDuration] = React.useState<number | null>(null);
  const [volume, setVolume] = React.useState(0.7);
  const [muted, setMuted] = React.useState(false);

  const hasSafeSrc = Boolean(src && isSafeUrl(src));
  const effectiveDuration = Math.max(0, mediaDuration ?? duration);

  React.useEffect(() => {
    if (hasSafeSrc || !isPlaying || effectiveDuration <= 0) return;
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
  }, [hasSafeSrc, isPlaying, effectiveDuration]);

  React.useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = volume;
    audio.muted = muted;
  }, [volume, muted]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (hasSafeSrc && audio) {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        void audio.play().then(
          () => setIsPlaying(true),
          () => setIsPlaying(false),
        );
      }
      return;
    }
    if (!isPlaying && effectiveDuration > 0 && progress >= effectiveDuration) {
      setProgress(0);
    }
    setIsPlaying((prev) => !prev);
  };

  const handleSeek = (next: number) => {
    const clamped = Math.max(0, Math.min(next, effectiveDuration));
    setProgress(clamped);
    if (hasSafeSrc && audioRef.current) {
      audioRef.current.currentTime = clamped;
    }
  };

  const formatTime = (seconds: number) => {
    const safe = Math.max(0, Math.floor(seconds));
    const mins = Math.floor(safe / 60);
    const secs = safe % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const pct = effectiveDuration > 0 ? Math.min(100, (progress / effectiveDuration) * 100) : 0;

  return (
    <div
      className={cn(
        "w-full max-w-sm rounded-xl border-2 border-dashed border-border bg-card p-6 text-card-foreground shadow-sm outline-1 outline-dashed outline-offset-[-6px]",
        className,
      )}
      {...props}
    >
      {hasSafeSrc ? (
        <audio
          ref={audioRef}
          src={src}
          preload="metadata"
          onLoadedMetadata={(e) => {
            const d = e.currentTarget.duration;
            if (Number.isFinite(d) && d > 0) setMediaDuration(Math.round(d));
          }}
          onTimeUpdate={(e) => setProgress(Math.floor(e.currentTarget.currentTime))}
          onEnded={() => setIsPlaying(false)}
        />
      ) : null}

      {cover ? (
        <div className="mb-4 h-40 overflow-hidden rounded-lg border border-border bg-muted">
          {typeof cover === "string" ? (
            isSafeCoverSrc(cover) ? (
              <img src={cover} alt={title} className="h-full w-full object-cover" />
            ) : null
          ) : (
            cover
          )}
        </div>
      ) : null}

      <div className="mb-4 flex items-center justify-between gap-2">
        <h3 className="truncate font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-foreground">
          {title}
        </h3>
        {artist ? <p className="shrink-0 font-mono text-xs text-muted-foreground">{artist}</p> : null}
      </div>

      <div className="mb-4">
        <div className="mb-2 flex items-center justify-between font-mono text-xs text-muted-foreground">
          <span>{formatTime(progress)}</span>
          <span>{formatTime(effectiveDuration)}</span>
        </div>
        <div className="h-2.5 w-full overflow-hidden rounded-full bg-secondary">
          <div
            className={cn(
              "h-full rounded-full bg-primary transition-all duration-300 ease-out motion-reduce:transition-none",
              progress > 0 && "shadow-xs",
            )}
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      <div className="mb-4 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={togglePlay}
          aria-label={isPlaying ? "Pause" : "Play"}
          className="cursor-pointer rounded-full bg-primary/10 p-2 text-primary transition-colors hover:bg-primary/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none"
        >
          {isPlaying ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <rect x="6" y="4" width="4" height="16" rx="1" />
              <rect x="14" y="4" width="4" height="16" rx="1" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <polygon points="6 4 20 12 6 20 6 4" />
            </svg>
          )}
        </button>

        <div className="flex flex-1 items-center justify-end gap-2">
          <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
            {formatTime(progress)}
          </span>
          <input
            type="range"
            aria-label="Seek audio"
            min={0}
            max={effectiveDuration}
            value={Math.min(progress, effectiveDuration)}
            onChange={(e) => handleSeek(parseInt(e.target.value, 10) || 0)}
            className="h-1.5 w-28 cursor-pointer rounded-md bg-muted accent-accent outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1"
          />
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-dashed border-border pt-3">
        <button
          type="button"
          aria-pressed={muted || volume === 0}
          onClick={() => setMuted(true)}
          className={cn(
            "cursor-pointer rounded p-1 transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none",
            muted || volume === 0 ? "bg-muted text-foreground" : "text-muted-foreground",
          )}
          aria-label="Mute"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <line x1="23" y1="9" x2="17" y2="15" />
            <line x1="17" y1="9" x2="23" y2="15" />
          </svg>
        </button>
        <input
          type="range"
          aria-label="Volume"
          min={0}
          max={1}
          step={0.05}
          value={muted ? 0 : volume}
          onChange={(e) => {
            const v = parseFloat(e.target.value);
            setVolume(v);
            setMuted(v === 0);
          }}
          className="h-1 w-24 cursor-pointer rounded-md bg-muted accent-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
        <button
          type="button"
          aria-pressed={!muted && volume > 0}
          onClick={() => {
            setMuted(false);
            if (volume === 0) setVolume(0.7);
          }}
          className={cn(
            "cursor-pointer rounded p-1 transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none",
            !muted && volume > 0 ? "bg-muted text-foreground" : "text-muted-foreground",
          )}
          aria-label="Unmute"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
          </svg>
        </button>
      </div>
    </div>
  );
}
