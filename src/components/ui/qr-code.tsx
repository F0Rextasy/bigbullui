"use client";

import * as React from "react";
import { cn } from "./lib/utils";

/**
 * GF(256) exp/log lookup tables for QR Reed-Solomon error correction (poly 0x11d, alpha = 2).
 */
const { GF_EXP, GF_LOG } = (() => {
  const exp = new Uint8Array(512);
  const log = new Uint8Array(256);
  let x = 1;
  for (let i = 0; i < 255; i++) {
    exp[i] = x;
    exp[i + 255] = x;
    log[x] = i;
    x <<= 1;
    if (x & 0x100) x ^= 0x11d;
  }
  return { GF_EXP: exp, GF_LOG: log };
})();

function gfMul(a: number, b: number): number {
  return a === 0 || b === 0 ? 0 : GF_EXP[GF_LOG[a] + GF_LOG[b]];
}

function rsRemainder(data: Uint8Array, ecCount: number): Uint8Array {
  let gen = [1];
  for (let i = 0; i < ecCount; i++) {
    const next = new Array<number>(gen.length + 1).fill(0);
    for (let j = 0; j < gen.length; j++) {
      next[j] ^= gen[j];
      next[j + 1] ^= gfMul(gen[j], GF_EXP[i]);
    }
    gen = next;
  }
  const buf = new Uint8Array(data.length + ecCount);
  buf.set(data);
  for (let i = 0; i < data.length; i++) {
    const coef = buf[i];
    if (coef !== 0) {
      for (let j = 0; j < gen.length; j++) {
        buf[i + j] ^= gfMul(gen[j], coef);
      }
    }
  }
  return buf.slice(data.length);
}

type QrLevel = "L" | "M" | "Q" | "H";
type VersionSpec = {
  version: number;
  align: number[];
  remBits: number;
  ec: Record<QrLevel, [number, number, number, number, number]>; // [b1, d1, b2, d2, ecPerBlock]
};

const QR_VERSIONS: VersionSpec[] = [
  { version: 1, align: [], remBits: 0, ec: { L: [1, 19, 0, 0, 7], M: [1, 16, 0, 0, 10], Q: [1, 13, 0, 0, 13], H: [1, 9, 0, 0, 17] } },
  { version: 2, align: [6, 18], remBits: 7, ec: { L: [1, 34, 0, 0, 10], M: [1, 28, 0, 0, 16], Q: [1, 22, 0, 0, 22], H: [1, 16, 0, 0, 28] } },
  { version: 3, align: [6, 22], remBits: 7, ec: { L: [1, 55, 0, 0, 15], M: [1, 44, 0, 0, 26], Q: [2, 17, 0, 0, 18], H: [2, 13, 0, 0, 22] } },
  { version: 4, align: [6, 26], remBits: 7, ec: { L: [1, 80, 0, 0, 20], M: [2, 32, 0, 0, 18], Q: [2, 24, 0, 0, 26], H: [4, 9, 0, 0, 16] } },
  { version: 5, align: [6, 30], remBits: 7, ec: { L: [1, 108, 0, 0, 26], M: [2, 43, 0, 0, 24], Q: [2, 15, 2, 16, 18], H: [2, 11, 2, 12, 22] } },
  { version: 6, align: [6, 34], remBits: 7, ec: { L: [2, 68, 0, 0, 18], M: [4, 27, 0, 0, 16], Q: [4, 19, 0, 0, 24], H: [4, 15, 0, 0, 28] } },
];

const EC_FORMAT_ID: Record<QrLevel, number> = { L: 0b01, M: 0b00, Q: 0b11, H: 0b10 };

function computeFormatBits(level: QrLevel, mask: number): number {
  const data = (EC_FORMAT_ID[level] << 3) | mask;
  let rem = data << 10;
  for (let i = 4; i >= 0; i--) {
    if ((rem >> (i + 10)) & 1) rem ^= 0x537 << i;
  }
  return ((data << 10) | rem) ^ 0x5412;
}

function maskFn(mask: number, r: number, c: number): boolean {
  switch (mask) {
    case 0: return (r + c) % 2 === 0;
    case 1: return r % 2 === 0;
    case 2: return c % 3 === 0;
    case 3: return (r + c) % 3 === 0;
    case 4: return (Math.floor(r / 2) + Math.floor(c / 3)) % 2 === 0;
    case 5: return ((r * c) % 2) + ((r * c) % 3) === 0;
    case 6: return (((r * c) % 2) + ((r * c) % 3)) % 2 === 0;
    default: return (((r + c) % 2) + ((r * c) % 3)) % 2 === 0;
  }
}

function scoreMaskPenalty(m: boolean[][]): number {
  const n = m.length;
  let penalty = 0;
  for (let r = 0; r < n; r++) {
    let runRow = 1;
    let runCol = 1;
    for (let c = 1; c < n; c++) {
      if (m[r][c] === m[r][c - 1]) {
        runRow++;
        if (runRow === 5) penalty += 3;
        else if (runRow > 5) penalty += 1;
      } else runRow = 1;
      if (m[c][r] === m[c - 1][r]) {
        runCol++;
        if (runCol === 5) penalty += 3;
        else if (runCol > 5) penalty += 1;
      } else runCol = 1;
    }
  }
  for (let r = 0; r < n - 1; r++) {
    for (let c = 0; c < n - 1; c++) {
      const b = m[r][c];
      if (b === m[r][c + 1] && b === m[r + 1][c] && b === m[r + 1][c + 1]) penalty += 3;
    }
  }
  return penalty;
}

/**
 * Encodes a UTF-8 string into an ISO/IEC 18004 Byte-mode QR matrix (versions 1-6).
 */
export const encodeQrMatrix = (value: string, level: QrLevel = "M"): boolean[][] => {
  const rawBytes = new TextEncoder().encode(value ?? "");
  let spec = QR_VERSIONS[QR_VERSIONS.length - 1];
  for (const candidate of QR_VERSIONS) {
    const [b1, d1, b2, d2] = candidate.ec[level];
    const totalData = b1 * d1 + b2 * d2;
    if (4 + 8 + rawBytes.length * 8 <= totalData * 8) {
      spec = candidate;
      break;
    }
  }

  const [b1, d1, b2, d2, ecPerBlock] = spec.ec[level];
  const totalDataBytes = b1 * d1 + b2 * d2;
  const maxPayloadBytes = Math.max(0, totalDataBytes - 2);
  const bytes = rawBytes.length > maxPayloadBytes ? rawBytes.slice(0, maxPayloadBytes) : rawBytes;

  const bits: number[] = [];
  const pushBits = (val: number, len: number) => {
    for (let i = len - 1; i >= 0; i--) bits.push((val >> i) & 1);
  };
  pushBits(0b0100, 4); // Byte mode
  pushBits(bytes.length, 8);
  for (const byte of bytes) pushBits(byte, 8);
  const totalDataBits = totalDataBytes * 8;
  for (let i = 0; i < 4 && bits.length < totalDataBits; i++) bits.push(0);
  while (bits.length % 8 !== 0) bits.push(0);

  const codewords: number[] = [];
  for (let i = 0; i < bits.length; i += 8) {
    let byte = 0;
    for (let b = 0; b < 8; b++) byte = (byte << 1) | bits[i + b];
    codewords.push(byte);
  }
  for (let i = 0; codewords.length < totalDataBytes; i++) {
    codewords.push(i % 2 === 0 ? 0xec : 0x11);
  }

  const dataBlocks: Uint8Array[] = [];
  const ecBlocks: Uint8Array[] = [];
  let offset = 0;
  for (let g = 0; g < b1 + b2; g++) {
    const len = g < b1 ? d1 : d2;
    const block = new Uint8Array(codewords.slice(offset, offset + len));
    offset += len;
    dataBlocks.push(block);
    ecBlocks.push(rsRemainder(block, ecPerBlock));
  }

  const streamBits: number[] = [];
  const pushByte = (b: number) => {
    for (let i = 7; i >= 0; i--) streamBits.push((b >> i) & 1);
  };
  const maxDataLen = Math.max(d1, d2);
  for (let i = 0; i < maxDataLen; i++) {
    for (const block of dataBlocks) if (i < block.length) pushByte(block[i]);
  }
  for (let i = 0; i < ecPerBlock; i++) {
    for (const block of ecBlocks) pushByte(block[i]);
  }
  for (let i = 0; i < spec.remBits; i++) streamBits.push(0);

  const size = 17 + spec.version * 4;
  const base: boolean[][] = Array.from({ length: size }, () => Array<boolean>(size).fill(false));
  const reserved: boolean[][] = Array.from({ length: size }, () => Array<boolean>(size).fill(false));

  const setModule = (r: number, c: number, dark: boolean) => {
    if (r < 0 || c < 0 || r >= size || c >= size) return;
    base[r][c] = dark;
    reserved[r][c] = true;
  };

  const placeFinder = (top: number, left: number) => {
    for (let r = -1; r <= 7; r++) {
      for (let c = -1; c <= 7; c++) {
        const rr = top + r;
        const cc = left + c;
        if (rr < 0 || cc < 0 || rr >= size || cc >= size) continue;
        const inOuter = r >= 0 && r <= 6 && c >= 0 && c <= 6 && (r === 0 || r === 6 || c === 0 || c === 6);
        const inCenter = r >= 2 && r <= 4 && c >= 2 && c <= 4;
        setModule(rr, cc, inOuter || inCenter);
      }
    }
  };
  placeFinder(0, 0);
  placeFinder(0, size - 7);
  placeFinder(size - 7, 0);

  for (const ar of spec.align) {
    for (const ac of spec.align) {
      if ((ar <= 8 && ac <= 8) || (ar <= 8 && ac >= size - 9) || (ar >= size - 9 && ac <= 8)) continue;
      for (let dr = -2; dr <= 2; dr++) {
        for (let dc = -2; dc <= 2; dc++) {
          const dark = Math.max(Math.abs(dr), Math.abs(dc)) !== 1;
          setModule(ar + dr, ac + dc, dark);
        }
      }
    }
  }

  for (let i = 8; i < size - 8; i++) {
    if (!reserved[6][i]) setModule(6, i, i % 2 === 0);
    if (!reserved[i][6]) setModule(i, 6, i % 2 === 0);
  }
  setModule(4 * spec.version + 9, 8, true);

  for (let i = 0; i <= 8; i++) {
    if (!reserved[8][i]) reserved[8][i] = true;
    if (!reserved[i][8]) reserved[i][8] = true;
  }
  for (let i = 0; i < 8; i++) {
    reserved[8][size - 1 - i] = true;
    if (i < 7) reserved[size - 1 - i][8] = true;
  }

  let bitIdx = 0;
  let upward = true;
  for (let col = size - 1; col >= 1; col -= 2) {
    if (col === 6) col--;
    for (let step = 0; step < size; step++) {
      const r = upward ? size - 1 - step : step;
      for (const c of [col, col - 1]) {
        if (!reserved[r][c]) {
          base[r][c] = (streamBits[bitIdx++] ?? 0) === 1;
        }
      }
    }
    upward = !upward;
  }

  let bestMask = 0;
  let bestScore = Infinity;
  let bestMatrix = base;

  for (let mask = 0; mask < 8; mask++) {
    const candidate = base.map((row, r) =>
      row.map((val, c) => (reserved[r][c] ? val : maskFn(mask, r, c) ? !val : val))
    );
    const fmt = computeFormatBits(level, mask);
    const tlCoords: [number, number][] = [
      [8, 0], [8, 1], [8, 2], [8, 3], [8, 4], [8, 5], [8, 7], [8, 8],
      [7, 8], [5, 8], [4, 8], [3, 8], [2, 8], [1, 8], [0, 8],
    ];
    for (let i = 0; i < 15; i++) {
      const bit = ((fmt >> (14 - i)) & 1) === 1;
      const [r, c] = tlCoords[i];
      candidate[r][c] = bit;
      if (i < 7) candidate[size - 1 - i][8] = bit;
      else candidate[8][size - 15 + i] = bit;
    }
    candidate[size - 8][8] = true;
    const score = scoreMaskPenalty(candidate);
    if (score < bestScore) {
      bestScore = score;
      bestMask = mask;
      bestMatrix = candidate;
    }
  }
  void bestMask;
  return bestMatrix;
};

/**
 * QrCode component
 */
export interface QrCodeProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: string;
  size?: number;
  level?: QrLevel;
  scan?: boolean;
}

export const QrCode = React.forwardRef<HTMLDivElement, QrCodeProps>(
  function QrCode(props, ref) {
    const { value = "", size = 200, level = "M", scan = false, className, style, ...rest } = props;

    const matrix = React.useMemo(() => encodeQrMatrix(value, level), [value, level]);
    const n = matrix.length;
    const quiet = 2;
    const total = n + quiet * 2;

    return (
      <div
        ref={ref}
        role="img"
        aria-label={value ? `QR code for ${value}` : "QR code"}
        style={{ width: size, height: size, ...style }}
        className={cn(
          "relative inline-block shrink-0 overflow-hidden rounded-sm border border-border bg-card text-foreground",
          "motion-reduce:animate-none",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          className
        )}
        {...rest}
      >
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${total} ${total}`}
          className="block h-full w-full"
          aria-hidden="true"
        >
          <rect x={0} y={0} width={total} height={total} fill="currentColor" fillOpacity={0} />
          {matrix.map((row, r) =>
            row.map((cell, c) =>
              cell ? (
                <rect
                  key={`${r}-${c}`}
                  x={c + quiet}
                  y={r + quiet}
                  width={1}
                  height={1}
                  fill="currentColor"
                />
              ) : null
            )
          )}
        </svg>

        {/* Scan line if prop enabled */}
        {scan && (
          <div
            className={cn(
              "pointer-events-none absolute top-0 left-0 h-px w-full bg-accent",
              "motion-reduce:animate-none!",
              "animate-[stampIn_0.4s_ease-out_both]",
            )}
          />
        )}
      </div>
    );
  },
);
QrCode.displayName = "QrCode";

