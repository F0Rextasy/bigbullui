"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface RegexTesterProps extends React.HTMLAttributes<HTMLDivElement> {
  pattern?: string;
  testString?: string;
  onMatch?: (matches: string[]) => void;
}

/** Regular expression tester: pattern + test string + match highlights. */
export function RegexTester({ pattern: patternProp, testString: testProp = "", onMatch, className, ...props }: RegexTesterProps) {
  const [pattern, setPattern] = React.useState(patternProp ?? "\\d+");
  const [test, setTest] = React.useState(testProp);

  const { segments, matches, error } = React.useMemo(() => {
    try {
      const re = new RegExp(pattern, "g");
      const segs: { text: string; hit: boolean }[] = [];
      let last = 0;
      const found: string[] = [];
      let m: RegExpExecArray | null;
      while ((m = re.exec(test)) !== null) {
        if (m.index > last) segs.push({ text: test.slice(last, m.index), hit: false });
        segs.push({ text: m[0], hit: true });
        found.push(m[0]);
        last = m.index + m[0].length;
        if (m[0].length === 0) re.lastIndex++;
      }
      if (last < test.length) segs.push({ text: test.slice(last), hit: false });
      return { segments: segs, matches: found, error: null as string | null };
    } catch (e) {
      return { segments: [{ text: test, hit: false }], matches: [] as string[], error: (e as Error).message };
    }
  }, [pattern, test]);

  React.useEffect(() => { onMatch?.(matches); }, [matches, onMatch]);

  return (
    <div className={cn("w-full max-w-md space-y-3", className)} {...props}>
      <style>{`@keyframes rtIn { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } }`}</style>
      <div className="space-y-1">
        <label htmlFor="rt-pattern" className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">Desen</label>
        <input
          id="rt-pattern"
          value={pattern}
          onChange={(e) => setPattern(e.target.value)}
          className={cn(
            "w-full rounded-md border bg-background px-3 py-2 font-mono text-sm",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-colors motion-reduce:transition-none",
            error ? "border-destructive" : "border-input"
          )}
          spellCheck={false}
        />
        {error && <p className="text-xs text-destructive animate-[rtIn_0.2s_ease-out] motion-reduce:animate-none">{error}</p>}
      </div>
      <div className="space-y-1">
        <label htmlFor="rt-test" className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">Test dizesi</label>
        <textarea
          id="rt-test"
          value={test}
          onChange={(e) => setTest(e.target.value)}
          rows={3}
          className="w-full rounded-md border border-input bg-background px-3 py-2 font-mono text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-colors motion-reduce:transition-none"
          spellCheck={false}
        />
      </div>
      {test && !error && (
        <div className="rounded-md border border-dashed border-border bg-secondary/40 p-3 animate-[rtIn_0.25s_ease-out_both] motion-reduce:animate-none">
          <p className="font-mono text-xs leading-relaxed">
            {segments.map((seg, i) =>
              seg.hit ? (
                <mark key={i} className="rounded-sm bg-accent/30 px-0.5 text-accent font-bold">{seg.text}</mark>
              ) : (
                <span key={i}>{seg.text}</span>
              )
            )}
          </p>
          <p className="mt-2 font-mono text-[10px] text-muted-foreground">{matches.length} matches</p>
        </div>
      )}
    </div>
  );
}
