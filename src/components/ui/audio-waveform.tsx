"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface AudioWaveformProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onTimeUpdate"> {
  /** Concert / track title */
  title?: string;
  /** Performing artist or orchestra */
  artist?: string;
  /** Venue and seating information */
  venue?: string;
  /** Ticket serial number */
  serial?: string;
  /** Seat location info */
  seatInfo?: string;
  /** Recording date */
  date?: string;
  /** Audio track duration in seconds (default: 228 = 03:48) */
  duration?: number;
  /** Initial playback position in seconds (default: 34) */
  initialTime?: number;
  /** Number of waveform frequency bars (default: 36) */
  barCount?: number;
  /** Custom base waveform bar heights (array of percentages 15-100) */
  waveformData?: number[];
  /** Whether playback starts automatically */
  autoPlay?: boolean;
  /** Callback fired when play/pause state changes */
  onPlayPause?: (isPlaying: boolean) => void;
  /** Callback fired when timestamp advances */
  onTimeUpdate?: (currentTime: number) => void;
  /** Callback fired when seeking to a new time */
  onSeek?: (time: number) => void;
  /** Optional audio src if binding to HTML5 audio */
  audioSrc?: string;
  /** Additional container classes */
  className?: string;
}

function formatTime(totalSeconds: number, includeCentis = false): string {
  const safeSeconds = Math.max(0, totalSeconds);
  const mins = Math.floor(safeSeconds / 60);
  const secs = Math.floor(safeSeconds % 60);
  const m = mins.toString().padStart(2, "0");
  const s = secs.toString().padStart(2, "0");
  if (!includeCentis) return `${m}:${s}`;
  const centis = Math.floor((safeSeconds % 1) * 100);
  const cs = centis.toString().padStart(2, "0");
  return `${m}:${s}.${cs}`;
}

export function AudioWaveform({
  title = "CONCERT ARCHIVE // ACT II: OVERTURE",
  artist = "BIGBULL SYMPHONY ORCHESTRA",
  venue = "GRAND ARENA // MAIN HALL",
  serial = "STUB-AUD-9942",
  seatInfo = "SEC A · ROW 03 · SEAT 12",
  date = "2026-09-05",
  duration = 228,
  initialTime = 34,
  barCount = 36,
  waveformData,
  autoPlay = false,
  onPlayPause,
  onTimeUpdate,
  onSeek,
  audioSrc,
  className,
  ...props
}: AudioWaveformProps) {
  const [isPlaying, setIsPlaying] = React.useState(autoPlay);
  const [currentTime, setCurrentTime] = React.useState(Math.min(initialTime, duration));
  const [playbackRate, setPlaybackRate] = React.useState<1 | 1.25 | 1.5 | 2>(1);
  const [isMuted, setIsMuted] = React.useState(false);
  const [isLooping, setIsLooping] = React.useState(false);
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);
  const [liveFrequencies, setLiveFrequencies] = React.useState<number[]>([]);

  const audioElementRef = React.useRef<HTMLAudioElement | null>(null);
  const animationFrameRef = React.useRef<number | null>(null);
  const lastTimeRef = React.useRef<number>(0);

  // Generate deterministic base waveform curve if none provided
  const baseWaveform = React.useMemo(() => {
    if (waveformData && waveformData.length > 0) {
      return waveformData;
    }
    const generated: number[] = [];
    for (let i = 0; i < barCount; i++) {
      const progress = i / barCount;
      // Multi-harmonic waveform shape mimicking live concert recording
      const v1 = Math.sin(progress * Math.PI) * 55;
      const v2 = Math.sin(progress * Math.PI * 4) * 20;
      const v3 = Math.cos(progress * Math.PI * 7) * 12;
      const v4 = Math.sin(progress * 13.7) * 8;
      const height = Math.min(100, Math.max(18, Math.round(v1 + v2 + v3 + v4 + 28)));
      generated.push(height);
    }
    return generated;
  }, [waveformData, barCount]);

  // Initial live frequency bars setup
  React.useEffect(() => {
    setLiveFrequencies(baseWaveform);
  }, [baseWaveform]);

  // Handle Play/Pause audio element sync if audioSrc is provided
  React.useEffect(() => {
    if (!audioElementRef.current || !audioSrc) return;
    if (isPlaying) {
      audioElementRef.current.playbackRate = playbackRate;
      audioElementRef.current.play().catch(() => {});
    } else {
      audioElementRef.current.pause();
    }
  }, [isPlaying, playbackRate, audioSrc]);

  // Real-time animation loop for live frequency bars and timestamp progression
  React.useEffect(() => {
    if (!isPlaying) {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      // Return bars gently to base profile
      setLiveFrequencies(baseWaveform);
      return;
    }

    lastTimeRef.current = performance.now();

    const tick = (now: number) => {
      const deltaSeconds = (now - lastTimeRef.current) / 1000;
      lastTimeRef.current = now;

      // Advance track time
      setCurrentTime((prev) => {
        const nextTime = prev + deltaSeconds * playbackRate;
        if (nextTime >= duration) {
          if (isLooping) {
            onTimeUpdate?.(0);
            return 0;
          }
          setIsPlaying(false);
          onPlayPause?.(false);
          onTimeUpdate?.(duration);
          return duration;
        }
        onTimeUpdate?.(nextTime);
        return nextTime;
      });

      // Animate dynamic live frequency oscillations
      const timeFactor = now * 0.006;
      setLiveFrequencies(
        baseWaveform.map((base, idx) => {
          // Dynamic harmonic jitter for concert realism
          const bassBoost = idx < barCount * 0.25 ? Math.sin(timeFactor * 2.5) * 18 : 0;
          const midDance = Math.sin(timeFactor * 4 + idx * 0.8) * 14;
          const trebleFlicker = Math.cos(timeFactor * 6 - idx * 1.2) * 10;
          const randomEnergy = (Math.sin(now * 0.01 + idx * 19.3) * 0.5 + 0.5) * 12;

          const animatedHeight = Math.min(
            100,
            Math.max(15, Math.round(base + bassBoost + midDance + trebleFlicker + randomEnergy))
          );
          return animatedHeight;
        })
      );

      animationFrameRef.current = requestAnimationFrame(tick);
    };

    animationFrameRef.current = requestAnimationFrame(tick);

    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isPlaying, playbackRate, duration, isLooping, baseWaveform, barCount, onPlayPause, onTimeUpdate]);

  const togglePlay = React.useCallback(() => {
    setIsPlaying((prev) => {
      const next = !prev;
      onPlayPause?.(next);
      return next;
    });
  }, [onPlayPause]);

  const handleSeekIndex = React.useCallback(
    (index: number) => {
      const fraction = (index + 0.5) / barCount;
      const newTime = Math.min(duration, Math.max(0, fraction * duration));
      setCurrentTime(newTime);
      if (audioElementRef.current) {
        audioElementRef.current.currentTime = newTime;
      }
      onSeek?.(newTime);
    },
    [barCount, duration, onSeek]
  );

  const skipSeconds = React.useCallback(
    (amount: number) => {
      setCurrentTime((prev) => {
        const target = Math.min(duration, Math.max(0, prev + amount));
        if (audioElementRef.current) {
          audioElementRef.current.currentTime = target;
        }
        onSeek?.(target);
        return target;
      });
    },
    [duration, onSeek]
  );

  const cyclePlaybackRate = React.useCallback(() => {
    setPlaybackRate((prev) => {
      if (prev === 1) return 1.25;
      if (prev === 1.25) return 1.5;
      if (prev === 1.5) return 2;
      return 1;
    });
  }, []);

  const progressFraction = duration > 0 ? currentTime / duration : 0;
  const currentBarIndex = Math.floor(progressFraction * barCount);
  const percentage = Math.round(progressFraction * 100);

  return (
    <div
      className={cn(
        "relative flex flex-col lg:flex-row w-full max-w-3xl overflow-hidden rounded-xl border-2 border-foreground bg-card shadow-md font-mono select-none text-card-foreground",
        className
      )}
      role="region"
      aria-label={`Concert Recording: ${title}`}
      {...props}
    >
      {/* Optional native audio element */}
      {audioSrc && (
        <audio
          ref={audioElementRef}
          src={audioSrc}
          muted={isMuted}
          loop={isLooping}
          onEnded={() => {
            if (!isLooping) {
              setIsPlaying(false);
              onPlayPause?.(false);
            }
          }}
        />
      )}

      {/* Main Player & Waveform Section */}
      <div className="flex-1 p-5 sm:p-6 flex flex-col justify-between">
        {/* Top Header Eyebrow */}
        <div>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-accent flex items-center gap-1.5">
              <span
                className={cn(
                  "size-2 rounded-full transition-colors",
                  isPlaying
                    ? "bg-destructive animate-pulse shadow-[0_0_8px_#ef4444]"
                    : "bg-muted-foreground"
                )}
              />
              LIVE CONCERT ARCHIVE
            </span>
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              REC: {serial}
            </span>
          </div>

          <h3 className="mt-2 text-lg sm:text-xl font-bold tracking-tight text-foreground uppercase">
            {title}
          </h3>

          <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
            <span className="font-semibold text-foreground/90">{artist}</span>
            <span>·</span>
            <span>{venue}</span>
          </div>
        </div>

        {/* Inset Waveform Container */}
        <div className="mt-5 rounded-lg border-2 border-dashed border-border bg-secondary/30 p-3.5 sm:p-4">
          {/* Waveform Micro HUD */}
          <div className="mb-2.5 flex items-center justify-between text-[10px] text-muted-foreground uppercase tracking-wider">
            <div className="flex items-center gap-2">
              <span className="font-bold text-foreground">FREQ SPECTRUM</span>
              <span>{"// 48KHZ 24-BIT"}</span>
            </div>
            <div className="flex items-center gap-2">
              {hoveredIndex !== null && (
                <span className="text-accent font-bold">
                  SEEK: {formatTime(((hoveredIndex + 0.5) / barCount) * duration)}
                </span>
              )}
              <span>{percentage}% COMPLETE</span>
            </div>
          </div>

          {/* Interactive Multi-Bar Waveform Display */}
          <div
            className="relative flex items-end justify-between gap-[2px] sm:gap-1 h-24 sm:h-28 w-full cursor-pointer py-1 px-0.5"
            role="slider"
            aria-label="Audio waveform scrubber"
            aria-valuemin={0}
            aria-valuemax={duration}
            aria-valuenow={currentTime}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {liveFrequencies.map((height, index) => {
              const isPlayed = index <= currentBarIndex;
              const isCurrent = index === currentBarIndex;
              const isHovered = hoveredIndex === index;

              return (
                <div
                  key={index}
                  onClick={() => handleSeekIndex(index)}
                  onMouseEnter={() => setHoveredIndex(index)}
                  className="flex-1 h-full flex items-end group relative transition-transform"
                  title={`Jump to ${formatTime(((index + 0.5) / barCount) * duration)}`}
                >
                  <div
                    style={{ height: `${height}%` }}
                    className={cn(
                      "w-full rounded-xs transition-all duration-75",
                      isPlayed
                        ? isCurrent
                          ? "bg-foreground shadow-[0_0_6px_currentColor]"
                          : "bg-accent"
                        : "bg-muted-foreground/30 hover:bg-muted-foreground/50",
                      isHovered && "ring-1 ring-accent scale-y-105"
                    )}
                  />
                  {/* Subtle bar tick glow when current */}
                  {isCurrent && (
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 size-1.5 rounded-full bg-accent animate-ping" />
                  )}
                </div>
              );
            })}
          </div>

          {/* Timestamp Readout Row */}
          <div className="mt-3 flex items-center justify-between border-t border-dashed border-border pt-2 text-xs font-mono">
            <div className="flex items-center gap-2">
              <span className="text-base font-bold text-foreground">
                {formatTime(currentTime, true)}
              </span>
              <span className="text-muted-foreground">/</span>
              <span className="text-muted-foreground">{formatTime(duration)}</span>
            </div>

            <span
              className={cn(
                "rounded-xs border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider",
                isPlaying
                  ? "border-destructive bg-destructive/10 text-destructive"
                  : "border-border bg-secondary text-muted-foreground"
              )}
            >
              {isPlaying ? "● PLAYING" : "■ PAUSED"}
            </span>
          </div>
        </div>

        {/* Transport & Control Console */}
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
          {/* Main Playback Buttons */}
          <div className="flex items-center gap-2">
            {/* Play / Pause Toggle Button */}
            <button
              type="button"
              onClick={togglePlay}
              aria-label={isPlaying ? "Pause audio playback" : "Play audio recording"}
              className="flex size-11 shrink-0 items-center justify-center rounded-md border-2 border-foreground bg-accent text-accent-foreground shadow-sm transition-transform hover:scale-105 active:scale-95 cursor-pointer"
            >
              {isPlaying ? (
                <svg
                  className="size-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <rect x="6" y="4" width="4" height="16" rx="1" />
                  <rect x="14" y="4" width="4" height="16" rx="1" />
                </svg>
              ) : (
                <svg
                  className="size-5 translate-x-0.5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
              )}
            </button>

            {/* Skip Backwards 10s */}
            <button
              type="button"
              onClick={() => skipSeconds(-10)}
              aria-label="Skip backwards 10 seconds"
              className="flex size-9 items-center justify-center rounded-md border border-foreground/40 bg-card hover:bg-secondary text-foreground text-xs font-bold transition-colors cursor-pointer"
              title="Skip back 10 seconds"
            >
              -10s
            </button>

            {/* Skip Forwards 10s */}
            <button
              type="button"
              onClick={() => skipSeconds(10)}
              aria-label="Skip forwards 10 seconds"
              className="flex size-9 items-center justify-center rounded-md border border-foreground/40 bg-card hover:bg-secondary text-foreground text-xs font-bold transition-colors cursor-pointer"
              title="Skip forward 10 seconds"
            >
              +10s
            </button>
          </div>

          {/* Secondary Controls: Speed, Loop, Volume */}
          <div className="flex items-center gap-2">
            {/* Speed Stepper */}
            <button
              type="button"
              onClick={cyclePlaybackRate}
              className="rounded-md border border-foreground/40 bg-secondary px-2.5 py-1.5 text-xs font-bold text-foreground hover:bg-muted transition-colors cursor-pointer"
              title="Cycle playback speed"
            >
              {playbackRate}x
            </button>

            {/* Loop Toggle */}
            <button
              type="button"
              onClick={() => setIsLooping(!isLooping)}
              className={cn(
                "rounded-md border p-1.5 text-xs transition-colors cursor-pointer",
                isLooping
                  ? "border-accent bg-accent/10 text-accent font-bold"
                  : "border-border text-muted-foreground hover:text-foreground"
              )}
              title={isLooping ? "Loop enabled" : "Loop disabled"}
              aria-label="Toggle loop playback"
            >
              <svg
                className="size-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="m17 2 4 4-4 4" />
                <path d="M3 11v-1a4 4 0 0 1 4-4h14" />
                <path d="m7 22-4-4 4-4" />
                <path d="M21 13v1a4 4 0 0 1-4 4H3" />
              </svg>
            </button>

            {/* Mute Toggle */}
            <button
              type="button"
              onClick={() => setIsMuted(!isMuted)}
              className={cn(
                "rounded-md border p-1.5 text-xs transition-colors cursor-pointer",
                isMuted
                  ? "border-destructive bg-destructive/10 text-destructive"
                  : "border-border text-muted-foreground hover:text-foreground"
              )}
              title={isMuted ? "Unmute audio" : "Mute audio"}
              aria-label={isMuted ? "Unmute audio" : "Mute audio"}
            >
              {isMuted ? (
                <svg
                  className="size-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                  <line x1="22" y1="9" x2="16" y2="15" />
                  <line x1="16" y1="9" x2="22" y2="15" />
                </svg>
              ) : (
                <svg
                  className="size-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                  <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Perforation Divider with Punch Notches */}
      <div className="relative flex lg:flex-col items-center justify-between pointer-events-none">
        {/* Top/Left notch */}
        <div
          className="size-5 rounded-full bg-background border-2 border-foreground -ml-2.5 lg:ml-0 lg:-mt-2.5 shrink-0 z-20"
          aria-hidden="true"
        />

        {/* Dashed Perforation Line */}
        <div
          className="h-0 w-full lg:w-0 lg:h-full border-t-2 lg:border-t-0 lg:border-l-2 border-dashed border-border"
          aria-hidden="true"
        />

        {/* Bottom/Right notch */}
        <div
          className="size-5 rounded-full bg-background border-2 border-foreground -mr-2.5 lg:mr-0 lg:-mb-2.5 shrink-0 z-20"
          aria-hidden="true"
        />
      </div>

      {/* Right Stub Section: Audio Soundboard Log */}
      <div className="w-full lg:w-56 bg-secondary/40 p-5 flex flex-col justify-between border-t-2 lg:border-t-0 border-foreground">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground block text-center lg:text-left">
            AUDIO RECEIPT
          </span>
          <div className="mt-1 font-mono text-xs font-bold text-foreground truncate">
            {artist}
          </div>
          <div className="mt-1 text-[10px] font-mono text-muted-foreground">
            {seatInfo}
          </div>
          <div className="text-[10px] font-mono text-muted-foreground">
            {date}
          </div>
        </div>

        {/* VU Peak Meter Simulation */}
        <div className="my-4 rounded-md border border-dashed border-border bg-card p-2.5">
          <div className="flex items-center justify-between text-[9px] uppercase tracking-wider text-muted-foreground mb-1.5">
            <span>PEAK LEVEL</span>
            <span className="text-foreground font-bold">{isPlaying ? "-3.2 dB" : "-∞ dB"}</span>
          </div>

          {/* Left / Right Stereo LED Bars */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-1">
              <span className="text-[8px] font-bold text-muted-foreground w-2">L</span>
              <div className="flex flex-1 gap-0.5">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((seg) => {
                  const active = isPlaying && seg <= Math.floor(((currentTime * 7) % 8) + 2);
                  return (
                    <div
                      key={seg}
                      className={cn(
                        "h-2 flex-1 rounded-xs transition-opacity duration-75",
                        seg >= 7
                          ? "bg-destructive"
                          : seg >= 5
                          ? "bg-amber-500"
                          : "bg-emerald-500",
                        active ? "opacity-100" : "opacity-20"
                      )}
                    />
                  );
                })}
              </div>
            </div>

            <div className="flex items-center gap-1">
              <span className="text-[8px] font-bold text-muted-foreground w-2">R</span>
              <div className="flex flex-1 gap-0.5">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((seg) => {
                  const active = isPlaying && seg <= Math.floor(((currentTime * 5) % 8) + 1);
                  return (
                    <div
                      key={seg}
                      className={cn(
                        "h-2 flex-1 rounded-xs transition-opacity duration-75",
                        seg >= 7
                          ? "bg-destructive"
                          : seg >= 5
                          ? "bg-amber-500"
                          : "bg-emerald-500",
                        active ? "opacity-100" : "opacity-20"
                      )}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Stub Footer: Audio Format Rubber Stamp & Barcode */}
        <div className="border-t border-dashed border-border pt-3 text-center">
          <div className="mb-2">
            <span className="inline-block rotate-[-4deg] rounded-xs border border-accent bg-accent/10 px-2 py-0.5 font-mono text-[9px] font-black uppercase tracking-widest text-accent">
              LOSSLESS MASTER
            </span>
          </div>

          <span className="font-mono text-[9px] text-muted-foreground uppercase tracking-widest block">
            CONCERT TAPE ARCHIVE
          </span>
          <span className="mt-1 font-mono text-[10px] font-bold text-foreground tracking-widest block">
            *{serial}*
          </span>
        </div>
      </div>
    </div>
  );
}
