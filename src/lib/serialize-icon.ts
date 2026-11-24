import * as React from "react";

export type SvgNode = {
  tag: string;
  attrs: Record<string, string | number>;
  children?: SvgNode[];
};

const ALLOWED_TAGS = new Set([
  "path",
  "circle",
  "rect",
  "line",
  "polyline",
  "polygon",
  "ellipse",
  "g",
]);

function mapAttrKey(key: string): string {
  if (key === "className") return "class";
  return key;
}

export function serializeIconNode(node: React.ReactNode): SvgNode[] {
  const out: SvgNode[] = [];
  React.Children.forEach(node, (child) => {
    if (child == null || typeof child === "boolean") return;
    if (Array.isArray(child)) {
      out.push(...serializeIconNode(child));
      return;
    }
    if (!React.isValidElement(child)) return;
    const props = (child.props ?? {}) as Record<string, unknown>;
    if (child.type === React.Fragment) {
      out.push(...serializeIconNode(props.children as React.ReactNode));
      return;
    }
    if (typeof child.type === "string" && ALLOWED_TAGS.has(child.type)) {
      const attrs: Record<string, string | number> = {};
      for (const [k, v] of Object.entries(props)) {
        if (k === "children" || k === "key" || k === "ref") continue;
        if (typeof v === "string" || typeof v === "number") {
          attrs[mapAttrKey(k)] = v;
        }
      }
      const nested = props.children ? serializeIconNode(props.children as React.ReactNode) : undefined;
      out.push({
        tag: child.type,
        attrs,
        ...(nested && nested.length > 0 ? { children: nested } : {}),
      });
    }
  });
  return out;
}
