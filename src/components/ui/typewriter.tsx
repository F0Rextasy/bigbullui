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

const Typewriter = ({ phrases, speed = 100, loop = true }: TypewriterProps) => {
  const [phraseIndex, setPhraseIndex] = React.useState(0);
  const [charIndex, setCharIndex] = React.useState(0);
  const isTyping = charIndex < phrases[phraseIndex].length;

  React.useEffect(() => {
    if (!isTyping) return;

    const timeout = setTimeout(() => {
      setCharIndex((c) => Math.min(c + 1, phrases[phraseIndex].length));
    }, speed);

    return () => clearTimeout(timeout);
  }, [phraseIndex, charIndex, speed, isTyping]);

  // Cycle to next phrase
  React.useEffect(() => {
    if (charIndex >= phrases[phraseIndex].length) {
      const interval = setInterval(() => {
        setPhraseIndex((i) => {
          const next = i + 1;
          return next >= phrases.length ? 0 : next;
        });
      }, speed * (phrases[phraseIndex].length + 1));

      return () => clearInterval(interval);
    }
  }, [charIndex, phrases[phraseIndex].length]);

  // Loop
  React.useEffect(() => {
    if (loop && charIndex >= phrases[phraseIndex].length) {
      setPhraseIndex((i) => (i + 1) % phrases.length);
      setCharIndex(0);
    }
  }, [loop, charIndex, phrases[phraseIndex].length]);

  const currentPhrase = phrases[phraseIndex];
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
