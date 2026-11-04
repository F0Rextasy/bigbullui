import pkg from "../../package.json";

/** Published CLI version, so docs never drift from package.json. */
export const SITE_VERSION = pkg.version;
/** Static block inventory for the site search index (client-side; fs is not available).
 *  Generated from src/components/blocks by scripts/generate-registry-json.mjs — do not edit. */
export { BLOCK_SLUGS_GENERATED as BLOCK_SLUGS } from "./block-slugs.gen";

/** "admin-overview" -> "Admin Overview". */
export function slugTitle(slug: string): string {
  return slug.split("-").map((w) => (w.length > 0 ? w[0].toUpperCase() + w.slice(1) : w)).join(" ");
}
