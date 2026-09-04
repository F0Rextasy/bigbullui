import type { Direction } from "./directions-a";

const neon: Direction = {
  id: "neon",
  no: "11",
  name: "Neon Noir",
  tagline: "Signage after midnight",
  stageClassName: "bg-[#050505]",
  Button: () => (
    <button
      type="button"
      className="h-11 cursor-pointer rounded-md border border-cyan-300/70 bg-transparent px-7 font-mono text-xs font-bold uppercase tracking-[0.25em] text-cyan-200 transition-all duration-200 hover:border-cyan-200 hover:brightness-125 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
      style={{
        boxShadow: "0 0 18px rgba(34, 211, 238, 0.45), inset 0 0 12px rgba(34, 211, 238, 0.2)",
        textShadow: "0 0 10px rgba(34, 211, 238, 0.9)",
      }}
    >
      Open late
    </button>
  ),
  Card: () => (
    <div className="w-full max-w-sm rounded-lg border border-fuchsia-400/40 bg-black p-6"
      style={{ boxShadow: "0 0 24px rgba(232, 121, 249, 0.25), inset 0 0 20px rgba(232, 121, 249, 0.06)" }}
    >
      <h3
        className="text-xl font-bold tracking-tight text-fuchsia-300"
        style={{ textShadow: "0 0 12px rgba(232, 121, 249, 0.9)" }}
      >
        Night window
      </h3>
      <div aria-hidden className="my-3 h-px bg-gradient-to-r from-cyan-300 via-fuchsia-400 to-transparent" />
      <p className="text-sm text-zinc-400">Gas, glass and current. The city never renders plain.</p>
      <p className="mt-3 font-mono text-[11px] tracking-[0.3em] text-cyan-200/80">SIGNAL 98.7</p>
    </div>
  ),
};

const clay: Direction = {
  id: "clay",
  no: "12",
  name: "Clay",
  tagline: "Matte, puffy, squeezable",
  stageClassName: "bg-[#e7e1f5]",
  Button: () => (
    <button
      type="button"
      className="h-12 cursor-pointer rounded-2xl bg-[#efeafb] px-8 text-sm font-bold text-[#5b5378] transition-all duration-150 hover:brightness-[1.03] active:translate-y-[2px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5b5378]"
      style={{ boxShadow: "6px 6px 14px #c9c0e3, -6px -6px 14px #ffffff" }}
    >
      Squish me
    </button>
  ),
  Card: () => (
    <div
      className="w-full max-w-sm rounded-3xl bg-[#efeafb] p-6 text-[#4a4360]"
      style={{ boxShadow: "10px 10px 24px #c9c0e3, -10px -10px 24px #ffffff" }}
    >
      <span className="inline-block rounded-full bg-white/70 px-2.5 py-0.5 text-xs font-bold">soft</span>
      <h3 className="mt-3 text-lg font-extrabold tracking-tight">Fresh out of the kiln</h3>
      <p className="mt-1 text-sm text-[#4a4360]/75">No hard edges were harmed in the making of this card.</p>
    </div>
  ),
};

const pixel: Direction = {
  id: "pixel",
  no: "13",
  name: "Pixel Arcade",
  tagline: "Insert coin",
  stageClassName: "bg-[#101018]",
  Button: () => (
    <button
      type="button"
      className="h-11 cursor-pointer bg-[#ffd23f] px-6 font-mono text-sm font-bold uppercase tracking-wider text-black transition-colors duration-100 hover:bg-[#ffe066] active:translate-y-[2px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ffd23f] focus-visible:ring-offset-2 focus-visible:ring-offset-[#101018] [clip-path:polygon(0_4px,4px_4px,4px_0,calc(100%-4px)_0,calc(100%-4px)_4px,100%_4px,100%_calc(100%-4px),calc(100%-4px)_calc(100%-4px),calc(100%-4px)_100%,4px_100%,4px_calc(100%-4px),0_calc(100%-4px))]"
    >
      Start
    </button>
  ),
  Card: () => (
    <div className="w-full max-w-sm border-2 border-[#3a3a4a] bg-[#1a1a24] p-5 font-mono text-[#e8e8f0]">
      <div className="flex items-center justify-between text-xs">
        <span className="text-[#8a8a9a]">SCORE</span>
        <span className="font-bold text-[#ffd23f]">024800</span>
      </div>
      <h3 className="mt-3 text-lg font-bold uppercase tracking-wide">Level 01 clear</h3>
      <p className="mt-1 text-xs leading-relaxed text-[#8a8a9a]">No continues needed. The grid remembers everything.</p>
      <p className="mt-4 animate-pulse text-center text-xs font-bold tracking-[0.3em] text-[#7CFC00]">▶ PUSH START</p>
    </div>
  ),
};

const broadsheet: Direction = {
  id: "broadsheet",
  no: "14",
  name: "Broadsheet",
  tagline: "Hot metal, morning edition",
  stageClassName: "bg-[#f6f2e9]",
  Button: () => (
    <button
      type="button"
      className="h-11 cursor-pointer border-2 border-black bg-black px-6 text-sm font-bold uppercase tracking-[0.2em] text-white transition-colors duration-150 hover:bg-transparent hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 focus-visible:ring-offset-[#f6f2e9]"
    >
      Read all about it
    </button>
  ),
  Card: () => (
    <div className="w-full max-w-sm border-y-4 border-double border-black bg-[#fbf8f0] px-5 py-4 text-black">
      <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-black/60">Est. 2026 · Vol. I · Morning edition</p>
      <h3 className="mt-2 font-serif text-3xl font-black leading-tight">Ink Holds Its Value</h3>
      <div className="my-3 border-t border-black/70" />
      <p className="columns-2 gap-4 text-justify font-serif text-[13px] leading-relaxed text-black/80">
        <span className="float-left mr-2 font-serif text-5xl font-black leading-[0.85]">E</span>
        very column accounted for, every rule intentional. The front page treatment for everyday interface news, set tight and printed to last.
      </p>
    </div>
  ),
};

const chrome: Direction = {
  id: "chrome",
  no: "15",
  name: "Chrome Metal",
  tagline: "Polished until it mirrors",
  stageClassName: "bg-[#0a0a10]",
  Button: () => (
    <button
      type="button"
      className="h-11 cursor-pointer rounded-lg border border-white/40 bg-gradient-to-b from-[#f5f7fa] to-[#9aa1ad] px-7 text-sm font-bold text-black transition-all duration-150 hover:brightness-110 active:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
      style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.9), 0 6px 16px -6px rgba(160,170,190,0.6)" }}
    >
      Mirror finish
    </button>
  ),
  Card: () => (
    <div className="w-full max-w-sm rounded-xl border border-white/15 bg-[#121218] p-6">
      <h3 className="bg-gradient-to-b from-white via-[#8a8f98] to-[#f2f4f8] bg-clip-text text-2xl font-extrabold tracking-tight text-transparent">
        Liquid steel
      </h3>
      <div aria-hidden className="my-3 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />
      <p className="text-sm text-[#a7adb8]">Brushed, buffed and clear-coated. Reflections included at no extra charge.</p>
    </div>
  ),
};

export const directionsC: Direction[] = [neon, clay, pixel, broadsheet, chrome];
