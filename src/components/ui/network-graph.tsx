"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface NetworkNode {
  id: string;
  label: string;
  x: number;
  y: number;
  size?: number;
}

export interface NetworkEdge {
  from: string;
  to: string;
  weight?: number;
}

export interface NetworkGraphProps extends React.HTMLAttributes<SVGSVGElement> {
  nodes: NetworkNode[];
  edges: NetworkEdge[];
  height?: number;
}

/** Düğüm-bağlantı grafiği: statik düzen + hover vurgu + bezier bağlantılar. */
export function NetworkGraph({ nodes, edges, height = 260, className, ...props }: NetworkGraphProps) {
  const [hover, setHover] = React.useState<string | null>(null);
  const byId = new Map(nodes.map((n) => [n.id, n]));
  const connected = (id: string) => hover !== null && (id === hover || edges.some((e) => (e.from === hover && e.to === id) || (e.to === hover && e.from === id)));

  return (
    <svg viewBox="0 0 100 62" style={{ height }} className={cn("w-full", className)} role="img" aria-label="Ağ grafiği" {...props}>
      <style>{`@keyframes ngDraw { from { stroke-dashoffset: 60; } } @keyframes ngNode { from { transform: scale(0); } }`}</style>
      {edges.map((edge, idx) => {
        const a = byId.get(edge.from);
        const b = byId.get(edge.to);
        if (!a || !b) return null;
        const mx = (a.x + b.x) / 2;
        const my = (a.y + b.y) / 2 - 6;
        const active = hover !== null && (edge.from === hover || edge.to === hover);
        return (
          <path
            key={idx}
            d={`M ${a.x} ${a.y} Q ${mx} ${my} ${b.x} ${b.y}`}
            fill="none"
            stroke={active ? "var(--accent)" : "var(--border)"}
            strokeWidth={active ? 0.6 : (edge.weight ?? 0.3)}
            strokeDasharray="60"
            style={{ animation: "ngDraw 0.6s ease-out both", animationDelay: `${idx * 80}ms`, opacity: hover === null || active ? 1 : 0.25, transition: "opacity 0.2s" }}
          />
        );
      })}
      {nodes.map((node, idx) => {
        const r = 2.5 + (node.size ?? 0) * 1.5;
        const dim = hover !== null && !connected(node.id) && node.id !== hover;
        return (
          <g
            key={node.id}
            onMouseEnter={() => setHover(node.id)}
            onMouseLeave={() => setHover(null)}
            style={{ animation: `ngNode 0.35s cubic-bezier(0.34,1.56,0.64,1) both`, animationDelay: `${idx * 70}ms`, transformOrigin: `${node.x}px ${node.y}px`, opacity: dim ? 0.3 : 1, transition: "opacity 0.2s" }}
            className="cursor-pointer"
          >
            <circle cx={node.x} cy={node.y} r={r} fill={hover === node.id ? "var(--accent)" : "var(--card)"} stroke="var(--accent)" strokeWidth={hover === node.id ? 0.7 : 0.4} />
            <text x={node.x} y={node.y - r - 2} textAnchor="middle" fontSize="2.6" fill="var(--foreground)" className="pointer-events-none select-none font-mono">
              {node.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
