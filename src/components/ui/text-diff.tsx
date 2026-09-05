import * as React from "react";
import { cn } from "./lib/utils";

export type TextDiffMode = "inline" | "side";

export type TextDiffProps = {
  before: string;
  after: string;
  mode?: TextDiffMode;
};

const diffStaggerKeyframes = `
  @keyframes slideIn {
    from { transform: translateY(8px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
`;

const TextDiff = ({ before, after, mode = "inline" }: TextDiffProps) => {
  const beforeWords = before.split(/\s+/);
  const afterWords = after.split(/\s+/);

  // Simple LCS to find added/removed/kept words
  const lcsMatrix: (string | null)[][] = [];
  for (let i = 0; i <= beforeWords.length; i++) {
    lcsMatrix[i] = [];
    for (let j = 0; j <= afterWords.length; j++) {
      if (i === 0 || j === 0) {
        lcsMatrix[i][j] = "";
      } else if (beforeWords[i - 1] === afterWords[j - 1]) {
        lcsMatrix[i][j] = beforeWords[i - 1];
      } else {
        const a = lcsMatrix[i - 1][j];
        const b = lcsMatrix[i][j - 1];
        if (a !== null && b !== null) {
          lcsMatrix[i][j] = a.length >= b.length ? a : b;
        } else {
          lcsMatrix[i][j] = a ?? b;
        }
      }
    }
  }

  const lcs = lcsMatrix[beforeWords.length][afterWords.length];
  const lcsWords = lcs ? lcs.split(/\s+/) : [];
  const lcsSet = new Set(lcsWords);

  const beforeElements = beforeWords.map((word, i) => {
    if (lcsSet.has(word)) {
      return <span key={i} className="relative">
        {word}{" "}
      </span>;
    }
    return (
      <span
        key={i}
        className={cn(
          "underline underline-accent",
          "animate-slideIn 0.2s ease-out"
        )}
      >
        {word}{" "}
      </span>
    );
  });

  const afterElements = afterWords.map((word, i) => {
    if (lcsSet.has(word)) {
      return <span key={i} className="relative">
        {word}{" "}
      </span>;
    }
    return (
      <span
        key={i}
        className={cn(
          "line-through line-through-destructive",
          "animate-slideIn 0.2s ease-out"
        )}
      >
        {word}{" "}
      </span>
    );
  });

  return (
    <div
      className={cn(
        "font-mono text-sm",
        "animate-[fade-in-up_0.3s_ease-out_both]",
        "motion-reduce:animate-none"
      )}
    >
      <style>{diffStaggerKeyframes}</style>
      {mode === "side" ? (
        <div className="flex">
          <div className="w-1/2">
            <div className="font-mono text-sm">
              <span className="text-muted-foreground">BEFORE</span>
              <div>{beforeElements}</div>
            </div>
          </div>
          <div className="w-1/2">
            <div className="font-mono text-sm">
              <span className="text-muted-foreground">AFTER</span>
              <div>{afterElements}</div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="space-y-2">
            <div>
              <span className="text-muted-foreground">before</span>
              <div>{beforeElements}</div>
            </div>
            <div>
              <span className="text-muted-foreground">after</span>
              <div>{afterElements}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export { TextDiff };
