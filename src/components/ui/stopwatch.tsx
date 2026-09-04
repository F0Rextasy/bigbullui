"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface LapRecord {
  lap: number;
  time: number; // in milliseconds
  formatted: string;
}

export interface StopwatchProps extends React.HTMLAttributes<HTMLDivElement> {
  autoStart?: boolean;
  onLap?: (lap: LapRecord) => void;
  className?: string;
}

export function Stopwatch({
  autoStart = false,
  onLap,
  className,
  ...props
}: StopwatchProps) {
  const [isRunning, setIsRunning] = React.useState(autoStart);
  const [time, setTime] = React.useState(0);
  const [laps, setLaps] = React.useState<LapRecord[]>([]);
  const timerRef = React.useRef<number | null>(null);
  const startTimeRef = React.useRef<number>(0);

  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const centiseconds = Math.floor((ms % 1000) / 10);

    const m = minutes.toString().padStart(2, "0");
    const s = seconds.toString().padStart(2, "0");
    const cs = centiseconds.toString().padStart(2, "0");

    return `${m}:${s}.${cs}`;
  };

  React.useEffect(() => {
    if (isRunning) {
      startTimeRef.current = performance.now() - time;
      timerRef.current = window.setInterval(() => {
        setTime(performance.now() - startTimeRef.current);
      }, 10);
    } else if (timerRef.current !== null) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    return () => {
      if (timerRef.current !== null) {
        clearInterval(timerRef.current);
      }
    };
  }, [isRunning]);

  const handleStartStop = () => {
    setIsRunning((prev) => !prev);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
    setLaps([]);
  };

  const handleRecordLap = () => {
    if (time === 0) return;
    const newLap: LapRecord = {
      lap: laps.length + 1,
      time,
      formatted: formatTime(time),
    };
    setLaps((prev) => [newLap, ...prev]);
    onLap?.(newLap);
  };

  return (
    <div
      className={cn(
        "relative flex flex-col items-center rounded-lg border-2 border-foreground bg-card p-6 font-mono select-none shadow-md",
        className
      )}
      {...props}
    >
      {/* Ticket notches */}
      <div
        aria-hidden="true"
        className="absolute -left-2 top-1/2 -translate-y-1/2 size-4 rounded-full border-2 border-foreground bg-background"
      />
      <div
        aria-hidden="true"
        className="absolute -right-2 top-1/2 -translate-y-1/2 size-4 rounded-full border-2 border-foreground bg-background"
      />

      {/* Micro header */}
      <div className="flex w-full items-center justify-between border-b border-dashed border-border pb-2 text-[10px] uppercase tracking-widest text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <span
            className={cn(
              "size-2 rounded-full",
              isRunning ? "bg-accent animate-ping" : "bg-muted-foreground"
            )}
          />
          <span>TURNSTILE CHRONO</span>
        </div>
        <span>REC-001</span>
      </div>

      {/* Main Digital Clock Display */}
      <div className="my-6 text-center">
        <div className="text-4xl font-black tracking-tight tabular-nums text-foreground sm:text-5xl">
          {formatTime(time)}
        </div>
        <div className="mt-1 text-[10px] uppercase tracking-widest text-muted-foreground">
          MINUTES : SECONDS . CENTISECONDS
        </div>
      </div>

      {/* Controls */}
      <div className="flex w-full items-center justify-center gap-2 border-t border-dashed border-border pt-4">
        <button
          type="button"
          onClick={handleStartStop}
          className={cn(
            "cursor-pointer rounded-md border-2 border-foreground px-4 py-2 text-xs font-bold uppercase tracking-wider shadow-xs transition-transform active:scale-95",
            isRunning
              ? "bg-accent text-accent-foreground"
              : "bg-foreground text-background"
          )}
        >
          {isRunning ? "PAUSE" : "START"}
        </button>

        <button
          type="button"
          disabled={!isRunning && time === 0}
          onClick={handleRecordLap}
          className="cursor-pointer rounded-md border-2 border-border bg-secondary px-3 py-2 text-xs font-bold uppercase tracking-wider text-foreground transition-colors hover:bg-card disabled:cursor-not-allowed disabled:opacity-40"
        >
          LAP STUB
        </button>

        <button
          type="button"
          disabled={time === 0}
          onClick={handleReset}
          className="cursor-pointer rounded-md border border-border bg-background px-3 py-2 text-xs font-bold uppercase tracking-wider text-muted-foreground transition-colors hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-40"
        >
          RESET
        </button>
      </div>

      {/* Laps List (Perforated ticket stub receipts) */}
      {laps.length > 0 && (
        <div className="mt-4 w-full space-y-1.5 border-t border-border pt-3 max-h-36 overflow-y-auto">
          {laps.map((lap) => (
            <div
              key={lap.lap}
              className="flex items-center justify-between rounded border border-dashed border-border bg-secondary/50 px-3 py-1.5 text-xs"
            >
              <span className="font-bold text-muted-foreground">
                LAP #{lap.lap.toString().padStart(2, "0")}
              </span>
              <span className="font-bold tabular-nums text-foreground">
                {lap.formatted}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
