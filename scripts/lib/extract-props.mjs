import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

const need = createRequire(import.meta.url);
const ts = need("typescript");

function toPascal(slug) {
  return slug
    .split("-")
    .map((p) => (p ? p[0].toUpperCase() + p.slice(1) : ""))
    .join("");
}

function normalizeText(raw) {
  return raw.replace(/\s+/g, " ").trim();
}

function getJsDocSummary(node, sourceFile) {
  const tags = ts.getJSDocCommentsAndTags(node);
  const parts = [];
  for (const tag of tags) {
    if (ts.isJSDoc(tag) && tag.comment) {
      const text = typeof tag.comment === "string"
        ? tag.comment
        : ts.getTextOfJSDocComment(tag.comment) ?? "";
      if (text.trim()) parts.push(text.trim());
    }
  }
  if (parts.length > 0) return normalizeText(parts.join(" "));
  const full = sourceFile.getFullText();
  const ranges = ts.getLeadingCommentRanges(full, node.pos) ?? [];
  for (const r of ranges) {
    const raw = full.slice(r.pos, r.end);
    if (raw.startsWith("/**")) {
      const cleaned = raw
        .replace(/^\/\*\*/, "")
        .replace(/\*\/$/, "")
        .split(/\r?\n/)
        .map((l) => l.replace(/^\s*\*\s?/, ""))
        .filter((l) => !l.trim().startsWith("@"))
        .join(" ");
      const s = normalizeText(cleaned);
      if (s) return s;
    }
  }
  return "";
}

function extractDefaultsFromObjectPattern(pattern, sourceFile, defaults) {
  for (const el of pattern.elements) {
    if (!ts.isBindingElement(el) || !el.initializer) continue;
    let propName = null;
    if (el.propertyName && ts.isIdentifier(el.propertyName)) {
      propName = el.propertyName.text;
    } else if (!el.propertyName && ts.isIdentifier(el.name)) {
      propName = el.name.text;
    }
    if (propName && !defaults.has(propName)) {
      const def = normalizeText(el.initializer.getText(sourceFile));
      if (def.length <= 40 && !def.includes("\n")) defaults.set(propName, def);
    }
  }
}

function extractDefaultsFromFn(fnNode, sourceFile) {
  const defaults = new Map();
  if (fnNode && fnNode.parameters && fnNode.parameters.length > 0) {
    const first = fnNode.parameters[0];
    if (ts.isObjectBindingPattern(first.name)) {
      extractDefaultsFromObjectPattern(first.name, sourceFile, defaults);
    }
  }
  return defaults;
}

function collectParamDefaultsByComponent(sourceFile) {
  const byComponent = new Map();
  const register = (compName, fnNode) => {
    if (!compName || !fnNode) return;
    const defs = extractDefaultsFromFn(fnNode, sourceFile);
    if (defs.size > 0) byComponent.set(compName, defs);
  };

  function visit(node) {
    if (ts.isFunctionDeclaration(node) && node.name) {
      register(node.name.text, node);
    } else if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name) && node.initializer) {
      let init = node.initializer;
      if (ts.isFunctionExpression(init) || ts.isArrowFunction(init)) {
        register(node.name.text, init);
      } else if (ts.isCallExpression(init) && init.arguments.length > 0) {
        const inner = init.arguments[0];
        if (ts.isFunctionExpression(inner) || ts.isArrowFunction(inner)) {
          register(node.name.text, inner);
        }
      }
    }
    ts.forEachChild(node, visit);
  }
  visit(sourceFile);
  return byComponent;
}

function membersFromTypeNode(typeNode, sourceFile, defaults) {
  const props = [];
  if (!typeNode) return props;
  if (ts.isTypeLiteralNode(typeNode)) {
    for (const member of typeNode.members) {
      if (!ts.isPropertySignature(member) || !member.name) continue;
      const name = ts.isIdentifier(member.name) || ts.isStringLiteral(member.name)
        ? member.name.text
        : member.name.getText(sourceFile);
      const type = member.type ? normalizeText(member.type.getText(sourceFile)) : "unknown";
      const description = getJsDocSummary(member, sourceFile);
      props.push({
        name,
        type,
        optional: Boolean(member.questionToken),
        description,
        defaultValue: defaults.get(name) ?? "",
      });
    }
  } else if (ts.isIntersectionTypeNode(typeNode)) {
    for (const t of typeNode.types) {
      props.push(...membersFromTypeNode(t, sourceFile, defaults));
    }
  }
  return props;
}

export function extractComponentProps(filePath) {
  if (!fs.existsSync(filePath)) return null;
  const code = fs.readFileSync(filePath, "utf8");
  const slug = path.basename(filePath, path.extname(filePath));
  const sourceFile = ts.createSourceFile(filePath, code, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const byComponent = collectParamDefaultsByComponent(sourceFile);
  const EMPTY = new Map();
  const defaultsFor = (propsName) => {
    const compName = propsName.replace(/Props$/, "");
    return byComponent.get(compName) ?? EMPTY;
  };

  const exportedPropsGroups = [];
  for (const stmt of sourceFile.statements) {
    const isExported = Boolean(stmt.modifiers?.some((m) => m.kind === ts.SyntaxKind.ExportKeyword));
    if (!isExported) continue;

    if (ts.isInterfaceDeclaration(stmt) && /Props$/.test(stmt.name.text)) {
      const compDefaults = defaultsFor(stmt.name.text);
      const items = [];
      for (const member of stmt.members) {
        if (!ts.isPropertySignature(member) || !member.name) continue;
        const name = ts.isIdentifier(member.name) || ts.isStringLiteral(member.name)
          ? member.name.text
          : member.name.getText(sourceFile);
        const type = member.type ? normalizeText(member.type.getText(sourceFile)) : "unknown";
        const description = getJsDocSummary(member, sourceFile);
        items.push({
          name,
          type,
          optional: Boolean(member.questionToken),
          description,
          defaultValue: compDefaults.get(name) ?? "",
        });
      }
      exportedPropsGroups.push({ interfaceName: stmt.name.text, props: items });
    } else if (ts.isTypeAliasDeclaration(stmt) && /Props$/.test(stmt.name.text)) {
      const compDefaults = defaultsFor(stmt.name.text);
      const items = membersFromTypeNode(stmt.type, sourceFile, compDefaults);
      exportedPropsGroups.push({ interfaceName: stmt.name.text, props: items });
    }
  }

  const expectedPrimary = `${toPascal(slug)}Props`.toLowerCase();
  const primaryGroup =
    exportedPropsGroups.find((g) => g.interfaceName.toLowerCase() === expectedPrimary) ??
    exportedPropsGroups[0];

  const primaryProps = primaryGroup ? primaryGroup.props : [];
  const allPropsByName = new Map();
  for (const g of exportedPropsGroups) {
    for (const p of g.props) {
      if (!allPropsByName.has(p.name)) allPropsByName.set(p.name, p);
    }
  }

  return {
    primaryProps,
    allPropsByName,
    exportedInterfaces: exportedPropsGroups.map((g) => g.interfaceName),
  };
}
