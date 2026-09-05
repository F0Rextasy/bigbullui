"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface AudioRecorderProps extends React.HTMLAttributes<HTMLDivElement> {
  onSend?: (seconds: number) => void;
}

/** Audio recorder simulator: waveform + duration + send. */
export function AudioRecorder({ onSend, className, ...props }: AudioRecorderProps) {
  const [recording, setRecording] = React.useState(false);
  const [seconds, setSeconds] = React.useState(0);

  React.useEffect(() => {
    if (!recording) return;
    const t = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, [recording]);

  const stop = () => {
    setRecording(false);
    onSend?.(seconds);
    setSeconds(0);
  };

  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");

  return (
    <div className={cn("flex w-full max-w-sm items-center gap-3 rounded-md border border-border bg-card p-3", className)} {...props}>
      <style>{`@keyframes arWave { 0%, 100% { transform: scaleY(0.4); } 50% { transform: scaleY(1); } }`}</style>
      <button
        onClick={() => (recording ? stop() : setRecording(true))}
        className={cn(
          "flex size-11 shrink-0 items-center justify-center rounded-full transition-all duration-200 motion-reduce:transition-none",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          recording ? "bg-destructive text-white animate-pulse motion-reduce:animate-none" : "bg-accent text-accent-foreground hover:bg-accent/90"
        )}
        aria-label={recording ? "Stop and submit recording" : "Start recording"}
      >
        {recording ? (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="6" y="6" width="12" height="12" rx="1" /></svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" /><path d="M19 10v2a7 7 0 0 1-14 0v-2" /><path d="M12 19v4" /></svg>
        )}
      </button>
      <div className="min-w-0 flex-1">
        <p className="font-mono text-xs tabular-nums text-muted-foreground">{mm}:{ss}</p>
        <div className="mt-1 flex h-5 items-center gap-0.5" aria-hidden="true">
          {Array.from({ length: 24 }).map((_, i) => (
            <span
              key={i}
              className={cn("w-0.5 rounded-full", recording ? "bg-destructive" : "bg-border")}
              style={recording ? { height: `${20 + ((i * 13) % 70)}%`, animation: `arWave ${0.5 + (i % 5) * 0.1}s ease-in-out infinite`, animationDelay: `${i * 40}ms` } : { height: "20%" }}
            />
          ))}
        </div>
      </div>
      {recording && (
        <button
          onClick={stop}
          className="shrink-0 rounded-md bg-emerald-500 px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-white transition-all duration-150 hover:bg-emerald-600 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 motion-reduce:transition-none"
        >
          Send
        </button>
      )}
    </div>
  );
}
