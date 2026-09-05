"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface SplitFlapRowData {
  id?: string;
  train: string;
  time: string;
  destination: string;
  track: string;
  status: "ON TIME" | "BOARDING" | "DELAYED" | "CANCELLED" | "DEPARTED" | "FINAL CALL" | string;
  remarks?: string;
}

export interface SplitFlapCharProps extends React.HTMLAttributes<HTMLDivElement> {
  char?: string;
  size?: "sm" | "md" | "lg";
  color?: "default" | "accent" | "amber" | "green" | "destructive" | "muted";
  sound?: boolean;
  onFlip?: () => void;
  className?: string;
}

export interface SplitFlapTextProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  length?: number;
  size?: "sm" | "md" | "lg";
  color?: "default" | "accent" | "amber" | "green" | "destructive" | "muted";
  stagger?: number;
  sound?: boolean;
  onComplete?: () => void;
  className?: string;
}

export interface SplitFlapRowProps extends React.HTMLAttributes<HTMLDivElement> {
  train: string;
  time: string;
  destination: string;
  track: string;
  status: string;
  remarks?: string;
  sound?: boolean;
  className?: string;
}

export interface SplitFlapBoardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  subtitle?: string;
  terminalCode?: string;
  rows?: SplitFlapRowData[];
  sound?: boolean;
  onSoundChange?: (enabled: boolean) => void;
  onFlip?: (char: string, index: number) => void;
  showControls?: boolean;
  className?: string;
}

const FLAP_CHARSET = " ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-:.#/'*!";

/**
 * Web Audio API synthesizer for mechanical Solari relay click.
 * Zero external audio files, pure browser synthesis.
 */
function playMechanicalClick(audioCtxRef: React.RefObject<AudioContext | null>) {
  if (typeof window === "undefined") return;
  try {
    if (!audioCtxRef.current) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        audioCtxRef.current = new AudioCtx();
      }
    }
    const ctx = audioCtxRef.current;
    if (!ctx) return;
    if (ctx.state === "suspended") {
      void ctx.resume();
    }
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    filter.type = "bandpass";
    filter.frequency.setValueAtTime(900 + Math.random() * 300, now);
    filter.Q.setValueAtTime(4, now);

    osc.type = "triangle";
    osc.frequency.setValueAtTime(180 + Math.random() * 50, now);
    osc.frequency.exponentialRampToValueAtTime(30, now + 0.02);

    gain.gain.setValueAtTime(0.09, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.02);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.02);
  } catch {
    // Autoplay or audio context permission restricted
  }
}

/**
 * SplitFlapChar: Single mechanical flip flap card.
 */
export function SplitFlapChar({
  char = " ",
  size = "md",
  color = "default",
  sound = false,
  onFlip,
  className,
  ...props
}: SplitFlapCharProps) {
  const targetChar = (char[0] || " ").toUpperCase();
  const [displayChar, setDisplayChar] = React.useState(targetChar);
  const [prevChar, setPrevChar] = React.useState(targetChar);
  const [isFlipping, setIsFlipping] = React.useState(false);
  const audioCtxRef = React.useRef<AudioContext | null>(null);

  React.useEffect(() => {
    if (targetChar === displayChar) return;

    let mounted = true;
    let step = 0;
    const maxSteps = 14;

    const startIdx = FLAP_CHARSET.indexOf(displayChar);
    const endIdx = FLAP_CHARSET.indexOf(targetChar);

    let currentIdx = startIdx === -1 ? 0 : startIdx;
    const targetValidIdx = endIdx === -1 ? 0 : endIdx;

    const interval = setInterval(() => {
      if (!mounted) return;
      step += 1;

      if (currentIdx !== targetValidIdx && step < maxSteps) {
        currentIdx = (currentIdx + 1) % FLAP_CHARSET.length;
        const nextChar = FLAP_CHARSET[currentIdx];
        setPrevChar(displayChar);
        setDisplayChar(nextChar);
        setIsFlipping(true);

        if (sound) {
          playMechanicalClick(audioCtxRef);
        }
        if (onFlip) {
          onFlip();
        }

        setTimeout(() => {
          if (mounted) setIsFlipping(false);
        }, 35);
      } else {
        setPrevChar(displayChar);
        setDisplayChar(targetChar);
        setIsFlipping(false);
        clearInterval(interval);
      }
    }, 45);

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, [targetChar, sound, onFlip]);

  const sizeClasses = {
    sm: "w-5 h-7 text-xs",
    md: "w-6 h-9 text-sm sm:w-7 sm:h-10 sm:text-base",
    lg: "w-8 h-12 text-lg sm:w-9 sm:h-14 sm:text-xl",
  }[size];

  const colorClasses = {
    default: "text-foreground",
    accent: "text-accent",
    amber: "text-amber-500 dark:text-amber-400",
    green: "text-emerald-600 dark:text-emerald-400",
    destructive: "text-destructive",
    muted: "text-muted-foreground",
  }[color];

  return (
    <div
      className={cn(
        "relative inline-flex flex-col items-center justify-center font-mono font-bold select-none perspective-[300px]",
        sizeClasses,
        className
      )}
      {...props}
    >
      {/* Top Leaf Half */}
      <div className="relative h-1/2 w-full overflow-hidden rounded-t-sm border border-border/80 bg-neutral-900 shadow-inner flex items-end justify-center">
        <span
          className={cn(
            "leading-none translate-y-[50%] block",
            colorClasses
          )}
        >
          {displayChar}
        </span>
        {/* Subtle top glare */}
        <div className="absolute inset-x-0 top-0 h-[1px] bg-white/20" />
      </div>

      {/* Center Hinge Crease & Pins */}
      <div className="relative w-full z-20">
        <div className="h-[1.5px] w-full bg-black/90 shadow-[0_1px_1px_rgba(255,255,255,0.08)]" />
        {/* Left mechanical hinge pin */}
        <div className="absolute -left-[2px] top-1/2 -translate-y-1/2 w-[3px] h-[5px] bg-neutral-500 rounded-r-xs border border-neutral-900" />
        {/* Right mechanical hinge pin */}
        <div className="absolute -right-[2px] top-1/2 -translate-y-1/2 w-[3px] h-[5px] bg-neutral-500 rounded-l-xs border border-neutral-900" />
      </div>

      {/* Bottom Leaf Half */}
      <div className="relative h-1/2 w-full overflow-hidden rounded-b-sm border border-border/80 bg-neutral-950 shadow-inner flex items-start justify-center">
        <span
          className={cn(
            "leading-none -translate-y-[50%] block",
            colorClasses
          )}
        >
          {displayChar}
        </span>
        {/* Bottom edge shadow */}
        <div className="absolute inset-x-0 bottom-0 h-[2px] bg-black/50" />
      </div>

      {/* 3D Animated Flap Layer during transitions */}
      {isFlipping && (
        <div
          aria-hidden="true"
          className="absolute inset-0 z-30 pointer-events-none flex flex-col animate-[split-flap-drop_0.04s_linear]"
        >
          <div className="h-1/2 w-full overflow-hidden rounded-t-sm border border-border/80 bg-neutral-900 flex items-end justify-center opacity-90">
            <span className={cn("leading-none translate-y-[50%] block", colorClasses)}>
              {prevChar}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * SplitFlapText: Renders a line of flipping split-flap characters.
 */
export function SplitFlapText({
  value,
  length,
  size = "md",
  color = "default",
  stagger = 30,
  sound = false,
  onComplete,
  className,
  ...props
}: SplitFlapTextProps) {
  const paddedValue = React.useMemo(() => {
    const raw = (value || "").toUpperCase();
    if (!length) return raw;
    return raw.padEnd(length, " ").slice(0, length);
  }, [value, length]);

  return (
    <div
      className={cn("inline-flex items-center gap-[2px]", className)}
      role="text"
      aria-label={value}
      {...props}
    >
      {paddedValue.split("").map((ch, idx) => (
        <SplitFlapChar
          key={idx}
          char={ch}
          size={size}
          color={color}
          sound={sound && idx === 0}
        />
      ))}
    </div>
  );
}

/**
 * SplitFlapRow: Departure schedule item with columns.
 */
export function SplitFlapRow({
  train,
  time,
  destination,
  track,
  status,
  remarks,
  sound = false,
  className,
  ...props
}: SplitFlapRowProps) {
  const statusColor = React.useMemo(() => {
    const s = status.toUpperCase();
    if (s.includes("ON TIME")) return "green";
    if (s.includes("BOARDING") || s.includes("FINAL")) return "amber";
    if (s.includes("DELAYED") || s.includes("CANCEL")) return "destructive";
    return "default";
  }, [status]);

  return (
    <div
      className={cn(
        "grid grid-cols-12 gap-2 sm:gap-3 py-2.5 px-3 items-center border-b border-dashed border-border/70 hover:bg-muted/30 transition-colors",
        className
      )}
      {...props}
    >
      {/* Time */}
      <div className="col-span-2 sm:col-span-2">
        <SplitFlapText value={time} length={5} size="sm" sound={sound} />
      </div>

      {/* Train / Flight */}
      <div className="col-span-3 sm:col-span-2">
        <SplitFlapText value={train} length={6} size="sm" color="accent" />
      </div>

      {/* Destination */}
      <div className="col-span-4 sm:col-span-5 overflow-hidden">
        <SplitFlapText
          value={destination}
          length={16}
          size="sm"
          className="w-full truncate"
        />
      </div>

      {/* Track / Gate */}
      <div className="hidden sm:block sm:col-span-1">
        <SplitFlapText value={track} length={3} size="sm" />
      </div>

      {/* Status */}
      <div className="col-span-3 sm:col-span-2 flex items-center justify-end">
        <SplitFlapText
          value={status}
          length={9}
          size="sm"
          color={statusColor}
        />
      </div>
    </div>
  );
}

const DEFAULT_ROWS: SplitFlapRowData[] = [
  {
    id: "1",
    time: "08:45",
    train: "BB-102",
    destination: "NEW YORK PENN",
    track: "04",
    status: "ON TIME",
  },
  {
    id: "2",
    time: "09:15",
    train: "BB-204",
    destination: "BOSTON SOUTH",
    track: "08",
    status: "BOARDING",
  },
  {
    id: "3",
    time: "09:40",
    train: "BB-319",
    destination: "CHICAGO UNION",
    track: "02",
    status: "DELAYED",
  },
  {
    id: "4",
    time: "10:05",
    train: "BB-440",
    destination: "WASHINGTON DC",
    track: "11",
    status: "ON TIME",
  },
  {
    id: "5",
    time: "10:30",
    train: "BB-508",
    destination: "MONTREAL CENTR",
    track: "06",
    status: "FINAL CALL",
  },
];

/**
 * SplitFlapBoard: Full retro mechanical airport / station departure concourse board.
 */
export function SplitFlapBoard({
  title = "GRAND CENTRAL TERMINAL",
  subtitle = "DEPARTURES CONCOURSE · TRACK ASSIGNMENTS",
  terminalCode = "GCT-SOLARI-4",
  rows = DEFAULT_ROWS,
  sound = false,
  onSoundChange,
  onFlip,
  showControls = true,
  className,
  ...props
}: SplitFlapBoardProps) {
  const [boardRows, setBoardRows] = React.useState<SplitFlapRowData[]>(rows);
  const [soundActive, setSoundActive] = React.useState(sound);
  const [filter, setFilter] = React.useState<string>("ALL");
  const [clockTime, setClockTime] = React.useState("08:42:15");

  // Keep internal sound synced if controlled
  React.useEffect(() => {
    setSoundActive(sound);
  }, [sound]);

  // Update clock every second
  React.useEffect(() => {
    const timer = setInterval(() => {
      const d = new Date();
      const hh = String(d.getHours()).padStart(2, "0");
      const mm = String(d.getMinutes()).padStart(2, "0");
      const ss = String(d.getSeconds()).padStart(2, "0");
      setClockTime(`${hh}:${mm}:${ss}`);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleToggleSound = () => {
    const next = !soundActive;
    setSoundActive(next);
    if (onSoundChange) {
      onSoundChange(next);
    }
  };

  const handleShuffle = () => {
    const shuffled = [...boardRows].map((r) => {
      const statuses: SplitFlapRowData["status"][] = [
        "ON TIME",
        "BOARDING",
        "DELAYED",
        "FINAL CALL",
        "ON TIME",
      ];
      const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
      return {
        ...r,
        status: randomStatus,
      };
    });
    setBoardRows(shuffled);
  };

  const filteredRows = React.useMemo(() => {
    if (filter === "ALL") return boardRows;
    return boardRows.filter((r) => r.status.toUpperCase().includes(filter));
  }, [boardRows, filter]);

  return (
    <div
      className={cn(
        "relative w-full rounded-xl border-2 border-foreground bg-card text-card-foreground shadow-[6px_6px_0_0_var(--color-border)] outline-1 outline-dashed outline-offset-[-6px] overflow-hidden select-none",
        className
      )}
      {...props}
    >
      {/* Side Punch Notches */}
      <div
        aria-hidden="true"
        className="absolute -left-3 top-1/2 -translate-y-1/2 size-6 rounded-full border-2 border-foreground bg-background z-30"
      />
      <div
        aria-hidden="true"
        className="absolute -right-3 top-1/2 -translate-y-1/2 size-6 rounded-full border-2 border-foreground bg-background z-30"
      />

      {/* Terminal Header Plate */}
      <div className="border-b-2 border-dashed border-border bg-secondary/60 p-4 sm:p-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-block size-2 rounded-full bg-emerald-500 animate-ping" />
              <span className="font-mono text-[10px] font-bold tracking-[0.25em] text-accent uppercase">
                MECHANICAL DEPARTURE TERMINAL
              </span>
              <span className="font-mono text-[10px] text-muted-foreground">
                [{terminalCode}]
              </span>
            </div>
            <h2 className="mt-1 text-xl sm:text-2xl font-black tracking-wider uppercase font-mono text-foreground">
              {title}
            </h2>
            <p className="font-mono text-xs text-muted-foreground uppercase tracking-wider">
              {subtitle}
            </p>
          </div>

          {/* Clock & Status Indicators */}
          <div className="flex items-center gap-3 sm:gap-4 self-start sm:self-auto">
            <div className="rounded border border-border bg-neutral-950 px-3 py-1.5 font-mono text-xs text-amber-400 font-bold tracking-widest shadow-inner">
              <span className="text-[10px] text-muted-foreground block -mb-0.5">LOCAL CLOCK</span>
              {clockTime}
            </div>

            {showControls && (
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={handleToggleSound}
                  className={cn(
                    "font-mono text-[10px] uppercase font-bold px-2.5 py-1.5 rounded border transition-colors focus-visible:ring-2 ring-ring",
                    soundActive
                      ? "border-accent bg-accent text-accent-foreground"
                      : "border-border bg-card text-muted-foreground hover:text-foreground"
                  )}
                  title="Toggle mechanical Solari relay click sounds"
                >
                  {soundActive ? "AUDIO ON" : "AUDIO MUTED"}
                </button>

                <button
                  type="button"
                  onClick={handleShuffle}
                  className="font-mono text-[10px] uppercase font-bold px-2.5 py-1.5 rounded border border-foreground bg-card text-foreground hover:bg-secondary transition-colors focus-visible:ring-2 ring-ring shadow-[2px_2px_0_0_var(--color-border)]"
                >
                  CYCLE FLAPS
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Filter Pills */}
        {showControls && (
          <div className="mt-3.5 pt-3 border-t border-dashed border-border/60 flex items-center gap-1.5 overflow-x-auto">
            <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground mr-1">
              FILTER:
            </span>
            {["ALL", "ON TIME", "BOARDING", "DELAYED"].map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                className={cn(
                  "font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded border transition-all",
                  filter === f
                    ? "border-foreground bg-foreground text-background font-bold"
                    : "border-border bg-card text-muted-foreground hover:text-foreground"
                )}
              >
                {f}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Board Column Headers */}
      <div className="grid grid-cols-12 gap-2 sm:gap-3 py-2 px-3 bg-neutral-900 text-neutral-300 font-mono text-[10px] font-bold uppercase tracking-[0.18em] border-b-2 border-foreground">
        <div className="col-span-2 sm:col-span-2">TIME</div>
        <div className="col-span-3 sm:col-span-2">TRAIN/FLT</div>
        <div className="col-span-4 sm:col-span-5">DESTINATION</div>
        <div className="hidden sm:block sm:col-span-1">TRACK</div>
        <div className="col-span-3 sm:col-span-2 text-right">STATUS</div>
      </div>

      {/* Flap Rows Container */}
      <div className="bg-neutral-950/95 divide-y divide-border/20">
        {filteredRows.length === 0 ? (
          <div className="p-8 text-center font-mono text-xs text-muted-foreground uppercase tracking-widest">
            NO DEPARTURES FOUND FOR THIS FILTER SELECTION
          </div>
        ) : (
          filteredRows.map((r, i) => (
            <SplitFlapRow
              key={r.id || `${r.train}-${i}`}
              train={r.train}
              time={r.time}
              destination={r.destination}
              track={r.track}
              status={r.status}
              remarks={r.remarks}
              sound={soundActive && i === 0}
            />
          ))
        )}
      </div>

      {/* Terminal Footer Stub */}
      <div className="p-3 bg-secondary/50 border-t-2 border-dashed border-border flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
        <div className="font-mono text-[10px] tracking-wider uppercase text-muted-foreground">
          ★ SOLARI PROTOCOL V4.2 · TICKETS MUST BE VALIDATED AT GATE ENTRANCE ★
        </div>
        <div className="font-mono text-[9px] font-bold uppercase text-accent tracking-[0.2em]">
          PERFORATION CODE #GCT-9910
        </div>
      </div>
    </div>
  );
}
