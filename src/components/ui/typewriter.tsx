"use client";
import * as React from "react";
import { cn } from "./lib/utils";

export type TypewriterProps = {
  phrases: string[];
  speed?: number;
  loop?: boolean;
};

const typewriterBlinkKeyframes = `
  @keyframes typewriterBlink {
    from { border-color: transparent; }
    to { border-color: currentColor; }
  }
`;

const Typewriter = ({ phrases = [], speed = 100, loop = true }: TypewriterProps) => {
  const [phraseIndex, setPhraseIndex] = React.useState(0);
  const [charIndex, setCharIndex] = React.useState(0);
  const currentPhrase = phrases[phraseIndex] ?? "";
  const isTyping = charIndex < currentPhrase.length;

  React.useEffect(() => {
    if (!isTyping) return;

    const timeout = setTimeout(() => {
      setCharIndex((c) => Math.min(c + 1, currentPhrase.length));
    }, speed);

    return () => clearTimeout(timeout);
  }, [phraseIndex, charIndex, speed, isTyping, currentPhrase.length]);

  // Cycle to next phrase
  React.useEffect(() => {
    if (phrases.length === 0) return;
    if (charIndex >= currentPhrase.length) {
      const interval = setInterval(() => {
        setPhraseIndex((i) => {
          const next = i + 1;
          return next >= phrases.length ? 0 : next;
        });
      }, speed * (currentPhrase.length + 1));

      return () => clearInterval(interval);
    }
  }, [charIndex, currentPhrase.length, phrases.length, speed]);

  // Loop
  React.useEffect(() => {
    if (phrases.length === 0) return;
    if (loop && charIndex >= currentPhrase.length) {
      setPhraseIndex((i) => (i + 1) % phrases.length);
      setCharIndex(0);
    }
  }, [loop, charIndex, currentPhrase.length, phrases.length]);

  const displayed = isTyping ? currentPhrase.substring(0, charIndex) : currentPhrase;

  return (
    <div
      className={cn(
        "relative inline-block",
        "animate-[fade-in-up_0.3s_ease-out_both]",
        "motion-reduce:animate-none"
      )}
    >
      <style>{typewriterBlinkKeyframes}</style>
      <span
        className={cn(
          "block",
          "border-b-2 border-transparent rounded-b",
          "motion-reduce:border-0"
        )}
        style={{ animationDelay: `${charIndex * speed}ms` }}
      >
        {displayed}{" "}
      </span>
      <span
        className={cn(
          "absolute bottom-0 right-0 text-xxs opacity-50",
          "motion-reduce:opacity-0"
        )}
        role="status"
      >
        \u25A1
      </span>
    </div>
  );
};

export { Typewriter };
