"use client";

import * as React from "react";
import { cn } from "./lib/utils";

/**
 * SankeyChart - two-level flow diagram with bezier ribbons
 */
interface SankeyNode {
  id: string;
  label: string;
  side: "left" | "right";
}

interface SankeyFlow {
  from: string;
  to: string;
  value: number;
}

interface SankeyChartProps {
  nodes: SankeyNode[];
  flows: SankeyFlow[];
}

const Ribbon = ({
  from,
  to,
  value,
}: { from: { x: number; y: number }; to: { x: number; y: number }; value: number }) => {
  const width = Math.max(3, value * 20); // scale value to pixel width
  const amperage = Math.max(width * 4, 40);

  // Cubic bezier curve points
  // from bottom-right to to bottom-left with control points
  const d = `M ${from.x} ${from.y}
    C ${from.x + amperage} ${from.y},
      ${to.x - amperage} ${to.y},
      ${to.x} ${to.y}`;

  return (
    <path
      d={d}
      stroke="currentColor"
      strokeWidth={width}
      fill="none"
      opacity={0.55}
      className={cn(
        "transition-colors duration-300",
        "motion-reduce:animate-none",
      )}
    />
  );
};

export const SankeyChart = React.forwardRef<SVGSVGElement, SankeyChartProps>(
  function SankeyChart(props, ref) {
    const { nodes, flows } = props;

    // Separate left and right nodes
    const leftNodes = nodes.filter(n => n.side === "left");
    const rightNodes = nodes.filter(n => n.side === "right");

    // Create lookup maps
    const leftNodeMap = new Map(leftNodes.map(n => [n.id, n]));
    const rightNodeMap = new Map(rightNodes.map(n => [n.id, n]));

    // Calculate node positions
    const nodeCount = Math.max(leftNodes.length, rightNodes.length);
    const nodeSpacing = 80;
    const diagramWidth = 600;
    const diagramHeight = (nodeCount + 1) * nodeSpacing;

    // Position left nodes vertically
    const leftPositions = new Map(
      leftNodes.map((n, i) => [n.id, { x: 50, y: 50 + i * nodeSpacing }]),
    );

    // Position right nodes vertically
    const rightPositions = new Map(
      rightNodes.map((n, i) => [n.id, { x: diagramWidth - 50, y: 50 + i * nodeSpacing }]),
    );

    // Sort flows by value for rendering order
    const sortedFlows = [...flows].sort((a, b) => b.value - a.value);

    return (
      <svg
        ref={ref}
        width={diagramWidth}
        height={diagramHeight}
        viewBox={`0 0 ${diagramWidth} ${diagramHeight}`}
        className={cn(
          "relative w-full",
          "motion-reduce:animate-none",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        )}
      >
        {/* Render ribbons for flows */}
        {sortedFlows.map((flow, i) => {
          const fromNode = leftNodeMap.get(flow.from) || rightNodeMap.get(flow.from);
          const toNode = leftNodeMap.get(flow.to) || rightNodeMap.get(flow.to);

          if (!fromNode || !toNode) return null;

          const fromPos = fromNode.side === "left"
            ? leftPositions.get(flow.from)!
            : rightPositions.get(flow.from)!;
          const toPos = toNode.side === "left"
            ? leftPositions.get(flow.to)!
            : rightPositions.get(flow.to)!;

          return (
            <g
              key={flow.from + "-" + flow.to}
              className="text-accent"
            >
              <Ribbon
                from={{ x: fromPos.x, y: fromPos.y }}
                to={{ x: toPos.x, y: toPos.y }}
                value={flow.value}
              />
            </g>
          );
        })}

        {/* Render nodes */}
        {leftNodes.map((node, i) => (
          <g key={node.id} style={{ opacity: 1 }}>
            <rect
              x={leftPositions.get(node.id)!.x - 30}
              y={leftPositions.get(node.id)!.y - 15}
              width={60}
              height={30}
              rx={4}
              fill="currentColor"
              className={cn(
                "transition-colors duration-200",
                "fill-secondary",
                "animate-none",
              )}
            />
            <text
              x={leftPositions.get(node.id)!.x}
              y={leftPositions.get(node.id)!.y}
              textAnchor="middle"
              fontSize={10}
              fill="currentColor"
              className={cn(
                "transition-colors duration-200",
                "fill-secondary-foreground",
                "animate-none",
              )}
            >
              {node.label}
            </text>
          </g>
        ))}

        {rightNodes.map((node, i) => (
          <g key={node.id} style={{ opacity: 1 }}>
            <rect
              x={rightPositions.get(node.id)!.x - 30}
              y={rightPositions.get(node.id)!.y - 15}
              width={60}
              height={30}
              rx={4}
              fill="currentColor"
              className={cn(
                "transition-colors duration-200",
                "fill-secondary",
                "animate-none",
              )}
            />
            <text
              x={rightPositions.get(node.id)!.x}
              y={rightPositions.get(node.id)!.y}
              textAnchor="middle"
              fontSize={10}
              fill="currentColor"
              className={cn(
                "transition-colors duration-200",
                "fill-secondary-foreground",
                "animate-none",
              )}
            >
              {node.label}
            </text>
          </g>
        ))}

        {/* Entrance animation: ribbons draw via pathLength */}
        {/* Already handled via stroke-dashoffset above */}
      </svg>
    );
  },
);
SankeyChart.displayName = "SankeyChart";

