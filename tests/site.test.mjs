import { describe, it } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");

function walkPages(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) walkPages(p, out);
    else if (entry.name === "page.tsx") out.push(p);
  }
  return out;
}

describe("bigbullui docs site contracts", () => {
  it("every app/**/page.tsx exports metadata or generateMetadata", () => {
    const pages = walkPages(path.join(rootDir, "app"));
    assert.ok(pages.length >= 20, `expected >= 20 page routes, got ${pages.length}`);
    for (const p of pages) {
      const rel = path.relative(rootDir, p);
      const src = fs.readFileSync(p, "utf8");
      assert.match(
        src,
        /export\s+(?:const\s+metadata|async\s+function\s+generateMetadata|function\s+generateMetadata)\b/,
        `${rel} must export metadata or generateMetadata`
      );
    }
  });

  it("route handlers (/md/[slug] and /feed.xml) return clean HTTP headers & anchors", () => {
    const mdRoute = fs.readFileSync(path.join(rootDir, "app", "md", "[slug]", "route.ts"), "utf8");
    assert.equal(/\bnotFound\s*\(/.test(mdRoute), false, "/md/[slug] must return plain 404 markdown response instead of notFound()");
    assert.match(mdRoute, /Cache-Control/, "/md/[slug] must set Cache-Control headers");

    const feedRoute = fs.readFileSync(path.join(rootDir, "app", "feed.xml", "route.ts"), "utf8");
    assert.match(feedRoute, /force-static/, "/feed.xml must export dynamic = 'force-static'");
    assert.match(feedRoute, /charset=utf-8/, "/feed.xml must declare utf-8 charset");
    assert.match(feedRoute, /&apos;/, "/feed.xml must escape apostrophes");
    assert.match(feedRoute, /#v\$\{/, "/feed.xml items must link to version anchors");
  });

  it("next.config.ts enforces hardened CSP & HSTS headers", () => {
    const cfg = fs.readFileSync(path.join(rootDir, "next.config.ts"), "utf8");
    assert.match(cfg, /object-src 'none'/, "CSP must set object-src 'none'");
    assert.match(cfg, /frame-src 'self'/, "CSP must set frame-src 'self'");
    assert.match(cfg, /upgrade-insecure-requests/, "CSP must set upgrade-insecure-requests");
    assert.match(cfg, /form-action 'self' https:\/\/stackblitz\.com/, "CSP must allow StackBlitz form POST");
    assert.match(cfg, /Strict-Transport-Security/, "must emit HSTS header");
  });

  it("showcase allows safe internal routes alongside http(s)", () => {
    const showcase = fs.readFileSync(path.join(rootDir, "app", "showcase", "page.tsx"), "utf8");
    assert.match(showcase, /\^\\\/\(/, "showcase link check must allow safe single-slash internal paths");
  });

  it("MobileNav and IconDetail avoid heavyweight client JSON / full-icon-set imports", () => {
    const mobileNav = fs.readFileSync(path.join(rootDir, "src", "components", "site", "mobile-nav.tsx"), "utf8");
    assert.equal(mobileNav.includes("@/data/catalog.json"), false, "MobileNav must not import 50 KB catalog.json");

    const iconDetail = fs.readFileSync(path.join(rootDir, "src", "components", "site", "icon-detail.tsx"), "utf8");
    assert.equal(iconDetail.includes("nav-icons"), false, "IconDetail must not pull full STAMP_ICONS via nav-icons");
    assert.equal(iconDetail.includes("STAMP_ICONS"), false, "IconDetail must not import STAMP_ICONS");
    assert.match(iconDetail, /Download \.svg/, "IconDetail exposes .svg download button");
    assert.match(iconDetail, /Copy SVG/, "IconDetail exposes Copy SVG button");
  });

  it("isolated preview routes exist for components and blocks", () => {
    assert.ok(fs.existsSync(path.join(rootDir, "app", "preview", "[slug]", "page.tsx")));
    assert.ok(fs.existsSync(path.join(rootDir, "app", "preview", "block", "[slug]", "page.tsx")));
  });
});
