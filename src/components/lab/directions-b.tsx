import type { InputHTMLAttributes, ReactNode } from "react";
import type { Direction } from "./directions-a";

const sticker: Direction = {
  id: "sticker",
  no: "06",
  name: "Sticker",
  tagline: "Die-cut, peel and stick",
  stageClassName: "bg-[#23232b]",
  Button: () => (
    <button
      type="button"
      className="h-11 -rotate-1 cursor-pointer rounded-full bg-pink-500 px-7 text-sm font-bold text-white ring-4 ring-white transition-transform duration-200 hover:rotate-0 hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 motion-reduce:transition-none motion-reduce:hover:rotate-0 motion-reduce:hover:scale-100"
      style={{ boxShadow: "0 12px 30px -8px rgba(236, 72, 153, 0.7)" }}
    >
      Stick it
    </button>
  ),
  Card: () => (
    <div className="relative w-full max-w-sm rotate-1 rounded-3xl bg-white p-6 text-black ring-4 ring-white/90 transition-transform duration-200 hover:rotate-0 motion-reduce:transition-none motion-reduce:hover:rotate-0"
      style={{ boxShadow: "0 20px 50px -12px rgba(0, 0, 0, 0.6)" }}
    >
      <span className="absolute -right-4 -top-4 flex size-16 rotate-12 items-center justify-center rounded-full bg-yellow-300 text-xs font-extrabold text-black">
        NEW!
      </span>
      <h3 className="text-xl font-extrabold tracking-tight">Peel appeal</h3>
      <p className="mt-1 text-sm text-black/70">Glossy, bouncy, impossible to ignore on any surface.</p>
    </div>
  ),
};

const aurora: Direction = {
  id: "aurora",
  no: "07",
  name: "Aurora",
  tagline: "Glass over northern lights",
  stageClassName: "bg-[#050510]",
  Button: () => (
    <button
      type="button"
      className="h-11 cursor-pointer rounded-full bg-gradient-to-r from-fuchsia-500 to-cyan-400 px-7 text-sm font-semibold text-white transition-all duration-200 hover:scale-[1.03] active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050510] motion-reduce:transition-none motion-reduce:hover:scale-100"
      style={{ boxShadow: "0 0 30px -5px rgba(217, 70, 239, 0.7)" }}
    >
      Chase lights
    </button>
  ),
  Card: () => (
    <div className="relative w-full max-w-sm overflow-hidden rounded-2xl border border-white/20 bg-white/10 p-6 text-white backdrop-blur-md">
      <span aria-hidden className="pointer-events-none absolute -left-10 -top-10 size-44 rounded-full bg-fuchsia-600/40 blur-3xl" />
      <span aria-hidden className="pointer-events-none absolute -bottom-12 -right-8 size-44 rounded-full bg-cyan-500/30 blur-3xl" />
      <h3 className="relative bg-gradient-to-r from-cyan-300 via-fuchsia-400 to-amber-200 bg-clip-text text-xl font-bold text-transparent">
        Night sky UI
      </h3>
      <p className="relative mt-1 text-sm text-white/70">Frosted glass floating over slow aurora blobs.</p>
    </div>
  ),
};

const memphis: Direction = {
  id: "memphis",
  no: "08",
  name: "Memphis Pop",
  tagline: "80s dots and squiggles",
  stageClassName: "bg-[#fff8e7]",
  Button: () => (
    <button
      type="button"
      className="h-11 cursor-pointer border-2 border-black bg-yellow-300 px-6 text-sm font-extrabold uppercase tracking-wide text-black shadow-[4px_4px_0_0_#000] transition-all duration-150 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_#000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black motion-reduce:transition-none"
    >
      Zap it
    </button>
  ),
  Card: () => (
    <div className="w-full max-w-sm border-2 border-black bg-white text-black shadow-[6px_6px_0_0_#000]">
      <div aria-hidden className="h-8 border-b-2 border-black bg-[radial-gradient(#000_1.2px,transparent_1.2px)] [background-size:12px_12px]" />
      <div className="p-5">
        <h3 className="text-xl font-extrabold tracking-tight">Dot matrix</h3>
        <svg aria-hidden viewBox="0 0 120 12" className="my-2 h-3 w-28 text-pink-500" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
          <path d="M2 8 Q 12 2, 22 8 T 42 8 T 62 8 T 82 8 T 102 8 T 122 8" />
        </svg>
        <p className="text-sm text-black/70">Pastel fills, loud outlines, zero beige.</p>
        <span className="mt-3 inline-block bg-emerald-300 px-2 py-0.5 font-mono text-[11px] font-bold uppercase">Fresh</span>
      </div>
    </div>
  ),
};

function SwissInput({ label, ...props }: InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className="block">
      <span className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.25em] text-black/60">{label}</span>
      <input
        {...props}
        className="h-12 w-full rounded-none border border-black/30 bg-white px-4 text-sm text-black placeholder:text-black/35 focus:border-black focus:outline-none"
      />
    </label>
  );
}

function SwissBadge({ tone = "black", children }: { tone?: "black" | "red"; children: ReactNode }) {
  return (
    <span className={`inline-block px-2 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-white ${tone === "red" ? "bg-[#e30613]" : "bg-black"}`}>
      {children}
    </span>
  );
}

const swiss: Direction = {
  id: "swiss",
  no: "09",
  name: "Swiss Grid",
  tagline: "Helvetica confidence",
  stageClassName: "bg-white",
  Button: () => (
    <button
      type="button"
      className="h-12 cursor-pointer rounded-none bg-black px-8 text-xs font-bold uppercase tracking-[0.25em] text-white transition-colors duration-150 hover:bg-[#e30613] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e30613] focus-visible:ring-offset-2"
    >
      Execute
    </button>
  ),
  Card: () => (
    <div className="w-full max-w-sm space-y-6">
      <div className="border border-black/15 bg-white p-8 text-black">
        <div aria-hidden className="h-1 w-12 bg-[#e30613]" />
        <p className="mt-4 font-mono text-xs text-black/50">01 / Index</p>
        <h3 className="mt-1 text-4xl font-bold leading-none tracking-tighter">Grid is law</h3>
        <p className="mt-3 text-sm leading-relaxed text-black/70">Maximum clarity through maximum restraint. One accent, no decoration.</p>
      </div>
      <div className="border border-black/15 bg-white p-6 text-black">
        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-black/50">02 / Newsletter</p>
        <div className="mt-4 space-y-4">
          <SwissInput label="Email" type="email" placeholder="you@studio.ch" />
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              className="h-12 cursor-pointer rounded-none bg-black px-6 text-xs font-bold uppercase tracking-[0.25em] text-white transition-colors duration-150 hover:bg-[#e30613] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e30613] focus-visible:ring-offset-2"
            >
              Join
            </button>
            <SwissBadge tone="red">New</SwissBadge>
            <SwissBadge>Swiss</SwissBadge>
          </div>
        </div>
      </div>
    </div>
  ),
};

const outline: Direction = {
  id: "outline",
  no: "10",
  name: "Outline",
  tagline: "Ghost lines, quiet luxury",
  Button: () => (
    <button
      type="button"
      className="h-10 cursor-pointer rounded-full border border-foreground/40 bg-transparent px-6 text-sm text-foreground transition-colors duration-200 hover:border-foreground hover:bg-foreground hover:text-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      Whisper
    </button>
  ),
  Card: () => (
    <div className="w-full max-w-sm border border-foreground/25 bg-transparent p-6 transition-colors duration-200 hover:border-foreground/60">
      <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Edition 10</p>
      <h3 className="mt-2 text-lg font-medium tracking-tight">Less, but better</h3>
      <p className="mt-1 text-sm text-muted-foreground">No fills, no shadows. Only lines that earn their place.</p>
      <span className="mt-4 inline-block text-sm text-foreground underline underline-offset-4">Learn more</span>
    </div>
  ),
};

export const directionsB: Direction[] = [sticker, aurora, memphis, swiss, outline];
