import type { ReactElement } from "react";

export type Direction = {
  id: string;
  no: string;
  name: string;
  tagline: string;
  stageClassName?: string;
  Button: () => ReactElement;
  Card: () => ReactElement;
};

function Tick({ className }: { className?: string }) {
  return (
    <span aria-hidden className={`pointer-events-none absolute font-mono text-[10px] leading-none text-foreground/50 ${className ?? ""}`}>
      +
    </span>
  );
}

const blueprint: Direction = {
  id: "blueprint",
  no: "01",
  name: "Blueprint",
  tagline: "Paper by day, blueprint by night",
  Button: () => (
    <button
      type="button"
      className="relative h-10 cursor-pointer border-[1.5px] border-foreground bg-transparent px-6 font-mono text-xs uppercase tracking-[0.2em] text-foreground transition-colors duration-200 hover:bg-foreground hover:text-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <Tick className="-left-1 -top-2" />
      <Tick className="-right-1 -top-2" />
      <Tick className="-bottom-2 -left-1" />
      <Tick className="-bottom-2 -right-1" />
      Draft it
    </button>
  ),
  Card: () => (
    <div className="w-full max-w-sm border border-foreground/40 bg-card">
      <div className="flex items-center justify-between px-4 py-2">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Fig. 01 — Spec sheet</span>
        <span className="font-mono text-[10px] text-muted-foreground">1:1</span>
      </div>
      <div className="border-t border-dashed border-foreground/30" />
      <div className="px-4 py-4">
        <h3 className="text-lg font-semibold tracking-tight">Measured card</h3>
        <p className="mt-1 text-sm text-muted-foreground">Every edge accounted for, every space intentional.</p>
      </div>
      <div className="px-4 pb-3">
        <div className="relative h-6">
          <div className="absolute inset-x-0 top-1/2 border-t border-dashed border-foreground/40" />
          <span className="absolute left-0 top-1/2 h-2 w-px -translate-y-1/2 bg-foreground/40" />
          <span className="absolute right-0 top-1/2 h-2 w-px -translate-y-1/2 bg-foreground/40" />
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-2 font-mono text-[10px] text-muted-foreground">
            320 × 180
          </span>
        </div>
      </div>
    </div>
  ),
};

const tactile: Direction = {
  id: "tactile",
  no: "02",
  name: "Tactile",
  tagline: "UI you can physically feel",
  Button: () => (
    <button
      type="button"
      className="h-11 cursor-pointer rounded-lg border-2 border-foreground bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-[4px_4px_0_0] shadow-foreground transition-all duration-150 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 motion-reduce:transition-none"
    >
      Press me
    </button>
  ),
  Card: () => (
    <div className="w-full max-w-sm rounded-xl border-2 border-foreground bg-card p-6 shadow-[8px_8px_0_0] shadow-foreground transition-all duration-200 hover:-translate-y-1 hover:shadow-[8px_12px_0_0] motion-reduce:transition-none motion-reduce:hover:translate-y-0">
      <span className="inline-block rounded-full border-2 border-foreground bg-accent px-2.5 py-0.5 text-xs font-bold text-accent-foreground">
        Chunky
      </span>
      <h3 className="mt-3 text-lg font-bold tracking-tight">Lift-off card</h3>
      <p className="mt-1 text-sm text-muted-foreground">Real depth, real travel. Press everything.</p>
    </div>
  ),
};

function Rivet({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`pointer-events-none absolute size-2.5 rounded-full border border-foreground/60 bg-gradient-to-br from-white via-white to-foreground/40 ${className ?? ""}`}
    />
  );
}

const stamped: Direction = {
  id: "stamped",
  no: "03",
  name: "Stamped",
  tagline: "Heavy industry, certified",
  Button: () => (
    <button
      type="button"
      className="h-11 cursor-pointer border-[3px] border-foreground bg-foreground px-6 text-sm font-extrabold uppercase tracking-wider text-background shadow-[5px_5px_0_0] shadow-accent-strong transition-all duration-150 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[3px_3px_0_0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 motion-reduce:transition-none"
    >
      Approve
    </button>
  ),
  Card: () => (
    <div className="relative w-full max-w-sm border-[3px] border-foreground bg-card p-6">
      <Rivet className="-left-1.5 -top-1.5" />
      <Rivet className="-right-1.5 -top-1.5" />
      <Rivet className="-bottom-1.5 -left-1.5" />
      <Rivet className="-bottom-1.5 -right-1.5" />
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-lg font-extrabold uppercase tracking-wide">Plate 07</h3>
        <span className="-rotate-6 rounded border-2 border-accent-strong px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-widest text-accent-strong">
          Certified
        </span>
      </div>
      <p className="mt-2 text-sm text-muted-foreground">Riveted, rated, ready for production use.</p>
    </div>
  ),
};

const paper: Direction = {
  id: "paper",
  no: "04",
  name: "Paper Craft",
  tagline: "Warm desk, washi tape",
  stageClassName: "bg-[#e9dfc8]",
  Button: () => (
    <button
      type="button"
      className="h-11 cursor-pointer rounded-full border-2 border-[#3f3428] bg-[#e8d9b8] px-7 font-serif text-base italic text-[#3f3428] shadow-[3px_3px_0_0_#3f3428] transition-all duration-150 hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0_0_#3f3428] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3f3428] motion-reduce:transition-none"
    >
      Write it down
    </button>
  ),
  Card: () => (
    <div className="relative w-full max-w-sm rotate-[0.5deg] border border-[#3f3428]/40 bg-[#f7f1e1] p-6 pt-8 text-[#3f3428] shadow-[6px_6px_0_0_rgba(63,52,40,0.15)]">
      <span aria-hidden className="absolute -top-3 left-1/2 h-6 w-24 -translate-x-1/2 -rotate-3 bg-[#d9c89a]/80" />
      <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#3f3428]/60">Field notes</p>
      <h3 className="mt-1 font-serif text-xl italic">Pinned with care</h3>
      <div className="my-3 border-t border-dashed border-[#3f3428]/40" />
      <p className="font-serif text-sm leading-relaxed">Soft edges, honest materials, nothing laminated.</p>
    </div>
  ),
};

const terminal: Direction = {
  id: "terminal",
  no: "05",
  name: "Terminal",
  tagline: "Phosphor green, scanlines",
  stageClassName: "bg-[#0b0e0b]",
  Button: () => (
    <button
      type="button"
      className="h-10 cursor-pointer border border-[#4ade80]/60 bg-transparent px-5 font-mono text-sm text-[#4ade80] transition-colors duration-150 hover:bg-[#4ade80] hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4ade80]"
    >
      <span className="mr-2 opacity-60">&gt;_</span>install
    </button>
  ),
  Card: () => (
    <div className="relative w-full max-w-sm overflow-hidden border border-[#4ade80]/30 bg-black font-mono text-sm text-[#4ade80]">
      <span aria-hidden className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent_0_2px,rgba(0,0,0,0.25)_2px_4px)]" />
      <div className="flex items-center gap-1.5 border-b border-[#4ade80]/20 px-3 py-2">
        <span className="size-2.5 rounded-full bg-[#ff5f57]" />
        <span className="size-2.5 rounded-full bg-[#febc2e]" />
        <span className="size-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-2 text-xs opacity-60">bigbull — zsh</span>
      </div>
      <div className="space-y-1.5 p-4">
        <p><span className="opacity-60">$</span> bigbull init</p>
        <p className="opacity-80">✓ 9 components ready</p>
        <p>
          <span className="opacity-60">$</span>{" "}
          <span className="inline-block h-4 w-2 animate-pulse bg-[#4ade80]" />
        </p>
      </div>
    </div>
  ),
};

export const directionsA: Direction[] = [blueprint, tactile, stamped, paper, terminal];
