"use client";

import * as React from "react";

export interface UseTicketAudioOptions {
  src?: string;
  initialMuted?: boolean;
}

export interface UseTicketAudioResult {
  audioRef: React.RefObject<HTMLAudioElement | null>;
  muted: boolean;
  playing: boolean;
  isReady: boolean;
  error: string | null;
  setMuted: (muted: boolean) => void;
  toggle: () => void;
  play: () => Promise<void>;
  pause: () => void;
}

/** Tiny audio state hook: muted flag, playback controls, error state, and bound audio element. */
export function useTicketAudio(options?: UseTicketAudioOptions): UseTicketAudioResult {
  const [muted, setMuted] = React.useState(options?.initialMuted ?? false);
  const [playing, setPlaying] = React.useState(false);
  const [isReady, setIsReady] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const mutedRef = React.useRef(muted);
  React.useLayoutEffect(() => {
    mutedRef.current = muted;
  });
  const audioRef = React.useRef<HTMLAudioElement | null>(null);

  React.useEffect(() => {
    if (!options?.src || typeof Audio === "undefined") {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
        audioRef.current = null;
      }
      return;
    }

    let audio: HTMLAudioElement;
    try {
      audio = new Audio(options.src);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Audio unavailable";
      queueMicrotask(() => {
        setError(msg);
        setIsReady(false);
      });
      return;
    }

    audio.muted = mutedRef.current;
    audioRef.current = audio;

    const onCanPlay = () => {
      setIsReady(true);
      setError(null);
    };
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    const onEnded = () => setPlaying(false);
    const onError = () => {
      setError("Failed to load audio");
      setPlaying(false);
      setIsReady(false);
    };

    audio.addEventListener("canplay", onCanPlay);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("ended", onEnded);
    audio.addEventListener("error", onError);

    return () => {
      audio.removeEventListener("canplay", onCanPlay);
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("error", onError);
      audio.pause();
      audio.src = "";
      if (audioRef.current === audio) {
        audioRef.current = null;
      }
      setPlaying(false);
      setIsReady(false);
    };
  }, [options?.src]);

  React.useEffect(() => {
    if (audioRef.current) audioRef.current.muted = muted;
  }, [muted]);

  const toggle = React.useCallback(() => {
    setMuted((m) => !m);
  }, []);

  const play = React.useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;
    try {
      setError(null);
      await audio.play();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Playback blocked");
      setPlaying(false);
    }
  }, []);

  const pause = React.useCallback(() => {
    audioRef.current?.pause();
  }, []);

  return { audioRef, muted, playing, isReady, error, setMuted, toggle, play, pause };
}
