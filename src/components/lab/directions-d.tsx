import type { Direction } from "./directions-a";

const chalkboard: Direction = {
  id: "chalkboard",
  no: "16",
  name: "Chalkboard",
  tagline: "Dusty serif, lesson one",
  stageClassName: "bg-[#20241f]",
  Button: () => (
    <button
      type="button"
      className="h-11 cursor-pointer rounded-md border-2 border-[#f2efe6]/80 bg-transparent px-6 font-serif text-base italic text-[#f2efe6] transition-colors duration-150 hover:bg-[#f2efe6]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f2efe6]/70"
      style={{ textShadow: "0 0 1px rgba(242, 239, 230, 0.6)" }}
    >
      Take notes
    </button>
  ),
  Card: () => (
    <div className="w-full max-w-sm rounded-sm border-4 border-[#3a2f23] bg-[#20241f] p-6 text-[#f2efe6]"
      style={{ textShadow: "0 0 1px rgba(242, 239, 230, 0.5)" }}
    >
      <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#f2efe6]/60">Lesson 01</p>
      <h3 className="mt-1 font-serif text-2xl italic">Chalk never lies</h3>
      <svg aria-hidden viewBox="0 0 200 10" className="my-2 h-2.5 w-40 text-[#f2efe6]/70" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M2 6 Q 25 2, 50 6 T 100 6 T 150 6 T 198 6" />
      </svg>
      <p className="font-serif text-sm leading-relaxed text-[#f2efe6]/85">Slightly smudged, fully understood. Erasers sold separately.</p>
    </div>
  ),
};

const bauhaus: Direction = {
  id: "bauhaus",
  no: "17",
  name: "Bauhaus",
  tagline: "Circle, square, triangle",
  stageClassName: "bg-white",
  Button: () => (
    <button
      type="button"
      className="h-12 cursor-pointer rounded-none border-2 border-black bg-[#e30613] px-8 text-sm font-extrabold uppercase tracking-[0.2em] text-white shadow-[5px_5px_0_0_#000] transition-all duration-150 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[3px_3px_0_0_#000] active:translate-x-[5px] active:translate-y-[5px] active:shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 motion-reduce:transition-none"
    >
      Compose
    </button>
  ),
  Card: () => (
    <div className="w-full max-w-sm border-2 border-black bg-white p-6 text-black">
      <div className="flex items-center gap-3">
        <span aria-hidden className="size-8 rounded-full bg-[#e30613]" />
        <span aria-hidden className="size-8 bg-[#0066b3]" />
        <span aria-hidden className="size-0 border-x-[16px] border-b-[28px] border-x-transparent border-b-[#ffcc00]" />
        <span aria-hidden className="h-2 flex-1 bg-black" />
      </div>
      <h3 className="mt-4 text-2xl font-extrabold uppercase leading-none tracking-tight">Form follows</h3>
      <p className="mt-2 text-sm text-black/70">Three shapes, three colors, zero ornaments. Dessau approved.</p>
    </div>
  ),
};

const synthwave: Direction = {
  id: "synthwave",
  no: "18",
  name: "Synthwave",
  tagline: "Midnight drive, est. 1984",
  stageClassName: "bg-[#150826]",
  Button: () => (
    <button
      type="button"
      className="h-11 cursor-pointer rounded-md border border-[#ff2975] bg-[#ff2975]/10 px-7 text-sm font-bold italic tracking-wider text-[#ffd319] transition-colors duration-150 hover:bg-[#ff2975]/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff2975]"
      style={{ textShadow: "0 0 12px rgba(255, 41, 117, 0.8)" }}
    >
      Night drive
    </button>
  ),
  Card: () => (
    <div className="relative w-full max-w-sm overflow-hidden rounded-lg border border-fuchsia-500/40 bg-black/40 p-6 backdrop-blur-sm">
      <span aria-hidden className="pointer-events-none absolute -right-8 -top-10 size-36 rounded-full bg-gradient-to-b from-[#ffd319] to-[#ff2975]" />
      <span aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-[linear-gradient(transparent_80%,rgba(255,41,117,0.55)_100%),linear-gradient(90deg,transparent_80%,rgba(255,41,117,0.55)_100%)] [background-size:28px_28px] [transform:perspective(220px)_rotateX(55deg)]" />
      <h3 className="relative bg-gradient-to-r from-[#ffd319] to-[#ff2975] bg-clip-text font-mono text-xl font-bold text-transparent">
        &gt; cruise_control
      </h3>
      <p className="relative mt-2 font-mono text-xs leading-relaxed text-fuchsia-200/80">
        Grid locked. Sun at 62%. No destination required.
      </p>
    </div>
  ),
};

const ticket: Direction = {
  id: "ticket",
  no: "19",
  name: "Ticket Stub",
  tagline: "Admit one, keep forever",
  stageClassName: "bg-[#e8e2d4]",
  Button: () => (
    <button
      type="button"
      className="h-11 cursor-pointer rounded-md border-2 border-dashed border-black/60 bg-[#f7f0dd] px-6 font-mono text-sm font-bold uppercase tracking-[0.2em] text-black transition-colors duration-150 hover:bg-black hover:text-[#f7f0dd] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black"
    >
      Admit one
    </button>
  ),
  Card: () => (
    <div className="relative w-full max-w-sm rounded-lg bg-[#f7f0dd] p-5 text-black">
      <span aria-hidden className="absolute -left-3 top-1/2 size-6 -translate-y-1/2 rounded-full bg-[#e8e2d4]" />
      <span aria-hidden className="absolute -right-3 top-1/2 size-6 -translate-y-1/2 rounded-full bg-[#e8e2d4]" />
      <div className="flex items-center justify-between">
        <h3 className="font-mono text-lg font-bold uppercase tracking-widest">Front row</h3>
        <span className="font-mono text-xs text-black/60">ROW C · 12</span>
      </div>
      <div className="my-3 border-t-2 border-dashed border-black/30" />
      <div aria-hidden className="h-10 bg-[repeating-linear-gradient(90deg,#111_0_2px,transparent_2px_5px,#111_5px_8px,transparent_8px_11px)]" />
      <p className="mt-2 text-center font-mono text-[11px] tracking-[0.35em] text-black/60">NO REFUNDS · RAIN OR SHINE</p>
    </div>
  ),
};

const candy: Direction = {
  id: "candy",
  no: "20",
  name: "Candy Gloss",
  tagline: "Glossy, juicy, sugar-free",
  stageClassName: "bg-[#fff0f5]",
  Button: () => (
    <button
      type="button"
      className="h-12 cursor-pointer rounded-full bg-gradient-to-b from-[#ff8fbf] to-[#f43f8e] px-8 text-sm font-bold text-white transition-all duration-150 hover:brightness-105 active:scale-[0.98] active:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f43f8e] focus-visible:ring-offset-2 motion-reduce:transition-none"
      style={{ boxShadow: "inset 0 2px 3px rgba(255,255,255,0.8), inset 0 -4px 6px rgba(0,0,0,0.18), 0 10px 20px -6px rgba(244,63,142,0.6)" }}
    >
      Taste it
    </button>
  ),
  Card: () => (
    <div
      className="w-full max-w-sm rounded-3xl border border-white bg-[#ffd6e7]/70 p-6 text-[#7a2d52] backdrop-blur-sm"
      style={{ boxShadow: "inset 0 2px 4px rgba(255,255,255,0.9), inset 0 -6px 12px rgba(244,63,142,0.15), 0 16px 32px -12px rgba(244,63,142,0.45)" }}
    >
      <div className="flex items-center gap-2">
        <span aria-hidden className="size-4 rounded-full bg-gradient-to-b from-[#ffb3d4] to-[#f43f8e]" />
        <span aria-hidden className="size-4 rounded-full bg-gradient-to-b from-[#b3e5ff] to-[#38bdf8]" />
        <span aria-hidden className="size-4 rounded-full bg-gradient-to-b from-[#c9f2c7] to-[#34d399]" />
        <span className="ml-1 rounded-full bg-white/70 px-2 py-0.5 text-[11px] font-bold">sugar-free</span>
      </div>
      <h3 className="mt-3 text-xl font-extrabold tracking-tight">Gummy interface</h3>
      <p className="mt-1 text-sm text-[#7a2d52]/80">Chewy pixels with a hard candy shell. Lickable, not clickable — kidding, fully clickable.</p>
    </div>
  ),
};

export const directionsD: Direction[] = [chalkboard, bauhaus, synthwave, ticket, candy];
