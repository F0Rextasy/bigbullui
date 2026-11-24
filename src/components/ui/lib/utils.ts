export type ClassValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | ClassValue[]
  | { [key: string]: boolean | null | undefined };

const SPACING_DIRS: Record<string, string[]> = {
  p: ["p", "px", "py", "pt", "pr", "pb", "pl", "ps", "pe"],
  px: ["px", "pl", "pr", "ps", "pe"],
  py: ["py", "pt", "pb"],
  m: ["m", "mx", "my", "mt", "mr", "mb", "ml", "ms", "me"],
  mx: ["mx", "ml", "mr", "ms", "me"],
  my: ["my", "mt", "mb"],
};

const DISPLAY_SET = new Set([
  "block", "inline-block", "inline", "flex", "inline-flex",
  "grid", "inline-grid", "table", "inline-table", "hidden", "contents",
]);

const POSITION_SET = new Set(["static", "fixed", "absolute", "relative", "sticky"]);
const TEXT_ALIGN_SET = new Set(["left", "center", "right", "justify", "start", "end"]);
const TEXT_SIZE_SET = new Set(["xs", "sm", "base", "lg", "xl", "2xl", "3xl", "4xl", "5xl", "6xl", "7xl", "8xl", "9xl"]);
const FONT_WEIGHT_SET = new Set(["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black"]);
const BORDER_STYLE_SET = new Set(["solid", "dashed", "dotted", "double", "hidden", "none"]);
const OUTLINE_STYLE_SET = new Set(["solid", "dashed", "dotted", "double", "none"]);
const SHADOW_SIZE_SET = new Set(["2xs", "xs", "sm", "md", "lg", "xl", "2xl", "inner", "none"]);
const ROUNDED_SIZE_SET = new Set(["none", "2xs", "xs", "sm", "md", "lg", "xl", "2xl", "3xl", "full"]);
const FLEX_VAL_SET = new Set(["1", "auto", "initial", "none"]);
const BG_NON_COLOR = /^(?:none|gradient-|linear$|linear-|radial$|radial-|conic$|conic-|clip-|origin-|repeat|no-repeat|cover$|contain$|auto$|center$|top$|bottom$|left$|right$|fixed$|local$|scroll$|blend-|size-|position-)/;

const ROUNDED_ALL_KEYS = [
  "rounded",
  "rounded-t", "rounded-r", "rounded-b", "rounded-l", "rounded-s", "rounded-e",
  "rounded-tl", "rounded-tr", "rounded-br", "rounded-bl",
  "rounded-ss", "rounded-se", "rounded-ee", "rounded-es",
];

function splitVariant(token: string): [string, string] {
  let depth = 0;
  let lastColon = -1;
  for (let i = 0; i < token.length; i++) {
    const ch = token[i];
    if (ch === "[") depth++;
    else if (ch === "]" && depth > 0) depth--;
    else if (ch === ":" && depth === 0) lastColon = i;
  }
  if (lastColon === -1) return ["", token];
  const rawVariant = token.slice(0, lastColon);
  const base = token.slice(lastColon + 1);
  // Canonicalize stacked variants (`dark:hover:` === `hover:dark:`) so overrides match regardless of modifier order.
  const parts: string[] = [];
  let segStart = 0;
  depth = 0;
  for (let i = 0; i <= rawVariant.length; i++) {
    const ch = rawVariant[i];
    if (ch === "[") depth++;
    else if (ch === "]" && depth > 0) depth--;
    else if ((ch === ":" || i === rawVariant.length) && depth === 0) {
      parts.push(rawVariant.slice(segStart, i));
      segStart = i + 1;
    }
  }
  const canonicalVariant = parts.length > 1 ? parts.sort().join(":") + ":" : rawVariant + ":";
  return [canonicalVariant, base];
}

function getConflictKeys(rawBase: string): string[] {
  let base = rawBase.startsWith("!") ? rawBase.slice(1) : rawBase;
  if (base.endsWith("!")) base = base.slice(0, -1);
  const negStripped = base.startsWith("-") ? base.slice(1) : base;

  if (DISPLAY_SET.has(base)) return ["display"];
  if (POSITION_SET.has(base)) return ["position"];
  if (base === "visible" || base === "invisible" || base === "collapse") return ["visibility"];

  const sp = negStripped.match(/^(p|px|py|pt|pr|pb|pl|ps|pe|m|mx|my|mt|mr|mb|ml|ms|me)-/);
  if (sp) {
    const key = sp[1];
    return SPACING_DIRS[key] ?? [key];
  }

  if (negStripped.startsWith("space-x-")) return ["space-x"];
  if (negStripped.startsWith("space-y-")) return ["space-y"];
  if (negStripped.startsWith("inset-x-")) return ["inset-x", "left", "right", "start", "end"];
  if (negStripped.startsWith("inset-y-")) return ["inset-y", "top", "bottom"];
  if (negStripped.startsWith("inset-")) return ["inset", "inset-x", "inset-y", "top", "right", "bottom", "left", "start", "end"];
  const posSide = negStripped.match(/^(top|right|bottom|left|start|end)-/);
  if (posSide) return [posSide[1]];

  if (/^size-/.test(base)) return ["size", "w", "h"];
  if (/^w-/.test(base)) return ["w"];
  if (/^h-/.test(base)) return ["h"];
  if (/^(min-w|max-w|min-h|max-h)-/.test(base)) return [base.slice(0, 5)];
  if (/^gap-/.test(base)) {
    if (base.startsWith("gap-x-")) return ["gap-x"];
    if (base.startsWith("gap-y-")) return ["gap-y"];
    return ["gap", "gap-x", "gap-y"];
  }
  if (/^grid-cols-/.test(base)) return ["grid-cols"];
  if (/^grid-rows-/.test(base)) return ["grid-rows"];
  if (/^col-span-/.test(base)) return ["col-span"];
  if (/^row-span-/.test(base)) return ["row-span"];
  if (/^flex-(?:row|row-reverse|col|col-reverse)$/.test(base)) return ["flex-dir"];
  if (/^flex-(?:wrap|wrap-reverse|nowrap)$/.test(base)) return ["flex-wrap"];
  if (base.startsWith("flex-") && (FLEX_VAL_SET.has(base.slice(5)) || base.slice(5).startsWith("["))) {
    return ["flex"];
  }
  if (base === "shrink" || /^shrink-/.test(base)) return ["shrink"];
  if (base === "grow" || /^grow-/.test(base)) return ["grow"];
  if (base.startsWith("justify-items-")) return ["justify-items"];
  if (base.startsWith("justify-self-")) return ["justify-self"];
  if (base.startsWith("justify-")) return ["justify"];
  if (base.startsWith("items-")) return ["items"];
  if (base.startsWith("self-")) return ["self"];
  if (/^-?z-/.test(base)) return ["z"];
  if (/^opacity-/.test(base)) return ["opacity"];
  if (/^cursor-/.test(base)) return ["cursor"];
  if (/^pointer-events-/.test(base)) return ["pointer-events"];
  if (/^select-/.test(base)) return ["select"];
  if (/^leading-/.test(base)) return ["leading"];
  if (/^tracking-/.test(base)) return ["tracking"];
  if (/^overflow-(x|y)-/.test(base)) return [`overflow-${base[9]}`];
  if (/^overflow-/.test(base)) return ["overflow", "overflow-x", "overflow-y"];

  if (negStripped.startsWith("translate-x-")) return ["translate-x"];
  if (negStripped.startsWith("translate-y-")) return ["translate-y"];
  if (negStripped.startsWith("scale-x-")) return ["scale-x"];
  if (negStripped.startsWith("scale-y-")) return ["scale-y"];
  if (negStripped.startsWith("scale-")) return ["scale", "scale-x", "scale-y"];
  if (negStripped.startsWith("rotate-")) return ["rotate"];

  if (base === "shadow" || (base.startsWith("shadow-") && SHADOW_SIZE_SET.has(base.slice(7)))) {
    return ["shadow"];
  }
  if (base.startsWith("shadow-")) {
    return ["shadow-color"];
  }

  if (base === "rounded" || (base.startsWith("rounded-") && (ROUNDED_SIZE_SET.has(base.slice(8)) || base.slice(8).startsWith("[")))) {
    return ROUNDED_ALL_KEYS;
  }
  const rSide = base.match(/^rounded-(tl|tr|br|bl|ss|se|ee|es|t|r|b|l|s|e)(?:-.+)?$/);
  if (rSide) {
    const s = rSide[1];
    if (s === "t") return ["rounded-t", "rounded-tl", "rounded-tr", "rounded-ss", "rounded-se"];
    if (s === "b") return ["rounded-b", "rounded-bl", "rounded-br", "rounded-es", "rounded-ee"];
    if (s === "l") return ["rounded-l", "rounded-tl", "rounded-bl"];
    if (s === "r") return ["rounded-r", "rounded-tr", "rounded-br"];
    if (s === "s") return ["rounded-s", "rounded-ss", "rounded-es"];
    if (s === "e") return ["rounded-e", "rounded-se", "rounded-ee"];
    return [`rounded-${s}`];
  }

  if (base === "border" || /^border-(?:\d+|\[(?:length:[^\]]+|[^\]#]+(?:px|rem|em))\])$/.test(base)) {
    return ["border-w", "border-w-t", "border-w-r", "border-w-b", "border-w-l", "border-w-x", "border-w-y", "border-w-s", "border-w-e"];
  }
  const bwSide = base.match(/^border-(t|r|b|l|x|y|s|e)(?:-(?:\d+|\[(?:length:[^\]]+|[^\]#]+(?:px|rem|em))\]))?$/);
  if (bwSide) {
    const side = bwSide[1];
    if (side === "x") return ["border-w-x", "border-w-l", "border-w-r"];
    if (side === "y") return ["border-w-y", "border-w-t", "border-w-b"];
    return [`border-w-${side}`];
  }
  if (base === "border-collapse" || base === "border-separate") {
    return ["border-collapse"];
  }
  if (base.startsWith("border-spacing-")) {
    if (base.startsWith("border-spacing-x-")) return ["border-spacing-x"];
    if (base.startsWith("border-spacing-y-")) return ["border-spacing-y"];
    return ["border-spacing", "border-spacing-x", "border-spacing-y"];
  }
  if (base.startsWith("border-") && BORDER_STYLE_SET.has(base.slice(7))) {
    return ["border-style"];
  }
  const bcSide = base.match(/^border-(t|r|b|l|x|y|s|e)-/);
  if (bcSide) {
    const side = bcSide[1];
    if (side === "x") return ["border-c-x", "border-c-l", "border-c-r"];
    if (side === "y") return ["border-c-y", "border-c-t", "border-c-b"];
    return [`border-c-${side}`];
  }
  if (base.startsWith("border-")) {
    return ["border-color", "border-c-t", "border-c-r", "border-c-b", "border-c-l", "border-c-x", "border-c-y", "border-c-s", "border-c-e"];
  }

  if (base === "outline" || /^outline-(?:\d+|\[(?:length:[^\]]+|[^\]#]+(?:px|rem|em))\])$/.test(base)) {
    return ["outline-w"];
  }
  if (base.startsWith("outline-offset-")) {
    return ["outline-offset"];
  }
  if (base.startsWith("outline-") && OUTLINE_STYLE_SET.has(base.slice(8))) {
    return base === "outline-none" ? ["outline-style", "outline-w"] : ["outline-style"];
  }
  if (base.startsWith("outline-")) {
    return ["outline-color"];
  }

  if (base === "ring-inset") return ["ring-inset"];
  if (base.startsWith("ring-offset-")) {
    return /^ring-offset-(?:\d+|\[(?:length:[^\]]+|[^\]#]+(?:px|rem|em))\])/.test(base)
      ? ["ring-offset-w"]
      : ["ring-offset-color"];
  }
  if (base === "ring" || /^ring-(?:\d+|\[(?:length:[^\]]+|[^\]#]+(?:px|rem|em))\])$/.test(base)) {
    return ["ring-w"];
  }
  if (base.startsWith("ring-")) return ["ring-color"];

  if (base.startsWith("text-")) {
    const rest = base.slice(5);
    if (TEXT_ALIGN_SET.has(rest)) return ["text-align"];
    if (rest === "ellipsis" || rest === "clip") return ["text-overflow"];
    if (rest === "wrap" || rest === "nowrap" || rest === "balance" || rest === "pretty") {
      return ["text-wrap"];
    }
    if (rest === "shadow" || rest.startsWith("shadow-")) return ["text-shadow"];
    const slashIdx = rest.indexOf("/");
    const sizeHead = slashIdx === -1 ? rest : rest.slice(0, slashIdx);
    if (TEXT_SIZE_SET.has(sizeHead) || /^\[(?:length:|[\d.]+(?:px|rem|em|vw|vh|%))/.test(sizeHead)) {
      return slashIdx !== -1 ? ["text-size", "leading"] : ["text-size"];
    }
    return ["text-color"];
  }

  if (base.startsWith("font-")) {
    const rest = base.slice(5);
    if (rest === "sans" || rest === "serif" || rest === "mono") return ["font-family"];
    if (FONT_WEIGHT_SET.has(rest)) return ["font-weight"];
  }

  if (base.startsWith("bg-") && !BG_NON_COLOR.test(base.slice(3))) {
    return ["bg"];
  }

  if (base === "transition" || /^transition-/.test(base)) return ["transition"];
  if (/^duration-/.test(base)) return ["duration"];
  if (/^animate-/.test(base)) return ["animate"];

  return [];
}

function collectTokens(input: ClassValue, tokens: string[]): void {
  if (!input) return;
  if (typeof input === "string" || typeof input === "number") {
    const str = String(input).trim();
    if (!str) return;
    for (const part of str.split(/\s+/)) {
      if (part) tokens.push(part);
    }
    return;
  }
  if (Array.isArray(input)) {
    for (const item of input) collectTokens(item, tokens);
    return;
  }
  if (typeof input === "object") {
    for (const [key, enabled] of Object.entries(input)) {
      if (enabled) collectTokens(key, tokens);
    }
  }
}

/** Class merger with zero-dependency Tailwind utility conflict resolution (last class wins). */
export function cn(...inputs: ClassValue[]): string {
  const tokens: string[] = [];
  for (const input of inputs) {
    collectTokens(input, tokens);
  }
  if (tokens.length <= 1) return tokens.join(" ");

  const kept: string[] = [];
  const seen = new Map<string, number>();

  for (let i = tokens.length - 1; i >= 0; i--) {
    const token = tokens[i];
    const [variant, base] = splitVariant(token);
    const groups = getConflictKeys(base);
    if (groups.length === 0) {
      kept.push(token);
      continue;
    }
    if (seen.has(`${variant}${groups[0]}`)) continue;
    for (const g of groups) {
      seen.set(`${variant}${g}`, 1);
    }
    kept.push(token);
  }

  return kept.reverse().join(" ");
}

/** Returns true only for safe link schemes (http/https/mailto/tel/relative paths/hashes). */
export function isSafeUrl(url: string): boolean {
  const trimmed = url.trim();
  if (!trimmed) return false;
  if (trimmed.startsWith("//")) return false;
  return /^(https?:\/\/|mailto:|tel:|\/|#)/i.test(trimmed);
}

/** Escapes special regular expression metacharacters in untrusted literal strings. */
export function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
