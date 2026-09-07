"use client";

import * as React from "react";

export interface UseTicketAudioOptions {
  src?: string;
  initialMuted?: boolean;
}

export interface UseTicketAudioResult {
  audioRef: React.RefObject<HTMLAudioElement | null>;
  muted: boolean;
  setMuted: (muted: boolean) => void;
  toggle: () => void;
}

/** Tiny audio state hook: muted flag plus an optional bound audio element. */
export function useTicketAudio(options?: UseTicketAudioOptions): UseTicketAudioResult {
  const [muted, setMuted] = React.useState(options?.initialMuted ?? false);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);

  React.useEffect(() => {
    if (options?.src && !audioRef.current && typeof Audio !== "undefined") {
      audioRef.current = new Audio(options.src);
    }
  }, [options?.src]);

  React.useEffect(() => {
    if (audioRef.current) audioRef.current.muted = muted;
  }, [muted]);

  const toggle = React.useCallback(() => {
    setMuted((m) => !m);
  }, []);

  return { audioRef, muted, setMuted, toggle };
}
