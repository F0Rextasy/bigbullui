export type ClassValue = string | number | boolean | null | undefined;

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
const SHADOW_SIZE_SET = new Set(["2xs", "xs", "sm", "md", "lg", "xl", "2xl", "inner", "none"]);
const ROUNDED_SIZE_SET = new Set(["none", "2xs", "xs", "sm", "md", "lg", "xl", "2xl", "3xl", "full"]);
const BG_NON_COLOR = /^(?:none|gradient-|linear-|radial-|conic-|clip-|origin-|repeat|no-repeat|cover$|contain$|auto$|center$|top$|bottom$|left$|right$|fixed$|local$|scroll$)/;

function splitVariant(token: string): [string, string] {
  let depth = 0;
  let lastColon = -1;
  for (let i = 0; i < token.length; i++) {
    const ch = token[i];
    if (ch === "[") depth++;
    else if (ch === "]" && depth > 0) depth--;
    else if (ch === ":" && depth === 0) lastColon = i;
  }
  return lastColon === -1 ? ["", token] : [token.slice(0, lastColon + 1), token.slice(lastColon + 1)];
}

function getConflictKeys(rawBase: string): string[] {
  const base = rawBase.startsWith("!") ? rawBase.slice(1) : rawBase;
  const negStripped = base.startsWith("-") ? base.slice(1) : base;

  if (DISPLAY_SET.has(base)) return ["display"];
  if (POSITION_SET.has(base)) return ["position"];
  if (base === "visible" || base === "invisible" || base === "collapse") return ["visibility"];

  const sp = negStripped.match(/^(p|px|py|pt|pr|pb|pl|ps|pe|m|mx|my|mt|mr|mb|ml|ms|me)-/);
  if (sp) {
    const key = sp[1];
    return SPACING_DIRS[key] ?? [key];
  }

  if (/^size-/.test(base)) return ["size", "w", "h"];
  if (/^w-/.test(base)) return ["w"];
  if (/^h-/.test(base)) return ["h"];
  if (/^(min-w|max-w|min-h|max-h)-/.test(base)) return [base.slice(0, 5)];
  if (/^gap-/.test(base)) {
    if (base.startsWith("gap-x-")) return ["gap-x"];
    if (base.startsWith("gap-y-")) return ["gap-y"];
    return ["gap", "gap-x", "gap-y"];
  }
  if (/^-?z-/.test(base)) return ["z"];
  if (/^opacity-/.test(base)) return ["opacity"];
  if (/^cursor-/.test(base)) return ["cursor"];
  if (/^pointer-events-/.test(base)) return ["pointer-events"];
  if (/^select-/.test(base)) return ["select"];
  if (/^leading-/.test(base)) return ["leading"];
  if (/^tracking-/.test(base)) return ["tracking"];
  if (/^overflow-(x|y)-/.test(base)) return [`overflow-${base[9]}`];
  if (/^overflow-/.test(base)) return ["overflow", "overflow-x", "overflow-y"];

  if (base === "shadow" || (base.startsWith("shadow-") && SHADOW_SIZE_SET.has(base.slice(7)))) {
    return ["shadow"];
  }

  if (base === "rounded" || (base.startsWith("rounded-") && (ROUNDED_SIZE_SET.has(base.slice(8)) || base.slice(8).startsWith("[")))) {
    return ["rounded"];
  }

  if (base === "border" || /^border-(0|2|4|8|\[[^\]#]+(?:px|rem|em)\])$/.test(base)) {
    return ["border-w"];
  }
  if (/^border-(t|r|b|l|x|y|s|e)(?:-(?:0|2|4|8|\[[^\]#]+\]))?$/.test(base)) {
    return [`border-w-${base[7]}`];
  }
  if (base.startsWith("border-") && BORDER_STYLE_SET.has(base.slice(7))) {
    return ["border-style"];
  }
  if (base.startsWith("border-")) {
    return ["border-color"];
  }

  if (base.startsWith("text-")) {
    const rest = base.slice(5);
    if (TEXT_ALIGN_SET.has(rest)) return ["text-align"];
    if (TEXT_SIZE_SET.has(rest) || /^\[(?:length:|[\d.]+(?:px|rem|em|vw|vh|%))/.test(rest)) {
      return ["text-size"];
    }
    if (rest === "wrap" || rest === "nowrap" || rest === "balance" || rest === "pretty") {
      return ["text-wrap"];
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

/** Class merger with zero-dependency Tailwind utility conflict resolution (last class wins). */
export function cn(...inputs: ClassValue[]): string {
  const tokens: string[] = [];
  for (const input of inputs) {
    if (typeof input === "string" || typeof input === "number") {
      const str = String(input).trim();
      if (!str) continue;
      for (const part of str.split(/\s+/)) {
        if (part) tokens.push(part);
      }
    }
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
    const primary = `${variant}${groups[0]}`;
    if (seen.has(primary)) continue;
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
