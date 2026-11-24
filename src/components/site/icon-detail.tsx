"use client";

import * as React from "react";
import Link from "next/link";
import { CodeBox } from "@/components/site/code-box";
import type { SvgNode } from "@/lib/serialize-icon";

type Anim = "draw" | "pulse" | "spin" | "none";

const MODES: { value: Anim; label: string }[] = [
  { value: "draw", label: "Draw" },
  { value: "pulse", label: "Pulse" },
  { value: "spin", label: "Spin" },
  { value: "none", label: "Static" },
];

const BTN =
  "rounded-md border px-2.5 py-1.5 font-mono text-[11px] uppercase transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";
const BTN_ACTIVE = "border-foreground bg-primary font-bold text-primary-foreground";
const BTN_IDLE = "border-border bg-card text-muted-foreground hover:border-foreground hover:text-foreground";

function renderSvgNodes(nodes: SvgNode[], prefix = "n"): React.ReactNode {
  return nodes.map((node, i) => {
    const key = `${prefix}-${i}`;
    const props = { ...node.attrs, key };
    const children = node.children ? renderSvgNodes(node.children, key) : undefined;
    return React.createElement(node.tag, props, children);
  });
}

function serializeSvgMarkup(nodes: SvgNode[], size: number, strokeWidth: number): string {
  const renderAttr = ([k, v]: [string, string | number]) =>
    `${k}="${String(v).replace(/&/g, "&amp;").replace(/"/g, "&quot;")}"`;
  const renderNode = (node: SvgNode): string => {
    const attrs = Object.entries(node.attrs).map(renderAttr).join(" ");
    const attrStr = attrs ? ` ${attrs}` : "";
    if (node.children && node.children.length > 0) {
      return `<${node.tag}${attrStr}>${node.children.map(renderNode).join("")}</${node.tag}>`;
    }
    return `<${node.tag}${attrStr} />`;
  };
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round">${nodes.map(renderNode).join("")}</svg>`;
}

export function IconDetail({
  name,
  category,
  nodes,
  prev,
  next,
  index,
  total,
}: {
  name: string;
  category?: string;
  nodes: SvgNode[];
  prev: string;
  next: string;
  index: number;
  total: number;
}) {
  const [animation, setAnimation] = React.useState<Anim>("draw");
  const [replayKey, setReplayKey] = React.useState(0);
  const [strokeWidth, setStrokeWidth] = React.useState(1.75);
  const [copiedSvg, setCopiedSvg] = React.useState(false);

  const svgRef = React.useRef<SVGSVGElement>(null);

  React.useEffect(() => {
    if (animation !== "draw" || !svgRef.current) return;
    if (typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    const paths = svgRef.current.querySelectorAll<SVGGeometryElement>("path,circle,rect,line,polyline,polygon,ellipse");
    paths.forEach((p, idx) => {
      try {
        const len = p.getTotalLength?.() || 60;
        p.style.strokeDasharray = `${len}`;
        p.style.strokeDashoffset = `${len}`;
        p.animate(
          [{ strokeDashoffset: len }, { strokeDashoffset: 0 }],
          { duration: 420, delay: idx * 35, easing: "cubic-bezier(0.22, 1, 0.36, 1)", fill: "forwards" }
        );
      } catch {
        // Ignore geometry elements that do not implement getTotalLength in non-layout engines
      }
    });
  }, [animation, replayKey, nodes]);

  const rawSvg = React.useMemo(
    () => serializeSvgMarkup(nodes, 24, strokeWidth),
    [nodes, strokeWidth]
  );

  const handleCopySvg = async () => {
    try {
      await navigator.clipboard.writeText(rawSvg);
      setCopiedSvg(true);
      setTimeout(() => setCopiedSvg(false), 1600);
    } catch {
      // Clipboard may be blocked in insecure contexts
    }
  };

  const handleDownloadSvg = () => {
    const blob = new Blob([rawSvg], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${name}.svg`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  const pascalName = name
    .split("-")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join("") + "Icon";
  const snippet = `import { ${pascalName} } from "bigbullicons";\n\n<${pascalName} size={20} strokeWidth={${strokeWidth}} />`;

  return (
    <>
      <nav aria-label="Breadcrumb" className="flex flex-wrap items-center justify-between gap-2">
        <Link
          href="/icons"
          className="rounded-md border border-border bg-card px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-muted-foreground transition-colors hover:border-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          ← All icons
        </Link>
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
          {index + 1} / {total}
        </p>
      </nav>
      <header className="space-y-2">
        <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
          BIGBULLUI // ICONS{category ? ` // ${category}` : ""}
        </p>
        <h1 className="max-w-full break-all font-mono text-3xl font-black uppercase tracking-tight sm:text-4xl">
          {name}
        </h1>
      </header>
      <section
        aria-label="Icon preview"
        className="rounded-lg border border-border bg-card p-4 sm:p-6 space-y-4"
      >
        <div className="rounded-md border-2 border-dashed border-foreground/30 bg-background p-8 text-center">
          <svg
            ref={svgRef}
            key={replayKey}
            width={96}
            height={96}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className={
              "mx-auto max-w-full text-foreground " +
              (animation === "pulse"
                ? "motion-safe:animate-pulse"
                : animation === "spin"
                  ? "motion-safe:animate-spin"
                  : "")
            }
          >
            {renderSvgNodes(nodes)}
          </svg>
          <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            {`size 96 // stroke ${strokeWidth} // ${animation === "none" ? "static" : animation}`}
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Animation">
            {MODES.map((mode) => (
              <button
                key={mode.value}
                type="button"
                onClick={() => setAnimation(mode.value)}
                aria-pressed={animation === mode.value}
                className={`${BTN} ${animation === mode.value ? BTN_ACTIVE : BTN_IDLE}`}
              >
                {mode.label}
              </button>
            ))}
            <button
              type="button"
              onClick={() => setReplayKey((k) => k + 1)}
              className={`${BTN} ${BTN_IDLE}`}
            >
              Replay
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <label className="flex items-center gap-2 rounded-md border border-border bg-background px-2.5 py-1 font-mono text-[11px] text-muted-foreground">
              <span>Stroke {strokeWidth.toFixed(2)}</span>
              <input
                type="range"
                min={1}
                max={3}
                step={0.25}
                value={strokeWidth}
                onChange={(e) => setStrokeWidth(Number(e.target.value))}
                aria-label="Stroke width"
                className="w-20 accent-accent-strong"
              />
            </label>
            <button
              type="button"
              onClick={handleCopySvg}
              className={`${BTN} ${BTN_IDLE}`}
            >
              {copiedSvg ? "Copied SVG" : "Copy SVG"}
            </button>
            <button
              type="button"
              onClick={handleDownloadSvg}
              className={`${BTN} ${BTN_ACTIVE}`}
            >
              Download .svg
            </button>
          </div>
        </div>
      </section>
      <div className="min-w-0 space-y-2">
        <CodeBox block code={snippet} />
        <div className="flex flex-wrap gap-2">
          <CodeBox code={`npx bigbullui add icon-${name}`} />
          <CodeBox code="npm install bigbullicons" />
        </div>
      </div>
      <nav aria-label="More icons" className="flex items-center justify-between gap-2">
        <Link
          href={`/icons/${prev}`}
          className="min-w-0 max-w-[48%] truncate rounded-md border border-border bg-card px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-muted-foreground transition-colors hover:border-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          ← {prev}
        </Link>
        <Link
          href={`/icons/${next}`}
          className="min-w-0 max-w-[48%] truncate rounded-md border border-border bg-card px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-muted-foreground transition-colors hover:border-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {next} →
        </Link>
      </nav>
    </>
  );
}
